import React, { useMemo, useState } from "react";
import T from "i18n-react";
import { graphql } from "gatsby";
import { useDico, useDicoNamespace } from "@hooks/useDico";

import Container from "@components/Container";
import CTA from "@components/CTA";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import { HeroDate } from "@components/Webinars__LP_Components";

import Template, { FormModal as Modal } from "@templates/webinar-registration"; // Before the webinar
//import Template, { FormModal as Modal } from "@templates/webinar-on-demand"; // After the webinar

import "@sass/pages/webinars.scss";

import type { BroadsignPageProps } from "@types";

type PageMode = "register" | "watch";

export default function Webinar202504NewOnTheBroadsignPlatform({ pageContext: { l, dicoPath }, data }: BroadsignPageProps) {
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

	const webinarDate = "2025-04-10 11:00"; // Webinar date in format [YYYY-MM-DD HH:MM]
	const pageMode: PageMode = "register"; // "register" or "watch"

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
				id="new_on_the_broadsign_platform_2025"
				className=""
				data={data}
				video={video}
				formId="webinarUsingBrandLiftStudiesToMeasureDOOHImpact"
				hero={
					<Container>
						<div className="grid align-items-center sm:align-items-stretch">
							<div className="col-12 py-10 flex flex-column align-items-start justify-content-center sm:col-6 sm:pt-15 sm:pb-20">
								<p className="subtitle-1 gradient font-medium mb-4 sm:mb-6">Webinar</p>
								<h1 className="text-48 font-superbold line-height-100 mb-12">New on the Broadsign Platform</h1>
								{pageMode === "register" && <HeroDate date="April 10, 2025, 11 AM ET | 4 PM GMT" lines="gradient" padding="2" />}
								{isUpcoming && (
									<>
										<CTA className="primary mt-12" onClick={() => setShowFormModal(true)}>
											{ctaLabel}
										</CTA>
									</>
								)}
							</div>
							<div className="col-12 flex flex-row align-items-center justify-content-center pb-0 sm:col-6 sm:justify-content-end">
								<Img
									image={data.hero.childImageSharp.gatsbyImageData}
									className="hero_img mt-4 mb-0 md:mt-0"
									style={{ maxWidth: "441px" }}
									alt=""
								/>
							</div>
						</div>
					</Container>
				}
				description={
					<>
						<p className="line-height-180 mb-8">
							The Broadsign Platform is evolving to meet the ever-changing needs of the OOH industry. We're thrilled to announce a series of
							exciting enhancements designed to make your OOH campaigns smarter, more efficient, and more impactful.
						</p>
						<p className="line-height-180 mb-8">
							Save your seat for our upcoming webinar, where our product experts will unveil the latest platform upgrades and give you a sneak
							peek at the groundbreaking features coming in 2025. We can't wait to share what we've been working on!
						</p>
						<p className="line-height-180 mb-8">
							Our 2025 focus is all about <b>intelligent insights, campaign management evolution, and connected trading.</b>
						</p>
						<h2 className="text-24 font-bold text-transform-none mt-10 mb-4 sm:text-34">What we'll cover:</h2>
						<ul className="checks_gradient">
							<li className="inline-block line-height-180">
								Connected trading will support a spectrum of demand, including in-advance and real-time transactions.
							</li>
							<li className="inline-block line-height-180">AI-driven creative approval and categorization coming in the first half of 2025.</li>
							<li className="inline-block line-height-180">
								We're continuing our unification efforts and bringing static and digital campaign management together.
							</li>
							<li className="inline-block line-height-180">
								Updates to our supply-side platform, including Header Bidder Pro and brand safety features.
							</li>
							<li className="inline-block line-height-180">
								Creative management improvements are coming, with a focus on workflow modernization.
							</li>
							<li className="inline-block line-height-180">
								Intelligent insights will provide unified reporting, data visualization, and real-time insights.
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
				form="webinarNewOnTheBroadsignPlatform2025"
				showModal={showFormModal}
				onClose={() => setShowFormModal(false)}
				video={T.translate("recordingLink")}
			/>
		</>
	);
}

export const query = graphql`
	query {
		hero: file(relativePath: { eq: "pages/webinars/2025-04-new-on-the-broadsign-platform/hero.png" }) {
			...img
		}

		portrait_francois_hechme: file(relativePath: { eq: "pages/webinars/2025-04-new-on-the-broadsign-platform/portrait_francois_hechme.png" }) {
			...img
		}
		portrait_gavin_lee: file(relativePath: { eq: "pages/webinars/2025-04-new-on-the-broadsign-platform/portrait_gavin_lee.png" }) {
			...img
		}
		portrait_seamus_hunn: file(relativePath: { eq: "pages/webinars/2025-04-new-on-the-broadsign-platform/portrait_seamus_hunn.png" }) {
			...img
		}
	}
`;
