import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Template from "@templates/ebooks";

export default function EbookUnlockMoreValueFromYourEvChargingStations({ pageContext: { l, dicoPath }, location, data }) {
	useDico(l, dicoPath);

	return (
		<Template
			location={location}
			heroBg={data.hero.childImageSharp.gatsbyImageData}
			hero={
				<div className="col-12 sm:col-7">
					<h1 className="text-h3 my-8">{T.translate("title")}</h1>
				</div>
			}
		/>
	);
}

export const queryContact = graphql`
	query EBookImages {
		hero: file(relativePath: { eq: "ebooks/unlock-more-value-from-your-ev-charging-stations-hero.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
