import React, { useEffect, useMemo } from 'react';
import normalizeDataPoints from '../utils/normalize-data-points';
import { type LabeledYPoint, type Point, type YAxisLabelConfig } from '../types/graph-types';
import { getYAxisLabelConfig } from '../utils/get-y-axis-label-config';
import useTextWidthSVG from '../hooks/use-text-width-svg';

export interface YAxisProps {
  height: number;
  graphWidth: number;        
  labelFrequency?: number;   
  labeledYPoints: LabeledYPoint[],
  spaceBelowData: number;
  getLabel?: (y: number) => string,
  yRange?: [number, number]; 
  onConfigMeasured?: (config: YAxisLabelConfig) => void, 
  primaryTickColor: string;
  secondaryTickColor: string;
  labelColor: string;
  showGuideLines: boolean;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

interface TicksAndLabels {
  ticks: number[],
  labels: string[],
};

/**
 * YAxis is a React component that renders the Y-axis for a chart, including tick marks, optional guidelines, and labels.
 *
 * Props:
 * - height: The height of the y-axis in pixels (should match chart height).
 * - graphWidth: The width of the chart area, used for drawing guidelines.
 * - labelFrequency: How often tick labels should show (every nth tick is labeled; 5 means every 5th tick will be labeled). Default is 1.
 * - labeledYPoints: Array of labeled Y points, each with a value and label.
 * - spaceBelowData: Extra space below the lowest data point for visual padding.
 * - getLabel: Optional function that provides a y coordinate and expects a label for that coordinate.
 *             This is used to fill the y-axis labels for the spaceBelowData if a value > 0 was provided.
 *              If no callback is defined, the extra labels will be empty strings.
 * - yRange: Optional tuple [minY, maxY] to specify the y-axis range instead of using normalized values from your data min and max.
 * - onConfigMeasured: Optional callback to access the rendered y-axis config values (in pixels).
 * - primaryTickColor: Color for primary (labeled) tick marks.
 * - secondaryTickColor: Color for secondary (unlabeled) tick marks and guidelines.
 * - labelColor: Color for the Y-axis labels.
 * - showGuideLines: Whether to display horizontal guidelines for each primary (labeld) tick.
 * - style: Optional CSS styles for the Y-axis container.
 * - textStyle: Optional CSS styles for the labels of the axis.
 */
const YAxis: React.FC<YAxisProps> = ({
  height,
  graphWidth,
  labelFrequency = 5,
  labeledYPoints,
  yRange,
  spaceBelowData,
  getLabel,
  onConfigMeasured,
  primaryTickColor,
  secondaryTickColor,
  labelColor,
  showGuideLines,
  style,
  textStyle,
}) => {
  const finalTextStyles: React.CSSProperties = { fontSize: '12px', fill: labelColor, ...textStyle };

  const normalizedPoints = normalizeDataPoints(labeledYPoints.map(y => ({...y, x: 0})), 0, height - spaceBelowData, yRange, undefined);
  const { labels, ticks } = getLabelsForSpaceBelowData(labeledYPoints, normalizedPoints, height, getLabel);
  
  const finalTicks = ticks.concat(normalizedPoints.map((point) => point.y));
  const finalLabels = labels.concat(labeledYPoints.map(label => label.yLabel));
  
  const textSpace = useTextWidthSVG(finalLabels, finalTextStyles, 5);
  
  const config = useMemo(() => {
    // This prevents config from being set unless textSpace or graphWidth change
    // Since we have a useEffect that depends on config, this is necessary or we create an infinite loop
    return textSpace !== null ? getYAxisLabelConfig(textSpace) : null;
  }, [textSpace]);

  useEffect(() => {
    // If onConfigMeasured exists, pass config values up to parent when they change
    config && onConfigMeasured?.(config);
  }, [onConfigMeasured, config]);
  
  if (textSpace === null || config === null) return null; // happens if still loading in hook

  const { heightOffset, textRightPadding, endOfTickMark, yAxisOutsideGraph } = config;
  const svgWidth = yAxisOutsideGraph + graphWidth;

  return (
    <div style={{ marginTop: `-${heightOffset}px`, ...style }}>
      <svg width={svgWidth} height={height + (heightOffset * 2)}>
        <g>
          {/* Tick Marks */}
          {finalTicks.map((tickY, index) => (
            <line
              key={`${index}_tick`}
              x1={textSpace + textRightPadding}
              x2={endOfTickMark}
              y1={tickY + heightOffset}
              y2={tickY + heightOffset}
              stroke={index % labelFrequency === 0 ? primaryTickColor : secondaryTickColor}
              strokeWidth="1.5"
            />
          ))}

          {/* Guidelines */}
          {showGuideLines && finalTicks.map((tickY, index) => (
            <line
            key={`${index}_guideline`}
              x1={endOfTickMark}
              x2={svgWidth - 12}
              y1={tickY + heightOffset}
              y2={tickY + heightOffset}
              stroke={index % labelFrequency === 0 ? secondaryTickColor : 'transparent'}
              strokeWidth="1.5"
            />
          ))}

          {/* Labels */}
          {finalTicks.map((tickY, index) =>
            index % labelFrequency === 0 ? (
              <text
                key={`${index}_label`}
                x={textSpace}
                y={tickY + heightOffset + 4}
                textAnchor="end"
                style={finalTextStyles}
              >
                {finalLabels[index]}
              </text>
            ) : null
          )}
        </g>
      </svg>
    </div>
  );
};

/**
 * This method gets tick mark y coordinates, and labels to display on the section of the chart that is below the lowest actual data
 * This is because of our use of SPACE_BELOW_DATA, which lets the charts look more beautiful
 *
 * @returns An object with a list of label string and a list of tick coordinates
 */
const getLabelsForSpaceBelowData = (
  labeledYPoints: LabeledYPoint[],
  normalizedPoints: Point[],
  height: number,
  getLabel?: (y: number) => string,
): TicksAndLabels => {
  const result: TicksAndLabels = {
    labels: [],
    ticks: [],
  };

  const lowestYValue: number = labeledYPoints[0].y;
  const stepBetweenOriginalYValues = labeledYPoints[1].y - lowestYValue;

  const lowestPossibleYCoordinate = height;
  const lowestExistingGraphYCoordinate = normalizedPoints[0].y;
  const stepBetweenGraphYCoordinates = lowestExistingGraphYCoordinate - normalizedPoints[1].y;
  const nextLowestGraphYCoordinate = lowestExistingGraphYCoordinate + stepBetweenGraphYCoordinates;

  let labelYValue = lowestYValue;

  for (let graphYCoor = nextLowestGraphYCoordinate; graphYCoor <= lowestPossibleYCoordinate; graphYCoor += stepBetweenGraphYCoordinates) {

    labelYValue -= stepBetweenOriginalYValues;
    result.labels.unshift(getLabel ? getLabel(labelYValue) : '');

    result.ticks.unshift(graphYCoor);
  }

  return result;
}

export default YAxis;
