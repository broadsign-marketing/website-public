import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { loopTo } from "@annex";
import { useSwipeable } from "react-swipeable";

import { GatsbyImage as Img } from "gatsby-plugin-image";

import "@sass/components/VerticalCarousel.scss";

export default function VerticalCarousel({ className, items, loop = { auto: true, duration: 4000 } }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [autoloop, setAutoloop] = useState(true);

	const loopDuration = loop.duration;
	const itemsQty = items.length;

	const handleLoop = useCallback(
		(to: number) => {
			if (autoloop) {
				setActiveIndex(to);
			}
		},
		[autoloop]
	);

	const handleLoopClick = useCallback(
		(direction: string) => {
			setAutoloop(false);
			setActiveIndex(loopTo(direction, activeIndex, itemsQty));
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[activeIndex, autoloop]
	);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => handleLoopClick("next"),
		onSwipedRight: () => handleLoopClick("prev"),
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoloop) {
				handleLoop(loopTo("next", activeIndex, itemsQty));
			}
		}, loopDuration);

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeIndex, autoloop]);

	useEffect(() => {
		if (loop.auto === false) {
			setAutoloop(false);
		}
	}, [loop]);

	return (
		<div className={clsx("VerticalCarousel", className)} {...swipeHandlers}>
			{items.map(({ id, tagline, img }, k) => (
				<div className={clsx("VerticalCarousel__Item grid w-full", k === activeIndex ? "opacity-1" : "opacity-0")} key={id}>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={img} className="VerticalCarousel__Image" alt={tagline} />
					</div>
					<div className="tagline_wrapper col-12 flex flex-center sm:col-6">
						<p className="tagline subtitle-1 gradient text-transform-none text-center sm:text-left sm:pl-2 sm:pr-6">{tagline}</p>
					</div>
				</div>
			))}
			<div className="dots">
				{items.map((_, k) => (
					<button
						className={clsx("div dot", { active: k === activeIndex })}
						onClick={() => {
							setActiveIndex(k);
							setAutoloop(false);
						}}
						key={`dot_${k}`}></button>
				))}
			</div>
		</div>
	);
}
