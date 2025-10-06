import React from "react";
import T from "i18n-react";
import clsx from "clsx";
import Container from "@components/Container";
import CTA from "@components/CTA";
import { getTranslations } from "@annex";

import "@sass/components/AquariusSOC2CTABox.scss";

import badge_soc2 from "@img/pages/content-network-management/badge_soc2.svg";
import badge_soc2_bg from "@img/pages/content-network-management/badge_soc2_bg.svg";

type SimpleComponentProps = { className: string };

export default function AquariusSOC2CTABox({ className }: SimpleComponentProps) {
	const l = T.translate("key") === "key" ? "en" : T.translate("key");
	const __ = getTranslations(`${l}/components/AquariusSOC2CTABox`);

	return (
		<Container className={clsx("soc2_cta_box", className)}>
			<div className="bg-zircon flex flex-row align-items-center w-full rounded-xl md:py-10">
				<div className="badge mb-6">
					<img src={badge_soc2} className="text" alt="SOC 2 Badge" />
					<img src={badge_soc2_bg} className="bg" alt="SOC 2 Badge" />
				</div>
				<div className="text_wrapper block text-left pt-18 px-5 pb-5 w-full md:py-0 md:pr-10">
					<h2 className="h4">{__.title}</h2>
					<p className="text-reflex mb-12">{__.par}</p>
					<CTA to="/blog/how-broadsign-is-building-assurance-with-soc-2-compliance" className="primary">
						{__.cta}
					</CTA>
				</div>
			</div>
		</Container>
	);
}
