import React, { useMemo } from "react";
import clsx from "clsx";

import "@sass/components/GradientBox.scss";

import CTA, { CTAProps } from "@components/CTA";
import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";
import { Children } from "@types";

type GradientBoxProps = {
	id?: string;
	className?: string;
	children: Children;
	variant: "text_cta" | "image_text";
	cta?: CTAProps;
	img?: string | IGatsbyImageData;
};

export default function GradientBox({ id, className, variant, children, cta, img }: GradientBoxProps) {
	return (
		<div className={clsx("GradientBox bg-gradient rounded-xl", `variant_${variant}`, className)} id={id}>
			{variant === "text_cta" && (
				<div className="grid">
					<div className="col-12 sm:col-6 md:col-8">{children}</div>
					<div className="col-12 flex align-items-center sm:col-6 sm:justify-content-end md:col-4">
						<CTA {...cta} preset="primary-inverted" hoverPreset="full-cerulean">
							{cta.label}
						</CTA>
					</div>
				</div>
			)}
			{variant === "image_text" && (
				<div className="grid">
					<div className="col-12 text-center sm:col-5 md:col-4">
						{typeof img === "string" ? <img src={img} alt="" /> : <Img image={img} alt="" />}
					</div>
					<div className="col-12 sm:col-7 md:col-8">
						{children}
						{cta && (
							<CTA {...cta} preset="primary-inverted" hoverPreset="full-cerulean">
								{cta.label}
							</CTA>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
