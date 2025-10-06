const fetch = require("node-fetch");
const { existsSync, statSync, copyFile } = require("fs");
const path = require("path");
const { createContentDigest } = require("gatsby-core-utils");

const langs = require("./src/i18n/config/langs");
const router = require("./src/router/router.json");
const { authorPageSlug, blogPostSlug, webinarSlug, sanitizePath, sortBy } = require("./src/assets/annex.js");
const excludedTermsFromSearchTokens = require("./src/assets/excluded_search_tokens.json");

let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "production";
if (process.env.USERNAME === "localadmin") {
	activeEnv = "development";
}

require("dotenv").config({
	path: `.env.${activeEnv}`,
});

function sanitizePathForRouter(str) {
	const out = sanitizePath(str);
	return out.replace(/(^\/|\/$)/g, "");
}

function splitString(str) {
	if (!str) return [];
	return str.split(/[^a-zA-Z0-9\u00C0-\u017F]+/);
}

function getFrequentWordsFromPost(content, minimumWordCount, minimumWordLength) {
	const splitStrings = splitString(content);

	const filteredStrings = splitStrings.filter(
		(str) => str.length >= minimumWordLength && !str.match(/\d/i) && !excludedTermsFromSearchTokens.includes(str.toLowerCase())
	);

	const stringCounts = {};
	filteredStrings.forEach((str) => {
		stringCounts[str] = (stringCounts[str] || 0) + 1;
	});

	return Object.entries(stringCounts)
		.filter(([, count]) => count >= minimumWordCount)
		.map(([str]) => str.toLowerCase());
}

async function getVendorsData() {
	const vendorsData = await fetch("https://vendor-list.consensu.org/v3/vendor-list.json");
	const data = await vendorsData.json();
	return data;
}

async function getPastNewsletters() {
	try {
		const response = await fetch("https://api.baserow.io/api/database/rows/table/679485/?user_field_names=true", {
			method: "GET",
			headers: {
				Authorization: `Token ${process.env.GATSBY_BASEROW_TOKEN}`,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data.results
			.filter((entry) => entry["Display"] === true && entry["Title"] && entry["Date"] && entry["Link"])
			.sort((a, b) => new Date(b.Date) - new Date(a.Date));
	} catch (error) {
		console.error("Error fetching data:", error);
		return [];
	}
}

async function getEventsFromBaserow() {
	try {
		const response = await fetch(
			"https://api.baserow.io/api/database/rows/table/679522/?user_field_names=true&filters=%7B%22filter_type%22%3A%22AND%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22boolean%22%2C%22field%22%3A%22Display%22%2C%22value%22%3A%221%22%7D%5D%2C%22groups%22%3A%5B%7B%22filter_type%22%3A%22OR%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22date_is_on_or_after%22%2C%22field%22%3A%22Date%20Start%22%2C%22value%22%3A%22America%2FToronto%3F%3Ftoday%22%7D%2C%7B%22type%22%3A%22date_is_on_or_after%22%2C%22field%22%3A%22Date%20End%22%2C%22value%22%3A%22America%2FToronto%3F%3Ftoday%22%7D%5D%2C%22groups%22%3A%5B%5D%7D%5D%7D",
			{
				method: "GET",
				headers: {
					Authorization: `Token ${process.env.GATSBY_BASEROW_TOKEN}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data.results.filter((entry) => entry.Display === true && entry["Name"] && entry["Date Start"] && entry["Location"]);
	} catch (error) {
		console.error("Error fetching data:", error);
		return [];
	}
}

exports.onCreatePage = async ({ page, actions }) => {
	const { createPage, deletePage } = actions;
	let jsPathToFindInRouter = page.path === "/" ? "index" : sanitizePathForRouter(page.path);
	let route = Object.values(router).find((r) => r.js === jsPathToFindInRouter);

	if (page.path.match(/(dev-404|app-shell-fallback)/)) {
		return;
	}

	if (page.path.match(/obsolete/)) {
		deletePage(page);
		return;
	}

	if (page.path.match(/404/)) {
		createPage(page);
		return;
	}

	deletePage(page);

	// Route doesn't exist, or page path contains a wildcard
	if (!route || page.path.match(/\*/)) {
		if (process.env.DEBUG_ROUTES === "true") {
			console.error("found no route for", jsPathToFindInRouter);
		}

		return;
	}

	// Is the dev site map special page
	if (page.path === "/sitemap/" && process.env.GATSBY_ACTIVE_ENV === "production") {
		return;
	}

	if (route.js.match(/subscribe\//)) {
		page.context.archives = await getPastNewsletters();
	}

	if (route.js === "events") {
		page.context.events = await getEventsFromBaserow();
	}

	// We don't need to create pages in Chinese, so exclude it
	const langsExcludingCN = langs.filter((l) => l !== "cn");

	langsExcludingCN.forEach((lang) => {
		const localizedRoute = route[lang] || "";
		const url = sanitizePath(localizedRoute);

		// Localized route not found in router, or route is a redirect
		if (!localizedRoute /* || redirect */) {
			return;
		}

		if (process.env.DEBUG_ROUTES === "true") {
			console.log("Path", url, "should pass the test of !url.match(/\\/$/)");
		}

		const dicoPath = route.js.replace(/\//g, "-").replace("ebooks-", "ebooks/");

		const finalPageObject = {
			...page,
			path: url,
			context: {
				...page.context,
				dicoPath: dicoPath,
				l: lang,
				meta: route.meta,
			},
		};

		createPage(finalPageObject);
	});
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	function getMainCategory(postLink, categories, language) {
		const seek = postLink.match(/^\/(\w{2}\/)?([^/]+)/)?.[2];

		if (seek && seek.match(/^(blog|blogue)(-\w{2})?$/)) {
			return null;
		}

		const category = categories.find((c) => c.slug === seek && c?.language?.slug && c.language.slug === language);

		if (category) {
			const out = { name: category?.name, slug: category.slug };
			return out;
		}

		return null;
	}

	function getRelatedPostsList(post, allPostsList) {
		/*
		Give each post a "weight" for the amount of tags in common with the current post.
		The "heavier" (or higher) the weight value, the more likely it'll show up.
		*/
		function getWeight(tagsFromOrigPost, tagsFromRelatedPost) {
			let out = 0;

			for (const tag of tagsFromRelatedPost) {
				if (tagsFromOrigPost.find((t) => t.id === tag.id)) {
					out++;
				}
			}

			return out;
		}

		/*
		Keep only the posts in the same language, and apply the weight.
		allPostsList is already organized by date DESC.
		*/
		const allPostsListWithWeights = allPostsList
			.map((p) => {
				const currentPostYear = post.date.slice(0, 4);
				p.weight = 0;

				if (!p?.language?.slug && process.env.DEBUG_BLOG === "true") {
					console.error("gatsby-node, line 141 : No language on post " + p.slug);
				}

				if (p?.language?.slug !== post.language.slug) {
					return false;
				}

				if (p.date.slice(0, 4) === currentPostYear || p.date.slice(0, 4) === currentPostYear - 1) {
					p.weight = getWeight(post.tags.nodes, p.tags.nodes);
				}

				return p;
			})
			.filter(Boolean);

		const sortedPostsListWithWeights = sortBy(allPostsListWithWeights, "weight", "desc");

		const out = sortedPostsListWithWeights
			.slice(0, 6)
			.map((p) => {
				if (post.id !== p.id && post.language.slug === p.language.slug) {
					return {
						date: p.date,
						featuredImage: p.featuredImage,
						id: p.id,
						slug: p.slug,
						title: p.title,
					};
				}
			})
			.filter(Boolean);

		return out;
	}

	function buildPageObject({ initialPageObject, link, template, extraContext }) {
		let l = initialPageObject?.language?.slug || "en";

		return {
			path: link,
			component: path.resolve(`./src/templates/${template}.js`),
			componentPath: path.resolve(`./src/templates/${template}.js`),
			context: {
				id: initialPageObject.id,
				link: link,
				l: l,
				language: l,
				...extraContext,
			},
		};
	}

	return graphql(`
		query WP {
			site {
				siteMetadata {
					siteUrl
				}
			}

			posts: allWpPost(filter: { status: { eq: "publish" } }, sort: { date: DESC }) {
				nodes {
					id
					slug
					link
					title
					date
					content
					featuredImage {
						node {
							gatsbyImage(width: 1400)
							localFile {
								publicURL
								ext
							}
							height
							width
						}
					}
					language {
						slug
					}
					tags {
						nodes {
							id
							name
						}
					}
					categories {
						nodes {
							id
							name
						}
					}
					author {
						node {
							slug
						}
					}
				}
			}
			authors: allWpAuthorProfile {
				nodes {
					id
					title
					slug
					language {
						slug
					}
					properties {
						userId
					}
				}
			}
			streams: allWpContentStream {
				nodes {
					id
					slug
					link
					title
					language {
						slug
					}
					inclusionList {
						includedPosts {
							... on WpPost {
								id
							}
						}
						includedTags {
							id
						}
						excludedPosts {
							... on WpPost {
								id
							}
						}
					}
				}
			}
			webinars: allWpWebinar {
				nodes {
					id
					slug
					title
					content
					language {
						slug
					}
					webinarOptions {
						series
					}
				}
			}
			tags: allWpTag {
				nodes {
					name
					slug
					language {
						slug
					}
				}
			}
			categories: allWpCategory {
				nodes {
					name
					slug
					language {
						slug
					}
				}
			}
		}
	`).then(({ data }) => {
		data.posts.nodes.forEach((post, index) => {
			let l = post?.language?.slug || "en";

			const mainCategory = getMainCategory(post.link, data.categories.nodes, l);
			const link = sanitizePath(blogPostSlug(post.slug, l));

			if (process.env.DEBUG_BLOG === "true") {
				if (!post?.author?.node?.slug) {
					console.error("Missing author for blog post", link, " ; post.author resolves to", JSON.stringify(post.author));
				}
			}

			if (!post?.featuredImage?.node?.localFile?.publicURL) {
				console.warn("gatsby-node : Blog Post", post.slug, "has no featured image.");
				delete post.content;
				console.log(post);
				return;
			}

			const fiSourceUrl = post.featuredImage.node.localFile.publicURL;

			const fiFilename = ("blog-" + l + "-" + post.slug.replace(/[^\w\d]+/g, "-")).replace(/-{2,}/g, "-").replace(/-$/g, "").toLowerCase();
			const fiFileExt = post.featuredImage.node.localFile.ext;
			const fiDestinationFilepath = "/meta/" + fiFilename + fiFileExt;

			async function copyFeatureImage(source, destination) {
				const destinationExists = existsSync(destination);

				let sourceSize, destinationSize;

				if (destinationExists) {
					// Get file sizes of both source and destination
					sourceSize = statSync(source).size;
					destinationSize = statSync(destination).size;
				} else {
					// If destination doesn't exist, set sizes to different values
					sourceSize = 0;
					destinationSize = 1;
				}

				if (sourceSize < destinationSize) {
					await copyFile(source, destination, (err) => {
						if (err) {
							console.error("Could not copy image: [", source, "] to [", destination, "] ---", err);
						} else {
							if (process.env.DEBUG_BLOG === "true") {
								console.log("Success copying image [", destination, "]");
							}
						}
					});
				} else {
					if (process.env.DEBUG_BLOG === "true") {
						console.log("Image [", destination, "] already exists.");
					}
				}
			}

			if (existsSync(fiSourceUrl)) {
				copyFeatureImage(fiSourceUrl, "./static" + fiDestinationFilepath);
			} else if (existsSync("./public" + fiSourceUrl)) {
				copyFeatureImage("./public" + fiSourceUrl, "./static" + fiDestinationFilepath);
			}

			if (index > 100) {
				// console.log(post.slug, "should be DSG.");
			}

			const pageObject = buildPageObject({
				initialPageObject: post,
				link,
				template: "wp-post",
				extraContext: {
					staticFeaturedImage: {
						src: data.site.siteMetadata.siteUrl + fiDestinationFilepath,
						height: post.featuredImage.node.height || 1200,
						width: post.featuredImage.node.width || 630,
					},
					mainCategory: mainCategory,
					relatedPostsList: getRelatedPostsList(post, data.posts.nodes),
					author: post.author?.node?.slug || "broadsign",
					hostname: data.site.siteMetadata.siteUrl,
				},
			});

			createPage(pageObject);
		});

		data.authors.nodes.forEach((author) => {
			const authorURL = sanitizePath(authorPageSlug(author.slug, author.language.slug));

			if (!author?.properties?.userId) {
				console.error("No userID for", authorURL);
			}

			const pageObject = buildPageObject({
				path: authorURL,
				link: authorURL,
				initialPageObject: author,
				template: "wp-author",
				extraContext: { userId: author?.properties?.userId || "" },
			});

			createPage(pageObject);
		});

		data.streams.nodes.forEach((stream) => {
			const includedPosts = stream?.inclusionList?.includedPosts?.map((e) => e.id) || [];
			const includedTags = stream?.inclusionList?.includedTags?.map((e) => e.id) || [];
			const excludedPosts = stream?.inclusionList?.excludedPosts?.map((e) => e.id) || [];

			const postsList = data.posts.nodes
				.map((post) => {
					if (excludedPosts.length > 0 && excludedPosts.includes(post.id)) {
						return false;
					}

					if (includedPosts.length > 0 && includedPosts.includes(post.id)) {
						return post.id;
					}

					if (includedTags.length > 0 && post.tags.nodes.find((t) => includedTags.includes(t.id))) {
						return post.id;
					}

					return false;
				})
				.filter(Boolean);

			const streamURL = sanitizePath(stream.link.replace("/content-stream/", "/"));

			const pageObject = buildPageObject({
				path: streamURL,
				link: streamURL,
				initialPageObject: stream,
				template: "wp-stream",
				extraContext: {
					postsList: postsList,
				},
			});

			createPage(pageObject);
		});

		data.webinars.nodes.forEach((webinar) => {
			const matchYoutubeID = webinar.content.match(/youtube\.com\/embed\/([^?&]{11})/);
			const matchVimeoID = webinar.content.match(/player\.vimeo\.com\/video\/([^?&"]+)\?h=([^?&"]+)/);
			const webinarURL = sanitizePath(webinarSlug(webinar.slug, webinar.webinarOptions.series));
			let youtubeID = "";
			let vimeoID = [];

			if (matchYoutubeID?.[1]) {
				youtubeID = matchYoutubeID[1];
			}
			if (matchVimeoID?.[1] && matchVimeoID?.[2]) {
				vimeoID = [matchVimeoID[1], matchVimeoID[2]];
			}

			const pageObject = buildPageObject({
				path: webinarURL,
				link: webinarURL,
				initialPageObject: webinar,
				template: "wp-webinar",
				extraContext: {
					youtubeID,
					vimeoID,
					series: webinar.webinarOptions.series,
				},
			});

			createPage(pageObject);
		});
	});
};

exports.sourceNodes = async ({ actions, createContentDigest }) => {
	const { createNode } = actions;
	const result = await fetch("https://vendor-list.consensu.org/v3/vendor-list.json");
	const data = await result.json();

	createNode({
		...data,
		id: `ConsensuVendorList`,
		parent: null,
		children: [],
		internal: {
			type: "ConsensuVendorList",
			contentDigest: createContentDigest(data),
		},
	});
};

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
	actions.setWebpackConfig({
		resolve: {
			fallback: {
				fs: false,
			},
			alias: {
				"@sass": path.resolve(__dirname, "src/styles"),
			},
		},
		output: {
			publicPath: "/",
		},
	});

	if (stage === "develop") {
		const config = getConfig();
		const miniCssExtractPlugin = config.plugins.find((plugin) => plugin.constructor.name === "MiniCssExtractPlugin");
		if (miniCssExtractPlugin) {
			miniCssExtractPlugin.options.ignoreOrder = true;
		}
		actions.replaceWebpackConfig(config);
	}
};

exports.createSchemaCustomization = ({ actions }) => {
	actions.createTypes(`
		type SitePage implements Node @dontInfer {
			path: String!
		}

		type Author implements Node @dontInfer {
			full_name: String
		}

		type Tag implements Node @dontInfer {
			id: String
			name: String
		}

		type WpEvent implements Node {
	    	eventOptions: WpEvent_Eventoptions
	    }

	    type WpEvent_Eventoptions {
			dateEnd: Date @dateformat
			dateStart: Date @dateformat
	    }
	`);
};

exports.createResolvers = ({ createResolvers }) => {
	const resolvers = {
		WpPost: {
			tags: {
				type: ["WpTag"],
				resolve(source, args, context, info) {
					return source.tags.nodes.map((tagNode) => context.nodeModel.getNodeById({ id: tagNode.id }));
				},
			},
		},
	};

	createResolvers(resolvers);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
	const { createNode } = actions;

	if (node.internal.type === "WpPost") {
		const tags = node.tags?.nodes || [];
		const title = node.title || "";
		const seoDesc = node.seo?.metaDesc || "";
		let tagNames = "";

		if (tags.length > 0) {
			tagNames = node.tags.nodes
				.map((tagNode) => {
					const fullTagNode = getNode(tagNode.id);
					return fullTagNode ? fullTagNode.name : null;
				})
				.filter(Boolean)
				.join(" ");
		}

		// Consider frequent words but only in EN
		let frequentWords = [];
		if (node.language.slug === "en") {
			frequentWords = getFrequentWordsFromPost(node.content, 5, 5);
		}

		const tokens = [...new Set([...splitString(title), ...splitString(seoDesc), ...splitString(tagNames), ...frequentWords])]
			.map((token) => {
				// Remove words from the Excluded dictionary
				if (excludedTermsFromSearchTokens.includes(token.toLowerCase())) {
					return null;
				}

				// Remove short words
				if (token.length < 3) {
					return null;
				}

				// Remove plain numbers
				if (token.match(/^\d+$/)) {
					return null;
				}

				return token.toLowerCase().trim();
			})
			.filter(Boolean)
			.sort();

		const content = [...new Set(tokens)];

		const searchTokensNode = {
			id: createNodeId(`${node.id}SearchTokens`),
			parent: node.id,
			children: [],
			internal: {
				type: "SearchTokens",
				contentDigest: createContentDigest(content),
			},
			content,
		};

		createNode(searchTokensNode);
	}
};
