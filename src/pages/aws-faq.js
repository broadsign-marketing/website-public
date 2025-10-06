import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Container from "@components/Container";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";

import "@sass/pages/aws.scss";

const AWSFAQPage = ({ pageContext: { l, dicoPath }, location: { pathname }, data }) => {
	useDico(l, dicoPath);

	return (
		<Layout id="aws_faq">
			<section className="hero">
				<Img className="bg" image={data.Hero.childImageSharp.gatsbyImageData} alt={T.translate("seo.title")} />
				<Container>
					<div className="grid">
						<div className="col-12 sm:col-6">
							<h1 className="text-white font-superbold flex flex-column justify-content-center">
								<span className="dim inline-block line-height-100 nowrap">{T.translate("Hero.spanDim")}</span>
								<em className="inline-block line-height-100 nowrap">{T.translate("Hero.em")}</em>
								<span className="inline-block line-height-100 nowrap">{T.translate("Hero.span")}</span>
							</h1>
						</div>
						<div className="col-12 sm:col-6"></div>
					</div>
				</Container>
			</section>
			<Container id="hull" className="my-20">
				<div className="grid">
					<div className="col-12 sm:col-6 sm:pr-8">
						<h2 className="subtitle">{T.translate("h1")}</h2>
						<ul>
							<li>{T.translate("p1l")}</li>
							<li>{T.translate("p12")}</li>
							<li>{T.translate("p13")}</li>
							<li>{T.translate("p14")}</li>
						</ul>
						<h2 className="subtitle">{T.translate("h2")}</h2>
						<ul>
							<li>{T.translate("p21")}</li>
							<li>{T.translate("p22")}</li>
							<li>{T.translate("p23")}</li>
						</ul>
						<h2 className="subtitle">{T.translate("h3")}</h2>
						<ul>
							<li>{T.translate("p31")}</li>
							<ul>
								<li>{T.translate("p311")}</li>
								<li>{T.translate("p312")}</li>
								<li>{T.translate("p313")}</li>
							</ul>
							<li>{T.translate("p32")}</li>
							<li>{T.translate("p33")}</li>
						</ul>
					</div>
					<div className="col-12 sm:col-6 sm:pl-8">
						<h2 className="subtitle">{T.translate("h4")}</h2>
						<ul>
							<li>{T.translate("p4l")}</li>
							<li>{T.translate("p42")}</li>
							<li>{T.translate("p43")}</li>
						</ul>
						<h2 className="subtitle">{T.translate("h5")}</h2>
						<ul>
							<li>{T.translate("p5l")}</li>
						</ul>
						<h2 className="subtitle">{T.translate("h6")}</h2>
						<ul>
							<li>{T.translate("p6l")}</li>
							<li>{T.translate("p62")}</li>
							<li>{T.translate("p63")}</li>
						</ul>
						<h2 className="subtitle">{T.translate("h7")}</h2>
						<ul>
							<li>{T.translate("p7l")}</li>
						</ul>
						<h2 className="subtitle">{T.translate("h8")}</h2>
						<ul>
							<li>{T.translate("p8l")}</li>
							<li>{T.translate("p82")}</li>
							<li>{T.translate("p83")}</li>
							<li>{T.translate("p84")}</li>
						</ul>
					</div>
				</div>
			</Container>
		</Layout>
	);
};

export default AWSFAQPage;

/* Import GraphQL Fragments */

export const queryPageImages = graphql`
	query AWSFAQImages {
		Hero: file(relativePath: { eq: "heroes/aws_faq.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
