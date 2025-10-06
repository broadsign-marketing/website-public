import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useL } from "@hooks/useDico";
import route from "@route";

import Container from "@components/Container";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";

import "@sass/components/VerticalProductBoxes.scss";

export default function VerticalProductBoxes() {
	const data = useStaticQuery(graphql`
		query HeaderQuery {
			campaignPlanning: file(relativePath: { eq: "verticals/product_boxes_campaign_planning.png" }) {
				childImageSharp {
					gatsbyImageData(width: 180)
				}
			}
			programmaticSSP: file(relativePath: { eq: "verticals/product_boxes_programmatic_ssp.png" }) {
				childImageSharp {
					gatsbyImageData(width: 180)
				}
			}
		}
	`);

	const l = useL();

	const __ = {
		en: {
			campaignPlanning: {
				title: "Empower your team with Campaign Planning",
				cta: "Learn more",
				to: "campaignPlanning",
			},
			programmaticSSP: {
				title: "Sell programmatically with our Programmatic SSP",
				cta: "Learn more",
				to: "globalProgrammaticSSP",
			},
		},
		fr: {
			campaignPlanning: {
				title: "Renforcez votre équipe avec la planification de campagne et la diffusion d'annonces",
				cta: "En savoir plus",
				to: "campaignPlanning",
			},
			programmaticSSP: {
				title: "Augmentez vos ventes grâce à la programmatique",
				cta: "En savoir plus",
				to: "globalProgrammaticSSP",
			},
		},
	};

	const text = __[l] || __.en;

	return (
		<div className="VerticalProductBoxes">
			<Container>
				<div className="grid">
					<div className="col-12 sm:col-6">
						<Link to={text.campaignPlanning.to} className="product_box flex align-items-center bg-zircon px-4 py-8 h-full w-full rounded-xl">
							<div className="grid">
								<div className="col-12 flex flex-center sm:col-5">
									<Img image={data.campaignPlanning.childImageSharp.gatsbyImageData} className="mb-6 sm:mb-0" objectFit="contain" alt="" />
								</div>
								<div className="col-12 flex flex-column sm:col-7 sm:justify-content-between sm:py-6">
									<h6 className="text-20 text-center mb-4 mx-auto sm:text-left">{text.campaignPlanning.title}</h6>
									<span className="link_cerulean_arrow text-14 uppercase mt-auto mx-auto sm:mx-0">{text.campaignPlanning.cta}</span>
								</div>
							</div>
						</Link>
					</div>
					<div className="col-12 sm:col-6">
						<Link to={text.programmaticSSP.to} className="product_box flex align-items-center bg-zircon px-4 py-8 h-full w-full rounded-xl">
							<div className="grid">
								<div className="col-12 flex flex-center sm:col-5">
									<Img image={data.programmaticSSP.childImageSharp.gatsbyImageData} className="mb-6 sm:mb-0" objectFit="contain" alt="" />
								</div>
								<div className="col-12 flex flex-column sm:col-7 sm:justify-content-between sm:py-6">
									<h6 className="text-20 text-center mb-4 mx-auto sm:text-left">{text.programmaticSSP.title}</h6>
									<span className="link_cerulean_arrow text-14 uppercase mt-auto mx-auto sm:mx-0">{text.campaignPlanning.cta}</span>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</Container>
		</div>
	);
}
