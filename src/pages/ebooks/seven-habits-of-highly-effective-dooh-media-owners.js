import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Template from "@templates/ebooks";

export default function Ebook7HabitsOfHighlyEffectiveMediaOwners({ pageContext: { l, dicoPath }, location, data }) {
	useDico(l, dicoPath);

	return (
		<Template
			location={location}
			heroBg={data.hero.childImageSharp.gatsbyImageData}
			hero={<h1>{T.translate("title")}</h1>}
			description={
				<div className="md:pr-6">
					<h3 className="text-h4 text-transform-none mb-4">{T.translate("intro")}</h3>
					<ul className="checks_gradient">
						{T.texts.list.map((item, k) => (
							<li key={k}>{item}</li>
						))}
					</ul>
				</div>
			}
		/>
	);
}

export const queryContact = graphql`
	query EBookImages {
		hero: file(relativePath: { eq: "ebooks/7-habits-of-highly-effective-dooh-media-owners.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
