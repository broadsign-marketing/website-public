import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico, useDicoNamespace } from "@hooks/useDico";

import {
	Hero,
	Benefits,
	AudienceSegments,
	Advantages,
	Marketplace,
	PPC__Targeting as Targeting,
	PPC__MeasureSuccess as MeasureSuccess,
} from "@partials/auctionPackages";
import BuildCustomPackage from "@components/Inventory__BuildCustomPackage";
import CaseStudies from "@components/App__Carousel_CaseStudies";
import Container from "@components/Container";
import Helmet from "react-helmet";
import Layout from "@components/layout";

import "@sass/pages/auction_packages.scss";

import type PageProps from "@customTypes";

export default function InventoryPackagesTelco({ pageContext: { l, dicoPath }, data }: PageProps) {
	useDico(l, dicoPath.replace("inventory", "auction"));
	useDicoNamespace("auction-packages");

	return (
		<Layout id="telco" className="theme_carolina auction_packages">
			<Helmet>
				<meta name="robots" content="noindex, nofollow" />
			</Helmet>
			<Hero
				carouselBaseImage={data.hero.childImageSharp.gatsbyImageData}
				carouselRotatingImages={[
					data.hero01.childImageSharp.gatsbyImageData,
					data.hero02.childImageSharp.gatsbyImageData,
					data.hero03.childImageSharp.gatsbyImageData,
				]}
				variation="ppc"
			/>
			<Benefits screenshot={data.screenshot.childImageSharp.gatsbyImageData} variation="ppc" />
			<AudienceSegments />

			<Advantages figure={data.advantages.childImageSharp.gatsbyImageData} />
			<Targeting />
			<section className="my-20">
				<Container>
					<CaseStudies campaigns={["hp"]} overtitle={T.translate("telcoCampaigns")} bg="white" />
				</Container>
			</section>
			<MeasureSuccess />
			<section className="marketplace bg-zircon mb-40">
				<Marketplace current="automotive" variant="ppc" />
			</section>
			<Container className="mb-30">
				<BuildCustomPackage
					title={T.translate("ppc.book_dooh_campaign.title")}
					par={T.translate("ppc.book_dooh_campaign.par")}
					cta={T.translate("ppc.book_dooh_campaign.cta")}
				/>
			</Container>
		</Layout>
	);
}

export const QueryInventoryPackagesTravelTourism = graphql`
	query {
		hero: file(relativePath: { eq: "auction-packages/telco/hero_base.png" }) {
			...img
		}
		hero01: file(relativePath: { eq: "auction-packages/telco/hero_01.png" }) {
			...img
		}
		hero02: file(relativePath: { eq: "auction-packages/telco/hero_02.png" }) {
			...img
		}
		hero03: file(relativePath: { eq: "auction-packages/telco/hero_03.png" }) {
			...img
		}

		screenshot: file(relativePath: { eq: "auction-packages/telco/screenshot.jpg" }) {
			...img
		}
		advantages: file(relativePath: { eq: "auction-packages/telco/advantages.png" }) {
			...img
		}

		playbook_thumb_01: file(relativePath: { eq: "auction-packages/telco/playbook_thumb_01.jpg" }) {
			...img
		}
		playbook_thumb_02: file(relativePath: { eq: "auction-packages/telco/playbook_thumb_02.jpg" }) {
			...img
		}
		playbook_thumb_03: file(relativePath: { eq: "auction-packages/telco/playbook_thumb_03.jpg" }) {
			...img
		}
	}
`;

/* query ($l: String!) {
		hero: file(relativePath: { eq: "auction-packages/telco/hero.png" }) {
			...img
		}
	} */
