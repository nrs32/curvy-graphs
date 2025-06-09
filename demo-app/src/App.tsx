import Card from '@mui/material/Card';
import TempVHumidityGraphFromParts from './temp-v-humidity/temp-v-humidity-parts-demo';
import { CurvyGraph, ResponsiveCurvyGraph } from 'curvy-graphs';
import { hourlyHumidity } from './temp-v-humidity/hourly-humidity';
import { hourlyTemps } from './temp-v-humidity/hourly-temps';
import { getCombinedYRange, getTempAndHumidityLabel, getTemperatureLabel } from './temp-v-humidity/temp-v-humidity-utils';
import getLabeledYPoints from './weekly-temps/weekly-temp-utils';
import { WeeklyTempsGraph } from './weekly-temps/weekly-temps-graph';
import { WaterLevelGraph } from './water-level-ludington/water-level-graph';
import { TempVApparentGraph } from './temp-v-apparent/temp-v-apparent-graph';
import { PrecipitationGraph } from './precipitation/precipitation-graph';

function App() {

  // TODO: make many chart examples and populate readme (dashboard considaration)
  // TODO: refactor to label points on hover somehow (?)
  // TODO: add sharp instead of curvy

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
        <TempVHumidityGraphFromParts/>
      </Card>

      <p>Using CurvyGraph</p>
      <Card sx={tempHumidityCardStyle}>
        <CurvyGraph 
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
          }}/>
      </Card>

      <p>Using Curvy Graph Smaller</p>
      <Card sx={{...tempHumidityCardStyle, width: '500px', height: '250px'}}>
        <CurvyGraph 
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
          }}/>
      </Card>

      <p>Responsive with %s</p>
      <Card style={{...tempHumidityCardStyle, 
        display: "flex", 
        width: 'unset',
        height: "335px", 
        padding: '45px',
      }}>
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
      </Card>

      <p>Area graph</p>
      <Card sx={{...tempHumidityCardStyle, width: '582px', height: '349px'}}>
        <WeeklyTempsGraph/>
      </Card>

      <p>Water Levels - different color/style example</p>
      <p>Data For water levels from <a href="https://tidesandcurrents.noaa.gov/waterlevels.html?id=9087023&type=Tide+Data&name=Ludington&state=MI" target="_blank">NOAA</a> @ Ludington Beach, Michigan</p>
      <Card sx={{...tempHumidityCardStyle, width: '600px', height: '440px', background: `#040940`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <WaterLevelGraph/>
        <p style={{ fontStyle: "italic", fontSize: "14px", textAlign: "center" }}>*Water level above LWD - the standardized low point for Lake Michigan (576 ft)</p>
      </Card>

      <p>Temp V Apparent - different color/style example</p>
      <Card sx={{...tempHumidityCardStyle, background: `#f4f6f8`}}>
        <TempVApparentGraph/>
      </Card>

      <p>Cumulative Precipitation - different color/style example - sharp</p>
      <p>Data for precipitation <a href="https://www.wunderground.com/history" target='_blank'>wunderground</a> GR, Michigan</p>
      <Card sx={{...tempHumidityCardStyle, background: `#ffffff`, height: '645px' }}>
        <PrecipitationGraph isCumulative={false}/>
        <div style={{ height: '45px', width: '100%' }}></div>
        <PrecipitationGraph isCumulative={true}/>
      </Card>
      
    </>
  )
}

export default App
