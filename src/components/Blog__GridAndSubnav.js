import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import T from "i18n-react";
import { useLocation } from "@reach/router";
import cookie from "react-cookies";
import clsx from "clsx";
import { blogPostSlug } from "@annex";
import { useL } from "@hooks/useDico";
import { useScreen } from "@hooks/useScreen";
import { useBlogSearch } from "@hooks/useBlog";
import route from "@route";

import BlogCTATile from "@components/Blog__CTATile";
import BlogPostCard from "@components/Blog__PostCard";
import BlogSubnav from "@components/Subnav/BlogSubnav";
import Container from "@components/Container";
import CTA from "@components/CTA";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Form from "@components/Form";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";

function Breadcrumb({ currentPageTitle = "" }) {
	return (
		<div className="breadcrumb text-ash mt-8">
			<p className="text-12">
				<Link to="blog" className="slash_after text-ash">
					{T.translate("blog")}
				</Link>
				<b>{currentPageTitle}</b>
			</p>
		</div>
	);
}

export default function BlogGridAndSubnav({ data, author = "", sourceContentStream = false, ctas = [] }) {
	const { posts, page } = data;

	const initialDisplayPostsLimit = 15;

	const l = useL();
	const screen = useScreen();

	const emptyModalContent = { title: "", tileId: "", formId: "", redirectUrl: "" };

	const { search } = useLocation();
	const searchQuery = search.match(/[?&]s=([^&]+)/)?.[1] || "";
	const categoryQuery = search.match(/[?&]category=([^&]+)/)?.[1] || "";

	const [displayPostsLimit, setDisplayPostsLimit] = useState(initialDisplayPostsLimit);
	const [searchText, setSearchText] = useState(decodeURI(searchQuery));
	const [searchCategory, setSearchCategory] = useState(decodeURI(categoryQuery));
	const [searchResultsQty, setSearchResultsQty] = useState(decodeURI(searchQuery));
	const [modalContent, setModalContent] = useState(emptyModalContent);
	const [invalidCTAs, setInvalidCTAs] = useState([]);

	const seeMoreCTA = useRef(null);

	const validCTAs = ctas.filter((cta) => {
		const formId = cta.content.match(/formId:\s"([^"]+)"/)?.[1];
		let formCookie = "";
		let includedOn = cta?.options?.includeOn?.streams?.map((s) => s.slug) || [];

		if (!cta?.options?.includeOn?.blogPage) {
			includedOn.push(route("blog").replace(/^\//, ""));
		}

		if (!includedOn.includes(page.slug)) {
			return false;
		}

		if (formId) {
			formCookie = cookie.load(`submitted-form-${formId}`);
		}

		if (formCookie && formCookie === "true") {
			if (!invalidCTAs.includes(cta.id)) {
				setInvalidCTAs((prev) => [...prev, cta.id]);
			}
			return false;
		}

		return cta;
	});

	const postsWithAmendedData = useMemo(() => {
		let out = [];

		posts.nodes.forEach((post, key) => {
			// Add Search Terms
			if (data?.searchTokens?.nodes) {
				const searchTokens = data.searchTokens.nodes.find((node) => node.parent.id === post.id);
				post.searchTokens = searchTokens?.content || [];
			}

			// Add CTAs
			validCTAs.forEach((cta) => {
				if (!invalidCTAs.includes(cta.id)) {
					const { frequency, repeat, start } = cta.options.positions;
					if (start === key + 1) {
						out.push(cta);
					} else if (repeat && key > frequency && (key + 1 - start) % (frequency - 1) === 0) {
						out.push(cta);
					}
				}
			});

			out.push(post);
		});

		return out;
	}, [invalidCTAs]);

	const filteredPostsBySearchTerms = useBlogSearch({ posts: postsWithAmendedData, searchText: searchText, searchCategory: searchCategory });

	function handleTextSearch(str) {
		if (searchText !== str) {
			setSearchText(str);
		}
	}

	const removeCTATiles = useCallback((tileId) => {
		if (typeof document === "undefined") {
			throw new Error("document is undefined");
		}

		document.querySelector(".Modal .modal_header").classList.add("hidden");

		// The exiting animation is very gradual.
		const tiles = document.querySelectorAll(`.BlogCTATile[data-tile-id="${tileId}"]`);

		setTimeout(() => {
			tiles.forEach((tile) => {
				tile.classList.add("disappearing");
			});
			document.body.style.overflowY = "unset";
		}, 500);

		setTimeout(() => {
			setInvalidCTAs((prev) => [...prev, tileId]);
			setDisplayPostsLimit((prev) => prev + tiles.length + 1);
			document.querySelector(".Modal.visible").classList.remove("visible");
		}, 3000);

		setTimeout(() => {
			setModalContent(emptyModalContent);
		}, 4000);
	}, []);

	const isVerticalStrategies = page?.slug && page.slug === "vertical-strategies" ? true : false;

	return (
		<div>
			<BlogSubnav
				onSearchText={(searchTextValue) => {
					handleTextSearch(searchTextValue);
				}}
			/>
			{data?.page?.title && <Breadcrumb currentPageTitle={data.page.title} />}
			{author && data.author && (
				<div className="py-10">
					<div className="mb-10">
						<Breadcrumb currentPageTitle={data.author.title} />
					</div>
					<div className="grid">
						<div className="col-12 flex flex-center sm:col-4 md:col-2">
							<Img image={data.author.featuredImage.node.gatsbyImage} className="rounded-full" alt="" />
						</div>
						<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-8 sm:pl-8 md:col-10">
							<h1 className="h3 mb-4">{data.author.title}</h1>
							<div className="bio" dangerouslySetInnerHTML={{ __html: data.author.content }} />
						</div>
					</div>
					<div className="mt-10">
						<h2>{T.translate("readAllByAuthor")}</h2>
					</div>
				</div>
			)}
			{["en", "fr", "es", "de"].includes(l) && searchText !== "" && (
				<p className="search_results_count_message" dangerouslySetInnerHTML={{ __html: filteredPostsBySearchTerms.message }} />
			)}
			<div className="blog_grid my-10">
				{filteredPostsBySearchTerms.list.map((post, key) => {
					if (key >= displayPostsLimit) {
						if (post.nodeType === "Post") {
							return (
								<Link to={blogPostSlug(post.slug, post.language.slug)} className="hidden" key={post.id}>
									{post.title}
								</Link>
							);
						} else {
							return null;
						}
					}

					if (post.nodeType === "CtaTile") {
						if (invalidCTAs.includes(post.id)) {
							return null;
						}

						return (
							<BlogCTATile
								tile={post}
								key={`${post.id}_${key}`}
								onClick={(ctaOptions) => {
									setModalContent(ctaOptions);
								}}
							/>
						);
					}

					return (
						<BlogPostCard
							post={post}
							position={key}
							key={post.id}
							sourceContentStream={sourceContentStream}
							isVerticalStrategies={isVerticalStrategies}
						/>
					);
				})}
			</div>
			<div className={clsx("text-center", { hidden: filteredPostsBySearchTerms.list.length <= displayPostsLimit })} ref={seeMoreCTA}>
				<CTA className="primary" onClick={() => setDisplayPostsLimit((prev) => (screen === "xs" ? prev + 2 : prev + 6))}>
					{T.translate("seeMore")}
				</CTA>
			</div>
			{modalContent.formId !== "" && (
				<Modal className="modal_events theme_carolina" variant="form event" onClose={() => setModalContent(emptyModalContent)}>
					<Container>
						{!invalidCTAs.includes(modalContent.tileId) && <h3 className="modal_header text-h4 mb-8 text-transform-none">{modalContent.title}</h3>}
						<Form
							form={modalContent.formId}
							redirectUrl={modalContent.redirectUrl}
							onSubmit={modalContent?.redirectUrl ? null : () => removeCTATiles(modalContent.tileId)}
						/>
					</Container>
				</Modal>
			)}
		</div>
	);
}
