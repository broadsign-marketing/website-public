import React from "react";
import clsx from "clsx";

import Column from "./Column";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import "@sass/components/ImgHat.scss";
import Link from "@components/LocalizedLink";
import Row from "./Row";

export default function ImgHat(props) {
	const { id, src, title, text, sign, className, children, alt, to, objectFit = "contain" } = props;

	return (
		<div id={id} className={clsx("ImgHat", className)}>
			<Row>
				{to ? (
					<Link to={to}>{typeof src === "object" ? <Img image={src} alt="" objectFit={objectFit} /> : <img src={src} alt="" />}</Link>
				) : (
					<>{typeof src === "object" ? <Img image={src} alt="" objectFit={objectFit} /> : <img src={src} alt="" />}</>
				)}
			</Row>
			<Column>
				{title ? <h3>{title}</h3> : ""}
				{children ? children : <p>{text}</p>}
				{sign ? <p className="signature">{sign}</p> : ""}
			</Column>
		</div>
	);
}
