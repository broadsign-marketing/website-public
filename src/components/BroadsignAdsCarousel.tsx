import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { loopTo } from "@annex";
import { useSwipeable } from "react-swipeable";

import arrow_next from "@img/controls/arrow_next_cerulean.svg";
import arrow_prev from "@img/controls/arrow_previous_cerulean.svg";

import "@sass/components/BroadsignAdsCarousel.scss";

import { Children } from "@types";

type Loop = {
	duration: number;
	auto: boolean;
};

interface BroadsignAdsCarouselProps {
	className: string;
	gridClassName: string;
	itemClassName: string;
	bg: string;
	children: Children;
	loop: Loop;
}

export default function BroadsignAdsCarousel({
	className,
	gridClassName = "",
	itemClassName = "",
	bg = "transparent",
	children,
	loop = { auto: true, duration: 1000 },
}: BroadsignAdsCarouselProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [leavingIndex, setLeavingIndex] = useState(0);
	const [autoloop, setAutoloop] = useState(false /* loop.auto */);

	const loopDuration = loop.duration;

	const items = React.Children.toArray(children);
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
			setLeavingIndex(activeIndex);
			setActiveIndex(loopTo(direction, activeIndex, itemsQty));
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[activeIndex, leavingIndex, autoloop]
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
		<div className={clsx("Carousel BroadsignAdsCarousel", className)}>
			<div className={clsx("grid flex-nowrap align-items-stretch", gridClassName)} {...swipeHandlers}>
				{React.Children.map(items, (el, k) => (
					<div
						className={clsx(
							"BroadsignAdsCarousel__item col-12 relative top-0 left-0 rounded-xl",
							className,
							itemClassName,
							leavingIndex === k && activeIndex !== k ? "leaving" : "",
							activeIndex === k ? "active z-2" : "z-1"
						)}
						style={{ transform: `translateX(-${k * 100}%)` }}
						key={k}>
						{el}
					</div>
				))}
			</div>
			{itemsQty > 1 && (
				<div className={clsx("Carousel__nav", `bg-${bg}`, "flex justify-content-end")}>
					<button
						onClick={() => handleLoopClick("prev")}
						className="flex flex-center p-0 bg-transparent border-1 border-cerulean text-cerulean rounded-full hover:bg-cerulean"
						style={{ height: "40px", width: "40px" }}>
						<img src={arrow_prev} className="arrow" alt="Previous" />
					</button>
					<button
						onClick={() => handleLoopClick("next")}
						className="flex flex-center p-0 bg-transparent border-1 border-cerulean text-cerulean rounded-full hover:bg-cerulean ml-3"
						style={{ height: "40px", width: "40px" }}>
						<img src={arrow_next} className="arrow" alt="Next" />
					</button>
				</div>
			)}
		</div>
	);
}
