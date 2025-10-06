import React from "react";
import clsx from "clsx";
import "@sass/components/Spynav.scss";
import "@sass/components/SpynavTabs.scss";

import { Children } from "@types";

interface SpynavTabsProps {
	id?: string;
	className?: string;
	children: Children;
}

export default function SpynavTabs({ id, className, children }: SpynavTabsProps) {
	return (
		<div className={clsx("Spynav SpynavTabs", className)} id={id}>
			{children}
		</div>
	);
}
