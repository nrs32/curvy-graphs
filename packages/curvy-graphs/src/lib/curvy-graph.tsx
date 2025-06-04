import React, { useEffect, useRef, useState } from "react";
import CurvyGraphAnimator from "./parts/curvy-graph-animator";
import CurvyGraphPart, { type GradientDirection } from "./parts/curvy-graph-part";
import RightDataLabel from "./parts/right-data-label";
import XAxis from "./parts/x-axis";
import YAxis from "./parts/y-axis";
import type { GraphType, LabeledXPoint, LabeledYPoint, Point } from "./types/graph-types";
import ChartTitle from "./parts/chart-title";
import { getYAxisLabelConfig } from "./utils/get-y-axis-label-config";
import { getXAxisLabelConfig } from "./utils/get-x-axis-label-config";

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
  
  yAxis: {
    labeledPoints: LabeledYPoint[];

    // A callback that provides a y coordinate and expects a label for that coordinate.
    // This is used to fill the y-axis labels for the spaceBelowData if a value > 0 was provided.
    // If no callback is defined, the extra labels will be empty
    getExtendedYLabel?: (y: number) => string, 

    textSpace: number; // The horizontal space reserved for the text of Y-axis labels in px;
    labelFrequency?: number; // How often tick labels should show (every nth tick is labeled; 5 means every 5th tick will be labeled). Default is 1.
    showGuideLines?: boolean; // if guidelines should show behind the chart, default true
  },
  dataSets: DataSet[];
  xAxis: {
    labeledPoints: LabeledXPoint[];
    labelFrequency?: number; // How often tick labels should show (every nth tick is labeled; 5 means every 5th tick will be labeled). Default is 1.
  },
  styles?: {
    chartTitle?: {
      height?: number; // px
      styles?: React.CSSProperties,
    },
    axis?: {
      primaryTickColor?: string; // Default is same as textColor
      secondaryTickColor?: string; // Default is ~ 25% opacity of textColor
    }
  }
}

// TODO: extract and move to type file and export from there
export interface DataSet {
  dataId: string; // Unique key to identify data set
  graphStyle: GraphType;
  label: string;
  labelColor: string;
  gradientStops: [string, string]; // [startColor, endColor]
  gradientDirection: GradientDirection;
  yRange?: [number, number]; // [minY, maxY] -- if different than data min/max
  animationDelay?: number;
  data: Point[];
  styles?: {
    labelTop?: number; // px
    labelLeft?: number; // px
  }
}

const CurvyGraph = ({ chartTitle, textColor, spaceBelowData, yAxis, dataSets, xAxis, styles }: CurvyGraphProps) => {
  // TODO: allow graph width/height to be set, but maybe its the entire component that we're setting? 
  // that'd be maybe crazy so since much is dynamic
  // but maybe they enter height and then we set everything so that the chart fills whatever the labels don't - could be done
  const graphWidth = 400;
  const graphHeight = 200;
  
  const { svgHeight: xAxisHeight } = getXAxisLabelConfig();
  
  const rightLabelWidths = useRef<number[]>([]);
  const [rightLabelMaxWidth, setRightLabelMaxWidth] = useState(0);
  
  const SPACE_BELOW_DATA = spaceBelowData || 0;
  const dataTop = styles?.chartTitle?.height === undefined ? 50 : styles?.chartTitle?.height;
  
  const { endOfTickMark, svgWidth: yAxisWidth } = getYAxisLabelConfig(yAxis.textSpace, graphWidth);
  const dataLeft = endOfTickMark + 7;
  
  const rightDataLabelLeftPos = dataLeft + graphWidth + 7;

  const fullHeight = xAxisHeight + graphHeight + dataTop;
  const fullWidth = yAxisWidth + rightLabelMaxWidth;

  const secondaryAxisTickColor = `${textColor}40`;
  
  useEffect(() => {
    const maxWidth = Math.max(...rightLabelWidths.current);
    setRightLabelMaxWidth(maxWidth);
  }, [dataSets]);

  return (
    <div style={{ position: 'relative', height: `${fullHeight}px`, width: `${fullWidth}px` }}>
      <ChartTitle title={chartTitle} color={textColor} widthToCenterOn={graphWidth} leftOffset={dataLeft} styles={styles?.chartTitle}/>

      {/* TODO: see about removing textSpace and calculating this ourselves once we have the labels. */}
      <YAxis style={{ position: "absolute", top: `${dataTop - 1}px`, left: '0px' }} labeledYPoints={yAxis.labeledPoints} spaceBelowData={SPACE_BELOW_DATA} getLabel={yAxis.getExtendedYLabel} graphWidth={graphWidth} height={graphHeight} textSpace={yAxis.textSpace} primaryTickColor={styles?.axis?.primaryTickColor || textColor} secondaryTickColor={styles?.axis?.secondaryTickColor || secondaryAxisTickColor} labelColor={textColor} labelFrequency={yAxis.labelFrequency} showGuideLines={yAxis.showGuideLines}/>
     
      {dataSets.map((dataSet, i) => (
        <React.Fragment key={dataSet.dataId}>
          <CurvyGraphAnimator id={dataSet.dataId} width={graphWidth} data={dataSet.data} delay={dataSet.animationDelay || 0}>
            {(refs) => (
              <CurvyGraphPart animationRefs={refs} id={dataSet.dataId} width={graphWidth} height={graphHeight} spaceBelowData={SPACE_BELOW_DATA} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} data={dataSet.data} yRange={dataSet.yRange} gradientstops={dataSet.gradientStops} gradientDirection={dataSet.gradientDirection} type={dataSet.graphStyle}/>
            )}
          </CurvyGraphAnimator>
          <RightDataLabel spaceBelowData={SPACE_BELOW_DATA} onWidthMeasured={(width) => rightLabelWidths.current[i] = width } label={dataSet.label} labelColor={dataSet.labelColor} height={graphHeight} style={{ position: "absolute", top: `${dataSet.styles?.labelTop === undefined ? dataTop - 18 : dataSet.styles.labelTop}px`, left: `${rightDataLabelLeftPos}px` }} data={dataSet.data} yRange={dataSet.yRange}></RightDataLabel>
        </React.Fragment>
      ))}

      <XAxis style={{ position: "absolute", top: `${graphHeight + dataTop + 7}px`, left: `${dataLeft}px` }} width={graphWidth} data={xAxis.labeledPoints} labelFrequency={xAxis.labelFrequency} primaryTickColor={styles?.axis?.primaryTickColor || textColor} secondaryTickColor={styles?.axis?.secondaryTickColor || secondaryAxisTickColor} labelColor={textColor}/>
    </div>
  )
}

export default CurvyGraph;