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

export default function WebinarUsingBrandLiftStudiesToMeasureDOOHImpact({ pageContext: { l, dicoPath }, data }: BroadsignPageProps) {
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
						<div className="grid align-items-center sm:align-items-stretch">
							<div className="col-12 py-10 flex flex-column align-items-start justify-content-center sm:col-6 sm:pt-15 sm:pb-20">
								<p className="subtitle-1 gradient font-medium mb-4 sm:mb-8">Webinar</p>
								<p className="text-reflex text-20 font-bold line-height-120 mb-2 sm:text-24">Memorable Advertising:</p>
								<h1 className="text-48 font-black text-transform-none line-height-120">Using Brand Lift Studies to Measure DOOH Impact</h1>
								<p className="line-height-180"></p>
								{pageMode === "register" && <HeroDate date="October 24, 2024, 10 AM ET | 3 PM GMT" lines="gradient" padding="2" />}
								{isUpcoming && (
									<>
										<CTA className="primary mt-12" onClick={() => setShowFormModal(true)}>
											{ctaLabel}
										</CTA>
									</>
								)}
							</div>
							<div className="col-12 flex flex-column align-items-center justify-content-end pb-0 sm:col-6 sm:align-items-end">
								<Img
									image={data.hero.childImageSharp.gatsbyImageData}
									className="hero_img mt-4 mb-0 md:mt-10"
									style={{ maxWidth: "500px" }}
									alt=""
								/>
							</div>
						</div>
					</Container>
				}
				description={
					<>
						<p className="line-height-180">
							Brand lift studies are an essential attribution tool for understanding the effectiveness of digital out-of-home (DOOH) campaigns. In
							this webinar, we'll explain why brand lift studies are a powerful way to measure campaign impact, compare them to other attribution
							solutions, and provide actionable recommendations on how to run them effectively in your omnichannel strategy.
						</p>
						<p className="line-height-180">
							Led by industry experts from Happydemics and Broadsign, this session will guide you through everything you need to know about brand
							lift measurement. You'll also learn how leading brands are leveraging brand lift studies to track full-funnel metrics, including ad
							recall, attribution, perception, brand familiarity, ad clarity, consideration, and intent.
						</p>
						<h2 className="text-24 font-bold text-transform-none mt-10 mb-4 sm:text-34">What's covered:</h2>
						<ul className="checks_gradient">
							<li className="inline-block line-height-180">
								<strong>Why Brand Lift Studies?</strong> Learn why brand lift studies are one of the most effective attribution tools for DOOH
								campaigns.
							</li>
							<li className="inline-block line-height-180">
								<strong>Use Cases Explained</strong>: Learn when to leverage a brand lift study and how it can complement other campaign
								metrics.
							</li>
							<li className="inline-block line-height-180">
								<strong>Methodology Deep Dive</strong>: Gain a better understanding of how brand lift studies work and their key components.
							</li>
							<li className="inline-block line-height-180">
								<strong>Best Practices for KPIs</strong>: Learn how to select the right KPIs for your DOOH campaign and how they'll be measured
								in a brand lift study.
							</li>
							<li className="inline-block line-height-180">
								<strong>Omnichannel Insights</strong>: Based on data from thousands of brand lift studies, learn when to activate DOOH in your
								media plan for maximum impact. Discover how DOOH complements other channels and enhances brand performance and audience
								engagement.
							</li>
							<li className="inline-block line-height-180">
								<strong>Real-Life Case Studies</strong>: See how Broadsign and Happydemics use brand lift measurement to drive better campaign
								performance for top brands.
							</li>
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
									{T.translate("registrationsClosed")}
								</h2>
							</div>
						)}
					</div>
				}
				presenters={presenters}
			/>
			<Modal
				form="webinarUsingBrandLiftStudiesToMeasureDOOHImpact"
				showModal={showFormModal}
				onClose={() => setShowFormModal(false)}
				video={T.translate("recordingLink")}
			/>
		</>
	);
}

export const query = graphql`
	query {
		hero: file(relativePath: { eq: "pages/webinars/using_brand_lift_studies_hero.png" }) {
			...img
		}

		portrait_ryan_pogy: file(relativePath: { eq: "pages/webinars/portrait_ryan_pogy.png" }) {
			...img
		}
		portrait_virginie_chesnais: file(relativePath: { eq: "pages/webinars/portrait_virginie_chesnais.png" }) {
			...img
		}
	}
`;
