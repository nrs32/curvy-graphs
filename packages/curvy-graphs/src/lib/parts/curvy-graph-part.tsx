import normalizeDataPoints from '../utils/normalize-data-points';
import { type GradientDirection, type GraphType, type Point } from '../types/graph-types';

export interface CurvyGraphPartProps {
  id: string;
  animationRefs?: {
    clipPathRect: React.Ref<SVGRectElement>;
    svgRoot: React.Ref<SVGSVGElement>;
  }
  data: Point[];
  width: number;
  height: number;
  yRange?: [number, number];
  xRange?: [number, number]; 
  type: GraphType;
  spaceBelowData: number;
  gradientColorStops: [string, string]; 
  gradientTransparencyStops?: [number, number]; 
  gradientDirection?: GradientDirection;
  isSharp?: boolean;
  showAreaShadow?: boolean; 
  style?: React.CSSProperties;
  pathStyle?: React.CSSProperties;
}

/**
 * CurvyGraphPart is a React component that renders the data of a curvy graph, supporting line, area, and line-area types with gradients and refs for external animation.
 *
 * Props:
 * - id: Unique identifier for the graph part instance.
 * - animationRefs: Optional refs for SVG elements, allowing parent components to control animation (e.g., for reveal effects).
 * - data: Array of Point objects representing the data to plot.
 * - width: Width of the SVG/chart area in pixels.
 * - height: Height of the SVG/chart area in pixels.
 * - yRange: Optional [minY, maxY] tuple to specify the Y-axis range to be used instead of normalizing over data min/max
 * - xRange: Optional [minX, maxX] tuple to specify the X-axis range to be used instead of normalizing over data min/max
 * - type: GraphType ('area', 'dashed-line', 'line-area', etc.).
 * - spaceBelowData: Extra space below the lowest data point for visual padding
 * - gradientColorStops: [startColor, endColor] for the SVG gradient fill/stroke.
 * - gradientTransparencyStops: Optional [startOpacity, endOpacity] for the SVG gradient fill/stroke. Should be a decimal from 0 - 1.
 * - gradientDirection: 'v' for vertical or 'h' for horizontal gradient direction (default: 'v').
 * - showAreaShadow: If true, displays a shadow above/behind the area graph.
 * - isSharp: If true, renders straight lines between data points (sharp/linear). If false, renders smooth, curvy lines using Bézier curves. Default is false (curvy).
 * - style: Optional CSS styles for the container div.
 * - pathStyle: Optional CSS styles for the path element
 * 
 * The component normalizes data points, generates smooth SVG paths, and supports gradient fills and area shadows for enhanced visuals.
 */
const CurvyGraphPart: React.FC<CurvyGraphPartProps> = ({ id, animationRefs, data, gradientColorStops, gradientTransparencyStops, gradientDirection = 'v', type, width, height, yRange, xRange, showAreaShadow, spaceBelowData, isSharp = false, style, pathStyle }) => {  
  const graphId = `curvy-time-graph-${id}`;
  const [startColor, endColor] = gradientColorStops;
  const svgHeight = height - spaceBelowData;

  const curvyLineStyle: React.CSSProperties = {
    strokeWidth: 4.5,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    stroke: `url(#${graphId})`
  }

  const normalizedPoints = normalizeDataPoints(data, width, svgHeight, yRange, xRange);
  const pathData = isSharp ? generateSharpPath(normalizedPoints) : generateSmoothPath(normalizedPoints);
  const areaPathData = generateAreaPath(pathData, normalizedPoints, svgHeight);

  // SVG Gradient Definition
  const renderGradient = () => {
    return <linearGradient
      id={`${graphId}`}
      x1="0%"
      y1="0%"
      x2={gradientDirection === 'h' ? '100%' : '0%'}
      y2={gradientDirection === 'h' ? '0%' : '100%'}
    >
      <stop offset="0%" stopColor={startColor} stopOpacity={gradientTransparencyStops?.[0] ?? 1}/>
      <stop offset="100%" stopColor={endColor} stopOpacity={gradientTransparencyStops?.[1] ?? 1}/>
    </linearGradient>
  };

  return (
    <div style={style}>
      <svg id={`${graphId}-svg`} width={width} height={height}>
        <defs>
          {renderGradient()}

          {type === 'area' && showAreaShadow && 
            <filter id={`${graphId}-areashadow`} x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="-2" // shadow up 2 px
                stdDeviation="4"  // softness
                floodColor="rgba(0, 0, 0, 0.15)" />
            </filter>
          }

          {/* clipPath is the clipping region that restricts visuals to the clip path
              rect defines the actual shape of that visual area, which is a rectangle for us */}
          <clipPath id={`${graphId}-clip`}>
            <rect ref={animationRefs?.clipPathRect} id={`${graphId}-clip-rect`} x="0" y="0" width={animationRefs ? 0 : width} height={height} />
          </clipPath>
        </defs>

        {/* g is just a way to group stuff like a div or span. 
            We're using it to group our svg content that we want to clip and slowly reveal with animation */}
        <g ref={animationRefs?.svgRoot} clipPath={`url(#${graphId}-clip)`}>
          {type === 'area' && (
            <path 
              d={areaPathData} 
              style={{ fill: `url(#${graphId})`, filter: `url(#${graphId}-areashadow)`, stroke: 'none', ...pathStyle }}
            />
          )}

          {type === 'dashed-line' && (
            <path 
              d={pathData}
							style={{...curvyLineStyle, strokeDasharray: '6, 9', ...pathStyle}}
            />
          )}

          {type === 'line' && (
            <path
              d={pathData}
              style={{...curvyLineStyle, ...pathStyle}}
            />
          )}
        </g>
      </svg>
    </div>
  );
};

const generateSmoothPath = (points: Point[]) => {
  const d = points.map((point, i, arr) => {

    // Move to the starting x, y, without drawing a line
    if (i === 0) return `M ${point.x},${point.y}`;

    // Get the previous position
    const prev = arr[i - 1];

    // control points: midpoints between current and previous x,y positions
    const cx = (prev.x + point.x) / 2;
    const cy = (prev.y + point.y) / 2;

    // Quadratic Bézier curve
    // Draws a curve toward x, y with the bend based on the controlPoints
    return `Q ${prev.x},${prev.y} ${cx},${cy}`;
  });

  // The above map loop will end the curve at the midpoint between the second to last, and last points
  // So here we add to the curve the final segment for the final x, y
  const secondLast = points[points.length - 2];
  const last = points[points.length - 1];
  d.push(`Q ${secondLast.x},${secondLast.y} ${last.x},${last.y}`);

  return d.join(' ');
};

const generateSharpPath = (points: Point[]) => {
  const d = points.map((point, i) => {

    // Move to the starting x, y, without drawing a line
    if (i === 0) return `M ${point.x},${point.y}`;

    // Draw a line to the next point
    return `L ${point.x},${point.y}`;
  });

  return d.join(' ');
};

// Generate Path for Area Graph (Closed Path to Fill Below the Line)
const generateAreaPath = (d: string, points: Point[], svgHeight: number) => {
  // Add a bottom line to close the path and fill only below the line
  const lastPoint = points[points.length - 1];
  const lowestY = svgHeight + 20;

  // The first L draws straight line from last point to bottom of graph
  // The second L draws a horizontal line back to starting x
  // Z close the path
  const bottomLine = `L ${lastPoint.x},${lowestY} L ${points[0].x},${lowestY} Z`;
  return d + ' ' + bottomLine;
};

export default CurvyGraphPart;
