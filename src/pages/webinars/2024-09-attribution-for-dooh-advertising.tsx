import React, { useMemo, useState } from "react";
import T from "i18n-react";
import { graphql } from "gatsby";
import { useDico, useDicoNamespace } from "@hooks/useDico";

import Container from "@components/Container";
import CTA from "@components/CTA";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import { HeroDate } from "@components/Webinars__LP_Components";

//import Template, { FormModal as Modal } from "@templates/webinar-registration"; // Before the webinar
import Template, { FormModal as Modal } from "@templates/webinar-on-demand"; // After the webinar

import type { BroadsignPageProps } from "@types";

type PageMode = "register" | "watch";

export default function WebinarAttributionForDOOHAdvertising({ pageContext: { l, dicoPath }, data }: BroadsignPageProps) {
	const [showFormModal, setShowFormModal] = useState(false);

	useDico(l, dicoPath);
	useDicoNamespace("webinar");

	/*
		WHEN SWITCHING FROM "REGISTER" TO "WATCH" MODE :

		1. Replace the "pageMode" variable below
		2. Switch
			import Template, { FormModal as Modal } from "@templates/webinar-registration";
			for
			import Template, { FormModal as Modal } from "@templates/webinar-on-demand";
	*/

	const webinarDate = "2025-02-14 10:00"; // Webinar date in format [YYYY-MM-DD HH:MM]
	const pageMode: PageMode = "watch"; // "register" or "watch"

	const isUpcoming = useMemo<boolean>(() => {
		function getFormattedDate(d) {
			const year = d.getFullYear();
			const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
			const day = String(d.getDate()).padStart(2, "0");
			const hours = String(d.getHours()).padStart(2, "0");
			const minutes = String(d.getMinutes()).padStart(2, "0");
			return `${year}-${month}-${day} ${hours}:${minutes}`;
		}

		const today = getFormattedDate(new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" })));

		if (today > webinarDate) return false;
		return true;
	}, [webinarDate]);

	let ctaLabel = pageMode === "watch" ? T.translate("registerToWatch") : T.translate("register");

	const presenters = []; // Set if you don't want them to be taken from the i18n file
	const video = T.texts?.recordingLink || "";

	return (
		<>
			<Template
				id="webinar_using_brand_lift_studies"
				className=""
				data={data}
				video={video}
				formId="webinarUsingBrandLiftStudiesToMeasureDOOHImpact"
				hero={
					<Container>
						<div className="grid align-items-center sm:align-items-start md:align-items-center">
							<div className="col-12 flex flex-column justify-content-center sm:col-6 sm:flex-order-2 sm:pl-10">
								<Img image={data.hero.childImageSharp.gatsbyImageData} className="hero_img mt-4 mb-10 sm:mb-0 md:my-10" alt="" />
							</div>
							<div className="col-12 sm:col-6 sm:flex-order-1 sm:pr-4">
								<p className="subtitle-1 gradient font-medium mb-4 sm:mb-8">Webinar</p>
								<p className="text-reflex text-20 font-bold line-height-120 mb-2 sm:text-24">From Impressions to Impact:</p>
								<h1 className="text-48 font-black text-transform-none line-height-120 mb-10">Attribution for DOOH Advertising</h1>
								{pageMode === "register" && (
									<HeroDate date="Thursday, September 26, 2024 at 10:00 am ET | 2:00 pm GMT" lines="gradient" padding="2" />
								)}
								<p className="text-dark text-16 line-height-180 mt-8 mb-10">
									Watch the on-demand webinar hosted by Ryan Pogy, Broadsign's Data Partnerships Director, to explore the most effective
									strategies for DOOH attribution. Learn how to leverage industry-standard solutions to effectively report on your DOOH
									campaigns and gain key audience and brand insights to inform your strategy.
								</p>
								{isUpcoming && (
									<CTA className="primary" onClick={() => setShowFormModal(true)}>
										Register
									</CTA>
								)}
							</div>
						</div>
					</Container>
				}
				description={
					<>
						<h2 className="text-24 font-bold text-transform-none mb-4 sm:text-34">What's covered:</h2>
						<ul className="checks_gradient">
							<li>
								The State of DOOH Data: Get the latest insights into the current landscape of data and attribution in digital out-of-home
								advertising.
							</li>
							<li>
								The Basics of Attribution Solutions: Discover how brand lift studies, foot traffic analysis, web & app lift, and device ID
								passback work for DOOH.
							</li>
							<li>Choosing the Right Solution: Learn how to select the best attribution solution tailored to your campaign goals.</li>
							<li>Optimizing for the Future: Find out how these data insights can drive in-flight adjustments and inform future strategies.</li>
							<li>Real-World Case Studies: Learn how top brands have measured the success of their DOOH campaigns.</li>
						</ul>
					</>
				}
				ctaBox={
					<div className="bg-gradient px-5 py-4 rounded-xl">
						{pageMode === "watch" && (
							<>
								<h2 className="flexible_box_title text-30 text-white text-center font-bold text-transform-none line-height-120 mb-4">
									Register to watch the webinar!
								</h2>
								<p className="mb-0 text-center">
									<CTA preset="white-outline-transparent" hoverPreset="full-white" onClick={() => setShowFormModal(true)}>
										{ctaLabel}
									</CTA>
								</p>
							</>
						)}
						{pageMode === "register" && isUpcoming && (
							<>
								<h2 className="flexible_box_title text-30 text-white text-center font-bold text-transform-none line-height-120 mb-4">
									Reserve <span className="inline-block">your spot!</span>
								</h2>
								<p className="mb-0 text-center">
									<CTA preset="white-outline-transparent" hoverPreset="full-white" onClick={() => setShowFormModal(true)}>
										{ctaLabel}
									</CTA>
								</p>
							</>
						)}
						{pageMode === "register" && !isUpcoming && (
							<div className="py-4">
								<h2 className="flexible_box_title text-30 text-white text-center font-bold text-transform-none line-height-120 mb-4">
									Registrations are now closed
								</h2>
							</div>
						)}
					</div>
				}
				presenters={presenters}
			/>
			<Modal
				form="webinarAttributionForDOOHAdvertising"
				showModal={showFormModal}
				onClose={() => setShowFormModal(false)}
				video={T.translate("recordingLink")}
			/>
		</>
	);
}

export const query = graphql`
	query {
		hero: file(relativePath: { eq: "pages/webinars/attribution_for_dooh_advertising_hero.png" }) {
			...img
		}

		portrait_ryan_pogy: file(relativePath: { eq: "pages/webinars/portrait_ryan_pogy.png" }) {
			...img
		}
	}
`;
