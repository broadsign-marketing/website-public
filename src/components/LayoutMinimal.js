import React from "react";

import Helmet from "./App__SEOHelmet";

import "@sass/index.scss";

export default function LayoutMinimal({ id, className, children, path, seo = {} }) {
	return (
		<div id="global" className="hide_header hide_footer">
			<Helmet path={path} />
			<main className={className} id={id}>
				{children}
			</main>
		</div>
	);
}
