import type { LabeledYPoint } from "../types/graph-types";

/**
 * Generates an array of evenly distributed LabeledYPoint objects across a given y-axis range.
 *
 * For example, given yRange = [2, 10] and totalDataPoints = 5, the result will be:
 *   [ { y: 2, yLabel: ... }, { y: 4, yLabel: ... }, { y: 6, yLabel: ... }, { y: 8, yLabel: ... }, { y: 10, yLabel: ... } ]
 *
 * If your chart uses spaceBelowData (e.g., for visual padding), you may need to add additional ticks for that space.
 *
 * @param yRange - [min, max] range for the Y-axis (inclusive)
 * @param totalDataPoints - The number of points to generate
 * @param getLabel - Function to generate a label for each Y value
 * @returns An array of LabeledYPoint objects with evenly spaced y values and generated labels
 */
const generateLabeledYPoints = (
  yRange: [number, number],
  totalDataPoints: number,
  getLabel: (y: number) => string,
): LabeledYPoint[] => {
  const [min, max] = yRange;

  const step = (max - min) / totalDataPoints;
  const labeledYPoints: LabeledYPoint[] = [];

  for (let i = min; labeledYPoints.length < totalDataPoints; i += step) {
    labeledYPoints.push({
      y: i,
      yLabel: getLabel(i),
    });
  }

  return labeledYPoints;
}

export default generateLabeledYPoints;