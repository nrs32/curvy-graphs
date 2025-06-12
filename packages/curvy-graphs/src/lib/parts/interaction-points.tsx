import type { NonNullPoint, Point, TooltipConfig } from '../types/graph-types';
import type { CustomInteractionLabel, InteractionPoint, XYInteractionLabel } from '../types/interaction-point-types';
import normalizeDataPoints from '../utils/normalize-data-points';
import React, { useRef } from 'react';
import useDebounce from '../hooks/use-debounce';

export interface InteractionPointProps {
  width: number;
  height: number;
  dataTop: number;
  dataLeft: number;
  dataSets: {
    id: string;
    label: string;
    data: Point[];
    xRange?: [number, number];
    yRange?: [number, number];
    tooltipConfig?: TooltipConfig,
  }[];
  spaceBelowData: number;
  onHover: (point: InteractionPoint | null) => void;
}

/**
 * InteractionPoints is a React component that renders invisible SVG circles over each data point in a dataset(s),
 * enabling mouse hover interactions for tooltips/labels.
 *
 * Props:
 * - width: The width of the SVG/chart area in pixels.
 * - height: The height of the SVG/chart area in pixels.
 * - dataTop: The top offset (in pixels) for positioning the SVG overlay.
 * - dataLeft: The left offset (in pixels) for positioning the SVG overlay.
 * - dataSets: Array of datasets
 *    - id: id of the dataSet
 *    - label: label used for the dataSet
 *    - data: Point[] to render
 *    - xRange?: [min, max] (optional) x range to normalize data points
 *    - yRange?: [min, max] (optional) y range  to normalize data points
 *    - tooltipConfig:
 *        - getCustomLabel?: (x: number, y: number) => string — returns fully custom label.
 *        - getXLabel?: (x: number) => string — formats the x-value in the tooltip.
 *        - getYLabel?: (y: number) => string — formats the y-value in the tooltip.
 *        - xAlias?: string — replaces the "x" label in the tooltip
 *        - yAlias?: string — replaces the "y" label in the tooltip
 * - spaceBelowData: Extra space below the lowest data point for visual padding (affects normalization).
 * - onHover: Callback fired with an InteractionPoint object when a point is hovered, or null when not.
 *
 * The component normalizes all data points, overlays a transparent circle for each, and triggers onHover with detailed info for tooltips.
 */
const InteractionPoints: React.FC<InteractionPointProps> = ({
  width,
  height,
  dataTop,
  dataLeft,
  dataSets,
  spaceBelowData,
  onHover,
}) => {
  const graphHeight = height - spaceBelowData;
  const debouncedOnHover = useDebounce(onHover, 20);

  const touchTimeoutRef = useRef<number | null>(null);

  const handleTouchEnd = (e: React.TouchEvent<SVGCircleElement>, point: InteractionPoint) => {
    e.preventDefault();

    onHover(point);

    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);

    touchTimeoutRef.current = window.setTimeout(() => {
      onHover(null);
    }, 3000);
  };

  return (
    <>
      <svg
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: `${dataTop}px`,
          left: `${dataLeft}px`,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        {dataSets.flatMap((dataSet) => {
          const normalizedPoints = normalizeDataPoints(dataSet.data, width, graphHeight, dataSet.yRange, dataSet.xRange);

          return normalizedPoints.map((pt, i) => {
            if (pt.x === null || pt.y === null) return null;

            const dataPoint = dataSet.data[i] as NonNullPoint;

            return <circle
              key={`${dataSet.id}-${i}`}
              tabIndex={0}
              cx={pt.x}
              cy={pt.y}
              r={12}
              fill="transparent"
              style={{ pointerEvents: 'all', cursor: 'pointer' }}
              onTouchEnd={(e) => handleTouchEnd(e, {
                  svgPoint: pt as NonNullPoint,
                  dataSetLabel: dataSet.label,
                  pointLabel: getPointLabel(dataPoint.x, dataPoint.y, dataSet.tooltipConfig),
                })
              }
              onMouseEnter={() =>
                debouncedOnHover({
                  svgPoint: pt as NonNullPoint,
                  dataSetLabel: dataSet.label,
                  pointLabel: getPointLabel(dataPoint.x, dataPoint.y, dataSet.tooltipConfig),
                })
              }
              onMouseLeave={() => debouncedOnHover(null)}
              onBlur={() => debouncedOnHover(null)}
            />
          });
        })}
      </svg>
    </>
  );
};

const getPointLabel = (x: number, y: number, tooltipConfig?: TooltipConfig): CustomInteractionLabel | XYInteractionLabel => {
  if (tooltipConfig && 'getCustomLabel' in tooltipConfig) {
    return {
      custom: tooltipConfig.getCustomLabel(x, y)
    };

  } else {
   return {
      xLabel: tooltipConfig?.getXLabel?.(x) ?? `${x}`,
      yLabel: tooltipConfig?.getYLabel?.(y) ?? `${y}`,
      xAlias: tooltipConfig?.xAlias || 'x',
      yAlias: tooltipConfig?.yAlias || 'y',
    };
  }
}

export default InteractionPoints;
