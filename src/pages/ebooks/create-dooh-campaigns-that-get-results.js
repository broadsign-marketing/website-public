import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
// import { useHubspotContact } from "@hooks/useHubspotContact";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Template from "@templates/ebooks";

export default function EbookCreateDOOHCampaignsThatGetResults({ pageContext: { l, dicoPath }, location, data }) {
	useDico(l, dicoPath);

	/*
	const hsContact = useHubspotContact();

	const hsContactToTrack = {
		contactId: hsContact["canonical-vid"],
		properties: {
			website___tracked_events: filterDuplicates([
				hsContact?.properties?.website___tracked_events && hsContact.properties.website___tracked_events.value,
				"eBook : Create DOOH Campaigns that Get Results - Interact with eBook",
			])
				.join(";")
				.trim()
				.replace(/^;+|;+$/g, ""),
		},
	};
	*/

	return (
		<Template
			location={location}
			heroBg={data.heroBg.childImageSharp.gatsbyImageData}
			hero={
				<>
					<div className="col-12 flex flex-column justify-content-center sm:col-6">
						<h1 className="text-white">
							<span>{T.translate("overtitle")}</span>
							<em>{T.translate("title")}</em>
						</h1>
					</div>
					<div className="col-12 sm:col-6">
						<Img className="hero_thumb" image={data.hero.childImageSharp.gatsbyImageData} alt="" />
					</div>
				</>
			}
			intro={
				<div className="grid">
					<div className="col-12 sm:col-10 sm:col-offset-1 md:col-8 md:col-offset-2">
						<h3 className="text-h4 text-transform-none mb-4">{T.translate("intro")}</h3>
						<ul className="checks_gradient">
							{T.texts.list.map((item, k) => (
								<li key={k}>{item}</li>
							))}
						</ul>
					</div>
				</div>
			}
			isUngated={true}
			/* hsContactToTrack={hsContactToTrack} */
		/>
	);
}

export const queryContact = graphql`
	query {
		hero: file(relativePath: { eq: "ebooks/create-dooh-campaigns-that-get-results-hero.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		heroBg: file(relativePath: { eq: "ebooks/create-dooh-campaigns-that-get-results-hero-bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
