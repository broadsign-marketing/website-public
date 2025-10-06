import React, { useCallback, useEffect, useMemo, useRef, useState, MutableRefObject } from "react";
import { useStaticQuery, graphql } from "gatsby";
import T from "i18n-react";
import clsx from "clsx";
import { loopTo } from "@annex";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import pin from "@img/pages/index/map_pin.svg";

import "@sass/components/HomeMap.scss";

export default function Home__Map() {
	const [isVisible, setIsVisible] = useState(false);
	const [currentStat, setCurrentStat] = useState(0);

	const data = useStaticQuery(graphql`
		query {
			map: file(relativePath: { eq: "pages/index/map.png" }) {
				...img
			}
		}
	`);

	const pins = useMemo(() => {
		return [
			{ left: 10.5, top: 33 },
			{ left: 20.2, top: 32.2 },
			{ left: 23.9, top: 35.3 },
			{ left: 21.7, top: 42.5 },
			{ left: 15.4, top: 49.2 },
			{ left: 18.7, top: 53.5 },
			{ left: 24, top: 60.8 },
			{ left: 22.4, top: 66.3 },
			{ left: 31.9, top: 66.2 },
			{ left: 34.4, top: 70.3 },
			{ left: 24.9, top: 94.5 },
			{ left: 41.6, top: 25.7 },
			{ left: 44.6, top: 22.8 },
			{ left: 49.2, top: 26.3 },
			{ left: 47.3, top: 28.8 },
			{ left: 45.6, top: 30.8 },
			{ left: 44.6, top: 28.1 },
			{ left: 50.7, top: 24 },
			{ left: 46.9, top: 34.4 },
			{ left: 44.6, top: 38.5 },
			{ left: 42.4, top: 40.5 },
			{ left: 46.2, top: 30.2 },
			{ left: 50.3, top: 34.4 },
			{ left: 58.1, top: 38.8 },
			{ left: 55.1, top: 40.6 },
			{ left: 54, top: 45.6 },
			{ left: 52, top: 83.2 },
			{ left: 67.8, top: 55.3 },
			{ left: 79.8, top: 47.8 },
			{ left: 78, top: 53.3 },
			{ left: 76.5, top: 57.6 },
			{ left: 86.6, top: 66.4 },
			{ left: 87.8, top: 87 },
		];
	}, []);

	const selfRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	const { stats } = T.texts.map;

	const handleScroll = useCallback(() => {
		if (!selfRef.current) return;
		const selfPos = selfRef.current.getBoundingClientRect().bottom;
		const scrollPos = window.innerHeight - selfPos + 60;

		if (scrollPos > 0) {
			setIsVisible(true);
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll, { passive: true });
			handleScroll();
		}

		if (isVisible) {
			window.removeEventListener("scroll", handleScroll);
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll, isVisible]);

	useEffect(() => {
		const rotateStat = () => {
			const nextStat = loopTo("next", currentStat, stats.length);
			setCurrentStat(nextStat);
		};

		const interval = setInterval(rotateStat, 2955);

		return () => clearInterval(interval);
	}, [stats, currentStat]);

	return (
		<div className={clsx("Home_Map", { visible: isVisible })} ref={selfRef}>
			<div className="stat bg z-3">
				{stats.map((stat, k) => (
					<p
						className={clsx(
							"true_center bg-reflex text-white text-center font-black rounded-xl px-5 py-2 sm:nowrap",
							k === currentStat ? "opacity-1" : "opacity-0"
						)}
						key={`stat_${k}`}>
						{stat}
					</p>
				))}
			</div>
			<div className="pins_wrapper bg z-2">
				{pins.map(({ left, top }, k) => {
					const cssStyles = { left: `${left}%`, top: `${top}%`, zIndex: Math.round(top * 100) };
					return <img src={pin} className="pin" style={cssStyles} alt="" key={`pin_${left * 100}${top * 100}${k}`} />;
				})}
			</div>
			<Img className="map z-1 bg" image={data.map.childImageSharp.gatsbyImageData} alt="" />
		</div>
	);
}
