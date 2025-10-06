import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";
import clsx from "clsx";
import route, { routeWithUtmForm } from "@route";

import { FeatureWrapper, FeatureOverTitle, FeatureTitle, FeaturePar, ComingSoonTag } from "@components/Aquarius";
import CTA from "@components/CTA";
import Container from "@components/Container";
import DOOHMoreBanner from "@components/DOOHMoreBanner";
import Form from "@components/Form";
import FAQCollapse from "@components/FAQCollapse";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import LogosMarquee from "@components/LogosMarquee";
import Modal from "@components/Modal";
import Video from "@components/Video";

import faqs_data from "@assets/ids_aquarius_faqs.json";

import hero from "@img/pages/campaign-planning/hero.svg";
import feature_inventory from "@img/pages/campaign-planning/feature_inventory.svg";
import feature_flexibility from "@img/pages/campaign-planning/feature_flexibility.svg";
import feature_rebalancing from "@img/pages/campaign-planning/feature_rebalancing.svg";

import play_btn from "@img/controls/play_btn_semisolid_white.svg";

import logo_intersection from "@logos/intersection_reflex.svg";
import logo_quebecor from "@logos/quebecor_reflex.svg";
import logo_outedge from "@logos/outedge_reflex.png";
import logo_clear_channel from "@logos/clear_channel_reflex.svg";

import icon_people from "@img/pages/campaign-planning/icon_people.svg";
import icon_report from "@img/pages/campaign-planning/icon_report.svg";
import icon_screen from "@img/pages/campaign-planning/icon_screen.svg";
import icon_list from "@img/pages/campaign-planning/icon_list.svg";

import "@sass/pages/campaign_planning_ad_serving.scss";

export default function campaignPlanningPage({ pageContext: { l, dicoPath }, location: { state }, data }) {
	const [showBookCallModal, setShowBookCallModal] = useState(false);
	const [showVideoModal, setShowVideoModal] = useState(false);

	useDico(l, dicoPath);

	useEffect(() => {
		if (typeof document !== "undefined") {
			const videoLink = document.querySelector("#broadsign_direct_video_link");
			if (videoLink) {
				videoLink.addEventListener("click", () => setShowVideoModal(true));
			}
		}
	}, []);

	const icons = {
		list: icon_list,
		people: icon_people,
		report: icon_report,
		screen: icon_screen,
	};

	const campaignTypes = T.texts.features.campaigns.types;
	const list_lattice = T.texts.lattice.boxes;

	useEffect(() => {
		if (state?.scrollTo) {
			scrollTo(state.scrollTo);
		}
	}, [state]);

	return (
		<Layout id="campaign_planning_ad_serving" className={clsx("theme_carolina")}>
			<div className="bg-zircon pt-10 pb-12 overflow-x-hidden md:pt-25">
				<Container>
					<div className="hero grid">
						<div className="col-12 sm:col-6 lg:col-5">
							<p className="subtitle-1 gradient font-medium m-0">{T.translate("hero.overtitle")}</p>
							<h1 className="text-reflex font-superbold line-height-100 mb-8">{T.translate("hero.title")}</h1>
							<p className="tagline text-ash text-16 line-height-180 mb-10">{T.translate("hero.blurb")}</p>
							<div className="ctas flex flex-column md:flex-row">
								<CTA onClick={() => setShowBookCallModal(true)} className="primary w-full max-h-full mb-2 sm:w-auto sm:mr-2">
									{T.translate("hero.ctaBookCall")}
								</CTA>
								<CTA
									to={`${route("plans")}?pi=campaign-planning`}
									className="bg-transparent text-reflex border-reflex w-full max-h-full mb-2 px-6 md:w-auto md:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
									{T.translate("hero.ctaPricing")}
								</CTA>
							</div>
						</div>
						<div className="col-12 flex flex-center mt-10 sm:col-6 sm:mt-0 lg:col-offset-1">
							<img src={hero} alt="" height="420" width="500" loading="eager" className="w-full" />
						</div>
					</div>
				</Container>
				<Container className="text-center mt-12">
					<p className="subtitle-1 gradient font-medium mx-auto mb-10">{T.translate("logos.title")}</p>
				</Container>
				<LogosMarquee logos={[logo_intersection, logo_quebecor, logo_outedge, logo_clear_channel]} speed={20} />
			</div>
			<div className="features">
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.inventory.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.inventory.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.inventory.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_inventory} alt="" height="420" width="500" loading="lazy" className="w-full" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.flexibility.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.flexibility.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.flexibility.par")}</FeaturePar>
						<p className="text-reflex text-16 font-bold line-height-180 mt-6 mb-1">{T.translate("features.campaigns.subtitle")}</p>
						<p className="has_dots inline-flex align-items-center flex-wrap text-reflex text-16 line-height-180 mt-0 mb-8 sm:mb-0">
							{campaignTypes.map((type, k) => {
								return (
									<span className="inline-flex flex-nowrap align-items-center line-height-180" key={k}>
										{type} {k < campaignTypes.length - 1 ? <em>•</em> : null}
									</span>
								);
							})}
						</p>
						<CTA
							className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean"
							to="/blog/how-to-create-more-revenue-opportunities-with-broadsigns-flexible-campaign-types">
							{T.translate("features.flexibility.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_flexibility} alt="" height="420" width="500" loading="lazy" className="w-full" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.reallocation.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.reallocation.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.reallocation.par")}</FeaturePar>
						<CTA
							className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean"
							to="/blog/getting-the-most-out-of-your-dooh-inventory-introducing-the-optimization-engine-for-broadsign-direct">
							{T.translate("features.reallocation.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<button className="video_poster div w-full flex flex-center rounded-xl" onClick={() => setShowVideoModal(true)}>
							<div className="video_poster_play_btn full_center z-5">
								<img src={play_btn} className="" alt="" />
							</div>
							<Img
								image={data.video_poster.childImageSharp.gatsbyImageData}
								className="w-full rounded-xl overflow-hidden video_poster_img"
								alt=""
							/>
						</button>
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.rebalancing.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.rebalancing.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.rebalancing.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_rebalancing} alt="" height="420" width="500" loading="lazy" className="w-full" />
					</div>
				</FeatureWrapper>
			</div>
			{l === "en" && (
				<Container tag="section" className="dooh_more">
					<DOOHMoreBanner className="mt-10" />
				</Container>
			)}
			<div className="faq pt-10 pb-14 sm:pt-20">
				<Container>
					<h3 className="h4 text-transform-none">{T.translate("faq.title")}</h3>
					{T.texts.faq.list.map(({ id, track, q, a }) => (
						<FAQCollapse q={q} a={a} borders="ash" dataQ={faqs_data[id]} key={id} />
					))}
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
							to={`${route("plans")}?pi=campaign-planning`}
							className="bg-transparent text-white border-1 border-white sm:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{T.translate("shin.ctaPricing")}
						</CTA>
					</div>
				</div>
			</Container>
			<Modal show={showVideoModal} variant="video" onClose={() => setShowVideoModal(false)}>
				<Video YoutubeID="Zx7BDPwXzbM" poster={data.video_poster.childImageSharp.gatsbyImageData} />
			</Modal>
			{showBookCallModal && (
				<Modal variant="form" className="theme_carolina" onClose={() => setShowBookCallModal(false)}>
					<h3 className="h4 text-reflex mb-8">{T.translate("shin.ctaBookCall")}</h3>
					<Form form="bookACall" campaign="bookACallAquarius" submitText="Book a Call" redirectUrl={routeWithUtmForm("thankYou", "book_a_call")} />
				</Modal>
			)}
		</Layout>
	);
}

export const subscribeImg = graphql`
	query {
		audience_campaigns: file(relativePath: { eq: "pages/campaign-planning/audience_campaigns.png" }) {
			childImageSharp {
				gatsbyImageData(width: 496)
			}
		}
		video_poster: file(relativePath: { eq: "pages/campaign-planning/video_poster_optimization_engine.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
