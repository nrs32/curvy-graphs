import React, { useEffect, useRef } from 'react';
import usePrevious from '../hooks/use-previous-hook';
import type { Point } from '../types/graph-types';

export type GradientDirection = 'v' | 'h'; // vertical or horizontal

export interface CurvyGraphAnimatorProps {
	id: string;
	data: Point[];
	width: number;
	delay: number; // delay before beginning animation

	// children allows us to be a wrapper component and pass refs to the child graph without defining the child graph here
	// This way we don't need to pass child graph props to this animator wrapper
	// example use:
	// <CurvyTimeGraphAnimator>
	// 	{(refs) => (
	// 		<CurvyTimeGraph
	// 			animationRefs={refs}
	// 		/>
	// 	)}
	// </CurvyTimeGraphAnimator>
	children: (refs: {
		clipPathRect: React.Ref<SVGRectElement>;
		svgRoot: React.Ref<SVGSVGElement>;
	}) => React.ReactNode;
}

const CurvyGraphAnimator: React.FC<CurvyGraphAnimatorProps> = ({ data, width, delay, children }) => {
	const prevData = usePrevious(data);
	const clipPathRectRef = useRef<SVGRectElement>(null);
	const svgRootRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const weHaveNoData = !data || data.length === 0;
		const dataHasNoChanges = JSON.stringify(prevData) === JSON.stringify(data);
		if (weHaveNoData || dataHasNoChanges) return;

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
	}, [data]);

	return <>{children({ clipPathRect: clipPathRectRef, svgRoot: svgRootRef })}</>;
};

export default CurvyGraphAnimator;
