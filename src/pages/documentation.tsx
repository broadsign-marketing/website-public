import React, { useMemo } from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Container from "@components/Container";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";

import "@sass/pages/documentation.scss";

function DocRow({ row, to }) {
	const { label, sublabel } = row;
	return (
		<Link className="docs_row flex flex-row align-items-center justify-content-between" to={to}>
			<div className="label text-16 font-bold">
				<span className="block font-bold">{label}</span>
				{sublabel && <span className="block font-regular">{sublabel}</span>}
			</div>
			<span className="link_cerulean_arrow text-13 uppercase font-bold">{T.translate("viewDocumentation")}</span>
		</Link>
	);
}

export default function DocsMainPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	useDico(l, dicoPath);

	const { platformDocs, otherDocs } = T.texts;

	const links = useMemo(
		() => ({
			guaranteedCampaigns: "https://docs.broadsign.com/broadsign-platform/Documentation_Gteed_Campaigns/guaranteed-campaign.html",
			audienceCampaigns: "https://docs.broadsign.com/broadsign-platform/Documentation_Aud_Campaigns/aud-campaign.html",
			programmaticCampaigns: "https://docs.broadsign.com/broadsign-reach/",
			staticCampaigns:
				"https://docs.broadsign.com/broadsign-platform/Documentation_Static_Campaigns/static-campaigns.html?tocpath=Static%20Campaigns%7C_____0",
			creatives: "https://docs.broadsign.com/broadsign-platform/Documentation_Creative_Mgmt/creative-management.html",
			screenInventory: "https://docs.broadsign.com/broadsign-platform/inventory-screens-update.html",
			audienceInventory: "https://docs.broadsign.com/broadsign-platform/inventory-audience-update.html",
			userManagement: "https://docs.broadsign.com/broadsign-platform/Documentation_User_Mgmt/user-management.html",
			broadsignControl: "https://docs.broadsign.com/broadsign-control/latest/",
			broadsignReach: "https://docs.broadsign.com/broadsign-reach/",
			broadsignDirect: "https://docs.broadsign.com/broadsign-direct/",
			broadsignAyuda: "https://docs.broadsign.com/broadsign-ayuda/",
		}),
		[]
	);

	return (
		<Layout id="documentation" className="theme_carolina">
			<Container tag="section" className="hero">
				<div className="hero mt-10 mb-12 sm:text-center sm:mt-30 sm:mb-25">
					<p className="subtitle-1 gradient font-medium m-0">{T.translate("hero.overtitle")}</p>
					<h1 className="h3 font-superbold line-height-100 sm:mx-auto">{T.translate("hero.title")}</h1>
				</div>
			</Container>
			<Container tag="section" className="docs_wrapper platform_documentation max-w-900 mb-20">
				<h2 className="text-20 text-transform-none mb-8">{T.translate("platformDocumentation")}</h2>
				{platformDocs.map((row) => {
					const to = row.to || links[row.id];
					return <DocRow row={row} to={to} key={row.id} />;
				})}
			</Container>
			<Container tag="section" className="docs_wrapper other_documentation max-w-900 mb-25">
				<h2 className="text-20 text-transform-none mb-8">{T.translate("otherProductDocumentation")}</h2>
				{otherDocs.map((row) => {
					const to = row.to || links[row.id];
					return <DocRow row={row} to={to} key={row.id} />;
				})}
			</Container>
		</Layout>
	);
}
