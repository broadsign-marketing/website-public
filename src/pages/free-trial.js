import React, { useCallback, useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { routeWithUtmForm } from "@route";

import { FeatureWrapper, FeatureOverTitle, FeatureTitle, FeaturePar, ComingSoonTag, ShinCTA } from "@components/Aquarius";
import Container from "@components/Container";
import CTA from "@components/CTA";
import Hero from "@components/Hero";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Tank from "@components/Tank";

import LogosList from "@components/LogosList";
import Screenshots from "@partials/free-trial__Screenshots";

import quote_sign from "@img/ui/quote_round.svg";

import "@sass/pages/thank_you.scss";
import "@sass/pages/free_trial.scss";

export default function FreeTrialPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [showTerms, setShowTerms] = useState("hide");
	const [quotePosition, setQuotePosition] = useState(0);

	useDico(l, dicoPath);

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}

		setTimeout(() => {
			let d = document.getElementsByClassName("js-manifest-terms");
			for (let x = 0; x < d.length; x++) {
				d[x].addEventListener("click", () => {
					setShowTerms("show");
				});
			}
		}, 1000);
	}, [setShowTerms]);

	const moveHeroPerson = useCallback(() => {
		const viewTop = window.scrollY;
		const viewBottom = viewTop + window.innerHeight;

		const hero = document.querySelector("#hero") || 0;
		const person = document.querySelector("#hero .person") || 0;

		if (hero && person) {
			const heroBottom = hero.getBoundingClientRect().height;

			// Reproduce the equivalent of the CSS condition : @media (max-width: 575px), (max-width: 767px) and (orientation: portrait) {}
			if (heroBottom && window.innerWidth > 600) {
				const moveTo = Math.max(100 + heroBottom - viewBottom, 0);
				person.style.bottom = `${moveTo}px`;
			}
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", moveHeroPerson, { passive: true });
			window.addEventListener("resize", moveHeroPerson, { passive: true });

			return () => {
				window.removeEventListener("scroll", moveHeroPerson);
				window.removeEventListener("resize", moveHeroPerson);
			};
		}
	}, []);

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}

		setTimeout(moveHeroPerson, 500);

		/* if (typeof document !== "undefined") {
			document.documentElement.setAttribute("data-scroll-behavior", "smooth");
		} */
	}, []);

	return (
		<Layout id="free_trial" className="theme_carolina">
			<Hero id="hero">
				<div className="bubbles">
					<div className="bubble bottom_right"></div>
					<div className="bubble top_left"></div>
					<div className="bubble bottom_center"></div>
				</div>
				<Container className="flex justify-content-center">
					<div className="hero_form text-left">
						<h1 className="mt-12">{T.translate("hero.title")}</h1>
						<div className="form mx-auto" id="header_form">
							<div className="form_wrapper bg-white rounded-xl">
								<Form form="freeTrial" submitText="Request your Free Trial" redirectUrl={routeWithUtmForm("thankYou", "free_trial")} />
							</div>
						</div>
					</div>
				</Container>
			</Hero>
			<Tank className="convenience">
				<h2>{T.translate("convenience.subtitle")}</h2>
				<p>{T.translate("convenience.par")}</p>
			</Tank>
			<Screenshots />
			<div className="features bg-zircon sm:py-18 my-10 sm:my-20">
				<FeatureWrapper>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.campaignPlanning.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.campaignPlanning.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.campaignPlanning.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="campaignPlanning">
							{T.translate("features.campaignPlanning.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_campaign_planning.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse" wrapperClassName="bg-white sm:bg-transparent">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.contentNetworkManagement.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.contentNetworkManagement.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.contentNetworkManagement.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="contentNetworkManagement">
							{T.translate("features.contentNetworkManagement.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_content_network_management.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.staticOperations.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.staticOperations.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.staticOperations.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="staticOperations">
							{T.translate("features.staticOperations.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_static_campaigns.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse" wrapperClassName="bg-white sm:bg-transparent">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.globalProgrammaticSSP.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.globalProgrammaticSSP.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.globalProgrammaticSSP.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="globalProgrammaticSSP">
							{T.translate("features.globalProgrammaticSSP.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_global_programmatic_ssp.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.localSignageMessaging.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.localSignageMessaging.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.localSignageMessaging.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="localSignageMessaging">
							{T.translate("features.localSignageMessaging.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_local_signage_messaging.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse" wrapperClassName="bg-white sm:bg-transparent">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<ComingSoonTag>{T.translate("features.new")}</ComingSoonTag>
						<FeatureOverTitle>{T.translate("features.audienceCampaigns.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.audienceCampaigns.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.audienceCampaigns.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 mb-10 sm:mb-0 hover:bg-cerulean" to="audienceCampaigns">
							{T.translate("features.audienceCampaigns.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_audience_campaigns.childImageSharp.gatsbyImageData} className="w-full" alt="" />
					</div>
				</FeatureWrapper>
			</div>
			<Container className="quotes">
				<div className="panel rounded-xl">
					<blockquote className="grid">
						<div className="col-12 sm:col-6 md:col-8">
							<img className="quote_sign mb-8" src={quote_sign} alt="" />
							<p className="text-24 text-white font-serif">{T.translate("quotes.q1.quote")}</p>
						</div>
						<div className="col-12 flex justify-content-end align-items-center sm:col-6 md:col-4">
							<cite className="lightbox block w-full" />
						</div>
					</blockquote>
				</div>
			</Container>
			<LogosList list="media_owners" variation="grey">
				<h2 before="true">{T.translate("logos.subtitle")}</h2>
			</LogosList>
			<section className="shin flex flex-center">
				<CTA className="pink" to="#hero">
					{T.translate("shinCTA")}
				</CTA>
			</section>
		</Layout>
	);
}

export const queryFTSuccess = graphql`
	query FreeTrialImages {
		feature_audience_campaigns: file(relativePath: { eq: "pages/broadsign-platform/feature_audience_campaigns.png" }) {
			childImageSharp {
				gatsbyImageData(width: 498)
			}
		}
		feature_campaign_planning: file(relativePath: { eq: "pages/broadsign-platform/feature_campaign_planning.png" }) {
			childImageSharp {
				gatsbyImageData(width: 498)
			}
		}
		feature_content_network_management: file(relativePath: { eq: "pages/broadsign-platform/feature_content_network_management.png" }) {
			childImageSharp {
				gatsbyImageData(width: 498)
			}
		}
		feature_static_campaigns: file(relativePath: { eq: "pages/broadsign-platform/feature_static_campaigns.png" }) {
			childImageSharp {
				gatsbyImageData(width: 498)
			}
		}
		feature_global_programmatic_ssp: file(relativePath: { eq: "pages/broadsign-platform/feature_global_programmatic_ssp.png" }) {
			childImageSharp {
				gatsbyImageData(width: 498)
			}
		}
		feature_local_signage_messaging: file(relativePath: { eq: "pages/broadsign-platform/feature_local_signage_messaging.png" }) {
			childImageSharp {
				gatsbyImageData(width: 498)
			}
		}
	}
`;
