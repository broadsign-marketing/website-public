import React, { useMemo } from "react";
import clsx from "clsx";

import "@sass/components/Grid.scss";

import { Children } from "@types";

type Breakpoint = "sm" | "md" | "lg";
type BooleanString = "true" | "false";

interface ColumnProps {
	id: string;
	className: string;
	breakpoint: Breakpoint;
	style: object;
	aside: boolean | BooleanString;
	children: Children;
}

interface RowProps {
	id: string;
	className: string;
	breakpoint: Breakpoint;
	children: Children;
}

export function Column({ id, className, children, style, aside }: ColumnProps) {
	if (aside) {
		return (
			<aside className={clsx("Column", className)} id={id} style={style}>
				{children}
			</aside>
		);
	}

	return (
		<div className={clsx("Column", className)} id={id} style={style}>
			{children}
		</div>
	);
}

export function Row({ id, className, breakpoint = "sm", children }: RowProps) {
	const colsNum = useMemo(() => {
		if (children && children.length) {
			return Object.values(children).filter((e) => e !== "").length;
		}
		return 1;
	}, [children]);

	return (
		<div className={clsx("Grid Row", className, `cols-${colsNum}`, `bp-${breakpoint}`)} id={id}>
			{children}
		</div>
	);
}
