import { useLocation } from "@reach/router";
import T from "i18n-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { arraysFuzzyMatch, authorPageSlug, blogPostSlug, iMatch } from "@annex";
import { SEOAuthor, SEOContent, TranslationObj } from "@types";

type DataObjWithSlug = { slug: string };
type TranslationDataObj = { language: DataObjWithSlug; slug?: string; link?: string };
type UseBlogSearchProps = { posts: any; searchText?: string; searchCategory: string };
type SearchTokens = { include: string[] | false; exclude: string[] | false };
type IDNode = { id: string };
type FilteredPostsProps = { list: BlogPostProps[]; quantity: number; message: string };
type BlogPostProps = {
	link: string;
	slug: string;
	id: string;
	title: string;
	date: string;
	searchTokens?: string[];
	language: {
		slug: string;
	};
	featuredImage: any;
	categories: {
		nodes: IDNode[];
	};
	tags: {
		nodes: IDNode[];
	};
};

export function useBlogPostContent(content) {
	const deformatGIFs = useCallback((content) => {
		const allGIFs = content.match(/<figure.+<img.+\.gif.+<\/figure>/gi) || [];
		for (const gif of allGIFs) {
			const gifURL = gif.match(/http[^"&?]+\.gif/)?.[0];
			content = content.replace(gif, `<figure class="wp-block-image"><img src="${decodeURIComponent(gifURL)}" /></figure>`);
		}
		return content;
	}, []);

	const out = useMemo(() => {
		let formattedContent = deformatGIFs(content);
		return formattedContent;
	}, []);

	return out;
}

export function useBlogSEO(postData): SEOContent {
	const title = postData.title;
	const description = postData?.seo?.metaDesc || postData?.excerpt || "";
	const type = "article";
	const robots = postData.robots || "";
	const datePublished = postData.date;
	const dateModified = postData.modified;
	let author = postData?.author?.node?.name || "";

	return { title, type, description, author, robots, datePublished, dateModified };
}

export function useBlogTranslations(translations: TranslationDataObj[] = []) {
	let out: TranslationObj = {};

	const location = useLocation();
	// console.log("useBlog.tsx, line 68 : ", location);

	/* if (host.match(/preview/)) {
		return { en: "/" };
	} */

	translations.forEach((translation) => {
		const language = translation.language.slug;
		out[language] = blogPostSlug(translation.slug, language);
	});

	return out;
}

export function useAuthorPageTranslations(translations: TranslationDataObj[] = []) {
	let out: TranslationObj = {};

	translations.forEach((translation) => {
		const language = translation.language.slug;
		out[language] = authorPageSlug(translation.slug, language);
	});

	return out;
}

export function useContentStreamsTranslations(translations: TranslationDataObj[] = []) {
	let out: TranslationObj = {};

	translations.forEach((translation) => {
		const language = translation.language.slug;
		out[language] = translation?.link?.replace("/content-stream/", "/") || "";
	});

	return out;
}

export function useSocialMediaCards(): null {
	const appendLoadersToSocialMediaCards = useCallback(() => {
		function createLoader() {
			const loaderElement = document.createElement("div");
			const lineElement1 = document.createElement("div");
			const lineElement2 = document.createElement("div");
			const lineElement3 = document.createElement("div");
			lineElement1.classList.add("line");
			lineElement2.classList.add("line");
			lineElement3.classList.add("line");

			loaderElement.classList.add("Loading", "size_1", "relative");
			loaderElement.append(lineElement1, lineElement2, lineElement3);

			return loaderElement;
		}

		const wpEmbedBlocks = document.querySelectorAll(".wp-block-embed-reddit, .wp-block-embed-twitter");

		for (const block of wpEmbedBlocks) {
			const hasIframe = block.querySelector("iframe");
			if (!hasIframe) {
				block.prepend(createLoader());
			}
		}
	}, []);

	const removeScriptTags = useCallback(() => {
		const scriptTags = document.querySelectorAll(".wp-block-embed-twitter script, .wp-block-embed-reddit script");
		for (const tag of scriptTags) {
			tag.remove();
		}
	}, []);

	useEffect(() => {
		appendLoadersToSocialMediaCards();
		removeScriptTags();

		const redditTags = document.querySelectorAll(".wp-block-embed-reddit");
		const twitterTags = document.querySelectorAll(".wp-block-embed-twitter");

		if (redditTags.length > 0) {
			let widgetScriptReddit = document.createElement("script");
			widgetScriptReddit.src = "https://embed.redditmedia.com/widgets/platform.js";
			document.body.appendChild(widgetScriptReddit);
		}

		if (twitterTags.length > 0) {
			let widgetScriptTwitter = document.createElement("script");
			widgetScriptTwitter.src = "https://platform.twitter.com/widgets.js";
			document.body.appendChild(widgetScriptTwitter);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}

export function useBlogSearch({ posts, searchText = "", searchCategory = "" }: UseBlogSearchProps) {
	const searchTextToTokens = useCallback(() => {
		if (searchText.startsWith("-")) {
			searchText = " " + searchText;
		}

		const literals: string[] = searchText.match(/["“][^"“”]+["”]/g)?.map((val) => val.replace(/["“”]/g, "")) || [];
		const exclude: string[] = searchText.match(/\s-[^\s]+/g)?.map((val) => val.replace(/\s-/g, "")) || [];
		const sanitizedText: string[] =
			searchText
				.replace(/["“][^"“”]+["”]/g, "")
				.replace(/\s-[^\s]+/g, "")
				.replace(/[^\w\d\u00C0-\u017F-]/gi, " ")
				.replace(/\s{2,}/g, " ")
				.split(" ") || [];

		const tokens: SearchTokens = { include: [...literals, ...sanitizedText].filter(Boolean), exclude: exclude };

		if (tokens.include.length === 0) {
			tokens.include = false;
		}

		if (tokens.exclude.length === 0) {
			tokens.exclude = false;
		}

		return tokens;
	}, [searchText]);

	const getSearchResultsMessage = useCallback(({ searchResultsQty, tokens }): string => {
		const results = searchResultsQty <= 1 ? T.translate("searchResults.resultsFound.one") : T.translate("searchResults.resultsFound.many");
		const includeKeywords = tokens.include.length === 1 ? T.translate("searchResults.keywords.one") : T.translate("searchResults.keywords.many");
		const excludeKeywords = tokens.exclude.length === 1 ? T.translate("searchResults.keywords.one") : T.translate("searchResults.keywords.many");
		const foundWhenIncluding = T.translate("searchResults.whenIncluding");
		const foundWhenExcluding = T.translate("searchResults.whenExcluding");
		const andExcluding = T.translate("searchResults.andExcluding");

		if (tokens.include && tokens.exclude) {
			return `<b>${searchResultsQty}</b> ${results} ${foundWhenIncluding} ${includeKeywords} <em>${tokens.include.join(
				"</em><em>"
			)}</em> ${andExcluding} ${excludeKeywords} <em>${tokens.exclude.join("</em><em>")}</em>`;
		}

		if (tokens.include && !tokens.exclude) {
			return `<b>${searchResultsQty}</b> ${results} ${foundWhenIncluding} ${includeKeywords} <em>${tokens.include.join("</em><em>")}</em>`;
		}

		if (!tokens.include && tokens.exclude) {
			return `<b>${searchResultsQty}</b> ${results} ${foundWhenExcluding} ${excludeKeywords} <em>${tokens.exclude.join("</em><em>")}</em>`;
		}

		return "";
	}, []);

	// Detect if searching by post ID
	if (searchText.match(/^\d{4,6}$/)) {
		const findPostById = posts.find((p) => p.databaseId === parseInt(searchText));
		if (findPostById) {
			return { list: [findPostById], quantity: 1, message: `Found Post ID <em>${searchText}</em>` };
		}
	}

	let out: FilteredPostsProps = { list: posts, quantity: posts.length, message: "" };

	if (searchText === "" && searchCategory === "") {
		return out;
	}

	out.list = posts.filter((post) => post.nodeType === "Post");

	if (searchCategory) {
		out.list = out.list.filter((post) => {
			if (post.categories.nodes.find((c) => c.slug === searchCategory)) {
				return post;
			}

			return false;
		});
	}

	const searchTextTokens = searchTextToTokens();

	if (searchTextTokens.include || searchTextTokens.exclude) {
		out.list = out.list.filter((post: BlogPostProps): BlogPostProps | false => {
			if (searchTextTokens.exclude) {
				if (iMatch(post.title, searchTextTokens.exclude)) {
					return false;
				}
			}

			if (!searchTextTokens.include && !iMatch(post.title, searchTextTokens.exclude)) {
				return post;
			}

			if (searchTextTokens.include && iMatch(post.title, searchTextTokens.include)) {
				return post;
			}

			if (searchTextTokens.include && arraysFuzzyMatch(searchTextTokens.include, post.searchTokens)) {
				return post;
			}

			return false;
		});
	}

	out.quantity = out.list.length;
	out.message = getSearchResultsMessage({ searchResultsQty: out.list.length, tokens: searchTextTokens });

	for (const post of posts) {
		if (out.list.length >= 3) {
			break;
		}

		const postIsAlreadyInList = out.list.some((postInList) => postInList.id === post.id);
		if (!postIsAlreadyInList) {
			out.list.push(post);
		}
	}

	return out;
}
