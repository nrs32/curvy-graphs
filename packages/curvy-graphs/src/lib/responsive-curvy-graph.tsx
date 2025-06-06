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
 * It uses these as CSS values for a container div, and then measures the actual pixel size of that container for the CurvyGraph to use.
 *
 * For all other props, see {@link CurvyGraph}.
 */
const ResponsiveCurvyGraph = (props: ResponsiveCurvyGraphProps) => {
  const [containerRef, size, isResizing] = useContainerSize();
  const { width, height } = size;

  const isReady = width > 0 && height > 0;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: props.width,
        height: props.height,
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
