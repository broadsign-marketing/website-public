import React, { useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";
import route, { routeWithUtmForm } from "@route";

import { FeatureWrapper, FeatureOverTitle, FeatureTitle, FeaturePar, ShinCTA } from "@components/Aquarius";
import CTA from "@components/CTA";
import Container from "@components/Container";
import FAQCollapse from "@components/FAQCollapse";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import LogosMarquee from "@components/LogosMarquee";
import Modal from "@components/Modal";
import Video from "@components/Video";

import faqs_data from "@assets/ids_aquarius_faqs.json";

import logo_outedge from "@logos/outedge_reflex.png";
import logo_vgi from "@logos/vgi_reflex.svg";
import logo_bmedia from "@logos/bmedia_reflex.svg";
import logo_mop from "@logos/mop_reflex.svg";
import logo_fc_media from "@logos/fc_media_reflex.svg";
import logo_clear_channel from "@logos/clear_channel_reflex.svg";

import "@sass/pages/static_campaigns.scss";

export default function StaticOperationsPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [showBookCallModal, setShowBookCallModal] = useState(false);
	const [showVideoModal, setShowVideoModal] = useState(false);

	useDico(l, dicoPath);

	return (
		<Layout id="static_campaigns" className={clsx("theme_carolina")}>
			<div className="bg-zircon pt-10 pb-20 overflow-x-hidden md:pt-25 md:pb-30">
				<Container>
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
									to={`${route("plans")}?pi=static-campaigns`}
									className="bg-transparent text-reflex border-reflex w-full max-h-full mb-2 px-6 md:w-auto md:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
									{T.translate("hero.ctaPricing")}
								</CTA>
							</div>
						</div>
						<div className="col-12 flex flex-center mt-10 sm:col-6 sm:mt-0 lg:col-offset-1">
							<Img image={data.hero.childImageSharp.gatsbyImageData} alt="" width="500" loading="eager" objectFit="contain" />
						</div>
					</div>
				</Container>
				<Container className="text-center mt-12">
					<p className="subtitle-1 gradient font-medium mx-auto mb-10">{T.translate("logos.title")}</p>
				</Container>
				<LogosMarquee logos={[logo_outedge, logo_vgi, logo_bmedia, logo_mop, logo_fc_media, logo_clear_channel]} />
				<Container className="mt-25" id="static_video">
					<Video
						sources={["modern_approach_to_static_ooh_1080p.mp4", "modern_approach_to_static_ooh_720p.mp4"]}
						poster={data.video_poster.childImageSharp.gatsbyImageData}
						playBtnStyle="gradient_blue"
					/>
				</Container>
			</div>
			<div className="features">
				<FeatureWrapper>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.charting_scheduling.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.charting_scheduling.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.charting_scheduling.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_charting_scheduling.childImageSharp.gatsbyImageData} alt="" width="500" loading="lazy" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.operations_work_order_management.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.operations_work_order_management.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.operations_work_order_management.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_operations_work_order_management.childImageSharp.gatsbyImageData} alt="" width="500" loading="lazy" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.copy_management.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.copy_management.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.copy_management.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 hover:bg-cerulean" onClick={() => setShowVideoModal(true)}>
							{T.translate("features.copy_management.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_copy_management.childImageSharp.gatsbyImageData} alt="" width="500" loading="lazy" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.reporting_pop.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.reporting_pop.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.reporting_pop.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_reporting_pop.childImageSharp.gatsbyImageData} alt="" width="500" loading="lazy" />
					</div>
				</FeatureWrapper>
			</div>
			<div className="faq bg-zircon pt-10 pb-14 sm:py-30">
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
							to={`${route("plans")}?pi=static-campaigns`}
							className="bg-transparent text-white border-1 border-white sm:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{T.translate("shin.ctaPricing")}
						</CTA>
					</div>
				</div>
			</Container>
			<Modal show={showVideoModal} variant="video" onClose={() => setShowVideoModal(false)}>
				<Video
					sources={["static_campaigns_copy_management.mp4"]}
					playBtnStyle="gradient_blue"
					poster={data.video_poster_copy_management.childImageSharp.gatsbyImageData}
				/>
			</Modal>
			<Modal show={showBookCallModal} variant="form" className="theme_carolina" onClose={() => setShowBookCallModal(false)}>
				<h3 className="h4 text-reflex mb-8">{T.translate("shin.ctaBookCall")}</h3>
				<Form form="bookACall" campaign="siriusLaunch" submitText="Book a Call" redirectUrl={routeWithUtmForm("thankYou", "book_a_call")} />
			</Modal>
		</Layout>
	);
}

export const subscribeImg = graphql`
	query {
		hero: file(relativePath: { eq: "pages/static-campaigns/hero.png" }) {
			...imgW500
		}
		feature_charting_scheduling: file(relativePath: { eq: "pages/static-campaigns/feature_charting_scheduling.png" }) {
			...imgW500
		}
		feature_operations_work_order_management: file(relativePath: { eq: "pages/static-campaigns/feature_operations_work_order_management.png" }) {
			...imgW500
		}
		feature_copy_management: file(relativePath: { eq: "pages/static-campaigns/feature_copy_management.png" }) {
			...imgW500
		}
		feature_reporting_pop: file(relativePath: { eq: "pages/static-campaigns/feature_reporting_pop.png" }) {
			...imgW500
		}

		video_poster: file(relativePath: { eq: "pages/static-campaigns/video_poster.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		video_poster_copy_management: file(relativePath: { eq: "pages/static-campaigns/video_poster_copy_management.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
