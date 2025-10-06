import React from "react";
import { Link } from "gatsby";
import { sanitizePath } from "@annex";
import route from "@route";

export default function LocalizedLink({ to, ...props }) {
	if (!to || typeof to !== "string") {
		console.debug('A link in LocalizedLink is missing the "to" property : ', props);
	}

	if (route(to).match(/docs.broadsign.com/)) {
		// Test if the link looks to be towards the doc
		return (
			<a href={route(to)} target="_blank" rel="noopener noreferrer nofollow" {...props} exact="true">
				{props.children}
			</a>
		);
	}

	if (to.startsWith("mailto:") || to.startsWith("tel:")) {
		return (
			<a href={to} rel="noopener noreferrer nofollow" {...props} exact="true">
				{props.children}
			</a>
		);
	}

	if (props?.exact === true || props?.exact === "true") {
		if (to.startsWith("https://")) {
			return (
				<a {...props} href={to} exact="true">
					{props.children}
				</a>
			);
		}
		return <Link to={to} {...props} exact="true" />;
	}

	if (to.startsWith("https://")) {
		// Test if the link looks to be external (contains http:// in the beginning)
		return (
			<a {...props} href={to} rel="noopener noreferrer" target="_blank">
				{props.children}
			</a>
		);
	}

	if (route(to) !== "") {
		to = route(to);
	} else if (to.startsWith("?") || to.startsWith("#")) {
		return (
			<a href={to} {...props} exact="true">
				{props.children}
			</a>
		);
	}

	// Test if this is supposed to be a target="_blank" link
	if (props.target && props.target === "_blank") {
		return (
			<a href={to} target="_blank" rel="noopener noreferrer" {...props} exact="true">
				{props.children}
			</a>
		);
	}

	return <Link to={sanitizePath(to)} {...props} exact="true" />;
}
