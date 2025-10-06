import React from "react";
import clsx from "clsx";

// import CTA from "@components/CTA";
import Container from "@components/Container";
import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";

import "@sass/components/VerticalFeature.scss";

type VerticalFeatureProps = {
	img: IGatsbyImageData;
	imgPosition: "left" | "right";
	className?: string;
	overtitle?: string;
	title: string;
	blurb: string;
	cta: string;
	to?: string;
	onClick?: Function;
};

export default function VerticalFeature({ img, imgPosition = "left", className, overtitle, title, blurb /* cta, to, onClick */ }: VerticalFeatureProps) {
	return (
		<div className={clsx("VerticalFeature", className)}>
			<Container>
				<div className="grid">
					<div className={clsx("col-12 flex flex-center sm:col-6", imgPosition === "left" ? "sm:pr-8 sm:flex-order-1" : "sm:pl-8 sm:flex-order-2")}>
						<Img image={img} className="feature_img mb-4 sm:mb-0" objectFit="contain" alt="" />
					</div>
					<div
						className={clsx(
							"col-12 flex flex-column align-items-start justify-content-center sm:col-6",
							imgPosition === "left" ? "sm:pl-8 sm:flex-order-2" : "sm:pr-8 sm:flex-order-1"
						)}>
						{overtitle && <p className="subtitle-1 gradient font-medium mb-2">{overtitle}</p>}
						{title && <h2 className="text-reflex text-24 font-superbold line-height-140 text-transform-none mb-4 sm:text-34 sm:mb-8">{title}</h2>}
						{blurb && <p className="text-ash text-16 line-height-180">{blurb}</p>}
					</div>
				</div>
			</Container>
		</div>
	);
}
