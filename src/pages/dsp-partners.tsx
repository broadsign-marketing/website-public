import React, { useCallback, useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import cookie from "react-cookies";
import { useDico } from "@hooks/useDico";
import { routeWithUtmForm } from "@route";
import clsx from "clsx";
import { loopTo } from "@annex";

import Campaigns from "@components/App__Carousel_CaseStudies";
import CTA from "@components/CTA";
import Container from "@components/Container";
import Form, { getFormID } from "@components/Form";
import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";
import GradientBox from "@components/GradientBox";
import Intersection from "@components/Intersection";
import Layout from "@components/layout";
import Modal from "@components/Modal";
import NeonBox from "@components/NeonBox";

import logo_active_agent from "@logos/active_agent_reflex.svg";
import logo_adelphic from "@logos/adelphic_reflex.svg";
import logo_adform from "@logos/aform_reflex.svg";
import logo_adomni from "@logos/adomni_reflex.svg";
import logo_adquick from "@logos/aquick_reflex.svg";
import logo_adtheorent from "@logos/atheorent_reflex.svg";
import logo_appcelerate from "@logos/appcelerate_reflex.svg";
import logo_arago from "@logos/arago_reflex.svg";
import logo_beeyond from "@logos/beeyond_reflex.svg";
import logo_bidtheatre from "@logos/bidtheatre_reflex.svg";
import logo_bitposter from "@logos/bitposter_reflex.svg";
import logo_blindspot from "@logos/blindspot_reflex.svg";
import logo_caasie from "@logos/caasie_reflex.svg";
import logo_delta_projects from "@logos/delta_projects_reflex.png";
import logo_displayce from "@logos/displayce_reflex.svg";
import logo_display_video_360 from "@logos/display_video_360_reflex.svg";
import logo_exte from "@logos/exte_reflex.svg";
import logo_flow_city from "@logos/flow_city_reflex.svg";
import logo_groovinads from "@logos/groovinads_reflex.svg";
import logo_hawk from "@logos/hawk_reflex.svg";
import logo_illumin from "@logos/illumin_reflex.svg";
import logo_locatrics from "@logos/locatrics_reflex.svg";
import logo_smartamath from "@logos/mediasmart_reflex.svg";
import logo_pladway from "@logos/pladway_reflex.svg";
import logo_pulsepoint from "@logos/pulsepoint_reflex.svg";
import logo_quotient from "@logos/quotient_reflex.svg";
import logo_roku from "@logos/roku_reflex.svg";
import logo_vistar from "@logos/vistar_reflex.svg";
import logo_scoota from "@logos/scoota_reflex.svg";
import logo_splicky from "@logos/splicky_reflex.svg";
import logo_stackadapt from "@logos/stackadapt_reflex.svg";
import logo_talon from "@logos/talon_reflex.svg";
import logo_taptap from "@logos/taptap_reflex.svg";
import logo_the_neuron from "@logos/the_neuron_reflex.svg";
import logo_the_trade_desk from "@logos/the_trade_desk_reflex.svg";
import logo_vicinity from "@logos/vicinity_reflex.svg";
import logo_yahoo from "@logos/yahoo_reflex.svg";

import icon_seamless from "@img/pages/dsp-partners/icon_seamless.svg";
import icon_global from "@img/pages/dsp-partners/icon_global.svg";
import icon_realtime from "@img/pages/dsp-partners/icon_realtime.svg";
import icon_comprehensive from "@img/pages/dsp-partners/icon_comprehensive.svg";

import tail from "@img/pages/dsp-partners/inventory_bubble_tail.svg";

import "@sass/pages/dsp_partners.scss";

import { Children, BroadsignPageProps } from "@types";

type InventoryBubbleProps = {
	id: string;
	image: IGatsbyImageData;
	isActive: boolean;
};

function InventoryBubble({ id, image, isActive }: InventoryBubbleProps) {
	return (
		<div className={clsx("inventory", id, { active: isActive })}>
			<h3 className="text-13 font-bold text-transform-none">{T.translate(`map.bubbles.${id}`)}</h3>
			<img className="tail" src={tail} alt="" />
			<Img image={image} className="image w-full" alt="" />
		</div>
	);
}

function MediaKitDownload() {
	const [showMediaKitModal, setShowMediaKitModal] = useState(false);
	const [isMediaKitFormSubmitted, setIsMediaKitFormSubmitted] = useState(false);
	const [hasSubmittedMediaKitForm, setHasSubmittedMediaKitForm] = useState(false);

	useEffect(() => {
		const formID = getFormID("mediaKitProgrammatic");
		const formCookie = cookie.load(`submitted-form-${formID}`);
		if (formCookie) setHasSubmittedMediaKitForm(true);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;

		if (isMediaKitFormSubmitted) {
			window.open(T.translate("mediaKitProgrammaticLink"), "_blank");
			setTimeout(() => setShowMediaKitModal(false), 8000);
		}
	}, [isMediaKitFormSubmitted]);

	if (isMediaKitFormSubmitted || hasSubmittedMediaKitForm) {
		return (
			<CTA className="primary mb-10 wrap" to={T.translate("mediaKitProgrammaticLink")}>
				{T.translate("map.cta")}
			</CTA>
		);
	}

	return (
		<>
			<CTA className="primary mb-10 wrap" onClick={() => setShowMediaKitModal(true)}>
				{T.translate("map.cta")}
			</CTA>
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
						<h2 className="text-24 text-transform-none w-full mb-8 sm:text-30">{T.translate("map.cta")}</h2>
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
		</>
	);
}

export default function DSPPartners({ pageContext: { l, dicoPath }, location: { pathname, hash, search }, data }: BroadsignPageProps) {
	const [showTalkToASpecialistFormModal, setShowTalkToASpecialistFormModal] = useState<boolean>(false);
	const [activeInventoryBubble, setActiveInventoryBubble] = useState<number>(0);

	useDico(l, dicoPath);

	useEffect(() => {}, []);

	const inventoryBubbles = ["airports", "bus_shelters", "gas_stations", "office_lobbies", "taxis", "train_stations"];

	const loopInventoryBubble = useCallback(() => setActiveInventoryBubble((prev) => loopTo("next", prev, inventoryBubbles.length)), []);

	useEffect(() => {
		const speed = 2000;
		const intervalId = setInterval(loopInventoryBubble, speed);
		return () => clearInterval(intervalId);
	}, [inventoryBubbles]);

	const icons = {
		seamless: icon_seamless,
		global: icon_global,
		realtime: icon_realtime,
		comprehensive: icon_comprehensive,
	};

	const potentialBoxes = T.texts.potential.boxes.map((box) => ({ ...box, icon: icons[box.id] }));
	const logos = [
		[logo_active_agent, logo_adelphic, logo_adform, logo_adomni, logo_adquick],
		[logo_adtheorent, logo_appcelerate, logo_arago, logo_beeyond, logo_bidtheatre],
		[logo_bitposter, logo_blindspot, logo_caasie, logo_delta_projects, logo_displayce],
		[logo_display_video_360, logo_exte, logo_flow_city, logo_groovinads],
		[logo_hawk, logo_illumin, logo_locatrics, logo_smartamath],
		[logo_pladway, logo_pulsepoint, logo_quotient, logo_roku, logo_vistar],
		[logo_scoota, logo_splicky, logo_stackadapt, logo_talon, logo_taptap],
		[logo_the_neuron, logo_the_trade_desk, logo_vicinity, logo_yahoo],
	].flat();

	return (
		<Layout id="dsp_partners" className={clsx("theme_carolina")}>
			<Container tag="section" className="hero pt-8 pb-20">
				<div className="grid align-items-stretch">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<h1 className="text-30 font-black text-transform-none mb-8 sm:text-34">{T.translate("hero.title")}</h1>
						<p className="line-height-180 mb-8">{T.translate("hero.par")}</p>
						<CTA className="primary mb-8 sm:mb-0" onClick={() => setShowTalkToASpecialistFormModal(true)}>
							{T.translate("hero.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-column justify-content-center sm:col-6">
						<Intersection className="hero_img_wrapper">
							<Img className="hero_main z-1" image={data.hero_main.childImageSharp.gatsbyImageData} alt="" />
							<Img
								className="hero_bubble hero_bubble_01 absolute z-2"
								image={data.hero_bubble_01.childImageSharp.gatsbyImageData}
								style={{ transitionDelay: "0.6s" }}
								alt=""
							/>
							<Img
								className="hero_bubble hero_bubble_02 absolute z-2"
								image={data.hero_bubble_02.childImageSharp.gatsbyImageData}
								style={{ transitionDelay: "1.2s" }}
								alt=""
							/>
							<Img
								className="hero_bubble hero_bubble_03 absolute z-2"
								image={data.hero_bubble_03.childImageSharp.gatsbyImageData}
								style={{ transitionDelay: "1.8s" }}
								alt=""
							/>
						</Intersection>
					</div>
				</div>
			</Container>
			<Container tag="section" className="potential mb-12 sm:mb-20">
				<div className="max-w-900 mx-auto">
					<h2 className="text-30 font-black text-transform-none text-center mb-8 sm:text-34">{T.translate("potential.title")}</h2>
					{potentialBoxes.map(({ id, icon, title, par }) => (
						<NeonBox className="mb-4" innerClassName="flex flex-column align-items-start pt-3 pl-3 sm:flex-row" key={id}>
							<img className="icon" src={icon} alt="" />
							<div className="flex flex-column sm:pl-2">
								<h3 className="text-20 text-transform-none sm:text-24">{title}</h3>
								<p className="line-height-180 m-0">{par}</p>
							</div>
						</NeonBox>
					))}
				</div>
			</Container>
			<Container tag="section" className="locations max-w-900">
				<div className="text-center">
					<p className="subtitle-1 gradient font-medium m-0">{T.translate("map.overtitle")}</p>
					<h2 className="text-30 font-black text-transform-none text-center mb-8 sm:text-34">{T.translate("map.title")}</h2>
					<p className="line-height-180 mb-15">{T.translate("map.par")}</p>
					<MediaKitDownload />
				</div>
				<div className="map_zone" onClick={loopInventoryBubble}>
					{inventoryBubbles.map((id, k) => (
						<InventoryBubble
							id={id}
							image={data[`inventory_${id}`].childImageSharp.gatsbyImageData}
							isActive={activeInventoryBubble === k}
							alt=""
							key={id}
						/>
					))}
					<Img image={data.map.childImageSharp.gatsbyImageData} className="map z-1" alt="" />
				</div>
			</Container>
			<Container tag="section" className="dsps mb-12 sm:mb-25">
				<div className="text-center">
					<h2 className="text-30 font-black text-transform-none text-center mb-8 sm:text-34">{T.translate("dsps.title")}</h2>
					<p className="line-height-180 mx-auto max-w-720 mb-16">{T.translate("dsps.par")}</p>
				</div>
				<Intersection className="logos">
					{logos.map((logo, k) => (
						<img className="logo" src={logo} alt="" style={{ transitionDelay: `${k * 50}ms` }} key={`logo_${k}`} />
					))}
				</Intersection>
			</Container>
			<Container tag="section" className="outmoove mb-25">
				<NeonBox>
					<div className="grid">
						<div className="col-12 flex flex-center sm:col-6 sm:flex-order-2 md:col-5">
							<Img image={data.thumb_outmoove.childImageSharp.gatsbyImageData} className="mb-4 sm:mb-0" alt="" style={{ maxWidth: "416px" }} />
						</div>
						<div className="col-12  sm:col-6 sm:flex-order-1 md:col-7">
							<h2 className="text-30 font-black text-transform-none mb-8 sm:text-34">
								{T.texts.outmoove.title[0]}
								<br />
								{T.texts.outmoove.title[1]}
							</h2>
							<p className="line-height-180 mb-8 sm:mb-15">{T.translate("outmoove.par")}</p>
							<CTA className="primary" to="outmoove">
								{T.translate("outmoove.cta")}
							</CTA>
						</div>
					</div>
				</NeonBox>
			</Container>
			<Container tag="section" className="pb-10">
				<h2 className="text-30 font-black text-transform-none text-center mb-12 sm:text-34">{T.translate("campaigns.title")}</h2>
				<Campaigns
					campaigns={["hnm", "veet", "hp", "silbo", "boehringer_ingelheim"]}
					cta={T.translate("learnMore")}
					bg="white"
					showProps={["objective", "targetStrategy", "results"]}
					showLocationProps={false}
				/>
			</Container>
			<Container tag="section" className="shin mb-20">
				<GradientBox
					variant="text_cta"
					cta={{
						label: T.translate("shin.cta"),
						preset: "primary-outline",
						hoverPreset: "full-cerulean",
						onClick: () => setShowTalkToASpecialistFormModal(true),
					}}>
					<h2 className="text-white text-30 font-bold text-transform-none mb-4 sm:text-34">{T.translate("shin.title")}</h2>
					<p className="text-white line-height-180 m-0">{T.translate("shin.par")}</p>
				</GradientBox>
			</Container>
			{showTalkToASpecialistFormModal && (
				<Modal
					show={showTalkToASpecialistFormModal}
					variant="form"
					className="theme_carolina narrow"
					onClose={() => setShowTalkToASpecialistFormModal(false)}>
					<h3 className="h4 text-reflex mb-8">{T.translate("modal.header")}</h3>
					<Form form="talkToASpecialist" redirectUrl={routeWithUtmForm("thankYou", "talk_to_a_media_specialist")} submitText="Get in Touch" />
				</Modal>
			)}
		</Layout>
	);
}

export const queryDSPPartners = graphql`
	query {
		hero_main: file(relativePath: { eq: "pages/dsp-partners/hero_main.png" }) {
			...img
		}
		hero_bubble_01: file(relativePath: { eq: "pages/dsp-partners/hero_bubble_01.png" }) {
			...img
		}
		hero_bubble_02: file(relativePath: { eq: "pages/dsp-partners/hero_bubble_02.png" }) {
			...img
		}
		hero_bubble_03: file(relativePath: { eq: "pages/dsp-partners/hero_bubble_03.png" }) {
			...img
		}

		map: file(relativePath: { eq: "pages/dsp-partners/map.png" }) {
			...img
		}
		inventory_train_stations: file(relativePath: { eq: "pages/dsp-partners/inventory_train_stations.jpg" }) {
			...img
		}
		inventory_bus_shelters: file(relativePath: { eq: "pages/dsp-partners/inventory_bus_shelters.jpg" }) {
			...img
		}
		inventory_office_lobbies: file(relativePath: { eq: "pages/dsp-partners/inventory_office_lobbies.jpg" }) {
			...img
		}
		inventory_airports: file(relativePath: { eq: "pages/dsp-partners/inventory_airports.jpg" }) {
			...img
		}
		inventory_taxis: file(relativePath: { eq: "pages/dsp-partners/inventory_taxis.jpg" }) {
			...img
		}
		inventory_gas_stations: file(relativePath: { eq: "pages/dsp-partners/inventory_gas_stations.jpg" }) {
			...img
		}

		thumb_outmoove: file(relativePath: { eq: "pages/dsp-partners/thumb_outmoove.png" }) {
			...img
		}
	}
`;
