import type { YAxisLabelConfig } from "../types/graph-types";

export const getYAxisLabelConfig = (textSpace: number): YAxisLabelConfig => {
  const textRightPadding = 7;
  const lengthOfTicks = 10;
  const textLeftPadding = 20;
  const endOfTickMark = textSpace + textRightPadding + lengthOfTicks;

  return {
    heightOffset: 10,
    textRightPadding,
    lengthOfTicks,
    textLeftPadding,
    endOfTickMark,
    yAxisOutsideGraph: textLeftPadding + endOfTickMark,
  }
}
