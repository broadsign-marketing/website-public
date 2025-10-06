import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import BlogGridAndSubnav from "@components/Blog__GridAndSubnav";
import Container from "@components/Container";
import Form from "@components/Form";
import Layout from "@components/layout";
import Modal from "@components/Modal";

import "@sass/pages/blog.scss";
import "@sass/templates/blog.scss";

export default function BlogPage({ pageContext: { l, dicoPath }, location: { hash, search }, data }) {
	const [showNewsletterModal, setShowNewsletterModal] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	useDico(l, dicoPath);

	useEffect(() => {
		const _hash = hash.replace(/^#/, "") || "";
		const _query = search.replace(/^\?q=/, "") || "";

		const regex = /(newsletter|infolettre)/;
		if (_hash.match(regex) || _query.match(regex)) {
			setShowNewsletterModal(true);
		}
	}, [hash, search]);

	function handleFormSubmit() {
		setIsFormSubmitted(true);

		setTimeout(() => {
			setShowNewsletterModal(false);
			if (typeof document !== undefined) {
				document.body.style.overflowY = "unset";
			}
		}, 3000);
	}

	/**
	 * Filter works as such :
	 * 1. Check for an exact match between the search input text and the post's title.
	 * 		TODO : Consider tags as well
	 * 		TODO : Consider excerpts, SEO descriptions as well
	 * 		TODO : Consider fuzzy matches, e.g. "favorite" vs "favourite" ?
	 * 2. The list has to be at least 3 posts-long for UI purposes. If fewer than 3 results are returned,
	 *    append posts in descending order of date, until at least 3 posts are shown.
	 */

	/*
	TODO : Infinite scroll on mobile

	const revealOneMorePost = useCallback(() => {
		console.log(displayPostsLimit);
		if (!loadingPost) {
			console.log("reveal one more");
			setDisplayPostsLimit(displayPostsLimit + 1);
		}
	}, [displayPostsLimit]);

	const handleScroll = useCallback(() => {
		if (typeof window !== "undefined" && window.innerWidth < 600) {
			const footerPosOnScreen = window.innerHeight - document.querySelector(".footer_nav").getBoundingClientRect().top;
			const seeMoreCTAPosOnScreen = window.innerHeight - seeMoreCTA.current.getBoundingClientRect().top;

			if (seeMoreCTAPosOnScreen > 100 && footerPosOnScreen < 300) {
				//console.log(window.scrollY, seeMoreCTAPosOnScreen, footerPosOnScreen, "reveal more");
				revealOneMorePost();
			}
		}
	}, []);

	useEffect(() => {
		if (loadingPost) {
			setTimeout(() => {
				setLoadingPost(false);
			}, 2000);
		}
	}, [loadingPost]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll, { passive: true });

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, []); */

	// Check for all registered search keywords, globally
	/* if ((process.env.GATSBY_ACTIVE_ENV === "development") & (process.env.DEBUG_BLOG_SEARCH === "true")) {
		const tokens1 = new Set(data.posts.nodes.map((post) => post.searchTokens).flat());
		const tokens2 = new Set(data.searchTokens.nodes.map((token) => token.content).flat());
		const allTokens = [...new Set([...tokens1, ...tokens2].filter(Boolean))].sort();
		console.log(allTokens);
	} */

	return (
		<Layout id="blog" className="theme_carolina template_blog">
			<Container className="pb-20">
				<BlogGridAndSubnav data={data} />
			</Container>
			{showNewsletterModal && (
				<Modal variant="form" className="theme_carolina" onClose={() => setShowNewsletterModal(false)}>
					{!isFormSubmitted && <h3 className="h4 text-reflex mb-8">{T.translate("newsletter.formHeader")}</h3>}
					<Form form="newsletter" submitText="Subscribe Now" onSubmit={() => handleFormSubmit()} />
				</Modal>
			)}
		</Layout>
	);
}

export const queryBlogImages = graphql`
	query ($l: String) {
		posts: allWpPost(filter: { status: { eq: "publish" }, language: { slug: { eq: $l } } }, sort: [{ isSticky: DESC }, { date: DESC }]) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: $l)
			}
		}
		tags: allWpTag(filter: { language: { slug: { eq: $l } } }) {
			nodes {
				name
				language {
					slug
				}
			}
		}
		categories: allWpCategory(filter: { language: { slug: { eq: $l } } }) {
			nodes {
				name
				language {
					slug
				}
			}
		}
		searchTokens: allSearchTokens {
			nodes {
				content
				parent {
					id
				}
			}
		}
	}
`;
