import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useL } from "@hooks/useDico";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";

import "@sass/components/Billboard.scss";

export default function BillboardSuccessfulNetwork() {
	const data = useStaticQuery(graphql`
		query BillboardSuccessfulNetworkImg {
			ebook: file(relativePath: { eq: "billboards/banner_ebook_direct_webinar.png" }) {
				...img
			}
		}
	`);

	const l = useL();

	const __ = {
		en: {
			text: "Want to learn how to create a great digital signage network?",
			cta: "Download our eBook",
		},
		fr: {
			text: "Vous voulez apprendre comment bâtir un réseau d'affichage numérique performant ?",
			cta: "Téléchargez notre livre électronique",
		},
		es: {
			text: "¿Le gustaría aprender a crear una excelente red de señalización digital?",
			cta: "Descargue nuestro ebook",
		},
		de: {
			text: "Aufbau eines erfolgreichen Digital Signage-Netzwerks",
			cta: "Laden Sie sich unser E-Book herunter",
		},
	}[l];

	return (
		<section id="ebook_successful_network" className="Billboard">
			<div className="triangle" />
			<div className="container">
				<div className="grid align-items-center">
					<div className="col-12 text-center pb-12 sm:col-6 sm:text-left">
						<p className="title text-white font-serif font-bold">{__.text}</p>
						<Link className="cta caret text-white font-superbold pl-0 hover:text-teal" to="ebookGuideToBuildingASuccessfulDigitalSignageNetwork">
							{__.cta}
						</Link>
					</div>
					<div className="col-12 sm:col-6">
						<Img image={data.ebook.childImageSharp.gatsbyImageData} className="ebook" alt="" />
					</div>
				</div>
			</div>
		</section>
	);
}
