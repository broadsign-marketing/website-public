import React, { useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import route from "@route";
import clsx from "clsx";

import BillboardSuccessfulNetwork from "@components/Billboard__SuccessfulNetwork";
import Container from "@components/Container";
import Form from "@components/VerticalForm";
import Hero from "@components/Hero";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Logo from "@components/Logo";
import LogosList from "@components/LogosList";
import Modal from "@components/Modal";
import ProductBoxes from "@components/VerticalProductBoxes";
import QuoteBlock from "@components/QuoteBlock";
import { Link as ScrollLink } from "react-scroll";
import Tank from "@components/Tank";
import Video from "@components/Video";

import video_player from "@img/ui/casino_video_player.svg";

import "@sass/pages/verticals/global.scss";
import "@sass/pages/verticals/casino.scss";

export default function VerticalCasino({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [showModal, setShowModal] = useState(false);

	useDico(l, dicoPath);

	if (l === "zh") {
		return <Layout />;
	}

	return (
		<Layout id="page_vertical_casino" className={clsx("theme_carolina", showModal && "modal_open")}>
			<Hero img={data.Hero.childImageSharp.gatsbyImageData} alt={T.translate("title")}>
				<div className="text">
					<h1 className="title">
						<em>{T.translate("Hero.TitlePart1")}</em>
						<span>{T.translate("Hero.TitlePart2")}</span> <span className="dim">{T.translate("Hero.TitlePart3")}</span>
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
						<h3>{T.translate("Lattice.Pane1.title")}</h3>
						<p>{T.translate("Lattice.Pane1.paragraph")}</p>
					</div>
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane2.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane2.title")}</h3>
						<p>{T.translate("Lattice.Pane2.paragraph")}</p>
					</div>
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane3.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane3.title")}</h3>
						<p>{T.translate("Lattice.Pane3.paragraph")}</p>
					</div>
					<div className="col-12 text-center sm:col-6">
						<Img image={data.iconLatticePane4.childImageSharp.gatsbyImageData} className="icon" objectFit="contain" alt="" />
						<h3>{T.translate("Lattice.Pane4.title")}</h3>
						<p>{T.translate("Lattice.Pane4.paragraph")}</p>
					</div>
				</div>
			</Container>
			<section>
				<Img alt="" image={data.videoPosterBg.childImageSharp.gatsbyImageData} className="bg" />
				<Tank div className="VideoPoster">
					<div className="text">
						<h3>{T.translate("VideoPoster.title")}</h3>
						<p>{T.translate("VideoPoster.paragraph")}</p>
					</div>
					<div className="video_zone">
						<button className="div" onClick={() => setShowModal(true)}>
							<img src={video_player} alt="Broadsign Control" />
						</button>
					</div>
				</Tank>
			</section>
			<Container className="text-center mt-16 mb-10">
				<h3 className="h5">{T.translate("cards.title")}</h3>
				<p>{T.translate("cards.par")}</p>
			</Container>
			<ProductBoxes />
			<QuoteBlock sign="Clear Digital Media">
				<p>{T.translate("Quoteblock.Quote")}</p>
			</QuoteBlock>
			<BillboardSuccessfulNetwork />
			<LogosList className="cp_logos" title={T.translate("Customers.title")}>
				<Logo id="jcd" />
				<Logo id="cineplex" />
				<Logo id="intersection" />
				<Logo id="lightbox" />
			</LogosList>
			<Form />
			<Modal show={showModal} onClose={() => setShowModal(false)} variant="video">
				<Video
					id="control_video"
					title="Intro to Broadsign Control"
					YoutubeID="QMOKJn3lCkY"
					poster={data.videoPosterBg.childImageSharp.gatsbyImageData}
					playBtnStyle="semisolid"
					playBtnColor="white">
					<div>{T.translate("BroadsignControlVideoTitle")}</div>
				</Video>
			</Modal>
		</Layout>
	);
}

export const queryPageImages = graphql`
	query verticalCasino {
		Hero: file(relativePath: { eq: "heroes/vertical_casino_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane1: file(relativePath: { eq: "icons/dynamic_content.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane2: file(relativePath: { eq: "icons/show_the_way.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane3: file(relativePath: { eq: "icons/promo_price_tag.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconLatticePane4: file(relativePath: { eq: "icons/monetize_data.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		spielBg: file(relativePath: { eq: "bg/vertical_shopping_malls_spiel_banner_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		videoPosterBg: file(relativePath: { eq: "video_posters/vertical_casino.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
