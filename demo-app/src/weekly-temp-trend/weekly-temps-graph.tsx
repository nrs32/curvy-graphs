import { CurvyGraph, type LabeledYPoint } from 'curvy-graphs'
import { getTemperatureLabel } from '../temp-v-humidity/temp-v-humidity-utils'
import { dailyMins } from './daily-mins';
import { dailyMaxes } from './daily-maxes';
import { generateLabeledYPoints } from 'curvy-graphs/parts';
import { dailyAvgs } from './daily-avgs';
import { getYRange } from './weekly-temp-utils';
import { themePinkLight, themePinkMain, themePurpleMain, themeTealMain } from '../temp-v-humidity/temp-humidity-theme';

export const WeeklyTempsGraph = () => {
  const yRange = getYRange();

  const labeledYPoints: LabeledYPoint[] = generateLabeledYPoints(yRange, 24, getTemperatureLabel);

  return (
    <CurvyGraph 
      chartTitle='Temperature Trend This Week' 
      spaceBelowData={20}
      width={600}
      height={335}
      textColor='#E0E1E2'
      animate={true}
      yAxis={{
        labeledPoints: labeledYPoints,
        getExtendedYLabel: getTemperatureLabel,
        labelFrequency: 5
      }}
      dataSets={[
        {
          dataId: 'max-daily-temp',
          graphStyle: 'area',
          label: 'MAX DAILY TEMP',
          labelColor: themePinkLight,
          gradientColorStops: [themePinkMain, themePinkLight],
          gradientDirection: 'h',
          yRange: yRange,
          animationDelay: 3,
          data: dailyMaxes
        },
        {
          dataId: 'avg-daily-temp',
          graphStyle: 'area',
          label: 'AVG DAILY TEMP',
          labelColor: '#35B5D4',
          gradientColorStops: [themeTealMain, themePurpleMain],
          gradientDirection: 'h',
          yRange: yRange,
          animationDelay: 1.5,
          data: dailyAvgs
        },
        {
          dataId: 'min-daily-temp',
          graphStyle: 'area',
          label: 'MIN DAILY TEMP',
          labelColor: themePinkMain,
          gradientColorStops: [themePurpleMain, themePinkMain],
          gradientDirection: 'h',
          yRange: yRange,
          animationDelay: 0,
          data: dailyMins,
        },
      ]}
      xAxis={{
        labeledPoints: dailyMins,
      }}
      styles={{
        rightDataLabels: {
          textStyle: { letterSpacing: '.75px' }
        }
      }}/>
    );
}