import React, { useState } from "react";
import { graphql, navigate } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";
import route, { routeWithUtmForm } from "@route";

import { FeatureWrapper, FeatureOverTitle, FeatureTitle, FeaturePar } from "@components/Aquarius";
import AquariusMissionInNumbers from "@components/AquariusMissionInNumbers";
import AquariusSOC2CTABox from "@components/AquariusSOC2CTABox";
import CTA from "@components/CTA";
import Container from "@components/Container";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import LogosMarquee from "@components/LogosMarquee";
import Modal from "@components/Modal";
import NeonBox from "@components/NeonBox";

import logo_coles from "@logos/coles_reflex.svg";
import logo_coles_express from "@logos/coles_express_reflex.svg";
import logo_iga from "@logos/iga_reflex.svg";
import logo_7eleven from "@logos/seven_eleven_reflex.svg";
import logo_woolworths from "@logos/woolworths_reflex.svg";

import icon_automation from "@img/pages/in-store-retail-platform/icon_automation.svg";
import icon_centralized from "@img/pages/in-store-retail-platform/icon_centralized.svg";
import icon_insights from "@img/pages/in-store-retail-platform/icon_insights.svg";

import whirl from "@img/pages/inventory-marketplace/custom_package.svg";

import "@sass/pages/broadsign_platform.scss";

import type { BroadsignPageProps } from "@types";

export default function InStoreRetailPlatform({ pageContext: { l, dicoPath }, location: { pathname }, data }: BroadsignPageProps) {
	const [showBookCallModal, setShowBookCallModal] = useState(false);

	useDico(l, dicoPath);

	const icons = {
		automation: icon_automation,
		centralized: icon_centralized,
		insights: icon_insights,
	};

	return (
		<Layout id="broadsign_platform" className={clsx("theme_carolina retail_platform")}>
			<Container>
				<div className="hero pt-10 pb-10 relative z-2 overflow-x-hidden md:pt-25">
					<h1 className="text-reflex font-superbold line-height-100 mb-8 sm:text-center sm:mx-auto">{T.translate("hero.title")}</h1>
					<p className="tagline text-reflex text-16 line-height-180 mb-10 sm:text-center">{T.translate("hero.blurb")}</p>
					<div className="flex flex-wrap justify-content-center mb-15 sm:flex-nowrap">
						<CTA onClick={() => setShowBookCallModal(true)} className="primary w-full max-h-full mb-2 sm:w-auto sm:mr-2">
							{T.translate("hero.ctaBookCall")}
						</CTA>
						<CTA
							to={`${route("plans")}?pi=retail-media-platform`}
							className="bg-transparent text-reflex border-reflex w-full max-h-full mb-2 px-6 sm:w-auto sm:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{T.translate("hero.ctaPricing")}
						</CTA>
					</div>
					<Img image={data.hero_video_poster.childImageSharp.gatsbyImageData} className="hero_img block mx-auto" objectFit="contain" alt="" />
				</div>
			</Container>
			<Container className="text-center mt-12">
				<p className="subtitle-1 gradient font-medium mx-auto mb-10">{T.translate("logos.title")}</p>
			</Container>
			<LogosMarquee className="mb-16" logos={[logo_coles, logo_iga, logo_7eleven, logo_coles_express, logo_woolworths]} />
			<Container className="selling_features pb-8">
				<h2 className="h4 text-transform-none sm:text-center sm:mb-10">{T.translate("e2e.title")}</h2>
				<div className="grid">
					{T.texts.e2e.boxes.map(({ icon, title, par }) => (
						<div className="col-12 sm:col-4" key={icon}>
							<NeonBox>
								<img src={icons[icon]} className="" height="48" width="48" alt="" />
								<h4 className="text-20 mb-3">{title}</h4>
								<p className="line-height-180 m-0">{par}</p>
							</NeonBox>
						</div>
					))}
				</div>
			</Container>
			<section className="features">
				<FeatureWrapper>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.campaignPlanning.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.campaignPlanning.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.campaignPlanning.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="campaignPlanning">
							{T.translate("features.campaignPlanning.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_campaign_planning.childImageSharp.gatsbyImageData} className="" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse" wrapperClassName="bg-white sm:bg-transparent">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.contentNetworkManagement.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.contentNetworkManagement.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.contentNetworkManagement.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="contentNetworkManagement">
							{T.translate("features.contentNetworkManagement.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_content_network_management.childImageSharp.gatsbyImageData} className="" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.globalProgrammaticSSP.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.globalProgrammaticSSP.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.globalProgrammaticSSP.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="globalProgrammaticSSP">
							{T.translate("features.globalProgrammaticSSP.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_global_programmatic_ssp.childImageSharp.gatsbyImageData} className="" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse" wrapperClassName="bg-white sm:bg-transparent">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.localSignageMessaging.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.localSignageMessaging.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.localSignageMessaging.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="localSignageMessaging">
							{T.translate("features.localSignageMessaging.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-column flex-center h-auto sm:col-6">
						<Img image={data.feature_local_signage_messaging.childImageSharp.gatsbyImageData} className="" alt="" />
					</div>
				</FeatureWrapper>
			</section>
			<AquariusSOC2CTABox className="mt-8 mb-20" />
			<AquariusMissionInNumbers className="mt-10 mb-12 sm:mb-32" />
			<Container tag="section" className="shin mb-14">
				<div className={clsx("bg-gradient rounded-xl")}>
					<div className="grid">
						<div className="col-12 text-center sm:col-5 md:col-4">
							<img src={whirl} className="img max-w-full" alt="" />
						</div>
						<div className="col-12 sm:col-7 md:col-8">
							<div className="pt-8 pb-10 px-4 sm:pr-10">
								<h2 className="h4 text-white text-left mb-4">{T.translate("shin.title")}</h2>
								<p className="text-white text-left line-height-180 mb-10 sm:mb-6">{T.translate("shin.par")}</p>
								<CTA
									preset="white-outline-transparent"
									hoverPreset="full-white"
									onClick={() => setShowBookCallModal(true)}
									className="max-w-full">
									{T.translate("shin.cta")}
								</CTA>
							</div>
						</div>
					</div>
				</div>
			</Container>
			{showBookCallModal && (
				<Modal variant="form" className="theme_carolina narrow" onClose={() => setShowBookCallModal(false)}>
					<h3 className="h4 text-reflex mb-8">{T.translate("shin.cta")}</h3>
					<Form form="bookACall" campaign="bookACallRetail" redirectUrl={routeWithUtmForm("thankYou", "book_a_call_retail")} />
				</Modal>
			)}
		</Layout>
	);
}

export const subscribeImg = graphql`
	query {
		hero_video_poster: file(relativePath: { eq: "pages/broadsign-platform/hero_video_poster.png" }) {
			...img
		}

		feature_audience_campaigns: file(relativePath: { eq: "pages/broadsign-platform/feature_audience_campaigns.png" }) {
			...imgW500
		}
		feature_campaign_planning: file(relativePath: { eq: "pages/in-store-retail-platform/feature_campaign_planning.png" }) {
			...imgW500
		}
		feature_content_network_management: file(relativePath: { eq: "pages/broadsign-platform/feature_content_network_management.png" }) {
			...imgW500
		}
		feature_static_campaigns: file(relativePath: { eq: "pages/broadsign-platform/feature_static_campaigns.png" }) {
			...imgW500
		}
		feature_global_programmatic_ssp: file(relativePath: { eq: "pages/broadsign-platform/feature_global_programmatic_ssp.png" }) {
			...imgW500
		}
		feature_local_signage_messaging: file(relativePath: { eq: "pages/in-store-retail-platform/feature_local_signage_messaging.png" }) {
			...imgW500
		}
	}
`;
