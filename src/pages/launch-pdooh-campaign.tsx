import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import cookie from "react-cookies";
import { useDico } from "@hooks/useDico";
import { routeWithUtmForm } from "@route";

import Campaigns from "@components/App__Carousel_CaseStudies";
import Container from "@components/Container";
import CTA from "@components/CTA";
import FAQCollapse from "@components/FAQCollapse";
import Form, { getFormID } from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import GradientBox from "@components/GradientBox";
import Layout from "@components/layout";
import LogosMarquee from "@components/LogosMarquee";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import NeonBox from "@components/NeonBox";
const Quotes = lazy(() => import("@components/QuotesOrbit"));

import faqs_data from "@assets/ids_aquarius_faqs.json";

import icon_trusted_partners from "@img/pages/launch-pdooh-campaign/icon_trusted_partners.svg";
import icon_worldwide_reach from "@img/pages/launch-pdooh-campaign/icon_worldwide_reach.svg";
import icon_measurable_results from "@img/pages/launch-pdooh-campaign/icon_measurable_results.svg";
import check_circle_green from "@img/ui/check_circle_green.svg";

import logo_abinbev from "@logos/abinbev_reflex.svg";
import logo_starcom from "@logos/starcom_reflex.svg";
import logo_boehringer from "@logos/boehringer_reflex.svg";
import logo_mindshare from "@logos/mindshare_reflex.svg";
import logo_ubereats from "@logos/ubereats_reflex.svg";
import logo_dentsu from "@logos/dentsu_reflex.svg";
import logo_warner_music from "@logos/warner_music_reflex.svg";
import logo_omd from "@logos/omd_reflex.svg";
import logo_disney from "@logos/disney_reflex.svg";
import logo_jellyfish from "@logos/jellyfish_reflex.svg";
import logo_fanduel from "@logos/fanduel_reflex.svg";
import logo_publicis from "@logos/publicis_reflex.svg";
import logo_johnson_johnson from "@logos/johnson_johnson_reflex.svg";
import logo_wilkins from "@logos/wilkins_reflex.svg";
import logo_honda from "@logos/honda_reflex.svg";
import logo_talon from "@logos/talon_reflex.svg";
import logo_rakuten from "@logos/rakuten_reflex.svg";
import logo_havas from "@logos/havas_reflex.svg";
import logo_holt_renfrew from "@logos/holt_renfrew_reflex.svg";
import logo_nestle from "@logos/nestle_reflex.svg";
import logo_klm from "@logos/klm_reflex.svg";
import logo_pepsi from "@logos/pepsi_reflex.svg";
import logo_coca_cola from "@logos/coca_cola_reflex.svg";
import logo_toronto_raptors from "@logos/toronto_raptors_reflex.svg";
import logo_hnm from "@logos/hnm_reflex.svg";
import logo_dolce_gabbana from "@logos/dolce_gabbana_reflex.svg";
import logo_wendys from "@logos/wendys_reflex.svg";
import logo_omg from "@logos/omg_reflex.svg";
import logo_hp from "@logos/hp_reflex.svg";
import logo_haworth from "@logos/haworth_reflex.svg";
import logo_new_balance from "@logos/new_balance_reflex.svg";
import logo_kinesso from "@logos/kinesso_reflex.svg";
import logo_samsung from "@logos/samsung_reflex.svg";
import logo_groupm from "@logos/groupm_reflex.svg";
import logo_fairmont from "@logos/fairmont_reflex.svg";

import logo_quotes_adsmurai from "@img/pages/launch-pdooh-campaign/logo_adsmurai.svg";
import logo_quotes_mediaplus from "@img/pages/launch-pdooh-campaign/logo_mediaplus.svg";
import logo_quotes_ubereats from "@img/pages/launch-pdooh-campaign/logo_ubereats.svg";
import logo_quotes_stackadapt from "@img/pages/launch-pdooh-campaign/logo_stackadapt.svg";
import logo_quotes_displayce from "@img/pages/launch-pdooh-campaign/logo_displayce.svg";
import logo_quotes_illumin from "@img/pages/launch-pdooh-campaign/logo_illumin.svg";

import "@sass/pages/launch_pdooh_campaign.scss";

function QuotesSection({ data }) {
	const [isLoaded, setisLoaded] = useState(false);

	const selfRef = useRef(null);

	/* const onLoad = useCallback(() => {
		if (isLoaded) return;

		const allRibbons = selfRef.current.querySelectorAll(".orbit_item_grid");
		const middleRibbon = allRibbons[1];

		function moveQuote() {
			if (isLoaded) return;

			const allRibbons = selfRef.current.querySelectorAll(".orbit_item_grid");
			const middleRibbon = allRibbons[1];

			const targetQuote = middleRibbon.querySelector(".adsmurai");
			const targetQuoteLeft = Math.round(targetQuote.getBoundingClientRect().left);
			const leftPosReference = Math.round(document.querySelector("main .container > div:not(.grid)")?.getBoundingClientRect().left); // The left position we want the quote to scroll to

			if (!targetQuoteLeft || !leftPosReference) return setTimeout(moveQuote, 100);

			console.log(targetQuoteLeft, leftPosReference);

			for (const ribbon of allRibbons) {
				const currentLeft = parseInt(ribbon.style.left);
				if (targetQuoteLeft > leftPosReference) ribbon.style.left = `${currentLeft - 1}px`;
				if (targetQuoteLeft < leftPosReference) ribbon.style.left = `${currentLeft + 1}px`;
				if (targetQuoteLeft === leftPosReference) {
					console.log("they're equal :", targetQuoteLeft, leftPosReference);
					setisLoaded(true);
					return;
				}
			}

			return moveQuote();
		}

		if (!middleRibbon) return setTimeout(onLoad, 100);

		moveQuote();
	}, [selfRef]);

	useEffect(() => {
		setTimeout(onLoad, 4000);
	}, []); */

	const quotesCompanyLogos = {
		adsmurai: logo_quotes_adsmurai,
		mediaplus: logo_quotes_mediaplus,
		ubereats: logo_quotes_ubereats,
		stackadapt: logo_quotes_stackadapt,
		displayce: logo_quotes_displayce,
		illumin: logo_quotes_illumin,
	};

	const quotes = T.texts.quotes.map((quote) => ({
		...quote,
		companyLogo: quotesCompanyLogos[quote.id],
		portrait: data[`portrait_${quote.id}`].childImageSharp.gatsbyImageData,
	}));

	return (
		<section className="quotes pb-20" ref={selfRef}>
			<Container>
				<h2 className="h4 text-reflex font-superbold text-center line-height-140 text-transform-none mb-10">{T.translate("quotesTitle")}</h2>
			</Container>
			<Suspense>
				<Quotes quotes={quotes} />
			</Suspense>
		</section>
	);
}
export default function LaunchPDOOHCampaign({ pageContext: { l, dicoPath }, location: { hash, search }, data }) {
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);
	const [showMediaKitModal, setShowMediaKitModal] = useState(false);
	const [isMediaKitFormSubmitted, setIsMediaKitFormSubmitted] = useState(false);
	const [hasSubmittedMediaKitForm, setHasSubmittedMediaKitForm] = useState(false);

	useDico(l, dicoPath);

	const icons = {
		trusted_partners: icon_trusted_partners,
		worldwide_reach: icon_worldwide_reach,
		measurable_results: icon_measurable_results,
	};

	const { gradientBoxes, faq } = T.texts;
	const whyBoxes = T.texts.why.boxes;
	const howBoxes = T.texts.how.boxes;

	const openModal = useCallback((ctaClicked = "") => {
		setShowTalkToASpecialistModal(true);

		setTimeout(() => {
			if (typeof document === "undefined") return;

			const leadSourceDetailsField = document.querySelector(".Modal .Form .hs_lead_source_details input");
			leadSourceDetailsField.value = ctaClicked;
			leadSourceDetailsField.dispatchEvent(new Event("input", { bubbles: true }));
		}, 1200);
	}, []);

	useEffect(() => {
		const _hash = hash.replace(/^#/, "") || "";
		const _query = search.replace(/^\?q=/, "") || "";
		let r;

		r = /media-?kit/;
		if (_hash.match(r) || _query.match(r)) {
			setShowMediaKitModal(true);
			return;
		}
	}, [hash, search]);

	useEffect(() => {
		const formID = getFormID("mediaKitProgrammaticLaunchPDOOHCampaign");
		const formCookie = cookie.load(`submitted-form-${formID}`);

		if (formCookie) {
			setHasSubmittedMediaKitForm(true);
		}
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;

		if (isMediaKitFormSubmitted) {
			window.open(T.translate("mediaKitProgrammaticLink"), "_blank");
			setTimeout(() => setShowMediaKitModal(false), 8000);
		}
	}, [isMediaKitFormSubmitted]);

	return (
		<Layout id="launch_pdooh_campaign" className="theme_carolina mb-12">
			<Container tag="section" className="hero mt-8 mb-20 sm:mt-15">
				<div className="grid">
					<div className="col-12 flex flex-center sm:flex-order-2 sm:col-6">
						<Img className="hero_img mb-6 sm:mb-0" image={data.hero.childImageSharp.gatsbyImageData} alt="" />
					</div>
					<div className="col-12 flex column-center sm:flex-order-1 sm:col-6">
						<h1 className="text-30 mb-8 text-transform-none sm:text-34">{T.translate("hero.title")}</h1>
						<p className="line-height-180 mb-12">{T.translate("hero.blurb")}</p>
						<CTA className="primary" onClick={() => openModal("Launch a PDOOH Campaign - Hero")}>
							{T.translate("hero.cta")}
						</CTA>
					</div>
				</div>
			</Container>
			<Container tag="section" className="agencies text-center">
				<p className="subtitle-1 gradient font-medium mb-6">{T.translate("agencies.title")}</p>
			</Container>
			<LogosMarquee
				className="mb-6"
				shuffled={false}
				speed={80}
				logos={[
					logo_abinbev,
					logo_starcom,
					logo_boehringer,
					logo_mindshare,
					logo_ubereats,
					logo_dentsu,
					logo_warner_music,
					logo_omd,
					logo_disney,
					logo_jellyfish,
					logo_fanduel,
					logo_publicis,
					logo_johnson_johnson,
					logo_wilkins,
					logo_honda,
					logo_talon,
					logo_rakuten,
					logo_havas,
				]}
			/>
			<LogosMarquee
				className="mb-20"
				shuffled={false}
				speed={80}
				reverse={true}
				logos={[
					logo_holt_renfrew,
					logo_nestle,
					logo_klm,
					logo_pepsi,
					logo_coca_cola,
					logo_toronto_raptors,
					logo_hnm,
					logo_dolce_gabbana,
					logo_wendys,
					logo_omg,
					logo_hp,
					logo_haworth,
					logo_new_balance,
					logo_kinesso,
					logo_samsung,
					logo_groupm,
					logo_fairmont,
				]}
			/>
			<Container tag="section" className="why mb-15 sm:mb-22">
				<h2 className="text-30 text-center text-transform-none mb-10 sm:text-34">{T.translate("why.title")}</h2>
				<div className="grid">
					{whyBoxes.map(({ icon, title, par, cta, to }) => (
						<div className="col-12 mx-auto sm:col-6 md:col-4" key={icon}>
							<NeonBox innerClassName="flex flex-column justify-content-start">
								<div className="image_wrapper w-full mt-0 mb-3">
									<img className="solution_img" src={icons[icon]} alt={title} />
								</div>
								<h3 className="text-20 text-transform-none mb-5 sm:text-24">{title}</h3>
								<p className="line-height-180 mb-8">{par}</p>
								<p>
									{to === "mediaKit" ? (
										<>
											{isMediaKitFormSubmitted || hasSubmittedMediaKitForm ? (
												<Link
													to={T.translate("mediaKitProgrammaticLink")}
													className="link_cerulean_arrow text-cerulean text-13 letter-spacing-10 uppercase sm:text-14"
													dangerouslySetInnerHTML={{ __html: cta }}
												/>
											) : (
												<button
													onClick={() => setShowMediaKitModal(true)}
													className="div link_cerulean_arrow text-cerulean text-13 letter-spacing-10 uppercase sm:text-14"
													dangerouslySetInnerHTML={{ __html: cta }}
												/>
											)}
										</>
									) : (
										<Link
											to={to}
											className="link_cerulean_arrow text-cerulean text-13 letter-spacing-10 uppercase sm:text-14"
											dangerouslySetInnerHTML={{ __html: cta }}
										/>
									)}
								</p>
							</NeonBox>
						</div>
					))}
				</div>
				<p className="text-center mt-10">
					<CTA className="primary mx-auto" onClick={() => openModal("Launch a PDOOH Campaign - Why Broadsign Section")}>
						{T.translate("why.cta")}
					</CTA>
				</p>
			</Container>
			<Container tag="section" className="mb-12 sm:mb-20">
				<GradientBox
					variant="text_cta"
					cta={{ label: gradientBoxes[0].cta, preset: "primary-outline", hoverPreset: "full-cerulean", to: T.translate("whatisPDOOHBlogLink") }}>
					<h2 className="text-white text-24 font-bold text-transform-none mb-2">{gradientBoxes[0].title}</h2>
					<p className="text-white line-height-180 m-0">{gradientBoxes[0].par}</p>
				</GradientBox>
			</Container>
			<Container tag="section" className="how mb-10">
				<h2 className="text-30 text-center text-transform-none mb-10 sm:text-34">{T.translate("how.title")}</h2>
				<p className="line-height-180 mb-20 mx-auto sm:text-center">{T.translate("how.par")}</p>
				<div className="grid">
					{howBoxes.map(({ img, title, par, cta, to }) => (
						<div className="col-12 mb-20 sm:col-6 sm:mb-0" key={img}>
							<NeonBox innerClassName="flex flex-column justify-content-start z-1">
								<Img image={data[img].childImageSharp.gatsbyImageData} className="how_img z-2" alt="" />
								<div className="image_wrapper w-full mt-0 mb-3"></div>
								<h3 className="text-20 text-transform-none mb-5 sm:text-24">{title}</h3>
								<p className="line-height-180 mb-8">{par}</p>
								<p className="m-0">
									{to ? (
										<CTA className="primary mx-auto" to={to}>
											{cta}
										</CTA>
									) : (
										<CTA className="primary mx-auto" onClick={() => openModal(`Launch a PDOOH Campaign - ${title}`)}>
											{cta}
										</CTA>
									)}
								</p>
							</NeonBox>
						</div>
					))}
				</div>
			</Container>
			<Container tag="section" className="-mt-14 mb-12 sm:mt-0 sm:mb-22">
				<GradientBox
					variant="text_cta"
					cta={{
						label: gradientBoxes[1].cta,
						preset: "primary-outline",
						hoverPreset: "full-cerulean",
						onClick: () => openModal(`Launch a PDOOH Campaign - CTA Box - ${gradientBoxes[1].title}`),
					}}>
					<h2 className="text-white text-24 font-bold text-transform-none mb-2">{gradientBoxes[1].title}</h2>
					<p className="text-white line-height-180 m-0">{gradientBoxes[1].par}</p>
				</GradientBox>
			</Container>
			<QuotesSection data={data} />
			<Container tag="section" className="pt-15 pb-16 sm:pt-20">
				<h2 className="text-30 text-center text-transform-none mb-0 sm:text-34 sm:mb-16">{T.translate("campaignsTitle")}</h2>
				<Campaigns
					campaigns={["ubereats", "hnm", "white_claw"]}
					overtitle="none"
					cta={T.translate("readCaseStudy")}
					bg="white"
					showProps={["objective", "targetStrategy", "results"]}
					showLocationProps={false}
				/>
			</Container>
			<div className="faq mb-14 sm:mb-20">
				<Container>
					<h3 className="h4 text-transform-none">{T.translate("faq.title")}</h3>
					{faq.list.map(({ id, track, q, a }) => (
						<FAQCollapse q={q} a={a} borders="ash" dataQ={faqs_data[id]} key={id} />
					))}
				</Container>
			</div>
			<Container tag="section" className="">
				<GradientBox
					variant="text_cta"
					cta={{
						label: gradientBoxes[2].cta,
						preset: "primary-outline",
						hoverPreset: "full-cerulean",
						onClick: () => openModal(`Launch a PDOOH Campaign - CTA Box - ${gradientBoxes[2].title}`),
					}}>
					<h2 className="text-white text-30 font-bold text-transform-none mb-4 sm:text-34">{gradientBoxes[2].title}</h2>
					<p className="text-white line-height-180 m-0">{gradientBoxes[2].par}</p>
				</GradientBox>
			</Container>
			<Modal show={showTalkToASpecialistModal} variant="form" className="theme_carolina narrow" onClose={() => setShowTalkToASpecialistModal(false)}>
				<h3 className="text-30 text-left text-transform-none mb-4 w-full sm:text-34">{T.translate("hero.cta")}</h3>
				<Form form="talkToASpecialist" submitText="Get in touch" redirectUrl={routeWithUtmForm("thankYou", "talk_to_a_media_specialist")} />
			</Modal>
			<Modal show={showMediaKitModal} variant="form" className="narrow" onClose={() => setShowMediaKitModal(false)}>
				{isMediaKitFormSubmitted ? (
					<div className="thank_you_message flex flex-column align-items-center w-full my-auto">
						<img className="mb-4" src={check_circle_green} style={{ width: "60px" }} alt="" />
						<h3 className="text-30 text-left text-transform-none mb-4 w-full sm:text-34">{T.translate("panelMediaKit.thankYou.title")}</h3>
						<p className="text-16 mb-0">
							<span>{T.translate("panelMediaKit.thankYou.par")}</span>{" "}
							<Link to={T.translate("mediaKitProgrammaticLink")}>{T.translate("panelMediaKit.thankYou.cta")}.</Link>
						</p>
					</div>
				) : (
					<>
						<h3 className="text-30 text-left text-transform-none mb-4 w-full sm:text-34">{T.translate("panelMediaKit.title")}</h3>
						<Form
							form="mediaKitProgrammaticLaunchPDOOHCampaign"
							killHubspotSubmitActions={true}
							submitText="Get the kit"
							onSubmit={() => {
								setIsMediaKitFormSubmitted(true);
							}}
						/>
					</>
				)}
			</Modal>
		</Layout>
	);
}

export const query = graphql`
	query {
		hero: file(relativePath: { eq: "pages/launch-pdooh-campaign/hero.png" }) {
			...img
		}

		dsp_choice: file(relativePath: { eq: "pages/launch-pdooh-campaign/dsp_choice.png" }) {
			...img
		}
		dsp_outmoove: file(relativePath: { eq: "pages/launch-pdooh-campaign/dsp_outmoove.png" }) {
			...img
		}

		portrait_adsmurai: file(relativePath: { eq: "pages/launch-pdooh-campaign/portrait_adsmurai.png" }) {
			...img
		}
		portrait_mediaplus: file(relativePath: { eq: "pages/launch-pdooh-campaign/portrait_mediaplus.png" }) {
			...img
		}
		portrait_ubereats: file(relativePath: { eq: "pages/launch-pdooh-campaign/portrait_ubereats.png" }) {
			...img
		}
		portrait_stackadapt: file(relativePath: { eq: "pages/launch-pdooh-campaign/portrait_stackadapt.png" }) {
			...img
		}
		portrait_displayce: file(relativePath: { eq: "pages/launch-pdooh-campaign/portrait_displayce.png" }) {
			...img
		}
		portrait_illumin: file(relativePath: { eq: "pages/launch-pdooh-campaign/portrait_illumin.png" }) {
			...img
		}
	}
`;
