import React, { useCallback, useMemo, useState } from "react";
import { graphql } from "gatsby";
import { useDico } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";
import { useReducedMotion } from "@hooks/useReducedMotion";
import T from "i18n-react";
import clsx from "clsx";

import CTA from "@components/CTA";
import Container from "@components/Container";
import FlippingThumbs from "@components/FlippingThumbs";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import Quote from "@components/Quote";
import { Link as ScrollLink, scroller } from "react-scroll";
import Spynav from "@components/Spynav";
import Tuna from "@components/Tuna";
import Video from "@components/Video";

import SectionBenefits from "@components/Careers__Benefits";
import SectionDiversity from "@components/Careers__Diversity";
import SectionOfficesMap from "@components/Careers__OfficesMap";
import SectionOpenings from "@components/Careers__Openings";
import SectionValues from "@components/Careers__Values";

import award_canada_2021_en from "@img/pages/careers/award_canada_2021_en.svg";
import award_canada_2022_en from "@img/pages/careers/award_canada_2022_en.svg";
import award_canada_2023_en from "@img/pages/careers/award_canada_2023_en.svg";
import award_canada_2021_fr from "@img/pages/careers/award_canada_2021_fr.svg";
import award_canada_2022_fr from "@img/pages/careers/award_canada_2022_fr.svg";
import award_canada_2023_fr from "@img/pages/careers/award_canada_2023_fr.svg";
import award_montreal_2021_en from "@img/pages/careers/award_montreal_2021_en.svg";
import award_montreal_2022_en from "@img/pages/careers/award_montreal_2022_en.svg";
import award_montreal_2023_en from "@img/pages/careers/award_montreal_2023_en.svg";
import award_montreal_2021_fr from "@img/pages/careers/award_montreal_2021_fr.svg";
import award_montreal_2022_fr from "@img/pages/careers/award_montreal_2022_fr.svg";
import award_montreal_2023_fr from "@img/pages/careers/award_montreal_2023_fr.svg";

import stars from "@img/pages/careers/stars.svg";
import logo_glassdoor from "@logos/glassdoor.svg";
import icon_work_with_us from "@img/pages/careers/icon_work_with_us.svg";

import "@sass/pages/careers.scss";

import type { BroadsignPageProps } from "@types";

type FAQProps = { q: string; a: string };

interface containsQuotes extends Object {
	quotes?: object[];
}

type CareersPageSections = {
	mission_statement: object;
	locations: object;
	awards: object;
	values: object;
	benefits: object;
	openings: object;
	right_place: object;
	faq: object;
};

function FAQCollapse({ q = "", a = "" }: FAQProps) {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className={clsx("qa", isActive ? "active" : "")}>
			<p
				className="q text-ash"
				onClick={() => {
					setIsActive(!isActive);
				}}>
				<span className="unfold">
					<span className="line h"></span>
					<span className="line v"></span>
				</span>
				{q}
			</p>
			<p className="a text-ash">{a}</p>
		</div>
	);
}

export default function CareersPage({ pageContext: { l, dicoPath }, location: { pathname }, data }: BroadsignPageProps) {
	const [showCulturePlaybookModal, setShowCulturePlaybookModal] = useState<boolean>(false);
	const [clickedCountryOnMap, setClickedCountryOnMap] = useState<string>("");

	useDico(l, dicoPath);

	const prefersReducedMotion = useReducedMotion();
	const quotesLocations = ((T.texts as any).locations as containsQuotes).quotes;
	const faq = (T.texts as any).faq.list;

	const scrollToOpeningsWithCountry = useCallback((countryName) => {
		if (countryName) {
			setClickedCountryOnMap(countryName);
			scroller.scrollTo("openings", { duration: 1000, offset: -80, smooth: true });
		}
	}, []);

	const culturePlaybookThumbs = useMemo(
		() => [
			data[`culture_playbook_${l}_01`].childImageSharp.gatsbyImageData,
			data[`culture_playbook_${l}_02`].childImageSharp.gatsbyImageData,
			data[`culture_playbook_${l}_03`].childImageSharp.gatsbyImageData,
			data[`culture_playbook_${l}_01`].childImageSharp.gatsbyImageData,
			data[`culture_playbook_${l}_02`].childImageSharp.gatsbyImageData,
			data[`culture_playbook_${l}_03`].childImageSharp.gatsbyImageData,
		],
		[data, l]
	);

	return (
		<Layout id="careers" className="theme_carolina">
			<Spynav sections={T.texts.spylinks} defaultValue="mission_statement"></Spynav>
			<div className="Hero">
				<div className="blur blur1 z-1"></div>
				<div className="blur blur2 z-1"></div>
				<Container className="z-10">
					<div className="grid">
						<div className="col-12 mb-10 md:col-6 md:mb-0">
							<h1 className="uppercase mx-auto md:mx-0">{T.translate("Hero.title")}</h1>
							<p className="tagline mx-auto md:mx-0">{T.translate("Hero.tagline")}</p>
							<ScrollLink to={"openings"} spy={false} smooth={true} duration={1000} offset={-80} className="CTA pill mx-auto md:mx-0">
								{T.translate("Hero.cta")}
							</ScrollLink>
						</div>
						<div className="col-12 flex flex-column justify-content-center md:col-6">
							<Video YoutubeID="teD1zVni3mw" poster={data.video_poster_hero.childImageSharp.gatsbyImageData} playBtnStyle="gradient_blue" />
							<p className="text-white text-12 letter-spacing-5 text-center line-height-180 mt-3 sm:mb-0 w-full">
								{T.translate("Hero.videoBlurb")}
							</p>
						</div>
					</div>
				</Container>
			</div>
			<section className="container mission_statement spyable pt-20">
				<div className="grid">
					<div className="col-12 sm:col-6 sm:flex-order-2 sm:pl-8">
						<p className="subtitle-1 gradient">{T.translate("mission_statement.overtitle")}</p>
						<h2 className="h4">{T.translate("mission_statement.title")}</h2>
						<p className="line-height-180 mb-8">{T.translate("mission_statement.par1")}</p>
						<p className="line-height-180 mb-8">{T.translate("mission_statement.par2")}</p>
						<CTA className="primary mb-12" to="whoWeAre">
							{T.translate("mission_statement.know_us")}
						</CTA>
					</div>
					<div className="col-12 sm:col-6 sm:flex-order-1 sm:pr-8">
						<Video
							file="careers_mission_statement.mp4"
							poster={data.video_poster_mission_statement.childImageSharp.gatsbyImageData}
							playBtnStyle="none"
						/>
					</div>
				</div>
			</section>
			<Container className="locations spyable pt-30">
				<p className="subtitle-1 gradient">{T.translate("locations.overtitle")}</p>
				<h2 className="h4">{T.translate("locations.title")}</h2>
				<p className="intro line-height-180">{T.translate("locations.par")}</p>
				<SectionOfficesMap
					onClickCountryDropPin={(evt) => {
						scrollToOpeningsWithCountry(evt);
					}}
				/>
				<Quote quotes={quotesLocations} />
				<div className="work_with_us bg-zircon p-8 rounded-xl">
					<img alt="" src={icon_work_with_us} className="icon" />
					<p>{T.translate("locations.panel.par")}</p>
					<CTA className="primary" onClick={() => scrollTo("openings")}>
						{T.translate("locations.panel.cta")}
					</CTA>
				</div>
			</Container>
			<Container className="culture_playbook">
				<div className="bg-gradient-1 rounded-xl px-5 py-8 md:px-10">
					<div className="grid">
						<div className="col-12 md:col-6 md:flex-order-2">
							<FlippingThumbs className="media_kit_thumbs w-full" visibleQty={3} thumbs={culturePlaybookThumbs} />
						</div>
						<div className="col-12 md:col-6 sm:text-center md:text-left md:flex-order-1">
							<h3 className="text-white text-20 font-bold text-transform-none mb-8 sm:mx-auto sm:text-34 md:mx-0">
								{T.translate("culturePlaybook.title")}
							</h3>
							<CTA
								className="wrap"
								preset="white-outline-transparent"
								hoverPreset="outline-reflex"
								onClick={() => setShowCulturePlaybookModal(true)}>
								{T.translate("culturePlaybook.cta")}
							</CTA>
						</div>
					</div>
				</div>
			</Container>
			<section className="container awards spyable mb-20">
				<div className="bg-gradient rounded-xl px-4 py-8 sm:px-10 sm:py-12">
					<div className="grid">
						<div className="col-12 sm:col-6 md:col-5">
							<h2 className="text-34 text-white text-transform-none mb-8">{T.translate("awards.title")}</h2>
							<p className="text-16 text-white line-height-160 sm:m-0">{T.translate("awards.par")}</p>
						</div>
						<div className="col-12 sm:col-6 md:col-7">
							<div className="awards_images flex flex-row flex-wrap align-items-stretch justify-content-center w-full md:flex-nowrap md:h-full">
								<div className="awards_row awards_canada align_right w-full md:w-6">
									<img src={award_canada_2021_en} className="badge year_2021 anim_step_1 en" alt="" />
									<img src={award_canada_2022_en} className="badge year_2022 anim_step_2 en" alt="" />
									<img src={award_canada_2023_en} className="badge year_2023 anim_step_3 en" alt="" />
									<img src={award_canada_2021_fr} className="badge year_2021 anim_step_1 fr" alt="" />
									<img src={award_canada_2022_fr} className="badge year_2022 anim_step_2 fr" alt="" />
									<img src={award_canada_2023_fr} className="badge year_2023 anim_step_3 fr" alt="" />
								</div>
								<div className="awards_row awards_montreal align_left w-full md:w-6">
									<img src={award_montreal_2021_en} className="badge year_2021 anim_step_1 en" alt="" />
									<img src={award_montreal_2022_en} className="badge year_2022 anim_step_2 en" alt="" />
									<img src={award_montreal_2023_en} className="badge year_2023 anim_step_3 en" alt="" />
									<img src={award_montreal_2021_fr} className="badge year_2021 anim_step_1 fr" alt="" />
									<img src={award_montreal_2022_fr} className="badge year_2022 anim_step_2 fr" alt="" />
									<img src={award_montreal_2023_fr} className="badge year_2023 anim_step_3 fr" alt="" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="container values spyable bg-white z-100">
				<SectionValues />
				<SectionDiversity />
				<Link
					className="glassdoor bg-zircon rounded-xl my-15 py-8 pr-8 pl-12 flex flex-row flex-wrap sm:flex-nowrap"
					to="https://www.glassdoor.ca/Reviews/Broadsign-Reviews-E313608.htm">
					<img src={logo_glassdoor} className="logo_glassdoor" alt="Glassdoor's logo" />
					<div className="careers_stars flex align-items-center">
						<img src={stars} alt="Score: 4.3" className="stars_img w-full" />
					</div>
					<div className="description text-left sm:flex sm:flex-column sm:align-items-center sm:justify-content-center">
						<span className="block my-6 text-reflex font-black text-20 sm:text-24 sm:text-center sm:mt-0 sm:mb-4">
							{T.translate("glassdoor.par1")}
						</span>
						<span className="block text-cerulean text-13 arrow">{T.translate("glassdoor.par2")}</span>
					</div>
				</Link>
			</section>
			<SectionBenefits data={data} prefersReducedMotion={prefersReducedMotion} />
			<Container tag="section" className="quote_training mb-25">
				<Quote quotes={T.texts.training.quote} />
			</Container>
			<section id="openings" className="container openings spyable bg-white z-100">
				<SectionOpenings preselectLocation={clickedCountryOnMap} />
			</section>
			<section className="right_place">
				<div className="text-center">
					<p className="subtitle-1 gradient">{T.translate("right_place.overtitle")}</p>
					<h2 className="h4">{T.translate("right_place.title")}</h2>
				</div>
				<Container className="hidden md:block">
					<div className="tuna_wrapper grid">
						<div className="col-12 sm:col-4">
							<Tuna shift={-90}>
								<Video
									file="careers_impressions_liseanne.mp4"
									poster={data.right_place_tb_01.childImageSharp.gatsbyImageData}
									playBtnStyle="none"
								/>
							</Tuna>
						</div>
						<div className="col-12 sm:col-4">
							<Tuna shift={-80}>
								<Video
									file="careers_impressions_danny.mp4"
									poster={data.right_place_tb_02.childImageSharp.gatsbyImageData}
									playBtnStyle="none"
								/>
							</Tuna>
						</div>
						<div className="col-12 sm:col-4">
							<Tuna shift={-70}>
								<Video
									file="careers_impressions_kayla.mp4"
									poster={data.right_place_tb_03.childImageSharp.gatsbyImageData}
									playBtnStyle="none"
								/>
							</Tuna>
						</div>
					</div>
				</Container>
				<Container className="block md:hidden">
					<div className="Grid">
						<div className="wrapper">
							<div className="box">
								<Video
									file="careers_impressions_liseanne.mp4"
									poster={data.right_place_tb_01.childImageSharp.gatsbyImageData}
									playBtnStyle="none"
								/>
							</div>
							<div className="box">
								<Video
									file="careers_impressions_danny.mp4"
									poster={data.right_place_tb_02.childImageSharp.gatsbyImageData}
									playBtnStyle="none"
								/>
							</div>
							<div className="box">
								<Video
									file="careers_impressions_kayla.mp4"
									poster={data.right_place_tb_03.childImageSharp.gatsbyImageData}
									playBtnStyle="none"
								/>
							</div>
						</div>
					</div>
				</Container>
			</section>

			<section className="container faq spyable">
				<h2 className="h4">{T.translate("faq.title")}</h2>
				{faq.map((el, k) => (
					<FAQCollapse q={el.q} a={el.a} key={k} />
				))}
			</section>
			<Modal show={showCulturePlaybookModal} variant="playbook" onClose={() => setShowCulturePlaybookModal(false)}>
				<iframe
					src={`https://online.fliphtml5.com/abair/${T.translate("culturePlaybook.playbookLink")}`}
					title={T.translate("culturePlaybook.title")}
					allowFullScreen
				/>
			</Modal>
		</Layout>
	);
}

export const queryIndex = graphql`
	query CareersImages {
		video_poster_hero: file(relativePath: { eq: "pages/careers/video_poster_hero.jpg" }) {
			...img
		}
		video_poster_mission_statement: file(relativePath: { eq: "pages/careers/video_poster_mission_statement.jpg" }) {
			...img
		}
		video_poster_right_place_01: file(relativePath: { eq: "pages/careers/video_poster_right_place_01.jpg" }) {
			...img
		}
		video_poster_right_place_02: file(relativePath: { eq: "pages/careers/video_poster_right_place_02.jpg" }) {
			...img
		}
		video_poster_right_place_03: file(relativePath: { eq: "pages/careers/video_poster_right_place_03.jpg" }) {
			...img
		}

		locations_map_mobile: file(relativePath: { eq: "pages/careers/map_mobile.png" }) {
			...img
		}

		benefits_tb_01: file(relativePath: { eq: "pages/careers/benefits_tb_01.png" }) {
			...img
		}
		benefits_tb_02: file(relativePath: { eq: "pages/careers/benefits_tb_02.png" }) {
			...img
		}
		benefits_tb_03: file(relativePath: { eq: "pages/careers/benefits_tb_03.png" }) {
			...img
		}

		right_place_tb_01: file(relativePath: { eq: "pages/careers/right_place_video_01_tb.jpg" }) {
			...img
		}
		right_place_tb_02: file(relativePath: { eq: "pages/careers/right_place_video_02_tb.jpg" }) {
			...img
		}
		right_place_tb_03: file(relativePath: { eq: "pages/careers/right_place_video_03_tb.jpg" }) {
			...img
		}

		culture_playbook_en_01: file(relativePath: { eq: "pages/careers/culture_playbook_en_01.png" }) {
			...img
		}
		culture_playbook_en_02: file(relativePath: { eq: "pages/careers/culture_playbook_en_02.png" }) {
			...img
		}
		culture_playbook_en_03: file(relativePath: { eq: "pages/careers/culture_playbook_en_03.png" }) {
			...img
		}
		culture_playbook_fr_01: file(relativePath: { eq: "pages/careers/culture_playbook_fr_01.png" }) {
			...img
		}
		culture_playbook_fr_02: file(relativePath: { eq: "pages/careers/culture_playbook_fr_02.png" }) {
			...img
		}
		culture_playbook_fr_03: file(relativePath: { eq: "pages/careers/culture_playbook_fr_03.png" }) {
			...img
		}
	}
`;
