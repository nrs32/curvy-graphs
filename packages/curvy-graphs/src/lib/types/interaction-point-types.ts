import type { NonNullPoint } from "./graph-types";

export interface CustomInteractionLabel {
  custom: string;
}

export interface XYInteractionLabel {
  xLabel: string;
  yLabel: string;
  xAlias: string;
  yAlias: string;
}

export interface InteractionPoint {
  svgPoint: NonNullPoint;
  dataSetLabel: string;
  pointLabel: CustomInteractionLabel | XYInteractionLabel;
}