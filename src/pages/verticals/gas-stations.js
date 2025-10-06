import React, { useMemo } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import route from "@route";

import BillboardSuccessfulNetwork from "@components/Billboard__SuccessfulNetwork";
import Container from "@components/Container";
import Form from "@components/VerticalForm";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Hero from "@components/Hero";
import Layout from "@components/layout";
import Logo from "@components/Logo";
import LogosList from "@components/LogosList";
import ProductBoxes from "@components/VerticalProductBoxes";
import QuoteBlock from "@components/QuoteBlock";
import { Link as ScrollLink } from "react-scroll";
import SpielPoster from "@components/SpielPoster";

import "@sass/pages/verticals/global.scss";
import "@sass/pages/verticals/gas_stations.scss";

const VerticalGasStations = ({ pageContext: { l, dicoPath }, location: { pathname }, data }) => {
	useDico(l, dicoPath);

	if (l === "zh") {
		return <Layout />;
	}

	return (
		<Layout id="page_vertical_gas_stations" className="theme_carolina">
			<Hero img={data.Hero.childImageSharp.gatsbyImageData} alt={T.translate("title")}>
				<div className="text">
					<h1 className="title">
						<span className="dim">{T.translate("Hero.TitlePart1")}</span>
						<em>{T.translate("Hero.TitlePart2")}</em>
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
				</div>
			</Container>
			<SpielPoster className="show_gas_stations_spiel mb-12 sm:mb-20" img={data.spielBg.childImageSharp.gatsbyImageData}>
				<div className="stations_spiel">
					<h3>{T.translate("SpielPosterGasStations.title")}</h3>
					<p>{T.translate("SpielPosterGasStations.text")}</p>
				</div>
			</SpielPoster>
			<ProductBoxes />
			<QuoteBlock sign="MMD media">
				<p>{T.translate("Quoteblock.Quote")}</p>
			</QuoteBlock>
			<BillboardSuccessfulNetwork />
			<LogosList className="cp_logos" tagline={T.translate("Partners.Tagline")} title={T.translate("Partners.Title")}>
				<Logo id="viadirect" />
				<Logo id="screenfeed" />
				<Logo id="tint" />
			</LogosList>
			<Form />
		</Layout>
	);
};

export default VerticalGasStations;

export const queryPageImages = graphql`
	query verticalGasStations {
		Hero: file(relativePath: { eq: "heroes/vertical_gas_stations_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane1: file(relativePath: { eq: "icons/monetize_data.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane2: file(relativePath: { eq: "icons/show_the_way.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		spielBg: file(relativePath: { eq: "bg/vertical_gas_station_spiel_banner.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
