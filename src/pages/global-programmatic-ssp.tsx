import React, { useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";
import route, { routeWithUtmForm } from "@route";

import { FeatureWrapper, FeatureOverTitle, FeatureTitle, FeaturePar } from "@components/Aquarius";
import CTA from "@components/CTA";
import Container from "@components/Container";
import FAQCollapse from "@components/FAQCollapse";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import LogosMarquee from "@components/LogosMarquee";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import NeonBox from "@components/NeonBox";
import Video from "@components/Video";

import faqs_data from "@assets/ids_aquarius_faqs.json";

import hero from "@img/pages/global-programmatic-ssp/hero.svg";
import feature_detailed_campaign_reporting from "@img/pages/global-programmatic-ssp/feature_detailed_campaign_reporting.svg";
import robot from "@img/pages/global-programmatic-ssp/robot.svg";

import logo_clear_channel from "@logos/clear_channel_reflex.svg";
import logo_ocean from "@logos/ocean_reflex.svg";
import logo_lamar from "@logos/lamar_reflex.svg";
import logo_global from "@logos/global_reflex.svg";
import logo_branded_cities from "@logos/branded_cities_reflex.svg";
import logo_pattison from "@logos/pattison_reflex.svg";

import logo_trade_desk from "@logos/the_trade_desk_reflex.svg";
import logo_outmoove from "@logos/outmoove_reflex.svg";
import logo_display_video_360 from "@logos/display_video_360_reflex.svg";
import logo_adomni from "@logos/adomni_reflex.svg";
import logo_yahoo from "@logos/yahoo_reflex.svg";

import "@sass/pages/global_programmatic_ssp.scss";

import type { BroadsignPageProps } from "@types";

export default function GlobalProgrammaticSSPPage({ pageContext: { l, dicoPath }, data }: BroadsignPageProps) {
	const [showBookCallModal, setShowBookCallModal] = useState(false);
	const [showHeaderBidderVideoModal, setShowHeaderBidderVideoModal] = useState(false);

	useDico(l, dicoPath);

	return (
		<Layout id="global_programmatic_ssp" className={clsx("theme_carolina")}>
			<div className="bg-zircon pt-10 pb-12 overflow-x-hidden md:pt-25">
				<Container tag="section">
					<div className="hero grid">
						<div className="col-12 sm:col-6 lg:col-5">
							<p className="subtitle-1 gradient font-medium m-0">{T.translate("hero.overtitle")}</p>
							<h1 className="text-reflex font-superbold line-height-100 mb-8">{T.translate("hero.title")}</h1>
							<p className="tagline text-reflex text-16 line-height-180 mb-10">{T.translate("hero.blurb")}</p>
							<div className="ctas flex flex-column md:flex-row">
								<CTA onClick={() => setShowBookCallModal(true)} className="primary w-full max-h-full mb-2 sm:w-auto sm:mr-2">
									{T.translate("hero.ctaBookCall")}
								</CTA>
								<CTA
									to={`${route("plans")}?pi=global-programmatic-ssp`}
									className="bg-transparent text-reflex border-reflex w-full max-h-full mb-2 px-6 md:w-auto md:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
									{T.translate("hero.ctaPricing")}
								</CTA>
							</div>
						</div>
						<div className="col-12 flex flex-center sm:col-6 lg:col-offset-1">
							<img className="hero_img" src={hero} height="350" width="350" loading="eager" alt="" />
						</div>
					</div>
				</Container>
				<Container tag="section" className="ai flex flex-wrap align-items-center justify-content-between mb-20 sm:justify-content-end">
					<p className="subtitle-1 gradient font-bold text-transform-none z-5">{T.translate("ai.title")}</p>
					<img className="robot z-4" src={robot} alt="" />
					<Video
						className="ai_video mr-0 z-1"
						VimeoID="1075717356"
						poster={data.ai_video_poster.childImageSharp.gatsbyImageData}
						playBtnStyle="full_reflex"
					/>
				</Container>
				<section className="partners text-center px-4">
					<p className="subtitle-1 gradient font-medium mx-auto mb-10 max-w-900">{T.translate("logos.title")}</p>
					<LogosMarquee logos={[logo_clear_channel, logo_ocean, logo_lamar, logo_global, logo_branded_cities, logo_pattison]} />
				</section>
			</div>
			<div className="features">
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.programmatic_header_bidder.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.programmatic_header_bidder.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.programmatic_header_bidder.par")}</FeaturePar>
						<CTA className="primary mt-6 mb-8 sm:mb-0" onClick={() => setShowHeaderBidderVideoModal(true)}>
							{T.translate("features.programmatic_header_bidder.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_programmatic_header_bidder.childImageSharp.gatsbyImageData} className="" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.brand_safety.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.brand_safety.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.brand_safety.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_brand_safety.childImageSharp.gatsbyImageData} className="" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.detailed_campaign_reporting.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.detailed_campaign_reporting.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.detailed_campaign_reporting.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_detailed_campaign_reporting} alt="" height="420" width="500" loading="lazy" className="w-full" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.global_programmatic_network.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.global_programmatic_network.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.global_programmatic_network.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_global_programmatic_network.childImageSharp.gatsbyImageData} className="" alt="" />
					</div>
				</FeatureWrapper>
			</div>
			<Container className="dsp_partners my-10 sm:mt-14 sm:mb-15">
				<NeonBox innerClassName="flex flex-column align-items-start px-4 py-8 rounded-xl sm:align-items-center sm:py-15">
					<h2 className="text-24 text-transform-none mb-4 sm:text-34 max-w-900 sm:text-center sm:mx-auto sm:mb-8">
						{T.translate("dsp_partners.title")}
					</h2>
					<p className="text-reflex mb-4 sm:text-center max-w-900 sm:mx-auto sm:mb-8">{T.translate("dsp_partners.par")}</p>
					<div className="logos flex flex-wrap justify-content-between mb-10 max-w-900 ">
						<img src={logo_trade_desk} className="logo" alt="" />
						<img src={logo_outmoove} className="logo" alt="" />
						<img src={logo_display_video_360} className="logo" alt="" />
						<img src={logo_adomni} className="logo" alt="" />
						<img src={logo_yahoo} className="logo" alt="" />
					</div>
					<CTA to="dspPartners" className="primary wrap mx-auto">
						{T.translate("dsp_partners.cta")}
					</CTA>
				</NeonBox>
			</Container>
			<Container tag="section" className="faq">
				<h3 className="h4 text-transform-none">{T.translate("faq.title")}</h3>
				{T.texts.faq.list.map(({ id, q, a }) => (
					<FAQCollapse q={q} a={a} borders="ash" dataQ={faqs_data[id]} key={id} />
				))}
			</Container>
			<Container className="aquarius_shin pt-12 pb-12 sm:pt-16 sm:pb-22">
				<div className="inner rounded-xl px-5 py-8">
					<h2 className="h4 text-white text-left mb-4 sm:text-center">{T.translate("shin.title")}</h2>
					<p className="text-white text-left mb-10 mx-auto sm:text-center">{T.translate("shin.par")}</p>
					<div className="flex flex-wrap align-items-center justify-content-center w-full">
						<CTA
							onClick={() => setShowBookCallModal(true)}
							preset="primary-outline"
							hoverPreset="full-cerulean"
							className="border-transparent border-white mb-4 mr-4 sm:mb-0">
							{T.translate("shin.ctaBookCall")}
						</CTA>
						<CTA to={`${route("plans")}?pi=global-programmatic-ssp`} preset="white-outline-transparent" hoverPreset="full-cerulean" className="">
							{T.translate("shin.ctaPricing")}
						</CTA>
					</div>
				</div>
			</Container>
			{showBookCallModal && (
				<Modal variant="form" className="theme_carolina narrow" onClose={() => setShowBookCallModal(false)}>
					<h3 className="h4 text-reflex mb-8">{T.translate("shin.ctaBookCall")}</h3>
					<Form form="bookACall" campaign="bookACallAquarius" submitText="Book a Call" redirectUrl={routeWithUtmForm("thankYou", "book_a_call")} />
				</Modal>
			)}
			{showHeaderBidderVideoModal && (
				<Modal variant="video" className="theme_carolina" onClose={() => setShowHeaderBidderVideoModal(false)}>
					<Video VimeoID="1003304693" />
				</Modal>
			)}
		</Layout>
	);
}

export const queryIndex = graphql`
	query {
		ai_video_poster: file(relativePath: { eq: "pages/global-programmatic-ssp/ai_video_poster.jpg" }) {
			...img
		}
		feature_brand_safety: file(relativePath: { eq: "pages/global-programmatic-ssp/feature_brand_safety.png" }) {
			...img
		}
		feature_programmatic_header_bidder: file(relativePath: { eq: "pages/global-programmatic-ssp/feature_programmatic_header_bidder.png" }) {
			...img
		}
		feature_global_programmatic_network: file(relativePath: { eq: "pages/global-programmatic-ssp/feature_global_programmatic_network.png" }) {
			...img
		}
	}
`;
