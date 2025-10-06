import React, { useEffect, useMemo, useRef, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico, useL } from "@hooks/useDico";
import { useBlogPostContent, useBlogSEO, useAuthorPageTranslations, useSocialMediaCards } from "@hooks/useBlog";
import { authorPageSlug, blogPostSlug, shuffle } from "@annex";
import route from "@route";

import BlogGridAndSubnav from "@components/Blog__GridAndSubnav";
import CTA from "@components/CTA";
import Container from "@components/Container";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Helmet from "react-helmet";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";

import icon_email from "@icons/email.svg";
import icon_linkedin from "@icons/linkedin.svg";

import "@sass/templates/wp.scss";
import "@sass/templates/blog.scss";
import "@sass/pages/author_profile.scss";

function Breadcrumb({ author }) {
	const l = useL();

	return (
		<div className="breadcrumb mt-8">
			<p className="text-12 text-ash">
				<Link to="blog" className="slash_after text-ash">
					{T.translate("blog")}
				</Link>
				<span className="slash_after text-ash">{T.translate("author")}</span>
				<b>{author.title}</b>
			</p>
		</div>
	);
}

export default function WPAuthorProfile({ pageContext: { l }, data }) {
	const { author } = data;

	useDico(l, "blog");

	T.setTexts({
		...T.texts,
		seo: useBlogSEO(author),
		translations: useAuthorPageTranslations([{ language: l, slug: author.slug }, ...author.translations]),
	});

	const hostname = data.site.siteMetadata.siteUrl;

	const seoImage = {
		src: (hostname.match(/localhost/) ? "" : hostname) + author.featuredImage.node.publicUrl.split("?")[0],
		height: author.featuredImage.node.height,
		width: author.featuredImage.node.width,
	};

	return (
		<Layout id="blog" className="theme_carolina template_wp template_blog author_profile">
			<Helmet>
				<meta name="robots" content="noindex,follow"></meta>
				<meta property="og:image" content={seoImage.src} name="image" />
				<meta property="og:image:secure_url" content={seoImage.src} />
				<meta property="og:image:width" content={seoImage.width} />
				<meta property="og:image:height" content={seoImage.height} />
				<meta property="og:image:alt" content={author.title} />
				<meta name="twitter:image" content={seoImage.src} />
			</Helmet>
			<Container className="pb-20">
				<BlogGridAndSubnav author={author.properties.userId} data={data} />
			</Container>
		</Layout>
	);
}

export const queryPost = graphql`
	query ($id: String, $userId: String, $l: String) {
		site {
			siteMetadata {
				siteUrl
			}
		}

		author: wpAuthorProfile(id: { eq: $id }) {
			id
			slug
			title
			content
			language {
				slug
			}
			featuredImage {
				node {
					gatsbyImage(placeholder: BLURRED, width: 600)
					publicUrl
					height
					width
				}
			}
			properties {
				userId
			}
			translations {
				slug
				language {
					slug
				}
			}
		}

		posts: allWpPost(filter: { author: { node: { slug: { eq: $userId } } }, language: { slug: { eq: $l } } }) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: $l)
			}
		}
	}
`;
