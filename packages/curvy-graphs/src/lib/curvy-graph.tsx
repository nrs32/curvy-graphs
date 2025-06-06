import React, { useEffect, useRef, useState } from "react";
import CurvyGraphAnimator from "./parts/curvy-graph-animator";
import CurvyGraphPart from "./parts/curvy-graph-part";
import RightDataLabel from "./parts/right-data-label";
import XAxis from "./parts/x-axis";
import YAxis from "./parts/y-axis";
import type { GradientDirection, GraphType, LabeledXPoint, LabeledYPoint, Point, YAxisLabelConfig } from "./types/graph-types";
import ChartTitle from "./parts/chart-title";
import { getXAxisLabelConfig } from "./utils/get-x-axis-label-config";

// TODO: address TODOs, dostring here, cleanup, and make many chart examples and populate README

export interface CurvyGraphProps {
  chartTitle: string;
  textColor: string; // Defines title, x-axis, and y-axis text colors - including guideline and tick marks.

  // A visual space to show below your lowest data point. 
  // This is useful for area charts and other charts where you may want your y-range to be dynamic, 
  // but also don't want your lowest value to be directly on the x-axis.
  // If you use this, you must also set getExtendedYLabel under yAxis
  // This may also shift your logic for number of tick marks and label frequency for the y-axis
  // Default is 0. Recommend either 0 or a value between 20 and 100.
  spaceBelowData?: number; 
  animate?: boolean; // Weather the chart should animate on data changes and initialization. Default is false;
  width: number;
  height: number;
  yAxis: {
    labeledPoints: LabeledYPoint[];

    // A callback that provides a y coordinate and expects a label for that coordinate.
    // This is used to fill the y-axis labels for the spaceBelowData if a value > 0 was provided.
    // If no callback is defined, the extra labels will be empty
    getExtendedYLabel?: (y: number) => string, 

    labelFrequency?: number; // How often tick labels should show (every nth tick is labeled; 5 means every 5th tick will be labeled). Default is 1.
    showGuideLines?: boolean; // if guidelines should show behind the chart, default true
  },
  dataSets: DataSet[];
  xAxis: {
    labeledPoints: LabeledXPoint[];
    labelFrequency?: number; // How often tick labels should show (every nth tick is labeled; 5 means every 5th tick will be labeled). Default is 1.
  },
  isResizing?: boolean; // Used to handle resize-rendering for responsive graphs. Default false.
  styles?: {
    chartTitle?: {
      height?: number; // px
      styles?: React.CSSProperties,
    },
    axis?: {
      primaryTickColor?: string; // Default is same as textColor
      secondaryTickColor?: string; // Default is ~ 25% opacity of textColor
      textStyle?: React.CSSProperties; // style the SVG text element for the axis directly
    },
    rightDataLabels?: {
      style?: React.CSSProperties; // style the container right data labels directly
      textStyle?: React.CSSProperties; // style the SVG text element for the label directly
    }
  }
}

// TODO: extract and move to type file and export from there
export interface DataSet {
  dataId: string; // Unique key to identify data set
  graphStyle: GraphType;
  label: string;
  labelColor: string;
  gradientColorStops: [string, string]; // [startColor, endColor]
  gradientTransparencyStops?: [number, number]; // [startOpacity, endOpacity]
  gradientDirection: GradientDirection;
  yRange?: [number, number]; // [minY, maxY] -- if different than data min/max
  animationDelay?: number; // Seconds to wait before revealing dataset (if using animation). Datasets with different delays can create cool effects. Default is 0.
  data: Point[];
  styles?: {
    labelTop?: number; // px right data labels
    labelLeft?: number; // px right data labels
    pathStyle?: React.CSSProperties;
  }
}

const CurvyGraph = ({ width, height, chartTitle, textColor, spaceBelowData, animate, yAxis, dataSets, xAxis, isResizing = false, styles }: CurvyGraphProps) => {
  const { svgHeight: xAxisHeight } = getXAxisLabelConfig();
  
  const rightLabelWidths = useRef<number[]>([]);
  const [rightLabelMaxWidth, setRightLabelMaxWidth] = useState(0);
  const [yAxisConfig, setYAxisConfig] = useState<YAxisLabelConfig | null>(null);
  
  const SPACE_BELOW_DATA = spaceBelowData || 0;
  const dataTop = styles?.chartTitle?.height === undefined ? 50 : styles?.chartTitle?.height;
  
  const { endOfTickMark = 0, yAxisOutsideGraph = 0 } = yAxisConfig || {};
  const dataLeft = endOfTickMark + 7;
  
  const graphWidth = width - yAxisOutsideGraph - rightLabelMaxWidth;
  const graphHeight = height - xAxisHeight - dataTop;
  
  const rightDataLabelLeftPos = dataLeft + graphWidth + 7;
  const secondaryAxisTickColor = `${textColor}40`;
  
  useEffect(() => {
    const maxWidth = Math.max(...rightLabelWidths.current);
    setRightLabelMaxWidth(maxWidth);
  }, [dataSets]);

  const dataIsReady = !!yAxisConfig;

  console.log("CHART RENDER")

  return (
    <div style={{ visibility: !dataIsReady ? 'hidden' : 'visible', position: 'relative', height: `${height}px`, width: `${width}px` }}>
      <ChartTitle title={chartTitle} color={textColor} widthToCenterOn={graphWidth} leftOffset={dataLeft} styles={styles?.chartTitle?.styles}/>

      <YAxis style={{ position: "absolute", top: `${dataTop - 1}px`, left: '0px' }} textStyle={styles?.axis?.textStyle} onConfigMeasured={setYAxisConfig} labeledYPoints={yAxis.labeledPoints} spaceBelowData={SPACE_BELOW_DATA} getLabel={yAxis.getExtendedYLabel} graphWidth={graphWidth} height={graphHeight} primaryTickColor={styles?.axis?.primaryTickColor || textColor} secondaryTickColor={styles?.axis?.secondaryTickColor || secondaryAxisTickColor} labelColor={textColor} labelFrequency={yAxis.labelFrequency} showGuideLines={yAxis.showGuideLines === undefined ? true : yAxis.showGuideLines}/>
     
      {dataSets.map((dataSet, i) => (
        <React.Fragment key={dataSet.dataId}>
          {!isResizing && 
            <CurvyGraphAnimator id={dataSet.dataId} animate={animate === undefined ? false : animate} width={graphWidth} data={dataSet.data} delay={dataSet.animationDelay || 0}>
              {(refs) => (
                <CurvyGraphPart id={dataSet.dataId} animationRefs={refs} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} pathStyle={dataSet.styles?.pathStyle} width={graphWidth} height={graphHeight} spaceBelowData={SPACE_BELOW_DATA} data={dataSet.data} yRange={dataSet.yRange} gradientColorStops={dataSet.gradientColorStops} gradientTransparencyStops={dataSet.gradientTransparencyStops} gradientDirection={dataSet.gradientDirection} type={dataSet.graphStyle}/>
              )}
            </CurvyGraphAnimator>}
          <RightDataLabel style={{ position: "absolute", top: `${dataSet.styles?.labelTop === undefined ? dataTop - 18 : dataTop + dataSet.styles.labelTop}px`, left: `${rightDataLabelLeftPos}px`, ...styles?.rightDataLabels?.style }} textStyle={styles?.rightDataLabels?.textStyle} height={graphHeight} spaceBelowData={SPACE_BELOW_DATA} onWidthMeasured={(width) => rightLabelWidths.current[i] = width } data={dataSet.data} label={dataSet.label} labelColor={dataSet.labelColor} yRange={dataSet.yRange}/>
        </React.Fragment>
      ))}

      <XAxis style={{ position: "absolute", top: `${graphHeight + dataTop + 7}px`, left: `${dataLeft}px` }} textStyle={styles?.axis?.textStyle} width={graphWidth} data={xAxis.labeledPoints} labelFrequency={xAxis.labelFrequency} primaryTickColor={styles?.axis?.primaryTickColor || textColor} secondaryTickColor={styles?.axis?.secondaryTickColor || secondaryAxisTickColor} labelColor={textColor}/>
    </div>
  )
}

export default CurvyGraph;