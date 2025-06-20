import { CurvyGraph } from 'curvy-graphs';
import { getYRange, waterLevels5th, waterLevels6th, waterLevels7th } from './water-level-data';
import { generateLabeledYPoints } from 'curvy-graphs/parts';

export const WaterLevelGraph = () => {
  const minMaxWaterLevel = getYRange();
  const yRange: [number, number] = [minMaxWaterLevel[0] - 1, minMaxWaterLevel[1] + 1];
  const yRangeLabels = generateLabeledYPoints(yRange, 15, (y) => `${Math.round(y)} in.`);

  return (
    <CurvyGraph
      chartTitle='Hourly Water Levels*'
      width={500}
      height={400}
      textColor='#E0E1E2'
      animate={true}
      yAxis={{
        labeledPoints: yRangeLabels,
        labelFrequency: 2,
      }}
      dataSets={[
        {
          id: 'water-levels-5th',
          graphStyle: 'area',
          label: 'Wednesday',
          labelColor: '#174a66',
          gradientColorStops: ['#174a66', '#0f2d5540'],
          gradientDirection: 'v',
          yRange,
          animationDelay: 3,
          data: waterLevels5th,
        },
        {
          id: 'water-levels-6th',
          graphStyle: 'area',
          label: 'Yesterday',
          labelColor: '#257480',
          gradientColorStops: ['#257480', '#154060cc'],
          gradientDirection: 'v',
          yRange,
          animationDelay: 1.5,
          data: waterLevels6th,
        },
        {
          id: 'water-levels-7th',
          graphStyle: 'area',
          label: 'Today',
          labelColor: '#00bad9',
          gradientColorStops: ['#00bad9', '#00bad9'],
          gradientDirection: 'h',
          yRange,
          animationDelay: 0,
          data: waterLevels7th,
          styles: {
            labelTop: 5,
          },
        },
      ]}
      xAxis={{
        labeledPoints: waterLevels6th,
        labelFrequency: 3,
      }}
    />
  );
};
