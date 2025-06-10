import type { LabeledYPoint } from "curvy-graphs";
import { generateLabeledYPoints } from "curvy-graphs/parts";

export const getTempAndHumidityLabel = (tempLabel: string, humidityLabel: string): string => {
	return `${tempLabel} • ${humidityLabel}`
}

export const getCombinedYRange = (temperatures: number[]): LabeledYPoint[] => {
	// NOTE: Even though the y values are different for these 2 data sets
	// they will be normalized to the same svg y coordinate in yAxis component
	// So we can combine the lables for each data set
	// And they should line up correctly on the graph

	const totalDataPoints = 24;
	const maxTemp: number = Math.max(...temperatures);
	const minTemp: number = Math.min(...temperatures);
	const tempLabels: LabeledYPoint[] = generateLabeledYPoints([minTemp, maxTemp], totalDataPoints, getTemperatureLabel);

	const humidityLabels: LabeledYPoint[] = generateLabeledYPoints([0, 100], totalDataPoints, getHumidityLabel);

	return tempLabels.map((tempY, i) => ({
		...tempY,
		yLabel: getTempAndHumidityLabel(tempY.yLabel, humidityLabels[i].yLabel),
	}));
}

export const getHumidityLabel = (humidity: number): string => {
	const percent = Math.round(humidity);
	return `${percent > 100 || percent < 0 ? 'N/A' : `${percent}%`}`;
}

export const getTemperatureLabel = (degreesF: number): string => {
	return `${Math.round(degreesF)}°F`
}