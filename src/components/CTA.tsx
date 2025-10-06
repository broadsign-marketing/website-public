import React, { useMemo } from "react";
import clsx from "clsx";

import Link from "@components/LocalizedLink";

import "@sass/components/CTA.scss";

import { Children } from "@types";

type CTAPreset =
	| ""
	| "primary"
	| "primary-outline"
	| "primary-inverted"
	| "outline-transparent"
	| "secondary"
	| "secondary-outline"
	| "white-outline-transparent";
type CTAHoverPreset = "" | "full-reflex" | "full-cerulean" | "full-white" | "outline-reflex";

type CTAProps = {
	id?: string;
	className?: string;
	preset?: CTAPreset;
	hoverPreset?: CTAHoverPreset;
	to?: string;
	label?: string;
	onClick?: Function | null;
	target?: string;
	children: Children;
} & ({ className: string; preset?: CTAPreset } | { preset: CTAPreset; className?: string });

export default function CTA({
	id = "",
	className = "",
	to = "",
	preset = "",
	hoverPreset = "",
	target = "",
	disabled = false,
	children,
	onClick = null,
}: CTAProps): JSX.Element {
	const ctaClassName = useMemo(() => {
		let out = "CTA";

		if (preset === "primary") {
			out += " bg-reflex text-white border-reflex";
		} else if (preset === "primary-outline") {
			out += " bg-white text-reflex border-reflex";
		} else if (preset === "primary-inverted") {
			out += " bg-white text-reflex border-transparent";
		} else if (preset === "outline-transparent") {
			out += " bg-transparent text-reflex border-reflex";
		} else if (preset === "secondary") {
			out += " bg-cerulean text-white border-cerulean";
		} else if (preset === "secondary-outline") {
			out += " bg-white text-cerulean border-cerulean";
		} else if (preset === "white-outline-transparent") {
			out += " bg-transparent text-white border-white";
		}

		if (hoverPreset === "full-reflex") {
			out += " hover:bg-reflex hover:text-white hover:border-reflex";
		} else if (hoverPreset === "full-cerulean") {
			out += " hover:bg-cerulean hover:text-white hover:border-cerulean";
		} else if (hoverPreset === "full-white") {
			out += " hover:bg-white hover:text-reflex hover:border-white";
		} else if (hoverPreset === "outline-reflex") {
			out += " hover:bg-white hover:text-reflex hover:border-reflex";
		}

		return clsx(out, className);
	}, [className, preset, hoverPreset]);

	if (onClick) {
		return (
			<button id={id} className={ctaClassName} disabled={disabled} onClick={() => onClick()}>
				{children}
			</button>
		);
	}

	return (
		<Link to={to} id={id} className={ctaClassName} target={target}>
			{children}
		</Link>
	);
}

export { CTAProps };
