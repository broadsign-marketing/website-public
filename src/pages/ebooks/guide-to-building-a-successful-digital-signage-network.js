import React, { useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import route from "@route";
import clsx from "clsx";

import Container from "@components/Container";
import FlipBook from "@components/FlipBook";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Template from "@templates/ebooks";
import Link from "@components/LocalizedLink";

export default function EbookGuideToBuildingASuccessfulDigitalSignageNetwork({ pageContext: { l, dicoPath }, location, data }) {
	useDico(l, dicoPath);

	return (
		<Template
			location={location}
			heroBg={data.hero.childImageSharp.gatsbyImageData}
			intro={<h3 className="text-h3 text-transform-none line-height-140">{T.translate("title")}</h3>}
			description={
				<>
					<p className="text-h6">{T.translate("description")}</p>
					<ul className="checks_gradient">
						{T.texts.list.map((item, k) => (
							<li key={k}>{item}</li>
						))}
					</ul>
				</>
			}
			formHeader={T.translate("formHeader")}
		/>
	);
}

export const queryContact = graphql`
	query EBookImages {
		hero: file(relativePath: { eq: "ebooks/guide-to-building-a-successful-digital-signage-network-hero.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
