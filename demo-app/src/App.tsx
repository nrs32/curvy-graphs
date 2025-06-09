import Card from '@mui/material/Card';
import TempVHumidityGraphFromParts from './temp-v-humidity/temp-v-humidity-parts-demo';
import { WeeklyTempsGraph } from './weekly-temps/weekly-temps-graph';
import { WaterLevelGraph } from './water-level-ludington/water-level-graph';
import { TempVApparentGraph } from './temp-v-apparent/temp-v-apparent-graph';
import { PrecipitationGraph } from './precipitation/precipitation-graph';
import { TempVHumidityCurvyGraph } from './temp-v-humidity/temp-v-humidity-curvy-graph';
import { TempVHumidityCurvyGraphSmall } from './temp-v-humidity/temp-v-humidity-curvy-graph-small';
import { TempVHumidityCurvyGraphResponsive } from './temp-v-humidity/temp-v-humidity-curvy-graph-responsive';
import { CurvyGraph, ResponsiveCurvyGraph } from 'curvy-graphs';

function App() {

  // TODO: make many chart examples and populate readme 
  // TODO: dashboard considaration
  // TODO: refactor to label points on hover somehow (?)
  // TODO: furture could potentially support: sharp lines with optional dots at data points, other charts like bar and pie

  const tempHumidityCardStyle: React.CSSProperties = {
    position: 'relative',
    color: "#E0E1E2",
    margin: '20px',
    width: '593px',
    height: '312px',
    padding: '45px',
    background: `linear-gradient(to bottom right, #272934, #161923)`,
  };

  return (
    <>
      <h1 style={{ marginLeft: '20px' }}>Chart Demo</h1>
      <p>Data For Humidity and Temperature graph, and min/avg/max Temperatures from openmeteo 2025</p>
      <p>Using Parts</p>
      <Card sx={tempHumidityCardStyle}>
        <TempVHumidityGraphFromParts />
      </Card>

      <p>Using CurvyGraph</p>
      <Card sx={tempHumidityCardStyle}>
        <TempVHumidityCurvyGraph />
      </Card>

      <p>Using Curvy Graph Smaller</p>
      <Card sx={{ ...tempHumidityCardStyle, width: '500px', height: '250px' }}>
        <TempVHumidityCurvyGraphSmall />
      </Card>

      <p>Responsive with %s</p>
      <Card style={{
        ...tempHumidityCardStyle,
        display: "flex",
        width: 'unset',
        height: "335px",
        padding: '45px',
      }}>
        <TempVHumidityCurvyGraphResponsive />
      </Card>

      <p>Area graph</p>
      <Card sx={{ ...tempHumidityCardStyle, width: '582px', height: '349px' }}>
        <WeeklyTempsGraph />
      </Card>

      <p>Water Levels - different color/style example</p>
      <p>Data For water levels from <a href="https://tidesandcurrents.noaa.gov/waterlevels.html?id=9087023&type=Tide+Data&name=Ludington&state=MI" target="_blank">NOAA</a> @ Ludington Beach, Michigan</p>
      <Card sx={{ ...tempHumidityCardStyle, width: '600px', height: '440px', background: `#040940`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <WaterLevelGraph />
        <p style={{ fontStyle: "italic", fontSize: "14px", textAlign: "center" }}>*Water level above LWD - the standardized low point for Lake Michigan (576 ft)</p>
      </Card>

      <p>Temp V Apparent - different color/style example</p>
      <Card sx={{ ...tempHumidityCardStyle, background: `#f4f6f8` }}>
        <TempVApparentGraph />
      </Card>

      <p>Cumulative Precipitation - isSharp = true</p>
      <p>Data for precipitation <a href="https://www.wunderground.com/history" target='_blank'>wunderground</a> GR, Michigan</p>
      <Card sx={{ ...tempHumidityCardStyle, background: `#ffffff`, height: '645px' }}>
        <PrecipitationGraph isCumulative={false} />
        <div style={{ height: '45px', width: '100%' }}></div>
        <PrecipitationGraph isCumulative={true} />
      </Card>

      <p>Basic Example</p>
      <Card sx={{ ...tempHumidityCardStyle }}>
        <CurvyGraph
          chartTitle="Weekly Temperatures"
          textColor="#E0E1E2"
          width={613}
          height={310}
          yAxis={{
            labeledPoints: [
              { y: 0, yLabel: '0°F' },
              { y: 10, yLabel: '10°F' },
              { y: 20, yLabel: '20°F' },
              { y: 30, yLabel: '30°F' },
            ],
          }}
          xAxis={{
            labeledPoints: [
              { x: 0, xLabel: 'Mon' },
              { x: 1, xLabel: 'Tue' },
              { x: 2, xLabel: 'Wed' },
              { x: 3, xLabel: 'Thu' },
              { x: 4, xLabel: 'Fri' },
              { x: 5, xLabel: 'Sat' },
              { x: 6, xLabel: 'Sun' },
            ],
          }}
          dataSets={[
            {
              dataId: "temperatures",
              graphStyle: 'line',
              label: "Temperature",
              labelColor: '#5D6CE9',
              gradientColorStops: ['#2FF3E0', '#5D6CE9'],
              gradientDirection: 'v',
              data: [
                { x: 0, y: 12 },
                { x: 1, y: 15 },
                { x: 2, y: 18 },
                { x: 3, y: 20 },
                { x: 4, y: 17 },
                { x: 5, y: 14 },
                { x: 6, y: 13 },
              ]
            }
          ]}
        />
      </Card>

      <p>Basic Responsive Example</p>
      <Card style={{
        ...tempHumidityCardStyle,
        display: "flex",
        width: 'unset',
        height: "335px",
        padding: '45px',
      }}>
        <div style={{ width: "70%", border: "1px dashed red" }}>
          <ResponsiveCurvyGraph
            chartTitle="Weekly Temperatures"
            textColor="#E0E1E2"
            width={'100%'}
            height={310}
            animate={true}
            yAxis={{
              labeledPoints: [
                { y: 0, yLabel: '0°F' },
                { y: 10, yLabel: '10°F' },
                { y: 20, yLabel: '20°F' },
                { y: 30, yLabel: '30°F' },
              ],
            }}
            xAxis={{
              labeledPoints: [
                { x: 0, xLabel: 'Mon' },
                { x: 1, xLabel: 'Tue' },
                { x: 2, xLabel: 'Wed' },
                { x: 3, xLabel: 'Thu' },
                { x: 4, xLabel: 'Fri' },
                { x: 5, xLabel: 'Sat' },
                { x: 6, xLabel: 'Sun' },
              ],
            }}
            dataSets={[
              {
                dataId: "responsive-temperatures",
                graphStyle: 'line',
                label: "Temperature",
                labelColor: '#5D6CE9',
                gradientColorStops: ['#2FF3E0', '#5D6CE9'],
                gradientDirection: 'v',
                data: [
                  { x: 0, y: 12 },
                  { x: 1, y: 15 },
                  { x: 2, y: 18 },
                  { x: 3, y: 20 },
                  { x: 4, y: 17 },
                  { x: 5, y: 14 },
                  { x: 6, y: 13 },
                ]
              }
            ]}
          />
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
      </Card>
    </>
  )
}

export default App
