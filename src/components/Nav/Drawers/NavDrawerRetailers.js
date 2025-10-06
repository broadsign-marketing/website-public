import React, { memo, useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import T from "i18n-react";
import clsx from "clsx";

import { NavColumnHeader, NavFeatured, NavMiniFeatured, NavItem } from "@components/Nav/Drawers/NavComponents";

const NavDrawerRetailers = memo(function NavDrawerRetailers({ isActive = false }) {
	const data = useStaticQuery(graphql`
		query {
			retail: file(relativePath: { eq: "nav/retail.jpg" }) {
				...img
			}
			retailBlog: file(relativePath: { eq: "nav/retail_blog.jpg" }) {
				...img
			}
			retailEvents: file(relativePath: { eq: "nav/retail_events.jpg" }) {
				...img
			}
		}
	`);

	return (
		<div className={clsx("main_nav__drawer drawer_retailers grid justify-content-between mt-0", { active: isActive })}>
			<div className="col-4 pr-0 pl-6 py-8">
				<NavColumnHeader className="px-5">{T.translate("nav.getStarted")}</NavColumnHeader>
				<NavFeatured
					className="extend_by_20 bg-white p-4 rounded-8 hover:bg-zircon"
					thumbnail={data.retail.childImageSharp.gatsbyImageData}
					title={T.translate("nav.retailTitle")}
					description={T.translate("nav.retailDescription")}
					to="verticalRetail"
				/>
			</div>
			<div className="col-4 px-8 py-8">
				<NavColumnHeader>{T.translate("nav.insightsGuides")}</NavColumnHeader>
				<NavItem id="ebookRetailMediaInStoreReport2025" />
				<NavItem id="ebookInStoreActivation" />
				<NavItem id="ebookRiseOfRetailMedia" />
				<NavItem id="ebookIncreaseRevenueWithContextualInStoreMedia" />
			</div>
			<div className="col-4 py-8 pl-5 pr-7 bg-zircon">
				<NavColumnHeader className="px-3">{T.translate("nav.stayConnected")}</NavColumnHeader>
				<NavMiniFeatured
					className=""
					thumbnail={data.retailBlog.childImageSharp.gatsbyImageData}
					title={T.translate("nav.retailBlog")}
					to="streamRetailMediaNetworks"
					cta={T.translate("nav.learnMore")}
				/>
				<NavMiniFeatured
					className=""
					thumbnail={data.retailEvents.childImageSharp.gatsbyImageData}
					title={T.translate("nav.events")}
					to="events"
					cta={T.translate("nav.eventsCTA")}
				/>
			</div>
		</div>
	);
});

export default NavDrawerRetailers;
