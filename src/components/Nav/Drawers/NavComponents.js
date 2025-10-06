import React from "react";
import T from "i18n-react";
import route from "@route";
import clsx from "clsx";

import Link from "@components/LocalizedLink";

import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";

export function NavColumnHeader({ className, children }) {
	let cssClass = clsx("main_nav__column_header pb-4 font-bold", className);

	if (!className || !className.match(/px-\d+/)) {
		cssClass += " px-5";
	}

	return <div className={cssClass}>{children}</div>;
}

export function NavFeatured({ thumbnail, title, to, className, description = "", cta = "" }) {
	if (cta === "") {
		cta = T.translate("nav.learnMore");
	}

	return (
		<Link to={to} className={clsx("main_nav__featured w-full block", className)}>
			<Img image={thumbnail} className="w-full h-auto rounded-8 mb-4" loading="lazy" height={140} width={280} alt="" />
			<h4 className="text-15 text-bold text-ash mb-1">{title}</h4>
			<p className="text-13 text-ash mb-6">{description}</p>
			<span className="link_cerulean_arrow text-cerulean text-13 font-medium uppercase">{cta}</span>
		</Link>
	);
}

export function NavMiniFeatured({ thumbnail, title, to, className, description = "", cta = "" }) {
	if (cta === "") {
		cta = T.translate("nav.learnMore");
	}

	return (
		<Link to={to} className={clsx("main_nav__mini_featured w-full block bg-zircon rounded-10 pt-3 pr-3 pb-3 pl-3 mb-2 hover:bg-white", className)}>
			<span className="flex flex-nowrap align-items-center">
				<Img image={thumbnail} className="mini_featured_img rounded-8 mr-3 lg:mr-4" loading="lazy" height={75} width={75} alt="" />
				<span className="flex flex-wrap align-content-center">
					<h4 className="text-15 text-bold text-ash mb-1 w-full">{title}</h4>
					{description && <p className="text-14 text-ash mb-6 w-full">{description}</p>}
					<span className="link_cerulean_arrow text-cerulean text-13 font-medium uppercase w-full">{cta}</span>
				</span>
			</span>
		</Link>
	);
}

export function NavItem({ id, onMouseOver, onFocus, sub = "", className = "", to = "", langs = ["all"] }) {
	const px = className.match(/px-\d{1,2}/) ? "" : "px-5";
	const py = className.match(/py-\d{1,2}/) ? "" : "py-4";

	if (langs[0] === "all" || langs.includes(T.translate("key"))) {
		if (to === "") {
			to = route(id);
		}

		if (id === "events") {
			to = route("events", "en");
		}

		if (sub !== "") {
			return (
				<Link to={to} className={clsx("main_nav__link font-bold", px, py, className)} onMouseOver={onMouseOver} onFocus={onFocus}>
					<span>{T.translate(`nav.${id}`)}</span>
					<span className="text-13 font-regular">{T.translate(`nav.${sub}`)}</span>
				</Link>
			);
		}

		return (
			<Link to={to} className={clsx("main_nav__link font-bold", px, py, className)} onMouseOver={onMouseOver} onFocus={onFocus}>
				{T.translate(`nav.${id}`)}
			</Link>
		);
	}

	return null;
}
