import React, { memo, useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import T from "i18n-react";
import { useLocation } from "@reach/router";
import { useL } from "@hooks/useDico";
import { humanLang, sanitizePath } from "@annex";

import RobotoRegular from "../../static/fonts/Roboto-Regular.woff2";
import RobotoMedium from "../../static/fonts/Roboto-Medium.woff2";
import RobotoBold from "../../static/fonts/Roboto-Bold.woff2";
import RobotoBlack from "../../static/fonts/Roboto-Black.woff2";

const App__SEOHelmet = memo(() => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					type
					name
					url
					sameAs
					facebookAppID
					twitterSiteID
					twitterUserID
				}
			}
		}
	`);

	const l = useL();
	const { pathname } = useLocation();

	const site = data.site.siteMetadata;
	const siteUrl = site.url.replace("/*", "");
	const canonical = sanitizePath(siteUrl + pathname);

	// Set Defaults for SEO object
	const seo = {
		...(T.texts?.seo || {}),
		author: T.texts?.seo?.author || "Broadsign",
		authorType: T.texts?.seo?.authorType || (T.texts?.seo?.author === "Broadsign" ? "Organization" : "Person"),
		type: T.texts?.seo?.type || "Website",
		datePublished: T.texts?.seo?.datePublished || "",
		dateModified: T.texts?.seo?.dateModified || "",
		robots: T.texts?.seo?.robots || "index, follow",
	};

	function computeAvailableTrans() {
		function removeUnwantedRoutes(obj) {
			return Object.fromEntries(
				Object.entries(obj).filter(([lang, transPath]) => {
					return lang !== "js" && lang !== "meta" && transPath !== "";
				})
			);
		}

		if (T?.texts?.translations) {
			return removeUnwantedRoutes(T.texts.translations);
		}

		const router = require("../router/router.json");
		const sanitizedPathname = pathname.replace(/^\/|\/$/g, "");

		const currentPageRoute = Object.values(router).find((pageTranslations) => Object.values(pageTranslations).includes(sanitizedPathname));

		if (currentPageRoute) {
			return removeUnwantedRoutes(currentPageRoute);
		}

		return {};
	}

	function computeTitleTemplate() {
		/* if (process.env.GATSBY_ACTIVE_ENV === "development") {
			return "DEV | %s";
		} */

		const lang = humanLang(l);

		if (pathname === "/" || pathname.replace(/\//g, "") === lang) {
			return `%s`;
		}

		const blogRegex = new RegExp(`^(/${lang})?/blog(ue)?/`);
		if (pathname.match(blogRegex)) {
			return "%s";
		}

		if (pathname.match(/\/(inventory-marketplace)\/.+/)) {
			return "%s";
		}

		return `%s | ${site.name}`;
	}

	function getRobots(seo) {
		if (process.env.GATSBY_ACTIVE_ENV === "staging" || process.env.GATSBY_ACTIVE_ENV === "test") {
			return "noindex, nofollow";
		}

		return [seo?.robots?.includes("noindex") ? "noindex" : "index", seo?.robots?.includes("nofollow") ? "nofollow" : "follow"].join(", ");
	}

	const availableTrans = computeAvailableTrans();
	const titleTemplate = computeTitleTemplate();
	const robots = getRobots(seo);

	function generateAlternates({ site }) {
		let out = [];
		for (const [lang, path] of Object.entries(availableTrans)) {
			out.push(<link rel="alternate" href={sanitizePath(siteUrl + path)} hreflang={lang} key={`hreflang_${lang}`} />);
			out.push(<meta property="og:locale:alternate" content={lang} key={`og_${lang}`} />);
		}

		return out;
	}

	const seoTitle = seo?.title ?? (T.translate("seo.title") !== "seo.title" ? T.translate("seo.title") : "");
	const seoDescription = seo?.description ?? (T.translate("seo.description") !== "seo.description" ? T.translate("seo.description") : "");
	const title = seoTitle || site.title;
	const description = seoDescription || site.description;

	let featureImageAlt = title;
	let featureImageHeight = 630;
	let featureImageWidth = 1200;

	let filename = pathname.replace(/\//g, "-").replace(/^-|-$/g, "");

	const allLangs = ["/", ...Object.keys(availableTrans).map((trans) => `/${trans}`), ...Object.keys(availableTrans).map((trans) => `/${trans}/`)];
	if (allLangs.includes(pathname)) {
		filename = "broadsign";
	} else if (l !== "en" && availableTrans.en) {
		filename = availableTrans.en.replace(/\//g, "");
	}

	if (filename === "") {
		filename = "broadsign";
	}

	const featureImage = seo?.featureImage?.src || `${siteUrl}meta/${filename}-${l}.jpg`;

	const schemaOrgJSONLD = {
		"@context": "http://schema.org",
		"@type": seo.type,
		url: canonical,
		name: title,
		description: description,
		image: featureImage,
		datePublished: seo.datePublished,
		dateModified: seo.dateModified,
		author: [
			{
				"@type": seo.authorType,
				name: seo.author,
				url: "https://broadsign.com",
			},
		],
	};

	return (
		<Helmet titleTemplate={titleTemplate} defaultTitle={title}>
			<meta charset="UTF-8"></meta>
			<title>{title}</title>
			<meta name="robots" content={robots}></meta>
			<meta name="msapplication-config" content="/browserconfig.xml"></meta>
			<meta name="description" content={description}></meta>
			<link rel="canonical" href={canonical}></link>
			<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" sizes="180x180"></link>
			<link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" type="image/png"></link>
			<link rel="icon" href="/icons/favicon-16x16.png" sizes="16x16" type="image/png"></link>
			<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#663399"></link>
			<meta property="og:site_name" content={site.title}></meta>
			<meta property="og:locale" content={l}></meta>
			<meta property="og:title" content={title}></meta>
			<meta property="og:type" content={seo?.type || "website"}></meta>
			{seo?.type === "article" && seo.datePublished && <meta property="article:published_time" content={seo.datePublished} />}
			{seo?.type === "article" && <meta name="author" content={seo.author} />}
			<meta property="og:description" content={description}></meta>
			<meta property="og:url" content={canonical}></meta>
			<meta property="og:image" content={featureImage} name="image"></meta>
			<meta property="og:image:secure_url" content={featureImage}></meta>
			<meta property="og:image:width" content={featureImageWidth}></meta>
			<meta property="og:image:height" content={featureImageHeight}></meta>
			<meta property="og:image:alt" content={featureImageAlt}></meta>
			{/* SOCIAL MEDIA */}
			{site.facebookAppID ? <meta property="fb:app_id" content={site.facebookAppID} /> : null}
			{site.twitterSiteID ? <meta name="twitter:site" content={site.twitterSiteID} /> : null}
			{site.twitterUserID ? <meta name="twitter:creator" content={site.twitterUserID} /> : null}
			<meta name="twitter:title" content={title}></meta>
			<meta name="twitter:description" content={description}></meta>
			<meta name="twitter:card" content="summary_large_image"></meta>
			<meta name="twitter:image" content={featureImage}></meta>
			<script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
			{generateAlternates({ site: site, availableTrans: availableTrans })}
			<link rel="alternate" href={canonical} hreflang="x-default"></link>
			<link rel="prefetch" as="font" href={RobotoRegular} type="font/woff2" crossOrigin="anonymous"></link>
			<link rel="prefetch" as="font" href={RobotoMedium} type="font/woff2" crossOrigin="anonymous"></link>
			<link rel="prefetch" as="font" href={RobotoBold} type="font/woff2" crossOrigin="anonymous"></link>
			<link rel="prefetch" as="font" href={RobotoBlack} type="font/woff2" crossOrigin="anonymous"></link>
			{/* Preconnects/Prefetches */}
			<link rel="preconnect" href="https://www.googletagmanager.com"></link>
			<link rel="preconnect" href="https://www.google.com"></link>
			<link rel="preconnect" href="https://www.google.ca"></link>
			<link rel="preconnect" href="https://content.cdntwrk.com/"></link>
			<link rel="dns-prefetch" href="https://www.googletagmanager.com"></link>
			<link rel="dns-prefetch" href="https://www.google.com"></link>
			<link rel="dns-prefetch" href="https://www.google.ca"></link>
			<link rel="dns-prefetch" href="https://content.cdntwrk.com/"></link>
			<link rel="preconnect" href="https://hubspot.clearbit.com/"></link>
		</Helmet>
	);
});

export default App__SEOHelmet;
