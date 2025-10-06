import React, { useEffect, useState } from "react";
import clsx from "clsx";

import "@sass/components/20thLogo.scss";

import { Locale } from "@types";
type Logo20thProps = { l: Locale };

export default function Logo20th({ l }: Logo20thProps) {
	return (
		<div className={clsx("Logo20th", l)}>
			<div
				className={clsx(
					"logo_wrapper flex flex-column align-items-start flex-nowrap max-h-full z-1 sm:flex-row",
					l === "zh" ? "justify-content-center" : "justify-content-between"
				)}>
				{l !== "zh" && <img className="twentyplus mb-4 sm:mb-0" src={"/img/Logo20th/20plus.svg"} alt="" />}
				<img className="i18n_text w-full sm:w-auto" src={`/img/Logo20th/logo_${l}.svg`} alt="" />
			</div>
		</div>
	);
}
