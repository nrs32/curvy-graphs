export const getYAxisLabelConfig = (textSpace: number, graphWidth: number) => {
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
    svgWidth: textLeftPadding + endOfTickMark + graphWidth,
  }
}
