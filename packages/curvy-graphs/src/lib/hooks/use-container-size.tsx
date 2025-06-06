import { useEffect, useRef, useState } from "react";

/**
 * useContainerSize is a custom React hook that provides a ref for a container element, tracks its width and height, and indicates when resizing is occurring.
 *
 * Returns a tuple:
 * - containerRef: A React ref to be attached to a div whose size you want to observe.
 * - size: An object with the current width and height of the container.
 * - isResizing: A boolean that is true while the container is being resized and false 150ms after resizing stops.
 *
 * The hook uses ResizeObserver to automatically update the size and resizing state whenever the container is resized.
 */
export function useContainerSize() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
        setIsResizing(true);

        // Wait 150ms to see if we stopped resizing
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsResizing(false);
        }, 150); 
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, []);

  return [containerRef, size, isResizing] as const;
}
