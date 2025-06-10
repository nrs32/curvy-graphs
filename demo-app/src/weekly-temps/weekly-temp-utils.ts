import type { LabeledYPoint } from "curvy-graphs";
import { weeklyMins } from "./weekly-mins";
import { weeklyMaxes } from "./weekly-maxes";
import { generateLabeledYPoints } from "curvy-graphs/parts";

export const getLabeledYPoints = (): LabeledYPoint[] => {
  const weeklyMin: number = Math.min(...weeklyMins.map(point => point.y));
  const weeklyMax: number = Math.max(...weeklyMaxes.map(point => point.y));

  return generateLabeledYPoints([weeklyMin, weeklyMax], 24, getTemperatureLabel);
};

const getTemperatureLabel = (degreesF: number): string => {
  return `${Math.round(degreesF)}°F`
}

export default getLabeledYPoints;