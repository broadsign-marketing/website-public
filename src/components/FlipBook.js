import React from "react";
import clsx from "clsx";

export default function FlipBook({ url, type = "fliphtml5" }) {
	return (
		<div className={clsx("ebook_wrapper flex-center", `type_${type}`)}>
			{type === "fliphtml5" && (
				<iframe src={url} seamless="seamless" allowtransparency="true" allowFullScreen={true} allow="fullscreen; transparency"></iframe>
			)}
		</div>
	);
}
