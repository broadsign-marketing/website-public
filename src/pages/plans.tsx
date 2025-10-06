import React, { memo, useCallback, useEffect, useMemo, forwardRef, useRef, useState, MutableRefObject } from "react";
import T from "i18n-react";
import { useDico, useL } from "@hooks/useDico";
import { useScreen } from "@hooks/useScreen";
import { useHubspotContact } from "@hooks/useHubspotContact";
import { routeWithUtmForm } from "@route";
import clsx from "clsx";

import CTA from "@components/CTA";
import Container from "@components/Container";
import Form from "@components/Form";
import FormLetsConnectVWO40VB from "@components/Form__LetsConnectVWO_Test40_VersionB";
import Layout from "@components/layout";
import Modal from "@components/Modal";

import whirl from "@img/pages/plans/whirl.svg";
import check from "@img/ui/check_green.svg";
import chevron from "@img/controls/chevron_down_ash.svg";

import "@sass/pages/plans.scss";
import "@sass/components/Aquarius.scss";

const FeatureTableHeaderForwardRef = forwardRef(({ isSticky = false, forceLeft = false, isVisible = true }, ref) => {
	return (
		<div
			className={clsx("feature_table_header max-w-960 text-16", isSticky ? "bg-white fixed" : "ref", { container: isVisible })}
			style={forceLeft ? { left: forceLeft } : {}}
			ref={ref}>
			<div className="grid font-bold h-full">
				<div className="col-6"></div>
				<div className="col-2 flex flex-center py-2">
					<span className="label px-2">{T.translate("standard")}</span>
				</div>
				<div className="col-2 flex flex-center py-2">
					<span className="label px-2">{T.translate("professional")}</span>
				</div>
				<div className="col-2 flex flex-center py-2">
					<span className="label px-2">{T.translate("enterprise")}</span>
				</div>
			</div>
		</div>
	);
});

function FeatureTableHeader() {
	const [featureTableHeaderRefLeft, setFeatureTableHeaderRefLeft] = useState(0);
	const [isStickyFeatureTableHeaderVisible, setIsStickyFeatureTableHeaderVisible] = useState(false);

	const featureTableHeaderRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;
	const featureTableStickyHeaderRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	useEffect(() => {
		function moveFeatureTableHeader() {
			if (!featureTableHeaderRef.current || typeof document === "undefined") return;

			// Make sure that the phantom sticky table header always has the same x position as the "real" header, because
			// position:fixed; is hard to manage like that

			const refLeft = featureTableHeaderRef.current.getBoundingClientRect().left;
			setFeatureTableHeaderRefLeft(refLeft);
			const lastTableRow = document.querySelector(".feature_section.last_row");

			// UI trick : a phantom sticky table header is always present, but only becomes visible past a certain point,
			// thus giving the illusion that the table header is becoming sticky while scrolling

			const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"));
			const refTop = featureTableHeaderRef.current.getBoundingClientRect().top;

			if (refTop < headerHeight) {
				setIsStickyFeatureTableHeaderVisible(true);
			} else {
				setIsStickyFeatureTableHeaderVisible(false);
			}

			// Don't allow the bottom of the sticky header to go any lower than the top of the last row of the table

			const stickyHeaderRect = featureTableStickyHeaderRef.current.getBoundingClientRect();
			const lastTableRowTop = lastTableRow.getBoundingClientRect().top;

			// The "- 10" here is necessary to handle the scrolling up
			if (stickyHeaderRect.bottom >= lastTableRowTop - 10) {
				const topPos = Math.min(0, lastTableRowTop - stickyHeaderRect.height);
				featureTableStickyHeaderRef.current.classList.add("no_transition");
				featureTableStickyHeaderRef.current.style.top = `${topPos}px`;
			} else {
				featureTableStickyHeaderRef.current.style.top = "0px";
				featureTableStickyHeaderRef.current.classList.remove("no_transition");
			}
		}

		if (typeof window === "undefined") return;

		window.addEventListener("scroll", moveFeatureTableHeader, { passive: true });
		window.addEventListener("resize", moveFeatureTableHeader, { passive: true });

		moveFeatureTableHeader();

		return () => {
			window.removeEventListener("scroll", moveFeatureTableHeader);
			window.removeEventListener("resize", moveFeatureTableHeader);
		};
	}, []);

	return (
		<>
			<FeatureTableHeaderForwardRef ref={featureTableHeaderRef} />
			<FeatureTableHeaderForwardRef
				ref={featureTableStickyHeaderRef}
				isSticky={true}
				forceLeft={featureTableHeaderRefLeft}
				isVisible={isStickyFeatureTableHeaderVisible}
			/>
		</>
	);
}

const FeatureTableRow = memo(({ name, includedIn, isSub = false }) => {
	return (
		<div className={clsx("feature_row grid my-0", { sub: isSub })}>
			<div className="feature_name col-6 text-14 text-reflex">
				<span className={clsx(isSub ? "ml-8" : "inline-block ml-2")}>{T.translate(name)}</span>
			</div>
			<div className={clsx("col-2 flex flex-center", isSub && "py-1")}>
				{includedIn.includes("s") ? <img src={check} height="12" width="16" alt="" /> : ""}
			</div>
			<div className={clsx("col-2 flex flex-center", isSub && "py-1")}>
				{includedIn.includes("p") ? <img src={check} height="12" width="16" alt="" /> : ""}
			</div>
			<div className={clsx("col-2 flex flex-center", isSub && "py-1")}>
				{includedIn.includes("e") ? <img src={check} height="12" width="16" alt="" /> : ""}
			</div>
		</div>
	);
});

const FeatureItem = memo(({ item, className }) => {
	return (
		<div className={clsx("rounded-4 pb-2 sm:py-1", className)}>
			<FeatureTableRow name={item.name} includedIn={item.includedIn} />
			{item.sub &&
				item.sub.map((subitem, s) => <FeatureTableRow isSub={true} name={subitem.name} includedIn={subitem.includedIn} key={`subitem_${s}`} />)}
		</div>
	);
});

function MediaOwnersTab({ className, onOpenPricingModal }) {
	const l = useL();

	const features = useMemo(() => {
		return [
			{
				sectionTitle: "content_network_management",
				items: [
					{ name: "digital_media_management", includedIn: ["s", "p", "e"] },
					{ name: "automated_campaign_scheduling", includedIn: ["s", "p", "e"] },
					{ name: "network_player_management", includedIn: ["s", "p", "e"] },
					{ name: "campaign_proof_of_play_reporting", includedIn: ["s", "p", "e"] },
					{ name: "support_for_third_party_players", includedIn: ["s", "p", "e"] },
					{ name: "api_access", includedIn: ["p", "e"] },
				],
			},
			{
				sectionTitle: "live_digital_screen_management",
				items: [
					{ name: "on_demand_player_polling", includedIn: ["p", "e"] },
					{ name: "remote_screenshot_capture", includedIn: ["p", "e"] },
					{ name: "player_monitoring_center", includedIn: ["p", "e"] },
					{ name: "cloud_based_content_synchronization", includedIn: ["p", "e"] },
				],
			},
			{
				sectionTitle: "campaign_planning_ad_serving",
				items: [
					{ name: "real_time_inventory_availability", includedIn: ["e"] },
					{ name: "proposal_management", includedIn: ["e"] },
					{
						name: "guaranteed_campaigns",
						includedIn: ["s", "p", "e"],
						sub: [
							{ name: "frequency", includedIn: ["s", "p", "e"] },
							{ name: "impressions", includedIn: ["e"] },
							{ name: "share_of_voice", includedIn: ["e"] },
							{ name: "takeovers", includedIn: ["e"] },
							{ name: "budget", includedIn: ["e"] },
						],
					},
					{
						name: "audience_campaigns",
						includedIn: ["s", "p", "e"],
						sub: [
							{ name: "contextual_targeting", includedIn: ["s", "p", "e"] },
							{ name: "moment_based_triggers", includedIn: ["s", "p", "e"] },
						],
					},
					{
						name: "optimization",
						includedIn: ["e"],
						sub: [
							{ name: "campaign_reallocation", includedIn: ["e"] },
							{ name: "campaign_rebalancing", includedIn: ["e"] },
							{ name: "dynamic_screen_selection", includedIn: ["e"] },
						],
					},
				],
			},
			{
				sectionTitle: "static_campaigns",
				items: [
					{ name: "asset_management", includedIn: ["s", "p", "e"] },
					{ name: "campaign_management", includedIn: ["s", "p", "e"] },
					{ name: "charting", includedIn: ["s", "p", "e"] },
					{ name: "operations", includedIn: ["s", "p", "e"] },
				],
			},
			{
				sectionTitle: "programmatic_ssp",
				items: [
					{ name: "open_exchange_transactions", includedIn: ["s", "p", "e"] },
					{ name: "private_marketplace_programmatic_transactions", includedIn: ["s", "p", "e"] },
				],
			},
			{
				sectionTitle: "local_signage_essaging",
				isLastRow: true,
				items: [{ name: "branded_messaging_templates", includedIn: ["p", "e"] }],
			},
		];
	}, []);

	return (
		<section className={clsx("tab_content tab_media_owners mb-10 sm:mb-0", className)}>
			<FeatureTableHeader />
			<Container className="max-w-960">
				{features.map((section, k) => (
					<div className={clsx("feature_section mb-6 sm:mb-10", { last_row: section.isLastRow })} key={`section_${k}`}>
						<div className="grid">
							<div className="col-6">
								<h4 className="text-12 text-reflex font-bold uppercase letter-spacing-20 mb-1 sm:pl-2">{T.translate(section.sectionTitle)}</h4>
							</div>
						</div>
						{section.items.map((item, j) => {
							const bgColor = j % 2 === 0 ? "bg-zircon" : "bg-white";
							return <FeatureItem item={item} className={bgColor} key={`item_${k}_${j}`} />;
						})}
					</div>
				))}
			</Container>
			<Container className="aquarius_shin pt-12 sm:pt-16">
				<div className="inner rounded-xl px-5 py-6 sm:py-16">
					<h2 className="h4 text-white text-left mb-4 sm:text-center">{T.translate("shin.title")}</h2>
					<p className="text-white text-left mb-10 mx-auto sm:text-center">{T.translate("shin.par")}</p>
					<div className="flex flex-column align-items-start justify-content-center w-full sm:flex-row sm:flex-nowrap">
						<CTA
							onClick={onOpenPricingModal}
							preset="white-outline-transparent"
							hoverPreset="outline-reflex"
							className="bg-transparent text-white border-1 border-white sm:ml-2 hover:bg-cerulean hover:border-cerulean">
							{T.translate("shin.ctaRequestAQuote")}
						</CTA>
					</div>
				</div>
			</Container>
		</section>
	);
}

function AgenciesTab({ className, onOpenLetsConnectModal }) {
	return (
		<section className={clsx("tab_content tab_agencies sm:pt-10", className)}>
			<Container className="max-w-960">
				<div className="grid">
					<div className="hidden col-12 text-center sm:block sm:col-5 md:col-4">
						<img src={whirl} alt="" />
					</div>
					<div className="col-12 sm:col-7 sm:pl-8 md:col-8 md:pl-0">
						<div className="bg-white pt-8 pb-10 px-4 sm:pr-10">
							<h2 className="h4 text-reflex mb-4">{T.translate("agenciesTab.title")}</h2>
							<p className="text-reflex font-medium line-height-180 mb-10">{T.translate("agenciesTab.par")}</p>
							<CTA preset="primary" hoverPreset="full-cerulean" onClick={onOpenLetsConnectModal}>
								{T.translate("agenciesTab.cta")}
							</CTA>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}

export default function PricingPage({ pageContext: { l, dicoPath }, location: { search, hash } }) {
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [currentTab, setCurrentTab] = useState("mediaOwners");
	const [showPricingModal, setShowPricingModal] = useState(false);
	const [showLetsConnectModal, setShowLetsConnectModal] = useState(false);

	useDico(l, dicoPath);

	const screen = useScreen();

	const hsContact = useHubspotContact();
	const userProductsInterestsFromHSAPI = useMemo(() => {
		if (hsContact?.properties?.products_interests?.value) {
			return hsContact.properties.products_interests.value;
		}
		return [];
	}, [hsContact]);

	const toggleCurrentTab = useCallback(
		(newVal) => {
			if (currentTab === newVal) {
				setCurrentTab("");
			} else {
				setCurrentTab(newVal);
			}

			// Reset the hash from the URL, if present
			if (window.location.hash) {
				history.replaceState(null, "", window.location.pathname + window.location.search);
			}
		},
		[currentTab]
	);

	const handleRequestAQuoteFormOnReady = useCallback(() => {
		const piURLParam = search?.match(/[?&]pi=([^?&]+)/)?.[1] || "";

		const productsInterestsField = document.querySelector(".hs_products_interests .hs-input");

		if (productsInterestsField) {
			let userProductsInterestsFromURL = "";

			switch (piURLParam) {
				case "broadsign-platform":
					userProductsInterestsFromURL = "Broadsign Platform";
					break;
				case "campaign-planning":
					userProductsInterestsFromURL = "Campaign Planning Ad Serving";
					break;
				case "content-network-management":
					userProductsInterestsFromURL = "Content Network Management";
					break;
				case "static-campaigns":
					userProductsInterestsFromURL = "Static Campaigns";
					break;
				case "global-programmatic-ssp":
					userProductsInterestsFromURL = "Programmatic Supply-Side Platform";
					break;
				case "local-signage-messaging":
					userProductsInterestsFromURL = "Local Signage Messaging";
					break;
				default:
					if (piURLParam) {
						console.warn("Unknown product from URL :", piURLParam);
					}
			}

			productsInterestsField.value = [productsInterestsField.value, userProductsInterestsFromHSAPI, userProductsInterestsFromURL]
				.join(";")
				.replace(/^;/, "");
			productsInterestsField.dispatchEvent(new Event("input", { bubbles: true }));
		}
	}, [search, userProductsInterestsFromHSAPI]);

	useEffect(() => {
		if (!screen) return;

		if (screen !== "xs" && currentTab === "") {
			setCurrentTab("mediaOwners");
		}

		if (screen === "xs" && isInitialLoad) {
			setCurrentTab("");
			setIsInitialLoad(false);
		}
	}, [screen, currentTab, isInitialLoad]);

	useEffect(() => {
		if (!hash) return;

		if (["#mediaowners", "#owners", "#media-owners", "#proprietaires", "#propietarios", "#medieninhaber"].includes(hash)) {
			setCurrentTab("mediaOwners");
		}

		if (
			[
				"#agencies",
				"#brands",
				"#agencies-brands",
				"#agenciesbrands",
				"#media-buyers",
				"#buyers",
				"#mediabuyers",
				"#agences",
				"#marques",
				"#agencias",
				"#marcas",
				"#agenturen",
				"#marken",
			].includes(hash)
		) {
			setCurrentTab("agencies");
		}
	}, [hash]);

	return (
		<Layout id="plans" className="theme_carolina pb-12 sm:pb-22">
			<Container tag="section" className="hero mt-10 text-center z-1 sm:mb-12">
				<h1 className="font-superbold line-height-100 mb-4 sm:mb-0">{T.translate("hero.title")}</h1>
				<img className="whirl sm:hidden" src={whirl} alt="" />
			</Container>
			{screen !== "xs" && (
				<div className="tabs bg-white z-2 hidden sm:flex">
					<Container className="max-w-960 z-2">
						<button
							onClick={() => toggleCurrentTab("mediaOwners")}
							className={clsx("tab div text-16 font-bold w-full sm:text-20 sm:w-6", { active: currentTab === "mediaOwners" })}>
							<span className="label text-reflex inline-block relative">{T.translate("forMediaOwners")}</span>
						</button>
						<button
							onClick={() => toggleCurrentTab("agencies")}
							className={clsx("tab div text-16 font-bold w-full sm:text-20 sm:w-6", { active: currentTab === "agencies" })}>
							<span className="label text-reflex inline-block relative">{T.translate("forAgencies")}</span>
						</button>
					</Container>
				</div>
			)}
			<div className="buffer z-3"></div>
			<div className={clsx("tab_content_wrapper bg-white z-3", { active: !isInitialLoad })}>
				{screen === "xs" && (
					<Container className="tabs flex sm:hidden">
						<button
							onClick={() => toggleCurrentTab("mediaOwners")}
							className={clsx("tab div text-16 font-bold w-full sm:text-20 sm:w-6", { active: currentTab === "mediaOwners" })}>
							<span className="label text-reflex">{T.translate("forMediaOwners")}</span>
							<img className="chevron" src={chevron} alt="" />
						</button>
					</Container>
				)}
				<MediaOwnersTab
					className={clsx({ active: currentTab === "mediaOwners" })}
					onOpenPricingModal={() => {
						setShowPricingModal(true);
					}}
				/>
				{screen === "xs" && (
					<Container className="tabs flex sm:hidden">
						<button
							onClick={() => toggleCurrentTab("agencies")}
							className={clsx("tab div text-16 font-bold w-full sm:text-20 sm:w-6", { active: currentTab === "agencies" })}>
							<span className="label text-reflex">{T.translate("forAgencies")}</span>
							<img className="chevron" src={chevron} alt="" />
						</button>
					</Container>
				)}
				<AgenciesTab
					className={clsx({ active: currentTab === "agencies" })}
					onOpenLetsConnectModal={() => {
						setShowLetsConnectModal(true);
					}}
				/>
			</div>
			<Modal show={showPricingModal} variant="form" className="theme_carolina" onClose={() => setShowPricingModal(false)}>
				<h3 className="h4 text-reflex mb-8">{T.translate("shin.ctaRequestAQuote")}</h3>
				<Form form="requestAQuote" onReady={() => handleRequestAQuoteFormOnReady()} redirectUrl={routeWithUtmForm("thankYou", "request_a_quote")} />
			</Modal>
			<Modal show={showLetsConnectModal} variant="form" className="theme_carolina narrow" onClose={() => setShowLetsConnectModal(false)}>
				<div className="__vwo_40_va">
					<h3 className="h4 text-reflex mb-8">{T.translate("agenciesTab.cta")}</h3>
					<Form form="letsConnect" redirectUrl={routeWithUtmForm("thankYou", "lets_connect")} />
				</div>
				<div className="__vwo_40_vb">
					<FormLetsConnectVWO40VB />
				</div>
			</Modal>
		</Layout>
	);
}
