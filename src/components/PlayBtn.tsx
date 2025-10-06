import React from "react";
import clsx from "clsx";

import btn_gradient_blue from "@img/controls/play_btn_gradient_blue.svg";
import btn_full_reflex from "@img/controls/play_btn_full_reflex.svg";

import "@sass/components/PlayBtn.scss";

import type { PlayBtnStyle, PlayBtnColor } from "@types";

type PlayBtnGradientBlueProps = {
	id?: string;
	className?: string;
};

type PlayBtnInner = {
	style?: PlayBtnStyle;
	color?: PlayBtnColor;
};

type PlayBtnProps = {
	style?: PlayBtnStyle;
	color?: PlayBtnColor;
	id?: string;
	className?: string;
	div?: boolean;
	onClick?: false | Function;
};

export const PlayBtnGradientBlue = ({ id, className }: PlayBtnGradientBlueProps) => {
	return (
		<div role="button" id={id} className={clsx("div", "PlayBtn m-0 absolute full_center", className)} tabIndex={0}>
			<img src={btn_gradient_blue} alt="Play" />
		</div>
	);
};

export const PlayBtnFullReflex = ({ id, className }: PlayBtnGradientBlueProps) => {
	return (
		<div role="button" id={id} className={clsx("div", "PlayBtn m-0 absolute full_center", className)} tabIndex={0}>
			<img src={btn_full_reflex} alt="Play" />
		</div>
	);
};

const PlayBtnInner = ({ color, style }) => {
	return (
		<>
			<div className={`border-${color}`}></div>
			<div className={`border-${color}`}></div>
			<div className={`border-${color}`}></div>
			<div className={`border-${color}`}></div>
			<img src={`/img/controls/play_btn_${style}_${color}.svg`} alt="Play" height="80" width="80" />
		</>
	);
};

export default function PlayBtn({ id, className, div = false, color = "white", style = "lines", onClick = false }: PlayBtnProps) {
	if (style === "gradient_blue") {
		return <PlayBtnGradientBlue id={id} className={className} />;
	}

	if (div) {
		return (
			<div role="button" id={id} className={clsx("div", "PlayBtn", className, color, style)} onClick={onClick} onKeyDown={onClick} tabIndex={0}>
				<PlayBtnInner color={color} style={style} />
			</div>
		);
	}

	return (
		<button id={id} className={clsx("div", "PlayBtn", className, color, style)} onClick={onClick} onKeyDown={onClick} tabIndex={0}>
			<PlayBtnInner color={color} style={style} />
		</button>
	);
}
