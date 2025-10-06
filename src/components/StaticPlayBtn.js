import React from "react";

import play_btn_img from "@img/controls/play_btn_semisolid_white.svg";
import "@sass/components/StaticPlayBtn.scss";

export default function StaticPlayBtn() {
	return (
		<div className="static_play_btn">
			<img src={play_btn_img} alt="Play" />
		</div>
	);
}
