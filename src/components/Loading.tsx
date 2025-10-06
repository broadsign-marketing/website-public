import React from "react";
import clsx from "clsx";
import "@sass/components/Loading.scss";

type LoadingProps = { id?: string; className?: string; bold?: boolean; size?: string; white?: boolean };

export default function Loading({ id, className, bold = false, size = "1", white = false }: LoadingProps) {
	return (
		<div id={id} className={clsx("Loading", className, `size_${size}`, { bold: bold, white: white })}>
			<div className="line"></div>
			<div className="line"></div>
			<div className="line"></div>
		</div>
	);
}
