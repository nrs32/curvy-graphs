import { useState } from "react";
import InteractionPoints, { type InteractionPointProps } from "./interaction-points"
import Tooltip, { type TooltipProps } from "./tooltip"
import type { InteractionPoint } from "../types/interaction-point-types";


export type TooltipsLayerProps = Omit<InteractionPointProps, 'onHover'> & 
                                 Omit<TooltipProps, 'interactionPoint'>;

/**
 * TooltipsLayer is a React component that manages and displays interactive tooltips for graph data points.
 *
 * It overlays invisible interaction points on the graph (via InteractionPoints) and shows a styled tooltip (via Tooltip)
 * when a user hovers over a data point.
 *
 * Props:
 * - All {@link InteractionPointProps} except 'onHover' (handled internally)
 * - All {@link TooltipProps} except 'interactionPoint' (provided internally)
 */
const TooltipsLayer = ({ width, height, dataTop, dataLeft, dataSets, spaceBelowData, textColor, pointIndicatorStyle, tooltipStyle }: TooltipsLayerProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<InteractionPoint | null>(null);

  return (
    <>
      <InteractionPoints
        width={width}
        height={height}
        dataTop={dataTop}
        dataLeft={dataLeft}
        spaceBelowData={spaceBelowData}
        dataSets={dataSets}
        onHover={setHoveredPoint}
      />
    
      {hoveredPoint && (
        <Tooltip
          interactionPoint={hoveredPoint}
          dataLeft={dataLeft}
          dataTop={dataTop}
          textColor={textColor}
          pointIndicatorStyle={pointIndicatorStyle}
          tooltipStyle={tooltipStyle}
        />
      )}
    </>
  );
}

export default TooltipsLayer;