import React from "react";
import clsx from "clsx";

import type Children from "@types";

type OvertitleProps = {
	tag?: string;
	id?: string;
	className?: string;
	weight?: string;
	children: Children;
};

export default function Overtitle({ tag = "p", id, className, weight = "medium", children }: OvertitleProps): JSX.Element {
	const CustomTag = tag;

	return (
		<CustomTag id={id} className={clsx("subtitle-1 gradient", `font-${weight}`, className)}>
			{children}
		</CustomTag>
	);
}
