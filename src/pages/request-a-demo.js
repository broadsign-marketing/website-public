import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import CTA from "@components/CTA";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import ImgHat from "@components/ImgHat";
import Layout from "@components/layout";
import Video from "@components/Video";
import Scroll from "react-scroll";
import Tank from "@components/Tank";

import automate_icon from "@img/icons/demo_automate.svg";
import curve_icon from "@img/icons/demo_curve.svg";
import revenue_icon from "@img/icons/demo_revenue.svg";
import screen from "@img/ui/demo_screen_top_dsps.svg";
import target_icon from "@img/icons/demo_target.svg";

import "@sass/pages/demo.scss";

export default function RequestADemo({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	useDico(l, dicoPath);

	return (
		<Layout id="demo">
			<section id="hero" className="Hero">
				<div className="blob_1" />
				<div className="blob_2" />
				<Tank div>
					<h1>{T.translate("formTitle")}</h1>
					<div className="form_wrapper">
						<p className="text-30 text-white mb-8">{T.translate("formHeader")}</p>
						<Form bg="dark" form="demo" submitText="Request a Demo" thankYouMessage="interest__beintouch" />
					</div>
				</Tank>
			</section>
			<section className="intro">
				<div className="skew"></div>
				<Tank div>
					<Video playBtnStyle="gradient_blue" YoutubeID="ZEXw67SuO14" poster={data.VideoPoster.childImageSharp.gatsbyImageData}></Video>
					<div className="descriptions">
						<p>{T.translate("contentDescription.par1")}</p>
						<p>{T.translate("contentDescription.par2")}</p>
					</div>
				</Tank>
			</section>
			<section className="shin">
				<div className="skew"></div>
				<Tank div>
					<img className="screen" src={screen} alt="" height="380" width="500" />
					<h3>{T.translate("tools.title")}</h3>
					<div className="list">
						<ImgHat src={target_icon} text={T.translate("tools.content1")} />
						<ImgHat src={curve_icon} text={T.translate("tools.content2")} />
						<ImgHat src={automate_icon} text={T.translate("tools.content3")} />
						<ImgHat src={revenue_icon} text={T.translate("tools.content4")} />
					</div>
				</Tank>
				<CTA
					onClick={() => Scroll.scroller.scrollTo("hero")}
					className="bg-reflex text-white border-reflex wrap hover:bg-white hover:text-reflex round">
					{T.translate("shinCTA")}
				</CTA>
			</section>
		</Layout>
	);
}

export const queryHeader = graphql`
	query {
		VideoPoster: file(relativePath: { eq: "video_posters/demo_client_reel.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
