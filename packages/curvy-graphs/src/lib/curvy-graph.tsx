import React from "react";
import CurvyGraphAnimator from "./parts/curvy-graph-animator";
import CurvyGraphPart, { type GradientDirection } from "./parts/curvy-graph-part";
import RightDataLabel from "./parts/right-data-label";
import XAxis from "./parts/x-axis";
import YAxis from "./parts/y-axis";
import type { GraphType, LabeledXPoint, LabeledYPoint, Point } from "./types/graph-types";
import ChartTitle from "./parts/chart-title";

export interface CurvyGraphProps {
  chartTitle: string;
  yAxis: {
    labeledPoints: LabeledYPoint[];
    spaceBelowData?: number;
    getExtendedYLabel: (y: number) => string
  },
  dataSets: DataSet[];
  xAxis: {
    labeledPoints: LabeledXPoint[];
  },
  styles?: {
    chartTitle: React.CSSProperties,
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
}

const CurvyGraph = ({ chartTitle, yAxis, dataSets, xAxis, styles }: CurvyGraphProps) => {
  const SPACE_BELOW_DATA = yAxis.spaceBelowData || 20;
  const dataTop = 59;
  const dataLeft = 89;
  const labelTop = dataTop - 18;
  const graphWidth = 400;
  const graphHeight = 200;
  const labelLeft = dataLeft + graphWidth + 7;

  return (
    <div style={{
      position: 'relative',
      // TODO: height and width of this div so user doesn't need to calculate and define
      height: '353px',
      width: '615px',
    }}
    >
      <ChartTitle title={chartTitle} graphWidth={graphWidth} dataLeft={dataLeft} styles={styles?.chartTitle}/>

      <YAxis style={{ position: "absolute", top: `${dataTop - 1}px`, left: '0px' }} labeledYPoints={yAxis.labeledPoints} getLabel={yAxis.getExtendedYLabel} graphWidth={graphWidth} height={graphHeight} textSpace={65} primaryTickColor={'#E0E1E2'} secondaryTickColor={'#3A3D4B'} labelColor={'#E0E1E2'} spaceBelowData={SPACE_BELOW_DATA}></YAxis>

      {dataSets.map(dataSet => (
        <React.Fragment key={dataSet.dataId}>
          <CurvyGraphAnimator id={dataSet.dataId} width={graphWidth} data={dataSet.data} delay={dataSet.animationDelay || 0}>
            {(refs) => (
              <CurvyGraphPart animationRefs={refs} id={dataSet.dataId} width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} data={dataSet.data} yRange={dataSet.yRange} gradientstops={dataSet.gradientStops} gradientDirection={dataSet.gradientDirection} type={dataSet.graphStyle}/>
            )}
          </CurvyGraphAnimator>
          <RightDataLabel label={dataSet.label} labelColor={dataSet.labelColor} width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${labelTop}px`, left: `${labelLeft}px` }} data={dataSet.data} yRange={dataSet.yRange}></RightDataLabel>
        </React.Fragment>
      ))}

      <XAxis width={graphWidth} style={{ position: "absolute", top: `calc(${graphHeight}px + ${dataTop + 7}px)`, left: `${dataLeft}px` }} data={xAxis.labeledPoints} labelFrequency={4} primaryTickColor={'#E0E1E2'} secondaryTickColor={'#3A3D4B'} labelColor={'#E0E1E2'}></XAxis>
    </div>
  )
}

export default CurvyGraph;