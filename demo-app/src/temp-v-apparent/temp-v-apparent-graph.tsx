import { CurvyGraph, type LabeledXPoint } from 'curvy-graphs'
import { generateLabeledYPoints } from 'curvy-graphs/parts';
import { getYRange, tempVApparentData } from './temp-v-apparent-data';
import { getTemperatureLabel } from '../temp-v-humidity/temp-v-humidity-utils';

export const TempVApparentGraph = () => {
  const BLUE = '#2e96b3';
  const RED = '#de2938';
  const YELLOW = '#fc922d';

  const minMaxTemps = getYRange();
  const yRange: [number, number] = [minMaxTemps[0] - 4, minMaxTemps[1]];

  const xPoints: LabeledXPoint[] = tempVApparentData.map((data, i) => ({ x: i, xLabel: data.time }));
  const yRangeLabels = generateLabeledYPoints(yRange, 11, getTemperatureLabel);

  const actualTempPoints = tempVApparentData.map((d, i) => ({ x: i, y: d.temperature }));
  const apparentTempPoints = tempVApparentData.map((d, i) => ({ x: i, y: d.apparentTemperature }));

  return (
    <CurvyGraph
      chartTitle='Actual And Apparent Temperature'
      width={613}
      height={300}
      textColor='#000000'
      animate={true}
      yAxis={{
        labeledPoints: yRangeLabels,
        labelFrequency: 2,
      }}
      dataSets={[
        {
          id: 'actual-temperature',
          graphStyle: 'line',
          label: 'Actual Temperature',
          labelColor: BLUE,
          gradientColorStops: [BLUE, BLUE],
          gradientDirection: 'v',
          yRange: yRange,
          animationDelay: 1.5,
          data: actualTempPoints,
          styles: {
            pathStyle: {
              strokeWidth: 2,
            },
          },
        },
        {
          id: 'apparent-temperatures',
          graphStyle: 'area',
          label: 'Apparent (Feels Like)',
          labelColor: RED,
          gradientColorStops: [RED, YELLOW],
          gradientDirection: 'h',
          yRange: yRange,
          animationDelay: 0.0,
          data: apparentTempPoints,
        },
      ]}
      xAxis={{
        labeledPoints: xPoints,
        labelFrequency: 3,
      }}
      styles={{
        axes: {
          secondaryTickColor: '#dedbdb',
        },
      }}
    />
  );
};
