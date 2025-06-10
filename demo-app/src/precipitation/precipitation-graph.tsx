import { CurvyGraph, type LabeledXPoint } from 'curvy-graphs'
import { generateLabeledYPoints } from 'curvy-graphs/parts'
import {
  cumulativeRainfall2015,
  cumulativeRainfall2020,
  cumulativeRainfall2025,
  rainfall2015,
  rainfall2020,
  rainfall2025,
} from './precipitation-data'

export type PrecipitationGraphProps = { isCumulative: boolean }

export const PrecipitationGraph = ({ isCumulative }: PrecipitationGraphProps) => {
  const ORANGE = '#f7745e';
  const PURPLE = '#9b84f0';
  const PURPLE_BLUE = '#5b66db';

  const yRange: [number, number] = isCumulative ? [0, 37] : [0, 5];

  const getYLabel = (y: number) => `${Math.round(y)} in`;

  const xRangeLabels: LabeledXPoint[] = rainfall2025.map((data, i) => ({ x: i, xLabel: data.xLabel }));
  const yRangeLabels = generateLabeledYPoints(yRange, 6, getYLabel);

  return (
    <CurvyGraph
      chartTitle={`${isCumulative ? 'Cumulative ' : 'Monthly'} Precipitation`}
      width={600}
      height={300}
      textColor='#000000'
      animate={true}
      isSharp={true}
      yAxis={{
        labeledPoints: yRangeLabels,
      }}
      dataSets={[
        {
          dataId: 'cumulative-precipation-2015',
          graphStyle: 'line',
          label: '2015',
          labelColor: ORANGE,
          gradientColorStops: [ORANGE, ORANGE],
          gradientDirection: 'v',
          yRange,
          animationDelay: 0,
          data: isCumulative ? cumulativeRainfall2015 : rainfall2015,
        },
        {
          dataId: 'cumulative-precipation-2020',
          graphStyle: 'line',
          label: '2020',
          labelColor: PURPLE,
          gradientColorStops: [PURPLE, PURPLE],
          gradientDirection: 'v',
          yRange,
          animationDelay: 0,
          data: isCumulative ? cumulativeRainfall2020 : rainfall2020,
        },
        {
          dataId: 'cumulative-precipation-2025',
          graphStyle: 'line',
          label: '2025',
          labelColor: PURPLE_BLUE,
          gradientColorStops: [PURPLE_BLUE, PURPLE_BLUE],
          gradientDirection: 'v',
          yRange,
          animationDelay: 0,
          data: isCumulative ? cumulativeRainfall2025 : rainfall2025,
        },
      ]}
      xAxis={{
        labeledPoints: xRangeLabels,
      }}
    />
  )
}
