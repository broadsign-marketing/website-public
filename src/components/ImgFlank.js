import React from "react";
import clsx from "clsx";

import { GatsbyImage as Img } from "gatsby-plugin-image";

import "@sass/components/ImgFlank.scss";

export default function ImgFlank({ id, src, alt, invert, className, children, imgClassName, objectPosition, objectFit = "contain" }) {
	return (
		<div id={id} className={clsx("ImgFlank", { invert: invert }, className)}>
			<aside>
				{typeof src === "object" ? (
					<Img image={src} alt="" className={clsx(imgClassName)} objectFit={objectFit} objectPosition={objectPosition} />
				) : (
					<img src={src} alt="" className={`object-fit-${objectFit}`} />
				)}
			</aside>
			<div className="lead">{children}</div>
		</div>
	);
}
