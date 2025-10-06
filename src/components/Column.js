import React from "react";
import clsx from "clsx";

export default function Column({ id, className, children, style, aside }) {
	if (aside) {
		return (
			<aside className={clsx("column", className)} id={id} style={style}>
				{children}
			</aside>
		);
	}

	return (
		<div className={clsx("column", className)} id={id} style={style}>
			{children}
		</div>
	);
}
