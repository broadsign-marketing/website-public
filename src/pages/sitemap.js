import React, { useEffect, useMemo, useState } from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import router from "@router";
import clsx from "clsx";

import Layout from "@components/layout";
import Tank from "@components/Tank";

import "@sass/pages/sitemap.scss";

import flag_en from "@img/ui/flag_en.svg";
import flag_fr from "@img/ui/flag_fr.svg";
import flag_es from "@img/ui/flag_es.svg";
import flag_de from "@img/ui/flag_de.svg";
import flag_nl from "@img/ui/flag_nl.svg";
import flag_ja from "@img/ui/flag_ja.svg";
import flag_cn from "@img/ui/flag_cn.svg";

function RouteRow({ obj }) {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	return (
		<tr className={clsx(success ? "success" : "", error ? "error" : "")}>
			<td className="checkbox">
				<button onClick={() => setSuccess(!success)}>✅</button>
			</td>
			<td className="checkbox">
				<button onClick={() => setError(!error)} className="big">
					⚠
				</button>
			</td>
			{obj.js && <td className="js">{obj.js}</td>}
			<td className="en">
				{obj.en && (
					<a href={`/${obj.en}`} target="_blank" rel="noreferrer">
						<img src={flag_en} className="flag" />
					</a>
				)}
			</td>
			<td className="fr">
				{obj.fr && (
					<a href={`/${obj.fr}`} target="_blank" rel="noreferrer">
						<img src={flag_fr} className="flag" />
					</a>
				)}
			</td>
			<td className="es">
				{obj.es && (
					<a href={`/${obj.es}`} target="_blank" rel="noreferrer">
						<img src={flag_es} className="flag" />
					</a>
				)}
			</td>
			<td className="de">
				{obj.de && (
					<a href={`/${obj.de}`} target="_blank" rel="noreferrer">
						<img src={flag_de} className="flag" />
					</a>
				)}
			</td>
			<td className="nl">
				{obj.nl && (
					<a href={`/${obj.nl}`} target="_blank" rel="noreferrer">
						<img src={flag_nl} className="flag" />
					</a>
				)}
			</td>
			<td className="ja">
				{obj.ja && (
					<a href={`/${obj.ja}`} target="_blank" rel="noreferrer">
						<img src={flag_ja} className="flag" />
					</a>
				)}
			</td>
			<td className="cn">
				{obj.cn && (
					<a href={`/${obj.cn}`} target="_blank" rel="noreferrer">
						<img src={flag_cn} className="flag" />
					</a>
				)}
			</td>
		</tr>
	);
}

export default function SitemapPage({ pageContext: { l } }) {
	useDico(l, "noLocal");

	const [searchQuery, setSearchQuery] = useState("");

	const allRoutes = useMemo(() => {
		function sortByJS(a, b) {
			if (a.js < b.js) {
				return -1;
			}
			if (a.js > b.js) {
				return 1;
			}
			return 0;
		}

		return Object.values(router).sort(sortByJS);
	}, [router]);

	return (
		<Layout id="sitemap">
			<Tank className="table">
				<h1>Sitemap</h1>
				<input
					placeholder="Search pages..."
					className="search_query_field"
					type="text"
					onKeyUp={(e) => setSearchQuery(e.target.value)}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<table>
					<tbody>
						{allRoutes.map((r, k) => {
							if (searchQuery !== "" && !r.js.match(searchQuery)) {
								return null;
							}
							return <RouteRow obj={r} key={k} />;
						})}
					</tbody>
				</table>
			</Tank>
		</Layout>
	);
}
