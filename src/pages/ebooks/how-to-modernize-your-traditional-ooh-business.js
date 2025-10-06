import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Template from "@templates/ebooks";

export default function EbookModernizeOOHBusiness({ pageContext: { l, dicoPath }, location, data }) {
	useDico(l, dicoPath);

	return (
		<Template
			location={location}
			heroBg={data[`hero_${l}`].childImageSharp.gatsbyImageData}
			hero={
				<div className="col-12">
					<h1>{T.translate("title")}</h1>
				</div>
			}
			description={
				<div className="md:pr-6">
					<h3 className="text-h4 text-transform-none mb-4">{T.translate("intro")}</h3>
					<ul className="checks_gradient">
						{T.texts.list.map((item, k) => (
							<li className="flex-column align-items-start mb-4" key={k}>
								<span className="block mb-3 text-h6 line-height-100">{item.subtitle}</span>
								<span className="block">{item.par}</span>
							</li>
						))}
					</ul>
				</div>
			}
		/>
	);
}

export const queryContact = graphql`
	query {
		hero_en: file(relativePath: { eq: "ebooks/how-to-modernize-your-traditional-ooh-business-en.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		hero_es: file(relativePath: { eq: "ebooks/how-to-modernize-your-traditional-ooh-business-es.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
