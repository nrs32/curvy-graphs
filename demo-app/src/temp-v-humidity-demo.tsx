import Box from '@mui/material/Box';
import type { LabeledXPoint, LabeledYPoint, Point } from 'curvy-graphs';
import { CurvyGraphAnimator, CurvyGraphPart, determineYRangePoints, RightDataLabel, XAxis, YAxis } from 'curvy-graphs/parts';

const TempVHumidityGraph = () => {
  const hourlyTemps: LabeledXPoint[] = [
    {
        "x": 0,
        "y": 48,
        "xLabel": "12:00 AM"
    },
    {
        "x": 1,
        "y": 46,
        "xLabel": "1:00 AM"
    },
    {
        "x": 2,
        "y": 44,
        "xLabel": "2:00 AM"
    },
    {
        "x": 3,
        "y": 43,
        "xLabel": "3:00 AM"
    },
    {
        "x": 4,
        "y": 42,
        "xLabel": "4:00 AM"
    },
    {
        "x": 5,
        "y": 41,
        "xLabel": "5:00 AM"
    },
    {
        "x": 6,
        "y": 40,
        "xLabel": "6:00 AM"
    },
    {
        "x": 7,
        "y": 41,
        "xLabel": "7:00 AM"
    },
    {
        "x": 8,
        "y": 48,
        "xLabel": "8:00 AM"
    },
    {
        "x": 9,
        "y": 51,
        "xLabel": "9:00 AM"
    },
    {
        "x": 10,
        "y": 56,
        "xLabel": "10:00 AM"
    },
    {
        "x": 11,
        "y": 59,
        "xLabel": "11:00 AM"
    },
    {
        "x": 12,
        "y": 62,
        "xLabel": "12:00 PM"
    },
    {
        "x": 13,
        "y": 64,
        "xLabel": "1:00 PM"
    },
    {
        "x": 14,
        "y": 65,
        "xLabel": "2:00 PM"
    },
    {
        "x": 15,
        "y": 65,
        "xLabel": "3:00 PM"
    },
    {
        "x": 16,
        "y": 64,
        "xLabel": "4:00 PM"
    },
    {
        "x": 17,
        "y": 63,
        "xLabel": "5:00 PM"
    },
    {
        "x": 18,
        "y": 61,
        "xLabel": "6:00 PM"
    },
    {
        "x": 19,
        "y": 59,
        "xLabel": "7:00 PM"
    },
    {
        "x": 20,
        "y": 55,
        "xLabel": "8:00 PM"
    },
    {
        "x": 21,
        "y": 50,
        "xLabel": "9:00 PM"
    },
    {
        "x": 22,
        "y": 48,
        "xLabel": "10:00 PM"
    },
    {
        "x": 23,
        "y": 47,
        "xLabel": "11:00 PM"
    }
];

  const hourlyHumidity: Point[] = [
    {
        "x": 0,
        "y": 63
    },
    {
        "x": 1,
        "y": 66
    },
    {
        "x": 2,
        "y": 69
    },
    {
        "x": 3,
        "y": 72
    },
    {
        "x": 4,
        "y": 74
    },
    {
        "x": 5,
        "y": 77
    },
    {
        "x": 6,
        "y": 80
    },
    {
        "x": 7,
        "y": 83
    },
    {
        "x": 8,
        "y": 73
    },
    {
        "x": 9,
        "y": 60
    },
    {
        "x": 10,
        "y": 55
    },
    {
        "x": 11,
        "y": 51
    },
    {
        "x": 12,
        "y": 46
    },
    {
        "x": 13,
        "y": 42
    },
    {
        "x": 14,
        "y": 41
    },
    {
        "x": 15,
        "y": 41
    },
    {
        "x": 16,
        "y": 42
    },
    {
        "x": 17,
        "y": 45
    },
    {
        "x": 18,
        "y": 52
    },
    {
        "x": 19,
        "y": 62
    },
    {
        "x": 20,
        "y": 70
    },
    {
        "x": 21,
        "y": 70
    },
    {
        "x": 22,
        "y": 61
    },
    {
        "x": 23,
        "y": 55
    }
];

  const combinedYPoints = getCombinedYRange(hourlyTemps.map(temp => temp.y));
  const chartTop = 7;
  const chartLeft = 0;
  const dataTop = chartTop + 59;
  const dataLeft = chartLeft + 95;
  const labelTop = dataTop - 18;
  const labelLeft = dataLeft + 113;
  const graphWidth = 400;
  const graphHeight = 200;

  return (
    <Box sx={{
      position: 'relative',
      height: '353px',
      width: '615px',
    }}
    >
      <Box
        sx={{
          fontWeight: 700,
          fontSize: '22px',
          textAlign: 'center',
          position: 'absolute',
          top: `${chartTop}px`,
          width: '410px',
          left: `${chartLeft + 93}px`
        }}
      >
        Humidity and Temperature (Sun 6/1)
     </Box>
      <YAxis style={{ position: "absolute", top: `${dataTop - 1}px`, left: `${dataLeft - 89}px` }} labeledYPoints={combinedYPoints} getLabel={(y) => getTempAndHumidityLabel(getTemperatureLabel(y), 'N/A')} graphWidth={graphWidth} height={graphHeight} textSpace={65} primaryTickColor={'#E0E1E2'} secondaryTickColor={'#3A3D4B'} labelColor={'#E0E1E2'}></YAxis>

      <CurvyGraphAnimator id="dashed" width={graphWidth} data={hourlyHumidity} delay={0}>
        {(refs) => (
          <CurvyGraphPart animationRefs={refs} id='dashed' width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} data={hourlyHumidity} yRange={[0, 100]} gradientstops={['#C332DF', "white"]} gradientDirection='h' type="dashed-line"/>
        )}
      </CurvyGraphAnimator>
      <RightDataLabel label="HUMIDITY" labelColor={'#E3A5F0'} width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${labelTop}px`, left: `${labelLeft - 35}px` }} data={hourlyHumidity} yRange={[0, 100]}></RightDataLabel>

      <CurvyGraphAnimator id="line" width={graphWidth} data={hourlyTemps} delay={.5}>
        {(refs) => ( 
          <CurvyGraphPart animationRefs={refs} id='line' width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px`  }} data={hourlyTemps} gradientstops={['#2FF3E0', '#5D6CE9']} type="line-area"/>
        )}
      </CurvyGraphAnimator>
      <RightDataLabel label="TEMPERATURE" labelColor={'#5D6CE9'} width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${labelTop}px`, left: `${labelLeft}px`  }} data={hourlyTemps} ></RightDataLabel>

      <XAxis width={graphWidth} style={{ position: "absolute", top: `calc(${graphHeight}px + ${dataTop + 7}px)`, left: `${dataLeft}px` }} data={hourlyTemps} labelFrequency={4} primaryTickColor={'#E0E1E2'} secondaryTickColor={'#3A3D4B'} labelColor={'#E0E1E2'}></XAxis>
    </Box>
  )
}

const getTempAndHumidityLabel = (tempLabel: string, humidityLabel: string): string => {
  return `${tempLabel} • ${humidityLabel}`
}

const getCombinedYRange = (temperatures: number[]): LabeledYPoint[] => {
  // NOTE: Even though the y values are different for these 2 data sets
  // they will be normalized to the same svg y coordinate in yAxis component
  // So we can combine the lables for each data set
  // And they should line up correctly on the graph

  const totalDataPoints = 23;
  const maxTemp: number = Math.max(...temperatures);
  const minTemp: number = Math.min(...temperatures);
  const tempLabels: LabeledYPoint[] = determineYRangePoints([minTemp, maxTemp], totalDataPoints, getTemperatureLabel);

  const humidityLabels: LabeledYPoint[] = determineYRangePoints([0, 100], totalDataPoints, getHumidityLabel);

  return tempLabels.map((tempY, i) => ({
    ...tempY,
    yLabel: getTempAndHumidityLabel(tempY.yLabel, humidityLabels[i].yLabel),
  }));
}

const getHumidityLabel = (humidity: number): string  => {
  const percent = Math.round(humidity);
  return `${percent > 100 || percent < 0 ? 'N/A' : `${percent}%`}`;
}

const getTemperatureLabel = (degreesF: number): string => {
  return `${Math.round(degreesF)}°F`
}

export default TempVHumidityGraph;
