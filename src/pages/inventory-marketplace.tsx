import React, { useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico, useDicoNamespace } from "@hooks/useDico";
import { routeWithUtmForm } from "@route";

import { ExploreMoreMarkets } from "@components/Inventory__CityBased_Components";
// import BuildCustomPackage from "@components/Inventory__BuildCustomPackage";
import Container from "@components/Container";
import CTA from "@components/CTA";
import Explore from "@components/Inventory__Explore";
import Form from "@components/Form";
import FormLetsConnectVWO40VB from "@components/Form__LetsConnectVWO_Test40_VersionB";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";

import Modal from "@components/Modal";
import Video from "@components/Video";

import play_btn from "@img/controls/play_btn_gradient_blue.svg";
import whirl from "@img/pages/inventory-marketplace/custom_package.svg";

import "@sass/pages/inventory_marketplace.scss";

export default function InventoryMarketplacePage({ pageContext: { l, dicoPath }, data }) {
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);
	const [showVideoModal, setShowVideoModal] = useState(false);

	useDico(l, dicoPath);
	useDicoNamespace("auction-packages");

	return (
		<Layout id="inventory_marketplace" className="theme_carolina">
			<section className="hero bg-zircon pt-6 pb-8 sm:pt-20 sm:pb-20">
				<Container>
					<div className="grid">
						<div className="col-12 sm:col-6 lg:col-5">
							<h1 className="text-reflex font-superbold line-height-100 mb-8">{T.translate("hero.title")}</h1>
							<p className="tagline text-reflex text-16 line-height-180 mb-10">{T.translate("hero.blurb")}</p>
							<CTA className="primary" onClick={() => setShowTalkToASpecialistModal(true)}>
								{T.translate("hero.cta")}
							</CTA>
						</div>
						<div className="col-12 flex flex-center mt-12 sm:col-6 sm:mt-0 lg:col-offset-1">
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
			<ExploreMoreMarkets variation="wide" ctaBox={true} />
			<section className="shin pt-1 mb-14">
				<Container>
					{/* <BuildCustomPackage
						title={T.translate("build_custom_package.title")}
						par={T.translate("build_custom_package.par")}
						cta={T.translate("build_custom_package.cta")}
					/> */}
					<div className="InventoryBuildCustomPackage bg-gradient rounded-xl">
						<div className="grid">
							<div className="col-12 text-center sm:col-5 md:col-4">
								<img src={whirl} className="img max-w-full" alt="" />
							</div>
							<div className="col-12 sm:col-7 md:col-8">
								<div className="pt-8 pb-10 px-4 sm:pr-10">
									<h2 className="h4 text-white text-left mb-4">{T.translate("build_custom_package.title")}</h2>
									<p className="text-white text-left line-height-180 mb-10 sm:mb-6">{T.translate("build_custom_package.par")}</p>
									<CTA
										preset="white-outline-transparent"
										hoverPreset="full-white"
										onClick={() => setShowTalkToASpecialistModal(true)}
										className="max-w-full">
										{T.translate("build_custom_package.cta")}
									</CTA>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>
			<Modal show={showVideoModal} variant="video" onClose={() => setShowVideoModal(false)}>
				<Video YoutubeID="Y0LurtvbZ7c" poster={data.hero_video_poster.childImageSharp.gatsbyImageData} />
			</Modal>
			<Modal show={showTalkToASpecialistModal} variant="form" className="theme_carolina narrow" onClose={() => setShowTalkToASpecialistModal(false)}>
				<div className="__vwo_40_va">
					<h3 className="h4 text-reflex mb-8">{T.translate("talkToASpecialistToday")}</h3>
					<Form form="talkToASpecialist" redirectUrl={routeWithUtmForm("thankYou", "talk_to_a_media_specialist")} />
				</div>
				<div className="__vwo_40_vb">
					<FormLetsConnectVWO40VB />
				</div>
			</Modal>
		</Layout>
	);
}

export const queryInventoryMarketplace = graphql`
	query {
		hero_video_poster: file(relativePath: { eq: "pages/inventory-marketplace/hero_video_poster.jpg" }) {
			...img
		}
	}
`;
