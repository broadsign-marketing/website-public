import React from "react";
import clsx from "clsx";

import Container from "@components/Container";
import "@sass/components/QuoteBlock.scss";

export default function QuoteBlock({ className, id, sign, children }) {
	return (
		<div className={clsx("QuoteBlock", className)}>
			<Container>
				<blockquote id={id}>
					<div className="wrap">{children}</div>
					{sign && <cite>{sign}</cite>}
				</blockquote>
			</Container>
		</div>
	);
}
