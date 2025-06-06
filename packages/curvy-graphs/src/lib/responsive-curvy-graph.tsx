import { useContainerSize } from "./hooks/use-container-size";
import type { CurvyGraphProps } from "./curvy-graph";
import CurvyGraph from "./curvy-graph";

export type ResponsiveCurvyGraphProps = Omit<CurvyGraphProps, "width" | "height"> & {
  width: string | number;
  height: string | number;
};

/**
 * ResponsiveCurvyGraph is a React component that renders a CurvyGraph and automatically makes it responsive to its container size.
 *
 * This component expects `width` and `height` as strings or numbers (e.g., '100%', 400). 
 * It uses these as CSS values for a container div, and then measures the actual pixel size for the CurvyGraph to use.
 *
 * Props:
 * - All CurvyGraphProps except `width` and `height` can now be numbers or strings (instead of only numbers).
 *
 * The component ensures the graph fills the specified area of its parent container.
 */
const ResponsiveCurvyGraph = (props: ResponsiveCurvyGraphProps) => {
  const [containerRef, size, isResizing] = useContainerSize();

  const width = size.width;
  const height = size.height;

  const isReady = width > 0 && height > 0;

  return (
    <div
      ref={containerRef}
      style={{
        width: props.width,
        height: props.height,
        position: "relative",
      }}
    >
      {isReady && (
        <CurvyGraph
          {...props}
          isResizing={isResizing}
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default ResponsiveCurvyGraph;
