import React, { memo, useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import T from "i18n-react";
import clsx from "clsx";
import { useDicoNamespace, useL } from "@hooks/useDico";
import { loopTo } from "@annex";

import CTA from "@components/CTA";
import { GatsbyImage as Img } from "gatsby-plugin-image";

import "@sass/components/HomeInventoryRotate.scss";

const InventoryCard = memo(({ type, image, to, label, className }) => {
	if (type === "city") {
		return (
			<div className={clsx("card type_city pt-2 px-8 pb-4", className)}>
				<Img className="bg" image={image} alt="" />
				<label className="text-white font-bold text-center line-height-120 m-0 z-2 sm:text-16">{label}</label>
			</div>
		);
	}

	return (
		<div className={clsx("card type_vertical justify-content-between pt-2 px-8 pb-4", className)}>
			<Img className="mb-3 rounded-xl" image={image} alt="" />
			<label className="text-reflex font-bold text-center line-height-120 m-0 sm:text-16">{label}</label>
		</div>
	);
});

function InventoryCarousel() {
	const [currentItem, setCurrentItem] = useState(0);

	const data = useStaticQuery(graphql`
		query InventoryCarousel {
			retail: file(relativePath: { eq: "pages/inventory-marketplace/inventory_retail.png" }) {
				...img
			}
			vancouver: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_vancouver.jpg" }) {
				...img
			}
			finances: file(relativePath: { eq: "pages/inventory-marketplace/inventory_finances.png" }) {
				...img
			}
			new_york_city: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_new_york_city.jpg" }) {
				...img
			}
			beauty_wellness: file(relativePath: { eq: "pages/inventory-marketplace/inventory_beauty_wellness.png" }) {
				...img
			}
			los_angeles: file(relativePath: { eq: "pages/inventory-marketplace/city_based/explore_los_angeles.jpg" }) {
				...img
			}
		}
	`);

	const inventories = T.texts.inventoryRotate.list;

	const sizes = ["big", "medium", "small"];

	useEffect(() => {
		const interval = setInterval(() => setCurrentItem(loopTo("next", currentItem, inventories.length)), 2200);
		return () => clearInterval(interval);
	}, [currentItem, inventories.length]);

	return (
		<div className="inventory_carousel">
			{inventories.map((list, j) => (
				<div className={clsx("card_wrapper", { active: currentItem === j })} key={j}>
					{list.map(({ id, type, label }, k) => {
						const image = data[id].childImageSharp.gatsbyImageData;
						return <InventoryCard className={sizes[k]} type={type} label={label} image={image} key={id} />;
					})}
				</div>
			))}
		</div>
	);
}

const Home__Inventory_Rotate = memo(() => {
	return (
		<div className={clsx("Home_Inventory_Rotate", "bg-zircon rounded-xl p-6 sm:p-10")}>
			<div className="grid">
				<div className="col-12 flex flex-center z-2 sm:col-6">
					<InventoryCarousel />
				</div>
				<div className="col-12 flex flex-column align-items-start justify-content-center z-1 sm:col-6 sm:pl-4">
					<h2 className="text-24 text-transform-none mb-6">{T.translate("inventoryRotate.title")}</h2>
					<p className="text-reflex mb-8">{T.translate("inventoryRotate.blurb")}</p>
					<CTA preset="primary" hoverPreset="full-cerulean" className="wrap" to="inventoryMarketplace">
						{T.translate("inventoryRotate.cta")}
					</CTA>
				</div>
			</div>
		</div>
	);
});

export default Home__Inventory_Rotate;
