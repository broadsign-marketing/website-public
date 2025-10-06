import React, { useState } from "react";
import T from "i18n-react";
import langs from "@i18n/configs";
import { useL } from "@hooks/useDico";
import clsx from "clsx";
import { sanitizePath } from "@annex";
import Link from "@components/LocalizedLink";

function CurrentLang({ isUnfoldable = true }) {
	return (
		<div className={clsx("LangSelector__current_lang flex align-items-center justify-content-center", isUnfoldable ? "unfoldable" : "")}>
			<span className="state_hover font-bold">{T.translate("lang")}</span>
			<span className="state_normal font-regular">{T.translate("lang")}</span>
		</div>
	);
}

function LangMenu({ items }) {
	return (
		<ul aria-label="Language Selector" className="LangSelector__menu flex flex-column align-items-center bg-white rounded-12">
			{items.map(({ code, url, label }) => (
				<li key={code}>
					<Link className="text-ash text-center w-full px-3 py-2 rounded-4 nowrap hover:bg-alice" to={url} exact={true}>
						{label}
					</Link>
				</li>
			))}
		</ul>
	);
}

export default function LangSelector() {
	if (!T || !T.texts || !T.texts.lang) {
		return null;
	}

	const [isActive, setIsActive] = useState(false);

	const l = useL();

	const items = (() => {
		if (!T?.texts?.translations) {
			return [];
		}

		let out = [];

		for (const lang of langs) {
			const { name, code } = lang;
			if (code !== l && T.texts.translations[code]) {
				out.push({
					label: name,
					code: code,
					url: sanitizePath(T.texts.translations[code]),
					className: "LangSelector__link",
				});
			}
		}

		return out;
	})();

	if (items.length < 1) {
		return (
			<div className="LangSelector disabled align-items-stretch justify-content-center mr-0 ml-auto disabled hidden md:flex">
				<CurrentLang isUnfoldable={false} />
			</div>
		);
	}

	return (
		<div
			role="menubar"
			className={clsx("LangSelector flex align-items-stretch justify-content-center mr-0 ml-auto", isActive ? "active" : "")}
			onMouseOver={() => {
				setIsActive(true);
			}}
			onFocus={() => {
				setIsActive(true);
			}}
			onMouseLeave={() => {
				setIsActive(false);
			}}
			onBlur={() => {
				setIsActive(false);
			}}>
			<CurrentLang />
			<LangMenu items={items} />
		</div>
	);
}
