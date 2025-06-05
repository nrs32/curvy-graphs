export type Point = { x: number; y: number };

export type LabeledYPoint = { yLabel: string, y: number };

export type LabeledXPoint = { xLabel: string, xSubLabel?: string, x: number};

export interface GraphProps {
  graphWidth: number,
  graphHeight: number,
  chartTop: number,
  chartLeft: number,
}
export type GraphType = 'line' | 'dashed-line' | 'area';

export type GradientDirection = 'v' | 'h'; // vertical or horizontal

export interface YAxisLabelConfig {
  heightOffset: number;
  textRightPadding: number;
  lengthOfTicks: number;
  textLeftPadding: number;
  endOfTickMark: number;
  svgWidth: number;
}
