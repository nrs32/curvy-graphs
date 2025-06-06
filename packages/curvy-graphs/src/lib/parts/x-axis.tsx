import React from 'react';
import type { LabeledXPoint } from '../types/graph-types';
import normalizeDataPoints from '../utils/normalize-data-points';
import { getXAxisLabelConfig } from '../utils/get-x-axis-label-config';

export interface XAxisProps {
  data: LabeledXPoint[];
  width: number;
  xRange?: [number, number]; 
  labelFrequency?: number;  
  primaryTickColor: string;
  secondaryTickColor: string;
  labelColor: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

/**
 * XAxis is a React component that renders the X-axis for a chart, including tick marks and labels.
 *
 * Props:
 * - data: Array of labeled X points, each with a value and label (and optional sublabel).
 * - width: The width of the chart area in pixels.
 * - xRange: Optional tuple [minX, maxX] to specify the X-axis range instead of using normalized values from your data min and max.
 * - labelFrequency: How often tick labels should show (every nth tick is labeled; 5 means every 5th tick will be labeled). Default is 1
 * - primaryTickColor: Color for primary (labeled) tick marks.
 * - secondaryTickColor: Color for secondary (unlabeled) tick marks.
 * - labelColor: Color for the X-axis labels and sublabels.
 * - style: Optional CSS styles for the X-axis container.
 * - textStyle: Optional CSS styles for the labels of the axis.
 */
const XAxis: React.FC<XAxisProps> = ({
  data, 
  width, 
  xRange, 
  labelFrequency = 1, 
  primaryTickColor, 
  secondaryTickColor, 
  labelColor, 
  style, 
  textStyle
}) => {
  const { svgHeight, widthOffset } = getXAxisLabelConfig();

  const normalizedPoints = normalizeDataPoints(data.map(x => ({...x, y: 0})), width, svgHeight, undefined, xRange);

  const ticks = normalizedPoints.map((point) => point.x);

  return (
    <div style={{ marginLeft: `-${widthOffset}px`, ...style }}>
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
                style={textStyle}
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
