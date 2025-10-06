import React, { useEffect, useMemo, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import route from "@route";
import { useDico, useDicoNamespace } from "@hooks/useDico";
import { getTranslations, webinarSlug } from "@annex";
import clsx from "clsx";

import Container from "@components/Container";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import ImgHat from "@components/ImgHat";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import StaticPlayBtn from "@components/StaticPlayBtn";

import "@sass/pages/resources.scss";

function Featured({ id, thumbnail }) {
	return (
		<Link to={route(id, "en")} className={clsx("resource", id === "programmaticU" ? "programmatic_u" : "")}>
			<ImgHat src={thumbnail}>
				<h3>{T.translate(`${id}.title`)}</h3>
				<p>{T.translate(`${id}.description`)}</p>
				<p className="link">{T.translate("learnMore")}</p>
			</ImgHat>
		</Link>
	);
}

function Ebook({ id, l, data }) {
	const __ = useMemo(() => getTranslations(`${l}/resources/eBooks`), [l]);
	const ebook = __[id];

	return (
		<div className="ebook_card_wrapper col-12 mb-16 sm:col-6">
			<Link to={route(id)} className="resource ebook_card">
				<span className="flex flex-column h-full">
					<Img className="resource_thumbnail rounded-xl" image={data[id].childImageSharp.gatsbyImageData} objectFit="cover" alt="" />
					<h4 className="text-24 sm:text-20 md:text-24 my-4">{ebook.title}</h4>
					<span className="text-18 mb-6">{ebook.description}</span>
					<span className="link_cerulean_arrow text-cerulean text-16 font-bold mt-auto mb-0">{T.translate("readMore")}</span>
				</span>
			</Link>
		</div>
	);
}

function Webinar({ webinar, inc }) {
	let thumbnail;
	if (webinar?.youtubeId) thumbnail = `https://img.youtube.com/vi/${webinar.youtubeId}/0.jpg`;
	if (webinar?.featuredImage?.node?.gatsbyImage) thumbnail = webinar.featuredImage.node.gatsbyImage;

	const { series } = webinar.webinarOptions;

	return (
		<div className="col-12 mb-16">
			<Link to={`${webinarSlug(webinar.slug, webinar.webinarOptions.series)}?from=resources`} className="resource webinar_card grid">
				<span className={clsx("flex flex-column h-full", inc % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse")}>
					<div className={clsx("col-12 flex flex-center sm:col-5 md:col-6", inc % 2 === 0 ? "md:pr-6" : "md:pl-6")}>
						{webinar?.featuredImage?.node?.gatsbyImage ? (
							<>
								<StaticPlayBtn />
								{/*
								TO KEEP - CAROLINA FOUND THE ANIMATION KINDA COOL
								<div className="anim_play_btn">
								<div className="play"></div>
								<div className="play"></div>
								<div className="play"></div>
								<div className="play"></div>
								</div>
								*/}
								<Img className="webinar_thumbnail rounded-xl" image={thumbnail} objectFit="cover" alt={webinar.title} />
							</>
						) : (
							<img className="webinar_thumbnail rounded-xl" src={thumbnail} alt={webinar.title} />
						)}
					</div>
					<div
						className={clsx(
							"webinar_description col-12 flex flex-column justify-content-between py-8 sm:col-7 md:col-6",
							inc % 2 === 0 ? "sm:align-items-start md:pl-6" : "sm:align-items-end sm:text-right md:pr-6"
						)}>
						{series && <h4 className="subtitle-1 gradient mb-1">{T.translate(series)}</h4>}
						<h4 className="text-24 sm:text-20 md:text-24 mb-4">{webinar.title}</h4>
						{webinar?.seo?.metaDesc && <span className="text-16 mb-6">{webinar.seo.metaDesc}</span>}
						<span className="CTA text-white w-auto border-none text-14 mt-auto">{T.translate("watchWebinar")}</span>
					</div>
				</span>
			</Link>
		</div>
	);
}

export default function Resources({ pageContext: { l, dicoPath }, location: { search }, data }) {
	useDico(l, dicoPath);
	useDicoNamespace("webinar");
	useDicoNamespace("resources/Webinars");

	useEffect(() => {
		if (l === "es") {
			const checkModalToOpen = search.match(/w=(\w+)/);
			if (checkModalToOpen && checkModalToOpen[1]) {
				if (checkModalToOpen[1] === "iem") {
					setOpenModalIEM(true);
				}
			}
		}
	}, [l, search]);

	const ebooks = [
		{
			id: "ebookAutomationInOOHMediaPlanning",
			languages: ["en"],
		},
		{
			id: "ebookRetailMediaInStoreReport2025",
			languages: ["en"],
		},
		{
			id: "ebookInStoreActivation",
			languages: ["en"],
		},
		{
			id: "ebookRiseOfRetailMedia",
			languages: ["en"],
		},
		{
			id: "stateOfStaticOOHReport",
			languages: ["en"],
		},
		{
			id: "ebook6StepsForIntegratingDOOHInYourOmnichannelStrategy",
			languages: ["en", "fr"],
		},
		{
			id: "ebookCreateDOOHCampaignsThatGetResults",
			languages: ["en"],
		},
		{
			id: "ebookUnlockMoreValueFromYourEvChargingStations",
			languages: ["en"],
		},
		{
			id: "ebookIncreaseRevenueWithContextualInStoreMedia",
			languages: ["en"],
		},
		{
			id: "ebookMediaBuyersGuideToPDOOH",
			languages: ["en"],
		},
		{
			id: "ebookOptimizeOOHSalesThroughAutomation",
			languages: ["en", "de"],
		},
		{
			id: "ebookModernizeOOHBusiness",
			languages: ["en", "es"],
		},
		{
			id: "ebookAddDigitalToYourOOHNetwork",
			languages: ["en"],
		},
		{
			id: "ebookDynamicAndInteractiveContent",
			languages: ["en"],
		},
		{
			id: "ebook5CommonMistakesInDigitalSignage",
			languages: ["en", "fr"],
		},
		{
			id: "ebook7HabitsOfHighlyEffectiveMediaOwners",
			languages: ["en"],
		},
		{
			id: "ebookGuideToBuildingASuccessfulDigitalSignageNetwork",
			languages: ["en", "fr", "es", "de"],
		},
	];

	const webinars = useMemo(() => {
		const extraWebinars = [
			{
				id: "webinarImpressionToImpact",
				slug: route("webinarImpressionToImpact"),
				youtubeId: "ustUqGviF3U",
				title: T.translate("webinarImpressionToImpact.title"),
				seo: { metaDesc: T.translate("webinarImpressionToImpact.description") },
				webinarOptions: { series: "", webinarDates: { webinarDate: "2024-09" } },
			},
			{
				id: "webinarMemorableAdvertising",
				slug: route("webinarMemorableAdvertising"),
				youtubeId: "qadPAMOLoKY",
				title: T.translate("webinarMemorableAdvertising.title"),
				seo: { metaDesc: T.translate("webinarMemorableAdvertising.description") },
				webinarOptions: { series: "", webinarDates: { webinarDate: "2024-10" } },
			},
		];

		return [...data.webinars.nodes, ...extraWebinars].sort((a, b) => {
			const dateA = a.webinarOptions.webinarDates.webinarDate;
			const dateB = b.webinarOptions.webinarDates.webinarDate;
			if (dateA < dateB) return 1;
			if (dateA > dateB) return -1;
			return 0;
		});
	}, [data]);

	return (
		<Layout id="resources" className="theme_carolina">
			<div className="hero py-30">
				<Img image={data.hero.childImageSharp.gatsbyImageData} className="bg" alt="" />
				<Container>
					<div className="grid">
						<div className="col-12 md:col-8">
							<h1 className="title font-superbold text-white line-height-80 mb-8">
								<em className="block line-height-80">{T.translate("Hero.TitlePart1")}</em>
								<span className="block line-height-80 nowrap">{T.translate("Hero.TitlePart2")}</span>
							</h1>
							<p className="tagline">{T.translate("Hero.Tagline")}</p>
						</div>
					</div>
				</Container>
			</div>
			<div className="hull mt-10 mb-30 sm:mt-30">
				<Container className="ebooks">
					<h2 className="text-h3 mb-12 font-superbold text-center w-full sm:mb-22">{T.translate("ebooks")}</h2>
					<div className="grid justify-content-between w-full">
						{ebooks.map(({ id, languages }) => (languages.includes(l) ? <Ebook data={data} l={l} id={id} key={id} /> : ""))}
					</div>
				</Container>
				{["en"].includes(l) && (
					<>
						<Container className="line2">
							<div className="gradient_border" />
						</Container>
						<Container className="webinars">
							<h2 className="text-h3 mb-12 font-superbold text-center w-full sm:my-22">{T.translate("webinars")}</h2>
							{webinars.map((webinar, k) => (
								<Webinar webinar={webinar} inc={k} key={k} />
							))}
						</Container>
					</>
				)}
			</div>
		</Layout>
	);
}

export const queryHeader = graphql`
	fragment tb on File {
		childImageSharp {
			gatsbyImageData(width: 552)
		}
	}

	query ($l: String) {
		hero: file(relativePath: { eq: "pages/resources/hero.jpg" }) {
			...img
		}
		oohFromHome: file(relativePath: { eq: "resources/ooh-from-home.png" }) {
			...tb
		}
		ebookRiseOfRetailMedia: file(relativePath: { eq: "ebooks/rise-of-retail-media-tb.png" }) {
			...tb
		}
		stateOfStaticOOHReport: file(relativePath: { eq: "ebooks/state-of-static-ooh-report-tb.jpg" }) {
			...tb
		}
		ebook6StepsForIntegratingDOOHInYourOmnichannelStrategy: file(
			relativePath: { eq: "ebooks/six-steps-for-integrating-dooh-in-your-omnichannel-strategy-tb.jpg" }
		) {
			...tb
		}
		ebookCreateDOOHCampaignsThatGetResults: file(relativePath: { eq: "ebooks/create-dooh-campaigns-that-get-results-tb.jpg" }) {
			...tb
		}
		ebook5CommonMistakesInDigitalSignage: file(relativePath: { eq: "ui/ebook_5_common_mistakes.jpg" }) {
			...tb
		}
		ebookUnlockMoreValueFromYourEvChargingStations: file(relativePath: { eq: "ebooks/unlock-more-value-from-your-ev-charging-stations-tb.jpg" }) {
			...tb
		}
		ebook7HabitsOfHighlyEffectiveMediaOwners: file(relativePath: { eq: "ui/ebook_7_habits.jpg" }) {
			...tb
		}
		ebookAddDigitalToYourOOHNetwork: file(relativePath: { eq: "ui/ebook_adding_digital_to_your_ooh_network.jpg" }) {
			...tb
		}
		ebookAutomationInOOHMediaPlanning: file(relativePath: { eq: "ebooks/automation-in-ooh-media-planning-tb.png" }) {
			...tb
		}
		ebookDOOHPlaybookForProgrammaticBuyers: file(relativePath: { eq: "ui/ebook_dooh_programmatic_buyers.jpg" }) {
			...tb
		}
		ebookDynamicAndInteractiveContent: file(relativePath: { eq: "ui/ebook_interactive_content.jpg" }) {
			...tb
		}
		ebookGuideToBuildingASuccessfulDigitalSignageNetwork: file(relativePath: { eq: "ui/ebook_successful_network.jpg" }) {
			...tb
		}
		ebookIncreaseRevenueWithContextualInStoreMedia: file(relativePath: { eq: "ui/ebook_increase_revenue_in_store_media.jpg" }) {
			...tb
		}
		ebookInStoreActivation: file(relativePath: { eq: "ebooks/in-store-activation-tb-en.jpg" }) {
			...tb
		}

		ebookMediaBuyersGuideToPDOOH: file(relativePath: { eq: "ui/ebook_media_buyers_pdooh.jpg" }) {
			...tb
		}
		ebookModernizeOOHBusiness: file(relativePath: { eq: "ui/ebook_modernize_ooh_business.jpg" }) {
			...tb
		}
		ebookOptimizeOOHSalesThroughAutomation: file(relativePath: { eq: "ui/ebook_optimize_ooh_sales.png" }) {
			...tb
		}
		ebookRetailMediaInStoreReport2025: file(relativePath: { eq: "ebooks/in-store-retail-report-2025-tb.jpg" }) {
			...tb
		}

		webinars: allWpWebinar(
			sort: [{ webinarOptions: { webinarDates: { webinarDate: DESC } } }, { date: DESC }]
			filter: { status: { eq: "publish" }, language: { slug: { eq: $l } } }
		) {
			nodes {
				id
				slug
				title
				contentTypeName
				language {
					slug
				}
				featuredImage {
					node {
						gatsbyImage(placeholder: BLURRED, width: 600)
					}
				}
				seo {
					metaDesc
				}
				webinarOptions {
					series
					webinarDates {
						differentEndDate
						webinarDate
						webinarEndDate
					}
					gating {
						hubspotFormId
						isGated
					}
				}
			}
		}
	}
`;
