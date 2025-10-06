import React, { memo, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import T from "i18n-react";
import { useL } from "@hooks/useDico";
import clsx from "clsx";
import { blogPostSlug } from "@annex";

import { NavColumnHeader, NavFeatured, NavItem } from "@components/Nav/Drawers/NavComponents";

const NavDrawerResources = memo(function NavDrawerResources({ isActive = false }) {
	const [activeSubNav, setActiveSubNav] = useState("");

	const data = useStaticQuery(graphql`
		query {
			featured_en: allWpPost(limit: 1, filter: { status: { eq: "publish" }, language: { slug: { eq: "en" } } }, sort: { date: DESC }) {
				nodes {
					...NavPost
				}
			}
			featured_fr: allWpPost(limit: 1, filter: { status: { eq: "publish" }, language: { slug: { eq: "fr" } } }, sort: { date: DESC }) {
				nodes {
					...NavPost
				}
			}
			featured_es: allWpPost(limit: 1, filter: { status: { eq: "publish" }, language: { slug: { eq: "es" } } }, sort: { date: DESC }) {
				nodes {
					...NavPost
				}
			}
			featured_de: allWpPost(limit: 1, filter: { status: { eq: "publish" }, language: { slug: { eq: "de" } } }, sort: { date: DESC }) {
				nodes {
					...NavPost
				}
			}
			featured_pt: allWpPost(limit: 1, filter: { status: { eq: "publish" }, language: { slug: { eq: "pt" } } }, sort: { date: DESC }) {
				nodes {
					...NavPost
				}
			}
			featured_ja: allWpPost(limit: 1, filter: { status: { eq: "publish" }, language: { slug: { eq: "ja" } } }, sort: { date: DESC }) {
				nodes {
					...NavPost
				}
			}
		}
	`);

	const l = useL();

	const featured = data[`featured_${l}`]?.nodes?.[0] || data.featured_en.nodes[0];

	return (
		<div className={clsx("main_nav__drawer drawer_resources grid justify-content-between mt-0", { active: isActive })}>
			<div className="col-4 pl-6 pr-10 py-8 bg-white z-1">
				<NavColumnHeader>{T.translate("nav.resourceHub")}</NavColumnHeader>
				{["en"].includes(l) && <NavItem id="customerSpotlights" />}
				<NavItem id="events" />
				<NavItem to="resources" id="ebooksWebinars" />
				<NavItem id="blog" />
				<div
					className={clsx("main_nav__link font-bold px-5 py-4 has_sub", { active: activeSubNav === "documentation" })}
					onMouseOver={() => setActiveSubNav("documentation")}
					onFocus={() => setActiveSubNav("documentation")}
					onMouseOut={() => setActiveSubNav("")}
					onBlur={() => setActiveSubNav("")}>
					<span className="relative z-2">{T.translate("nav.productDocumentation")}</span>
				</div>
			</div>
			<div
				className={clsx("subnav subnav_documentation col-4 px-8 py-8 bg-white z-2", { active: activeSubNav === "documentation" })}
				onMouseOver={() => setActiveSubNav("documentation")}
				onMouseOut={() => setActiveSubNav("")}>
				<NavItem id="platformDocumentation" />
				<NavItem to="controlDocumentation" id="controlDocumentationMain" sub="controlDocumentationSub" />
				<NavItem to="directDocumentation" id="directDocumentationMain" sub="directDocumentationSub" />
				<NavItem to="ayudaDocumentation" id="ayudaDocumentationSub" />
				<NavItem to="reachDocumentation" id="reachDocumentationMain" sub="reachDocumentationSub" />
				<NavItem to="publishDocumentation" id="publishDocumentationMain" sub="publishDocumentationSub" />
			</div>
			<div className="col-4 py-8 pl-5 pr-7 bg-zircon">
				<NavFeatured
					title={featured.title}
					thumbnail={featured.featuredImage.node.gatsbyImage}
					to={blogPostSlug(featured.slug, l)}
					cta={T.translate("nav.readArticle")}
					className="bg-zircon p-5 mt-4 rounded-8 hover:bg-white"
				/>
			</div>
		</div>
	);
});

export default NavDrawerResources;
