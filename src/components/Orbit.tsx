import React, { useCallback, useEffect, useRef, useState, MutableRefObject } from "react";
import clsx from "clsx";

import Container from "@components/Container";
import Loading from "@components/Loading";

import arrow_circle from "@img/controls/arrow_next_cerulean_circle.svg";
import arrow_circle_hover from "@img/controls/arrow_next_cerulean_circle_hover.svg";

import "@sass/components/Orbit.scss";

/**
 * Orbit: A versatile carousel component for seamless horizontal scrolling.
 *
 * Features:
 * - Handles an unlimited number of child elements.
 * - Adapts to varying item widths.
 * - Provides infinite looping for continuous content display.
 * - Supports both touch gestures (swiping) and mouse drag interactions.
 * - Customizable through the `className` and `id` props.
 *
 * Usage:
 *
 * ```typescript
 * <Orbit className="custom_class_name" id="custom_id">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Orbit>
 * ```
 *
 * @param className - Optional CSS class name(s) to apply to the orbit container.
 * @param id - Optional unique identifier for the orbit container.
 * @param speed - A number between 1 and 10 ; higher values makes the orbit scroll faster.
 * @param children - The content to be displayed within the orbit (orbit items).
 * @param autoScroll
 */

import { Children } from "@types";

type OrbitProps = {
	id?: string;
	className?: string;
	speed?: number;
	autoScroll: boolean;
	alignItemsOnInit: boolean;
	children: Children;
};

export default function Orbit({ id, className, speed = 6, autoScroll = false, alignItemsOnInit = false, children }: OrbitProps) {
	const [isAutoScroll, setIsAutoScroll] = useState<boolean>(autoScroll);
	const [hasHadInitialAlignment, setHasHadInitialAlignment] = useState<boolean>(false);
	const [orbitMoving, setOrbitMoving] = useState<string>("");
	const [loaded, setLoaded] = useState<boolean>(false);
	const [orbitItemGrids, setOrbitItemGrids] = useState([
		{ left: 0, right: 0, width: 0 },
		{ left: 0, right: 0, width: 0 },
		{ left: 0, right: 0, width: 0 },
	]);
	const [lastPositionX, setLastPositionX] = useState<number | null>(null);
	const [lastPositionY, setLastPositionY] = useState<number>(0);
	const [mouseDown, setMouseDown] = useState<boolean | null>(null);

	const ribbonRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	const orbitItemGridObject = useCallback((left, placement = "none") => {
		if (!ribbonRef.current) return;

		const { width } = ribbonRef.current.querySelector(".orbit_item_grid").getBoundingClientRect();
		const newLeft = placement === "before" ? left - width : placement === "after" ? left + width : left;
		const newRight = newLeft + width;

		return {
			left: newLeft,
			right: newRight,
			width,
		};
	}, []);

	const orbitItemGridsFromReference = useCallback(
		(reference) => {
			return [orbitItemGridObject(reference.left), orbitItemGridObject(reference.left, "before"), orbitItemGridObject(reference.left, "after")];
		},
		[orbitItemGridObject]
	);

	const sortItemGrids = useCallback((arr) => {
		return arr.sort((a, b) => a.left - b.left);
	}, []);

	const initialAlignment = useCallback(() => {
		if (!ribbonRef.current) return;

		const cards = Array.from(ribbonRef.current.querySelectorAll(".quote_card"));
		const refLeft = ribbonRef.current.getBoundingClientRect().left;
		const targetCard = cards.find((card) => card.getBoundingClientRect().left - refLeft > 0);

		if (!targetCard) return;

		const leftOffset = targetCard.getBoundingClientRect().left - refLeft - 32;

		let out = [];

		for (const item of orbitItemGrids) {
			out.push({ ...item, left: item.left - leftOffset });
		}

		if (out[0].left === out[1].left || out[1].left === out[2].left) return;

		setOrbitItemGrids(out);
		setHasHadInitialAlignment(true);
	}, [orbitItemGrids]);

	const recomputeGridsPositions = useCallback(
		(grids, direction: "stable" | "prev" | "next") => {
			if (!ribbonRef.current) return;

			let out = sortItemGrids(grids);

			const reference = orbitItemGridObject(grids[1].left);

			const { left, right } = reference;

			const { left: ribbonLeft, right: ribbonRight } = ribbonRef.current.getBoundingClientRect();

			if (direction === "next" && right < ribbonLeft) {
				out = orbitItemGridsFromReference(grids[2]);
			}

			if (direction === "prev" && left > ribbonRight) {
				out = orbitItemGridsFromReference(grids[0]);
			}

			out = sortItemGrids(out);

			return out;
		},
		[orbitItemGridsFromReference, sortItemGrids, orbitItemGridObject]
	);

	const recalculateInitialPlacement = useCallback(
		(alsoRecomputeGridsPositions = false) => {
			if (!ribbonRef.current) return;

			let out = [];
			const collections = ribbonRef.current.querySelectorAll(".orbit_item_grid");

			for (const collection of collections) {
				const { left, width } = collection.getBoundingClientRect();
				const right = left + width;
				out.push({ left, right, width });
			}

			out = sortItemGrids(out);

			if (alsoRecomputeGridsPositions) {
				out = recomputeGridsPositions(out, "prev");
			}

			setOrbitItemGrids(out);
			setLoaded(true);
		},
		[sortItemGrids, recomputeGridsPositions]
	);

	const initialPlacement = useCallback(() => {
		setLoaded(false);

		setTimeout(() => {
			recalculateInitialPlacement();
		}, 500);
	}, [recalculateInitialPlacement]);

	const handleOrbitScroll = useCallback(
		(direction: "stable" | "prev" | "next", step = 2) => {
			let out = [];

			const movement = direction === "prev" ? step + 1 : direction === "next" ? -step - 1 : 0;

			const reference = orbitItemGrids[1];
			reference.left += movement;

			out = orbitItemGridsFromReference(reference);
			out = recomputeGridsPositions(out, direction);

			setOrbitItemGrids(out);
		},
		[orbitItemGrids, recomputeGridsPositions, orbitItemGridsFromReference]
	);

	useEffect(() => {
		if (typeof window === "undefined") return;

		window.addEventListener("resize", () => recalculateInitialPlacement(true), { passive: true });

		setTimeout(initialPlacement, 200);

		return () => {
			window.removeEventListener("resize", () => recalculateInitialPlacement(true));
		};
	}, [initialPlacement, recalculateInitialPlacement]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		if (alignItemsOnInit && !hasHadInitialAlignment) {
			setTimeout(() => {
				initialAlignment();
			}, 1000);
		}
	}, [alignItemsOnInit, initialAlignment, hasHadInitialAlignment]);

	useEffect(() => {
		let interval;

		if (isAutoScroll && !orbitMoving) {
			interval = setInterval(() => handleOrbitScroll("next"), 30);
		}

		if (orbitMoving) {
			setIsAutoScroll(false);
			let _speed = 11 - speed;
			if (mouseDown) {
				_speed -= 5;
			}
			interval = setInterval(() => handleOrbitScroll(orbitMoving), _speed);
		}

		if (!isAutoScroll && !orbitMoving) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [speed, orbitMoving, handleOrbitScroll, isAutoScroll, mouseDown]);

	useEffect(() => {
		const swipeDetector = ribbonRef.current;

		if (!swipeDetector) return;

		let startX = 0;
		let scrollLeft = 0;

		function handleTouchMove(e) {
			e.preventDefault();
			setIsAutoScroll(false);
			const currentX = e.changedTouches[0].screenX;
			const currentY = e.changedTouches[0].clientY;
			const deltaX = lastPositionX - currentX;
			const deltaY = lastPositionY - currentY;
			setLastPositionY(currentY);

			if (Math.abs(deltaX) >= 1) {
				logMovement(currentX);
			}

			if (Math.abs(deltaY) >= 1) {
				window.scrollBy(0, deltaY);
			}
		}

		function handleMouseMove(e) {
			if (!mouseDown) return;
			setIsAutoScroll(false);
			const x = e.pageX - swipeDetector.offsetLeft;
			const { movementY } = e;
			const walk = x - startX;
			swipeDetector.scrollLeft = scrollLeft - walk;

			if (Math.abs(x - lastPositionX) >= 1) {
				setLastPositionX(x);
				logMovement(x);
			}

			if (movementY !== 0) {
				window.scrollBy(0, -movementY);
			}
		}

		function logMovement(x) {
			if (x < lastPositionX) {
				handleOrbitScroll("next", lastPositionX - x);
			}
			if (x > lastPositionX) {
				handleOrbitScroll("prev", x - lastPositionX);
			}
			setLastPositionX(x);
		}

		swipeDetector.addEventListener(
			"touchstart",
			(e) => {
				setLastPositionX(e.changedTouches[0].screenX);
				setLastPositionY(e.changedTouches[0].clientY);
			},
			{ passive: true }
		);

		swipeDetector.addEventListener("touchmove", handleTouchMove, { passive: false });

		swipeDetector.addEventListener(
			"mousedown",
			(e) => {
				setMouseDown(true);
				startX = e.pageX - swipeDetector.offsetLeft;
				scrollLeft = swipeDetector.scrollLeft;
				setLastPositionX(startX);
			},
			{ passive: true }
		);

		swipeDetector.addEventListener(
			"mouseleave",
			() => {
				setMouseDown(false);
			},
			{ passive: true }
		);

		swipeDetector.addEventListener(
			"mouseup",
			() => {
				setMouseDown(false);
			},
			{ passive: true }
		);

		swipeDetector.addEventListener("mousemove", handleMouseMove, { passive: true });

		return () => {
			swipeDetector.removeEventListener("touchmove", handleTouchMove);
			swipeDetector.removeEventListener("mousemove", handleMouseMove);
		};
	}, [lastPositionX, lastPositionY, handleOrbitScroll, mouseDown]);

	return (
		<section className={clsx("Orbit", className, { loaded: loaded })} id={id}>
			{!loaded && <Loading />}
			<div className="orbit_ribbon flex flex-nowrap justify-content-center" ref={ribbonRef}>
				{orbitItemGrids.map(({ left, width }, k) => {
					if (width === 0) {
						width = "auto";
					}
					return (
						<div className="orbit_item_grid flex flex-nowrap" style={{ left, width }} key={`item_${k}`}>
							{children}
						</div>
					);
				})}
			</div>
			<Container className="scroll_ctas">
				<button
					className="div relative prev mx-2"
					onMouseDown={() => setMouseDown(true)}
					onMouseUp={() => setMouseDown(false)}
					onMouseOver={() => setOrbitMoving("prev")}
					onMouseEnter={() => setOrbitMoving("prev")}
					onMouseLeave={() => setOrbitMoving("")}>
					<img className="z-1" src={arrow_circle} alt="Next" />
					<img className="hover bg z-2" src={arrow_circle_hover} alt="Next" />
				</button>
				<button
					className="div relative next mx-2"
					onMouseDown={() => setMouseDown(true)}
					onMouseUp={() => setMouseDown(false)}
					onMouseOver={() => setOrbitMoving("next")}
					onMouseEnter={() => setOrbitMoving("next")}
					onMouseLeave={() => setOrbitMoving("")}>
					<img className="z-1" src={arrow_circle} alt="Previous" />
					<img className="hover bg z-2" src={arrow_circle_hover} alt="Previous" />
				</button>
			</Container>
		</section>
	);
}
