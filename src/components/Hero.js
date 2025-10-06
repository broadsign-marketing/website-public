import React, { useMemo } from "react";
import clsx from "clsx";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Tank from "./Tank";

import "@sass/components/Hero.scss";

export default function Hero({ className = "", id, img, imgSrc, children }) {
	const tankClasses = useMemo(() => {
		let out = [];
		if (className.includes("base_1400")) {
			out.push("base_1400");
		}
		if (className.includes("base_900")) {
			out.push("base_900");
		}
		return out;
	}, [className]);

	if (imgSrc) {
		const style = { backgroundImage: "url('" + imgSrc + "')" };
		return (
			<section id={id} className={clsx("Hero", className)} style={style}>
				<Tank div className={clsx(...tankClasses)}>
					{children}
				</Tank>
			</section>
		);
	} else if (img) {
		return (
			<section id={id} className={clsx("Hero", "fluid", className)}>
				<Img alt="" image={img} className="bgFluid" objectFit="cover" alt="" />
				<Tank div className={clsx(...tankClasses)}>
					{children}
				</Tank>
			</section>
		);
	}

	return (
		<section id={id} className={clsx("Hero", className)}>
			{children}
		</section>
	);
}
