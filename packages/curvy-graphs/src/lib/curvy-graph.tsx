import type { DataSet, LabeledXPoint, LabeledYPoint, YAxisLabelConfig } from "./types/graph-types";
import { getXAxisLabelConfig } from "./utils/get-x-axis-label-config";
import CurvyGraphAnimator from "./parts/curvy-graph-animator";
import React, { useRef, useState } from "react";
import CurvyGraphPart from "./parts/curvy-graph-part";
import RightDataLabel from "./parts/right-data-label";
import ChartTitle from "./parts/chart-title";
import XAxis from "./parts/x-axis";
import YAxis from "./parts/y-axis";
import type { HexColor } from "./types/hex-color";

export interface CurvyGraphProps {
  chartTitle: string;
  textColor: HexColor; 
  spaceBelowData?: number; 
  animate?: boolean;
  hideTooltips?: boolean;
  width: number;
  height: number;
  yAxis: {
    labeledPoints: LabeledYPoint[];
    getExtendedYLabel?: (y: number) => string, 
    labelFrequency?: number; 
    showGuideLines?: boolean; 
  },
  dataSets: DataSet[];
  xAxis: {
    labeledPoints: LabeledXPoint[];
    labelFrequency?: number; 
  },
  isResizing?: boolean;
  isSharp?: boolean;
  styles?: {
    chartTitle?: {
      minHeight?: number;
      style?: React.CSSProperties,
    },
    axes ?: {
      primaryTickColor?: string; 
      secondaryTickColor?: string; 
      textStyle?: React.CSSProperties; 
    },
    rightDataLabels?: {
      style?: React.CSSProperties; 
      textStyle?: React.CSSProperties; 
    }
  }
}

/**
 * CurvyGraph is a highly customizable React component for rendering animated, responsive, and visually rich line/area graphs.
 *
 * Features:
 * - Supports multiple datasets, each with its own style, color, and animation delay.
 * - Customizable axes, chart title, right-aligned data labels, and responsive layout.
 * - Animates graph drawing and supports multiple graph types.
 * - When rendering multiple overlapping datasets, each dataset is drawn in order, so the last dataset in the array will appear on top of the others.
 *
 * Props:
 * - chartTitle: Title text for the chart.
 * - textColor: Color for title and axis labels as a hex value.
 * - width, height: Dimensions of the chart in pixels.
 * - spaceBelowData: Optiona visual space to show below your lowest data point
 *                   This is useful for area charts and other charts where you may want your y-range to be dynamic, 
 *                   but also don't want your lowest value to be directly on the x-axis.
 * 
 *                   If you use this, you must also set getExtendedYLabel under yAxis
 *                   This may also shift your logic for number of tick marks and label frequency for the y-axis
 * 
 *                   Default is 0.
 * 
 * - animate: If true, the chart will animate on data and layout changes. Default false.
 * - hideTooltips: boolean. Hide tooltips over data points. Default false.
 * 
 * - yAxis: Y-axis configuration object:
 *     - labeledPoints: Array of points with y-values and labels to display on the Y-axis.
 *     - getExtendedYLabel: Optional callback to label extended Y-axis space (used when spaceBelowData > 0). Defaults to empty labels.
 *     - labelFrequency: How often tick labels should show (every nth tick is labeled; e.g., 5 means every 5th tick is labeled). Default is 1.
 *     - showGuideLines: Whether to display horizontal guidelines behind the chart. Default is true.
 *
 * - xAxis: X-axis configuration object:
 *     - labeledPoints: Array of points with x-values and labels to display on the X-axis.
 *     - labelFrequency: How often tick labels should show (every nth tick is labeled; e.g., 5 means every 5th tick is labeled). Default is 1.
 *
 * - dataSets: Array of DataSet objects, each describing a graph:
 *    - id: Unique key accross all charts (no spaces).
 *    - graphStyle: ('line', 'dashed-line', 'area').
 *    - label: Label that appears to the right of the dataset.
 *    - labelColor: Color for the right data label.
 *    - gradientColorStops: [startColor, endColor] for the graph gradient.  Use the same hex for both if no gradient is needed.
 *    - gradientTransparencyStops: [startOpacity, endOpacity] for gradient transparency (optional).
 *    - gradientDirection: 'v' or 'h' for vertical/horizontal gradient.
 *    - yRange: [minY, maxY] Custom Y-axis range for this dataset. Default is your data's min and max.
 *    - xRange: [minX, maxX] Custom X-axis range for this dataset. Default is your data's min and max.
 *    - animationDelay: Delay before animating this dataset (seconds). Can create stagger effects. Default 0.
 *    - data: Array of data points `{ x: number | null, y: number | null }`. Null is accepted for data breaks.
 *    - styles: Optional custom styles for labelLeft and labelTop position in px, and pathStyle to style the svg path element directly.
 *    - tooltipConfig: (optional)
 *        - getCustomLabel: `(x: number, y: number) => string` — (optional) Returns a fully custom label string.
 *        - getXLabel: `(x: number) => string` (optional) — Custom formatter for the x-value in the tooltip.
 *        - getYLabel: `(y: number) => string` (optional) — Custom formatter for the y-value in the tooltip.
 *        - xAlias: `string` (optional) — Alias to replace the `"x"` label in the tooltip.
 *        - yAlias: `string` (optional) — Alias to replace the `"y"` label in the tooltip.
 *
 * - styles: Custom styles configuration object:
 *     - chartTitle:
 *         - minHeight: minimum height for text of chart title, determines where dataset renders
 *         - style: override chart title styles
 *     - axes: Custom colors and text styles for axis ticks and labels. 
 *         - primaryTickColor: Default is same as textColor
 *         - secondaryTickColor: Default is ~ 25% opacity of textColor
 *         - textStyle: style the SVG text element for the axis directly
 *     - rightDataLabels: Custom styles for the right-aligned data labels container and svg text element
 *         - style: style label container
 *         - textStyle: style svg text element directly
 *
 * - isResizing: If true, disables animation until resizing completes. Use for responsive charts.
 * - isSharp: If true, renders sharp/linear lines between points. Default is false (curvy).
 */
const CurvyGraph = ({ width, height, chartTitle, textColor, spaceBelowData = 0, animate = false, yAxis, dataSets, xAxis, isResizing = false, isSharp = false, styles }: CurvyGraphProps) => {
  if (spaceBelowData > 0 && yAxis.getExtendedYLabel === undefined) {
    console.warn("CurvyGraph: `getExtendedYLabel` should be provided when `spaceBelowData` is used.");
  }

  const dataSetsWithSpaces = dataSets.filter(data => data.id.includes(' '));
  if (dataSetsWithSpaces.length > 0) {
    console.error(`CurvyGraph: 'id' can not contain spaces. id: '${dataSetsWithSpaces[0].id}' for chart "${chartTitle}" is invalid.`);
  }

  const rightLabelWidths = useRef<number[]>([]);
  const [rightLabelMaxWidth, setRightLabelMaxWidth] = useState(0);
  const [yAxisConfig, setYAxisConfig] = useState<YAxisLabelConfig | null>(null);

  const handleRightLabelWidthMeasured = (index: number, width: number) => {
    rightLabelWidths.current[index] = width;
    const maxWidth = Math.max(...rightLabelWidths.current);
    setRightLabelMaxWidth(maxWidth);
  };

  const { endOfTickMark = 0, yAxisOutsideGraph = 0 } = yAxisConfig || {};
  const { svgHeight: xAxisHeight } = getXAxisLabelConfig();
  
  const dataTop: number = styles?.chartTitle?.minHeight ?? 50;
  const dataLeft: number = endOfTickMark + 7;
  
  const graphWidth: number = Math.max(width - yAxisOutsideGraph - rightLabelMaxWidth, 0);
  const graphHeight: number = Math.max(height - xAxisHeight - dataTop, 0);
  
  const rightDataLabelLeftPos: number = dataLeft + graphWidth + 7;

  const secondaryAxisTickColor: string = `${textColor}40`;

  const dataIsReady: boolean = !!yAxisConfig;
  const graphTooSmall: boolean = graphWidth < 10 || graphHeight < 10;
  const canRender = dataIsReady && !graphTooSmall;

  return (
    <>
      <div style={{ display: graphTooSmall ? 'flex' : 'none', position: 'relative', height: `${height}px`, width: `${width}px`, textAlign: 'center', alignItems: 'center' }}>Graph is too small to display</div>
      <div style={{ visibility: canRender ? 'visible' : 'hidden', position: 'relative', height: `${height}px`, width: `${width}px` }}>
        <ChartTitle title={chartTitle} color={textColor} widthToCenterOn={graphWidth} leftOffset={dataLeft} style={styles?.chartTitle?.style}/>

        <YAxis style={{ position: "absolute", top: `${dataTop - 1}px`, left: '0px' }} textStyle={styles?.axes ?.textStyle} onConfigMeasured={setYAxisConfig} labeledYPoints={yAxis.labeledPoints} spaceBelowData={ spaceBelowData} getLabel={yAxis.getExtendedYLabel} graphWidth={graphWidth} height={graphHeight} primaryTickColor={styles?.axes ?.primaryTickColor || textColor} secondaryTickColor={styles?.axes ?.secondaryTickColor || secondaryAxisTickColor} labelColor={textColor} labelFrequency={yAxis.labelFrequency} showGuideLines={yAxis.showGuideLines === undefined ? true : yAxis.showGuideLines}/>
      
        {dataSets.map((dataSet, i) => (
          <React.Fragment key={dataSet.id}>
            {(!isResizing && canRender) && 
              <CurvyGraphAnimator id={dataSet.id} animate={animate} width={graphWidth} data={dataSet.data} delay={dataSet.animationDelay || 0}>
                {(refs) => (
                  <CurvyGraphPart id={dataSet.id} animationRefs={animate ? refs : undefined} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} pathStyle={dataSet.styles?.pathStyle} isSharp={isSharp} width={graphWidth} height={graphHeight} spaceBelowData={ spaceBelowData} data={dataSet.data} yRange={dataSet.yRange} xRange={dataSet.xRange} gradientColorStops={dataSet.gradientColorStops} gradientTransparencyStops={dataSet.gradientTransparencyStops} gradientDirection={dataSet.gradientDirection} type={dataSet.graphStyle}/>
                )}
              </CurvyGraphAnimator>}
            <RightDataLabel style={{ position: "absolute", top: `${dataSet.styles?.labelTop === undefined ? dataTop - 18 : dataTop + dataSet.styles.labelTop}px`, left: `${rightDataLabelLeftPos}px`, ...styles?.rightDataLabels?.style }} textStyle={styles?.rightDataLabels?.textStyle} height={graphHeight} spaceBelowData={ spaceBelowData} onWidthMeasured={(labelWidth) => handleRightLabelWidthMeasured(i, labelWidth)} data={dataSet.data} label={dataSet.label} labelColor={dataSet.labelColor} yRange={dataSet.yRange}/>
          </React.Fragment>
        ))}

        <XAxis style={{ position: "absolute", top: `${graphHeight + dataTop + 7}px`, left: `${dataLeft}px` }} textStyle={styles?.axes ?.textStyle} width={graphWidth} data={xAxis.labeledPoints} labelFrequency={xAxis.labelFrequency} primaryTickColor={styles?.axes ?.primaryTickColor || textColor} secondaryTickColor={styles?.axes ?.secondaryTickColor || secondaryAxisTickColor} labelColor={textColor}/>
      </div>
    </>
  )
}

export default CurvyGraph;