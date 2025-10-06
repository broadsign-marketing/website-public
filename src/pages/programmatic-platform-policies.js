import React from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Collapse from "@components/Collapse";
import Link from "@components/LocalizedLink";
import Layout from "@components/layout";
import Tank from "@components/Tank";

import "@sass/pages/privacy.scss";

export default function ProgrammaticPlatformPolicies({ pageContext: { l, dicoPath }, location: { pathname } }) {
	useDico(l, dicoPath);

	return (
		<Layout id="page_programmatic_privacy_policy" className="privacy_policy">
			<Tank className="intro">
				<h1>{T.translate("title")}</h1>
				<p>{T.translate("intro")}</p>
			</Tank>
			<Tank>
				<Collapse title={T.translate("appropriateUse.title")}>
					<p>{T.translate("appropriateUse.p1")}</p>
				</Collapse>
				<Collapse title={T.translate("security.title")}>
					<p>{T.translate("security.p1")}</p>
					<ul>
						<li>{T.translate("security.li1")}</li>
						<li>{T.translate("security.li2")}</li>
						<li>{T.translate("security.li3")}</li>
						<li>{T.translate("security.li4")}</li>
					</ul>
				</Collapse>
				<Collapse title={T.translate("inventory.title")}>
					<p>{T.translate("inventory.p1")}</p>
					<ul>
						<li>{T.translate("inventory.li1")}</li>
						<li>{T.translate("inventory.li2")}</li>
						<li>{T.translate("inventory.li3")}</li>
						<ul>
							<li>{T.translate("inventory.li31")}</li>
							<li>{T.translate("inventory.li32")}</li>
							<li>{T.translate("inventory.li33")}</li>
							<li>{T.translate("inventory.li34")}</li>
							<li>{T.translate("inventory.li35")}</li>
							<li>{T.translate("inventory.li36")}</li>
							<li>{T.translate("inventory.li37")}</li>
							<li>{T.translate("inventory.li38")}</li>
						</ul>
						<li>{T.translate("inventory.li4")}</li>
					</ul>
					<p>{T.translate("inventory.p2")}</p>
					<ul>
						<li>{T.translate("inventory.li5")}</li>
						<li>{T.translate("inventory.li6")}</li>
					</ul>
				</Collapse>
				<Collapse title={T.translate("content.title")}>
					<p>{T.translate("content.p1")}</p>
					<p>{T.translate("content.p2")}</p>
					<ul>
						<li>{T.translate("content.li1")}</li>
						<li>{T.translate("content.li2")}</li>
						<li>{T.translate("content.li3")}</li>
						<li>{T.translate("content.li4")}</li>
						<li>{T.translate("content.li5")}</li>
						<ul>
							<li>{T.translate("content.li51")}</li>
							<li>{T.translate("content.li52")}</li>
							<li>{T.translate("content.li53")}</li>
						</ul>
						<li>{T.translate("content.li6")}</li>
						<li>{T.translate("content.li7")}</li>
					</ul>
				</Collapse>
				<Collapse title={T.translate("data.title")}>
					<p>
						{T.translate("data.p1p1")}
						<Link to={T.translate("data.p1LinkURL")}>{T.translate("data.p1LinkText")}</Link>
						{T.translate("data.p1p2")}
					</p>
				</Collapse>
			</Tank>
		</Layout>
	);
}
