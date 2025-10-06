import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useL } from "@hooks/useDico";
import { Helmet } from "react-helmet";

import vwoTests from "@assets/vwo_tests.json";

export default function NavReducer() {
	const [reducedNav, setReducedNav] = useState(false);

	const l = useL();

	const handleScroll = useCallback(() => {
		if (typeof window !== "undefined") {
			if (window.scrollY > 400 && !reducedNav) {
				setReducedNav(true);
			} else if (window.scrollY < 400 && reducedNav) {
				setReducedNav(false);
			}
		}
	}, [reducedNav]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll, { passive: true });

			handleScroll();

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, [reducedNav]);

	/**
	 * Had to put the calculation of VWO tests here because of the regen of the HTML tag's attributes.
	 */
	const vwo = () => {
		if (typeof document === "undefined") return "";

		const existingVersion = document.documentElement.getAttribute("data-vwo");
		if (existingVersion) return existingVersion;

		return vwoTests
			.map((v) => {
				const variation = v?.defaultVariation || "a";
				return `${v.id}_v${variation}`;
			})
			.join(" ");
	};

	return (
		<Helmet>
			<html lang={l} data-reduced-nav={reducedNav} data-vwo={vwo()} />
		</Helmet>
	);
}
