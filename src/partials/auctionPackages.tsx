import React, { useCallback, useEffect, useMemo, useRef, useState, MutableRefObject } from "react";
import { useStaticQuery, graphql } from "gatsby";
import T from "i18n-react";
import clsx from "clsx";
import { routeWithUtmForm } from "@route";
import { filterDuplicates, iMatch } from "@annex";
import { useHubspotContact } from "@hooks/useHubspotContact";
import cookie from "react-cookies";

import AudienceSegment from "@components/AuctionPackages__AudienceSegment";
import BenefitsBoxes from "@components/AuctionPackages__BenefitsBoxes";
import Container from "@components/Container";
import Collapse from "@components/Collapse";
import CTA from "@components/CTA";
import FlippingThumbs from "@components/FlippingThumbs";
import Form, { getFormID } from "@components/Form";
import HeroCarousel from "@components/AuctionPackages__HeroCarousel";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import ClearableSelect from "@components/Form__ClearableSelect";
import SearchText from "@components/Form__SearchText";
import Link from "@components/LocalizedLink";
// import Loading from "@components/Loading";
import Modal from "@components/Modal";
// import FormHubspotCalendly from "@components/Form__HubspotCalendly";

import icon_brand_lift_study from "@img/pages/inventory-marketplace/icon_brand_lift_study.svg";
import icon_foot_traffic from "@img/pages/inventory-marketplace/icon_foot_traffic.svg";
import icon_mobile from "@img/pages/inventory-marketplace/icon_mobile.svg";
import icon_qr_code from "@img/pages/inventory-marketplace/icon_qr_code.svg";

import logo_stackadapt from "@logos/stackadapt_reflex.svg";
import logo_illumin from "@logos/illumin_reflex.svg";
import logo_yahoo from "@logos/yahoo_reflex.svg";
import logo_the_trade_desk from "@logos/the_trade_desk_reflex.svg";
import logo_pulsepoint from "@logos/pulsepoint_reflex.svg";

import "@sass/components/CalendlyForm.scss";

export function ModalTalkToASpecialist({ onClose }) {
	return (
		<Modal variant="form" className={clsx("theme_carolina", "narrow")} onClose={onClose}>
			<h3 className="h4 text-reflex mb-8">{T.translate("talkToASpecialistToday")}</h3>
			<Form form="talkToASpecialist" redirectUrl={routeWithUtmForm("thankYou", "talk_to_a_media_specialist")} />
		</Modal>
	);

	/*
	const [isHubspotFormSubmitted, setIsHubspotFormSubmitted] = useState(false);
	const [isCalendlyFormReady, setIsCalendlyFormReady] = useState(false);

	2024-09-16 - TAKING DOWN CALENDLY FORMS FOR NOW.
	return (
		<Modal
			variant="calendly"
			className={clsx("theme_carolina", { has_hubspot_form: !isHubspotFormSubmitted, has_calendly_form: isHubspotFormSubmitted })}
			onClose={onClose}>
			{!isHubspotFormSubmitted && <h3 className="h4 text-reflex mb-8">{T.translate("talkToASpecialistToday")}</h3>}
			{isHubspotFormSubmitted && !isCalendlyFormReady && (
				<div className="loading_wrapper">
					<Loading />
				</div>
			)}
			<FormHubspotCalendly
				hsForm="talkToASpecialist"
				calendlyFormUrl="https://calendly.com/d/yrk-82t-bv6/meeting-with-sdr"
				showCalendlyConditions={[["business_type", "eq", "Agency"]]}
				redirectUrl={routeWithUtmForm("thankYou", "talk_to_a_media_specialist")}
				onHubspotSubmit={() => {
					setIsHubspotFormSubmitted(true);
				}}
				onCalendlyReady={() => {
					setIsCalendlyFormReady(true);
				}}
			/>
		</Modal>
	);
	*/
}

function ModalExplorePackage({ onClose, ap }: { onClose: Function; ap: any }) {
	const [apList, setApList] = useState("");

	const hubspotContact = useHubspotContact();

	const apSlug = T.translate("apSlug");

	const updateAPList = useCallback(
		(newVal) => {
			const _a = filterDuplicates(apList.replace(/[;,]+/g, ";").split(";"));
			const _n = filterDuplicates(newVal.replace(/[;,]+/g, ";").split(";"));

			const out = Array.from(new Set([..._a, ..._n]))
				.filter(Boolean)
				.join(";")
				.replace(/^;/, "");

			if (out !== apList) setApList(out);
		},
		[apList]
	);

	const handleReady = useCallback(() => {
		const auctionPackageField = document.querySelector(".hs_auction_packages_consulted .hs-input");
		let packagesList = [auctionPackageField?.value];

		if (apSlug) {
			packagesList.push(apSlug);
		}

		if (hubspotContact && hubspotContact?.message?.properties?.auction_packages_consulted?.value) {
			packagesList.push(hubspotContact.message.properties.auction_packages_consulted.value);
		}

		updateAPList([packagesList].join(";"));
	}, [apSlug, hubspotContact, updateAPList]);

	useEffect(() => {
		if (apSlug) {
			updateAPList([apSlug].join(";"));
		}
	}, [apSlug, updateAPList]);

	useEffect(() => {
		if (hubspotContact?.message?.properties?.auction_packages_consulted?.value) {
			updateAPList([hubspotContact.message.properties.auction_packages_consulted.value].join(";"));
		}
	}, [hubspotContact, updateAPList]);

	useEffect(() => {
		if (apList.length === 0) return;

		setTimeout(() => {
			const auctionPackageField = document.querySelector(".hs_auction_packages_consulted .hs-input");

			if (auctionPackageField) {
				auctionPackageField.value = apList;
				auctionPackageField.dispatchEvent(new Event("input", { bubbles: true }));
			}
		}, 1000);
	}, [apList, apSlug]);

	return (
		<Modal variant="form" className="theme_carolina narrow" onClose={onClose}>
			<h3 className="h4 text-reflex mb-8">{T.translate("modalExplorePackage.title")}</h3>
			<Form
				form="exploreAP"
				onReady={() => handleReady()}
				redirectUrl={`https://buy.broadsign.com/auction-packages/${T.translate("apLink")}?token=${T.translate("apToken")}`}
			/>
		</Modal>
	);
}

function ModalPlaybook({ onClose }) {
	return (
		<Modal variant="playbook" className="theme_carolina" onClose={onClose}>
			<iframe src={`https://online.fliphtml5.com/abair/${T.translate("playbookLink")}`} title={T.translate("playbook.title")} />
		</Modal>
	);
}

export function Hero({ carouselBaseImage, carouselRotatingImages, variation = "normal" }) {
	const [hasSubmittedAPForm, setHasSubmittedAPForm] = useState(false);
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);
	const [showExplorePackageModal, setShowExplorePackageModal] = useState(false);
	const [showBookADemoModal, setShowBookADemoModal] = useState(false);

	useEffect(() => {
		const formID = getFormID("exploreAP");
		const formCookie = cookie.load(`submitted-form-${formID}`);

		if (formCookie) {
			setHasSubmittedAPForm(true);
		}
	}, []);

	const CTAText = variation === "ppc" ? T.translate("ppc.benefits.cta") : T.translate("benefits.screenshot.cta");

	return (
		<section className="hero bg-zircon py-10 sm:py-12">
			<Container>
				<div className="grid align-items-center">
					<div className="col-12 sm:col-6 md:pr-12">
						<p className="subtitle-1 gradient">{T.translate("hero.overtitle")}</p>
						<h1 className="mb-6">{T.translate("hero.title")}</h1>
						<p className="text-16 line-height-160 letter-spacing-5 mb-10">{T.translate("hero.blurb")}</p>
						{variation === "normal" && (
							<div className="hero_ctas flex flex-wrap align-items-center">
								<CTA
									onClick={() => setShowTalkToASpecialistModal(true)}
									preset="primary"
									hoverPreset="full-cerulean"
									className="mb-4 w-full sm:w-auto sm:mr-4">
									{T.translate("hero.ctaContact")}
								</CTA>
								{hasSubmittedAPForm ? (
									<CTA
										preset="outline-transparent"
										hoverPreset="full-cerulean"
										className="mb-4 w-full sm:w-auto"
										to={`https://buy.broadsign.com/auction-packages/${T.translate("apLink")}?token=${T.translate("apToken")}`}
										target="_blank">
										{CTAText}
									</CTA>
								) : (
									<CTA
										onClick={() => setShowExplorePackageModal(true)}
										preset="outline-transparent"
										hoverPreset="full-cerulean"
										className="mb-4 w-full sm:w-auto">
										{T.translate("hero.ctaExplore")}
									</CTA>
								)}
							</div>
						)}
						{variation === "ppc" && (
							<div className="flex flex-wrap align-items-center">
								<CTA
									onClick={() => setShowTalkToASpecialistModal(true)}
									preset="primary"
									hoverPreset="full-cerulean"
									className="mb-4 w-full sm:w-auto sm:mr-4">
									{T.translate("hero.ctaBookADemo")}
								</CTA>
							</div>
						)}
					</div>
					<div className="col-12 sm:col-6">
						<HeroCarousel baseImage={carouselBaseImage} rotatingImages={carouselRotatingImages} />
					</div>
				</div>
			</Container>
			{showTalkToASpecialistModal && <ModalTalkToASpecialist onClose={() => setShowTalkToASpecialistModal(false)} />}
			{showExplorePackageModal && <ModalExplorePackage onClose={() => setShowExplorePackageModal(false)} />}
			{showBookADemoModal && (
				<Modal variant="form" className="theme_carolina" onClose={() => setShowBookADemoModal(false)}>
					<h3 className="h4 text-reflex mb-8">{T.translate("hero.ctaBookADemo")}</h3>
					<Form form="bookDemo" redirectUrl={routeWithUtmForm("thankYou", "auction_packages_ppc_book_a_demo")} />
				</Modal>
			)}
		</section>
	);
}

export function Benefits({ screenshot, variation = "normal" }) {
	const [hasSubmittedAPForm, setHasSubmittedAPForm] = useState(false);
	const [showExplorePackageModal, setShowExplorePackageModal] = useState(false);
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);

	useEffect(() => {
		const formID = getFormID("exploreAP");
		const formCookie = cookie.load(`submitted-form-${formID}`);

		if (formCookie) {
			setHasSubmittedAPForm(true);
		}
	}, []);

	const CTAText = variation === "ppc" ? T.translate("ppc.benefits.cta") : T.translate("benefits.screenshot.cta");

	return (
		<section className="explore my-12 sm:my-20">
			<Container>
				<div className="grid">
					<div className="col-12 md:col-5">
						<div className="bg-gradient px-4 py-6 rounded-xl sm:px-8">
							<div className="max-w-600 mx-auto">
								{variation === "normal" && (
									<h2 className="text-white text-24 text-transform-none mb-8">{T.translate("benefits.screenshot.title")}</h2>
								)}
								{variation === "ppc" && (
									<h2 className="text-white text-24 text-transform-none mb-8">{T.translate("benefits.screenshot.ppcTitle")}</h2>
								)}
								<Img className="rounded-6 mb-8 w-full" image={screenshot} alt="" />
								<div className="w-full text-center">
									{hasSubmittedAPForm ? (
										<CTA
											preset="white-outline-transparent"
											hoverPreset="full-cerulean"
											to={`https://buy.broadsign.com/auction-packages/${T.translate("apLink")}?token=${T.translate("apToken")}`}
											target="_blank">
											{CTAText}
										</CTA>
									) : (
										<>
											<CTA
												preset="white-outline-transparent"
												hoverPreset="full-cerulean"
												className="__vwo_78_va"
												onClick={() => setShowExplorePackageModal(true)}>
												{CTAText}
											</CTA>
											<CTA
												preset="white-outline-transparent"
												hoverPreset="full-cerulean"
												className="__vwo_78_vb"
												onClick={() => setShowTalkToASpecialistModal(true)}>
												{T.translate("contactUs")}
											</CTA>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 md:col-7">
						<BenefitsBoxes />
					</div>
				</div>
			</Container>
			{showExplorePackageModal && <ModalExplorePackage onClose={() => setShowExplorePackageModal(false)} />}
			{showTalkToASpecialistModal && <ModalTalkToASpecialist onClose={() => setShowTalkToASpecialistModal(false)} />}
		</section>
	);
}

export function AudienceSegments() {
	const [searchSelect, setSearchSelect] = useState("");
	const [searchText, setSearchText] = useState("");
	const [visibleSegments, setVisibleSegments] = useState([]);
	const [unfoldState, setUnfoldState] = useState("untouched");
	const [unfoldSegment, setUnfoldSegment] = useState("");

	const wrapperRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;
	const listRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	const audienceCategories = useMemo(() => {
		return T.texts.audienceSegments.list.map((s) => s.category).sort();
	}, []);

	function toggleUnfold() {
		switch (unfoldState) {
			case "closed":
			case "untouched":
				setUnfoldState("open");
				break;
			case "open":
			default:
				setUnfoldState("closed");
		}
	}

	useEffect(() => {
		if (!wrapperRef.current || !listRef.current) {
			return;
		}

		function foldWrapper() {
			const timer = setInterval(() => {
				const currentHeight = wrapperRef.current.getBoundingClientRect().height;
				if (currentHeight > window.innerHeight / 2) {
					wrapperRef.current.style.height = currentHeight - 5 + "px";
				} else {
					clearInterval(timer);
				}
			}, 2);
		}

		function unfoldWrapper() {
			const listHeight = listRef.current.getBoundingClientRect().height;

			const timer = setInterval(() => {
				const currentHeight = wrapperRef.current.getBoundingClientRect().height;
				if (currentHeight < listHeight + 80) {
					wrapperRef.current.style.height = currentHeight + 5 + "px";
				} else {
					clearInterval(timer);
				}
			}, 2);
		}

		if (unfoldState === "open") {
			unfoldWrapper();
		}
		if (unfoldState === "closed") {
			foldWrapper();
		}
	}, [unfoldState]);

	useEffect(() => {
		if (!T.texts?.audienceSegments?.list) {
			return;
		}

		let out = T.texts.audienceSegments.list;

		if (searchSelect) {
			out = out.filter((item) => item.category === searchSelect);
			setUnfoldState("always_open");
			setUnfoldSegment(searchSelect);
		}

		if (searchText) {
			out = out.filter((item) => iMatch(item.category, searchText) || iMatch(item.description, searchText));
			setUnfoldState("always_open");
		}

		if (!searchSelect && !searchText && unfoldState === "always_open") {
			setUnfoldState("closed");
			setUnfoldSegment("");
		}

		setVisibleSegments(out);
	}, [searchSelect, searchText, unfoldState]);

	return (
		<section className="audience_segments mb-20">
			<Container>
				<h2 className="text-reflex text-24 font-bold text-center text-transform-none mb-10 sm:text-34 mb-10">
					{T.translate("audienceSegments.title")}
				</h2>
				<div className="grid max-w-720 mx-auto">
					<div className="col-12 sm:col-6">
						<ClearableSelect items={audienceCategories} placeholder={T.translate("category")} onChange={($value) => setSearchSelect($value)} />
					</div>
					<div className="col-12 sm:col-6">
						<SearchText placeholder={T.translate("keywords")} onChange={($value) => setSearchText($value)} />
					</div>
				</div>
				{visibleSegments.length > 0 ? (
					<>
						<div className="hidden w-full p-4 sm:flex">
							<div className="w-3 md:w-2">
								<p className="table_header">{T.translate("category")}</p>
							</div>
							<div className="w-9 sm:pl-12 md:w-10">
								<p className="table_header">{T.translate("description")}</p>
							</div>
						</div>
						<div className={clsx("audience_segments_wrapper", visibleSegments.length > 5 ? unfoldState : "always_open")} ref={wrapperRef}>
							<div className="list flex flex-column sm:flex-row sm:flex-wrap" ref={listRef}>
								{visibleSegments.map((segment, k) => (
									<AudienceSegment
										segment={segment}
										className={clsx({ "bg-zircon": k % 2 === 0, open: unfoldSegment === segment.category })}
										key={k}
									/>
								))}
							</div>
							<button className="div see_more" onClick={() => toggleUnfold()}>
								{unfoldState === "open" ? T.translate("close") : T.translate("seeMore")}
							</button>
						</div>
					</>
				) : (
					<p className="sorry text-16 line-height-140 max-w-720 mx-auto my-10 text-center">{T.translate("zeroResults")}</p>
				)}
			</Container>
		</section>
	);
}

export function Advantages({ figure }) {
	const { advantages } = T.texts;

	return (
		<Container className="advantages mt-10 mb-20">
			<div className="grid">
				<div className="col-12 flex justify-content-center md:col-6 md:flex-order-2">
					<Img className="w-full max-w-600 mb-8 md:mb-0" image={figure} objectFit="contain" alt="" />
				</div>
				<div className="col-12 md:col-6 md:pr-12 md:flex-order-1">
					<h2 className="text-reflex text-24 font-bold text-transform-none mb-6 sm:text-34 mb-10">{T.translate("advantages.title")}</h2>
					<ul className="checks_gradient">
						{advantages.list.map((item, k) => (
							<li key={k}>{item}</li>
						))}
					</ul>
				</div>
			</div>
		</Container>
	);
}

export function PlaybookCTA({ thumbs }) {
	const [showPlaybookModal, setShowPlaybookModal] = useState(false);

	return (
		<Container className="playbook mt-30 mb-14 md:mt-40 md:mb-30">
			<div className="bg-zircon rounded-xl px-5 py-8 md:px-10">
				<div className="grid">
					<div className="col-12 md:col-6 md:flex-order-2 lg:col-5">
						<FlippingThumbs className="media_kit_thumbs w-full" thumbs={thumbs} visibleQty={2} />
					</div>
					<div className="col-12 md:col-6 md:pr-12 md:flex-order-1 lg:col-7">
						<h3 className="text-reflex text-24 font-black text-transform-none mb-4 sm:text-34 md:mt-0">{T.translate("playbook.title")}</h3>
						<p className="text-reflex text-left line-height-180 mb-10 md:mb-6">{T.translate("playbook.par")}</p>
						<CTA preset="primary" hoverPreset="full-cerulean" className="" onClick={() => setShowPlaybookModal(true)}>
							{T.translate("playbook.cta")}
						</CTA>
					</div>
				</div>
			</div>
			{showPlaybookModal && <ModalPlaybook onClose={() => setShowPlaybookModal(false)} />}
		</Container>
	);
}

export function TalkToASpecialist({ title = T.translate("talkToASpecialist.title"), cta = T.translate("talkToASpecialist.cta") }) {
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);

	return (
		<Container className="mb-12 sm:mb-20">
			<div className="bg-gradient-1 rounded-xl px-5 py-8 md:px-10">
				<div className="grid">
					<div className="col-12 sm:col-6 md:col-8">
						<h3 className="text-white text-24 font-bold text-center text-transform-none sm:text-34 sm:text-left">{title}</h3>
					</div>
					<div className="col-12 flex align-items-center justify-content-center sm:col-6 sm:justify-content-end md:col-4 md:pr-12">
						<CTA
							preset="white-outline-transparent"
							hoverPreset="full-white"
							className="white-space-normal w-auto"
							onClick={() => setShowTalkToASpecialistModal(true)}>
							{cta}
						</CTA>
					</div>
				</div>
			</div>
			{showTalkToASpecialistModal && <ModalTalkToASpecialist onClose={() => setShowTalkToASpecialistModal(false)} />}
		</Container>
	);
}

export function Marketplace({ current, variant = "normal" }) {
	const data = useStaticQuery(graphql`
		query {
			automotive: file(relativePath: { eq: "pages/inventory-marketplace/inventory_automotive.png" }) {
				...img
			}
			beautyWellness: file(relativePath: { eq: "pages/inventory-marketplace/inventory_beauty_wellness.png" }) {
				...img
			}
			entertainmentMedia: file(relativePath: { eq: "pages/inventory-marketplace/inventory_entertainment_media.png" }) {
				...img
			}
			finances: file(relativePath: { eq: "pages/inventory-marketplace/inventory_finances.png" }) {
				...img
			}
			healthcarePharma: file(relativePath: { eq: "pages/inventory-marketplace/inventory_healthcare_pharma.png" }) {
				...img
			}
			cpg: file(relativePath: { eq: "pages/inventory-marketplace/inventory_cpg.png" }) {
				...img
			}
			qsr: file(relativePath: { eq: "pages/inventory-marketplace/inventory_qsr.png" }) {
				...img
			}
			retail: file(relativePath: { eq: "pages/inventory-marketplace/inventory_retail.png" }) {
				...img
			}
			sportsBetting: file(relativePath: { eq: "pages/inventory-marketplace/inventory_sports_betting.png" }) {
				...img
			}
			telco: file(relativePath: { eq: "pages/inventory-marketplace/inventory_telco.png" }) {
				...img
			}
			travelTourism: file(relativePath: { eq: "pages/inventory-marketplace/inventory_travel.png" }) {
				...img
			}
		}
	`);

	const [visibleItems, setVisibleItems] = useState<string[]>([]);

	const { inventories } = T.texts;

	const inventoryLink = useCallback(
		(inventory) => {
			function capitalize(str: string) {
				if (str.length === 0) {
					return str;
				}
				return str.charAt(0).toUpperCase() + str.slice(1);
			}

			const routePrefix = variant === "ppc" ? "inventoryPackages" : "auctionPackages";

			return routePrefix + capitalize(inventory);
		},
		[variant]
	);

	useEffect(() => {
		const shuffledArray: string[] = [...inventories].filter((item) => item !== current).sort(() => 0.5 - Math.random());
		setVisibleItems(shuffledArray.slice(0, 3));
	}, [inventories, current]);

	const backToMainPageLink = variant === "ppc" ? "inventoryPackages" : "inventoryMarketplace";

	return (
		<div className="pt-10 pb-15 sm:pt-15">
			<Container className="sm:text-center">
				<p className="subtitle-1 gradient sm:text-center sm:mx-auto">{T.translate("marketplace.overtitle")}</p>
				<h2 className="text-reflex text-24 font-bold text-transform-none sm:text-34 sm:text-center">{T.translate("marketplace.title")}</h2>
				<div className="marketplace_wrapper grid flex-nowrap justify-content-center">
					{visibleItems.map((inventory, k) => (
						<div className="marketplace_box col-10 sm:col-4" key={k}>
							<Link
								to={inventoryLink(inventory)}
								className="inventory_card bg-white flex flex-column flex-nowrap align-items-center justify-content-end h-full p-4 rounded-10 sm:px-8">
								<Img className="mb-4" image={data[inventory].childImageSharp.gatsbyImageData} alt="" />
								<h3 className="text-reflex text-20 text-transform-none mb-2">{T.translate(inventory)}</h3>
								<span className="link_cerulean_arrow text-cerulean text-13 uppercase">{T.translate("learnMore")}</span>
							</Link>
						</div>
					))}
				</div>
				<CTA to={backToMainPageLink} preset="primary" hoverPreset="full-cerulean">
					{T.translate("marketplace.cta")}
				</CTA>
			</Container>
		</div>
	);
}

export function PPC__Targeting() {
	const { list } = T.texts.ppc.targeting;

	return (
		<div className="targeting sm:py-15">
			<Container className="sm:text-center">
				<div className="grid">
					<div className="col-12 sm:col-6 md:col-5">
						<h2 className="text-reflex text-24 font-bolder text-left text-transform-none mx-auto max-w-720 mb-10 sm:text-34">
							{T.translate("ppc.targeting.title")}
						</h2>
						<p className="text-16 line-height-160 text-left letter-spacing-5 mb-10">{T.translate("ppc.targeting.par")}</p>
					</div>
					<div className="col-12 sm:col-6 md:col-offset-1">
						<div className="bg-zircon rounded-xl p-4 sm:p-8">
							<ul className="checks_gradient">
								{list.map((item, k) => (
									<li className="text-left" key={k}>
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

export function PPC__MeasureSuccess() {
	const { list } = T.texts.ppc.measureSuccess;

	const icons = {
		brand_lift_study: icon_brand_lift_study,
		foot_traffic: icon_foot_traffic,
		mobile_retargeting: icon_mobile,
		qr_code: icon_qr_code,
	};

	return (
		<div className="measure_success pt-10 pb-15 sm:pt-15">
			<Container className="">
				<div className="grid">
					<div className="col-12 sm:col-6 md:col-5">
						<h2 className="text-reflex text-24 font-bolder text-left text-transform-none mb-10 sm:text-34">
							{T.translate("ppc.measureSuccess.title")}
						</h2>
						<p className="text-16 line-height-160 mb-10">{T.translate("ppc.measureSuccess.par")}</p>
					</div>
					<div className="col-12 sm:col-6 md:col-7">
						<div className="measure_list">
							{list.map((item) => (
								<div key={item.id} className="mb-2">
									<div className="bg-zircon text-left w-full p-4 mb-3 rounded-8 sm:px-6">
										<Collapse title={item.title} icon={icons[item.id]}>
											<p className="mb-0">{item.par}</p>
										</Collapse>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default function PPC__BookDOOHCampaign({ className }: Inventory__BuildCustomPackageProps) {
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);

	const l = useL();

	return (
		<div className={clsx("InventoryBuildCustomPackage bg-gradient rounded-xl", className)}>
			<div className="grid">
				<div className="col-12 text-center sm:col-5 md:col-4">
					<img src={whirl} className="img max-w-full" alt="" />
				</div>
				<div className="col-12 sm:col-7 md:col-8">
					<div className="pt-8 pb-10 px-4 sm:pr-10">
						<h2 className="h4 text-white text-left mb-4">{T.translate("ppc.book_dooh_campaign.title")}</h2>
						<p className="text-white text-left line-height-180 mb-10 sm:mb-6">{T.translate("ppc.book_dooh_campaign.par")}</p>
						<CTA
							preset="white-outline-transparent"
							hoverPreset="full-white"
							onClick={() => setShowTalkToASpecialistModal(true)}
							className="max-w-full">
							{T.translate("ppc.book_dooh_campaign.cta")}
						</CTA>
					</div>
				</div>
			</div>
			{showTalkToASpecialistModal && <ModalTalkToASpecialist onClose={() => setShowTalkToASpecialistModal(false)} />}
		</div>
	);
}
