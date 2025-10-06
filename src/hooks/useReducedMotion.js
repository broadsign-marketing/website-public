import T from "i18n-react";

export const useReducedMotion = () => {
	if (typeof window !== "undefined") {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

		if (prefersReducedMotion && prefersReducedMotion.matches) {
			return true;
		}

		return false;
	}
};
