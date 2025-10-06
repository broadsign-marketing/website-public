import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import BillboardSuccessfulNetwork from "@components/Billboard__SuccessfulNetwork";
import BillboardSoc2 from "@components/Billboard__Soc2";
import Form from "@components/VerticalForm";
import Hero from "@components/Hero";
import Container from "@components/Container";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Logo from "@components/Logo";
import LogosList from "@components/LogosList";
import QuoteBlock from "@components/QuoteBlock";
import { Link as ScrollLink } from "react-scroll";

import "@sass/pages/verticals/global.scss";
import "@sass/pages/verticals/healthcare.scss";

const VerticalHealthcarePage = ({ pageContext: { l, dicoPath }, location: { pathname }, data }) => {
	useDico(l, dicoPath);

	if (l === "zh") {
		return <Layout />;
	}

	return (
		<Layout id="page_vertical_healthcare" className="theme_carolina">
			<Hero img={data.Hero.childImageSharp.gatsbyImageData} alt={T.translate("title")}>
				<div className="text">
					<h1 className="title">
						<span>{T.translate("Hero.TitlePart1")}</span>
						<em className="dim">{T.translate("Hero.TitlePart2")}</em>
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
						<p className="link">
							<Link className="link_cerulean_arrow" to="contentNetworkManagement">
								{T.translate("cta.discoverContentNetworkManagement")}
							</Link>
						</p>
					</div>
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane3.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane3.Title")}</h3>
						<p>{T.translate("Lattice.Pane3.Paragraph")}</p>
						<p className="link">
							<Link className="link_cerulean_arrow" to="localSignageMessaging">
								{T.translate("cta.discoverLocalSignageMessaging")}
							</Link>
						</p>
					</div>
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane4.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane4.Title")}</h3>
						<p>{T.translate("Lattice.Pane4.Paragraph")}</p>
						<p className="link">
							<Link className="link_cerulean_arrow" to="campaignPlanning">
								{T.translate("cta.discoverCampaignPlanning")}
							</Link>
						</p>
						<p className="link">
							<Link className="link_cerulean_arrow" to="globalProgrammaticSSP">
								{T.translate("cta.discoverGlobalProgrammaticSSP")}
							</Link>
						</p>
					</div>
				</div>
			</Container>
			<QuoteBlock sign={T.translate("Quote.Signature")}>
				<p>{T.translate("Quote.Quote")}</p>
			</QuoteBlock>
			<LogosList className="cp_logos" title={T.translate("CustomersTitle")}>
				<Logo id="hmn" />
				<Logo id="cleardm" />
				<Logo id="ids" />
				<Logo id="outcome_health" />
			</LogosList>
			<BillboardSuccessfulNetwork />
			<BillboardSoc2 />
			<LogosList className="cp_logos" title={T.translate("Partners.Title")} tagline={T.translate("Partners.Tagline")}>
				<Logo id="quividi" />
				<Logo id="screenfeed" />
				<Logo id="viadirect" />
			</LogosList>
			<Form />
		</Layout>
	);
};

export default VerticalHealthcarePage;

export const queryPageImages = graphql`
	query verticalHealthcareImages {
		Hero: file(relativePath: { eq: "heroes/vertical_healthcare_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane1: file(relativePath: { eq: "icons/user_health.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane2: file(relativePath: { eq: "icons/screen_sharing.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane3: file(relativePath: { eq: "icons/tailored_messaging.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane4: file(relativePath: { eq: "icons/settings.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		videoPosterBg: file(relativePath: { eq: "bg/vertical_healthcare_video_poster_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		videoPosterPoster: file(relativePath: { eq: "video_posters/vertical_healthcare.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
