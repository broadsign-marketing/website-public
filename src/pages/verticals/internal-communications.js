import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

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
import "@sass/pages/verticals/internal_communications.scss";

const VerticalInternalCommunications = ({ pageContext: { l, dicoPath }, location: { pathname }, data }) => {
	useDico(l, dicoPath);

	if (l === "zh") {
		return <Layout />;
	}

	return (
		<Layout id="page_vertical_internal_communications" className="theme_carolina">
			<Hero img={data.Hero.childImageSharp.gatsbyImageData} alt={T.translate("title")}>
				<div className="text">
					<h1 className="title">
						<span>{T.translate("Hero.TitlePart1")}</span>
						<em>{T.translate("Hero.TitlePart2")}</em>
						<span className="dim">{T.translate("Hero.TitlePart3")}</span>
					</h1>
					<h1 className="title mobile">
						<span>{T.translate("Hero.TitlePart1Mobile")}</span>
						<em>{T.translate("Hero.TitlePart2Mobile")}</em>
						<span className="dim">{T.translate("Hero.TitlePart3")}</span>
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
			<SpielPoster img={data.spielBg.childImageSharp.gatsbyImageData} className="showVisitorSpiel">
				<div className="show_visitor">
					<h3>{T.translate("SpielPosterVisitor.title")}</h3>
					<p>{T.translate("SpielPosterVisitor.text")}</p>
				</div>
			</SpielPoster>
			<Container className="text-center mt-16 mb-10">
				<h3 className="h5">{T.translate("cards.title")}</h3>
				<p>{T.translate("cards.par")}</p>
			</Container>
			<ProductBoxes />
			<QuoteBlock sign="clear digital media">
				<p>{T.translate("Quoteblock.Quote")}</p>
			</QuoteBlock>
			<LogosList className="cp_logos" title={T.translate("Customers.Title")}>
				<Logo id="plaxma" />
				<Logo id="jcd" />
				<Logo id="cineplex" />
				<Logo id="global" />
				<Logo id="lightbox" />
			</LogosList>
			<BillboardSuccessfulNetwork />
			<LogosList className="cp_logos" tagline={T.translate("Partners.Tagline")} title={T.translate("Partners.Title")}>
				<Logo id="screenfeed" />
				<Logo id="quividi" />
				<Logo id="tint" />
			</LogosList>
			<Form />
		</Layout>
	);
};

export default VerticalInternalCommunications;

export const queryPageImages = graphql`
	query verticalInternalCommunications {
		Hero: file(relativePath: { eq: "heroes/vertical_internal_communication_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane1: file(relativePath: { eq: "icons/light.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane2: file(relativePath: { eq: "icons/screen_automation.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane3: file(relativePath: { eq: "icons/hand-shake.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane4: file(relativePath: { eq: "icons/messaging.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		spielBg: file(relativePath: { eq: "bg/vertical_internal_communication_spiel_banner_bg.jpg" }) {
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
