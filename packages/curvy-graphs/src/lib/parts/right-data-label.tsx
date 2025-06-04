import React, { useEffect, useRef, useState } from 'react';
import normalizeDataPoints from '../utils/normalize-data-points';
import { type Point } from '../types/graph-types';

export interface RightDataLabelProps {
  data: Point[];
  height: number;
  yRange?: [number, number]; // [minY, maxY] y-axis range to be used, instead of normalized
  labelColor: string;
  label: string;
  spaceBelowData: number;
  onWidthMeasured?: (width: number) => void, // access rendered width

  style?: React.CSSProperties;
}

const RightDataLabel: React.FC<RightDataLabelProps> = ({
  data,
  height,
  yRange,
  labelColor,
  label,
  style,
  spaceBelowData,
  onWidthMeasured,
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
            fontSize={`${letterHeight}`}
            fill={labelColor}
            // letterSpacing={theme.palette.text.secondaryLetterSpacing} TODO: style options for fonts
            fontWeight={700}
          >
            {label}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default RightDataLabel;
