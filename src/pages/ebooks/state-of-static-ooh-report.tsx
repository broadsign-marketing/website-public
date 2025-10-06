import React, { useCallback, useEffect, useMemo, useRef, useState, MutableRefObject } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";
import cookie from "react-cookies";

import Carousel from "@components/BroadsignAdsCarousel";
import Container from "@components/Container";
import CTA from "@components/CTA";
import Form, { getFormID } from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import TextMarquee from "@components/TextMarquee";

import arrow_down from "@img/pages/state-of-static-ooh-report/arrow_down.svg";
import green_check from "@img/pages/thank-you/check_circle_green.svg";

import "@sass/pages/state_of_static_ooh_report.scss";

export default function StateOfStaticOOHReport({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [showEBookModal, setShowEBookModal] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	useDico(l, dicoPath);

	const heroInfos = T.texts?.hero?.data || [];
	const introPars = T.texts?.intro?.pars || [];
	const stats = useMemo(() => T.texts?.stats || [], []);

	const handleFormSubmit = useCallback(() => {
		setIsFormSubmitted(true);

		if (typeof window !== "undefined") {
			window.open(T.translate("ebookLink"), "_blank");
		}
	}, []);

	useEffect(() => {
		const reportFormID = getFormID("stateOfStaticOOHReport");
		// Current form
		if (cookie.load(`submitted-form-${reportFormID}`)) {
			setIsFormSubmitted(true);
		}

		// Early Access form
		if (cookie.load("submitted-form-8ec55d49-4b5d-4ba8-be8e-c3f681fe5609")) {
			setIsFormSubmitted(true);
		}
	}, []);

	return (
		<Layout id="state_of_static_ooh_report" className="theme_carolina">
			<section className="hero pt-16">
				<div className="block">
					<Img image={data[`hero_${l}`].childImageSharp.gatsbyImageData} className="hero_img" objectFit="contain" alt="" />
					<div className="text_marquee_wrapper">
						<Container className="hidden sm:block">
							<p className="overtitle subtitle-1 gradient font-medium relative m-0 z-2">{T.translate("hero.overtitle")}</p>
						</Container>
						<TextMarquee speed="10000">{T.translate("hero.title")}</TextMarquee>
					</div>
				</div>
				<div className="block text-center mx-auto mt-6 sm:hidden">
					<p className="overtitle subtitle-1 gradient font-medium z-2">{T.translate("hero.overtitle")}</p>
				</div>
				<Container>
					<p className="stats text-reflex text-16 font-bold mt-2">
						{heroInfos.map((item, k) => (
							<span className="inline-block" key={k}>
								{item}
							</span>
						))}
					</p>
					<p className="text-center mt-12 mb-0">
						<button className="down_arrow div" onClick={() => scrollTo("intro")}>
							<img src={arrow_down} alt="" />
						</button>
					</p>
				</Container>
			</section>
			<section id="intro" className="intro pt-20 pb-20 sm:pb-40">
				<Container>
					<div className="grid">
						<div className="col-12 hidden sm:block sm:col-6">
							<div className="sm:pr-4">
								<Img image={data[`map_${l}`].childImageSharp.gatsbyImageData} className="img_map" alt="" />
							</div>
						</div>
						<div className="col-12 sm:col-6">
							<p className="line-height-180">{introPars[0]}</p>
							<Img image={data[`map_${l}`].childImageSharp.gatsbyImageData} className="w-full my-12 sm:hidden" alt="" />
							<p className="line-height-180 mb-8">{introPars[1]}</p>
							{isFormSubmitted ? (
								<CTA className="primary mt-4" target="_blank" to={T.translate("ebookLink")}>
									{T.translate("intro.cta")}
								</CTA>
							) : (
								<CTA className="primary mt-4" onClick={() => setShowEBookModal(true)}>
									{T.translate("intro.cta")}
								</CTA>
							)}
						</div>
					</div>
				</Container>
			</section>
			<section className="stats pb-10 sm:pb-0">
				<Carousel loop={{ auto: true, duration: 6000 }} bg="white" className="">
					{stats.map((stat, k) => (
						<div className="stat mx-auto sm:mb-6" key={k}>
							<Img image={data[`stat_${stat.id}_${l}`].childImageSharp.gatsbyImageData} className="stat_img mb-4 w-full sm:mb-10" alt="" />
							<div className="grid">
								<div className="col-12 flex align-items-center py-0 sm:col-4">
									<p className="stat_number text-reflex font-black my-3 sm:my-0">{stat.number}</p>
								</div>
								<div className="col-12 flex align-items-center py-0 sm:col-8">
									<p className="stat_desc subtitle-1 gradient font-black line-height-140 text-transform-none m-0 sm:text-20">{stat.desc}</p>
								</div>
							</div>
						</div>
					))}
				</Carousel>
			</section>
			<section className="learnMore pb-20 sm:pt-10">
				<Container>
					<div className="gradient_border">
						<div className="inner bg-zircon p-4 sm:px-8 sm:py-10">
							<Img image={data[`report_screenshot_${l}`].childImageSharp.gatsbyImageData} className="report_screenshot" alt="" />
							<div className="w-12 sm:w-6">
								<h2 className="text-24 text-transform-none mb-6 sm:text-34">{T.translate("readMore.title")}</h2>
								<p className="text-16 mb-8 sm:mb-4">{T.translate("readMore.par")}</p>
								{isFormSubmitted ? (
									<CTA className="primary" target="_blank" to={T.translate("ebookLink")}>
										{T.translate("readMore.cta")}
									</CTA>
								) : (
									<CTA className="primary" onClick={() => setShowEBookModal(true)}>
										{T.translate("readMore.cta")}
									</CTA>
								)}
							</div>
						</div>
					</div>
				</Container>
			</section>
			<Modal show={showEBookModal} variant="form" className="theme_carolina narrow" onClose={() => setShowEBookModal(false)}>
				{isFormSubmitted ? (
					<div className="state_of_static_report_thank_you m-auto flex flex-column align-items-center">
						<img className="green_check mb-10" src={green_check} alt="" />
						<Link className="link_cerulean_arrow text-24 line-height-140 text-cerulean font-bold" to={T.translate("ebookLink")}>
							{T.translate("thankYou.cta")}
						</Link>
					</div>
				) : (
					<div>
						<p className="text-20 text-reflex font-bold mb-8">{T.translate("readMore.par")}</p>
						<Form form="stateOfStaticOOHReport" submitText="Download now" onSubmit={() => handleFormSubmit()} />
					</div>
				)}
			</Modal>
		</Layout>
	);
}

export const query = graphql`
	query {
		hero_en: file(relativePath: { eq: "pages/state-of-static-ooh-report/hero_en.png" }) {
			...img
		}
		map_en: file(relativePath: { eq: "pages/state-of-static-ooh-report/map_en.png" }) {
			...img
		}

		stat_real_time_en: file(relativePath: { eq: "pages/state-of-static-ooh-report/stat_real_time_en.png" }) {
			...img
		}
		stat_targeting_en: file(relativePath: { eq: "pages/state-of-static-ooh-report/stat_targeting_en.png" }) {
			...img
		}
		stat_carbon_en: file(relativePath: { eq: "pages/state-of-static-ooh-report/stat_carbon_en.png" }) {
			...img
		}

		report_screenshot_en: file(relativePath: { eq: "pages/state-of-static-ooh-report/report_screenshot_en.png" }) {
			...img
		}

		hero_fr: file(relativePath: { eq: "pages/state-of-static-ooh-report/hero_fr.png" }) {
			...img
		}
		map_fr: file(relativePath: { eq: "pages/state-of-static-ooh-report/map_fr.png" }) {
			...img
		}

		stat_real_time_fr: file(relativePath: { eq: "pages/state-of-static-ooh-report/stat_real_time_fr.png" }) {
			...img
		}
		stat_targeting_fr: file(relativePath: { eq: "pages/state-of-static-ooh-report/stat_targeting_fr.png" }) {
			...img
		}
		stat_carbon_fr: file(relativePath: { eq: "pages/state-of-static-ooh-report/stat_carbon_fr.png" }) {
			...img
		}

		report_screenshot_fr: file(relativePath: { eq: "pages/state-of-static-ooh-report/report_screenshot_fr.png" }) {
			...img
		}

		hero_es: file(relativePath: { eq: "pages/state-of-static-ooh-report/hero_es.png" }) {
			...img
		}
		map_es: file(relativePath: { eq: "pages/state-of-static-ooh-report/map_es.png" }) {
			...img
		}

		stat_real_time_es: file(relativePath: { eq: "pages/state-of-static-ooh-report/stat_real_time_es.png" }) {
			...img
		}
		stat_targeting_es: file(relativePath: { eq: "pages/state-of-static-ooh-report/stat_targeting_es.png" }) {
			...img
		}
		stat_carbon_es: file(relativePath: { eq: "pages/state-of-static-ooh-report/stat_carbon_es.png" }) {
			...img
		}

		report_screenshot_es: file(relativePath: { eq: "pages/state-of-static-ooh-report/report_screenshot_es.png" }) {
			...img
		}
	}
`;
