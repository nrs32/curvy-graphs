import React, { useEffect, useRef } from 'react';
import usePrevious from '../hooks/use-previous-hook';
import type { Point } from '../types/graph-types';

export interface CurvyGraphAnimatorProps {
	id: string;
	animate?: boolean;
	data: Point[]; 
	width: number; 
	delay: number; 
	children: (refs: {
		clipPathRect: React.Ref<SVGRectElement>;
		svgRoot: React.Ref<SVGSVGElement>;
	}) => React.ReactNode;
}

/**
 * CurvyGraphAnimator is a React component that animates the reveal of a graph by expanding a clipping rectangle over time.
 *
 * Props:
 * - id: Unique identifier for the animator instance.
 * - animate: If false, disables the animation (default: true).
 * - data: Array of Point objects; changes to this array trigger re-animation.
 * - width: The target width (in pixels) to animate the reveal to.
 * - delay: Delay (in seconds) before starting the animation.
 * - children: Render prop function that receives refs for the clip path rectangle and SVG root, allowing child graph components to use these refs for animation.
 *
 * The component uses a wrapper pattern, so the child graph is not defined here. 
 * Instead, it passes animation refs to its children for flexible integration.
 *
 * @example
 * <CurvyTimeGraphAnimator>
 *   {(refs) => (
 *     <CurvyTimeGraph
 *       animationRefs={refs}
 *     />
 *   )}
 * </CurvyTimeGraphAnimator>
 */
const CurvyGraphAnimator: React.FC<CurvyGraphAnimatorProps> = ({ animate, data, width, delay, children }) => {
	const prevWidth = usePrevious(width);
	const prevData = usePrevious(data);
	const clipPathRectRef = useRef<SVGRectElement>(null);
	const svgRootRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (animate === false) return;

		const widthChanged = prevWidth !== width;
		const weHaveNoData = !data || data.length === 0;
		const dataHasNoChanges = JSON.stringify(prevData) === JSON.stringify(data);
		if (weHaveNoData || (dataHasNoChanges && !widthChanged)) return;

		const rect = clipPathRectRef.current;
		const svg = svgRootRef.current;
		if (!rect || !svg) return;

		let frameId: number;
		let startTime: number | null = null;

		// Reset width
		rect.setAttribute('width', '0');

		const duration = 2000; // ms
		const targetWidth = width;
		const easing = (t: number) => 1 - Math.pow(1 - t, 2); // easeOutQuad (like power2.out)

		const step = (timestamp: number) => {
			if (startTime === null) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const easedProgress = easing(progress);
			const currentWidth = targetWidth * easedProgress;

			rect.setAttribute('width', currentWidth.toString());

			if (progress < 1) {
				frameId = requestAnimationFrame(step);
			}
		};

		setTimeout(() => {
			frameId = requestAnimationFrame(step);
		}, delay * 1000);

		return () => cancelAnimationFrame(frameId);
	}, [data, width]);

	return <>{children({ clipPathRect: clipPathRectRef, svgRoot: svgRootRef })}</>;
};

export default CurvyGraphAnimator;
