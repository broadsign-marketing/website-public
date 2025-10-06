import React, { memo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import T from "i18n-react";
import { useL } from "@hooks/useDico";
import clsx from "clsx";

import { NavColumnHeader, NavFeatured, NavMiniFeatured, NavItem } from "@components/Nav/Drawers/NavComponents";

const NavDrawerAgencies = memo(function NavDrawerAgencies({ isActive = false }) {
	const data = useStaticQuery(graphql`
		query {
			launchPDOOHCampaign: file(relativePath: { eq: "nav/launch_pdooh_campaign.jpg" }) {
				childImageSharp {
					gatsbyImageData
				}
			}
			doohx: file(relativePath: { eq: "nav/featured_doohx.png" }) {
				childImageSharp {
					gatsbyImageData(width: 75)
				}
			}
			measurementAttribution: file(relativePath: { eq: "nav/featured_measurement_attribution.png" }) {
				childImageSharp {
					gatsbyImageData(width: 75)
				}
			}
			caseStudies: file(relativePath: { eq: "nav/featured_case_studies.png" }) {
				childImageSharp {
					gatsbyImageData(width: 75)
				}
			}
		}
	`);

	const l = useL();

	return (
		<div className={clsx("main_nav__drawer drawer_agencies grid justify-content-between mt-0", { active: isActive })}>
			<div className="col-4 pr-0 pl-6 py-8">
				<NavColumnHeader className="px-5">{T.translate("nav.getStarted")}</NavColumnHeader>
				<NavFeatured
					className="extend_by_20 bg-white p-4 rounded-8 hover:bg-zircon"
					thumbnail={data.launchPDOOHCampaign.childImageSharp.gatsbyImageData}
					title={T.translate("nav.launchPDOOHCampaign")}
					description={T.translate("nav.launchPDOOHCampaignDescription")}
					to="launchPDOOHCampaign"
				/>
			</div>
			<div className="col-4 px-10 py-8">
				<NavColumnHeader>{T.translate("nav.howToGetStarted")}</NavColumnHeader>
				<NavItem id="outmoove" langs={["en", "fr"]} />
				<NavItem id="dspPartners" />
				<NavItem id="inventoryMarketplace" />
			</div>
			<div className="col-4 py-8 pl-5 pr-7 bg-zircon">
				<NavColumnHeader className="px-3">{T.translate("nav.learn")}</NavColumnHeader>
				{["en", "fr"].includes(l) ? (
					<NavMiniFeatured
						className=""
						thumbnail={data.measurementAttribution.childImageSharp.gatsbyImageData}
						title={T.translate("nav.measurementAttribution")}
						to="measurementAttribution"
						cta={T.translate("nav.learnMore")}
					/>
				) : (
					<NavMiniFeatured
						className=""
						thumbnail={data.doohx.childImageSharp.gatsbyImageData}
						title={T.translate("nav.doohx")}
						to="https://www.doohx.io/"
						cta={T.translate("nav.doohxCTA")}
					/>
				)}
				{["en"].includes(l) && (
					<NavMiniFeatured
						className=""
						thumbnail={data.caseStudies.childImageSharp.gatsbyImageData}
						title={T.translate("nav.caseStudies")}
						to="streamCaseStudiesCustomerSpotlights"
						cta={T.translate("nav.caseStudiesCTA")}
					/>
				)}
			</div>
		</div>
	);
});

export default NavDrawerAgencies;
