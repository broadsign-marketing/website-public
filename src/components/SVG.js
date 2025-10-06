import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Video from "@components/Video";

export default function SVG({ src }) {
	const svgPath = src;
	const pngPath = src.replace(".svg", ".png");

	return <div></div>;
}
