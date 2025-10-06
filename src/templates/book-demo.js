import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import route, { routeWithUtmForm } from "@route";

import { FeatureWrapper, FeatureOverTitle, FeatureTitle, FeaturePar, ComingSoonTag, ShinCTA } from "@components/Aquarius";
import CTA from "@components/CTA";
import Container from "@components/Container";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import GradientBox from "@components/GradientBox";
import { Helmet } from "react-helmet";
import Layout from "@components/layout";
import Modal from "@components/Modal";

import LogosMarquee from "@components/LogosMarquee";
import Campaigns from "@components/App__Carousel_CaseStudies";
import RelatedBlogs from "@components/RelatedBlogs";
import Testimonials from "@components/BroadsignAdsTestimonials";

import logo_ikea from "@logos/ikea_reflex.svg";
import logo_land_rover from "@logos/land_rover_reflex.svg";
import logo_samsung from "@logos/samsung_reflex.svg";
import logo_koodo from "@logos/koodo_reflex.svg";
import logo_scotiabank from "@logos/scotiabank_reflex.svg";
import logo_telus from "@logos/telus_reflex.svg";
import logo_chobani from "@logos/chobani_reflex.svg";
import logo_desjardins from "@logos/desjardins_reflex.svg";
import logo_rakuten from "@logos/rakuten_reflex.svg";
import logo_heinz from "@logos/heinz_reflex.svg";
import logo_airtransat from "@logos/airtransat_reflex.svg";
import logo_gm from "@logos/gm_reflex.svg";
import logo_budweiser from "@logos/budweiser_reflex.png";
import logo_general_mills from "@logos/general_mills_reflex.svg";
import logo_peller_estates from "@logos/peller_estates_reflex.svg";
import logo_td_bank from "@logos/td_bank_reflex.svg";
import logo_ubisoft from "@logos/ubisoft_reflex.svg";
import logo_dentsu_aegis from "@logos/dentsu_aegis_reflex.svg";
import logo_cossette from "@logos/cossette_reflex.svg";
import logo_acura from "@logos/acura_reflex.svg";
import logo_hellofresh from "@logos/hellofresh_reflex.svg";
import logo_nbc from "@logos/nbc_reflex.svg";
import logo_communauto from "@logos/communauto_reflex.svg";
import logo_adviso from "@logos/adviso_reflex.svg";
import logo_cadillac_fairview from "@logos/cadillac_fairview_reflex.svg";
import logo_amplifi from "@logos/amplifi_reflex.png";
import logo_ia_financial_group from "@logos/ia_financial_group_reflex.svg";

import "@sass/templates/book_demo.scss";

/*
THIS TEMPLATE IS USED FOR ALL OF THE FOLLOWING PATHS :
/book-demo/
/schedule-demo/
/request-access/
CHANGES IN THIS TEMPLATE WILL AFFECT ALL THREE PATHS.
*/

export default function BookDemoTemplate({ pageContext: { l }, location: { pathname, search }, cssID, variation }) {
	const [omnilabKeywords, setOmnilabKeywords] = useState(true);
	const [showContactUsModal, setShowContactUsModal] = useState(false);

	useDico(l, "book-demo");

	const data = useStaticQuery(graphql`
		query {
			Hero: file(relativePath: { eq: "pages/book-demo/hero.png" }) {
				childImageSharp {
					gatsbyImageData(width: 498)
				}
			}

			overview_feature_inventory: file(relativePath: { eq: "pages/book-demo/overview_feature_inventory.png" }) {
				childImageSharp {
					gatsbyImageData(width: 445)
				}
			}
			overview_feature_price: file(relativePath: { eq: "pages/book-demo/overview_feature_price.png" }) {
				childImageSharp {
					gatsbyImageData(width: 497)
				}
			}
			overview_feature_audience: file(relativePath: { eq: "pages/book-demo/overview_feature_audience.png" }) {
				childImageSharp {
					gatsbyImageData(width: 424)
				}
			}

			blog_posts_en: allWpPost(limit: 3, sort: { date: DESC }, filter: { status: { eq: "publish" }, language: { slug: { eq: "en" } } }) {
				nodes {
					...BlogPost
					formattedDate: date(formatString: "LL", locale: "en")
				}
			}

			blog_posts_fr: allWpPost(limit: 3, sort: { date: DESC }, filter: { status: { eq: "publish" }, language: { slug: { eq: "fr" } } }) {
				nodes {
					...BlogPost
					formattedDate: date(formatString: "LL", locale: "fr")
				}
			}

			blog_posts_es: allWpPost(limit: 3, sort: { date: DESC }, filter: { status: { eq: "publish" }, language: { slug: { eq: "en" } } }) {
				nodes {
					...BlogPost
					formattedDate: date(formatString: "LL", locale: "es")
				}
			}
		}
	`);

	useEffect(() => {
		function getSlug(str) {
			return str
				.toLowerCase()
				.replace(/ /g, "_")
				.replace(/[^\w-]+/g, "");
		}

		const keywords = require("../assets/omnilab_terms.json");
		const defaultKeyword = "OOH Advertising Solution";
		const query = search.match(/[?&]mm=([^&]+)/) || "";
		let out = defaultKeyword;

		if (query) {
			out = keywords.find((word) => getSlug(word) === query[1]) || defaultKeyword;
		}

		setOmnilabKeywords(out);
	}, []);

	useEffect(() => {
		if (!data && typeof window !== "undefined") {
			window.location.reload();
		}
	}, [data]);

	const posts = data[`blog_posts_${l}`]?.nodes;

	return (
		<Layout id={cssID} className="template book_demo theme_carolina">
			<Helmet>
				<title>{T.texts.seo[variation].title}</title>
				<meta name="description" content={T.texts.seo[variation].description} />
			</Helmet>
			<section className="Hero bg-zircon flex align-items-center">
				<Container className="pt-10 pb-12 sm:py-20">
					<div className="grid flex justify-content-between">
						<div className="col-12 z-10 flex flex-center sm:col-6 sm:pr-8 md:pr-10">
							<div className="bg-white rounded-10 shadow-A p-8 w-full h-full sm:px-12 sm:py-14">
								<h5 class="h5 text-reflex mb-4">{T.translate("Hero.bookDemoTagline")}</h5>
								{variation === "request-access" ? (
									<Form form="requestAccess" className="w-full" redirectUrl={routeWithUtmForm("thankYou", "request_access_broadsign_ads")} />
								) : (
									<Form form="bookDemo" className="w-full clearbit" redirectUrl={routeWithUtmForm("thankYou", "book_demo_broadsign_ads")} />
								)}
							</div>
						</div>
						{variation === "book-demo" && (
							<div className="col-12 z-10 flex flex-column align-items-center sm:col-6 sm:pl-8 md:pl-10">
								<p className="h4 text-reflex font-bold text-center line-height-120 mb-12 sm:text-left">{T.translate("Hero.tagline")}</p>
								<Img image={data.Hero.childImageSharp.gatsbyImageData} className="hero_img w-full" objectFit="contain" alt="" />
							</div>
						)}
						{variation === "schedule-demo" && (
							<div className="col-12 z-10 flex flex-column align-items-center sm:col-6 sm:pl-8 md:pl-10 lg:col-5">
								<h1 className="h4 text-reflex font-bold text-center line-height-120 mb-12 sm:text-left">
									{T.translate("Hero.omnilabHeroText")} {omnilabKeywords}
								</h1>
								<Img image={data.Hero.childImageSharp.gatsbyImageData} className="hero_img w-full" objectFit="contain" alt="" />
							</div>
						)}
						{variation === "request-access" && (
							<div className="col-12 z-10 flex flex-column align-items-center sm:col-6 sm:pl-8 md:pl-10 sm:align-items-start">
								<Img image={data.Hero.childImageSharp.gatsbyImageData} className="hero_img w-full" objectFit="contain" alt="" />
							</div>
						)}
					</div>
				</Container>
			</section>
			<Container className="pt-12 mb-18 sm:pt-16 sm:mb-18">
				<h3 className="h4 mb-10 font-bold text-center sm:mb-15">{T.translate("quotesTitle")}</h3>
				<Testimonials shuffled={true}></Testimonials>
			</Container>
			<section className="bg-zircon overflow-hidden pt-12 sm:pt-20">
				<Container className="mb-8">
					<LogosMarquee
						logos={[
							logo_ikea,
							logo_land_rover,
							logo_samsung,
							logo_koodo,
							logo_scotiabank,
							logo_telus,
							logo_chobani,
							logo_desjardins,
							logo_rakuten,
							logo_heinz,
							logo_airtransat,
							logo_gm,
							logo_budweiser,
							logo_general_mills,
							logo_peller_estates,
							logo_td_bank,
							logo_ubisoft,
							logo_dentsu_aegis,
							logo_cossette,
							logo_acura,
							logo_hellofresh,
							logo_nbc,
							logo_communauto,
							logo_adviso,
							logo_cadillac_fairview,
							logo_amplifi,
							logo_ia_financial_group,
						]}
					/>
				</Container>
				<div className="features">
					<FeatureWrapper className="">
						<div className="col-12 flex flex-column align-items-start justify-content-center flex-order-2 sm:col-6 sm:flex-order-1">
							<FeatureTitle>{T.translate("features.inventory.title")}</FeatureTitle>
							<FeaturePar>{T.translate("features.inventory.par")}</FeaturePar>
							<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="inventoryMarketplace">
								{T.translate("features.inventory.cta")}
							</CTA>
						</div>
						<div className="col-12 flex flex-center flex-order-1 sm:col-6 sm:flex-order-2">
							<Img
								image={data.overview_feature_inventory.childImageSharp.gatsbyImageData}
								className="feature_01_img mx-auto max-w-full mb-4 sm:mb-0"
								objectFit="contain"
								alt=""
							/>
						</div>
					</FeatureWrapper>
					<FeatureWrapper className="sm:flex-row-reverse">
						<div className="col-12 flex flex-column align-items-start justify-content-center flex-order-2 sm:col-6 sm:flex-order-1">
							<FeatureTitle>{T.translate("features.price.title")}</FeatureTitle>
							<FeaturePar>{T.translate("features.price.par")}</FeaturePar>
						</div>
						<div className="col-12 flex flex-center flex-order-1 sm:col-6 sm:flex-order-2">
							<Img
								image={data.overview_feature_price.childImageSharp.gatsbyImageData}
								className="feature_02_img mx-auto max-w-full mb-4 sm:mb-0"
								objectFit="contain"
								alt=""
							/>
						</div>
					</FeatureWrapper>
					<FeatureWrapper>
						<div className="col-12 flex flex-column align-items-start justify-content-center flex-order-2 sm:col-6 sm:flex-order-1">
							<FeatureTitle>{T.translate("features.audience.title")}</FeatureTitle>
							<FeaturePar>{T.translate("features.audience.par")}</FeaturePar>
							<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="audiences">
								{T.translate("features.audience.cta")}
							</CTA>
						</div>
						<div className="col-12 flex flex-center flex-order-1 sm:col-6 sm:flex-order-2">
							<Img
								image={data.overview_feature_audience.childImageSharp.gatsbyImageData}
								className="feature_03_img mx-auto max-w-full mb-4 sm:mb-0"
								objectFit="contain"
								alt=""
							/>
						</div>
					</FeatureWrapper>
				</div>
			</section>
			{posts && (
				<section className="pb-16 sm:pt-16">
					<Container>
						<h2 className="h4 mb-10 sm:text-center">{T.translate("blog.title")}</h2>
						<RelatedBlogs theme="carolina_campsite" posts={posts} cta="learnMore" />
						<p className="line-height-180 mt-15 mb-0 sm:text-center">
							<CTA to="blog" className="text-white bg-reflex hover:bg-cerulean">
								{T.translate("blog.cta")}
							</CTA>
						</p>
					</Container>
				</section>
			)}
			<section className="pt-15 pb-18 sm:py-25">
				<Container>
					<Campaigns bg="white" campaigns={["samsonite", "desjardins", "global", "hp", "ig", "samsung"]} />
				</Container>
				<Container className="mt-22">
					<GradientBox cta={{ label: T.translate("shin.cta"), onClick: () => setShowContactUsModal(true) }} variant="text_cta">
						<h3 className="h4 text-white mb-3">{T.translate("shin.title")}</h3>
						<p className="text-white m-0">{T.translate("shin.par")}</p>
					</GradientBox>
				</Container>
			</section>
			{showContactUsModal && (
				<Modal variant="form" className="theme_carolina narrow" onClose={() => setShowContactUsModal(false)}>
					<h3 className="h4 text-reflex mb-4">{T.translate("letsConnectModal.title")}</h3>
					<p className="text-reflex text-16 text-left mb-8">{T.translate("letsConnectModal.par")}</p>
					<Form form="letsConnect" redirectUrl={routeWithUtmForm("thankYou", "lets_connect_broadsign_ads")} />
				</Modal>
			)}
		</Layout>
	);
}
