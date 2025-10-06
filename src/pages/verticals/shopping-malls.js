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
import LocalizedLink from "@components/LocalizedLink";
import Logo from "@components/Logo";
import LogosList from "@components/LogosList";
import QuoteBlock from "@components/QuoteBlock";
import { Link as ScrollLink } from "react-scroll";
import SpielPoster from "@components/SpielPoster";

import "@sass/pages/verticals/global.scss";
import "@sass/pages/verticals/shopping_mall.scss";

const VerticalShoppingMallPage = ({ pageContext: { l, dicoPath }, location: { pathname }, data }) => {
	useDico(l, dicoPath);

	if (l === "zh") {
		return <Layout />;
	}

	return (
		<Layout id="page_vertical_shopping_mall" className="theme_carolina">
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
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane3.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane3.Title")}</h3>
						<p>{T.translate("Lattice.Pane3.Paragraph")}</p>
						<p className="link">
							<LocalizedLink className="link_cerulean_arrow" to="campaignPlanning">
								{T.translate("cta.discoverCampaignPlanning")}
							</LocalizedLink>
						</p>
						<p className="link">
							<LocalizedLink className="link_cerulean_arrow" to="globalProgrammaticSSP">
								{T.translate("cta.discoverGlobalProgrammaticSSP")}
							</LocalizedLink>
						</p>
					</div>
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane4.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane4.Title")}</h3>
						<p>{T.translate("Lattice.Pane4.Paragraph")}</p>
						<p className="link">
							<LocalizedLink className="link_cerulean_arrow" to="contentNetworkManagement">
								{T.translate("cta.discoverContentNetworkManagement")}
							</LocalizedLink>
						</p>
					</div>
				</div>
			</Container>
			<SpielPoster img={data.spielBg.childImageSharp.gatsbyImageData} />
			<QuoteBlock sign="Intersection">
				<p>{T.translate("Quoteblock.Quote")}</p>
			</QuoteBlock>
			<LogosList className="cp_logos" title={T.translate("Customers.Title")}>
				<Logo id="westfield" />
				<Logo id="elan" />
				<Logo id="lightbox" />
				<Logo id="gs" />
				<Logo id="mp" />
			</LogosList>
			<BillboardSuccessfulNetwork />
			<BillboardSoc2 />
			<LogosList className="cp_logos" title={T.translate("Partners.Title")} tagline={T.translate("Partners.Tagline")}>
				<Logo id="quividi" />
				<Logo id="viadirect" />
				<Logo id="tint" />
				<Logo id="gv" />
			</LogosList>
			<Form />
		</Layout>
	);
};

export default VerticalShoppingMallPage;

export const queryPageImages = graphql`
	query verticalShoppingMall {
		Hero: file(relativePath: { eq: "heroes/vertical_shopping_malls_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane1: file(relativePath: { eq: "icons/destination.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane2: file(relativePath: { eq: "icons/creative_campaigns.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane3: file(relativePath: { eq: "icons/settings.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane4: file(relativePath: { eq: "icons/screen_sharing.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		spielBg: file(relativePath: { eq: "bg/vertical_shopping_malls_spiel_banner_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
