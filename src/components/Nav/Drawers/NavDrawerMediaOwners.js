import React, { memo, useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import T from "i18n-react";
import { useL } from "@hooks/useDico";
import clsx from "clsx";

import { NavColumnHeader, NavFeatured, NavMiniFeatured, NavItem } from "@components/Nav/Drawers/NavComponents";

const NavDrawerMediaOwners = memo(function NavDrawerMediaOwners({ isActive = false }) {
	const data = useStaticQuery(graphql`
		query {
			broadsignPlatform: file(relativePath: { eq: "nav/broadsign_platform.jpg" }) {
				...img
			}
			plans: file(relativePath: { eq: "nav/plans.jpg" }) {
				...img
			}
			dooh_more: file(relativePath: { eq: "nav/dooh_more.jpg" }) {
				...img
			}
		}
	`);

	const l = useL();

	const { pathname } = useLocation();

	const variation = useMemo(() => {
		if (["/retail-digital-signage/"].includes(pathname)) return "retail";
		return "default";
	}, [pathname]);

	return (
		<div className={clsx("main_nav__drawer drawer_media_owners grid justify-content-between mt-0", { active: isActive })}>
			<div className="col-4 pr-0 pl-6 py-8">
				<NavColumnHeader className="px-5">{T.translate("nav.ourPlatform")}</NavColumnHeader>
				{variation === "default" && (
					<NavFeatured
						className="extend_by_20 bg-white p-4 rounded-8 hover:bg-zircon"
						thumbnail={data.broadsignPlatform.childImageSharp.gatsbyImageData}
						title={T.translate("nav.broadsignPlatformTitle")}
						description={T.translate("nav.broadsignPlatformDescription")}
						to="broadsignPlatform"
					/>
				)}
				{variation === "retail" && (
					<NavFeatured
						className="extend_by_20 bg-white p-4 rounded-8 hover:bg-zircon"
						thumbnail={data.broadsignPlatform.childImageSharp.gatsbyImageData}
						title={T.translate("nav.inStoreRetailPlatformTitle")}
						description={T.translate("nav.inStoreRetailPlatformDescription")}
						to="inStoreRetailPlatform"
					/>
				)}
			</div>
			<div className="col-4 px-8 py-8">
				<NavColumnHeader>{T.translate("nav.platformFeatures")}</NavColumnHeader>
				<NavItem id="campaignPlanning" />
				{["en", "fr", "es", "de"].includes(l) && <NavItem id="audienceCampaigns" />}
				<NavItem id="contentNetworkManagement" />
				<NavItem id="staticOperations" />
				<NavItem id="globalProgrammaticSSP" />
				<NavItem id="localSignageMessaging" />
			</div>
			<div className="col-4 py-8 pl-5 pr-7 bg-zircon">
				<NavColumnHeader className="px-3">{T.translate("nav.more")}</NavColumnHeader>
				<NavMiniFeatured
					className=""
					thumbnail={data.plans.childImageSharp.gatsbyImageData}
					title={T.translate("nav.plans")}
					to="plans"
					cta={T.translate("nav.plansCTA")}
				/>
				{["en"].includes(l) && (
					<NavMiniFeatured
						className=""
						thumbnail={data.dooh_more.childImageSharp.gatsbyImageData}
						title={T.translate("nav.doohMore")}
						to="doohMore"
						cta={T.translate("nav.doohMoreCTA")}
					/>
				)}
			</div>
		</div>
	);
});

export default NavDrawerMediaOwners;
