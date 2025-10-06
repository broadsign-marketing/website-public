/* eslint-disable indent */
import React, { memo, useCallback, useEffect, useMemo, useRef, useState, MutableRefObject } from "react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import T from "i18n-react";
import { useScreen } from "@hooks/useScreen";
import { useHubspotContact } from "@hooks/useHubspotContact";
import { routeWithUtmForm } from "@route";
import { filterDuplicates } from "@annex";
import clsx from "clsx";
import cookie from "react-cookies";

import Container from "@components/Container";
import CTA from "@components/CTA";
import Form from "@components/Form";
import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";
import { getFormID } from "@components/Form";
import Link from "@components/LocalizedLink";
import FAQCollapse from "@components/FAQCollapse";
import Modal from "@components/Modal";
import FormLetsConnectVWO40VB from "@components/Form__LetsConnectVWO_Test40_VersionB";

import arrow_right from "@img/ui/arrow_right_slim_white.svg";
import green_check from "@img/ui/check_circle_green.svg";

type AuctionPackageProps = {
	slug: string;
	title: string;
	linkID: string;
	token: string;
	link?: string;
	image?: IGatsbyImageData;
};

type BillboardTypeProps = {
	name: string;
	avgCPM: string;
	dailyImpressions: string;
	commonSizing: string[];
};

type BillboardTypesContentProps = {
	title: string;
	types: BillboardTypeProps[];
};

type BillboardTypesProps = {
	content: BillboardTypesContentProps;
	gridCols?: number;
};
type ExploreMoreMarketsProps = {
	currentCity?: string;
	variation?: string;
	ctaBox?: boolean;
};

type TopPackageCardProps = {
	image: IGatsbyImageData;
	title: string;
	to: string;
	onClick?: Function;
};

type TopPackageItemProps = {
	slug: string;
	linkID: string;
	token: string;
};

/**
 * This is basically the same as :
 * import { ModalTalkToASpecialist } from "@partials/auctionPackages";
 * except that we ditached it because we wanted that form on city-based
 * pages to have a vB in VWO.
 */
export function ModalTalkToASpecialist({ onClose }) {
	return (
		<Modal variant="form" className={clsx("theme_carolina narrow")} onClose={onClose}>
			<div className="__vwo_40_va">
				<h3 className="h4 text-reflex mb-8">{T.translate("talkToASpecialistToday")}</h3>
				<Form form="talkToASpecialist" redirectUrl={routeWithUtmForm("thankYou", "talk_to_a_media_specialist")} />
			</div>
			<div className="__vwo_40_vb">
				<FormLetsConnectVWO40VB />
			</div>
		</Modal>
	);
}

/**
 * This is basically the same as :
 * import { TalkToASpecialist } from "@partials/auctionPackages";
 * except that we ditached it because we wanted that form on city-based
 * pages to have a vB in VWO.
 */
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

export function Library() {
	return useStaticQuery(graphql`
		query {
			automotive: file(relativePath: { eq: "pages/inventory-marketplace/inventory_automotive.png" }) {
				...imgW500
			}
			beautyWellness: file(relativePath: { eq: "pages/inventory-marketplace/inventory_beauty_wellness.png" }) {
				...imgW500
			}
			entertainmentMedia: file(relativePath: { eq: "pages/inventory-marketplace/inventory_entertainment_media.png" }) {
				...imgW500
			}
			finances: file(relativePath: { eq: "pages/inventory-marketplace/inventory_finances.png" }) {
				...imgW500
			}
			healthcarePharma: file(relativePath: { eq: "pages/inventory-marketplace/inventory_healthcare_pharma.png" }) {
				...imgW500
			}
			cpg: file(relativePath: { eq: "pages/inventory-marketplace/inventory_cpg.png" }) {
				...imgW500
			}
			qsr: file(relativePath: { eq: "pages/inventory-marketplace/inventory_qsr.png" }) {
				...imgW500
			}
			retail: file(relativePath: { eq: "pages/inventory-marketplace/inventory_retail.png" }) {
				...imgW500
			}
			sportsBetting: file(relativePath: { eq: "pages/inventory-marketplace/inventory_sports_betting.png" }) {
				...imgW500
			}
			telco: file(relativePath: { eq: "pages/inventory-marketplace/inventory_telco.png" }) {
				...imgW500
			}
			travelTourism: file(relativePath: { eq: "pages/inventory-marketplace/inventory_travel.png" }) {
				...imgW500
			}

			chicago: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_chicago.jpg" }) {
				...imgW500
			}
			los_angeles: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_los_angeles.jpg" }) {
				...imgW500
			}
			montreal: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_montreal.jpg" }) {
				...imgW500
			}
			new_york_city: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_new_york_city.jpg" }) {
				...imgW500
			}
			philadelphia: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_philadelphia.jpg" }) {
				...imgW500
			}
			toronto: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_toronto.jpg" }) {
				...imgW500
			}
			vancouver: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_vancouver.jpg" }) {
				...imgW500
			}

			chicago_wide: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_chicago_wide.jpg" }) {
				...imgW500
			}
			los_angeles_wide: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_los_angeles_wide.jpg" }) {
				...imgW500
			}
			montreal_wide: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_montreal_wide.jpg" }) {
				...imgW500
			}
			new_york_city_wide: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_new_york_city_wide.jpg" }) {
				...imgW500
			}
			philadelphia_wide: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_philadelphia_wide.jpg" }) {
				...imgW500
			}
			toronto_wide: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_toronto_wide.jpg" }) {
				...imgW500
			}
			vancouver_wide: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_vancouver_wide.jpg" }) {
				...imgW500
			}
		}
	`);
}

export function Hero({ content, image }) {
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);
	const [showExplorePackageModal, setShowExplorePackageModal] = useState(false);
	const [hasSubmittedAPForm, setHasSubmittedAPForm] = useState<boolean>(false);

	const { overtitle, title, blurb, ctaLaunchCampaign, ctaExplore } = content;

	const ap = {
		linkID: T.translate("apLink"),
		slug: T.translate("apSlug"),
		title: T.translate("hero.title"),
		token: T.translate("apToken"),
		link: `https://buy.broadsign.com/auction-packages/${T.translate("apLink")}?token=${T.translate("apToken")}`,
	};

	useEffect(() => {
		const formID = getFormID("exploreAP");
		const formCookie = cookie.load(`submitted-form-${formID}`);

		if (formCookie) {
			setHasSubmittedAPForm(true);
		}
	}, []);

	return (
		<Container tag="section" className="hero mb-12 sm:mb-20">
			<div className="grid">
				<div className="col-12 sm:col-6 sm:flex-order-2">
					<Img className="hero_img" image={image} loading="eager" alt="" />
				</div>
				<div className="col-12 sm:col-6 sm:flex-order-1">
					<p className="subtitle-1 gradient sm:mt-12">{overtitle}</p>
					<h1 className="text-transform-none mb-6">{title}</h1>
					{blurb.map((par, k) => (
						<p className="text-16 line-height-160 letter-spacing-5 sm:pr-8" key={k}>
							{par}
						</p>
					))}
					<div className="hero_ctas flex flex-wrap align-items-center mt-10">
						{ctaLaunchCampaign && (
							<CTA
								onClick={() => setShowTalkToASpecialistModal(true)}
								preset="primary"
								hoverPreset="full-cerulean"
								className="mb-2 w-full sm:w-auto sm:mr-4">
								{ctaLaunchCampaign}
							</CTA>
						)}
						{ctaExplore && !hasSubmittedAPForm && (
							<CTA
								id="explore_inventory_cta"
								onClick={() => setShowExplorePackageModal(true)}
								preset="outline-transparent"
								hoverPreset="full-cerulean"
								className="mb-2 w-full sm:w-auto">
								{ctaExplore}
							</CTA>
						)}
						{ctaExplore && hasSubmittedAPForm && (
							<CTA
								id="explore_inventory_cta"
								to={ap.link}
								preset="outline-transparent"
								hoverPreset="full-cerulean"
								className="mb-2 w-full sm:w-auto">
								{ctaExplore}
							</CTA>
						)}
					</div>
				</div>
			</div>
			{showTalkToASpecialistModal && <ModalTalkToASpecialist onClose={() => setShowTalkToASpecialistModal(false)} />}
			{showExplorePackageModal && <ModalExplorePackage onClose={() => setShowExplorePackageModal(false)} ap={ap} />}
		</Container>
	);
}

function Opportunity({ opportunity, k }) {
	const [isVisible, setIsVisible] = useState(false);

	const selfRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	const handleScroll = useCallback(() => {
		if (typeof window !== "undefined" || !selfRef?.current) {
			const windowH = window.innerHeight;
			const selfBottom = selfRef.current.getBoundingClientRect().bottom;

			if (selfBottom < windowH) {
				setIsVisible(true);
			}
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll, { passive: true });
			handleScroll();
		}

		if (isVisible) {
			window.removeEventListener("scroll", handleScroll);
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll, isVisible]);

	return (
		<div className={clsx("opportunity", "grid mb-22", { "reversed sm:flex-row-reverse": k % 2 === 0, visible: isVisible })} ref={selfRef}>
			<div className={clsx("col-12 flex sm:col-6", k % 2 === 0 ? "sm:justify-content-end sm:pl-7" : "sm:justify-content-start sm:pr-7")}>
				<img className="opportunity_icon" src={opportunity.icon} alt="" />
				<Img className="opportunity_image rounded-xl sm:w-full" image={opportunity.featured_image} alt="" />
			</div>
			<div className={clsx("col-12 sm:col-6", k % 2 === 0 ? "sm:pr-7" : "sm:pl-7")}>
				<h3 className="text-24 text-transform-none mb-4">{opportunity.title}</h3>
				<p className="line-height-160 mb-6 sm:mb-10">{opportunity.blurb}</p>
				<ul>
					{opportunity.features.map(({ id, icon, text }) => (
						<li className="flex flex-row flex-nowrap align-items-center py-2 sm:align-items-start sm:pb-4" key={id}>
							<img className="feature_icon mr-3" src={icon} alt="" />
							<span className="text-ash text-14 font-bold letter-spacing-5">{text}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export const Opportunities = memo(function Opportunities({ content }) {
	return (
		<div className="opportunities_list flex flex-column">
			{content.map((opportunity, k) => (
				<Opportunity opportunity={opportunity} key={opportunity.id} k={k} />
			))}
		</div>
	);
});

const BillboardsTypesTableSM = memo(function BillboardsTypesSM({ content }: BillboardTypesProps) {
	const { title, types } = content;

	return (
		<div className={clsx("IM_CityBased_Billboards")}>
			<header className="t_title border-bottom-1 border-soft py-1 mb-2">
				<p className="font-bold subtitle-1 gradient m-0">
					<span className="text-12">{title}</span>
				</p>
			</header>
			{types.map((type, k) => (
				<div className="text-12 mb-8" key={`mini_table_${k}`}>
					<h4 className="text-12 uppercase font-medium mb-2">{type.name}</h4>
					{["avgCPM", "dailyImpressions", "commonSizing"].map((spec) => (
						<div className="t_row" key={`spec_${spec}`}>
							<div className="grid">
								<div className="col-6 flex align-items-center font-bold line-height-140">{T.translate(spec)}</div>
								<div className="col-6 flex align-items-center ">
									{typeof type[spec] === "object"
										? type[spec].map((el, j) => (
												<span className="comma" key={`comma_${j}`}>
													{el}
												</span>
										  ))
										: type[spec]}
								</div>
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
});

const BillboardsTypesTableLG = memo(function BillboardsTypesLG({ content, gridCols }: BillboardTypesProps) {
	const { title, types } = content;

	return (
		<div className={clsx("IM_CityBased_Billboards mb-16", `cols_${gridCols}`)}>
			<header className="t_row">
				<div className="t_title">
					<p className="font-bold subtitle-1 gradient m-0">
						<span className="text-12">{title}</span>
					</p>
				</div>
				{types.map((type, k) => (
					<div className="th text-14 font-bold line-height-120 md:text-16" key={`table_th_${k}`}>
						{type.name}
					</div>
				))}
			</header>
			{["avgCPM", "dailyImpressions", "commonSizing"].map((spec) => (
				<div className="t_row" key={`row_${spec}`}>
					<div className="font-bold">{T.translate(spec)}</div>
					{types.map((type, k) => (
						<div className="" key={`table_${spec}_${k}`}>
							{typeof type[spec] === "object"
								? type[spec].map((el, j) => (
										<span className="comma" key={`comma_${j}`}>
											{el}
										</span>
								  ))
								: type[spec]}
						</div>
					))}
				</div>
			))}
		</div>
	);
});

export function BillboardsTypes({ content }: any) {
	const screen = useScreen();

	const _gridCols = content.map((table: BillboardTypesContentProps) => table.types.length);
	const gridCols = Math.max(..._gridCols);

	if (["xs"].includes(screen)) {
		return content.map((table: BillboardTypesContentProps, k: number) => <BillboardsTypesTableSM content={table} key={k} />);
	}

	return content.map((table: BillboardTypesContentProps, k: number) => <BillboardsTypesTableLG content={table} gridCols={gridCols} key={k} />);
}

function ModalExplorePackage({ onClose, ap }: { onClose: Function; ap: any }) {
	const [apList, setApList] = useState("");

	function getModalTitle() {
		const baseMsg = T.translate("modalExplorePackage.title") as string;
		return baseMsg.replace("$$$", ap.title);
	}

	const hubspotContact = useHubspotContact();

	const modalTitle = getModalTitle();

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

		if (ap.slug) {
			packagesList.push(ap.slug);
		}

		if (hubspotContact && hubspotContact?.message?.properties?.auction_packages_consulted?.value) {
			packagesList.push(hubspotContact.message.properties.auction_packages_consulted.value);
		}

		updateAPList([packagesList].join(";"));
	}, [ap.slug, hubspotContact, updateAPList]);

	const simulateExploreAPFormSubmit = useCallback((redirectUrl) => {
		const exploreAPFormId = getFormID("exploreAP");
		const expires = new Date();
		expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 365);
		cookie.save("submitted-form-" + exploreAPFormId, true, { path: "/", expires, maxAge: 32000000 });
		navigate(redirectUrl);
	}, []);

	useEffect(() => {
		if (ap.slug) {
			updateAPList([ap.slug].join(";"));
		}
	}, [ap.slug, updateAPList]);

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
	}, [apList, ap.slug]);

	return (
		<Modal variant="form" className="theme_carolina narrow" onClose={onClose}>
			<div className="__vwo_40_va">
				<h3 className="h4 text-reflex mb-8">{modalTitle}</h3>
				<Form form="exploreAP" onReady={() => handleReady()} redirectUrl={ap.link} />
			</div>
			<div className="__vwo_40_vb">
				<FormLetsConnectVWO40VB onReady={() => handleReady()} onSubmit={() => simulateExploreAPFormSubmit(ap.link)} />
			</div>
		</Modal>
	);
}

const TopPackageCardWrapper = memo(function TopPackageCardContent({ to, onClick, children }) {
	if (to) {
		return (
			<Link to={to} className="h-full flex flex-column align-items-center">
				{children}
			</Link>
		);
	}

	if (onClick) {
		return (
			<button className="div h-full flex flex-column align-items-center" onClick={onClick}>
				{children}
			</button>
		);
	}
});

export const TopPackageCard = memo(function TopPackageCard({ image, title, to = "", onClick = false }: TopPackageCardProps) {
	return (
		<li className="package_card bg-white rounded-xl relative">
			<TopPackageCardWrapper to={to} onClick={onClick}>
				<Img className="package_card_image mb-4" image={image} objectFit="contain" alt="title" />
				<h5 className="text-14 font-bold text-center m-0">{title}</h5>
				<div className="spacer"></div>
				<hr />
				<p className="link_cerulean_arrow text-cerulean text-13 uppercase m-0">{T.translate("seeInventory")}</p>
			</TopPackageCardWrapper>
		</li>
	);
});

export function TopPackages({ content }) {
	const [hasSubmittedAPForm, setHasSubmittedAPForm] = useState<boolean>(false);
	const [showExplorePackageModal, setShowExplorePackageModal] = useState<object | false>(false);

	const { title, blurb, cta, list } = content;

	const data = Library();

	useEffect(() => {
		const formID = getFormID("exploreAP");
		const formCookie = cookie.load(`submitted-form-${formID}`);

		if (formCookie) {
			setHasSubmittedAPForm(true);
		}
	}, []);

	const verticals = list.map((ap: TopPackageItemProps) => {
		return {
			...ap,
			title: T.translate(ap.slug),
			link: `https://buy.broadsign.com/auction-packages/${ap.linkID}?token=${ap.token}`,
			image: data[ap.slug].childImageSharp.gatsbyImageData,
		};
	});

	return (
		<Container tag="section" className="top_packages mb-10 sm:mb-20">
			<div className="bg-zircon flex flex-column align-items-center p-6 mx-auto rounded-xl sm:pt-8 sm:pb-12">
				<h2 className="text-24 text-left text-transform-none w-full mb-6 sm:text-34 sm:text-center">{title}</h2>
				<p className="text-left line-height-180 mb-10 sm:text-center sm:mb-12">{blurb}</p>
				<ul className={clsx(`cols_${verticals.length}`, verticals.length % 2 === 0 ? "has_even_cols" : "has_odd_cols", "mb-5 sm:mb-12")}>
					{hasSubmittedAPForm ? (
						<>
							{verticals.map(({ slug, title, link, image }: AuctionPackageProps) => (
								<TopPackageCard image={image} title={title} to={link} key={slug} />
							))}
						</>
					) : (
						<>
							{verticals.map((ap: AuctionPackageProps) => (
								<TopPackageCard image={ap.image} title={ap.title} onClick={() => setShowExplorePackageModal(ap)} key={ap.slug} />
							))}
						</>
					)}
				</ul>
				<CTA preset="primary" hoverPreset="full-cerulean" className="" to="inventoryMarketplace">
					<span className="inline-block white-space-normal">{cta}</span>
				</CTA>
			</div>
			{showExplorePackageModal?.slug && <ModalExplorePackage onClose={() => setShowExplorePackageModal(false)} ap={showExplorePackageModal} />}
		</Container>
	);
}

function MoreLocationsBox() {
	const [showFormModal, setShowFormModal] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const { thankYou } = T.texts.exploreMoreMarkets.modal || [];

	return (
		<div className="more_locations_cta_box bg-gradient flex flex-center rounded-xl">
			<CTA
				className="more_locations_cta wrap w-auto"
				preset="white-outline-transparent"
				hoverPreset="outline-reflex"
				onClick={() => setShowFormModal(true)}>
				{T.translate("exploreMoreMarkets.moreLocations")}
			</CTA>
			<Modal show={showFormModal} variant="form" className="modal_explore_more_locations" onClose={() => setShowFormModal(false)}>
				{isFormSubmitted ? (
					<div className="flex flex-center flex-column h-full w-full m-auto">
						<img className="check mx-auto mb-4" src={green_check} alt="" />
						{thankYou.map((p) => (
							<p className="text-reflex text-20 font-black text-center">{p}</p>
						))}
					</div>
				) : (
					<div className="w-full">
						<h3 className="text-20 text-transform-none text-left mb-3 sm:text-24">{T.translate("exploreMoreMarkets.modal.title")}</h3>
						<p className="text-ash text-16 text-left mb-10">{T.translate("exploreMoreMarkets.modal.blurb")}</p>
						<Form form="exploreLocations" submitText="Submit" onSubmit={() => setIsFormSubmitted(true)} />
					</div>
				)}
			</Modal>
		</div>
	);
}

export const ExploreMoreMarkets = memo(function ExploreMoreMarkets({ currentCity = "", variation = "", ctaBox = false }: ExploreMoreMarketsProps) {
	const data = Library();

	const markets = [
		{ slug: "chicago", to: "inventoryMarketplaceCityChicago" },
		{ slug: "los_angeles", to: "inventoryMarketplaceCityLA" },
		{ slug: "new_york_city", to: "inventoryMarketplaceCityNYC" },
		{ slug: "philadelphia", to: "inventoryMarketplaceCityPhiladelphia" },
		{ slug: "toronto", to: "inventoryMarketplaceCityToronto" },
		{ slug: "vancouver", to: "inventoryMarketplaceCityVancouver" },
	].filter(({ slug }) => slug !== currentCity);

	return (
		<Container tag="section" className="explore_markets mb-8 sm:mb-20">
			<h2 className="text-24 text-center text-transform-none w-full mb-6 sm:text-34 sm:mb-8">{T.translate("exploreMoreMarkets.title")}</h2>
			<div className="markets_grid">
				{markets.map(({ slug, to }: { slug: string; to: string }) => (
					<Link className="card overflow-hidden rounded-xl" to={to} key={slug}>
						<div className="city flex flex-nowrap align-items-center justify-content-center w-full">
							<span className="text-white text-24 font-bold">{T.translate(`cities.${slug}`)}</span>
							<img className="arrow ml-3" src={arrow_right} alt="" />
						</div>
						<Img className="bg" image={data[slug + (variation ? `_${variation}` : "")].childImageSharp.gatsbyImageData} alt="" />
					</Link>
				))}
				{ctaBox && <MoreLocationsBox />}
			</div>
		</Container>
	);
});

export const FAQ = memo(function FAQ({ content }) {
	return (
		<Container tag="section" className="faqs mb-10 sm:mb-20">
			{content.map(({ id, q, a }) => (
				<FAQCollapse q={q} a={a} dataQ={id} key={id} />
			))}
		</Container>
	);
});
