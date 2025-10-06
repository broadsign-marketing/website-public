import React, { useEffect } from "react";
import T from "i18n-react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useL } from "@hooks/useDico";
import { blogPostSlug, excerpt, getTranslations, htmlChars } from "@annex";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";

import "@sass/components/RelatedBlogs.scss";

function RelatedBlogPost({ l, __, post }) {
	const { title, slug } = post;

	return (
		<div className="post">
			<Link className="inner" to={blogPostSlug(slug, l)}>
				<Img image={post.featuredImage.node.gatsbyImage} alt="" className="thumb object-fit-cover" loading="lazy" />
				<h3 className="title">{excerpt(htmlChars(title))}</h3>
				<p className="read_more">{__.readArticle}</p>
			</Link>
		</div>
	);
}

function RelatedBlogPostCarolina({ l, __, post, cta = "readArticle" }) {
	const { title, slug } = post;

	return (
		<div className="post">
			<Link className="inner block" to={blogPostSlug(slug, l)}>
				<Img image={post.featuredImage.node.gatsbyImage} alt="" className="thumb rounded-xl object-fit-cover mb-5" loading="lazy" />
				{post.formattedDate && <p className="date uppercase mb-1">{post.formattedDate}</p>}
				<h3 className="title h6 mb-5 pr-3">{excerpt(htmlChars(title))}</h3>
				<p className="read_more uppercase flex align-items-center">{__[cta]}</p>
			</Link>
		</div>
	);
}
function RelatedBlogPostZircon({ l, __, post, cta = "readArticle" }) {
	const { title, slug } = post;

	return (
		<div className="post h-full">
			<Link className="inner block flex flex-column justify-content-between h-full" to={blogPostSlug(slug, l)}>
				<Img image={post.featuredImage.node.gatsbyImage} alt="" className="thumb" objectFit="cover" loading="lazy" />
				<div className="description flex flex-column align-items-start justify-content-between p-4 md:p-5">
					{post.formattedDate && <p className="date text-dark text-12 letter-spacing-10 uppercase mt-0 mb-1">{post.formattedDate}</p>}
					<h3 className="title text-20 line-height-160 mt-0 mb-5 pr-3">{htmlChars(title)}</h3>
					<p className="read_more link_cerulean_arrow text-cerulean uppercase mt-auto mb-0">{__[cta]}</p>
				</div>
			</Link>
		</div>
	);
}

export default function RelatedBlogs({ posts, className, id, theme, cta }) {
	const l = useL();
	const __ = getTranslations(`${l}/components/RelatedBlogs`);

	if (["carolina_campsite"].includes(theme)) {
		return (
			<div className={clsx("RelatedBlogs theme_carolina", className, "theme_" + theme)} id={id}>
				<div className="grid flex-nowrap">
					{posts.map((post, k) => (
						<div className="col col-10 sm:col-4" key={post.id}>
							<RelatedBlogPostCarolina l={l} __={__} post={post} key={k} cta={cta} />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (["zircon"].includes(theme)) {
		return (
			<div className={clsx("RelatedBlogs", className, "theme_" + theme)} id={id}>
				<div className="grid flex-nowrap">
					{posts.map((post, k) => (
						<div className="col col-10 sm:col-4" key={post.id}>
							<RelatedBlogPostZircon l={l} __={__} post={post} key={k} cta={cta} />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className={clsx("RelatedBlogs grid", className, "theme_" + theme)} id={id}>
			{posts.map((p, k) => {
				const post = p.node || p;
				if (blogPostSlug(post.slug, l) !== "") {
					return (
						<div className="col-12 sm:col-6">
							<RelatedBlogPost l={l} __={__} post={post} key={p.id} />
						</div>
					);
				}
			})}
		</div>
	);
}

RelatedBlogs.propTypes = {
	posts: PropTypes.array.isRequired,
	theme: PropTypes.oneOf(["aurora", "neon", "carolina_campsite", "zircon"]).isRequired,
};
