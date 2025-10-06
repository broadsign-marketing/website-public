import React, { useEffect, useMemo, useRef, useState } from "react";
import cookie from "react-cookies";
import clsx from "clsx";
import { slugify } from "@annex";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";

import "@sass/components/BlogCTATile.scss";

export default function BlogCTATile({ tile, onClick }) {
	const [isLoaded, setIsLoaded] = useState(false);

	const { content, id } = tile;
	const { backgroundColor, link, redirectAfterSubmit, setFeatureAsBackground, textColor, type } = tile.options;

	const selfRef = useRef(null);

	const ctaRegex = new RegExp('<a[^>]+class="[^"]*CTA[^>]+>[^<]+</a>');
	const hsFormRegex = new RegExp('<div class="wp-block-leadin-hubspot-form-block">[sS]+class="hbspt-form" id="[^"]+">s*</div>s*</div>');
	const spacesRegex = new RegExp("(\t|\n|\r)", "g");

	const img = tile?.featuredImage?.node?.gatsbyImage || false;
	const tileBtn = content.match(ctaRegex);
	const formId = content.match(/formId:\s"([^"]+)"/)?.[1];
	const title = content.match(/<h\d>(.+)<\/h\d>/)?.[1] || "";

	const tileContent = content.replace(hsFormRegex, "").replace(ctaRegex, "").replace(spacesRegex, "");

	useEffect(() => {
		const cookieExists = cookie.load(`submitted-form-${formId}`);
		if (!cookieExists) {
			setIsLoaded(true);
		}
	}, [formId]);

	if (!isLoaded) {
		return null;
	}

	return (
		<div
			className={clsx(
				"BlogCTATile blog_item blog_item_cta has_CTA",
				backgroundColor ? `bg-${backgroundColor}` : "",
				textColor ? `text-${textColor}` : "",
				slugify(tile.slug, "_")
			)}
			id={id}
			ref={selfRef}
			data-tile-id={id}>
			{type === "form" ? (
				<button
					className="bg"
					style={{ zIndex: "1000" }}
					onClick={() => onClick({ title, tileId: id, formId, redirectUrl: redirectAfterSubmit })}></button>
			) : (
				<Link to={link} className="bg" style={{ zIndex: "1000" }} exact={true}></Link>
			)}
			{img && <Img className={clsx({ "bg bg_img": setFeatureAsBackground })} image={img} alt="" />}
			<div className="blog_cta_tile_content" dangerouslySetInnerHTML={{ __html: tileContent }}></div>
			<div className="blog_cta_tile_btn" dangerouslySetInnerHTML={{ __html: tileBtn }}></div>
		</div>
	);
}
