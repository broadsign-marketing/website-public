import React from "react";
import clsx from "clsx";

import "@sass/components/Tank.scss";

export default function Tank({ div, id, className, children }) {
	if (div) {
		return (
			<div id={id} className={clsx("Tank", className)}>
				{children}
			</div>
		);
	}

	return (
		<section id={id} className={clsx("Tank", className)}>
			{children}
		</section>
	);
}
