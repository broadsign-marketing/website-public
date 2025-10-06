import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Container from "@components/Container";
import CTA from "@components/CTA";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import QuoteBlock from "@components/QuoteBlock";
import RelatedBlogs from "@components/RelatedBlogs";
import Tank from "@components/Tank";

import saveTime from "@img/icons/save_time_platform.svg";
import improve from "@img/icons/improve_platform.svg";
import tasks from "@img/icons/tasks_platform.svg";
import startUp from "@img/icons/start_up_platform.svg";
import bolt from "@img/icons/bolt_platform.svg";
import quotation_mark from "@img/icons/quotation_mark_grey.svg";

import "@sass/pages/pt.scss";

function Feature({ icon, children }) {
	return (
		<div className="Feature grid mb-8 w-full sm:w-11">
			<div className="col-12 sm:col-2 lg:col-1">
				<img src={icon} className="icon" alt="" />
			</div>
			<div className="col-12 sm:col-10 lg:col-11">{children}</div>
		</div>
	);
}

export default function BroadsignPlatformPTPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	useDico(l, dicoPath);

	const posts = data.posts.nodes;

	return (
		<Layout id="page_broadsign_platform">
			<section className="hero pt-8">
				<Container className="sm:py-15">
					<div className="grid">
						<div className="col-12 sm:col-6">
							<h1 className="text-center mb-8 sm:text-left">{T.translate("Hero.Title")}</h1>
							<p className="blurb text-center sm:text-left">{T.translate("Hero.Tagline")}</p>
							<div className="ctas flex flex-column align-items-center justify-content-start sm:flex-row sm:align-items-stretch">
								<CTA
									className="bg-cerulean text-white border-cerulean hover:bg-white hover:text-cerulean rounded-xl wrap mb-4 sm:mb-0 sm:mr-4"
									to="demo">
									{T.translate("cta.demo")}
								</CTA>
								<CTA className="bg-white text-cerulean border-cerulean hover:bg-cerulean hover:text-white rounded-xl wrap" to="freeTrial">
									{T.translate("cta.freeTrial")}
								</CTA>
							</div>
						</div>
					</div>
				</Container>
				<Img
					className="illustration sm:absolute mt-10 sm:mt-0"
					image={data.Hero.childImageSharp.gatsbyImageData}
					objectFit="contain"
					objectPosition="right bottom"
					alt=""
				/>
			</section>
			<section className="features_list py-12 sm:pt-20">
				<div className="background" />
				<div className="blob" />
				<Tank>
					<div className="grid">
						<div className="col-12 sm:col-6">
							<p className="title w-full sm:w-11">{T.translate("features.title")}</p>
							<p className="description w-full sm:w-11">{T.translate("features.description")}</p>
							<Feature icon={tasks}>
								<h2 className="text-white text-24 font-light text-transform-none line-height-120 mb-4 sm:text-30 md:text-34">
									{T.translate("features.maximize.title")}
								</h2>
								<p className="text-white text-16">{T.translate("features.maximize.description")}</p>
							</Feature>
							<Feature icon={bolt}>
								<h2 className="text-white text-24 font-light text-transform-none line-height-120 mb-4 sm:text-30 md:text-34">
									{T.translate("features.saveTime.title")}
								</h2>
								<p className="text-white text-16">{T.translate("features.saveTime.description")}</p>
							</Feature>
						</div>
						<div className="col-12 sm:col-6">
							<Feature icon={startUp}>
								<h2 className="text-white text-24 font-light text-transform-none line-height-120 mb-4 sm:text-30 md:text-34">
									{T.translate("features.generate.title")}
								</h2>
								<p className="text-white text-16">{T.translate("features.generate.description")}</p>
							</Feature>
							<Feature icon={saveTime}>
								<h2 className="text-white text-24 font-light text-transform-none line-height-120 mb-4 sm:text-30 md:text-34">
									{T.translate("features.connect.title")}
								</h2>
								<p className="text-white text-16">{T.translate("features.connect.description")}</p>
							</Feature>
							<Feature icon={improve}>
								<h2 className="text-white text-24 font-light text-transform-none line-height-120 mb-4 sm:text-30 md:text-34">
									{T.translate("features.shine.title")}
								</h2>
								<p className="text-white text-16">{T.translate("features.shine.description")}</p>
							</Feature>
						</div>
					</div>
				</Tank>
			</section>
			<QuoteBlock>
				<div className="grid">
					<div className="bg-green text-center col-12 sm:col-10">
						<img className="quotation_mark" src={quotation_mark} alt="" />
						<p className="quote">{T.translate("quoteBlock.quote")}</p>
						<p className="sign block text-center">{T.translate("quoteBlock.sign")}</p>
					</div>
					<div className="hidden sm:flex col-2"></div>
				</div>
			</QuoteBlock>
			<section className="demo py-20 mb-20 ml-4 sm:ml-20">
				<div className="grid sm:pl-20 sm:pr-10">
					<div className="col-12 flex justify-content-center sm:col-6">
						<Img image={data.demoPlatform.childImageSharp.gatsbyImageData} className="sm:w-10" alt="" />
					</div>
					<div className="col-12 flex flex-column align-items-center justify-content-center sm:col-6 sm:align-items-center">
						<p className="font_size_3 text-center sm:text-left">
							{T.translate("demo.description")}
							<span>
								<Link style={{ fontWeight: 900 }} to="contact">
									{T.translate("demo.linkCta")}
								</Link>
							</span>
						</p>
						<CTA className="bg-cerulean text-white border-cerulean hover:bg-white hover:text-cerulean" to="demo">
							{T.translate("cta.demo")}
						</CTA>
					</div>
				</div>
			</section>
			<Container className="blog_recent_posts mb-32">
				<h2>{T.translate("customerSpotlight.title")}</h2>
				<RelatedBlogs theme="neon" posts={posts} cta="learnMore" />
				<p className="line-height-180 mt-8 mb-0 sm:text-center">
					<CTA to="blog" className="text-white bg-reflex px-6 py-3 hover:bg-cerulean">
						{T.translate("cta.seeMorePosts")}
					</CTA>
				</p>
			</Container>
		</Layout>
	);
}

export const queryIndex = graphql`
	query BroadsignPlatformImages {
		Hero: file(relativePath: { eq: "heroes/broadsign_platform.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		HeroMeta: file(relativePath: { eq: "meta/broadsign-platform.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		demoPlatform: file(relativePath: { eq: "resources/demo_broadsign_platform.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		posts: allWpPost(limit: 2, sort: { date: DESC }, filter: { status: { eq: "publish" }, language: { slug: { eq: "pt" } } }) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "pt")
			}
		}
	}
`;
