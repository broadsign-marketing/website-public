import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import cookie from "react-cookies";
import { useDico } from "@hooks/useDico";
import { getFormID } from "@components/Form";
import { getURLParamFromSearch } from "@annex";

import Template from "@templates/ebooks";

export default function Ebook6StepsForIntegratingDOOHInYourOmnichannelStrategy({ pageContext: { l, dicoPath }, location, data }) {
	const [linkedInCampaign, setLinkedInCampaign] = useState("");
	const [isUngated, setIsUngated] = useState(false);

	useDico(l, dicoPath);

	useEffect(() => {
		const { search } = location;
		if (!search) return;

		const linkedInCampaignEbook6Steps = getURLParamFromSearch(search, "utm_campaign_id") || false;

		if (linkedInCampaignEbook6Steps === "319979444") {
			const expires = new Date();
			expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 365);
			const ebookFormID = getFormID("ebook6StepsForIntegratingDOOHInYourOmnichannelStrategy");
			cookie.save(`submitted-form-${ebookFormID}`, true, { path: "/", expires, maxAge: 32000000 });
			setLinkedInCampaign(linkedInCampaignEbook6Steps);
		}

		const utmCampaign = getURLParamFromSearch(search, "utm_campaign") || false;
		const utmSource = getURLParamFromSearch(search, "utm_source") || false;
		const utmMedium = getURLParamFromSearch(search, "utm_medium") || false;

		if (utmCampaign === "6_steps_ebook" && utmSource === "alexandra" && utmMedium === "mediasales") {
			setIsUngated(true);
		}
	}, [location]);

	return (
		<Template
			location={location}
			heroBg={data[`hero_${l}`].childImageSharp.gatsbyImageData}
			linkedInCampaign={linkedInCampaign}
			intro={
				<div className="w-12 mb-10">
					<h1 className="text-34 text-transform-none sm:text-40">{T.translate("title")}</h1>
				</div>
			}
			description={
				<div className="md:pr-6">
					<h3 className="text-24 line-height-160 text-transform-none mb-6 md:text-28">{T.translate("intro")}</h3>
					<ul className="checks_gradient">
						{T.texts.list.map((item, k) => (
							<li className="flex-column text-h6 pt-3 align-items-start" key={k}>
								{item}
							</li>
						))}
					</ul>
				</div>
			}
			isUngated={isUngated}
		/>
	);
}

export const queryContact = graphql`
	query {
		hero_en: file(relativePath: { eq: "ebooks/six-steps-for-integrating-dooh-in-your-omnichannel-strategy-hero-en.jpg" }) {
			...img
		}
		hero_fr: file(relativePath: { eq: "ebooks/six-steps-for-integrating-dooh-in-your-omnichannel-strategy-hero-fr.jpg" }) {
			...img
		}
	}
`;
