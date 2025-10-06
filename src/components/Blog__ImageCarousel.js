import React, { memo, useMemo } from "react";
import { blogPostSlug } from "@annex";
import clsx from "clsx";

import { GatsbyImage as Img, StaticImage, getImage } from "gatsby-plugin-image";
import Carousel from "@components/BroadsignAdsCarousel";

const BlogImageCarousel = memo(({ source }) => {
	const content = source.children
		.filter((line) => !(line.data && typeof line.data === "string" && /^\n+$/.test(line.data)))
		.map((line) => {
			// Discard if this is not an image block
			if (!line.attribs.class.match(/wp-block-image/)) {
				return null;
			}

			// Detect if this is a gatsby-image
			console.log("-------------------------------------------");
			console.log("line.children", line.children);
			console.log("line.children[1]", line?.children?.[1]);
			if (line?.children?.[1]?.attribs?.type === "application/json") {
				if (line?.children?.[1]?.children?.[0]?.data) {
					const imgObj = line.children[1].children[0].data;
					console.log("line.children[1].children[0].data", JSON.parse(imgObj));
					return <Img image={imgObj} alt="" key={line.children[0].attribs.class} />;
				}
			}

			// Detect if this is a normal image
			const { src } = line.children[0].attribs;
			if (src) {
				console.log("use normal image for", src);
				return <img src={src} alt="" key={src} />;
			}

			return null;
		})
		.filter(Boolean);

	return <Carousel loop={{ auto: true, duration: 3000 }}>{content}</Carousel>;
});

export default BlogImageCarousel;
