import React, { useCallback, useEffect, useRef, useState, MutableRefObject } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { useScreen } from "@hooks/useScreen";
import { routeWithUtmForm } from "@route";
import clsx from "clsx";

import AudiencesFlySquares from "@components/AudiencesFlySquares";
import GradientBox from "@components/GradientBox";
import Layout from "@components/layout";
import CTA from "@components/CTA";
import Container from "@components/Container";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Modal from "@components/Modal";

import hero from "@img/pages/audiences/hero.svg";
import hero_magnifying_glass from "@img/pages/audiences/hero_magnifying_glass.svg";
import img_mobile_hand from "@img/pages/audiences/mobile_hand.svg";
import how_it_works_01 from "@img/pages/audiences/how_it_works_01.svg";
import how_it_works_01_anim from "@img/pages/audiences/how_it_works_01_anim.svg";
import how_it_works_02 from "@img/pages/audiences/how_it_works_02.svg";
import how_it_works_04 from "@img/pages/audiences/how_it_works_04.svg";

import icon_targeting_groups_age from "@img/pages/audiences/icon_targeting_groups_age.svg";
import icon_targeting_groups_income from "@img/pages/audiences/icon_targeting_groups_income.svg";
import icon_targeting_groups_interest from "@img/pages/audiences/icon_targeting_groups_interest.svg";
import icon_targeting_groups_stage from "@img/pages/audiences/icon_targeting_groups_stage.svg";
import icon_targeting_groups_intent from "@img/pages/audiences/icon_targeting_groups_intent.svg";
import icon_targeting_groups_gender from "@img/pages/audiences/icon_targeting_groups_gender.svg";
import icon_personas_music from "@img/pages/audiences/icon_personas_music.svg";
import icon_personas_movie from "@img/pages/audiences/icon_personas_movie.svg";
import icon_personas_business from "@img/pages/audiences/icon_personas_business.svg";
import icon_personas_dining from "@img/pages/audiences/icon_personas_dining.svg";
import icon_personas_parents from "@img/pages/audiences/icon_personas_parents.svg";
import icon_personas_shoppers from "@img/pages/audiences/icon_personas_shoppers.svg";

import "@sass/pages/audiences.scss";

import type { BroadsignPageProps } from "@types";
type TargetingGroupProps = { title: string; list: any[] };

function TargetingGroup({ title, list }: TargetingGroupProps) {
	const [items, setItems] = useState(list.map((item, k) => ({ ...item, order: k })));

	const screen = useScreen();

	const moveFirstItem = useCallback(() => {
		if (screen === "xs") {
			const newItemsOrder = items.map((item) => {
				if (item.order === 0) {
					item.order = items.length - 1;
				} else {
					item.order -= 1;
				}
				return item;
			});

			setItems(newItemsOrder);
		}
	}, [items, screen]);

	useEffect(() => {
		const intervalId = setInterval(moveFirstItem, 3000);
		return () => clearInterval(intervalId);
	}, [moveFirstItem]);

	return (
		<div className="targeting_groups_panel bg-zircon pt-6 pb-6 px-8 mb-4 md:px-6 md:rounded-xl">
			<p className="subtitle-1 gradient mx-auto mb-8 md:mx-0 md:mb-4">{title}</p>
			<div className="grid">
				{items.map(({ label, icon, order }, k) => (
					<div
						className={`col-4 flex flex-column flex-nowrap align-items-center sm:col-2 md:col-6 md:flex-row ${order === 0 ? "shrink" : ""}`}
						style={{ order: order }}
						key={k}>
						<img src={icon} className="targeting_groups_icon mb-2 md:mb-0 md:mr-3" alt="" />
						<p className="text-14 text-center m-0 md:text-16 md:text-left">{label}</p>
					</div>
				))}
			</div>
		</div>
	);
}

function AudiencesHeroContent({ data, className }) {
	return (
		<div className={clsx("w-full mx-auto", className)} id={className.match("zoomed") ? "magnifying_glass_lens" : ""}>
			<Container>
				<div className="pt-8 pb-12 sm:py-25">
					<div className="grid justify-content-between">
						<div className="zoom_me zoom_left col-12 flex flex-column align-items-start justify-content-center sm:col-5">
							<h1 className="text-reflex font-superbold line-height-100 mb-8 mt-10 sm:mt-0">{T.translate("Hero.title")}</h1>
							<p className="tagline text-reflex text-16 line-height-180 mb-10">{T.translate("Hero.tagline")}</p>
							<CTA to="bookDemo" className="primary mb-13 sm:mb-0">
								{T.translate("Hero.cta")}
							</CTA>
						</div>
						<div className="zoom_me zoom_right col-12 flex flex-center sm:col-6">
							<Img image={data.hero.childImageSharp.gatsbyImageData} alt="" className="hero_static w-full mx-auto" objectFit="contain" />
							<img alt="" src={hero} className="hero_dynamic" />
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

function AudiencesHero({ data }) {
	const [isFocused, setIsFocused] = useState(false);

	const selfRef: React.MutableRefObject<HTMLElement | null> = useRef(null) as unknown as MutableRefObject<HTMLElement>;
	const magnifyingGlassRef: React.MutableRefObject<HTMLElement | null> = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	const moveMagnifyingGlass = useCallback(
		(evt: React.MouseEvent) => {
			if (!selfRef.current || !magnifyingGlassRef.current) {
				return;
			}

			const lens = document.querySelector("#magnifying_glass_lens");

			if (!lens) {
				return;
			}

			const rect = selfRef.current.getBoundingClientRect();

			const offsetX = Math.round(evt.clientX - rect.left);
			const offsetY = Math.round(evt.clientY - rect.top);
			let glassRadius = 230;

			magnifyingGlassRef.current.style.left = `${offsetX - glassRadius / 2}px`;
			magnifyingGlassRef.current.style.top = `${offsetY - glassRadius / 2}px`;
			lens.style.clipPath = `circle(${glassRadius / 2 - 5}px at ${offsetX + 6}px ${offsetY + 6}px)`;
		},
		[magnifyingGlassRef]
	);

	return (
		<section
			className={clsx("hero bg-zircon flex align-items-center", { is_focused: isFocused })}
			ref={selfRef}
			onMouseMove={(evt) => moveMagnifyingGlass(evt)}
			onMouseEnter={() => setIsFocused(true)}
			onMouseLeave={() => setIsFocused(false)}>
			<AudiencesHeroContent data={data} className="normal" />
			<AudiencesHeroContent data={data} className="zoomed" />
			<img alt="" src={hero_magnifying_glass} className="hero_magnifying_glass" ref={magnifyingGlassRef} />
		</section>
	);
}

export default function AudiencesPage({ pageContext: { l, dicoPath }, data }: BroadsignPageProps) {
	const [showContactUsModal, setShowContactUsModal] = useState(false);

	useDico(l, dicoPath);

	const targetingGroups = [
		{ label: T.translate("targetingGroups.age"), icon: icon_targeting_groups_age },
		{ label: T.translate("targetingGroups.stage"), icon: icon_targeting_groups_stage },
		{ label: T.translate("targetingGroups.income"), icon: icon_targeting_groups_income },
		{ label: T.translate("targetingGroups.intent"), icon: icon_targeting_groups_intent },
		{ label: T.translate("targetingGroups.interest"), icon: icon_targeting_groups_interest },
		{ label: T.translate("targetingGroups.gender"), icon: icon_targeting_groups_gender },
	];

	const personas = [
		{ label: T.translate("personas.music"), icon: icon_personas_music },
		{ label: T.translate("personas.dining"), icon: icon_personas_dining },
		{ label: T.translate("personas.movie"), icon: icon_personas_movie },
		{ label: T.translate("personas.parents"), icon: icon_personas_parents },
		{ label: T.translate("personas.business"), icon: icon_personas_business },
		{ label: T.translate("personas.shoppers"), icon: icon_personas_shoppers },
	];

	return (
		<Layout id="audiences" className="broadsign_ads theme_carolina">
			<AudiencesHero data={data} />
			<section className="audiences_mobile_data">
				<Container className="py-15 sm:py-25">
					<div className="bg-gradient rounded-xl overflow-hidden md:overflow-visible">
						<div className="grid">
							<div className="col-12 flex flex-column justify-content-center align-self-center sm:col-7 sm:flex-order-2">
								<div className="p-8 sm:mb-10 sm:my-auto sm:py-8 sm:pr-14 sm:pl-0">
									<h3 className="h4 text-white font-bold mb-6">{T.translate("deliver.title")}</h3>
									<p className="text-white line-height-180 mb-0">{T.translate("deliver.par")}</p>
								</div>
							</div>
							<div className="col-12 flex flex-column justify-content-end align-self-end py-0 sm:col-5 sm:flex-order-1">
								<AudiencesFlySquares img={img_mobile_hand} className="audiences_mobile_hand" />
							</div>
						</div>
					</div>
				</Container>
			</section>
			<Container className="text-left sm:text-center sm:mb-15">
				<p className="subtitle-1 gradient mb-2">{T.translate("howItWorksOvertitle")}</p>
				<h2 className="h4 font-black max-w-720 sm:mx-auto">{T.translate("howItWorksTitle")}</h2>
			</Container>
			<Container className="hiw hiw_01 mb-6 md:mb-15">
				<div className="grid">
					<div className="col-12 flex flex-center sm:col-6 sm:flex-order-2">
						<img alt="" src={how_it_works_01} className="hiw_01_img w-full my-8 sm:w-10" />
						<img alt="" src={how_it_works_01_anim} className="hiw_01_img_anim w-full my-8 sm:w-10" loading="lazy" />
					</div>
					<div className="col-12 flex flex-column justify-content-center sm:col-6 sm:flex-order-1">
						<h3 className="text-16 font-bold text-transform-none mb-5 sm:text-24">{T.translate("howItWorks01.title")}</h3>
						{T.translate("howItWorks01.par")}
					</div>
				</div>
			</Container>
			<Container className="hiw mb-6 md:mb-10">
				<div className="grid">
					<div className="col-12 flex flex-center sm:col-6">
						<AudiencesFlySquares img={how_it_works_02} className="hiw_02_img audiences_mobile my-8" />
					</div>
					<div className="col-12 flex flex-column justify-content-center sm:col-6">
						<h3 className="text-16 font-bold text-transform-none mb-5 sm:text-24">{T.translate("howItWorks02.title")}</h3>
						{T.translate("howItWorks02.par")}
					</div>
				</div>
			</Container>
			<Container className="hiw section_targeting_groups mb-12">
				<div className="grid">
					<div className="col-12 flex flex-column justify-content-center md:col-6">
						<h3 className="text-16 font-bold text-transform-none mb-5 sm:text-24">{T.translate("howItWorks03.title")}</h3>
						{T.translate("howItWorks03.par")}
					</div>
					<div className="col-12 md:col-6">
						<TargetingGroup title={T.translate("targetingGroups.title")} list={targetingGroups} />
						<TargetingGroup title={T.translate("personas.title")} list={personas} />
					</div>
				</div>
			</Container>
			<Container className="hiw mb-4">
				<div className="grid">
					<div className="col-12 flex flex-center sm:col-6">
						<div className="hiw_04_img w-full -mt-8 sm:my-8">
							<img alt="" src={how_it_works_04} className="hiw_04_img w-full" />
						</div>
					</div>
					<div className="col-12 flex flex-column justify-content-center sm:col-6">
						<h3 className="text-16 font-bold text-transform-none mb-5 sm:text-24">{T.translate("howItWorks04.title")}</h3>
						{T.translate("howItWorks04.par")}
					</div>
				</div>
			</Container>
			<Container className="mt-22 mb-16 sm:mb-35">
				<GradientBox cta={{ label: T.translate("shin.cta"), onClick: () => setShowContactUsModal(true) }} variant="text_cta">
					<h3 className="h4 text-white mb-3">{T.translate("shin.title")}</h3>
					<p className="text-white m-0">{T.translate("shin.par")}</p>
				</GradientBox>
			</Container>
			{showContactUsModal && (
				<Modal variant="form" className="theme_carolina narrow" onClose={() => setShowContactUsModal(false)}>
					<h3 className="h4 text-reflex mb-4">{T.translate("letsConnectModal.title")}</h3>
					<p className="text-reflex text-16 mb-8">{T.translate("letsConnectModal.par")}</p>
					<Form
						form="letsConnect"
						campaign="broadsignAdsLetsConnect"
						submitText="Get in touch"
						redirectUrl={routeWithUtmForm("thankYou", "lets_connect_broadsign_ads")}
					/>
				</Modal>
			)}
		</Layout>
	);
}

export const queryBroadsignAds = graphql`
	query AudiencesImages {
		hero: file(relativePath: { eq: "pages/audiences/hero.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
