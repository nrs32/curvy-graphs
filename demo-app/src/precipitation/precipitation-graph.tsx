import { CurvyGraph, type LabeledXPoint } from "curvy-graphs"
import { determineYRangePoints } from "curvy-graphs/parts";
import { cumulativeRainfall2015, cumulativeRainfall2020, cumulativeRainfall2025, rainfall2015, rainfall2020, rainfall2025 } from "./precipitation-data-";

export type PrecipitationGraphProps = { isCumulative: boolean };

export const PrecipitationGraph = ({ isCumulative }: PrecipitationGraphProps) => {
  const yRange: [number, number] = isCumulative ? [0, 37] : [0, 5];

  const getYLabel = (y: number) => `${Math.round(y)} in`;

  const xRangeLabels: LabeledXPoint[] = rainfall2025.map((data, i) => ({ x: i, xLabel: data.xLabel }));
  const yRangeLabels = determineYRangePoints(yRange, 5, getYLabel);

  return <CurvyGraph 
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
          dataId: "cumulative-precipation-2015",
          graphStyle: 'line',
          label: "2015",
          labelColor: '#f7745e',
          gradientColorStops: ['#f7745e', '#f7745e'],
          gradientDirection: 'v',
          yRange: yRange,
          animationDelay: 0,
          data: isCumulative ? cumulativeRainfall2015 : rainfall2015,
        },
        {
          dataId: "cumulative-precipation-2020",
          graphStyle: 'line',
          label: "2020",
          labelColor: '#9b84f0',
          gradientColorStops: ['#9b84f0', '#9b84f0'],
          gradientDirection: 'v',
          yRange: yRange,
          animationDelay: 0,
          data: isCumulative ? cumulativeRainfall2020 : rainfall2020,
        },
        {
          dataId: "cumulative-precipation-2025",
          graphStyle: 'line',
          label: "2025",
          labelColor: '#5b66db',
          gradientColorStops: ['#5b66db', '#5b66db'],
          gradientDirection: 'v',
          yRange: yRange,
          animationDelay: 0,
          data: isCumulative ? cumulativeRainfall2025 : rainfall2025,
        },
      ]}
      xAxis={{
        labeledPoints: xRangeLabels,
      }}/>
}