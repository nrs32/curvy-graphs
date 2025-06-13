import { ResponsiveCurvyGraph } from 'curvy-graphs';
import { getCombinedYRange, getHumidityLabel, getTempAndHumidityLabel, getTemperatureLabel, getXLabel } from './temp-v-humidity-utils';
import { hourlyHumidity } from './hourly-humidity';
import { hourlyTemps } from './hourly-temps';
import { themePinkLight, themePinkMain, themePurpleMain, themeTealMain } from './temp-humidity-theme';

export const TempVHumidityCurvyGraphResponsive = () => {
  return (
    <>
      <div style={{ width: '70%', border: '1px dashed red' }}>
        <ResponsiveCurvyGraph
          chartTitle='Humidity and Temperature (Sun 6/1)'
          spaceBelowData={20}
          width='100%'
          height='100%'
          textColor='#E0E1E2'
          animate={true}
          yAxis={{
            labeledPoints: getCombinedYRange(hourlyTemps.map(temp => temp.y) as number[]),
            getExtendedYLabel: (y) => getTempAndHumidityLabel(getTemperatureLabel(y), 'N/A'),
            labelFrequency: 5,
          }}
          dataSets={[
            {
              id: 'humidity-responsive',
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
              id: 'temperature-line-responsive',
              graphStyle: 'line',
              label: 'TEMPERATURE',
              labelColor: themePurpleMain,
              gradientColorStops: [themeTealMain, themePurpleMain],
              gradientDirection: 'v',
              animationDelay: 0.5,
              data: hourlyTemps,
            },
            {
              id: 'temperature-area-responsive',
              graphStyle: 'area',
              label: '',
              labelColor: themePurpleMain,
              gradientColorStops: [themeTealMain, themePurpleMain],
              gradientTransparencyStops: [0.5, 0],
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
      </div>

      <div
        style={{
          flex: 1,
          padding: '20px',
          border: '1px dashed blue',
          color: 'white',
          alignContent: 'center',
          textAlign: 'center',
        }}
      >
        <p>Other layout content could be here</p>
      </div>
    </>
  );
};
