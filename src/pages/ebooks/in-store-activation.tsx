import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import { GatsbyImage as Img } from "gatsby-plugin-image";

import Template from "@templates/ebooks";

import type { BroadsignPageProps } from "@types";

export default function EbookInStoreActivation({ pageContext: { l, dicoPath }, location, data }: BroadsignPageProps) {
	useDico(l, dicoPath);

	return (
		<Template
			location={location}
			/* linkedInCampaign={linkedInCampaign} */
			hero={<Img image={data[`hero_${l}`].childImageSharp.gatsbyImageData} className="hero_img" objectFit="contain" alt={T.translate("hero.title")} />}
			description={
				<div className="md:pr-6">
					<h2 className="text-24 line-height-160 text-transform-none mb-8 md:text-28">{T.translate("presentation.title")}</h2>
					{T.texts.presentation.pars.map((item, k) => (
						<p className="text-ash text-20 line-height-160 mb-4" key={k}>
							{item}
						</p>
					))}
					<ul className="checks_gradient">
						{T.texts.presentation.list.map((item, k) => (
							<li className="flex-column text-18 pt-3 align-items-start" key={k}>
								{item}
							</li>
						))}
					</ul>
				</div>
			}
			formHeader={T.translate("formHeader")}
		/>
	);
}

export const queryContact = graphql`
	query {
		hero_en: file(relativePath: { eq: "ebooks/in-store-activation-hero-en.png" }) {
			...img
		}
	}
`;
