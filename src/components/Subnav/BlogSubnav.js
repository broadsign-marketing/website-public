import React, { useEffect, useRef, useState } from "react";
import T from "i18n-react";
import { useL } from "@hooks/useDico";
import { useScroll } from "@hooks/useScreen";
import { useLocation } from "@reach/router";
import clsx from "clsx";

import Link from "@components/LocalizedLink";

function SearchBar({ onSearchText }) {
	const searchTextField = useRef(null);

	const { search } = useLocation();
	const searchQuery = search.match(/[?&]s=([^&]+)/)?.[1] || "";

	useEffect(() => {
		if (searchTextField.current.value === "" && searchQuery !== "") {
			searchTextField.current.value = searchQuery;
		}
	}, []);

	return (
		<div className="search_text_input_wrapper flex align-items-center h-full">
			<input
				type="text"
				className="search_text mb-1"
				ref={searchTextField}
				placeholder={T.translate("search")}
				onKeyUp={(e) => {
					onSearchText(e.target.value);
				}}
				onChange={(e) => {
					onSearchText(e.target.value);
				}}
				onBlur={(e) => {
					onSearchText(e.target.value);
				}}
			/>
		</div>
	);
}

function DesktopNav() {
	const l = useL();

	return (
		<nav className={clsx("hidden flex-row flex-nowrap anim-fadein md:flex", l === "en" ? "justify-content-between" : "justify-content-start")}>
			{["en"].includes(l) && (
				<div className="subnav_item has_children">
					<div className="label">
						<Link to="streamOohMediaOwners" className="lg:nowrap">
							{T.translate("oohMediaOwners")}
						</Link>
					</div>
					<ul className="subsub">
						<li className="subsub_item">
							<Link to="streamOptimizeYourOOHBusiness">{T.translate("optimizeYourOOHBusiness")}</Link>
						</li>
						{/* <li className="subsub_item">
							<Link to="streamProgrammaticSalesSuccess">{T.translate("programmaticSalesSuccess")}</Link>
						</li> */}
						<li className="subsub_item">
							<Link to="streamBroadsignPlatformUpdates">{T.translate("broadsignPlatformUpdates")}</Link>
						</li>
					</ul>
				</div>
			)}
			{["en"].includes(l) && (
				<div className="subnav_item has_children">
					<div className="label">
						<Link to="streamAgenciesBrands" className="lg:nowrap">
							{T.translate("agenciesBrands")}
						</Link>
					</div>
					<ul className="subsub">
						<li className="subsub_item">
							<Link to="streamProgrammaticDOOHInsights">{T.translate("programmaticDOOHInsights")}</Link>
						</li>
						<li className="subsub_item">
							<Link to="streamVerticalStrategies">{T.translate("verticalStrategies")}</Link>
						</li>
						<li className="subsub_item">
							<Link to="streamCaseStudiesCustomerSpotlights">{T.translate("caseStudiesCustomerSpotlights")}</Link>
						</li>
						<li className="subsub_item">
							<Link to="streamMeasurementAttribution">{T.translate("measurementAttribution")}</Link>
						</li>
					</ul>
				</div>
			)}
			<div className="subnav_item">
				<div className="label">
					<Link to="streamRetailMediaNetworks" className="lg:nowrap">
						{T.translate("retailMediaNetworks")}
					</Link>
				</div>
			</div>
			{["en", "es"].includes(l) && (
				<div className="subnav_item has_children">
					<div className="label">{T.translate("customerSuccess")}</div>
					<ul className="subsub">
						<li className="subsub_item">
							<Link to="streamMediaOwnerSpotlights">{T.translate("mediaOwnerSpotlights")}</Link>
						</li>
						{/* <li className="subsub_item">
							<Link to="streamCampaignCaseStudies">{T.translate("campaignCaseStudies")}</Link>
						</li> */}
					</ul>
				</div>
			)}
			<div className="subnav_item has_children">
				<div className="label">{T.translate("getDOOHCertified")}</div>
				<ul className="subsub">
					<li className="subsub_item">
						<Link to="https://www.doohx.io/courses/dooh-101">{T.translate("dOOH101")}</Link>
					</li>
					<li className="subsub_item">
						<Link to="https://www.doohx.io/courses/pdooh-101">{T.translate("pDOOH101")}</Link>
					</li>
					<li className="subsub_item">
						<Link to="https://www.doohx.io/courses/pdooh-advanced">{T.translate("pDOOHAdvanced")}</Link>
					</li>
				</ul>
			</div>
			<div className="subnav_item has_children">
				<div className="label">{T.translate("eventsWebinars")}</div>
				<ul className="subsub">
					<li className="subsub_item">
						<Link to="events">{T.translate("upcomingEventsWebinars")}</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

function MobileNav() {
	const [isUnfolded, setIsUnfolded] = useState(false);
	const scroll = useScroll();

	if (scroll > 80 && isUnfolded) {
		setIsUnfolded(false);
	}

	const l = useL();

	return (
		<div className="mobile_nav_wrapper block anim-fadein md:hidden">
			<button className={clsx("burger", isUnfolded ? "active" : "")} aria-label="Open blog sub-navigation" onClick={() => setIsUnfolded((prev) => !prev)}>
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
			</button>
			<nav className={clsx("flex flex-column flex-nowrap align-items-start", isUnfolded ? "active" : "")}>
				{["en"].includes(l) && (
					<>
						<Link to="streamOohMediaOwners" className="level_1">
							{T.translate("oohMediaOwners")}
						</Link>
						<Link to="streamOptimizeYourOOHBusiness" className="level_2">
							{T.translate("optimizeYourOOHBusiness")}
						</Link>
						{/* <Link to="streamProgrammaticSalesSuccess" className="level_2">{T.translate("programmaticSalesSuccess")}</Link> */}
						<Link to="streamBroadsignPlatformUpdates" className="level_2">
							{T.translate("broadsignPlatformUpdates")}
						</Link>
					</>
				)}
				{["en"].includes(l) && (
					<>
						<Link to="streamAgenciesBrands" className="level_1">
							{T.translate("agenciesBrands")}
						</Link>

						<Link to="streamProgrammaticDOOHInsights" className="level_2">
							{T.translate("programmaticDOOHInsights")}
						</Link>
						<Link to="streamVerticalStrategies" className="level_2">
							{T.translate("verticalStrategies")}
						</Link>
						<Link to="streamCaseStudiesCustomerSpotlights" className="level_2">
							{T.translate("caseStudiesCustomerSpotlights")}
						</Link>
						<Link to="streamMeasurementAttribution" className="level_2">
							{T.translate("measurementAttribution")}
						</Link>
					</>
				)}
				{["en", "fr"].includes(l) && (
					<Link to="streamRetailMediaNetworks" className="level_1">
						{T.translate("retailMediaNetworks")}
					</Link>
				)}
				{["en", "es"].includes(l) && (
					<>
						<div className="level_1">{T.translate("customerSuccess")}</div>

						<Link to="streamMediaOwnerSpotlights" className="level_2">
							{T.translate("mediaOwnerSpotlights")}
						</Link>

						{/* <Link to="streamCampaignCaseStudies" className="level_2">{T.translate("campaignCaseStudies")}</Link> */}
					</>
				)}
				<div className="level_1">{T.translate("getDOOHCertified")}</div>
				<Link to="https://www.doohx.io/courses/dooh-101" className="level_2">
					{T.translate("dOOH101")}
				</Link>
				<Link to="https://www.doohx.io/courses/pdooh-101" className="level_2">
					{T.translate("pDOOH101")}
				</Link>
				<Link to="https://www.doohx.io/courses/pdooh-advanced" className="level_2">
					{T.translate("pDOOHAdvanced")}
				</Link>
				<div className="level_1">{T.translate("eventsWebinars")}</div>
				<Link to="events" className="level_2">
					{T.translate("upcomingEventsWebinars")}
				</Link>
				<Link to={"/"} className="level_2">
					{T.translate("onDemandArchive")}
				</Link>
			</nav>
		</div>
	);
}

export default function BlogSubnav({ onSearchText }) {
	const l = useL();

	return (
		<div className="grid blog_subnav">
			<div className="col-4 sm:col-6 md:col-10">
				<MobileNav onSearchText={(v) => onSearchText(v)} />
				<DesktopNav />
			</div>
			<div className="col-8 sm:col-6 md:col-2">{["en", "fr", "es", "de"].includes(l) && <SearchBar onSearchText={(v) => onSearchText(v)} />}</div>
		</div>
	);
}
