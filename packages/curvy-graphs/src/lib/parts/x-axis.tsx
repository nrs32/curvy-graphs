import React from 'react';
import type { LabeledXPoint } from '../types/graph-types';
import normalizeDataPoints from '../utils/normalize-data-points';

interface XAxisProps {
  data: LabeledXPoint[];
  width: number;
  xRange?: [number, number]; // [minY, maxY] y-axis range to be used, instead of normalized
  labelFrequency?: number;   // How often tick labels should show. Every nth label will show. 5 means every 5th tick will be labeled
  style?: React.CSSProperties;

  primaryTickColor: string;
  secondaryTickColor: string;
  labelColor: string;
}

const XAxis: React.FC<XAxisProps> = ({
  data, width, xRange, labelFrequency = 1, style, primaryTickColor, secondaryTickColor, labelColor
}) => {
  const svgHeight = 60;
  const widthOffset = 25;
  const normalizedPoints = normalizeDataPoints(data, width, svgHeight, undefined, xRange);

  const ticks = normalizedPoints.map((point) => point.x);

  return (
    <div style={{ ...style, marginLeft: `-${widthOffset}px` }}>
      <svg width={width + (widthOffset*2)} height={svgHeight}>
        <g>
          {/* Tick Marks */}
          {ticks.map((tickX, index) => (
            <line
              key={`${index}_tick`}
              x1={tickX + widthOffset}
              x2={tickX + widthOffset}
              y1={7}
              y2={svgHeight - 43}
              stroke={index % labelFrequency == 0 ? primaryTickColor : secondaryTickColor}
              strokeWidth="1.5"
            />
          ))}

          {/* Labels*/}
          {ticks.map((tickX, index) => (
            index % labelFrequency == 0 &&
            <React.Fragment key={`${index}_label`}>
              <text
                x={tickX + widthOffset}
                y={svgHeight - 25}
                textAnchor="middle"
                fontSize="12"
                fill={labelColor}
              >
                {data[index].xLabel}
              </text>
              {data[index].xSubLabel && <text
                x={tickX + widthOffset}
                y={svgHeight - 5}
                textAnchor="middle"
                fontSize="12"
                fill={labelColor}
              >
                {data[index].xSubLabel}
              </text>}
            </React.Fragment>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default XAxis;
