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
import DOOHMoreBanner from "@components/DOOHMoreBanner";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import LogosMarquee from "@components/LogosMarquee";
import Modal from "@components/Modal";

import logo_intersection from "@logos/intersection_reflex.svg";
import logo_quebecor from "@logos/quebecor_reflex.svg";
import logo_outedge from "@logos/outedge_reflex.png";
import logo_clear_channel from "@logos/clear_channel_reflex.svg";
import logo_stroer from "@logos/stroer_reflex.svg";
import logo_lamar from "@logos/lamar_reflex.svg";

import icon_screen from "@img/pages/broadsign-platform/icon_screen.svg";
import icon_workflows from "@img/pages/broadsign-platform/icon_workflows.svg";
import icon_bidders from "@img/pages/broadsign-platform/icon_bidders.svg";

import "@sass/pages/broadsign_platform.scss";

import type { BroadsignPageProps } from "@types";

export default function BroadsignPlatformPage({ pageContext: { l, dicoPath }, location: { pathname }, data }: BroadsignPageProps) {
	const [showBookCallModal, setShowBookCallModal] = useState(false);

	useDico(l, dicoPath);

	const boxesIcons = { box1: icon_screen, box2: icon_workflows, box3: icon_bidders };

	return (
		<Layout id="broadsign_platform" className={clsx("theme_carolina")}>
			<div className="bg-zircon pt-10 pb-10 relative z-2 overflow-x-hidden md:pt-25">
				<Container>
					<div className="hero">
						<h1 className="text-reflex font-superbold line-height-100 mb-8 sm:text-center sm:mx-auto">{T.translate("hero.title")}</h1>
						<p className="tagline text-reflex text-16 line-height-180 mb-10 sm:text-center">{T.translate("hero.blurb")}</p>
						<div className="flex flex-wrap justify-content-center mb-15 sm:flex-nowrap">
							<CTA onClick={() => setShowBookCallModal(true)} className="primary w-full max-h-full mb-2 sm:w-auto sm:mr-2">
								{T.translate("hero.ctaBookCall")}
							</CTA>
							<CTA
								to={`${route("plans")}?pi=broadsign-platform`}
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
				<LogosMarquee logos={[logo_intersection, logo_quebecor, logo_outedge, logo_clear_channel, logo_stroer, logo_lamar]} />
			</div>
			<Container className={clsx("selling_features py-10 sm:pt-25", l === "en" ? "sm:pb-20" : "sm:pb-32")}>
				<h2 className="h4 mb-10 text-transform-none sm:text-center sm:mb-18">{T.translate("e2e.title")}</h2>
				<div className="grid">
					{T.texts.e2e.boxes.map((box) => (
						<div className="col-12 sm:col-4" key={box.icon}>
							<div className="bg-zircon flex flex-column align-items-start h-full p-4 rounded-10 sm:p-8">
								<img src={boxesIcons[box.icon]} height="34" width="34" alt="" />
								<h4 className="h6 mt-4 mb-2">{box.title}</h4>
								<p className="m-0">{box.par}</p>
							</div>
						</div>
					))}
				</div>
			</Container>
			{l === "en" && (
				<Container tag="section" className="dooh_more">
					<DOOHMoreBanner className="mb-20" />
				</Container>
			)}
			<div className="features bg-zircon sm:py-18">
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
						<Img image={data.feature_campaign_planning.childImageSharp.gatsbyImageData} className="w-full" alt="" />
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
						<Img image={data.feature_content_network_management.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.staticOperations.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.staticOperations.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.staticOperations.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="staticOperations">
							{T.translate("features.staticOperations.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_static_campaigns.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse" wrapperClassName="bg-white sm:bg-transparent">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.globalProgrammaticSSP.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.globalProgrammaticSSP.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.globalProgrammaticSSP.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="globalProgrammaticSSP">
							{T.translate("features.globalProgrammaticSSP.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_global_programmatic_ssp.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.localSignageMessaging.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.localSignageMessaging.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.localSignageMessaging.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="localSignageMessaging">
							{T.translate("features.localSignageMessaging.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_local_signage_messaging.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse" wrapperClassName="bg-white sm:bg-transparent">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.audienceCampaigns.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.audienceCampaigns.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.audienceCampaigns.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="audienceCampaigns">
							{T.translate("features.audienceCampaigns.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_audience_campaigns.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
			</div>
			<AquariusSOC2CTABox className="pt-20 sm:py-32" />
			<AquariusMissionInNumbers className="mt-10 mb-12 sm:mb-32" />
			<div className="bg-zircon py-10 sm:py-25">
				<Container>
					<h2 className="h4 mb-10 sm:text-center sm:mb-15">{T.translate("plans.title")}</h2>
					<div className="grid">
						{T.texts.plans.boxes.map((box) => (
							<div className="col-12 mb-10 sm:col-4" key={box.title}>
								<div className="box flex flex-column h-full">
									<div className="bg-gradient-1 text-white text-16 font-bold px-5 py-4 mb-2 rounded-10 sm:text-20 sm:px-8">{box.title}</div>
									<div className="flex-auto bg-white text-ash text-16 line-height-180 px-5 py-3 rounded-10 sm:px-8 sm:py-6">
										{box.description}
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="flex sm:justify-content-center">
						<CTA className="bg-reflex text-white hover:bg-cerulean" to={`${route("plans")}?pi=broadsign-platform`}>
							{T.translate("plans.cta")}
						</CTA>
					</div>
				</Container>
			</div>
			<Container className="aquarius_shin pt-12 pb-12 sm:pt-16 sm:pb-22">
				<div className="inner rounded-xl px-5 py-6 sm:py-16">
					<h2 className="h4 text-white text-left mb-4 sm:text-center">{T.translate("shin.title")}</h2>
					<p className="text-white text-left mb-10 mx-auto sm:text-center">{T.translate("shin.par")}</p>
					<div className="flex flex-column align-items-start justify-content-center w-full sm:flex-row sm:flex-nowrap">
						<CTA
							onClick={() => setShowBookCallModal(true)}
							className="bg-white text-reflex border-1 border-white mb-4 sm:mb-0 sm:mr-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{T.translate("shin.ctaBookCall")}
						</CTA>
						<CTA
							to="plans"
							className="bg-transparent text-white border-1 border-white sm:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{T.translate("shin.ctaPricing")}
						</CTA>
					</div>
				</div>
			</Container>
			{showBookCallModal && (
				<Modal variant="form" className="theme_carolina" onClose={() => setShowBookCallModal(false)}>
					<h3 className="h4 text-reflex mb-8">{T.translate("shin.ctaBookCall")}</h3>
					<Form form="bookACall" campaign="bookACallAquarius" redirectUrl={routeWithUtmForm("thankYou", "book_a_call")} />
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
		feature_campaign_planning: file(relativePath: { eq: "pages/broadsign-platform/feature_campaign_planning.png" }) {
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
		feature_local_signage_messaging: file(relativePath: { eq: "pages/broadsign-platform/feature_local_signage_messaging.png" }) {
			...imgW500
		}
	}
`;
