export type Point = { x: number; y: number };

export type LabeledYPoint = { yLabel: string, y: number };

export type LabeledXPoint = { xLabel: string, xSubLabel?: string, x: number};

export interface GraphProps {
  graphWidth: number,
  graphHeight: number,
  chartTop: number,
  chartLeft: number,
}

// line-area is a solid line with a transparent area
// area is a area graph
// dashed-line is a dashed line, no area
export type GraphType = 'line-area' | 'area' | 'dashed-line';