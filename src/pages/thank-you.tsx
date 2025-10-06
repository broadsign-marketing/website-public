import React, { useEffect, useMemo, useState } from "react";
import T from "i18n-react";
import { graphql } from "gatsby";
import { useDico } from "@hooks/useDico";
import { blogPostSlug, shuffle } from "@annex";

import Container from "@components/Container";
import { Helmet } from "react-helmet";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Loading from "@components/Loading";
import { RelatedList, RelatedItem } from "@components/ThankYouRelatedResources";

import check from "@img/pages/thank-you/check_circle_green.svg";
import "@sass/pages/thank_you.scss";

function RelatedFromI18n({ i18n }) {
	return (
		<Container>
			<hr style={{ opacity: "0.2" }} className="mt-20 mb-14" />
			<h3 className="h4 mb-8">{i18n.relatedTitle}</h3>
			<div className="grid">
				<RelatedList list={i18n.related} />
			</div>
		</Container>
	);
}

function RelatedFromWP({ l, i18n, variation, posts }) {
	const [shuffledPosts, setShuffledPosts] = useState([]);

	useEffect(() => {
		if (!posts.length) return;
		let out = shuffle(posts).slice(0, 3);
		setShuffledPosts(out);
	}, [variation, posts]);

	return (
		<Container>
			<hr style={{ opacity: "0.2" }} className="mt-20 mb-14" />
			<h3 className="h4 mb-8">{i18n.relatedTitle}</h3>
			<div className="grid">
				{shuffledPosts.map((post) => (
					<RelatedItem
						id={post.id}
						thumb={post.featuredImage.node.gatsbyImage}
						date={post.formattedDate}
						title={post.title}
						cta={T.translate("readMore")}
						to={blogPostSlug(post.slug, l)}
						key={post.id}
					/>
				))}
			</div>
		</Container>
	);
}

export default function ThankYouPage({ pageContext: { l, dicoPath }, location: { search }, data }) {
	const [variation, setVariation] = useState("");

	useDico(l, dicoPath);

	const __ = T.texts?.[variation] || T.texts.default;

	useEffect(() => {
		const availableVariations = [
			"book_a_call",
			"book_a_call_retail",
			// "book_a_call_agencies",
			// "book_a_call_blog",
			// "contact_us",
			// "free_trial",
			"inside_ooh",
			// "lets_connect",
			// "lets_connect_inventory_marketplace",
			"partner_zitcha",
			// "ppc_free_trial",
			// "ppc_request_a_demo",
			// "request_a_demo",
			"request_a_quote",
			// "talk_to_a_media_specialist",
		];

		const variationFromUTMForm = search.match(/utm_form=([\d\w_-]+)/)?.[1];

		let v = "default";

		if (availableVariations.includes(variationFromUTMForm)) {
			v = variationFromUTMForm;
		}

		// 2024-10-08 EDIT : Retiring Calendly for now
		if (["book_a_call"].includes(v)) {
			v = "default";
		}

		// The version with the Calendly link isn't ready yet for any language except EN
		if (["partner_zitcha"].includes(v) && l !== "en") {
			v = "default";
		}

		setVariation(v);
	}, [l]);

	const wpPosts = useMemo(() => {
		let out = data.posts_generic.nodes;

		if (variation === "book_a_call_retail") {
			out = [...data.posts_retail.nodes, ...out];
		}

		return out.slice(0, 3);
	}, [variation]);

	return (
		<Layout id="thank_you" className="theme_carolina pb-10">
			<Helmet>
				<meta name="robots" content="noindex, nofollow"></meta>
			</Helmet>
			{variation ? (
				<>
					{["default", "partner_zitcha", "request_a_quote"].includes(variation) && (
						<Container id="intro">
							<div className="bg-zircon flex flex-column align-items-center rounded-xl py-10 my-10 sm:py-20">
								<img className="check mb-10" src={check} alt="" height="80" width="80" />
								<h1 className="h4 mb-10 text-center">{__.title}</h1>
								<p className="max-w-540 text-20 text-center">{__.blurb}</p>
							</div>
						</Container>
					)}
					{["book_a_call"].includes(variation) && (
						<Container id="intro">
							<div className="bg-zircon flex flex-column align-items-center rounded-xl py-10 my-10 sm:py-20">
								<img className="check mb-10" src={check} alt="" height="80" width="80" />
								<h1 className="h4 mb-10 text-center">{__.title}</h1>
								<p className="max-w-540 text-20 text-center">
									<span>{__.blurb.part1}</span>
									<Link to={__.blurb.ctaLink}>{__.blurb.ctaText}</Link>
									<span>{__.blurb.part2}</span>
								</p>
							</div>
						</Container>
					)}
					{["book_a_call_retail"].includes(variation) && (
						<Container id="intro">
							<div className="bg-zircon flex flex-column align-items-center rounded-xl py-10 my-10 sm:py-20">
								<img className="check mb-10" src={check} alt="" height="80" width="80" />
								<h1 className="h4 mb-10 text-center">{__.title}</h1>
								<p className="max-w-540 text-20 text-center">{__.blurb}</p>
							</div>
						</Container>
					)}
					{["inside_ooh"].includes(variation) && (
						<Container id="intro" className="inside_ooh">
							<div className="rounded-xl overflow-hidden py-10 my-10 sm:py-20">
								<Img className="bg" image={data[`hero_${variation}`].childImageSharp.gatsbyImageData} alt="" />
								<div className="flex flex-column align-items-center z-2">
									<img className="check mb-10" src={check} alt="" height="80" width="80" />
									<h1 className="h4 text-white mb-10 text-center">{__.title}</h1>
									<p className="text-white max-w-540 text-20 text-center">{__.blurb}</p>
								</div>
								<div className="related_resources">
									<RelatedFromWP l={l} i18n={__} variation={variation} posts={wpPosts} />
								</div>
							</div>
						</Container>
					)}
					{!["inside_ooh"].includes(variation) && (
						<>{__.related ? <RelatedFromI18n i18n={__} /> : <RelatedFromWP l={l} i18n={__} variation={variation} posts={wpPosts} />}</>
					)}
				</>
			) : (
				<Container className="placeholder flex flex-center">
					<Loading />
				</Container>
			)}
		</Layout>
	);
}

export const queryThankYou = graphql`
	query ($l: String) {
		hero_default: file(relativePath: { eq: "pages/thank-you/hero_default.jpg" }) {
			...img
		}
		hero_inside_ooh: file(relativePath: { eq: "pages/subscribe/inside_ooh_hero_bg.jpg" }) {
			...img
		}
		hero_partner_zitcha: file(relativePath: { eq: "pages/thank-you/hero_partner_zitcha.jpg" }) {
			...img
		}
		hero_request_a_quote: file(relativePath: { eq: "pages/thank-you/hero_request_a_quote.jpg" }) {
			...img
		}
		hero_vertical_retail: file(relativePath: { eq: "pages/thank-you/hero_vertical_retail.jpg" }) {
			...img
		}

		posts_generic: allWpPost(limit: 3, sort: { date: DESC }, filter: { status: { eq: "publish" }, language: { slug: { eq: $l } } }) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: $l)
			}
		}

		posts_retail: allWpPost(sort: { date: DESC }, filter: { tags: { nodes: { elemMatch: { slug: { regex: "/retail/" } } } } }, limit: 3) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: $l)
			}
		}
	}
`;
