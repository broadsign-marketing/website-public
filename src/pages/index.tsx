import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import cookie from "react-cookies";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";
import { routeWithUtmForm } from "@route";
import { loopTo } from "@annex";

import Campaigns from "@components/App__Carousel_CaseStudies";
import Container from "@components/Container";
import CTA from "@components/CTA";
import Form, { getFormID } from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Inventory from "@components/Home__Inventory_Rotate";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Map from "@components/Home__Map";
import Modal from "@components/Modal";
import FlippingThumbs from "@components/FlippingThumbs";

import icon_media_owners from "@img/pages/index/icon_media_owners.svg";
import icon_brands from "@img/pages/index/icon_brands.svg";
import whirl from "@img/pages/inventory-marketplace/custom_package.svg";
import check_circle_green from "@img/ui/check_circle_green.svg";

import logo_abinbev from "@logos/abinbev_reflex.svg";
import logo_boehringer from "@logos/boehringer_reflex.svg";
import logo_ubereats from "@logos/ubereats_reflex.svg";
import logo_warner_music from "@logos/warner_music_reflex.svg";
import logo_fanduel from "@logos/fanduel_reflex.svg";
import logo_honda from "@logos/honda_reflex.svg";
import logo_rakuten from "@logos/rakuten_reflex.svg";
import logo_samsung from "@logos/samsung_reflex.svg";
import logo_hp from "@logos/hp_reflex.svg";
import logo_hnm from "@logos/hnm_reflex.svg";
import logo_holt_renfrew from "@logos/holt_renfrew_reflex.svg";
import logo_omg from "@logos/omg_reflex.svg";
import logo_havas from "@logos/havas_reflex.svg";
import logo_wilkins from "@logos/wilkins_reflex.svg";
import logo_omd from "@logos/omd_reflex.svg";
import logo_dentsu from "@logos/dentsu_reflex.svg";
import logo_disney from "@logos/disney_reflex.svg";
import logo_johnson_johnson from "@logos/johnson_johnson_reflex.svg";
import logo_fairmont from "@logos/fairmont_reflex.svg";
import logo_wendys from "@logos/wendys_reflex.svg";
import logo_dolce_gabbana from "@logos/dolce_gabbana_reflex.svg";
import logo_toronto_raptors from "@logos/toronto_raptors_reflex.svg";
import logo_coca_cola from "@logos/coca_cola_reflex.svg";
import logo_pepsico from "@logos/pepsico_reflex.svg";
import logo_klm from "@logos/klm_reflex.svg";
import logo_nestle from "@logos/nestle_reflex.svg";
import logo_new_balance from "@logos/new_balance_reflex.svg";
import logo_kinesso from "@logos/kinesso_reflex.svg";
import logo_talon from "@logos/talon_reflex.svg";
import logo_publicis from "@logos/publicis_reflex.svg";
import logo_jellyfish from "@logos/jellyfish_reflex.svg";
import logo_mindshare from "@logos/mindshare_reflex.svg";
import logo_groupm from "@logos/groupm_reflex.svg";
import logo_haworth from "@logos/haworth_reflex.svg";
import logo_starcom from "@logos/starcom_reflex.svg";
import logo_motio from "@logos/motio_reflex.svg";
import logo_vgi from "@logos/vgi_reflex.svg";
import logo_intersection from "@logos/intersection_reflex.svg";
import logo_clear_channel from "@logos/clear_channel_reflex.svg";
import logo_outedge from "@logos/outedge_reflex.svg";
import logo_ocean from "@logos/ocean_reflex.svg";
import logo_planb from "@logos/planb_reflex.svg";
import logo_patientpoint from "@logos/patientpoint_reflex.svg";
import logo_enmedio from "@logos/enmedio_reflex.svg";
import logo_elevision from "@logos/elevision_reflex.svg";
import logo_cineplex from "@logos/cineplex_reflex.svg";
import logo_lamar from "@logos/lamar_reflex.svg";
import logo_stroer from "@logos/stroer_reflex.svg";
import logo_ooh from "@logos/ooh_reflex.svg";
import logo_jcd from "@logos/jcd_reflex.svg";
import logo_quebecor from "@logos/quebecor_reflex.svg";
import logo_astral from "@logos/astral_reflex.svg";
import logo_branded_cities from "@logos/branded_cities_reflex.svg";

import logo_imedia from "@logos/imedia_reflex.svg";
import logo_epa_media from "@logos/epa_media_reflex.svg";
import logo_precis from "@logos/precis_reflex.svg";
import logo_corus from "@logos/corus_reflex.svg";
import logo_iris from "@logos/iris_reflex.svg";

import "@sass/pages/home.scss";

import type { BroadsignPageProps } from "@types";

const LogosMarquee = lazy(() => import("@components/LogosMarquee"));
const Quotes = lazy(() => import("@components/QuotesOrbit"));

function RotatingBillboard({ className, speed, billboard, states = [], sprites = [] }) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (states.length > 1) {
			const interval = setInterval(() => {
				setCurrent((prev) => loopTo("next", prev, states.length));
			}, speed);

			return () => clearInterval(interval);
		}
	}, [speed, states]);

	if (states.length < 1) {
		return;
	}

	return (
		<div className={clsx("ooh", `ooh_${billboard}`, `speed_${speed}`, billboard > 5 ? "z-2" : "z-1", className)}>
			{states.map((state, k) => (
				<Img
					className={clsx("state w-full", `state_${state}`, { active: k === current })}
					image={sprites[state]}
					alt=""
					key={`b${billboard}s${state}`}
				/>
			))}
		</div>
	);
}

function Branches() {
	const [activeBranchBox, setActiveBranchBox] = useState("");

	return (
		<Container tag="section" className="branches pt-10 pb-16 z-2">
			<div className="text-center">
				<p className="subtitle-1 gradient font-medium">{T.translate("branches.overtitle")}</p>
				<h2 className="h4 text-reflex font-superbold line-height-140 text-transform-none mb-10">{T.translate("branches.title")}</h2>
			</div>
			<div className="grid">
				<div className="col-12 md:col-6" onMouseEnter={() => setActiveBranchBox("brands")} onMouseLeave={() => setActiveBranchBox("")}>
					<Link
						className={clsx(
							"branch has_arrow_link bg-zircon flex flex-column align-items-start justify-content-between h-full px-4 py-6 rounded-xl sm:flex-row sm:align-items-center sm:p-5",
							activeBranchBox === "brands" && "zoom_in",
							activeBranchBox === "mediaOwners" && "zoom_out"
						)}
						to="launchPDOOHCampaign">
						<img src={icon_brands} className="branch_icon mb-6 z-1 sm:mb-0 sm:ml-3" alt="" />
						<div className="w-full">
							<p className="subtitle-1 gradient font-medium">{T.translate("branches.brandsAgencies.overtitle")}</p>
							<h3 className="text-reflex text-20 font-black text-transform-none mb-6">{T.translate("branches.brandsAgencies.title")}</h3>
							<span className="link_cerulean_arrow text-cerulean text-14 uppercase mt-auto">{T.translate("branches.brandsAgencies.cta")}</span>
						</div>
					</Link>
				</div>
				<div className="col-12 md:col-6" onMouseEnter={() => setActiveBranchBox("mediaOwners")} onMouseLeave={() => setActiveBranchBox("")}>
					<Link
						className={clsx(
							"branch has_arrow_link bg-zircon flex flex-column align-items-start justify-content-between h-full px-4 py-6 rounded-xl sm:flex-row sm:align-items-center sm:p-5",
							activeBranchBox === "mediaOwners" && "zoom_in",
							activeBranchBox === "brands" && "zoom_out"
						)}
						to="broadsignPlatform">
						<img src={icon_media_owners} className="branch_icon mb-6 z-1 sm:mb-0 sm:mr-8 sm:ml-3" alt="" />
						<div className="w-full">
							<p className="subtitle-1 gradient font-medium">{T.translate("branches.mediaOwners.overtitle")}</p>
							<h3 className="text-reflex text-20 font-black text-transform-none mb-6">{T.translate("branches.mediaOwners.title")}</h3>
							<span className="link_cerulean_arrow text-cerulean text-14 uppercase mt-auto">{T.translate("branches.mediaOwners.cta")}</span>
						</div>
					</Link>
				</div>
			</div>
		</Container>
	);
}

export default function Index({ pageContext: { l, dicoPath }, location: { hash, search }, data }: BroadsignPageProps) {
	const [showDemoModal, setShowDemoModal] = useState(false);
	const [showContactModal, setShowContactModal] = useState(false);
	const [isMediaKitFormSubmitted, setIsMediaKitFormSubmitted] = useState(false);
	const [showMediaKitModal, setShowMediaKitModal] = useState(() => {
		const _h = typeof hash === "string" ? hash.replace(/^#/, "") : "";
		const _q = typeof search === "string" ? search.replace(/^\?q=/, "") : "";
		const r = /media-?kit/;
		return r.test(_h) || r.test(_q);
	});
	const [hasSubmittedMediaKitForm, setHasSubmittedMediaKitForm] = useState(() => {
		if (typeof window === "undefined") return false;
		const formID = getFormID("mediaKitProgrammatic"); // This will be "mediaKitProgrammatic"
		const formCookie = cookie.load(`submitted-form-${formID}`);
		return !!formCookie;
	});

	useDico(l, dicoPath);

	const { hero } = T.texts;

	const quotesCompanyLogos = {
		imedia: logo_imedia,
		epa_media: logo_epa_media,
		hp: logo_hp,
		precis: logo_precis,
		corus: logo_corus,
		iris: logo_iris,
	};

	const quotes = T.texts.quotes.map((quote) => ({
		...quote,
		companyLogo: quotesCompanyLogos[quote.id],
		portrait: data[`portrait_${quote.id}`].childImageSharp.gatsbyImageData,
	}));

	const slideStates = useMemo(() => {
		const statesArr = [[3, 2, 3, 1, 3, 1, 1, 3, 2, 1]];
		const out = statesArr.map((slide) => {
			const _out = slide.map((states) => {
				return Array.from({ length: states }, (_, index) => index + 1);
			});
			_out.unshift([]);
			return _out;
		});
		return out;
	}, []);

	useEffect(() => {
		const _hash = hash.replace(/^#/, "") || "";
		const _query = search.replace(/^\?q=/, "") || ""; // Ensure search is a string
		const r = /media-?kit/;
		// Only attempt to show the modal if the URL condition is met AND it's not already shown.
		// This preserves the original one-way functionality (URL can open it, but not close it if URL changes).
		// The initial state is set correctly by useState's initializer, avoiding re-render on load.
		if (!showMediaKitModal && (r.test(_hash) || r.test(_query))) {
			setShowMediaKitModal(true);
		}
	}, [hash, search, showMediaKitModal]); // Added showMediaKitModal to dependency array

	// The useEffect for hasSubmittedMediaKitForm is removed as its logic
	// is now handled by the useState initializer for hasSubmittedMediaKitForm.

	useEffect(() => {
		if (typeof window === "undefined") return;

		if (isMediaKitFormSubmitted) {
			window.open(T.translate("mediaKitProgrammaticLink"), "_blank");
			setTimeout(() => setShowMediaKitModal(false), 8000);
		}
	}, [isMediaKitFormSubmitted]);

	const billboardsSwitchSpeeds = [null, 3100, 4000, 3200, 3900, 3300, 3800, 3400, 3700, 3600, 3500];

	return (
		<Layout id="home" className="theme_carolina">
			<section className="hero z-1">
				<Container>
					<div className="grid">
						<div className="col-12 md:col-6">
							<div className="flex flex-column align-items-center justify-content-center md:align-items-start">
								<h1 className="text-white font-superbold">
									{hero.title.map((t) => (
										<span className="anim_appear" key={t}>
											{t}
										</span>
									))}
								</h1>
								<p className="text-reflex line-height-180 text-center mx-auto mt-4 mb-8 w-full md:mt-0 md:mb-12 md:mx-0 md:text-left">
									{T.translate("hero.par")}
								</p>
								<div className="ctas flex flex-wrap justify-content-center gap-4 mb-16 md:justify-content-start md:mb-0">
									{l === "zh" ? (
										<CTA className="w-full wrap sm:w-auto sm:nowrap" preset="primary" hoverPreset="full-cerulean" to="contact">
											{T.translate("hero.ctaContact")}
										</CTA>
									) : (
										<CTA
											className="w-full wrap sm:w-auto sm:nowrap"
											preset="primary"
											hoverPreset="full-cerulean"
											onClick={() => setShowContactModal(true)}>
											{T.translate("hero.ctaContact")}
										</CTA>
									)}
									<CTA className="w-full wrap sm:w-auto sm:nowrap" preset="primary-outline" hoverPreset="full-cerulean" to="plans">
										{T.translate("hero.ctaPlans")}
									</CTA>
								</div>
							</div>
						</div>
						<div className="col-12 py-0 md:col-6">
							<div className="desktop_resize md:pl-6 lg:pl-0">
								<div className="blue_gradient"></div>
								<div className="slides flex align-items-end">
									<div className="slide slide_1">
										<div className="inner">
											<Img className="person" image={data.hero_slide1_person.childImageSharp.gatsbyImageData} alt="" />
											<Img
												className="buildings"
												image={data.hero_slide1_buildings.childImageSharp.gatsbyImageData}
												objectPosition="left bottom"
												alt=""
											/>
											<div className="ooh_wrapper bg">
												{slideStates[0].map((states, billboardNum) => (
													<RotatingBillboard
														states={states}
														billboard={billboardNum}
														speed={billboardsSwitchSpeeds[billboardNum]}
														sprites={{
															1: data.hero_slide1_billboards_state1.childImageSharp.gatsbyImageData,
															2: data.hero_slide1_billboards_state2.childImageSharp.gatsbyImageData,
															3: data.hero_slide1_billboards_state3.childImageSharp.gatsbyImageData,
														}}
														key={`billboard_${billboardNum}`}
													/>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>
			<Branches />

			<section className="clients mt-10 mb-20">
				<Container className="text-center">
					<h2 className="subtitle-1 gradient font-medium mb-10">{T.translate("clients.title")}</h2>
				</Container>
				<Suspense>
					<LogosMarquee
						logos={[
							logo_abinbev,
							logo_boehringer,
							logo_ubereats,
							logo_warner_music,
							logo_fanduel,
							logo_honda,
							logo_rakuten,
							logo_samsung,
							logo_hp,
							logo_hnm,
							logo_holt_renfrew,
							logo_omg,
							logo_havas,
							logo_wilkins,
							logo_omd,
							logo_dentsu,
							logo_disney,
							logo_johnson_johnson,
							logo_fairmont,
							logo_wendys,
							logo_dolce_gabbana,
							logo_toronto_raptors,
							logo_coca_cola,
							logo_pepsico,
							logo_klm,
							logo_nestle,
							logo_new_balance,
							logo_kinesso,
							logo_talon,
							logo_publicis,
							logo_jellyfish,
							logo_mindshare,
							logo_groupm,
							logo_haworth,
							logo_starcom,
						]}
						speed={120}
						shuffled={true}
						className="mb-6"
					/>
				</Suspense>
				<Suspense>
					<LogosMarquee
						logos={[
							logo_motio,
							logo_vgi,
							logo_intersection,
							logo_clear_channel,
							logo_outedge,
							logo_ocean,
							logo_planb,
							logo_patientpoint,
							logo_enmedio,
							logo_elevision,
							logo_cineplex,
							logo_lamar,
							logo_stroer,
							logo_ooh,
							logo_jcd,
							logo_quebecor,
							logo_astral,
							logo_branded_cities,
						]}
						speed={60}
						shuffled={true}
						reverse={true}
					/>
				</Suspense>
			</section>
			<Container tag="section" className="inventory mb-20">
				<Inventory />
			</Container>
			<Container tag="section" className="map mb-10 sm:mb-20">
				<div className="text-center">
					<p className="subtitle-1 gradient font-medium">{T.translate("map.overtitle")}</p>
					<h2 className="h4 text-reflex font-superbold line-height-140 text-transform-none mb-8">{T.translate("map.title")}</h2>
				</div>
				<Map />
			</Container>
			<Container tag="section" className="media_kit pt-20">
				<div className="bg-gradient-1 rounded-xl px-5 py-8 md:px-10 md:py-0">
					<div className="grid">
						<div className="col-12 md:col-6 md:flex-order-2">
							<FlippingThumbs
								className="media_kit_thumbs w-full"
								visibleQty={2}
								thumbs={[
									data.mediaKitThumb01.childImageSharp.gatsbyImageData,
									data.mediaKitThumb02.childImageSharp.gatsbyImageData,
									data.mediaKitThumb03.childImageSharp.gatsbyImageData,
								]}
							/>
						</div>
						<div className="col-12 md:col-6 flex flex-column align-items-center justify-content-center md:flex-order-1 md:align-items-start">
							<h3 className="text-white text-20 font-bold text-transform-none mb-6 sm:mx-auto sm:text-34 sm:mb-8 md:mx-0">
								{T.translate("panelMediaKit.title")}
							</h3>
							{isMediaKitFormSubmitted || hasSubmittedMediaKitForm ? (
								<CTA
									className="bg-transparent text-white text-12 border-white letter-spacing-10 md:text-14 hover:bg-white hover:text-reflex"
									to={T.translate("mediaKitProgrammaticLink")}>
									{T.translate("panelMediaKit.cta")}
								</CTA>
							) : (
								<CTA
									className="bg-transparent text-white text-12 border-white letter-spacing-10 md:text-14 hover:bg-white hover:text-reflex"
									onClick={() => setShowMediaKitModal(true)}>
									{T.translate("panelMediaKit.cta")}
								</CTA>
							)}
						</div>
					</div>
				</div>
			</Container>
			<Container tag="section" className="pt-15 pb-16 sm:pt-20">
				<Campaigns
					campaigns={[
						"holt_renfrew",
						"samsonite",
						"desjardins",
						"global",
						"ig",
						"samsung",
						"veet",
						"jotex",
						"hnm",
						"hp",
						"boehringer_ingelheim",
						"canadian_real_estate_association",
						"ab_inbev",
						"seadoo",
					]}
					overtitle={T.translate("campaignsLaunchedWithBroadsign")}
					cta={T.translate("learnMore")}
					bg="white"
					showProps={["objective", "targetStrategy", "results"]}
					showLocationProps={false}
				/>
			</Container>
			<section className="quotes pb-10 sm:pb-20">
				<Container className="text-center">
					<h2 className="h4 text-reflex font-superbold line-height-140 text-transform-none mb-8">{T.translate("quotesTitle")}</h2>
				</Container>
				<Suspense>
					<Quotes quotes={quotes} />
				</Suspense>
			</section>
			<Container tag="section" className="do_for_ooh mb-14">
				<div className={clsx("bg-gradient rounded-xl")}>
					<div className="grid">
						<div className="col-12 text-center sm:col-5 md:col-4">
							<img src={whirl} className="img max-w-full" alt="" />
						</div>
						<div className="col-12 sm:col-7 md:col-8">
							<div className="pt-8 pb-10 px-4 sm:pr-10">
								<h2 className="h4 text-white text-left mb-4">{T.translate("shin.title")}</h2>
								<p className="text-white text-left line-height-180 mb-10 sm:mb-6">{T.translate("shin.par")}</p>
								<CTA preset="white-outline-transparent" hoverPreset="full-white" onClick={() => setShowDemoModal(true)} className="max-w-full">
									{T.translate("shin.cta")}
								</CTA>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Modal show={showContactModal} variant="form" className="theme_carolina" onClose={() => setShowContactModal(false)}>
				<h3 className="h4 text-reflex mb-8">{T.translate("getInTouch")}</h3>
				<Form form="contact" redirectUrl={routeWithUtmForm("thankYou", "contact_us")} />
			</Modal>
			<Modal show={showDemoModal} variant="form" className="theme_carolina" onClose={() => setShowDemoModal(false)}>
				<h3 className="h4 text-reflex mb-8">{T.translate("shin.title")}</h3>
				<Form form="demo" redirectUrl={routeWithUtmForm("thankYou", "request_a_demo")} />
			</Modal>
			<Modal show={showMediaKitModal} variant="form" className="narrow" onClose={() => setShowMediaKitModal(false)}>
				{isMediaKitFormSubmitted ? (
					<div className="thank_you_message flex flex-column align-items-center w-full my-auto">
						<img className="mb-4" src={check_circle_green} style={{ width: "60px" }} alt="" />
						<h3 className="text-24 text-transform-none mb-4">{T.translate("panelMediaKit.thankYou.title")}</h3>
						<p className="text-16 mb-0">
							<span>{T.translate("panelMediaKit.thankYou.par")}</span>{" "}
							<Link to={T.translate("mediaKitProgrammaticLink")}>{T.translate("panelMediaKit.thankYou.cta")}.</Link>
						</p>
					</div>
				) : (
					<>
						<h2 className="text-24 text-transform-none w-full mb-8 sm:text-30">{T.translate("panelMediaKit.title")}</h2>
						<Form
							form="mediaKitProgrammatic"
							submitText="Download now"
							killHubspotSubmitActions={true}
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

export const queryIndex = graphql`
	query {
		hero_slide1_person: file(relativePath: { eq: "pages/index/hero_slide1_person.png" }) {
			...img
		}
		hero_slide1_buildings: file(relativePath: { eq: "pages/index/hero_slide1_buildings.png" }) {
			...img
		}
		hero_slide1_buildings: file(relativePath: { eq: "pages/index/hero_slide1_buildings.png" }) {
			...img
		}
		hero_slide1_billboards_state1: file(relativePath: { eq: "pages/index/hero_slide1_billboards_state1.png" }) {
			...img
		}
		hero_slide1_billboards_state2: file(relativePath: { eq: "pages/index/hero_slide1_billboards_state2.png" }) {
			...img
		}
		hero_slide1_billboards_state3: file(relativePath: { eq: "pages/index/hero_slide1_billboards_state3.png" }) {
			...img
		}

		portrait_imedia: file(relativePath: { eq: "pages/index/portrait_imedia.png" }) {
			...img
		}
		portrait_epa_media: file(relativePath: { eq: "pages/index/portrait_epa_media.png" }) {
			...img
		}
		portrait_hp: file(relativePath: { eq: "pages/index/portrait_hp.png" }) {
			...img
		}
		portrait_precis: file(relativePath: { eq: "pages/index/portrait_precis.png" }) {
			...img
		}
		portrait_corus: file(relativePath: { eq: "pages/index/portrait_corus.png" }) {
			...img
		}
		portrait_iris: file(relativePath: { eq: "pages/index/portrait_iris.png" }) {
			...img
		}

		mediaKitThumb01: file(relativePath: { eq: "pages/index/media_kit_thumb_01.png" }) {
			childImageSharp {
				gatsbyImageData(width: 400)
			}
		}
		mediaKitThumb02: file(relativePath: { eq: "pages/index/media_kit_thumb_02.png" }) {
			childImageSharp {
				gatsbyImageData(width: 400)
			}
		}
		mediaKitThumb03: file(relativePath: { eq: "pages/index/media_kit_thumb_03.png" }) {
			childImageSharp {
				gatsbyImageData(width: 400)
			}
		}

		clientReelVideoPoster: file(relativePath: { eq: "video_posters/homepage_client_reel.jpg" }) {
			...img
		}
	}
`;
