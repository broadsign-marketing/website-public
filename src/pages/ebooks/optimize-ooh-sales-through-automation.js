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

export default function EbookOptimizeOOHSalesThroughAutomation({ pageContext: { l, dicoPath }, location, data }) {
	useDico(l, dicoPath);

	return (
		<Template
			location={location}
			heroBg={data.hero.childImageSharp.gatsbyImageData}
			description={
				<>
					<p className="text-h6">{T.translate("description")}</p>
					<ul className="checks_gradient">
						{/* {T.texts.list.map((item, k) => (
							<li key={k}>{item}</li>
						))} */}
					</ul>
				</>
			}
			formHeader={T.translate("formHeader")}
		/>
	);
}

export const queryContact = graphql`
	query EBookImages {
		hero: file(relativePath: { eq: "ebooks/optimize-ooh-sales-through-automation-hero.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
