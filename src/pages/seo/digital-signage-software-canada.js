import React from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import route from "@route";
import { graphql } from "gatsby";

import CTA from "@components/CTA";
import Form from "@components/VerticalForm";
import Hero from "@components/Hero";
import { GatsbyImage as Img, getSrc } from "gatsby-plugin-image";
import ImgFlank from "@components/ImgFlank";
import ImgHat from "@components/ImgHat";
import Layout from "@components/layout";
import Row from "@components/Row";
import Tank from "@components/Tank";

import "@sass/pages/seo_global.scss";
import "@sass/pages/seo_canada.scss";

import bubble_airports from "@icons/bubble_airports.svg";
import bubble_cinema from "@icons/bubble_cinema.svg";
import bubble_hospital from "@icons/bubble_hospital.svg";
import bubble_retail from "@icons/bubble_retail.svg";
import bubble_transit from "@icons/bubble_transit.svg";

function ProductColumn({ id, img, to }) {
	return (
		<div className="product_offer" id={id}>
			<ImgHat src={img} title="">
				<h3 className="tagline">
					<em>{T.translate("products.column." + id + ".title.em")}</em>
					<span>{T.translate("products.column." + id + ".title.span")}</span>
				</h3>
				<p className="desc">{T.translate("products.column." + id + ".par")}</p>
				<p className="ctas">
					<CTA className="bg-transparent text-white border-white hover:bg-white hover:text-reflex" to={to}>
						{T.translate("cta.learnMore")}
					</CTA>
				</p>
			</ImgHat>
		</div>
	);
}

export default function SEOCanadaPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	useDico(l, dicoPath);

	return (
		<Layout id="page_seo_canada" className="seo">
			<Hero img={data.Hero.childImageSharp.gatsbyImageData} alt={T.translate("broadsignControl.title")}>
				<div className="text">
					<h1 className="title">
						<span>{T.translate("Hero.title.span")}</span>
						<em>{T.translate("Hero.title.em")}</em>
					</h1>
					<p className="tagline">{T.translate("Hero.tagline")}</p>
					<div className="ctas">
						<CTA className="bg-reflex text-white border-reflex hover:bg-cerulean hover:border-cerulean" to="demo">
							{T.translate("cta.demo")}
						</CTA>
					</div>
				</div>
			</Hero>
			<Tank id="intro">
				<h2>{T.translate("intro.title")}</h2>
				<p>{T.translate("intro.par")}</p>
			</Tank>
			<section id="verticals">
				<Tank>
					<h2>{T.translate("verticals.title")}</h2>
					<Row>
						<ImgHat src={bubble_retail} title={T.translate("verticals.icon1.num")} text={T.translate("verticals.icon1.what")} />
						<ImgHat src={bubble_hospital} title={T.translate("verticals.icon2.num")} text={T.translate("verticals.icon2.what")} />
						<ImgHat src={bubble_cinema} title={T.translate("verticals.icon3.num")} text={T.translate("verticals.icon3.what")} />
						<ImgHat src={bubble_airports} title={T.translate("verticals.icon4.num")} text={T.translate("verticals.icon4.what")} />
						<ImgHat src={bubble_transit} title={T.translate("verticals.icon5.num")} text={T.translate("verticals.icon5.what")} />
					</Row>
				</Tank>
			</section>
			<section id="must_haves">
				<Tank>
					<h2>{T.translate("mustHaves.title")}</h2>
					<ImgFlank src={data.Trifactor.childImageSharp.gatsbyImageData} alt="Trifactor">
						<p>{T.translate("mustHaves.par1")}</p>
						<ul>
							<li>{T.translate("mustHaves.list.el1")}</li>
							<li>{T.translate("mustHaves.list.el2")}</li>
							<li>{T.translate("mustHaves.list.el3")}</li>
						</ul>
						<p>{T.translate("mustHaves.par2")}</p>
					</ImgFlank>
				</Tank>
			</section>
			<Form>
				<h2 className="text-30 mb-8 text-transform-none sm:text-34">Request a demo today!</h2>
			</Form>
		</Layout>
	);
}

export const queryHeader = graphql`
	query SEOCanadaImages {
		Hero: file(relativePath: { eq: "heroes/canada.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		Trifactor: file(relativePath: { eq: "ui/must_have_trifactor.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
