import React from "react";
import T from "i18n-react";
import { blogPostSlug } from "@annex";

import Container from "@components/Container";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";

import inventory_hero from "@img/pages/inventory-marketplace/hero_anim.svg";

import "@sass/components/EventsHost.scss";

export default function Events__EmptyEventsList({ data, l }) {
	return (
		<Container className="recommended grid text-center my-10 w-full mx-auto sm:my-22">
			<h2 className="h3 text-center">{T.translate("empty.title")}</h2>
			<p className="text-center line-height-180 mb-12">{T.translate("empty.blurb")}</p>
			<hr className="bg-soft my-10" />
			<p className="subtitle-2 gradient font-medium mx-auto">{T.translate("empty.suggested.overtitle")}</p>
			<h3 className="h5 text-center mb-20">{T.translate("empty.suggested.title")}</h3>
			{data.latestPost && (
				<Link className="extra_resource grid mb-20" to={blogPostSlug(data.latestPost.slug, l)}>
					<div className="col-12 sm:col-6 sm:pr-8 md:col-5">
						<Img image={data.latestPost.featuredImage.node.gatsbyImage} className="thumbnail h-full w-full rounded-xl" alt="" />
					</div>
					<div className="col-12 flex flex-column align-items-start justify-content-center text-left sm:col-6 sm:pl-4 md:col-7 md:pl-20">
						<p className="subtitle-2 gradient font-medium">{data.latestPost.date}</p>
						<h4 className="h6">{data.latestPost.title}</h4>
						<div className="CTA span bg-reflex text-white pill text-14 hover:bg-cerulean">{T.translate("ctas.readArticle")}</div>
					</div>
				</Link>
			)}
			<Link className="extra_resource grid" to="inventoryMarketplace">
				<div className="col-12 sm:col-6 sm:pl-8 sm:flex-order-2 md:col-5">
					<img src={inventory_hero} className="thumbnail h-full w-full rounded-xl" alt="" />
				</div>
				<div className="col-12 flex flex-column align-items-start justify-content-center text-left sm:col-6 sm:pr-4 sm:flex-order-1 md:col-7 md:pr-20">
					<p className="subtitle-2 gradient font-medium">{T.translate("empty.suggested.inventoryOvertitle")}</p>
					<h4 className="h6">{T.translate("empty.suggested.inventoryTitle")}</h4>
					<div className="CTA span bg-reflex text-white pill text-14 hover:bg-cerulean">{T.translate("ctas.learnMore")}</div>
				</div>
			</Link>
		</Container>
	);
}
