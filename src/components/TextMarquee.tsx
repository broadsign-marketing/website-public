import React from "react";
import clsx from "clsx";
import { useScreen } from "@hooks/useScreen";

import "@sass/components/TextMarquee.scss";

import { Children } from "@types";

type TextMarqueeProps = {
	children: Children;
	className?: string;
	id?: string;
	fontSize?: string;
	speed?: string;
};

export default function TextMarquee({ className = "", id = "", fontSize = "", speed = "4000", children }: TextMarqueeProps) {
	const screen = useScreen();

	if (screen === "xs") {
		speed = String(parseInt(speed) * 2);
	}

	return (
		<div className={clsx("TextMarquee", className)} id={id}>
			<div className="TextMarquee__grid" style={{ animationDuration: `${speed / 1000}s` }}>
				<span className="TextMarquee__text" style={{ fontSize }}>
					{children}
				</span>
				<span className="TextMarquee__text" style={{ fontSize }}>
					{children}
				</span>
			</div>
		</div>
	);
}
