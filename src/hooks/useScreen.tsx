import { useCallback, useEffect, useState } from "react";

type ScreenSize = "" | "xs" | "sm" | "md" | "lg" | "xl";
type Comparison = "smallerIncl" | "smallerExcl" | "equal" | "biggerIncl" | "biggerExcl";

function compareScreenSizes(a: ScreenSize, op: Comparison, b: ScreenSize): boolean {
	const sizes: object = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };
	const sizeA: number = sizes[a];
	const sizeB: number = sizes[b];

	if (op === "smallerIncl" && sizeA <= sizeB) {
		return true;
	}
	if (op === "smallerExcl" && sizeA < sizeB) {
		return true;
	}
	if (op === "equal" && sizeA === sizeB) {
		return true;
	}
	if (op === "biggerIncl" && sizeA >= sizeB) {
		return true;
	}
	if (op === "biggerExcl" && sizeA > sizeB) {
		return true;
	}

	return false;
}

export function useScreen(): ScreenSize {
	const [screenSize, setScreenSize] = useState<ScreenSize>("");

	useEffect(() => {
		function isBetween(num: number, min: number, max: number): boolean {
			if (num >= min && num <= max) {
				return true;
			}
			return false;
		}

		function handleResize() {
			if (typeof window === "undefined") {
				return "";
			}

			const w: number = window.innerWidth;

			if (isBetween(w, 0, 599)) {
				if (screenSize !== "xs") setScreenSize("xs");
				return;
			} else if (isBetween(w, 600, 899)) {
				if (screenSize !== "sm") setScreenSize("sm");
				return;
			} else if (isBetween(w, 900, 1087)) {
				if (screenSize !== "md") setScreenSize("md");
				return;
			} else if (isBetween(w, 1088, 1439)) {
				if (screenSize !== "lg") setScreenSize("lg");
				return;
			}
			if (screenSize !== "xl") setScreenSize("xl");
		}

		window.addEventListener("resize", handleResize, { passive: true });

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, [screenSize]);

	return screenSize;
}

export function isScreenUnder(breakpoint: ScreenSize, inclusively: boolean = true): boolean {
	const op = inclusively ? "smallerIncl" : "smallerExcl";
	if (compareScreenSizes(useScreen(), op, breakpoint)) {
		return true;
	}
	return false;
}

export function useScroll() {
	const [scrollDistance, setScrollDistance] = useState(0);

	useEffect(() => {
		function handleScroll() {
			const distanceScrolled = window.scrollY;
			setScrollDistance(distanceScrolled);
		}

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return scrollDistance;
}

export function useScrollPercent(target = "window") {
	const [scrollPercentage, setScrollPercentage] = useState(0);

	useEffect(() => {
		function handleScroll() {
			let targetHeight = 0;
			let percentageScrolled = 0;
			const distanceScrolled = window.scrollY;

			if (target === "window") {
				targetHeight = document.documentElement.scrollHeight;
				const windowHeight = window.innerHeight;
				percentageScrolled = Math.floor((distanceScrolled / (targetHeight - windowHeight)) * 100);
			} else {
				targetHeight = document.querySelector(target).clientHeight;
				percentageScrolled = Math.floor((distanceScrolled / targetHeight) * 100);
			}

			setScrollPercentage(percentageScrolled);
		}

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return scrollPercentage;
}

export function scrollTo(targetId = "", speed = 1000) {
	if (targetId === "") {
		console.error("useScreen -> scrollTo : targetId is undefined");
		return false;
	}

	let targetPosition;
	if (typeof targetId === "number") {
		targetPosition = targetId - 100;
	} else if (typeof targetId === "string") {
		// Get the target element by its ID
		const target = document.querySelector(`#${targetId}`);

		if (!target) {
			console.error(`useScreen -> scrollTo : Can't find target #${targetId}`);
			return false;
		}

		// Calculate the distance from the top of the document to the target element
		targetPosition = target.getBoundingClientRect().top + window.scrollY - 100;
	}

	// Define the duration of the scroll animation
	const duration = speed; // milliseconds

	// Define the easing function for the scroll animation
	function easeInOutQuad(t, b, c, d) {
		t /= d / 2;
		if (t < 1) return (c / 2) * t * t + b;
		t--;
		return (-c / 2) * (t * (t - 2) - 1) + b;
	}

	// Define the start and end positions for the scroll animation
	const startPosition = window.scrollY;
	const distance = targetPosition - startPosition;

	// Define the start time for the scroll animation
	let startTime = null;

	// Define the function that updates the position of the scroll animation
	function scrollAnimation(currentTime) {
		if (startTime === null) {
			startTime = currentTime;
		}
		const timeElapsed = currentTime - startTime;
		const scrollPosition = easeInOutQuad(timeElapsed, startPosition, distance, duration);
		window.scrollTo(0, scrollPosition);
		if (timeElapsed < duration) {
			requestAnimationFrame(scrollAnimation);
		}
	}

	// Start the scroll animation
	requestAnimationFrame(scrollAnimation);
}
