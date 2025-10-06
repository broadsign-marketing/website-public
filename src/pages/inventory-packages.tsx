import React, { useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico, useDicoNamespace } from "@hooks/useDico";

import { ExploreMoreMarkets } from "@components/Inventory__CityBased_Components";
import BuildCustomPackage from "@components/Inventory__BuildCustomPackage";
import Container from "@components/Container";
import CTA from "@components/CTA";
import Explore from "@components/Inventory__Explore";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Helmet from "react-helmet";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import { ModalTalkToASpecialist } from "@partials/auctionPackages";
import Modal from "@components/Modal";
import Video from "@components/Video";

import play_btn from "@img/controls/play_btn_gradient_blue.svg";

import "@sass/pages/inventory_marketplace.scss";

export default function InventoryPackagesPage({ pageContext: { l, dicoPath }, data }) {
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);
	const [showVideoModal, setShowVideoModal] = useState(false);

	useDico(l, "inventory-marketplace");
	useDicoNamespace("auction-packages");

	function capitalize(str: string) {
		if (str.length === 0) {
			return str;
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	const { inventories } = T.texts;

	return (
		<Layout id="inventory_marketplace" className="theme_carolina">
			<Helmet>
				<meta name="robots" content="noindex, nofollow" />
			</Helmet>
			<section className="hero bg-zircon pt-6 pb-8 sm:pt-20 sm:pb-20">
				<Container>
					<div className="grid">
						<div className="col-12 sm:col-6 lg:col-5">
							<h1 className="text-reflex font-superbold line-height-100 mb-8">{T.translate("hero.title")}</h1>
							<p className="tagline text-reflex text-16 line-height-180 mb-10">{T.translate("hero.blurb")}</p>
							<CTA className="primary mb-10" onClick={() => setShowTalkToASpecialistModal(true)}>
								{T.translate("hero.cta")}
							</CTA>
						</div>
						<div className="col-12 flex flex-center sm:col-6 lg:col-offset-1">
							<button className="video_poster div relative w-full flex flex-center rounded-xl" onClick={() => setShowVideoModal(true)}>
								<img src={play_btn} className="video_poster_play_btn full_center z-5" alt="" />
								<Img
									image={data.hero_video_poster.childImageSharp.gatsbyImageData}
									className="w-full rounded-xl overflow-hidden video_poster_img"
									alt=""
								/>
							</button>
						</div>
					</div>
				</Container>
			</section>
			<Container>
				<h2 className="text-24 text-center text-transform-none mb-10 mt-8 sm:mt-16 sm:text-34 sm:mb-14">{T.translate("exploreVerticals.title")}</h2>
			</Container>
			<Explore />
			<ExploreMoreMarkets variation="wide" />
			<section className="shin pt-1 mb-12">
				<Container>
					<BuildCustomPackage
						title={T.translate("build_custom_package.title")}
						par={T.translate("build_custom_package.par")}
						cta={T.translate("build_custom_package.cta")}
					/>
				</Container>
			</section>
			<Modal show={showVideoModal} variant="video" onClose={() => setShowVideoModal(false)}>
				<Video YoutubeID="Y0LurtvbZ7c" poster={data.hero_video_poster.childImageSharp.gatsbyImageData} />
			</Modal>
			{showTalkToASpecialistModal && <ModalTalkToASpecialist onClose={() => setShowTalkToASpecialistModal(false)} />}
		</Layout>
	);
}

export const queryInventoryPackages = graphql`
	query {
		hero_video_poster: file(relativePath: { eq: "pages/inventory-marketplace/hero_video_poster.jpg" }) {
			...img
		}

		automotive: file(relativePath: { eq: "pages/inventory-marketplace/inventory_automotive.png" }) {
			...img
		}
		beautyWellness: file(relativePath: { eq: "pages/inventory-marketplace/inventory_beauty_wellness.png" }) {
			...img
		}
		entertainmentMedia: file(relativePath: { eq: "pages/inventory-marketplace/inventory_entertainment_media.png" }) {
			...img
		}
		finances: file(relativePath: { eq: "pages/inventory-marketplace/inventory_finances.png" }) {
			...img
		}
		healthcarePharma: file(relativePath: { eq: "pages/inventory-marketplace/inventory_healthcare_pharma.png" }) {
			...img
		}
		cpg: file(relativePath: { eq: "pages/inventory-marketplace/inventory_cpg.png" }) {
			...img
		}
		qsr: file(relativePath: { eq: "pages/inventory-marketplace/inventory_qsr.png" }) {
			...img
		}
		retail: file(relativePath: { eq: "pages/inventory-marketplace/inventory_retail.png" }) {
			...img
		}
		sportsBetting: file(relativePath: { eq: "pages/inventory-marketplace/inventory_sports_betting.png" }) {
			...img
		}
		telco: file(relativePath: { eq: "pages/inventory-marketplace/inventory_telco.png" }) {
			...img
		}
		travelTourism: file(relativePath: { eq: "pages/inventory-marketplace/inventory_travel.png" }) {
			...img
		}
	}
`;
