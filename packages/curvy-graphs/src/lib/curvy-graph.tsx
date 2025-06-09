import type { DataSet, LabeledXPoint, LabeledYPoint, YAxisLabelConfig } from "./types/graph-types";
import { getXAxisLabelConfig } from "./utils/get-x-axis-label-config";
import CurvyGraphAnimator from "./parts/curvy-graph-animator";
import React, { useRef, useState } from "react";
import CurvyGraphPart from "./parts/curvy-graph-part";
import RightDataLabel from "./parts/right-data-label";
import ChartTitle from "./parts/chart-title";
import XAxis from "./parts/x-axis";
import YAxis from "./parts/y-axis";

export interface CurvyGraphProps {
  chartTitle: string;
  textColor: string; 
  spaceBelowData?: number; 
  animate?: boolean;
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
  styles?: {
    chartTitle?: {
      minHeight?: number;
      styles?: React.CSSProperties,
    },
    axis?: {
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
 *
 * Props:
 * - chartTitle: Title text for the chart.
 * - textColor: Color for title and axis labels.
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
 * - animate: Whether to animate the chart on data and layout changes.
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
 *    - dataId: Unique key for the dataset.
 *    - graphStyle: ('line', 'dashed-line', 'area').
 *    - label: Label for the data to appear to the right.
 *    - labelColor: Color for the right data label.
 *    - gradientColorStops: [startColor, endColor] for the graph gradient.
 *    - gradientTransparencyStops: [startOpacity, endOpacity] for gradient transparency (optional).
 *    - gradientDirection: 'v' or 'h' for vertical/horizontal gradient.
 *    - yRange: [minY, maxY] Optional y-axis range, if different than the dataSet's min/max values.
 *    - animationDelay: Delay before animating this dataset (seconds). Can create stagger effects.
 *    - data: Array of Point objects.
 *    - styles: Optional custom styles for labelLeft and labelTop position in px, and pathStyle to style the svg path element directly.
 * 
 * - styles: Custom styles configuration object:
 *     - chartTitle:
 *         - minHeight: minimum height for text of chart title, determines where dataset renders
 *         - style: override chart title styles
 *     - axis: Custom colors and text styles for axis ticks and labels. 
 *         - primaryTickColor: Default is same as textColor
 *         - secondaryTickColor: Default is ~ 25% opacity of textColor
 *         - textStyle: style the SVG text element for the axis directly
 *     - rightDataLabels: Custom styles for the right-aligned data labels container and svg text element
 *         - style: style label container
 *         - textStyle: style svg text element directly
 *
 * - isResizing: If true, disables animation until resizing completes. Use for responsive charts.
 */
const CurvyGraph = ({ width, height, chartTitle, textColor, spaceBelowData = 0, animate = false, yAxis, dataSets, xAxis, isResizing = false, styles }: CurvyGraphProps) => {
  if (spaceBelowData > 0 && yAxis.getExtendedYLabel === undefined) {
    console.warn("CurvyGraph: `getExtendedYLabel` should be provided when `spaceBelowData` is used.");
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
  
  const graphWidth: number = width - yAxisOutsideGraph - rightLabelMaxWidth;
  const graphHeight: number = height - xAxisHeight - dataTop;
  
  const rightDataLabelLeftPos: number = dataLeft + graphWidth + 7;

  const secondaryAxisTickColor: string = `${textColor}40`;

  const dataIsReady: boolean = !!yAxisConfig;
  const graphTooSmall: boolean = graphWidth < 10 || graphHeight < 10;
  const canRender = dataIsReady && !graphTooSmall;

  return (
    <>
      <div style={{ display: graphTooSmall ? 'flex' : 'none', position: 'relative', height: `${height}px`, width: `${width}px`, textAlign: 'center', alignItems: 'center' }}>Graph is too small to display</div>
      <div style={{ visibility: canRender ? 'visible' : 'hidden', position: 'relative', height: `${height}px`, width: `${width}px` }}>
        <ChartTitle title={chartTitle} color={textColor} widthToCenterOn={graphWidth} leftOffset={dataLeft} styles={styles?.chartTitle?.styles}/>

        <YAxis style={{ position: "absolute", top: `${dataTop - 1}px`, left: '0px' }} textStyle={styles?.axis?.textStyle} onConfigMeasured={setYAxisConfig} labeledYPoints={yAxis.labeledPoints} spaceBelowData={ spaceBelowData} getLabel={yAxis.getExtendedYLabel} graphWidth={graphWidth} height={graphHeight} primaryTickColor={styles?.axis?.primaryTickColor || textColor} secondaryTickColor={styles?.axis?.secondaryTickColor || secondaryAxisTickColor} labelColor={textColor} labelFrequency={yAxis.labelFrequency} showGuideLines={yAxis.showGuideLines === undefined ? true : yAxis.showGuideLines}/>
      
        {dataSets.map((dataSet, i) => (
          <React.Fragment key={dataSet.dataId}>
            {(!isResizing && canRender) && 
              <CurvyGraphAnimator id={dataSet.dataId} animate={animate} width={graphWidth} data={dataSet.data} delay={dataSet.animationDelay || 0}>
                {(refs) => (
                  <CurvyGraphPart id={dataSet.dataId} animationRefs={refs} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} pathStyle={dataSet.styles?.pathStyle} width={graphWidth} height={graphHeight} spaceBelowData={ spaceBelowData} data={dataSet.data} yRange={dataSet.yRange} gradientColorStops={dataSet.gradientColorStops} gradientTransparencyStops={dataSet.gradientTransparencyStops} gradientDirection={dataSet.gradientDirection} type={dataSet.graphStyle}/>
                )}
              </CurvyGraphAnimator>}
            <RightDataLabel style={{ position: "absolute", top: `${dataSet.styles?.labelTop === undefined ? dataTop - 18 : dataTop + dataSet.styles.labelTop}px`, left: `${rightDataLabelLeftPos}px`, ...styles?.rightDataLabels?.style }} textStyle={styles?.rightDataLabels?.textStyle} height={graphHeight} spaceBelowData={ spaceBelowData} onWidthMeasured={(labelWidth) => handleRightLabelWidthMeasured(i, labelWidth)} data={dataSet.data} label={dataSet.label} labelColor={dataSet.labelColor} yRange={dataSet.yRange}/>
          </React.Fragment>
        ))}

        <XAxis style={{ position: "absolute", top: `${graphHeight + dataTop + 7}px`, left: `${dataLeft}px` }} textStyle={styles?.axis?.textStyle} width={graphWidth} data={xAxis.labeledPoints} labelFrequency={xAxis.labelFrequency} primaryTickColor={styles?.axis?.primaryTickColor || textColor} secondaryTickColor={styles?.axis?.secondaryTickColor || secondaryAxisTickColor} labelColor={textColor}/>
      </div>
    </>
  )
}

export default CurvyGraph;