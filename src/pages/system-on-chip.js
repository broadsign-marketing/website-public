import React, { useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { blogPostSlug } from "@annex";

import Container from "@components/Container";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";

import icon_growth from "@img/pages/system-on-chip/icon_growth.png";
import icon_management from "@img/pages/system-on-chip/icon_management.png";
import icon_network from "@img/pages/system-on-chip/icon_network.png";
import icon_revenue from "@img/pages/system-on-chip/icon_revenue.png";

import "@sass/pages/system_on_chip.scss";
import clsx from "clsx";

const Photos = React.lazy(() => import("@partials/system-on-chip__Photos"));

export default function SystemOnChip({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	useDico(l, dicoPath);

	const featuresIcons = {
		growth: icon_growth,
		management: icon_management,
		network: icon_network,
		revenue: icon_revenue,
	};

	const verticals = T.texts.verticals.list;

	const latestPost = data.latest_post || data.latest_post_else;

	return (
		<Layout id="system_on_chip" className="theme_carolina">
			<section className="Hero pt-12 pb-16 sm:pt-25">
				<Container className="flex flex-column align-items-start sm:align-items-center">
					<p className="subtitle-1 gradient inline-block mt-0 mb-2 sm:mx-auto sm:text-center">{T.translate("hero.nowAvailable")}</p>
					<h1 className="mb-5 sm:mb-8 sm:text-center" style={{ maxWidth: "16ch" }}>
						{T.translate("hero.title")}
					</h1>
					<p className="tagline text-reflex text-16 mb-12 sm:text-center sm:mb-16" style={{ maxWidth: "66ch" }}>
						{T.translate("hero.tagline")}
					</p>
					<Img
						image={data.hero.childImageSharp.gatsbyImageData}
						className="w-full mx-auto hero_img"
						objectFit="contain"
						imgClassName="mx-auto"
						alt=""
					/>
				</Container>
			</section>
			<section className="features bg-zircon py-16 sm:pt-20 sm:pb-30">
				<Container className="flex flex-column align-items-start sm:align-items-center">
					<p className="subtitle-2 gradient text-16 sm:text-center sm:mx-auto">{T.translate("features.overtitle")}</p>
					<h2 className="h4 mb-8 line-height-140 sm:text-center">{T.translate("features.title")}</h2>
					<div style={{ maxWidth: "900px" }}>
						{T.texts.features.list.map((feature) => (
							<div className="arg bg-white p-5 rounded-xl mb-4 sm:px-12 sm:py-8" key={feature.id}>
								<div className="grid">
									<div className="col-12 sm:col-2 md:col-1 flex align-items-center">
										<img src={featuresIcons[feature.id]} className="icon" alt="" />
									</div>
									<div className="col-12 flex flex-column justify-content-center sm:col-10 md:col-11 sm:pl-12">
										<h4 className="h6 font-bold mb-4">{feature.title}</h4>
										<p className="mb-0">{feature.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</Container>
			</section>
			<Container className="py-15 sm:py-20">
				<div className="grid">
					<div className="col-12 sm:col-6">
						<h4 className="text-h4 mb-4">{T.translate("verticals.par")}</h4>
					</div>
					<div className="col-12 py-0 mx-auto sm:col-3 sm:py-2 sm:pl-8">
						<ul className="checks_gradient text-16">
							{verticals.slice(0, Math.ceil(verticals.length / 2)).map((vertical, k) => (
								<li key={k}>{vertical}</li>
							))}
						</ul>
					</div>
					<div className="col-12 py-0 mx-auto sm:col-3 sm:py-2">
						<ul className="checks_gradient text-16">
							{verticals.slice(Math.floor(verticals.length / 2)).map((vertical, k) => (
								<li key={k}>{vertical}</li>
							))}
						</ul>
					</div>
				</div>
			</Container>
			<Container>
				<React.Suspense>
					<Photos />
				</React.Suspense>
			</Container>
			<Container className="supported_on">
				<div className="bg-zircon p-10 my-16 rounded-xl sm:mt-32 sm:px-8 sm:pt-9 sm:pb-7">
					<div className="grid">
						<div className="col-12 flex align-items-center justify-content-center sm:col-5 sm:justify-content-start">
							<h3 className="text-h5 font-bold text-center mb-6 sm:text-left sm:mb-0">
								<span className="inline-block">{T.translate("supportedOn.p1")}</span>{" "}
								<span className="inline-block">{T.translate("supportedOn.p2")}</span>
							</h3>
						</div>
						<div className="col-12 sm:col-7 flex align-items-center justify-content-center">
							<div className="grid w-full">
								<div className="col-12 flex align-items-center justify-content-center sm:col-4 sm:px-2">
									<Img
										alt=""
										image={data.logo_webos.childImageSharp.gatsbyImageData}
										className="supported_on__logo h-full w-full mb-4 sm:mb-0"
										objectFit="contain"
										alt="LG webOS Signage"
									/>
								</div>
								<div className="col-12 flex align-items-center justify-content-center sm:col-4 sm:px-2">
									<Img
										alt=""
										image={data.logo_samsung_smart.childImageSharp.gatsbyImageData}
										className="supported_on__logo h-full w-full mb-4 sm:mb-0"
										objectFit="contain"
										alt="Samsung Smart Signage Platform"
									/>
								</div>
								<div className="col-12 flex align-items-center justify-content-center sm:col-4 sm:px-2">
									<Img
										alt=""
										image={data.logo_brightsign.childImageSharp.gatsbyImageData}
										className="supported_on__logo h-full w-full"
										objectFit="contain"
										alt="BrightSign"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<div className="shin bg-zircon py-15">
				<Container>
					{!isFormSubmitted && <h3 className="text-24 mb-10">{T.translate("formHeader")}</h3>}
					<Form
						form="systemOnChipDiscoveryCall"
						submitText="Book a Discovery Call"
						thankYouMessage={"systemOnChip"}
						onSubmit={() => setIsFormSubmitted(true)}
						className="max-w-600 mx-auto"
					/>
					{latestPost && (
						<div className={clsx("related_blog", isFormSubmitted ? "grid" : "hidden")}>
							<div className="hidden sm:block col-1 md:col-2 lg:col-3">&nbsp;</div>
							<div className="col-12 sm:col-10 md:col-8 lg:col-6">
								<h4 className="h5 text-left mt-15 mb-8">{T.translate("furtherReading")}</h4>
								<Link className="grid align-items-center" to={blogPostSlug(latestPost.slug)}>
									<div className="col-12 sm:col-5">
										<Img image={latestPost.featuredImage.node.gatsbyImage} className="w-full rounded-xl" alt="" />
									</div>
									<div className="col-12 sm:col-7">
										<p className="text-reflex text-16 sm:text-20 font-bold m-0 sm:pl-4 md:pl-8">{latestPost.title}</p>
									</div>
								</Link>
							</div>
							<div className="hidden sm:block col-1 md:col-2 lg:col-3">&nbsp;</div>
						</div>
					)}
				</Container>
			</div>
		</Layout>
	);
}

export const querySoC = graphql`
	query ($l: String) {
		hero: file(relativePath: { eq: "pages/system-on-chip/hero.png" }) {
			...img
		}
		logo_webos: file(relativePath: { eq: "pages/system-on-chip/logo_webos.png" }) {
			...img
		}
		logo_samsung_smart: file(relativePath: { eq: "pages/system-on-chip/logo_samsung_smart.png" }) {
			...img
		}
		logo_brightsign: file(relativePath: { eq: "pages/system-on-chip/logo_brightsign.png" }) {
			...img
		}

		latest_post: wpPost(
			status: { eq: "publish" }
			language: { slug: { eq: $l } }
			tags: { nodes: { elemMatch: { slug: { regex: "/(system-on-chip|systeme-sur-puce)/i" } } } }
		) {
			...BlogPost
			formattedDate: date(formatString: "LL", locale: $l)
		}

		latest_post_else: wpPost(
			status: { eq: "publish" }
			language: { slug: { eq: "en" } }
			tags: { nodes: { elemMatch: { slug: { regex: "/(system-on-chip|systeme-sur-puce)/i" } } } }
		) {
			...BlogPost
			formattedDate: date(formatString: "LL", locale: $l)
		}
	}
`;
