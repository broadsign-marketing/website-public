const fs = require("fs");
const readline = require("readline");

let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "production";

if (process.env.USERNAME === "localadmin" || process.env.USERNAME === "keving") {
	activeEnv = "development";
}

require("dotenv").config({
	path: `.env.${activeEnv}`,
});

let excludeRedirectsFromSitemap = [];
const redirectsStream = fs.createReadStream("./static/_redirects");
const rl = readline.createInterface({ input: redirectsStream, crlfDelay: Infinity });
rl.on("line", (line) => {
	const fromPath = line.match(/^\S+/);
	if (fromPath && fromPath !== "/*") excludeRedirectsFromSitemap.push(fromPath);
});

const rss = require("./src/assets/rss.js");

const excludePathsFromSitemap = require("./src/assets/sitemap_exclude.json");

let flags = {
	PRESERVE_FILE_DOWNLOAD_CACHE: true,
	PARALLEL_SOURCING: true,
};

if (activeEnv === "development") {
	flags.DEV_SSR = false;
}

module.exports = {
	siteMetadata: {
		title: "Broadsign",
		name: "Broadsign",
		authors: "Kevin Gagnon, Valentin Lachere, Michel Maroun, Charbel Chahine",
		description: "Cloud-based digital signage solutions",
		type: "Company",
		url: process.env.SITE_URL || "https://broadsign.com",
		sameAs: ["https://www.facebook.com/BroadSign", "https://twitter.com/broadsign", "https://www.linkedin.com/company/broadsign"],
		facebookAppID: "BroadSign",
		twitterSiteID: "Broadsign",
		twitterUserID: "@broadsign",
		siteUrl: process.env.SITE_URL || "https://broadsign.com",
	},
	flags: flags,
	trailingSlash: "always",
	plugins: [
		{
			resolve: "gatsby-plugin-why-did-you-render",
		},
		{
			resolve: "gatsby-plugin-react-helmet",
		},
		{
			resolve: "gatsby-plugin-catch-links",
		},
		{
			resolve: "gatsby-plugin-sass",
			options: {
				sassOptions: {
					quietDeps: true,
					verbose: false,
				},
			},
		},
		{
			resolve: "gatsby-plugin-sharp",
			options: {
				defaultQuality: 80,
				stripMetadata: true,
				defaults: {
					formats: ["auto", "webp" /* , "avif" */],
					placeholder: "blurred",
					quality: 80,
					breakpoints: [600, 1088],
				},
			},
		},
		{
			resolve: "gatsby-transformer-sharp",
		},
		{
			resolve: "gatsby-plugin-image",
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Broadsign",
				short_name: "Broadsign",
				start_url: "/",
				background_color: "#FFFFFF",
				theme_color: "#001464",
				display: "minimal-ui",
				icon: "static/icons/icon.png",
			},
		},
		{
			resolve: "gatsby-source-wordpress",
			options: {
				url: `${process.env.WP_URL}/graphql`,
				verbose: true,
				html: {
					imageMaxWidth: 1088,
					generateWebpImages: true,
					generateAvifImages: false,
					placeholderType: "blurred",
				},
				production: {
					hardCacheMediaFiles: true,
				},
				develop: {
					hardCacheData: true,
					hardCacheMediaFiles: true,
				},
				schema: { timeout: 100000 },
				type: {
					Post: { limit: process.env.LIMIT_WP_POSTS === "true" ? 100 : 10000 },
					MediaItem: {
						excludeFieldNames: [
							"contentNodes",
							"seo",
							"ancestors",
							"author",
							"template",
							"lastEditedBy",
							"authorDatabaseId",
							"authorId",
							"contentTypeName",
							"dateGmt",
							"desiredSlug",
							"enclosure",
							"isContentNode",
							"isTermNode",
							"modified",
							"modifiedGmt",
							"parentDatabaseId",
							"parentId",
							"srcSet",
							"parent",
							"children",
						],
					},
					Comment: { exclude: true },
					Menu: { exclude: true },
					MenuItem: { exclude: true },
				},
			},
		},
		{
			resolve: "gatsby-transformer-json",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: `${__dirname}/src/pages/`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "queries",
				path: `${__dirname}/src/queries/`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "img",
				path: `${__dirname}/src/img/`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "static_img",
				path: `${__dirname}/static/img/`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "static",
				path: `${__dirname}/static/`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "data",
				path: `${__dirname}/src/i18n/global/`,
			},
		},
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: "gatsby-remark-images",
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 1600,
							withWebp: true,
						},
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-sitemap",
			options: {
				excludes: [...excludeRedirectsFromSitemap, ...excludePathsFromSitemap],
				output: "/",
				/* query: `{
						allSitePage {
							nodes {
								path
							}
						}
						allWpContentNode(filter: {nodeType: {in: ["Post", "ContentStream","Webinar"]}}) {
							nodes {
								... on WpPost {
									slug
									modifiedGmt
								}
								... on WpContentStream {
									slug
									modifiedGmt
								}
								... on WpWebinar {
									slug
									modifiedGmt
								}
							}
						}
					}`,
				resolveSiteUrl: () => siteUrl,
				resolvePages: ({ allSitePage: { nodes: allPages }, allWpContentNode: { nodes: allWpNodes } }) => {
					console.log();
					const wpNodeMap = allWpNodes.reduce((acc, node) => {
						const { uri } = node;
						acc[uri] = node;

						return acc;
					}, {});

					return allPages.map((page) => {
						return { ...page, ...wpNodeMap[page.path] };
					});
				},
				serialize: ({ path, modifiedGmt }) => {
					return {
						url: path,
						lastmod: modifiedGmt,
					};
				}, */
			},
		},
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: "GTM-MRM8KCP",

				// Include GTM in development.
				// Defaults to false meaning GTM will only be loaded in production.
				includeInDevelopment: true,

				// datalayer to be set before GTM is loaded
				// should be an object or a function that is executed in the browser
				// Defaults to null
				defaultDataLayer: {
					platform: "gatsby",
				},

				// Specify optional GTM environment details.
				// gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
				gtmPreview: "GTM Preview",
				// dataLayerName: "YOUR_DATA_LAYER_NAME",

				enableWebVitalsTracking: true,
			},
		},
		{
			resolve: "gatsby-plugin-svgr",
			options: {
				svgoConfig: {
					plugins: [{ cleanupIDs: false }],
				},
			},
		},
		{
			resolve: "gatsby-plugin-offline",
			options: {
				workboxConfig: {
					globPatterns: ["*.html"],
				},
			},
		},
		/* {
			resolve: "gatsby-plugin-remove-serviceworker",
		}, */
		{
			resolve: "gatsby-plugin-alias-imports",
			options: {
				alias: {
					"@annex": "src/assets/annex.ts",
					"@assets": "src/assets",
					"@components": "src/components",
					"@hooks": "src/hooks",
					"@icons": "src/img/icons",
					"@i18n": "src/i18n",
					"@img": "src/img",
					"@logos": "static/img/logos",
					"@meta": "static/meta",
					"@partials": "src/partials",
					"@route": "src/router/route",
					"@router": "src/router/router",
					"@sass": "src/styles",
					"@static": "static",
					"@templates": "src/templates",
					"@types": "src/assets/types",
					"@utils": "src/utils",
					"@videos": "static/videos",
				},
				extensions: ["js", "json", "tsx", "scss"],
			},
		},
		{
			resolve: "gatsby-plugin-split-css",
		},
		{
			resolve: "gatsby-plugin-feed",
			options: {
				feeds: [
					{
						query: `
							{
								site {
									siteMetadata {
										url
									}
								}
								posts: allWpPost(filter: {language: {slug: { eq: "en" }}}, sort: {date: DESC}) {
									nodes {
										title
										slug
										excerpt
										date
										content
										featuredImage {
											node {
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
									}
								}
							}
						`,
						serialize: ({ query: { site, posts } }) => {
							return posts.nodes.map((p) => {
								let imgURL = "";
								let imgExt = "";

								if (p?.featuredImage?.node?.localFile?.publicURL) {
									imgURL = site.siteMetadata.url.replace(/\/$/, "") + p.featuredImage.node.localFile.publicURL;
									imgExt = "image/" + imgURL.slice(-3);
								}

								if (imgURL === "") {
									console.error(`Error: post ${p.slug} doesn't have a feature image or URL is empty.`);
								}

								return Object.assign({}, p, {
									title: rss.formatTitle(p.title),
									description: rss.formatDescription(p.excerpt, "fr"),
									date: p.date,
									url: rss.formatURL(p.slug, "en"),
									guid: rss.formatURL(p.slug, "en"),
									custom_elements: [
										{ "content:encoded": rss.formatContent(p.content) },
										{
											"media:content": {
												_attr: {
													"xmlns:media": "http://search.yahoo.com/mrss/",
													url: imgURL,
													medium: "image",
													type: imgExt,
												},
											},
										},
										{ "dc:creator": rss.getAuthorEmail(p.author.node.name) },
									],
								});
							});
						},

						output: "/rss.xml",
						language: "en",
						title: "Broadsign's RSS Feed",
						image_url: "https://broadsign.com/meta/blog-en.jpg",
						managingEditor: "kevin.gagnon@broadsign.com (Kevin Gagnon)",
						webMaster: "kevin.gagnon@broadsign.com (Kevin Gagnon)",
						categories: ["Digital Signage", "DOOH", "Programmatic DOOH"],
						pubDate: new Date(),
					},
					{
						query: `
							{
								site {
									siteMetadata {
										url
									}
								}
								posts: allWpPost(filter: {language: {slug: { eq: "fr" }}}, sort: {date: DESC}) {
									nodes {
										title
										slug
										excerpt
										date
										content
										featuredImage {
											node {
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
									}
								}
							}
						`,
						serialize: ({ query: { site, posts } }) => {
							return posts.nodes.map((p) => {
								let imgURL = "";
								let imgExt = "";

								if (p?.featuredImage?.node?.localFile?.publicURL) {
									imgURL = site.siteMetadata.url.replace(/\/$/, "") + p.featuredImage.node.localFile.publicURL;
									imgExt = "image/" + imgURL.slice(-3);
								}

								if (imgURL === "") {
									console.error(`Error: post ${p.slug} doesn't have a feature image or URL is empty.`);
								}

								return Object.assign({}, p, {
									title: rss.formatTitle(p.title),
									description: rss.formatDescription(p.excerpt, "fr"),
									date: p.date,
									url: rss.formatURL(p.slug, "fr"),
									guid: rss.formatURL(p.slug, "fr"),
									custom_elements: [
										{ author: rss.getAuthorEmail(p.author.node.name) },
										{ "content:encoded": rss.formatContent(p.content) },
										{
											"media:content": {
												_attr: {
													"xmlns:media": "http://search.yahoo.com/mrss/",
													url: imgURL,
													medium: "image",
													type: imgExt,
												},
											},
										},
										{ "dc:creator": rss.getAuthorEmail(p.author.node.name) },
									],
								});
							});
						},

						output: "/rss_fr.xml",
						language: "fr",
						title: "Flux RSS de Broadsign",
						image_url: "https://broadsign.com/meta/blog-fr.jpg",
						categories: ["Affichage numérique", "Affichage dynamique", "DOOH"],
						pubDate: new Date(),
					},
				],
			},
		},
	],
};
