import React, { useEffect, useMemo } from "react";
import { graphql, navigate } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { useContentStreamsTranslations } from "@hooks/useBlog";
import route from "@route";

import BlogGridAndSubnav from "@components/Blog__GridAndSubnav";
import Container from "@components/Container";
import Layout from "@components/layout";
// import DevWPUtils from "@components/Dev__WPUtils";

import "@sass/templates/wp.scss";
import "@sass/templates/blog.scss";
import "@sass/pages/blog.scss";

export default function ContentStreamPage({ data }) {
	const { page } = data;

	useDico(page.language.slug, "blog");

	const translations = useContentStreamsTranslations([
		{
			language: page.language,
			slug: page.slug,
		},
		...page.translations,
	]);

	T.setTexts({
		...T.texts,
		seo: {
			title: page.title,
			robots: "noindex follow",
		},
		translations: translations,
	});

	useEffect(() => {
		if (data.posts.nodes.length === 0) {
			if (translations.en) {
				navigate(translations.en);
			} else {
				navigate(route("blog"));
			}
		}
	}, []);

	return (
		<Layout id="blog" className="theme_carolina template_wp template_blog">
			<Container className="pb-20">
				<BlogGridAndSubnav data={data} sourceContentStream={page.slug} ctas={data.ctas.nodes} />
			</Container>
		</Layout>
	);
}

export const queryPage = graphql`
	query ($id: String, $l: String!, $postsList: [String]) {
		page: wpContentStream(id: { eq: $id }) {
			id
			databaseId
			slug
			link
			title
			contentTypeName
			language {
				slug
			}
			translations {
				link
				language {
					slug
				}
			}
		}

		posts: allWpPost(filter: { status: { eq: "publish" }, id: { in: $postsList } }, sort: { date: DESC }) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: $l)
			}
		}

		ctas: allWpCtaTile(filter: { language: { slug: { eq: $l } } }) {
			nodes {
				...CTATile
			}
		}
	}
`;
