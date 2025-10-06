import React, { useEffect, useState } from "react";
import { graphql, navigate } from "gatsby";
import T from "i18n-react";
import cookie from "react-cookies";
import { useDico } from "@hooks/useDico";
import { getFormID } from "@components/Form";
import { getURLParamFromSearch } from "@annex";

import { GatsbyImage as Img } from "gatsby-plugin-image";

import Template from "@templates/ebooks";

import type { BroadsignPageProps } from "@types";

export default function EbookAutomationInOOHMediaPlanning({ pageContext: { l, dicoPath }, location, data }: BroadsignPageProps) {
	useDico(l, dicoPath);

	return (
		<Template
			location={location}
			/* linkedInCampaign={linkedInCampaign} */
			hero={
				<div className="w-full">
					<Img image={data[`hero_bg`].childImageSharp.gatsbyImageData} className="hero_bg bg z-1" objectFit="cover" alt="" />
					<Img image={data[`hero_${l}`].childImageSharp.gatsbyImageData} className="hero_img z-2" objectFit="contain" alt={T.translate("title")} />
				</div>
			}
			formId="ebookAutomationInOOHMediaPlanning"
			description={
				<div className="md:pr-6">
					<h1 className="text-24 line-height-160 text-transform-none mb-8 md:text-28">{T.texts.title}</h1>
					<h2 className="text-20 line-height-140 text-transform-none mb-8">{T.texts.subtitle}</h2>
					{T.texts.pars.map((item, k) => (
						<p className="text-16 line-height-160 mb-4" key={k}>
							{item}
						</p>
					))}
					<h3 className="text-16 font-reg text-transform-noneline-height-160 mb-4">{T.translate("wellCover")}</h3>
					<ul className="checks_gradient">
						{T.texts.list.map((item, k) => (
							<li className="flex-column text-16 pt-3 align-items-start" key={k}>
								{item}
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
		hero_bg: file(relativePath: { eq: "ebooks/automation-in-ooh-media-planning-hero-bg.jpg" }) {
			...img
		}
		hero_en: file(relativePath: { eq: "ebooks/automation-in-ooh-media-planning-hero-en.png" }) {
			...img
		}
	}
`;
