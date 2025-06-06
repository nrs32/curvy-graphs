import { CurvyGraph, type LabeledYPoint } from "curvy-graphs"
import { getTemperatureLabel } from "../temp-v-humidity/temp-v-humidity-utils"
import { weeklyMins } from "./weekly-mins";
import { weeklyMaxes } from "./weekly-maxes";
import { determineYRangePoints } from "curvy-graphs/parts";
import { weeklyAvgs } from "./weekly-avgs";

export const WeeklyTempsGraph = () => {
  const weeklyMin: number = Math.min(...weeklyMins.map(day => day.y));
  const weeklyMax: number = Math.max(...weeklyMaxes.map(day => day.y));

  const dailyYPoints: LabeledYPoint[] = determineYRangePoints([weeklyMin, weeklyMax], 23, getTemperatureLabel);

  return <CurvyGraph 
    chartTitle='Temperature Trend This Week' 
    spaceBelowData={20}
    width={600}
    height={335}
    textColor='#E0E1E2'
    animate={true}
    yAxis={{
      labeledPoints: dailyYPoints,
      getExtendedYLabel: getTemperatureLabel,
      labelFrequency: 5
    }}
    dataSets={[
      {
        dataId: "max-daily-temp",
        graphStyle: 'area',
        label: "MAX DAILY TEMP",
        labelColor: '#E3A5F0',
        gradientColorStops: ['#C332DF', '#E3A5F0'],
        gradientDirection: 'h',
        yRange: [weeklyMin, weeklyMax],
        animationDelay: 3,
        data: weeklyMaxes
      },
      {
        dataId: "avg-daily-temp",
        graphStyle: 'area',
        label: "AVG DAILY TEMP",
        labelColor: '#35B5D4',
        gradientColorStops: ['#2FF3E0', '#5D6CE9'],
        gradientDirection: 'h',
        yRange: [weeklyMin, weeklyMax],
        animationDelay: 1.5,
        data: weeklyAvgs
      },
      {
        dataId: "min-daily-temp",
        graphStyle: 'area',
        label: "MIN DAILY TEMP",
        labelColor: '#C332DF',
        gradientColorStops: ['#5D6CE9', '#C332DF'],
        gradientDirection: 'h',
        yRange: [weeklyMin, weeklyMax],
        animationDelay: 0,
        data: weeklyMins,
      },
    ]}
    xAxis={{
      labeledPoints: weeklyMins,
    }}
    styles={{
      rightDataLabels: {
        textStyle: { letterSpacing: '.75px' }
      }
    }}/>
}