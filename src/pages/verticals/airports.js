import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import route from "@route";

import BillboardSuccessfulNetwork from "@components/Billboard__SuccessfulNetwork";
import BillboardSoc2 from "@components/Billboard__Soc2";
import Container from "@components/Container";
import Form from "@components/VerticalForm";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Hero from "@components/Hero";
import Link from "@components/LocalizedLink";
import LogosList from "@components/LogosList";
import Layout from "@components/layout";
import Logo from "@components/Logo";
import ProductBoxes from "@components/VerticalProductBoxes";
import QuoteBlock from "@components/QuoteBlock";
import { Link as ScrollLink } from "react-scroll";
import Tank from "@components/Tank";

import "@sass/pages/verticals/global.scss";
import "@sass/pages/verticals/airports.scss";

const VerticalAirports = ({ pageContext: { l, dicoPath }, location: { pathname }, data }) => {
	useDico(l, dicoPath);

	return (
		<Layout id="page_vertical_airports" className="theme_carolina">
			<Hero img={data.Hero.childImageSharp.gatsbyImageData} alt={T.translate("title")}>
				<div className="text">
					<h1 className="title">
						<em>{T.translate("Hero.TitlePart1")}</em>
						<span>{T.translate("Hero.TitlePart2")}</span>
						<span>{T.translate("Hero.TitlePart3")}</span>
					</h1>
					<p className="tagline">{T.translate("Hero.Blurb")}</p>
					<div className="ctas">
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
				</div>
			</Hero>
			<Container id="features" className="my-20">
				<div className="grid">
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane1.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane1.Title")}</h3>
						<p>{T.translate("Lattice.Pane1.Paragraph")}</p>
					</div>
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane2.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane2.Title")}</h3>
						<p>{T.translate("Lattice.Pane2.Paragraph")}</p>
					</div>
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane3.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane3.Title")}</h3>
						<p>{T.translate("Lattice.Pane3.Paragraph")}</p>
					</div>
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane4.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane4.Title")}</h3>
						<p>{T.translate("Lattice.Pane4.Paragraph")}</p>
					</div>
				</div>
			</Container>
			<section className="showVisitorSpiel">
				<Tank div>
					<div className="show_visitor">
						<h3>{T.translate("SpielPosterAirports.title")}</h3>
						<p>{T.translate("SpielPosterAirports.text")}</p>
					</div>
				</Tank>
			</section>
			<Container className="text-center mt-16 mb-10">
				<h3 className="h5">{T.translate("cards.title")}</h3>
				<p>{T.translate("cards.par")}</p>
			</Container>
			<ProductBoxes />
			<QuoteBlock sign="mmd media">
				<p>{T.translate("Quoteblock.Quote")}</p>
			</QuoteBlock>
			<BillboardSuccessfulNetwork />
			<BillboardSoc2 />
			<LogosList className="cp_logos" tagline={T.translate("Partners.Tagline")} title={T.translate("Partners.Title")} columns="4">
				<Logo id="quividi" />
				<Logo id="viadirect" />
				<Logo id="tint" />
				<Logo id="gv" />
			</LogosList>
			<Form />
		</Layout>
	);
};

export default VerticalAirports;

/* Import GraphQL Fragments */

export const queryPageImages = graphql`
	query verticalAirports {
		Hero: file(relativePath: { eq: "heroes/vertical_airports_bg.jpg" }) {
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
		iconLatticePane4: file(relativePath: { eq: "icons/screen_sharing.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		spielBg: file(relativePath: { eq: "bg/vertical_airports_spiel_banner_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		videoPosterBg: file(relativePath: { eq: "bg/video_poster_vertical_casino_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
