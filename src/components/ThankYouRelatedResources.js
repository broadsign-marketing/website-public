import React, { memo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import clsx from "clsx";
import { useL } from "@hooks/useDico";
import { blogPostSlug } from "@annex";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";

const RelatedItem = memo(({ thumb, date, title, cta, to, cols = "col-4" }) => {
	return (
		<Link to={to} className={clsx("related col-12 mb-12 flex flex-column align-items-start justify-content-between", `sm:${cols}`)}>
			<Img image={thumb} className="related_thumb mb-4 rounded-xl" alt="" />
			<span className="related_date text-12 text-gradient font-bold mb-1">{date}</span>
			<span className="related_title h6 text-reflex font-black mb-4">{title}</span>
			<span className="related_cta text-16 text-cerulean mt-auto mb-0 link_cerulean_arrow">{cta}</span>
		</Link>
	);
});

const RelatedList = memo(({ list }) => {
	const data = useStaticQuery(graphql`
		query {
			blog_cardoor_en: wpPost(databaseId: { eq: 899 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "en")
			}
			blog_cook_it_en: wpPost(databaseId: { eq: 932 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "en")
			}
			blog_fidelitix_en: wpPost(databaseId: { eq: 976 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "en")
			}
			blog_qr_codes_en: wpPost(databaseId: { eq: 945 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "en")
			}
			blog_salt_xc_en: wpPost(databaseId: { eq: 915 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "en")
			}
			blog_samsung_en: wpPost(databaseId: { eq: 37139 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "en")
			}
			blog_retail101_en: wpPost(databaseId: { eq: 36459 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "en")
			}
			blog_enhanceInStoreRetailExperience_en: wpPost(databaseId: { eq: 37792 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "en")
			}
			ebook_ebookIncreaseRevenueWithContextualInStoreMedia_en: file(relativePath: { eq: "ui/ebook_increase_revenue_in_store_media.jpg" }) {
				...img
			}

			blog_cook_it_fr: wpPost(databaseId: { eq: 36951 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "fr")
			}
			blog_fidelitix_fr: wpPost(databaseId: { eq: 36949 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "fr")
			}
			blog_australia_fr: wpPost(databaseId: { eq: 37218 }) {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: "fr")
			}

			allposts: allWpPost(limit: 6, filter: { status: { eq: "publish" } }) {
				nodes {
					...BlogPost
					formattedDate: date(formatString: "LL", locale: "en")
				}
			}
		}
	`);

	let cols = "col-4";
	if (12 % list.length === 0) {
		cols = `col-${12 / list.length}`;
	}

	const l = useL();

	return list.map(({ id, type, title, cta, to }) => {
		if (type === "blog") {
			const post = data[`blog_${id}_${l}`];

			if (post) {
				const thumb = post?.featuredImage?.node?.gatsbyImage;

				if (post && thumb) {
					return (
						<RelatedItem
							id={id}
							thumb={thumb}
							date={post.formattedDate}
							title={post.title}
							cta={cta}
							to={blogPostSlug(post.slug, l)}
							cols={cols}
							key={id}
						/>
					);
				}
			}
		}

		if (type === "ebook") {
			// console.log(`ebook_${id}_${l}`);
			const thumb = data[`ebook_${id}_${l}`].childImageSharp.gatsbyImageData;
			return <RelatedItem id={id} thumb={thumb} date="eBook" title={title} cta={cta} to={id} cols={cols} key={id} />;
		}

		return (
			<div to={to} className={clsx("related col-12 mb-12", `sm:${cols}`)} key={id}>
				<p key={id}>
					Resource <b>{id}</b> error.
				</p>
				{process.env.NODE_ENV === "development" && (
					<p>Since this is a dev environment, it's possible the number of posts pulled from WP is restricted, and thus this one is unavailable.</p>
				)}
			</div>
		);
	});
});

export { RelatedItem, RelatedList };
