import Box from '@mui/material/Box';
import { CurvyGraphAnimator, CurvyGraphPart, RightDataLabel, XAxis, YAxis } from 'curvy-graphs/parts';
import { hourlyTemps } from './hourly-temps';
import { hourlyHumidity } from './hourly-humidity';
import { getCombinedYRange, getTempAndHumidityLabel, getTemperatureLabel } from './temp-v-humidity-utils';

const TempVHumidityGraphFromParts = () => {

	const combinedYPoints = getCombinedYRange(hourlyTemps.map(temp => temp.y));
	const chartTop = 7;
	const chartLeft = 0;
	const dataTop = chartTop + 59;
	const dataLeft = chartLeft + 95;
	const labelTop = dataTop - 18;
	const graphWidth = 400;
	const graphHeight = 200;
	const labelLeft = dataLeft + graphWidth + 7;

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
					<CurvyGraphPart animationRefs={refs} id='dashed' width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} data={hourlyHumidity} yRange={[0, 100]} gradientstops={['#C332DF', "white"]} gradientDirection='h' type="dashed-line" />
				)}
			</CurvyGraphAnimator>
			<RightDataLabel label="HUMIDITY" labelColor={'#E3A5F0'} width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${labelTop}px`, left: `${labelLeft}px` }} data={hourlyHumidity} yRange={[0, 100]}></RightDataLabel>

			<CurvyGraphAnimator id="line" width={graphWidth} data={hourlyTemps} delay={.5}>
				{(refs) => (
					<CurvyGraphPart animationRefs={refs} id='line' width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} data={hourlyTemps} gradientstops={['#2FF3E0', '#5D6CE9']} type="line-area" />
				)}
			</CurvyGraphAnimator>
			<RightDataLabel label="TEMPERATURE" labelColor={'#5D6CE9'} width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${labelTop}px`, left: `${labelLeft}px` }} data={hourlyTemps} ></RightDataLabel>

			<XAxis width={graphWidth} style={{ position: "absolute", top: `calc(${graphHeight}px + ${dataTop + 7}px)`, left: `${dataLeft}px` }} data={hourlyTemps} labelFrequency={4} primaryTickColor={'#E0E1E2'} secondaryTickColor={'#3A3D4B'} labelColor={'#E0E1E2'}></XAxis>
		</Box>
	)
}

export default TempVHumidityGraphFromParts;
