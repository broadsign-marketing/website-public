import React from "react";
import clsx from "clsx";

import "@sass/components/Container.scss";

import { Children } from "@types";

type AvailableTags = "div" | "nav" | "section";

interface ContainerProps {
	tag?: AvailableTags;
	id?: string;
	className?: string;
	children: Children;
}

export default function Container({ tag = "div", id = "", className = "", tabIndex, children }: ContainerProps): JSX.Element {
	const cssClasses = clsx("container", className);
	const CustomTag = tag;

	return (
		<CustomTag id={id} className={cssClasses} tabIndex={tabIndex}>
			{children}
		</CustomTag>
	);
}
