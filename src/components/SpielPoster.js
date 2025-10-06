import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Tank from "./Tank";

import "@sass/components/SpielPoster.scss";

export default function SpielPoster(props) {
	const { children, className, id, img } = props;

	return (
		<section id={id} className={clsx("SpielPoster", className)}>
			{img && <Img alt="" image={img} className={clsx("bg", className)} objectFit="cover" />}
			{children && <Tank div>{children}</Tank>}
		</section>
	);
}

SpielPoster.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	img: PropTypes.object,
};
