import React, { useEffect, useRef, useState } from 'react';
import normalizeDataPoints from '../utils/normalize-data-points';
import { type Point } from '../types/graph-types';

export interface RightDataLabelProps {
  data: Point[];
  height: number;
  yRange?: [number, number]; 
  labelColor: string;
  label: string;
  spaceBelowData: number;
  onWidthMeasured?: (width: number) => void, 
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

/**
 * RightDataLabel is a React component that renders a label aligned to the rightmost data point of a graph.
 *
 * Props:
 * - data: Array of Point objects representing the data to plot. 
 *         We do this to calculate the normalized y values the same way the chart data does
 *         This way we get an accurate final y value to position the text relative to.
 * - height: Height of the SVG/chart area in pixels.
 * - yRange: Optional [minY, maxY] tuple to specify the Y-axis range instead of the data min/max.
 * - labelColor: Color for the label text.
 * - label: The text to display as the label.
 * - spaceBelowData: Extra space below the lowest data point for visual padding. 
 *                   Again used for postion calculations to match where the data is actually rendered in the chart.
 * - onWidthMeasured: Optional callback to access the rendered label width (in pixels).
 * - style: Optional CSS styles for the container div.
 * - textStyle: Optional CSS styles for the SVG text element directly. Can also override default values.
 *
 * The component normalizes data points, positions the label at the last data point, and dynamically measures its width for layout purposes.
 */
const RightDataLabel: React.FC<RightDataLabelProps> = ({
  data,
  height,
  yRange,
  labelColor,
  label,
  spaceBelowData,
  onWidthMeasured,
  style,
  textStyle,
}) => {
  const textRef = useRef<SVGTextElement>(null);
  const [svgWidth, setSvgWidth] = useState(0);

  const svgHeight = height - spaceBelowData;

  const normalizedPoints = normalizeDataPoints(data, 0, svgHeight, yRange);
  const lastNormalizedPoint = normalizedPoints[normalizedPoints.length - 1];
  const letterHeight = 14;

  useEffect(() => {
    if (textRef.current) {
      // Measure the svg text element width to determine what our svg width should be
      const bbox = textRef.current.getBBox();
      setSvgWidth(bbox.width);
      onWidthMeasured?.(bbox.width);
    }
  }, [label, letterHeight]);

  return (
    <div style={{ ...style }}>
      <svg width={svgWidth} height={height}>
        <g>
          <text
            ref={textRef}
            x={0}
            y={lastNormalizedPoint.y + letterHeight}
            textAnchor="start"
            fill={labelColor}
            style={{ fontSize: letterHeight, fontWeight: 700, ...textStyle}}
          >
            {label}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default RightDataLabel;
