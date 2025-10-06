import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { routeWithUtmForm } from "@route";
import clsx from "clsx";

import Campaigns from "@components/App__Carousel_CaseStudies";
import Container from "@components/Container";
import CTA from "@components/CTA";
import FAQCollapse from "@components/FAQCollapse";
import Form from "@components/Form";
import GradientBox from "@components/GradientBox";
import Features from "@components/OutMoove__Features";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import LogosMarquee from "@components/LogosMarquee";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";

import logo_outmoove from "@img/pages/outmoove/outmoove.svg";
import roi from "@img/pages/outmoove/roi.svg";
import icon_budget from "@img/pages/outmoove/icon_budget.svg";
import icon_audience from "@img/pages/outmoove/icon_audience.svg";
import icon_global from "@img/pages/outmoove/icon_global.svg";
import icon_proof from "@img/pages/outmoove/icon_proof.svg";

import logo_haworth from "@logos/haworth_reflex.svg";
import logo_hp from "@logos/hp_reflex.svg";
import logo_publicis from "@logos/publicis_reflex.svg";
import logo_talon from "@logos/talon_reflex.svg";
import logo_ubereats from "@logos/ubereats_reflex.svg";
import logo_wppmedia from "@logos/wppmedia_reflex.svg";

import video_hero_hd from "@videos/outmoove/hero_hd.mp4";
import video_hero_sm from "@videos/outmoove/hero_sm.mp4";

import faqs_data from "@assets/ids_aquarius_faqs.json";

import "@sass/pages/outmoove.scss";

export default function OutMoove({ pageContext: { l, dicoPath }, data }) {
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);

	useDico(l, dicoPath);

	const roiIcons = {
		budget: icon_budget,
		audience: icon_audience,
		global: icon_global,
		proof: icon_proof,
	};

	const roiItems = T.texts.roi.list.map((item) => ({ ...item, icon: roiIcons[item.id] }));

	const faq = T.texts.faq.list;

	return (
		<Layout id="outmoove" className="theme_carolina">
			<Container tag="section" className="hero mt-12 mb-12 sm:mb-6">
				<div className="grid">
					<div className="col-12 sm:col-6 md:col-5">
						<h1 className="subtitle-1 gradient font-medium mb-4">{T.translate("hero.title")}</h1>
						<img className="hero_outmoove_logo block mb-8" src={logo_outmoove} alt="" />
						<p className="line-height-180 mb-12">{T.translate("hero.par")}</p>
						<CTA className="primary" onClick={() => setShowTalkToASpecialistModal(true)}>
							{T.translate("hero.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6 md:col-7">
						<video className="hero_video w-full rounded-xl mt-12 sm:mt-0" autoPlay muted loop>
							<source src={video_hero_hd} type="video/mp4"></source>
							<source src={video_hero_sm} type="video/mp4"></source>
							<Img image={data.hero.childImageSharp.gatsbyImageData} className="my-10 sm:m-0" alt="" />
						</video>
					</div>
				</div>
			</Container>
			<Container tag="section" className="brands text-center">
				<p className="subtitle-1 gradient font-medium mb-6">{T.translate("brands.title")}</p>
			</Container>
			<LogosMarquee logos={[logo_wppmedia, logo_ubereats, logo_publicis, logo_haworth, logo_talon, logo_hp]} logoSpacing={100} logoSize={40} />
			<Container tag="section" className="roi my-20">
				<h2 className="text-30 mb-8 text-transform-none text-center sm:text-34">{T.translate("roi.title")}</h2>
				<div className="grid">
					<div className="col-12 sm:col-8 sm:flex-order-2">
						<div className="flex flex-column justify-content-between h-full pb-1">
							{roiItems.map(({ id, title, par, icon }, k) => (
								<React.Fragment key={k}>
									<div className={clsx("item pb-5", { "pt-5": k !== 0 })}>
										<img className="icon" src={icon} alt="" />
										<h3 className="text-20 text-transform-none mb-2 md:text-24">{title}</h3>
										<p className="line-height-180 m-0">{par}</p>
									</div>
									<hr />
								</React.Fragment>
							))}
						</div>
					</div>
					<div className="col-12 sm:col-4 sm:flex-order-1">
						<div className="roi_wrapper flex flex-center p-5 h-full w-full rounded-xl">
							<img className="roi_main_img w-full" src={roi} alt="" />
						</div>
					</div>
				</div>
			</Container>
			<Container tag="section" className="features mb-20">
				<h2 className="text-30 mb-8 text-transform-none text-center sm:text-34">{T.translate("features.title")}</h2>
				<Features />
			</Container>
			<Container tag="section" className="discover_box mb-20">
				<GradientBox variant="text_cta" cta={{ label: T.translate("ctaBox.cta"), onClick: () => setShowTalkToASpecialistModal(true) }}>
					<p className="text-white text-16 letter-spacing-5 uppercase mb-0">{T.translate("ctaBox.overtitle")}</p>
					<h2 className="text-white text-22 font-bold text-transform-none mb-2 sm:text-30 md:text-34">
						<span className="inline-block">{T.translate("ctaBox.title.0")}</span>{" "}
						<span className="inline-block">{T.translate("ctaBox.title.1")}</span>
					</h2>
					<p className="text-white m-0">{T.translate("ctaBox.par")}</p>
				</GradientBox>
			</Container>
			<Container tag="section" className="campaigns mb-12">
				<Campaigns
					campaigns={["ubereats"]}
					overtitle={T.translate("outmooveCampaigns")}
					cta={T.translate("readCaseStudy")}
					bg="white"
					showProps={["objective", "targetStrategy", "results"]}
					showLocationProps={false}
				/>
			</Container>
			<Container tag="section" className="faq mb-16">
				<h3 className="h4 text-transform-none">{T.translate("faq.title")}</h3>
				{faq.map(({ id, q, a }) => (
					<FAQCollapse q={q} a={a} borders="ash" dataQ={faqs_data[id]} key={id} />
				))}
			</Container>
			<Container tag="section" className="shin mb-16">
				<GradientBox variant="text_cta" cta={{ label: T.translate("shin.cta"), onClick: () => setShowTalkToASpecialistModal(true) }}>
					<h2 className="text-white text-30 font-bold text-transform-none mb-2 sm:text-34">{T.translate("shin.title")}</h2>
					<p className="text-white m-0">{T.translate("shin.par")}</p>
				</GradientBox>
			</Container>
			<Modal show={showTalkToASpecialistModal} variant="form" className="theme_carolina narrow" onClose={() => setShowTalkToASpecialistModal(false)}>
				<h3 className="text-30 text-left text-transform-none mb-4 w-full sm:text-34">{T.translate("hero.cta")}</h3>
				<Form form="talkToASpecialist" submitText="Get in touch" redirectUrl={routeWithUtmForm("thankYou", "talk_to_a_media_specialist")} />
			</Modal>
		</Layout>
	);
}

export const query = graphql`
	query {
		hero: file(relativePath: { eq: "pages/outmoove/hero.png" }) {
			...img
		}
	}
`;
