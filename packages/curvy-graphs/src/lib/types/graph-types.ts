export type NonNullPoint = { x: number; y: number; };

export type Point = { x: number | null; y: number | null };

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
  yAxisOutsideGraph: number;
}

export interface CustomTooltip {
  getCustomLabel: (x: number, y: number) => string;
}

export interface XYTooltip {
  getXLabel?: (x: number) => string;
  getYLabel?: (x: number) => string;
  xAlias?: string;
  yAlias?: string;
}

export type TooltipConfig = CustomTooltip | XYTooltip;

export interface DataSet {
  id: string; 
  graphStyle: GraphType;
  label: string;
  labelColor: string;
  gradientColorStops: [string, string];
  gradientTransparencyStops?: [number, number]; 
  gradientDirection: GradientDirection;
  yRange?: [number, number]; 
  xRange?: [number, number]; 
  tooltipConfig?: TooltipConfig,
  animationDelay?: number; 
  data: Point[];
  styles?: {
    labelTop?: number;
    labelLeft?: number;
    pathStyle?: React.CSSProperties;
  }
}
