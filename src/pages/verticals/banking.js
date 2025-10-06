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
import Link from "@components/LocalizedLink";
import Logo from "@components/Logo";
import LogosList from "@components/LogosList";
import QuoteBlock from "@components/QuoteBlock";
import { Link as ScrollLink } from "react-scroll";
import SpielPoster from "@components/SpielPoster";
import Tank from "@components/Tank";

import "@sass/pages/verticals/global.scss";
import "@sass/pages/verticals/banking.scss";

const VerticalBankingPage = ({ pageContext: { l, dicoPath }, location: { pathname }, data }) => {
	useDico(l, dicoPath);

	return (
		<Layout id="page_vertical_banking" className="theme_carolina">
			<Hero img={data.Hero.childImageSharp.gatsbyImageData} alt={T.translate("title")}>
				<div className="text">
					<h1 className="title">
						<em className="dim">{T.translate("Hero.TitlePart1")}</em> <span>{T.translate("Hero.TitlePart2")}</span>{" "}
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
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane3.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane3.Title")}</h3>
						<p>{T.translate("Lattice.Pane3.Paragraph")}</p>
					</div>
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane4.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane4.Title")}</h3>
						<p>{T.translate("Lattice.Pane4.Paragraph")}</p>
						<p className="text-22 link">
							<Link className="link_cerulean_arrow" to="contentNetworkManagement">
								{T.translate("cta.discoverContentNetworkManagement")}
							</Link>
						</p>
					</div>
				</div>
			</Container>
			<SpielPoster img={data.spielBg.childImageSharp.gatsbyImageData} />
			<QuoteBlock sign={T.translate("Quoteblock.Signature")}>
				<p>{T.translate("Quoteblock.Quote")}</p>
			</QuoteBlock>
			<LogosList className="cp_logos" title={T.translate("Customers.Title")}>
				<Logo id="jcd" />
				<Logo id="intersection" />
				<Logo id="g2d" />
				<Logo id="elevision" />
			</LogosList>
			<BillboardSuccessfulNetwork />
			<LogosList className="cp_logos" title={T.translate("Partners.Title")} tagline={T.translate("Partners.Tagline")}>
				<Logo id="viadirect" />
				<Logo id="tint" />
				<Logo id="gv" />
			</LogosList>
			<Form />
		</Layout>
	);
};

export default VerticalBankingPage;

export const queryPageImages = graphql`
	query verticalBankingImages {
		Hero: file(relativePath: { eq: "heroes/vertical_banking_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane1: file(relativePath: { eq: "icons/dynamic_content.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane2: file(relativePath: { eq: "icons/monetize_data.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane3: file(relativePath: { eq: "icons/messaging.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane4: file(relativePath: { eq: "icons/screen_sharing.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		spielBg: file(relativePath: { eq: "bg/vertical_banking_spiel_banner_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
