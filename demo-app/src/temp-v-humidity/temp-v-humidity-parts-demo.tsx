import Box from '@mui/material/Box';
import { ChartTitle, CurvyGraphAnimator, CurvyGraphPart, RightDataLabel, XAxis, YAxis } from 'curvy-graphs/parts';
import { hourlyTemps } from './hourly-temps';
import { hourlyHumidity } from './hourly-humidity';
import { getCombinedYRange, getTempAndHumidityLabel, getTemperatureLabel } from './temp-v-humidity-utils';

const TempVHumidityGraphFromParts = () => {
	const combinedYPoints = getCombinedYRange(hourlyTemps.map(temp => temp.y));
	
  const graphWidth = 400;
  const graphHeight = 200;

  const dataTop = 59;
  const dataLeft = 89;
  const labelTop = dataTop - 18;
  const labelLeft = dataLeft + graphWidth + 7;
	
	const SPACE_BELOW_DATA = 20;

	return (
		<Box sx={{
			position: 'relative',
			height: '353px',
			width: '615px',
		}}
		>
			<ChartTitle title={'Humidity and Temperature (Sun 6/1)'} color={'#E0E1E2'} leftOffset={dataLeft} widthToCenterOn={graphWidth}/>

			<YAxis style={{ position: "absolute", top: `${dataTop - 1}px`, left: `${dataLeft - 94}px` }} labelFrequency={5} labeledYPoints={combinedYPoints} getLabel={(y) => getTempAndHumidityLabel(getTemperatureLabel(y), 'N/A')} graphWidth={graphWidth} height={graphHeight} primaryTickColor={'#E0E1E2'} secondaryTickColor={'#3A3D4B'} labelColor={'#E0E1E2'} spaceBelowData={SPACE_BELOW_DATA} showGuideLines={true}/>

			<CurvyGraphAnimator id="humidity-parts" width={graphWidth} data={hourlyHumidity} delay={0}>
				{(refs) => (
					<CurvyGraphPart animationRefs={refs} id='humidity-parts' width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} data={hourlyHumidity} yRange={[0, 100]} gradientColorStops={['#C332DF', "white"]} gradientDirection='h' type="dashed-line" spaceBelowData={SPACE_BELOW_DATA}/>
				)}
			</CurvyGraphAnimator>
			<RightDataLabel label="HUMIDITY" labelColor={'#E3A5F0'} height={graphHeight} style={{ position: "absolute", top: `${labelTop}px`, left: `${labelLeft}px` }} data={hourlyHumidity} yRange={[0, 100]} spaceBelowData={SPACE_BELOW_DATA}></RightDataLabel>

			<CurvyGraphAnimator id="temperature-line-parts" width={graphWidth} data={hourlyTemps} delay={.5}>
				{(refs) => (
					<CurvyGraphPart animationRefs={refs} id='temperature-line-parts' width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} data={hourlyTemps} gradientColorStops={['#2FF3E0', '#5D6CE9']} type="line" spaceBelowData={SPACE_BELOW_DATA}/>
				)}
			</CurvyGraphAnimator>
			<RightDataLabel label="TEMPERATURE" labelColor={'#5D6CE9'} height={graphHeight} style={{ position: "absolute", top: `${labelTop}px`, left: `${labelLeft}px` }} textStyle={{ letterSpacing: '.75px' }} data={hourlyTemps} spaceBelowData={SPACE_BELOW_DATA}></RightDataLabel>

			<CurvyGraphAnimator id="temperature-area-parts" width={graphWidth} data={hourlyTemps} delay={.5}>
				{(refs) => (
					<CurvyGraphPart animationRefs={refs} id='temperature-area-parts' width={graphWidth} height={graphHeight} style={{ position: "absolute", top: `${dataTop}px`, left: `${dataLeft}px` }} data={hourlyTemps} gradientColorStops={['#2FF3E0', '#5D6CE9']} gradientTransparencyStops={[.5, 0]} type="area" spaceBelowData={SPACE_BELOW_DATA}/>
				)}
			</CurvyGraphAnimator>

			<XAxis width={graphWidth} style={{ position: "absolute", top: `calc(${graphHeight}px + ${dataTop + 7}px)`, left: `${dataLeft}px` }} data={hourlyTemps} labelFrequency={4} primaryTickColor={'#E0E1E2'} secondaryTickColor={'#3A3D4B'} labelColor={'#E0E1E2'}/>
		</Box>
	)
}

export default TempVHumidityGraphFromParts;
