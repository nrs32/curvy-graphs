import Card from '@mui/material/Card';
import TempVHumidityGraphFromParts from './temp-v-humidity/temp-v-humidity-parts-demo';
import { CurvyGraph } from 'curvy-graphs';
import { hourlyHumidity } from './temp-v-humidity/hourly-humidity';
import { hourlyTemps } from './temp-v-humidity/hourly-temps';
import { getCombinedYRange, getTempAndHumidityLabel, getTemperatureLabel } from './temp-v-humidity/temp-v-humidity-utils';

function App() {

  return (
    <>
      <h1 style={{ marginLeft: '20px' }}>Chart Demo</h1>
      <p>Using Parts</p>
      <Card
        sx={{
          position: 'relative',
          color: "#E0E1E2",
          margin: '20px',
          width: '593px',
          height: '312px',
          padding: '45px',
          background: `linear-gradient(to bottom right, #272934, #161923)`,
        }}
      >
        <TempVHumidityGraphFromParts/>
      </Card>

      <p>Using CurvyGraph</p>
      <Card
        sx={{
          position: 'relative',
          color: "#E0E1E2",
          margin: '20px',
          width: '593px',
          height: '312px',
          padding: '45px',
          background: `linear-gradient(to bottom right, #272934, #161923)`,
        }}
      >
        <CurvyGraph 
          chartTitle='Humidity and Temperature (Sun 6/1)' 
          yAxis={{
            labeledPoints: getCombinedYRange(hourlyTemps.map(temp => temp.y)),
            getExtendedYLabel: (y) => getTempAndHumidityLabel(getTemperatureLabel(y), 'N/A'),
          }}
          dataSets={[
            {
              dataId: "humidity",
              graphStyle: 'dashed-line',
              label: "HUMIDITY",
              labelColor: '#E3A5F0',
              gradientStops: ['#C332DF', 'white'],
              gradientDirection: 'h',
              yRange: [0, 100],
              animationDelay: 0,
              data: hourlyHumidity,
            },
            {
              dataId: "temperature",
              graphStyle: 'line-area',
              label: "TEMPERATURE",
              labelColor: '#5D6CE9',
              gradientStops: ['#2FF3E0', '#5D6CE9'],
              gradientDirection: 'v',
              animationDelay: .5,
              data: hourlyTemps
            }
          ]}
          xAxis={{
            labeledPoints: hourlyTemps,
          }}/>
      </Card>
    </>
  )
}

export default App
