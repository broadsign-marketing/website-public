import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import T from "i18n-react";
import { capitalize, shuffle } from "@annex";
import clsx from "clsx";

import Container from "@components/Container";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";
import Orbit from "@components/Orbit";

function InventoryCard({ inventory, image, className }) {
	return (
		<Link to={`auctionPackages${capitalize(inventory)}`} className={clsx("inventory_card bg-white mx-2 px-2 rounded-10", className)} draggable="false">
			<div className="flex flex-column flex-nowrap align-items-center justify-content-between h-full z-1">
				<Img className="card_image mb-4" image={image} objectFit="contain" alt="" />
				<p className="card_title text-reflex text-14 font-bold text-center line-height-100 text-transform-none mb-2">{T.translate(inventory)}</p>
				<hr />
				<span className="card_link link_cerulean_arrow text-cerulean text-13 uppercase">{T.translate("learnMore")}</span>
			</div>
		</Link>
	);
}

export default function Inventory__Explore() {
	const [shuffledInventories, setShuffledInventories] = useState([]);

	const data = useStaticQuery(graphql`
		query Inventory__Explore_Img {
			automotive: file(relativePath: { eq: "pages/inventory-marketplace/inventory_automotive.png" }) {
				...imgH88
			}
			beautyWellness: file(relativePath: { eq: "pages/inventory-marketplace/inventory_beauty_wellness.png" }) {
				...imgH88
			}
			entertainmentMedia: file(relativePath: { eq: "pages/inventory-marketplace/inventory_entertainment_media.png" }) {
				...imgH88
			}
			finances: file(relativePath: { eq: "pages/inventory-marketplace/inventory_finances.png" }) {
				...imgH88
			}
			healthcarePharma: file(relativePath: { eq: "pages/inventory-marketplace/inventory_healthcare_pharma.png" }) {
				...imgH88
			}
			cpg: file(relativePath: { eq: "pages/inventory-marketplace/inventory_cpg.png" }) {
				...imgH88
			}
			qsr: file(relativePath: { eq: "pages/inventory-marketplace/inventory_qsr.png" }) {
				...imgH88
			}
			retail: file(relativePath: { eq: "pages/inventory-marketplace/inventory_retail.png" }) {
				...imgH88
			}
			sportsBetting: file(relativePath: { eq: "pages/inventory-marketplace/inventory_sports_betting.png" }) {
				...imgH88
			}
			telco: file(relativePath: { eq: "pages/inventory-marketplace/inventory_telco.png" }) {
				...imgH88
			}
			travelTourism: file(relativePath: { eq: "pages/inventory-marketplace/inventory_travel.png" }) {
				...imgH88
			}
		}
	`);

	const { inventories } = T.texts;

	useEffect(() => {
		setShuffledInventories(shuffle(inventories));
	}, [inventories]);

	if (shuffledInventories.length > 0) {
		return (
			<Orbit className="inventory_explore mb-20">
				{shuffledInventories.map((inventory, k) => (
					<InventoryCard image={data[inventory].childImageSharp.gatsbyImageData} inventory={inventory} key={k} />
				))}
			</Orbit>
		);
	}

	return (
		<Container>
			<div className="inventory_explore static flex flex-row flex-wrap justify-content-center mb-20">
				{inventories.map((inventory, k) => (
					<InventoryCard image={data[inventory].childImageSharp.gatsbyImageData} inventory={inventory} className="mb-10" key={k} />
				))}
			</div>
		</Container>
	);
}
