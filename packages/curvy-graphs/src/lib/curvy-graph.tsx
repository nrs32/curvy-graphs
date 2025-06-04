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
  yAxis: {
    labeledPoints: LabeledYPoint[];
    spaceBelowData?: number;
    getExtendedYLabel: (y: number) => string,
    textSpace: number; // How much space is needed for text labels to display in px
  },
  dataSets: DataSet[];
  xAxis: {
    labeledPoints: LabeledXPoint[];
  },
  styles?: {
    chartTitle?: {
      height?: number; // px
      styles?: React.CSSProperties,
    },
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

const CurvyGraph = ({ chartTitle, yAxis, dataSets, xAxis, styles }: CurvyGraphProps) => {
  // TODO: allow graph width/height to be set, but maybe its the entire component that we're setting? 
  // that'd be maybe crazy so since much is dynamic
  // but maybe they enter height and then we set everything so that the chart fills whatever the labels don't - could be done
  const graphWidth = 400;
  const graphHeight = 200;
  
  const { svgHeight: xAxisHeight } = getXAxisLabelConfig();
  
  const rightLabelWidths = useRef<number[]>([]);
  const [rightLabelMaxWidth, setRightLabelMaxWidth] = useState(0);
  
  const SPACE_BELOW_DATA = yAxis.spaceBelowData === undefined ? 20 : yAxis.spaceBelowData;
  const dataTop = styles?.chartTitle?.height === undefined ? 50 : styles?.chartTitle?.height;
  
  const { endOfTickMark, svgWidth: yAxisWidth } = getYAxisLabelConfig(yAxis.textSpace, graphWidth);
  const dataLeft = endOfTickMark + 7;
  
  const rightDataLabelLeftPos = dataLeft + graphWidth + 7;

  const fullHeight = xAxisHeight + graphHeight + dataTop;
  const fullWidth = yAxisWidth + rightLabelMaxWidth;
  
  useEffect(() => {
    const maxWidth = Math.max(...rightLabelWidths.current);
    setRightLabelMaxWidth(maxWidth);
  }, [dataSets]);

  return (
    <div style={{
      position: 'relative',
      height: `${fullHeight}px`,
      width: `${fullWidth}px`,
    }}
    >
      <ChartTitle title={chartTitle} graphWidth={graphWidth} dataLeft={dataLeft} styles={styles?.chartTitle}/>

      <YAxis style={{ position: "absolute", top: `${dataTop - 1}px`, left: '0px' }} labeledYPoints={yAxis.labeledPoints} getLabel={yAxis.getExtendedYLabel} graphWidth={graphWidth} height={graphHeight} textSpace={yAxis.textSpace} primaryTickColor={'#E0E1E2'} secondaryTickColor={'#3A3D4B'} labelColor={'#E0E1E2'} spaceBelowData={SPACE_BELOW_DATA}/>
     
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

      <XAxis style={{ position: "absolute", top: `calc(${graphHeight}px + ${dataTop + 7}px)`, left: `${dataLeft}px` }} width={graphWidth} data={xAxis.labeledPoints} labelFrequency={4} primaryTickColor={'#E0E1E2'} secondaryTickColor={'#3A3D4B'} labelColor={'#E0E1E2'}/>
    </div>
  )
}

export default CurvyGraph;