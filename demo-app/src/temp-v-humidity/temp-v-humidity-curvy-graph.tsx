import { themePinkLight, themePinkMain, themePurpleMain, themeTealMain } from './temp-humidity-theme';
import { getCombinedYRange, getTemperatureLabel, getTempAndHumidityLabel, getHumidityLabel, getXLabel } from './temp-v-humidity-utils';
import { hourlyHumidity } from './hourly-humidity';
import { hourlyTemps } from './hourly-temps';
import { CurvyGraph } from 'curvy-graphs';

export const TempVHumidityCurvyGraph = () => {
  return (
    <CurvyGraph
      chartTitle='Humidity and Temperature (Sun 6/1)'
      spaceBelowData={20}
      width={613}
      height={310}
      textColor='#E0E1E2'
      animate={true}
      yAxis={{
        labeledPoints: getCombinedYRange(hourlyTemps.map(point => point.y) as number[]),
        getExtendedYLabel: (y) => getTempAndHumidityLabel(getTemperatureLabel(y), 'N/A'),
        labelFrequency: 5,
      }}
      dataSets={[
        {
          id: 'humidity',
          graphStyle: 'dashed-line',
          label: 'HUMIDITY',
          labelColor: themePinkLight,
          gradientColorStops: [themePinkMain, 'white'],
          gradientDirection: 'h',
          yRange: [0, 100],
          animationDelay: 0,
          data: hourlyHumidity,
          tooltipConfig: {
            getCustomLabel: (x, y) => {
              return `${getHumidityLabel(y)} humidity at ${getXLabel(x)}`
            },
          },
        },
        {
          id: 'temperature-area',
          graphStyle: 'area',
          label: '',
          labelColor: themePurpleMain,
          gradientColorStops: [themeTealMain, themePurpleMain],
          gradientTransparencyStops: [0.5, 0],
          gradientDirection: 'v',
          animationDelay: 0.5,
          data: hourlyTemps,
        },
        {
          id: 'temperature-line',
          graphStyle: 'line',
          label: 'TEMPERATURE',
          labelColor: themePurpleMain,
          gradientColorStops: [themeTealMain, themePurpleMain],
          gradientDirection: 'v',
          animationDelay: 0.5,
          data: hourlyTemps,
          tooltipConfig: {
            getXLabel: getXLabel,
            getYLabel: (y) => getTemperatureLabel(y),
            xAlias: 'Time',
            yAlias: 'Temperature'
          },
        },
      ]}
      xAxis={{
        labeledPoints: hourlyTemps,
        labelFrequency: 4,
      }}
      styles={{
        rightDataLabels: {
          textStyle: { letterSpacing: '.75px' },
        },
      }}
    />
  );
};
