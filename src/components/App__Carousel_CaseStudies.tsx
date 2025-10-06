import React, { useEffect, useMemo, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useL } from "@hooks/useDico";
import { getTranslations, shuffle } from "@annex";

import Carousel from "@components/BroadsignAdsCarousel";
import CampaignCard from "@components/App__Carousel_CaseStudies_Card";

type PossibleCampaignIDs =
	| "holt_renfrew"
	| "samsonite"
	| "desjardins"
	| "global"
	| "ig"
	| "samsung"
	| "veet"
	| "jotex"
	| "hnm"
	| "hp"
	| "boehringer_ingelheim"
	| "canadian_real_estate_association"
	| "ab_inbev"
	| "silbo"
	| "seadoo";

type PossibleCampaignProps = "geolocation" | "locationTypes" | "demographics" | "objective" | "strategy" | "targetStrategy" | "results";

type Campaign = {
	id: PossibleCampaignIDs;
	title: string;
	geolocation: string;
	locationTypes: string;
	demographics: string;
	objective: string;
	strategy: string;
	targetStrategy: string;
	results: string;
	impressions: string;
	venues: string;
	screens: string;
	to: string;
};

interface CarouselProps {
	campaigns: Campaign[] | string[];
	bg: string;
	autoplay: Boolean;
	shuffled: Boolean;
	overtitle: string | React.ReactNode;
	cta: string;
	showProps: PossibleCampaignProps[];
	showLocationProps: boolean;
}

export default function App__Carousel_CaseStudies({
	campaigns,
	bg = "zircon",
	autoplay = true,
	shuffled = false,
	overtitle = "",
	cta = "",
	showProps = ["geolocation", "locationTypes", "demographics", "strategy"],
	showLocationProps = true,
}: CarouselProps) {
	const [campaignCarouselAutoPlay, setCampaignCarouselAutoPlay] = useState(autoplay);

	const data = useStaticQuery(graphql`
		query App__Carousel_CaseStudiesQuery {
			feature_bmw: file(relativePath: { eq: "case_studies/feature_bmw.jpg" }) {
				...img
			}
			feature_desjardins: file(relativePath: { eq: "case_studies/feature_desjardins.jpg" }) {
				...img
			}
			feature_global: file(relativePath: { eq: "case_studies/feature_global.jpg" }) {
				...img
			}
			feature_holt_renfrew: file(relativePath: { eq: "case_studies/feature_holt_renfrew.jpg" }) {
				...img
			}
			feature_hp: file(relativePath: { eq: "case_studies/feature_hp.jpg" }) {
				...img
			}
			feature_ig: file(relativePath: { eq: "case_studies/feature_ig.jpg" }) {
				...img
			}
			feature_samsonite: file(relativePath: { eq: "case_studies/feature_samsonite.jpg" }) {
				...img
			}
			feature_samsung: file(relativePath: { eq: "case_studies/feature_samsung.jpg" }) {
				...img
			}
			feature_veet: file(relativePath: { eq: "case_studies/feature_veet.jpg" }) {
				...img
			}
			feature_jotex: file(relativePath: { eq: "case_studies/feature_jotex.jpg" }) {
				...img
			}
			feature_hnm: file(relativePath: { eq: "case_studies/feature_hnm.jpg" }) {
				...img
			}
			feature_boehringer_ingelheim: file(relativePath: { eq: "case_studies/feature_boehringer_ingelheim.jpg" }) {
				...img
			}
			feature_canadian_real_estate_association: file(relativePath: { eq: "case_studies/feature_canadian_real_estate_association.jpg" }) {
				...img
			}
			feature_ab_inbev: file(relativePath: { eq: "case_studies/feature_ab_inbev.jpg" }) {
				...img
			}
			feature_seadoo: file(relativePath: { eq: "case_studies/feature_seadoo.jpg" }) {
				...img
			}
			feature_white_claw: file(relativePath: { eq: "case_studies/feature_white_claw.jpg" }) {
				...img
			}
			feature_foodora: file(relativePath: { eq: "case_studies/feature_foodora.jpg" }) {
				...img
			}
			feature_peugeot: file(relativePath: { eq: "case_studies/feature_peugeot.jpg" }) {
				...img
			}
			feature_pepsi_max: file(relativePath: { eq: "case_studies/feature_pepsi_max.jpg" }) {
				...img
			}
			feature_xite: file(relativePath: { eq: "case_studies/feature_xite.jpg" }) {
				...img
			}
			feature_public_mobile: file(relativePath: { eq: "case_studies/feature_public_mobile.jpg" }) {
				...img
			}
			feature_ubereats: file(relativePath: { eq: "case_studies/feature_ubereats.jpg" }) {
				...img
			}
			feature_silbo: file(relativePath: { eq: "case_studies/feature_silbo.jpg" }) {
				...img
			}
		}
	`);

	const l = useL();
	const __ = useMemo(() => {
		let out = getTranslations(`${l}/components/CaseStudies`);
		return out;
	}, [l]);

	const campaignsList: Campaign[] = useMemo(() => {
		if (!__.campaigns || !campaigns) {
			return [];
		}

		let out: Campaign[] = [];

		if (campaigns.length) {
			out = __.campaigns.filter((c: Campaign) => campaigns.includes(c.id));
		} else {
			out = __.campaigns;
		}

		if (shuffled) {
			return shuffle(out);
		}

		return out;
	}, [__, campaigns, shuffled]);

	if (!campaigns) {
		console.error(`App__Carousel_CaseStudies: no campaigns specified. (trace : overtitle='${overtitle}', cta='${cta}')`);
		return null;
	}

	return (
		<Carousel
			loop={{ auto: campaignCarouselAutoPlay, duration: 6200 }}
			className="App__Carousel_CaseStudies"
			itemClassName={`bg-${bg} overflow-hidden`}
			bg={bg}>
			{campaignsList.map(
				(campaign): JSX.Element => (
					<CampaignCard
						content={campaign}
						thumbnail={data[`feature_${campaign.id}`].childImageSharp.gatsbyImageData}
						overtitle={overtitle}
						cta={cta}
						showProps={showProps}
						showLocationProps={showLocationProps}
						onClick={() => setCampaignCarouselAutoPlay(false)}
						key={campaign.id}
					/>
				)
			)}
		</Carousel>
	);
}
