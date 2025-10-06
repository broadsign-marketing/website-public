import React, { useMemo, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico, useDicoNamespace } from "@hooks/useDico";

import { Hero, Opportunities, TalkToASpecialist, TopPackages, BillboardsTypes, ExploreMoreMarkets, FAQ } from "@components/Inventory__CityBased_Components";
import Container from "@components/Container";
import Layout from "@components/layout";

import icon_opportunity_diversity from "@img/pages/inventory-marketplace/city_based/icon_opportunity_diversity.svg";
import icon_opportunity_income from "@img/pages/inventory-marketplace/city_based/icon_opportunity_income.svg";
import icon_opportunity_travel from "@img/pages/inventory-marketplace/city_based/icon_opportunity_travel.svg";
import icon_airport from "@img/pages/inventory-marketplace/city_based/icon_airport.svg";
import icon_business from "@img/pages/inventory-marketplace/city_based/icon_business.svg";
import icon_camera from "@img/pages/inventory-marketplace/city_based/icon_camera.svg";
import icon_family from "@img/pages/inventory-marketplace/city_based/icon_family.svg";
import icon_female from "@img/pages/inventory-marketplace/city_based/icon_female.svg";
import icon_groups from "@img/pages/inventory-marketplace/city_based/icon_groups.svg";
import icon_household from "@img/pages/inventory-marketplace/city_based/icon_household.svg";
import icon_id from "@img/pages/inventory-marketplace/city_based/icon_id.svg";
import icon_income from "@img/pages/inventory-marketplace/city_based/icon_income.svg";
import icon_school from "@img/pages/inventory-marketplace/city_based/icon_school.svg";
import icon_subway from "@img/pages/inventory-marketplace/city_based/icon_subway.svg";

import "@sass/pages/inventory_marketplace_city_based.scss";

export default function CityBasedInventoryMarketplaceNYC({ pageContext: { l, dicoPath }, data }) {
	useDico(l, dicoPath);
	useDicoNamespace("auction-packages");

	const { hero, topPackages, billboards } = T.texts;

	const icons: any = useMemo(() => {
		return {
			opportunity_diversity: icon_opportunity_diversity,
			opportunity_income: icon_opportunity_income,
			opportunity_travel: icon_opportunity_travel,
			airport: icon_airport,
			business: icon_business,
			camera: icon_camera,
			family: icon_family,
			female: icon_female,
			groups: icon_groups,
			household: icon_household,
			id: icon_id,
			income: icon_income,
			school: icon_school,
			subway: icon_subway,
		};
	}, []);

	const opportunities = useMemo(() => {
		const { opportunities }: any = T.texts;
		if (!opportunities?.list) return [];

		return opportunities.list.map((opp) => {
			opp.features = opp.features.map((feature) => ({
				...feature,
				icon: icons[feature.id],
			}));

			return {
				...opp,
				featured_image: data[`opportunity_${opp.id}`].childImageSharp.gatsbyImageData,
				icon: icons[`opportunity_${opp.id}`],
			};
		});
	}, [data, icons]);

	return (
		<Layout id="inventory_marketplace_nyc" className="theme_carolina im_city_based">
			<Hero content={hero} image={data.hero.childImageSharp.gatsbyImageData} />
			<Container tag="section" className="opportunities -mb-10 sm:mb-0">
				<h2 className="text-24 text-center text-transform-none w-full mb-6 sm:text-34">{T.translate("opportunities.title")}</h2>
				<p className="text-center line-height-180 max-w-720 mx-auto mb-22">{T.translate("opportunities.blurb")}</p>
				<Opportunities content={opportunities} />
			</Container>
			<TalkToASpecialist title={T.translate("ctaBox1.title")} cta={T.translate("ctaBox1.cta")} />
			<TopPackages content={topPackages} />
			<Container tag="section" className="billboards_types">
				<h2 className="text-24 text-center text-transform-none w-full mb-6 sm:text-34">{T.translate("billboards.title")}</h2>
				<BillboardsTypes content={billboards.list} />
			</Container>
			<TalkToASpecialist title={T.translate("ctaBox2.title")} cta={T.translate("ctaBox2.cta")} />
			<ExploreMoreMarkets currentCity="new_york_city" />
			{/* <FAQ content={faq} /> */}
		</Layout>
	);
}

export const queryInventoryPackages = graphql`
	query {
		hero: file(relativePath: { eq: "pages/inventory-marketplace/city_based/new_york_city_hero.jpg" }) {
			...img
		}

		opportunity_diversity: file(relativePath: { eq: "pages/inventory-marketplace/city_based/new_york_city_opportunity_diversity.jpg" }) {
			...img
		}
		opportunity_income: file(relativePath: { eq: "pages/inventory-marketplace/city_based/new_york_city_opportunity_income.jpg" }) {
			...img
		}
		opportunity_travel: file(relativePath: { eq: "pages/inventory-marketplace/city_based/new_york_city_opportunity_travel.jpg" }) {
			...img
		}
	}
`;
