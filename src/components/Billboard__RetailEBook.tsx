import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useL } from "@hooks/useDico";

import CTA from "@components/CTA";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";

import "@sass/components/Billboard.scss";

export default function BillboardRetailEBook() {
	const l = useL();

	const __ = {
		en: {
			title: "Owning Your In-Store Activation: A Playbook for Scaling In-Store Digital Signage Networks",
			cta: "Read eBook",
		},
	}[l];

	return (
		<Link id="retail_ebook" className="Billboard" to="ebookInStoreActivation">
			<div className="grid">
				<div className="col-12 sm:col-5 md:col-6"></div>
				<div className="col-12 sm:col-7 md:col-6">
					<div className="p-4 sm:py-6 lg:pl-10">
						<p className="banner_title text-reflex text-20 font-bold sm:text-24">{__.title}</p>
						<button className="div CTA text-14 md:text-16">{__.cta}</button>
					</div>
				</div>
			</div>
		</Link>
	);
}
