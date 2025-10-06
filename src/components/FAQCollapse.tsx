import React, { useEffect, useState } from "react";
import clsx from "clsx";

import chevron from "@img/controls/chevron_down_ash.svg";

import "@sass/components/FAQCollapse.scss";

type FAQProps = { id?: string; q: string; a: string; borders?: string; dataQ?: string };
declare const window: any;

function Answer({ a }) {
	if (Array.isArray(a)) {
		return (
			<div className="a">
				{a.map((item, k) =>
					Array.isArray(item) ? (
						<ul key={k}>
							{item.map((subitem, j) => {
								return <li className="" dangerouslySetInnerHTML={{ __html: subitem }} key={j} />;
							})}
						</ul>
					) : (
						<p className="text-ash" dangerouslySetInnerHTML={{ __html: item }} key={k} />
					)
				)}
			</div>
		);
	}

	return <p className="a text-ash" dangerouslySetInnerHTML={{ __html: a }} />;
}

export default function FAQCollapse({ q = "", a = "", borders = "soft", dataQ = "" }: FAQProps) {
	const [isActive, setIsActive] = useState(false);
	const [hasBeenClicked, setHasBeenClicked] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (isActive && !hasBeenClicked) {
				setHasBeenClicked(true);
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({ event: "aquarius_faq_click", question: dataQ });
			}
		}
	}, [isActive, hasBeenClicked]);

	return (
		<div className={clsx("faq_collapse qa", `border-${borders}`, { active: isActive })}>
			<p
				className={clsx("q text-ash", { track_faq_clicks: dataQ && !isActive })}
				data-question={dataQ}
				onClick={() => {
					setIsActive(!isActive);
				}}>
				<img src={chevron} className="chevron" alt="" />
				{q}
			</p>
			<Answer a={a} />
		</div>
	);
}
