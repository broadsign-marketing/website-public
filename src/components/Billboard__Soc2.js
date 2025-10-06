import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useL } from "@hooks/useDico";

import CTA from "@components/CTA";
import { GatsbyImage as Img } from "gatsby-plugin-image";

import "@sass/components/Billboard.scss";

export default function BillboardSoc2() {
	const data = useStaticQuery(graphql`
		query BillboardSoc2Img {
			bg: file(relativePath: { eq: "billboards/banner_soc2_bg.jpg" }) {
				...img
			}
			badge: file(relativePath: { eq: "billboards/tag_soc2_certified.png" }) {
				...img
			}
		}
	`);

	const l = useL();

	const __ = {
		en: {
			title: "Security your network can rely on",
			text: "Keep your signage network and data safe with industry-leading security, monitoring and alerting features.",
			cta: "Learn More",
		},
		fr: {
			title: "Assurez la sécurité de votre réseau",
			text: "Protégez votre réseau d'affichage et vos données des attaques à l'aide de fonctionnalités d'alerte et de systèmes de surveillance de premier plan.",
			cta: "En apprendre davantage",
		},
	}[l];

	return (
		<section id="soc2" className="Billboard">
			<Img image={data.bg.childImageSharp.gatsbyImageData} className="bg" alt="" />
			<div className="bg overlay sm:hidden"></div>
			<div className="container">
				<div className="grid align-items-center">
					<div className="col-12 text-center sm:col-6 md:col-5">
						<Img image={data.badge.childImageSharp.gatsbyImageData} className="badge" alt="" />
					</div>
					<div className="col-12 text-center sm:col-6 sm:text-left md:col-7">
						<p className="title text-white font-bold uppercase sm:text-reflex">{__.title}</p>
						<p className="text-white sm:text-reflex">{__.text}</p>
						<CTA
							className="bg-teal text-white border-teal hover:bg-white hover:text-teal"
							to="/blog/broadsign-updates-soc-ii-isae3402-reports-now-include-proof-play-campaign-performance">
							{__.cta}
						</CTA>
					</div>
				</div>
			</div>
		</section>
	);
}
