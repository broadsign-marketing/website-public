import React from "react";
import T from "i18n-react";
import clsx from "clsx";
import Container from "@components/Container";
import { getTranslations } from "@annex";

import NeonBox from "@components/NeonBox";

import "@sass/components/AquariusMissionInNumbers.scss";

import icon_countries from "@img/pages/content-network-management/icon_countries.svg";
import icon_ads from "@img/pages/content-network-management/icon_ads.svg";
import icon_impressions from "@img/pages/content-network-management/icon_impressions.svg";

type SimpleComponentProps = { className: string };

export default function AquariusMissionInNumbers({ className }: SimpleComponentProps) {
	const l = T.translate("key") === "key" ? "en" : T.translate("key");
	const __ = getTranslations(`${l}/components/AquariusMissionInNumbers`);

	return (
		<Container className={clsx("mission_in_numbers", className)}>
			<div className="grid">
				<div className="col-12 sm:col-6 md:col-3">
					<h2 className="h4 text-center sm:text-left">{__.title}</h2>
				</div>
				<div className="col-12 sm:col-6 md:col-3">
					<NeonBox innerClassName="flex flex-row align-items-center justify-content-start px-4 py-7 sm:flex-column">
						<img src={icon_countries} alt="" />
						<div>
							<p className="num">{__.box1.num}</p>
							<p className="what">{__.box1.what}</p>
						</div>
					</NeonBox>
					{/* <div className="box h-full bg-zircon flex flex-column align-items-center px-4 py-7 rounded-xl">
					</div> */}
				</div>
				<div className="col-12 sm:col-6 md:col-3">
					<NeonBox innerClassName="flex flex-row align-items-center justify-content-start px-4 py-7 sm:flex-column">
						<img src={icon_ads} alt="" />
						<div>
							<p className="num">{__.box2.num}</p>
							<p className="what">{__.box2.what}</p>
						</div>
					</NeonBox>
				</div>
				<div className="col-12 sm:col-6 md:col-3">
					<NeonBox innerClassName="flex flex-row align-items-center justify-content-start px-4 py-7 sm:flex-column">
						<img src={icon_impressions} alt="" />
						<div>
							<p className="num">{__.box3.num}</p>
							<p className="what">{__.box3.what}</p>
						</div>
					</NeonBox>
				</div>
			</div>
		</Container>
	);
}
