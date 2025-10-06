import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import BillboardSuccessfulNetwork from "@components/Billboard__SuccessfulNetwork";
import BillboardSoc2 from "@components/Billboard__Soc2";
import Container from "@components/Container";
import Form from "@components/VerticalForm";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Hero from "@components/Hero";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Logo from "@components/Logo";
import LogosList from "@components/LogosList";
import ProductBoxes from "@components/VerticalProductBoxes";
import QuoteBlock from "@components/QuoteBlock";
import { Link as ScrollLink } from "react-scroll";
import SpielPoster from "@components/SpielPoster";

import "@sass/pages/verticals/global.scss";
import "@sass/pages/verticals/hotels.scss";

const VerticalHotels = ({ pageContext: { l, dicoPath }, location: { pathname }, data }) => {
	useDico(l, dicoPath);

	if (l === "zh") {
		return <Layout />;
	}

	return (
		<Layout id="page_vertical_hotels" className="theme_carolina">
			<Hero img={data.Hero.childImageSharp.gatsbyImageData} alt={T.translate("title")}>
				<div className="text">
					<h1 className="title">
						<em>{T.translate("Hero.TitlePart1")}</em>
						<span className="dim">{T.translate("Hero.TitlePart2")}</span>
						<span>{T.translate("Hero.TitlePart3")}</span>
					</h1>
					<p className="tagline">{T.translate("Hero.Blurb")}</p>
					<ScrollLink
						activeClass="active"
						className="CTA bg-transparent text-white border-white hover:bg-white hover:text-reflex"
						to="VerticalForm"
						spy={true}
						smooth={true}
						duration={800}>
						{T.translate("Hero.cta")}
					</ScrollLink>
				</div>
			</Hero>
			<Container id="features" className="my-20">
				<div className="grid">
					<div className="col-12 text-center sm:col-4">
						<Img image={data.iconLatticePane1.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane1.Title")}</h3>
						<p>{T.translate("Lattice.Pane1.Paragraph")}</p>
					</div>
					<div className="col-12 text-center sm:col-4">
						<Img image={data.iconLatticePane2.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane2.Title")}</h3>
						<p>{T.translate("Lattice.Pane2.Paragraph")}</p>
						<p className="link">
							<Link className="link_cerulean_arrow" to="contentNetworkManagement">
								{T.translate("cta.discoverContentNetworkManagement")}
							</Link>
						</p>
					</div>
					<div className="col-12 text-center sm:col-4">
						<Img image={data.iconLatticePane3.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane3.Title")}</h3>
						<p>{T.translate("Lattice.Pane3.Paragraph")}</p>
					</div>
				</div>
			</Container>
			<SpielPoster className="hotelsSpiel" img={data.spielBg.childImageSharp.gatsbyImageData}></SpielPoster>
			<Container className="text-center mt-16 mb-10">
				<h3 className="h5">{T.translate("cards.title")}</h3>
				<p>{T.translate("cards.par")}</p>
			</Container>
			<ProductBoxes />
			<QuoteBlock sign="clear digital media">
				<p>{T.translate("Quoteblock.Quote")}</p>
			</QuoteBlock>
			<LogosList className="cp_logos" title={T.translate("Partners.Title")}>
				<Logo id="jcd" />
				<Logo id="cineplex" />
				<Logo id="global" />
				<Logo id="elevision" />
			</LogosList>
			<BillboardSuccessfulNetwork />
			<BillboardSoc2 />
			<Form />
		</Layout>
	);
};

export default VerticalHotels;

export const queryPageImages = graphql`
	query verticalHotels {
		Hero: file(relativePath: { eq: "heroes/vertical_hotels_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane1: file(relativePath: { eq: "icons/timely.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane2: file(relativePath: { eq: "icons/dynamic_content.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane3: file(relativePath: { eq: "icons/profit.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		spielBg: file(relativePath: { eq: "bg/vertical_hotels_spiel_banner_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
