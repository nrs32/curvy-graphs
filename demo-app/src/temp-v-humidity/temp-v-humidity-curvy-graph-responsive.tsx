import { ResponsiveCurvyGraph } from "curvy-graphs";
import { getCombinedYRange, getTempAndHumidityLabel, getTemperatureLabel } from "./temp-v-humidity-utils";
import { hourlyHumidity } from "./hourly-humidity";
import { hourlyTemps } from "./hourly-temps";

export const TempVHumidityCurvyGraphResponsive = () => {
  return <>
    <div style={{ width: "70%", border: "1px dashed red" }}>
    <ResponsiveCurvyGraph 
      chartTitle='Humidity and Temperature (Sun 6/1)' 
      spaceBelowData={20}
      width={'100%'}
      height={'100%'}
      textColor='#E0E1E2'
      animate={true}
      yAxis={{
        labeledPoints: getCombinedYRange(hourlyTemps.map(temp => temp.y) as number[]),
        getExtendedYLabel: (y) => getTempAndHumidityLabel(getTemperatureLabel(y), 'N/A'),
        labelFrequency: 5,
      }}
      dataSets={[
      {
        dataId: "humidity-responsive",
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
        dataId: "temperature-line-responsive",
        graphStyle: 'line',
        label: "TEMPERATURE",
        labelColor: '#5D6CE9',
        gradientColorStops: ['#2FF3E0', '#5D6CE9'],
        gradientDirection: 'v',
        animationDelay: .5,
        data: hourlyTemps
      },
      {
        dataId: "temperature-area-responsive",
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
    }}/>
  </div>

  <div style={{ 
    flex: 1, 
    padding: "20px", 
    border: "1px dashed blue", 
    color: 'white',
    alignContent: 'center',
    textAlign: 'center',
  }}>
    <p>Other layout content could be here</p>
  </div>
</>;
}