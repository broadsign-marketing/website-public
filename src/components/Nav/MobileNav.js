import React, { useMemo, useState } from "react";
import T from "i18n-react";
import { useL } from "@hooks/useDico";
import route from "@route";
import clsx from "clsx";
import langs from "@i18n/configs";
import { sanitizePath } from "@annex";

import CTA from "@components/CTA";
import Link from "@components/LocalizedLink";

function NavCollapse({ className, isActive, onToggle, headerText, headerClassName, headerStyle, children }) {
	return (
		<div className={clsx("mobile_nav__accordion", { active: isActive }, className)}>
			<button
				className={clsx("mobile_nav__accordion_header div", headerClassName ? headerClassName : "font-medium py-3 px-4")}
				style={headerStyle}
				onClick={() => onToggle()}>
				{headerText}
			</button>
			<div className={clsx("mobile_nav__collapse pl-4")}>{children}</div>
		</div>
	);
}

export function NavItem({ id = "", className = "py-3 pl-4", label = "", sub = "", to = "", langs = ["all"] }) {
	const l = useL();

	if (id !== "" && label === "") {
		label = T.translate(`nav.${id}`);
	}

	if (id !== "" && to === "") {
		to = id;
	}

	if (langs[0] === "all" || langs.includes(l)) {
		return (
			<Link className={clsx("mobile_nav__item font-medium", className)} to={to} key={id}>
				<span className="block">{T.translate(label)}</span>
				{sub && <span className="block text-small">{T.translate(`nav.${sub}`)}</span>}
			</Link>
		);
	}

	return null;
}

export default function MobileNav({ openContactUsModal }) {
	const [isActive, setIsActive] = useState(false);
	const [activeCollapse, setActiveCollapse] = useState(null);
	const [activeSubCollapse, setActiveSubCollapse] = useState(null);

	const l = useL();

	function toggleCollapse(target) {
		if (activeCollapse === target) {
			setActiveCollapse("");
		} else {
			setActiveCollapse(target);
		}
	}

	function toggleSubCollapse(target) {
		if (activeSubCollapse === target) {
			setActiveSubCollapse("");
		} else {
			setActiveSubCollapse(target);
		}
	}

	function closeAll() {
		setIsActive(false);
		setActiveCollapse(null);
	}

	/* const accordionProps = useCallback(
		(id) => {
			return {
				isActive: activeCollapse === id,
				onToggle: () => toggleCollapse(id),
				headerText: T.translate(`nav.${id}`),
			};
		},
		[activeCollapse, toggleCollapse]
	); */

	const translations = useMemo(() => {
		if (T.texts && T.texts.translations) {
			let out = [];

			for (let lang of langs) {
				if (lang !== T.translate("key") && T.texts.translations[lang.code]) {
					out.push({ label: lang.name, code: lang.code, url: sanitizePath(T.texts.translations[lang.code]) });
				}
			}

			return out;
		}

		return [];
	}, []);

	// const accordionToggleClass = "mobile_nav__accordion_header font-medium div py-3 px-4";

	return (
		<div className="flex justify-content-end align-items-center align-self-stretch md:hidden">
			<button
				name="Open mobile navigation"
				aria-label="Open mobile navigation"
				className={clsx("mobile_nav__burger h-full", isActive && "active")}
				onClick={() => setIsActive(!isActive)}>
				<span className="line" />
				<span className="line" />
				<span className="line" />
			</button>
			<div className={clsx("mobile_nav__wrapper", isActive && "active")} onMouseLeave={() => closeAll()}>
				<div className="mobile_nav py-4">
					{["en", "fr", "es", "de", "ja", "zh"].includes(l) && (
						<NavCollapse
							isActive={activeCollapse === "mediaOwners"}
							onToggle={() => toggleCollapse("mediaOwners")}
							headerText={T.translate("nav.mediaOwners")}>
							<NavItem id="broadsignPlatformTitle" to="broadsignPlatform" />
							<NavCollapse
								className={activeSubCollapse === "platformFeatures" && "active"}
								onToggle={() => toggleSubCollapse("platformFeatures")}
								headerText={T.translate("nav.platformFeatures")}>
								<NavItem id="campaignPlanning" />
								{["en", "fr", "es", "de"].includes(l) && <NavItem id="audienceCampaigns" />}
								<NavItem id="contentNetworkManagement" />
								<NavItem id="staticOperations" />
								<NavItem id="globalProgrammaticSSP" />
								<NavItem id="localSignageMessaging" />
							</NavCollapse>
							<NavItem id="plans" />
							{["en"].includes(l) && <NavItem id="doohMore" />}
						</NavCollapse>
					)}
					{["en", "fr"].includes(l) && (
						<NavCollapse
							isActive={activeCollapse === "agencies"}
							onToggle={() => toggleCollapse("agencies")}
							headerText={T.translate("nav.agencies")}>
							<NavItem id="launchPDOOHCampaign" />
							<NavCollapse
								isActive={activeSubCollapse === "howToGetStarted"}
								onToggle={() => toggleSubCollapse("howToGetStarted")}
								headerText={T.translate("nav.howToGetStarted")}>
								{["en", "fr"].includes(l) && <NavItem id="outmoove" />}
								<NavItem id="dspPartners" />
								<NavItem id="inventoryMarketplace" />
							</NavCollapse>
							<NavCollapse
								isActive={activeSubCollapse === "learn"}
								onToggle={() => toggleSubCollapse("learn")}
								headerText={T.translate("nav.learn")}>
								{["en", "fr"].includes(l) && <NavItem id="measurementAttribution" />}
								{["en"].includes(l) && <NavItem id="caseStudies" to="customerSpotlights" />}
							</NavCollapse>
						</NavCollapse>
					)}
					{["en", "fr", "es", "de"].includes(l) && (
						<NavCollapse
							isActive={activeCollapse === "retailers"}
							onToggle={() => toggleCollapse("retailers")}
							headerText={T.translate("nav.retailers")}>
							<NavItem id="retailTitle" to="verticalRetail" />
							<NavCollapse
								isActive={activeSubCollapse === "insightsGuides"}
								onToggle={() => toggleSubCollapse("insightsGuides")}
								headerText={T.translate("nav.insightsGuides")}>
								<NavItem id="ebookRetailMediaInStoreReport2025" />
								<NavItem id="ebookInStoreActivation" />
								<NavItem id="ebookRiseOfRetailMedia" />
								<NavItem id="ebookIncreaseRevenueWithContextualInStoreMedia" />
							</NavCollapse>
							<NavItem id="streamRetailMediaNetworks" label={T.translate("nav.retailBlog")} />
							<NavItem id="events" />
						</NavCollapse>
					)}
					{["en", "fr", "es", "de", "ja"].includes(l) && (
						<NavCollapse
							isActive={activeCollapse === "resources"}
							onToggle={() => toggleCollapse("resources")}
							headerText={T.translate("nav.resources")}>
							{["en"].includes(l) && <NavItem id="customerSpotlights" />}
							{["en", "fr", "es", "de"].includes(l) && <NavItem to="resources" id="ebooksWebinars" />}
							{["en"].includes(l) && <NavItem id="events" />}
							<NavItem id="blog" />
							<NavCollapse
								isActive={activeSubCollapse === "productDocumentation"}
								onToggle={() => toggleSubCollapse("productDocumentation")}
								headerText={T.translate("nav.productDocumentation")}>
								<NavItem to="platformDocumentation" id="broadsignPlatform" className="py-2 pl-4" />
								<NavItem to="controlDocumentation" id="controlDocumentationMain" sub="controlDocumentationSub" className="py-2 pl-4" />
								<NavItem to="directDocumentation" id="directDocumentationMain" sub="directDocumentationSub" className="py-2 pl-4" />
								<NavItem to="ayudaDocumentation" id="ayudaDocumentationMain" sub="ayudaDocumentationSub" className="py-2 pl-4" />
								<NavItem to="reachDocumentation" id="reachDocumentationMain" sub="reachDocumentationSub" className="py-2 pl-4" />
								<NavItem to="publishDocumentation" id="publishDocumentationMain" sub="publishDocumentationSub" className="py-2 pl-4" />
							</NavCollapse>
						</NavCollapse>
					)}
					<div className={clsx("mobile_nav__accordion", activeCollapse === "langs" && "active")}>
						{translations.length > 1 ? (
							<NavCollapse
								className="mx-4 my-3 py-3 border-top-1 border-bottom-1 border-soft"
								isActive={activeCollapse === "langs"}
								onToggle={() => toggleCollapse("langs")}
								headerText={T.translate("lang")}
								headerClassName="font-medium py-3"
								headerStyle={{ width: "calc(100% + 16px)" }}>
								{translations.map(({ code, label, url }) => {
									if (code !== l) {
										return (
											<Link className="mobile_nav__item py-3 font-medium" to={url} exact={true} key={code}>
												{label}
											</Link>
										);
									}
								})}
							</NavCollapse>
						) : (
							<div className="text-14 font-medium py-3 px-4 disabled">{T.translate("lang")}</div>
						)}
					</div>
					{["en", "fr", "es", "de"].includes(l) && (
						<div className="mobile_nav__item py-3 pl-4">
							<CTA
								className="contact_us bg-reflex text-white text-14 min-h-0 line-height-100 pill hover:bg-cerulean overflow-visible nowrap uppercase px-5 py-2"
								onClick={openContactUsModal}>
								{T.translate("nav.contactUs")}
							</CTA>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
