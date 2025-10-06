import React, { useMemo } from "react";
import T from "i18n-react";
import { blogPostSlug } from "@annex";
import clsx from "clsx";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";

export default function BlogPostCard({ post, position, sourceContentStream, isVerticalStrategies = false }) {
	const initialDisplayPostsQty = 15;

	const isFeatured = position === 0 ? true : false;
	const isInInitialLoad = position < initialDisplayPostsQty ? true : false;
	const isTop3 = position < 3 ? true : false;

	const { formattedDate } = post;

	if (!post.featuredImage) {
		console.error(`Post ${post.slug} doesn't have a feature image.`);
	}

	const featuredImage = useMemo(() => {
		const { node } = post.featuredImage;
		console.log(node);
		if (node?.localFile?.publicURL && node?.localFile?.publicURL.match(/\.gif$/)) {
			return node.localFile.publicURL;
		}
		return post.featuredImage.node.gatsbyImage;
	}, []);

	const postsWithFeatureImagePositionedToTop = [41843];
	const hasImagePositionedToTop = postsWithFeatureImagePositionedToTop.includes(post.databaseId);

	const title = useMemo(() => {
		const decomposed = post.title.split(" ");
		let out = [];
		let titleLength = 0;
		let appendEllipsis = false;

		decomposed.forEach((word) => {
			if (titleLength < 100) {
				out.push(word);
				titleLength += word.length;
			} else {
				appendEllipsis = true;
			}
		});

		return out.join(" ") + (appendEllipsis ? "..." : "");
	}, [post.title]);

	/* const desc = useMemo(() => {
		if (post?.seo?.metaDesc) return post.seo.metaDesc;
		if (post?.excerpt) return post.excerpt.replace("<p>", "").replace("</p>", "");
		return "";
	}); */
	console.log(featuredImage);

	return (
		<Link
			to={blogPostSlug(post.slug, post.language.slug)}
			state={{ sourceContentStream: sourceContentStream }}
			className={clsx("blog_item blog_item_post flex flex-column bg-zircon rounded-xl", { featured: isFeatured, no_anim: isInInitialLoad })}
			key={post.id}>
			{typeof featuredImage === "string" ? (
				<img src={featuredImage} className="blog_item_post_thumbnail object-fit-cover" alt="" loading={isTop3 ? "eager" : "lazy"} />
			) : (
				<Img
					image={post.featuredImage.node.gatsbyImage}
					className="blog_item_post_thumbnail"
					alt=""
					loading={isTop3 ? "eager" : "lazy"}
					objectPosition={hasImagePositionedToTop ? "center top" : "center center"}
				/>
			)}
			<div className="blog_item_post_title flex flex-column justify-between">
				<p className="blog_item_post_date text-ash text-12 letter-spacing-5 uppercase mb-2">{formattedDate}</p>
				<h3 className={clsx("mt-0", isFeatured ? "mb-8" : "mb-auto")}>{title}</h3>
				{/* {isFeatured && <p className="line-height-180 mb-auto">{desc}</p>} */}
				<p className="blog_item_post_read_more link_cerulean_arrow text-cerulean text-14 letter-spacing-5 uppercase mt-4 mb-0">
					{isVerticalStrategies ? T.translate("readPlaybook") : T.translate("readArticle")}
				</p>
			</div>
		</Link>
	);
}
