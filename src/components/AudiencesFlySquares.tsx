import React, { useCallback, useEffect, useRef, useState, MutableRefObject } from "react";
import { createRoot } from "react-dom/client";

import square from "@img/pages/audiences/square.svg";

import "@sass/components/AudiencesFlySquares.scss";

export default function AudiencesFlySquares({ img, className }) {
	const [squaresCount, setSquaresCount] = useState(0);
	const [lastSquareAnim, setLastSquareAnim] = useState(0);
	const [lastSquareStartPos, setLastSquareStartPos] = useState(0);

	const wrapper = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	const generateSquare = useCallback(() => {
		function rand(num) {
			return Math.ceil(Math.random() * num);
		}

		if (!wrapper?.current) {
			return;
		}
		const squaresToDelete = wrapper.current.querySelectorAll(".square");

		if (squaresToDelete) {
			squaresToDelete.forEach((square) => {
				const currentCount = square.className.match(/count_(\d+)/)?.[1];
				if (currentCount < squaresCount - 20) {
					square.remove();
				}
			});
		}

		const sizeVariation = rand(3);

		let animVariation = rand(5);
		while (animVariation === lastSquareAnim) {
			animVariation = rand(5);
		}

		let startPointVariation = rand(4);
		while (startPointVariation === lastSquareStartPos) {
			startPointVariation = rand(4);
		}

		setLastSquareAnim(animVariation);
		setLastSquareStartPos(startPointVariation);

		const squareWrapper = document.createElement("div");
		squareWrapper.className = `square anim_var_${animVariation} start_var_${startPointVariation} size_var_${sizeVariation} count_${squaresCount}`;
		createRoot(squareWrapper).render(<img src={square} className="relative h-full w-full" alt="" />);
		wrapper.current.appendChild(squareWrapper);

		setSquaresCount((prev) => prev + 1);
	}, [squaresCount, lastSquareAnim, lastSquareStartPos]);

	useEffect(() => {
		const interval = setInterval(generateSquare, 100);

		return () => {
			clearInterval(interval);
		};
	}, [generateSquare]);

	return (
		<div className={`AudiencesFlySquares ${className}`} ref={wrapper}>
			<img alt="" src={img} className="img_mobile w-full" />
		</div>
	);
}
