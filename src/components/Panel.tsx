import React from "react";
import clsx from "clsx";

import "@sass/components/Panel.scss";

import { Children } from "@types";

type PanelProps = {
	id?: string;
	className?: string;
	color?: string;
	padding?: string;
	children: Children;
};

const Panel = ({ id = "", className = "", color = "ultra", padding, children }: PanelProps) => {
	return (
		<div
			id={id}
			className={clsx("Panel", className, color)}
			style={{
				padding: padding,
			}}>
			{children}
		</div>
	);
};

export default Panel;
