import React, { useEffect, useMemo, useRef, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { routeWithUtmForm } from "@route";

import CTA from "@components/CTA";
import Container from "@components/Container";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Form from "@components/Form";
import Layout from "@components/layout";
import Modal from "@components/Modal";

import hero_title from "@img/pages/partners/zitcha/title.svg";
import hero_people from "@img/pages/partners/zitcha/hero_people.svg";

import icon_campaign from "@img/pages/partners/zitcha/icon_campaign.svg";
import icon_feedback from "@img/pages/partners/zitcha/icon_feedback.svg";
import icon_search from "@img/pages/partners/zitcha/icon_search.svg";
import icon_support_agent from "@img/pages/partners/zitcha/icon_support_agent.svg";

import "@sass/pages/partners_zitcha.scss";

export default function PartnersZitcha({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [screenSize, setScreenSize] = useState("unset");
	const [showBookACallModal, setShowBookACallModal] = useState(false);

	useDico(l, dicoPath);

	useEffect(() => {
		function handleResize() {
			const viewportWidth = window.innerWidth;
			let bgPosX;

			if (viewportWidth < 600) {
				bgPosX = "80%";
			} else if (viewportWidth >= 1600) {
				bgPosX = "-300px";
			} else {
				const slope = (-300 + 120) / (1600 - 600);
				const intercept = -120 - slope * 600;
				bgPosX = slope * viewportWidth + intercept + "px";
			}

			if (viewportWidth < 600) {
				if (screenSize !== "xs") {
					setScreenSize("xs");
				}
			} else {
				if (screenSize !== "lg") {
					setScreenSize("lg");
				}
			}

			document.documentElement.style.setProperty("--bg-posx", bgPosX);
		}

		window.addEventListener("resize", handleResize, { passive: true });

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, [screenSize]);

	return (
		<Layout id="partners_zitcha" className="theme_carolina pb-16">
			{screenSize === "unset" && <section className="hero empty"></section>}
			{screenSize === "lg" && (
				<section className="hero flex align-items-center mb-25">
					<Container>
						<div className="hero_content flex flex-column align-items-start justify-content-center h-full">
							<h1 alt="Broadsign x Zitcha" className="mb-10">
								<img className="hero_title" src={hero_title} alt="Broadsign x Zitcha" />
							</h1>
							<p className="blurb text-white font-bold">{T.translate("hero.title")}</p>
							<CTA preset="primary-outline" hoverPreset="full-cerulean" className="wrap" onClick={() => setShowBookACallModal(true)}>
								Request Your Free Retailer Consultation
							</CTA>
						</div>
					</Container>
					<img className="hero_people" src={hero_people} alt="Shoppers" title="Hi there!" />
				</section>
			)}
			{screenSize === "xs" && (
				<section className="hero">
					<h1 alt="Broadsign x Zitcha" className="mb-4">
						<Img image={data.heroMobile.childImageSharp.gatsbyImageData} alt="Broadsign x Zitcha" />
					</h1>
				</section>
			)}
			<Container className="block sm:hidden">
				<p className="text-reflex text-24 font-bold line-height-160 mb-6">{T.translate("hero.title")}</p>
				<p className="text-ash text-16 line-height-180 mb-8">{T.translate("hero.blurb")}</p>
				<CTA preset="primary" hoverPreset="full-cerulean" className="wrap" onClick={() => setShowBookACallModal(true)}>
					Request Your Free Retailer Consultation
				</CTA>
			</Container>
			<Container tag="section" className="enable mb-10 sm:mb-20">
				{screenSize === "lg" && (
					<div className="grid">
						<div className="col-12 sm:col-8 md:col-7 lg:col-6">
							<p className="text-ash text-16 line-height-180 m-0">{T.translate("hero.blurb")}</p>
						</div>
					</div>
				)}
				<h2 className="text-24 text-center text-transform-none mt-16 mb-12 sm:text-34">In-store retail media enables advertisers to:</h2>
				<div className="grid">
					<div className="col-12 sm:col-4">
						<div className="bg-zircon h-full rounded-xl px-6 py-5">
							<img src={icon_campaign} alt="" />
							<p className="text-reflex text-20 font-bold">Extend their reach and compensate for the decline in linear TV advertising</p>
						</div>
					</div>
					<div className="col-12 sm:col-4">
						<div className="bg-zircon h-full rounded-xl px-6 py-5">
							<img src={icon_feedback} alt="" />
							<p className="text-reflex text-20 font-bold">Deliver salience and attentiveness to their brands</p>
						</div>
					</div>
					<div className="col-12 sm:col-4">
						<div className="bg-zircon h-full rounded-xl px-6 py-5">
							<img src={icon_search} alt="" />
							<p className="text-reflex text-20 font-bold">Make their products easier to find on your shelves</p>
						</div>
					</div>
				</div>
			</Container>
			<Container tag="section" className="dont_miss_out  mb-10 sm:mb-16">
				<div className="grid">
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.featureShopper.childImageSharp.gatsbyImageData} className="mb-6 max-w-80 sm:mb-0" alt="" />
					</div>
					<div className="col-12 sm:col-6 sm:flex sm:align-items-center">
						<p className="text-gradient text-20 font-black sm:text-24">
							Don't miss out on this chance to strengthen your relationships with advertisers and monetize your valuable in-store real estate.
						</p>
					</div>
				</div>
			</Container>
			<Container>
				<div className="bg-gradient rounded-xl px-6 py-5">
					<div className="grid">
						<div className="col-12 sm:col-8 sm:pr-8 md:col-7 lg:col-6 lg:pr-2">
							<img src={icon_support_agent} alt="" />
							<h2 className="text-24 text-white text-transform-none mb-4 sm:text-34">Book a FREE 20min consultation</h2>
							<p className="text-white text-16 line-height-180 mb-6 sm:mb-0">
								Book your free 20-minute consultation with Broadsign x Zitcha today. Our experts will guide you through our RM Readiness
								Framework, providing insights and strategies tailored to your unique needs and goals as a retailer.
							</p>
						</div>
						<div className="col-12 flex align-items-center justify-content-start sm:col-4 sm:justify-content-center md:col-5 lg:col-6">
							<CTA preset="primary-outline" hoverPreset="full-cerulean" className="wrap" onClick={() => setShowBookACallModal(true)}>
								Request Your Free Retailer Consultation
							</CTA>
						</div>
					</div>
				</div>
			</Container>
			<Modal show={showBookACallModal} variant="form" className="zitcha" onClose={() => setShowBookACallModal(false)}>
				<h2 className="text-20 text-transform-none mb-8 sm:text-24">{T.translate("form.header")}</h2>
				<Form form="partnersZitcha" standardizeLabels={false} redirectUrl={routeWithUtmForm("thankYou", "partner_zitcha")} />
			</Modal>
		</Layout>
	);
}

export const queryPageImages = graphql`
	query {
		heroMobile: file(relativePath: { eq: "pages/partners/zitcha/hero_mobile.jpg" }) {
			...img
		}
		heroPeople: file(relativePath: { eq: "pages/partners/zitcha/hero_people.png" }) {
			...img
		}
		featureShopper: file(relativePath: { eq: "pages/partners/zitcha/feature_shopper.png" }) {
			...img
		}
	}
`;
