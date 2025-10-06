import React from "react";
import T from "i18n-react";
import { graphql } from "gatsby";
import { useDico, useDicoNamespace } from "@hooks/useDico";

import { Hero, Benefits, AudienceSegments, Advantages, PlaybookCTA, TalkToASpecialist, Marketplace } from "@partials/auctionPackages";
import CaseStudies from "@components/App__Carousel_CaseStudies";
import Container from "@components/Container";
import BuildCustomPackage from "@components/Inventory__BuildCustomPackage";
import Layout from "@components/layout";

import "@sass/pages/auction_packages.scss";

import type PageProps from "@customTypes";

export default function AuctionPackagesEntertainment({ pageContext: { l, dicoPath }, data }: PageProps) {
	useDico(l, dicoPath);
	useDicoNamespace("auction-packages");

	return (
		<Layout id="entertainment_media" className="theme_carolina auction_packages">
			<Hero carouselBaseImage={data.hero.childImageSharp.gatsbyImageData} carouselRotatingImages={[data.hero01.childImageSharp.gatsbyImageData]} />
			<Benefits screenshot={data.screenshot.childImageSharp.gatsbyImageData} />
			<AudienceSegments />
			<section className="my-10 sm:mt-40 sm:mb-15">
				<Container>
					<BuildCustomPackage
						title={T.translate("build_custom_package.title")}
						par={T.translate("build_custom_package.par")}
						cta={T.translate("build_custom_package.cta")}
					/>
				</Container>
			</section>
			<Advantages figure={data.advantages.childImageSharp.gatsbyImageData} />
			<PlaybookCTA
				thumbs={[
					data.playbook_thumb_01.childImageSharp.gatsbyImageData,
					data.playbook_thumb_02.childImageSharp.gatsbyImageData,
					data.playbook_thumb_03.childImageSharp.gatsbyImageData,
				]}
			/>
			<section className="my-20">
				<Container>
					<CaseStudies campaigns={["global"]} overtitle={T.translate("beautyWellnessCampaigns")} bg="white" />
				</Container>
			</section>
			<section className="mt-20 hidden sm:block">
				<TalkToASpecialist />
			</section>
			<section className="marketplace bg-zircon">
				<Marketplace current="entertainmentMedia" />
				<div className="block sm:hidden">
					<TalkToASpecialist />
				</div>
			</section>
		</Layout>
	);
}

export const QueryAuctionPackagesTravelTourism = graphql`
	query {
		hero: file(relativePath: { eq: "auction-packages/entertainment-media/hero_base.png" }) {
			...img
		}
		hero01: file(relativePath: { eq: "auction-packages/entertainment-media/hero_01.png" }) {
			...img
		}

		screenshot: file(relativePath: { eq: "auction-packages/entertainment-media/screenshot.jpg" }) {
			...img
		}
		advantages: file(relativePath: { eq: "auction-packages/entertainment-media/advantages.png" }) {
			...img
		}

		playbook_thumb_01: file(relativePath: { eq: "auction-packages/entertainment-media/playbook_thumb_01.jpg" }) {
			...img
		}
		playbook_thumb_02: file(relativePath: { eq: "auction-packages/entertainment-media/playbook_thumb_02.jpg" }) {
			...img
		}
		playbook_thumb_03: file(relativePath: { eq: "auction-packages/entertainment-media/playbook_thumb_03.jpg" }) {
			...img
		}
	}
`;

/* query ($l: String!) {
		hero: file(relativePath: { eq: "auction-packages/entertainment-media/hero.png" }) {
			...img
		}
	} */
