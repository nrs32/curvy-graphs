import { CurvyGraph } from "curvy-graphs";
import getLabeledYPoints from "../weekly-temps/weekly-temp-utils";
import { getTemperatureLabel } from "./temp-v-humidity-utils";
import { hourlyHumidity } from "./hourly-humidity";
import { hourlyTemps } from "./hourly-temps";

export const TempVHumidityCurvyGraph = () => {
  return <CurvyGraph 
    chartTitle='Humidity and Temperature (Sun 6/1)' 
    spaceBelowData={20}
    width={613}
    height={310}
    textColor='#E0E1E2'
    animate={true}
    yAxis={{
      labeledPoints: getLabeledYPoints(),
      getExtendedYLabel: (y) => getTemperatureLabel(y),
      labelFrequency: 5,
    }}
    dataSets={[
      {
        dataId: "humidity",
        graphStyle: 'dashed-line',
        label: "HUMIDITY",
        labelColor: '#E3A5F0',
        gradientColorStops: ['#C332DF', 'white'],
        gradientDirection: 'h',
        yRange: [0, 100],
        animationDelay: 0,
        data: hourlyHumidity,
      },
      {
        dataId: "temperature-line",
        graphStyle: 'line',
        label: "TEMPERATURE",
        labelColor: '#5D6CE9',
        gradientColorStops: ['#2FF3E0', '#5D6CE9'],
        gradientDirection: 'v',
        animationDelay: .5,
        data: hourlyTemps
      },
      {
        dataId: "temperature-area",
        graphStyle: 'area',
        label: "",
        labelColor: '#5D6CE9',
        gradientColorStops: ['#2FF3E0', '#5D6CE9'],
        gradientTransparencyStops: [0.5, 0],
        gradientDirection: 'v',
        animationDelay: .5,
        data: hourlyTemps
      }
    ]}
    xAxis={{
      labeledPoints: hourlyTemps,
      labelFrequency: 4,
    }}
    styles={{
      rightDataLabels: {
        textStyle: { letterSpacing: '.75px' }
      }
    }}/>;
}