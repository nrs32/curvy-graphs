import { CurvyGraph } from "curvy-graphs";
import { getCombinedYRange, getTempAndHumidityLabel, getTemperatureLabel } from "./temp-v-humidity-utils";
import { hourlyHumidity } from "./hourly-humidity";
import { hourlyTemps } from "./hourly-temps";

export const TempVHumidityCurvyGraphSmall = () => {
  return <CurvyGraph 
    chartTitle='Humidity and Temperature (Sun 6/1)' 
    spaceBelowData={15}
    width={500}
    height={250}
    textColor='#E0E1E2'
    animate={true}
    yAxis={{
      labeledPoints: getCombinedYRange(hourlyTemps.map(temp => temp.y) as number[]),
      getExtendedYLabel: (y) => getTempAndHumidityLabel(getTemperatureLabel(y), 'N/A'),
      labelFrequency: 5,
    }}
    dataSets={[
      {
        dataId: "humidity-sm",
        graphStyle: 'dashed-line',
        label: "HUMIDITY",
        labelColor: '#E3A5F0',
        gradientColorStops: ['#C332DF', 'white'],
        gradientDirection: 'h',
        yRange: [0, 100],
        animationDelay: 0,
        data: hourlyHumidity,
        styles: {
          pathStyle: {
            strokeWidth: 3.5,
          }
        }
      },
      {
        dataId: "temperature-line-sm",
        graphStyle: 'line',
        label: "TEMPERATURE",
        labelColor: '#5D6CE9',
        gradientColorStops: ['#2FF3E0', '#5D6CE9'],
        gradientDirection: 'v',
        animationDelay: .5,
        data: hourlyTemps,
        styles: {
          pathStyle: {
            strokeWidth: 3.5,
          }
        }
      },
      {
        dataId: "temperature-area-sm",
        graphStyle: 'area',
        label: "",
        labelColor: '#5D6CE9',
        gradientColorStops: ['#2FF3E0', '#5D6CE9'],
        gradientTransparencyStops: [0.5, 0],
        gradientDirection: 'v',
        animationDelay: .5,
        data: hourlyTemps,
      }
    ]}
    xAxis={{
      labeledPoints: hourlyTemps,
      labelFrequency: 5,
    }}
    styles={{
      chartTitle: {
        styles: {
          fontSize: '17px'
        }
      },
      rightDataLabels: {
        textStyle: { letterSpacing: '.75px', fontSize: '13px' }
      }
    }}/>;
}