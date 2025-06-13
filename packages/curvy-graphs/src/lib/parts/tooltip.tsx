import type { HexColor } from "../types/hex-color";
import type { InteractionPoint } from "../types/interaction-point-types"

export interface TooltipProps {
  interactionPoint: InteractionPoint;
  dataLeft: number;
  dataTop: number;
  textColor: HexColor;
  pointIndicatorStyle?: React.CSSProperties; 
  tooltipStyle?: React.CSSProperties; 
}

/**
 * Tooltip is a React component that displays a styled tooltip and a point indicator for a hovered data point on a graph.
 *
 * Props:
 * - interactionPoint:
 *    - svgPoint: SVG coordinates of the hovered point
 *    - dataSetLabel: string; label for the dataset
 *    - pointLabel:  
 *      An object describing the label, either:
 * 
 *      - CustomInteractionLabel:  
 *        `{ custom: string }` — A fully customized tooltip string, rendered as-is.
 * 
 *      - XYInteractionLabel:  
 *        ```
 *        {
 *          xLabel: string; // The value to display for x 
 *          yLabel: string; // The value to display for y 
 *          xAlias: string; // The label to display before x 
 *          yAlias: string; // The label to display before y
 *        }
 *        ```
 * - dataLeft: number — The left offset (in pixels) for positioning the tooltip relative to the graph.
 * - dataTop: number — The top offset (in pixels) for positioning the tooltip relative to the graph.
 * - textColor: string — The color used for the tooltip border and point indicator.
 * - pointIndicatorStyle: React.CSSProperties — Optional CSS styles to override the default point indicator appearance.
 * - tooltipStyle: React.CSSProperties Optional —  CSS styles to override the default tooltip appearance.
 */
const Tooltip = ({ interactionPoint, dataLeft, dataTop, textColor, pointIndicatorStyle, tooltipStyle }: TooltipProps) => {
  return <>
    <div
      role='tooltip'
      style={{
          position: 'absolute',
          left: `${interactionPoint.svgPoint.x + dataLeft}px`,
          top: `${interactionPoint.svgPoint.y + dataTop}px`,

          background: `#ffffff1a`,
          border: `2px solid ${textColor}`,

          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)', // (safari)
          transform: 'translate(-50%, -50%)',

          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 20,
          width: '11px',
          height: '11px',
          ...pointIndicatorStyle,
        }}
      ></div>

    <div
      role='tooltip'
      style={{
        position: 'absolute',
        left: `${interactionPoint.svgPoint.x + dataLeft + 10}px`,
        top: `${interactionPoint.svgPoint.y + dataTop}px`,
        background: 'white',
        color: "black",
        border: `1px solid ${textColor}`,
        borderRadius: '4px',
        padding: '6px 8px',
        fontSize: '12px',
        pointerEvents: 'none',
        boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
        zIndex: 20,
        textAlign: 'left',
        ...tooltipStyle,
      }}
    >
      <div><strong>{interactionPoint.dataSetLabel}</strong></div>
      {'custom' in interactionPoint.pointLabel ? (
        <div>{interactionPoint.pointLabel.custom}</div> 
      ) : (
        <>
          <div>{interactionPoint.pointLabel.xAlias}: {interactionPoint.pointLabel.xLabel}</div>
          <div>{interactionPoint.pointLabel.yAlias}: {interactionPoint.pointLabel.yLabel}</div>
        </>
      )}
    </div>
  </>
}

export default Tooltip;