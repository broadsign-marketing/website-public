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

export default function EbookRiseOfRetailMedia({ pageContext: { l, dicoPath }, location, data }: BroadsignPageProps) {
	useDico(l, dicoPath);

	/*
	const [linkedInCampaign, setLinkedInCampaign] = useState("");
	const [isUngated, setIsUngated] = useState(false);

	DECOMISSIONED UNTIL WE HAVE A LINKEDIN CAMPAIGN FOR THIS

	useEffect(() => {
		const { search } = location;
		if (!search) return;

		const linkedInCampaignEbookRiseOfRetailMedia = getURLParamFromSearch(search, "utm_campaign_id") || false;

		if (linkedInCampaignEbookRiseOfRetailMedia === "319979444") {
			const expires = new Date();
			expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 365);
			const ebookFormID = getFormID("ebookRiseOfRetailMedia");
			cookie.save(`submitted-form-${ebookFormID}`, true, { path: "/", expires, maxAge: 32000000 });
			setLinkedInCampaign(linkedInCampaignEbookRiseOfRetailMedia);
		}

		const utmCampaign = getURLParamFromSearch(search, "utm_campaign") || false;
		const utmSource = getURLParamFromSearch(search, "utm_source") || false;
		const utmMedium = getURLParamFromSearch(search, "utm_medium") || false;

		if (utmCampaign === "rise_of_media_retail") {
			setIsUngated(true);
		}
	}, [location]);

	useEffect(() => {
		console.log(linkedInCampaign);
	}, [linkedInCampaign]);
	*/

	return (
		<Template
			location={location}
			/* linkedInCampaign={linkedInCampaign} */
			hero={
				<div className="flex h-full">
					<Img image={data[`hero_${l}`].childImageSharp.gatsbyImageData} className="hero_img" objectFit="contain" alt={T.translate("title")} />
				</div>
			}
			description={
				<div className="md:pr-6">
					<h3 className="text-24 line-height-160 text-transform-none mb-8 md:text-28">{T.texts.intro[0]}</h3>
					<p className="text-ash text-20 line-height-160 mb-4">{T.texts.intro[1]}</p>
					<ul className="checks_gradient">
						{T.texts.list.map((item, k) => (
							<li className="flex-column text-18 pt-3 align-items-start" key={k}>
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
		hero_en: file(relativePath: { eq: "ebooks/rise-of-retail-media-hero-en.jpg" }) {
			...img
		}
	}
`;
