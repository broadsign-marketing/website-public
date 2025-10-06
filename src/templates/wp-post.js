import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico, useL } from "@hooks/useDico";
import { useBlogPostContent, useBlogSEO, useBlogTranslations, useSocialMediaCards } from "@hooks/useBlog";
import { blogPostSlug } from "@annex";
import clsx from "clsx";

import BlogCTABox from "@components/Blog__CTABox";
// import BlogImageCarousel from "@components/Blog__ImageCarousel";
import BillboardRetailEBook from "@components/Billboard__RetailEBook";
import BlogScrollPercentBar from "@components/BlogScrollPercentBar";
import BlogSubnav from "@components/Subnav/BlogSubnav";
import Container from "@components/Container";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Helmet from "react-helmet";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import DevBlogPostKeywords from "@components/Dev__BlogPostKeywords";

import icon_email from "@icons/email.svg";
import icon_linkedin from "@icons/linkedin.svg";

import "@sass/templates/wp.scss";
import "@sass/templates/blog.scss";
import "@sass/pages/blog.scss";

function Breadcrumb({ sourceContentStream, mainCategory, post }) {
	const l = useL();

	if (sourceContentStream && l !== "en") {
		sourceContentStream.slug = `${l}/${sourceContentStream.slug}`;
	}

	return (
		<div className="breadcrumb mt-8">
			<p className="text-12 text-ash">
				<Link to="blog" className="slash_after text-ash">
					{T.translate("blog")}
				</Link>
				{sourceContentStream && (
					<Link to={sourceContentStream.slug} className="slash_after text-ash">
						{sourceContentStream.title}
					</Link>
				)}
				{/* {!sourceContentStream && mainCategory?.name && (
					<Link to={`blog?category=${mainCategory.slug}`} className="slash_after text-ash">
						{mainCategory.name}
					</Link>
				)} */}
				<b>{post.title}</b>
			</p>
		</div>
	);
}

function AuthorBio({ author }) {
	if (!author?.featuredImage) {
		return null;
	}

	const name = author.title;

	useEffect(() => {
		if (process.env.DEBUG_BLOG === "true") {
			if (!author?.properties?.jobTitle) {
				console.warn("Author", name, "has no job title.");
			}
			if (!author?.socialMedia?.email) {
				console.warn("Author", name, "has no email.");
			}
			if (!author?.socialMedia?.linkedin) {
				console.warn("Author", name, "has no LinkedIn URL.");
			}
		}

		/* if (typeof document !== "undefined") {
			setTimeout(() => {
				document.documentElement.setAttribute("data-scroll-behavior", "smooth");
			}, 1000);
		} */
	}, []);

	return (
		<div className="AuthorBio">
			<div className="grid">
				<div className="col-2 sm:col-1">
					<Img image={author.featuredImage.node.gatsbyImage} alt={name} className="avatar rounded-full" />
				</div>
				<div className="col-10 pl-6 sm:col-11">
					<h5 className="name text-20 text-reflex font-black mt-0 mb-2">{name}</h5>
					{author?.properties?.jobTitle && <p className="about subtitle-2 gradient font-medium mt-0 mb-4">{author.properties.jobTitle}</p>}
					<div className="bio text-16 m-0" dangerouslySetInnerHTML={{ __html: author.content }} />
					<div className="social_media">
						{author?.socialMedia?.email && (
							<Link to={`mailto:${author.socialMedia.email}`} className="social_media_icon inline-flex rounded-full mr-3">
								<img src={icon_email} alt={`Reach out to ${name} by email`} title={`Reach out to ${name} by email`} />
							</Link>
						)}
						{author?.socialMedia?.linkedin && (
							<Link to={author.socialMedia.linkedin} className="social_media_icon inline-flex rounded-full mr-3">
								<img src={icon_linkedin} alt={`Reach out to ${name} on LinkedIn`} title={`Reach out to ${name} on LinkedIn`} />
							</Link>
						)}
					</div>
					{/* <p className="read_more mt-10">
						<Link to={authorPageSlug(author.slug, l)} className="text-cerulean text-14 uppercase link_cerulean_arrow">
							{T.translate("readMoreByAuthor")} {name}
						</Link>
					</p> */}
				</div>
			</div>
		</div>
	);
}

function buildPostObjectForPreview(post) {
	return {
		...post,
		language: {
			slug: "en",
		},
		translations: {
			language: {
				slug: "en",
			},
			slug: blogPostSlug(post.slug, "en"),
		},
	};
}

function setPostTranslations(post, l) {
	const postLanguage = { slug: l };
	const currentTranslation = { language: postLanguage, slug: post.slug };
	const extraTranslations = post?.translations || [];

	T.setTexts({
		...T.texts,
		seo: useBlogSEO(post),
		translations: useBlogTranslations([currentTranslation, ...extraTranslations]),
	});
}

function BlogPopupLinks() {
	// const [openDemoModal, setOpenDemoModal] = useState(false);
	const [openBookACallModal, setOpenBookACallModal] = useState(false);
	const [openTalkToASpecialistModal, setOpenTalkToASpecialistModal] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}

		// Handle Book a Call links
		const bookACallLinks = document.querySelectorAll(".post_content a[href*='book-a-call']");

		for (const link of bookACallLinks) {
			link.href = "#";
			link.target = "";
			link.addEventListener("click", ($e) => {
				$e.preventDefault();
				setOpenBookACallModal(true);
			});
		}

		// Handle Talk to a Specialist links
		const talkToASpecialistLinks = document.querySelectorAll(
			".post_content a[href*='talk-to-a-specialist'], .post_content a[href*='talk-to-a-media-specialist']"
		);

		for (const link of talkToASpecialistLinks) {
			link.href = "#";
			link.target = "";
			link.addEventListener("click", ($e) => {
				$e.preventDefault();
				setOpenTalkToASpecialistModal(true);
			});
		}

		// Handle Demo links
		/*
		const demoLinks = document.querySelectorAll(".post_content a[href*='request-a-demo']");

		for (const link of demoLinks) {
			link.href = "#";
			link.addEventListener("click", ($e) => {
				$e.preventDefault();
				setOpenDemoModal(true);
			});
		}
		*/
	}, []);

	return (
		<>
			{/* {openDemoModal && (
				<Modal variant="form" className="theme_carolina narrow" onClose={() => setOpenDemoModal(false)}>
					<h2 className="text-24 text-left text-transform-none mb-8 w-full">{T.translate("scheduleLiveDemo")}</h2>
					<Form form="demo" submitText="Request a Demo" />
				</Modal>
			)} */}
			{openBookACallModal && (
				<Modal variant="form" className="theme_carolina narrow blog_post" onClose={() => setOpenBookACallModal(false)}>
					{!isFormSubmitted && <h2 className="text-24 text-left text-transform-none mb-8 w-full">{T.translate("bookACall")}</h2>}
					<Form form="bookACall" submitText="Book a Call" thankYouMessage="default" onSubmit={() => setIsFormSubmitted(true)} />
				</Modal>
			)}
			{openTalkToASpecialistModal && (
				<Modal variant="form" className="theme_carolina narrow blog_post" onClose={() => setOpenTalkToASpecialistModal(false)}>
					{!isFormSubmitted && <h2 className="text-24 text-left text-transform-none mb-8 w-full">{T.translate("talkToASpecialist")}</h2>}
					<Form form="talkToASpecialist" submitText="Book a Call" thankYouMessage="default" onSubmit={() => setIsFormSubmitted(true)} />
				</Modal>
			)}
		</>
	);
}

export default function WPPost({ pageContext: { mainCategory, staticFeaturedImage, l, relatedPostsList }, location: { origin, state }, data }) {
	let { post } = data;

	if (origin && origin.match(/preview/)) {
		post = buildPostObjectForPreview(post);
	}

	useDico(l, "blog");

	const featuredImage = useMemo(() => {
		const { node } = post.featuredImage;
		if (node?.localFile?.publicURL && node?.localFile?.publicURL.match(/\.gif$/)) {
			return node.localFile.publicURL;
		}
		return post.featuredImage.node.gatsbyImage;
	}, []);

	const featuredImageCaption = post.featuredImage.node.caption;
	const tags = post.tags.nodes.map((t) => t.slug);
	const isAboutBroadsignPlatform = tags.some((t) => t.match(/broadsign-platform/));
	const isAboutProgrammatic = tags.some((t) => t.match(/programmatic/));

	// SEO Image should be inherited from gatsby-node, with a fallback to the image from graphql

	const seoImage = staticFeaturedImage || { src: "", height: 630, width: 1200 };
	if (!seoImage.src) {
		seoImage.src = post.featuredImage.node.localFile.publicURL;
		seoImage.height = post.featuredImage.node.height;
		seoImage.width = post.featuredImage.node.width;
	}

	const postContentRef = useRef(null);
	const recommendedPostsRef = useRef(null);

	setPostTranslations(post, l);

	const { sourceContentStream: sourceContentStreamSlug } = state || false;
	const sourceContentStream = sourceContentStreamSlug ? data.streams.nodes?.find((stream) => stream.slug === sourceContentStreamSlug) : false;

	useSocialMediaCards();

	const content = useBlogPostContent(post.content);

	const author = data.author || false;

	useEffect(() => {
		fetch("/.netlify/functions/blog_generate_feature_image").then((res) => res.json());
		//.then((data) => console.log(data));
	}, []);

	const recommendedPosts = useMemo(() => {
		function removeDuplicatesById(items) {
			const idSet = new Set();
			const uniqueItems = [];

			for (const item of items) {
				if (item && !idSet.has(item.id)) {
					idSet.add(item.id);
					uniqueItems.push(item);
				}
			}

			return uniqueItems;
		}

		const explicitlyChosenRecommendedPosts = data.post.recommendedPosts.posts || [];

		if (explicitlyChosenRecommendedPosts.length >= 3) {
			return explicitlyChosenRecommendedPosts;
		}

		return removeDuplicatesById([...explicitlyChosenRecommendedPosts, ...relatedPostsList]);
	}, [data]);

	useEffect(() => {
		// Big patch to randomize the recommended posts without triggering the React Minify error
		if (recommendedPostsRef?.current) {
			const recommendedPostColumns = recommendedPostsRef.current.querySelectorAll(".post_card");
			const visiblePosts = [];
			const maxNumberOfPostsToShow = Math.min(3, relatedPostsList.length);

			while (visiblePosts.length < maxNumberOfPostsToShow) {
				const postToAdd = Math.floor(Math.random() * recommendedPostColumns.length);
				if (!visiblePosts.includes(postToAdd)) {
					visiblePosts.push(postToAdd);
				}
			}

			recommendedPostColumns.forEach((column, k) => {
				const newOrder = Math.floor(Math.random() * 100);
				if (visiblePosts.includes(k)) {
					column.classList.remove("hidden");
					column.style.order = newOrder;
				} else {
					column.classList.add("hidden");
					column.style.order = newOrder + 1000;
				}
			});
		}
	}, [data, recommendedPostsRef]);

	const incrementCarousel = useCallback((carousel) => {
		const current = parseInt(carousel.dataset.current);
		const max = parseInt(carousel.dataset.count);
		let next = 0;

		if (current + 1 >= max) {
			next = 0;
		} else {
			next = current + 1;
		}

		carousel.dataset.current = next;

		const carouselImages = carousel.querySelectorAll(".wp-block-image");
		carouselImages.forEach((img) => img.classList.remove("active"));
		carouselImages[next].classList.add("active");
	});

	const handleCarouselClick = useCallback((carousel) => {
		carousel.dataset.stop = "true";
		incrementCarousel(carousel);
	});

	const embedRetailEbookBanner = useCallback(() => {
		if (!post.content || !postContentRef.current) return;

		const pageHeight = postContentRef.current.clientHeight + 200;

		function getSubtitleAboveHalfwayPoint() {
			const subtitles = postContentRef.current.querySelectorAll(".post_content h2, .post_content h3, .post_content h4, .post_content h5");
			if (!subtitles || Array.from(subtitles).length === 0) return;
			const subtitlesPositions = Array.from(subtitles).map((subtitle) => ({ element: subtitle, pos: subtitle?.getBoundingClientRect()?.top || 0 }));
			if (!subtitlesPositions.length) return;
			let subtitlesAboveCutoffPoint = subtitlesPositions.filter((subtitle) => subtitle.pos < pageHeight / 2);
			if (!subtitlesAboveCutoffPoint.length) subtitlesAboveCutoffPoint = [subtitlesPositions.pop()];
			return subtitlesAboveCutoffPoint.pop().element;
		}

		function getParagraphAboveHalfwayPoint() {
			const paragraphs = postContentRef.current.querySelectorAll(".post_content p");
			if (!paragraphs || Array.from(paragraphs).length === 0) return;
			const paragraphsPositions = Array.from(paragraphs).map((par) => ({ element: par, pos: par?.getBoundingClientRect()?.top || 0 }));
			if (!paragraphsPositions.length) return;
			let paragraphsAboveCutoffPoint = paragraphsPositions.filter((par) => par.pos < (pageHeight + 200) / 2);
			if (!paragraphsAboveCutoffPoint.length) paragraphsAboveCutoffPoint = [paragraphsPositions.pop()];
			return paragraphsAboveCutoffPoint.pop().element;
		}

		// Choose an element that's just before the halfway point and make it the chosenNode
		let chosenNode = getSubtitleAboveHalfwayPoint();
		if (!chosenNode) chosenNode = getParagraphAboveHalfwayPoint();
		if (!chosenNode) return;

		const tempDiv = document.createElement("div");
		const root = createRoot(tempDiv);
		root.render(<BillboardRetailEBook />);

		setTimeout(() => {
			const billboardNode = tempDiv.firstChild;
			if (billboardNode) {
				chosenNode.parentNode.insertBefore(billboardNode, chosenNode);
			} else {
				console.warn("Billboard component not found!");
			}
		}, 500);
	}, []);

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}

		// Handle Image Carousels

		const tags = post.tags.nodes.map((tag) => tag.slug);
		const isRetail = tags.find((tag) => tag.match(/retail/));
		if (isRetail) embedRetailEbookBanner();

		const carousels = document.querySelectorAll(".wp-block-gallery");

		const carouselsInterval = () => {
			carousels.forEach((carousel) => {
				if (carousel.dataset.stop === "true") {
					return;
				}

				incrementCarousel(carousel);
			});
		};

		carousels.forEach((carousel) => {
			const carouselImages = carousel.querySelectorAll(".wp-block-image");
			carousel.dataset.count = carouselImages.length;
			carousel.dataset.current = 0;
			carousel.addEventListener("click", ($e) => handleCarouselClick($e.target));
		});

		const interval = setInterval(carouselsInterval, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Layout id="blog_post" className={clsx("theme_carolina template_wp template_blog blog_post", `post_id_${data.post.databaseId}`)}>
			<Helmet>
				<meta property="og:image" content={seoImage.src} name="image" />
				<meta property="og:image:secure_url" content={seoImage.src} />
				<meta property="og:image:width" content={seoImage.width} />
				<meta property="og:image:height" content={seoImage.height} />
				<meta property="og:image:alt" content={post.title} />
				<meta name="twitter:image" content={seoImage.src} />
			</Helmet>
			{!["pt"].includes(l) && <BlogScrollPercentBar className="mb-10" />}
			<Container className="pb-20">
				<BlogSubnav />
				<div className="grid">
					<div className="column_blog_post col-12 md:col-8 lg:col-9" ref={postContentRef}>
						<Breadcrumb sourceContentStream={sourceContentStream} mainCategory={mainCategory} post={post} />
						<h1 className="mt-4 mb-8">{post.title}</h1>
						<p className="date_author text-14 mb-10">
							<span className="date">{post.formattedDate}</span>
							{post.author?.node?.slug && post.author?.node?.slug !== "broadsign" && <span className="author">{post.author.node.name}</span>}
						</p>
						{typeof featuredImage === "string" ? (
							<img src={featuredImage} className="hero w-full mx-auto mb-8 rounded-xl" loading="eager" alt={featuredImageCaption} />
						) : (
							<Img image={featuredImage} className="hero w-full mx-auto mb-8 rounded-xl" loading="eager" alt={featuredImageCaption} />
						)}
						{featuredImageCaption && <div className="hero_caption" dangerouslySetInnerHTML={{ __html: featuredImageCaption }} />}
						<div className="post_content" dangerouslySetInnerHTML={{ __html: content }}></div>
						{author && <AuthorBio author={author} />}
					</div>
					<aside className="column_ctas flex flex-column justify-content-end col-12 md:col-4 lg:col-3">
						{["en", "fr", "es", "de"].includes(l) && (
							<BlogCTABox postId={post.databaseId} tags={{ isAboutBroadsignPlatform, isAboutProgrammatic }} />
						)}
					</aside>
				</div>
				<hr />
				<div className="recommended_posts w-full">
					<h3 className="text-h4 text-transform-none mb-10">{T.translate("recommended")}</h3>
					<div className="grid" ref={recommendedPostsRef}>
						{recommendedPosts.map((item) => {
							const formattedDate = new Date(item.date).toLocaleDateString(l, {
								year: "numeric",
								month: "long",
								day: "numeric",
							});

							return (
								<Link to={blogPostSlug(item.slug, l)} className="post_card col-12 sm:col-4" data-is-required={item.isRequired} key={item.id}>
									<div className="related_post flex flex-column justify-between bg-zircon rounded-xl h-full">
										<Img image={item.featuredImage.node.gatsbyImage} className="thumbnail border-noround shadow-none" alt="" />
										<div className="description flex flex-column justify-between p-4">
											<p className="text-ash text-12 block uppercase mb-2">{formattedDate}</p>
											<h4 className="text-h6 text-reflex font-bold block line-height-140 mt-0 mb-8">{item.title}</h4>
											<p className="read_more link_cerulean_arrow text-14 text-cerulean uppercase mt-auto mb-0">
												{T.translate("readArticle")}
											</p>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</Container>
			<BlogPopupLinks />
		</Layout>
	);
}

export const queryPost = graphql`
	fragment RecommendedPost on WpPost {
		id
		title
		slug
		date
		featuredImage {
			node {
				gatsbyImage(placeholder: BLURRED, width: 600)
			}
		}
	}

	query ($id: String, $l: String!, $author: String) {
		post: wpPost(id: { eq: $id }) {
			id
			databaseId
			slug
			title
			content
			date
			formattedDate: date(formatString: "LL", locale: $l)
			featuredImage {
				node {
					gatsbyImage(placeholder: BLURRED, width: 1400)
					height
					width
					caption
					localFile {
						publicURL
					}
				}
			}
			author {
				node {
					name
					slug
				}
			}
			translations {
				language {
					slug
				}
				slug
			}
			tags {
				nodes {
					name
					slug
				}
			}
			seo {
				metaDesc
				title
			}
			recommendedPosts {
				posts {
					... on WpPost {
						...RecommendedPost
					}
				}
			}
		}

		author: wpAuthorProfile(language: { slug: { eq: $l } }, properties: { userId: { eq: $author } }) {
			id
			title
			slug
			content
			properties {
				jobTitle
			}
			socialMedia {
				email
				linkedin
			}
			featuredImage {
				node {
					gatsbyImage(placeholder: BLURRED, width: 100)
				}
			}
		}

		streams: allWpContentStream(filter: { status: { eq: "publish" } }) {
			nodes {
				title
				slug
			}
		}

		searchTokens: allSearchTokens(filter: { parent: { id: { eq: $id } } }) {
			nodes {
				content
			}
		}
	}
`;
