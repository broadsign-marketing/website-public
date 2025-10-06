import React, { useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { routeWithUtmForm } from "@route";
import { blogPostSlug } from "@annex";
import clsx from "clsx";

import CTA from "@components/CTA";
import Container from "@components/Container";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import LogosMarquee from "@components/LogosMarquee";
import Modal from "@components/Modal";
import NeonBox from "@components/NeonBox";
import VerticalFeature from "@components/VerticalFeature";

import logo_coles from "@logos/coles_reflex.svg";
import logo_coles_express from "@logos/coles_express_reflex.svg";
import logo_iga from "@logos/iga_reflex.svg";
import logo_7eleven from "@logos/seven_eleven_reflex.svg";
import logo_woolworths from "@logos/woolworths_reflex.svg";

import icon_decisions from "@img/pages/verticals-retail/icon_decisions.svg";
import icon_value from "@img/pages/verticals-retail/icon_value.svg";
import icon_consumers from "@img/pages/verticals-retail/icon_consumers.svg";

import icon_automate from "@img/pages/verticals-retail/icon_automate.svg";
import icon_boost from "@img/pages/verticals-retail/icon_boost.svg";
import icon_endless from "@img/pages/verticals-retail/icon_endless.svg";
import icon_programmatic from "@img/pages/verticals-retail/icon_programmatic.svg";

import whirl from "@img/pages/inventory-marketplace/custom_package.svg";

import "@sass/pages/verticals/retail.scss";

export default function VerticalRetail({ pageContext: { l, dicoPath }, location: { hash }, data }) {
	useDico(l, dicoPath);

	const [showBookCallModal, setShowBookCallModal] = useState(() => {
		const h = typeof hash === "string" ? hash.replace(/^#/, "") : "";
		const r = /^[ck]onta[ck]to?$/;
		return r.test(h);
	});

	const features = T.texts.features.list as any;

	const icons = {
		decisions: icon_decisions,
		value: icon_value,
		consumers: icon_consumers,
		automate: icon_automate,
		boost: icon_boost,
		endless: icon_endless,
		programmatic: icon_programmatic,
	};

	return (
		<Layout id="vertical_retail" className="theme_carolina">
			<section className="hero mb-16 sm:mb-20">
				<Container>
					<div className="grid">
						<div className="col-12 sm:col-6 sm:flex-order-2 md:col-7">
							<Img image={data[`hero_${l}`].childImageSharp.gatsbyImageData} className="hero_img mb-4 sm:mb-0" alt="" />
						</div>
						<div className="col-12 mt-8 sm:col-6 sm:flex-order-1 md:col-5">
							<p className="subtitle-1 gradient font-medium">{T.translate("hero.overtitle")}</p>
							<h1 className="text-reflex font-black line-height-120 text-transform-none mb-8">{T.translate("hero.title")}</h1>
							<p className="tagline text-ash text-16 line-height-180 mb-10">{T.translate("hero.blurb")}</p>
							<CTA onClick={() => setShowBookCallModal(true)} className="primary">
								{T.translate("hero.cta")}
							</CTA>
						</div>
					</div>
				</Container>
			</section>
			<section className="clients pb-20 md:pt-12 md:pb-25">
				<Container className="text-center">
					<p className="subtitle-1 gradient font-medium mb-6">{T.translate("clients.overtitle")}</p>
				</Container>
				<LogosMarquee logos={[logo_coles, logo_iga, logo_7eleven, logo_coles_express, logo_woolworths]} />
			</section>
			<Container tag="section" className="experiences mb-18">
				<h2 className="text-reflex text-24 font-black text-center line-height-140 text-transform-none mx-auto mb-8 max-w-720 sm:text-34 sm:mb-10">
					{T.translate("experiences.title")}
				</h2>
				<div className="grid">
					{T.texts.experiences.boxes.map((box) => (
						<div className="col-12 sm:col-4" key={box.id}>
							<NeonBox>
								<img src={icons[box.id]} alt="" />
								<h3 className="line-height-100 text-transform-none mb-2">{box.num}%</h3>
								<p className="subtitle-1 gradient font-black text-transform-none mb-4">{box.par}</p>
								<p className="text-ash text-12 mb-0">
									{T.translate("experiences.source")}: {box.source}
								</p>
							</NeonBox>
						</div>
					))}
				</div>
			</Container>
			<Container tag="section" className="features">
				<div className="text-center mb-16 sm:mb-20">
					<p className="subtitle-1 gradient font-medium">{T.translate("features.overtitle")}</p>
					<h2 className="text-reflex text-24 font-black text-center line-height-140 text-transform-none mx-auto max-w-900 sm:text-34 sm:mb-10">
						{T.translate("features.title")}
					</h2>
				</div>
				{features.map(({ id, overtitle, title, blurb }: any, k: number) => (
					<VerticalFeature
						className="mb-10 sm:mb-18"
						img={data[`feature_${id}_${l}`].childImageSharp.gatsbyImageData}
						imgPosition={k % 2 === 0 ? "right" : "left"}
						overtitle={overtitle}
						title={title}
						blurb={blurb}
						key={id}
					/>
				))}
			</Container>
			<Container tag="section" className="platform mb-14 sm:mb-20">
				<div className="text-center">
					<p className="subtitle-1 gradient font-medium">{T.translate("platform.overtitle")}</p>
					<h2 className="text-reflex text-24 font-black text-center line-height-140 text-transform-none mx-auto mb-8 max-w-900 sm:text-34 sm:mb-10">
						{T.translate("platform.title")}
					</h2>
					<div className="mx-auto max-w-900">
						{T.texts.platform.boxes.map(({ id, title, par }) => (
							<NeonBox className="mb-4" innerClassName="flex flex-column align-items-start pt-3 pl-3 sm:flex-row" key={id}>
								<img className="icon mb-4" src={icons[id]} alt="" />
								<div className="flex flex-column sm:pl-3">
									<h3
										className="text-20 text-transform-none line-height-140 text-left mb-4 inline-flex align-items-center sm:text-24 sm:mb-0"
										style={{ minHeight: "48px" }}>
										{title}
									</h3>
									<p className="line-height-180 text-left m-0">{par}</p>
								</div>
							</NeonBox>
						))}
					</div>
					<CTA className="primary mt-12" to="inStoreRetailPlatform">
						{T.translate("learnMore")}
					</CTA>
				</div>
			</Container>
			{["en", "fr", "es"].includes(l) && (
				<Container tag="section" className="related_posts text-center pt-10 pb-10 md:mb-25">
					<p className="subtitle-1 gradient font-medium">{T.translate("relatedPosts.overtitle")}</p>
					<h2 className="text-reflex text-24 font-black line-height-140 text-transform-none mx-auto mb-8 max-w-900 sm:text-34">
						{T.translate("relatedPosts.title")}
					</h2>
					<div className="grid align-items-stretch mb-10">
						{data.posts.nodes.map((post: any) => (
							<div className="col-12 sm:col-4" key={post.slug}>
								<Link
									to={blogPostSlug(post.slug, l)}
									className={clsx("post_card bg-zircon flex flex-column rounded-xl overflow-hidden")}
									key={post.id}>
									<Img className="post_thumb" image={post.featuredImage.node.gatsbyImage} alt="" />
									<div className="post_details flex flex-column justify-content-between flex-auto text-left p-4 md:px-6 md:py-5">
										<p className="post_date">{post.formattedDate}</p>
										<h3 className="post_title text-reflex font-black text-transform-none mb-8">{post.title}</h3>
										<p className="mb-0 mt-auto">
											<span className="link_cerulean_arrow text-cerulean uppercase letter-spacing-5">{T.translate("readMore")}</span>
										</p>
									</div>
								</Link>
							</div>
						))}
					</div>
					<CTA className="primary mx-auto" to="streamRetailMediaNetworks">
						{T.translate("seeMore")}
					</CTA>
				</Container>
			)}
			{l === "en" && (
				<Container tag="section" className="ebooks pb-18">
					<div className="grid">
						<div className="col-12 text-center">
							<p className="subtitle-1 gradient font-medium">{T.translate("ebooks.overtitle")}</p>
							<h2 className="text-reflex text-24 font-black line-height-140 text-transform-none mx-auto mb-8 max-w-900 sm:text-34">
								{T.translate("ebooks.title")}
							</h2>
						</div>
						{T.texts.ebooks.banners.map(({ id, title, cta, to }) => (
							<div className="col-12 sm:col-4" key={id}>
								<Link className={clsx("ebook_banner flex flex-column align-items-start justify-content-between rounded-xl h-full", id)} to={to}>
									<Img image={data[`ebook_${id}`].childImageSharp.gatsbyImageData} className="thumb w-full" alt="" />
									<div className="p-4 md:p-5">
										<h3 className="text-20 mb-5 text-transform-none">{title}</h3>
										<button className="CTA mt-auto">{cta}</button>
									</div>
								</Link>
							</div>
						))}
					</div>
				</Container>
			)}
			<Container tag="section" className={clsx("shin mb-14", l === "de" ? "pt-25" : "")}>
				<div className={clsx("bg-gradient rounded-xl")}>
					<div className="grid">
						<div className="col-12 text-center sm:col-5 md:col-4">
							<img src={whirl} className="img max-w-full" alt="" />
						</div>
						<div className="col-12 sm:col-7 md:col-8">
							<div className="pt-8 pb-10 px-4 sm:pr-10">
								<h2 className="h4 text-white text-left mb-4">{T.translate("shin.title")}</h2>
								<p className="text-white text-left line-height-180 mb-10 sm:mb-6">{T.translate("shin.par")}</p>
								<CTA
									preset="white-outline-transparent"
									hoverPreset="full-white"
									onClick={() => setShowBookCallModal(true)}
									className="max-w-full">
									{T.translate("shin.cta")}
								</CTA>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Modal show={showBookCallModal} variant="form" className="theme_carolina narrow" onClose={() => setShowBookCallModal(false)}>
				<h3 className="text-20 text-reflex text-transform-none mb-8 sm:text-24">{T.translate("forms.bookACall.title")}</h3>
				<Form
					form="bookACall"
					campaign="bookACallRetail"
					submitText="Book a Call"
					redirectUrl={routeWithUtmForm("thankYou", "book_a_call_retail")}
					hidePlaceholders={true}
				/>
			</Modal>
		</Layout>
	);
}

export const queryPageImages = graphql`
	query ($l: String!) {
		hero_en: file(relativePath: { eq: "pages/verticals-retail/hero_en.jpg" }) {
			...img
		}
		hero_fr: file(relativePath: { eq: "pages/verticals-retail/hero_fr.jpg" }) {
			...img
		}
		hero_es: file(relativePath: { eq: "pages/verticals-retail/hero_es.jpg" }) {
			...img
		}
		hero_de: file(relativePath: { eq: "pages/verticals-retail/hero_en.jpg" }) {
			...img
		}

		feature_convert_shoppers_en: file(relativePath: { eq: "pages/verticals-retail/feature_convert_shoppers_en.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}
		feature_boost_shopping_cart_value_en: file(relativePath: { eq: "pages/verticals-retail/feature_boost_shopping_cart_value_en.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}
		feature_new_revenue_streams_en: file(relativePath: { eq: "pages/verticals-retail/feature_new_revenue_streams_en.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}

		feature_convert_shoppers_fr: file(relativePath: { eq: "pages/verticals-retail/feature_convert_shoppers_fr.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}
		feature_boost_shopping_cart_value_fr: file(relativePath: { eq: "pages/verticals-retail/feature_boost_shopping_cart_value_fr.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}
		feature_new_revenue_streams_fr: file(relativePath: { eq: "pages/verticals-retail/feature_new_revenue_streams_fr.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}

		feature_convert_shoppers_es: file(relativePath: { eq: "pages/verticals-retail/feature_convert_shoppers_es.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}
		feature_boost_shopping_cart_value_es: file(relativePath: { eq: "pages/verticals-retail/feature_boost_shopping_cart_value_es.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}
		feature_new_revenue_streams_es: file(relativePath: { eq: "pages/verticals-retail/feature_new_revenue_streams_es.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}

		feature_convert_shoppers_de: file(relativePath: { eq: "pages/verticals-retail/feature_convert_shoppers_en.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}
		feature_boost_shopping_cart_value_de: file(relativePath: { eq: "pages/verticals-retail/feature_boost_shopping_cart_value_en.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}
		feature_new_revenue_streams_de: file(relativePath: { eq: "pages/verticals-retail/feature_new_revenue_streams_en.png" }) {
			childImageSharp {
				gatsbyImageData(height: 534)
			}
		}

		ebook: file(relativePath: { eq: "pages/verticals-retail/ebook_retail.png" }) {
			...img
		}

		ebook_in_store_activation: file(relativePath: { eq: "pages/verticals-retail/ebook_in_store_activation.png" }) {
			...img
		}
		ebook_increase_revenue: file(relativePath: { eq: "pages/verticals-retail/ebook_increase_revenue.png" }) {
			...img
		}
		ebook_rise_of_retail: file(relativePath: { eq: "pages/verticals-retail/ebook_rise_of_retail.png" }) {
			...img
		}

		posts: allWpPost(
			sort: { date: DESC }
			filter: {
				status: { eq: "publish" }
				tags: { nodes: { elemMatch: { slug: { regex: "/(retail|vente-au-detail|medios-minoristas|einzelhandel)/" } } } }
				language: { slug: { eq: $l } }
			}
			limit: 3
		) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: $l)
			}
		}
	}
`;
