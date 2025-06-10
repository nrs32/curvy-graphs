import type { LabeledYPoint } from 'curvy-graphs';
import { dailyMins } from './daily-mins';
import { dailyMaxes } from './daily-maxes';
import { generateLabeledYPoints } from 'curvy-graphs/parts';

export const getLabeledYPoints = (): LabeledYPoint[] => {
  return generateLabeledYPoints(getYRange(), 24, getTemperatureLabel);
};

export const getYRange = (): [number, number] => {
  const weeklyMin: number = Math.min(...dailyMins.map(point => point.y));
  const weeklyMax: number = Math.max(...dailyMaxes.map(point => point.y));

  return [weeklyMin, weeklyMax]
}
const getTemperatureLabel = (degreesF: number): string => {
  return `${Math.round(degreesF)}°F`
}

export default getLabeledYPoints;