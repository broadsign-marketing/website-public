import React, { useCallback, useEffect, useMemo, useState, MutableRefObject } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useL } from "@hooks/useDico";
import clsx from "clsx";

import CTA from "./CTA";
import FundedBillboards from "@components/FundedBillboards";

import "@sass/components/DOOHMoreBanner.scss";

export default function DOOHMoreBanner({ className }) {
	const data = useStaticQuery(graphql`
		query {
			billboard_01: file(relativePath: { eq: "pages/dooh-more/hero_billboard_01.jpg" }) {
				...img
			}
			billboard_02: file(relativePath: { eq: "pages/dooh-more/hero_billboard_02.jpg" }) {
				...img
			}
			billboard_03: file(relativePath: { eq: "pages/dooh-more/hero_billboard_03.jpg" }) {
				...img
			}
			billboard_04: file(relativePath: { eq: "pages/dooh-more/hero_billboard_04.jpg" }) {
				...img
			}
			billboard_05: file(relativePath: { eq: "pages/dooh-more/hero_billboard_05.jpg" }) {
				...img
			}
		}
	`);

	const l = useL();

	const { title, par, cta, to } = useMemo(() => {
		return {
			en: {
				title: "Want to sell 10% more campaigns?",
				par: "Media owners using Broadsign’s flexible selling tools sell on average 10% more campaigns, resulting in billions more impressions sold.",
				cta: "Learn more",
				to: "doohMore",
			},
		}[l];
	}, [l]);

	return (
		<div className={clsx("DOOHMoreBanner rounded-xl", className)}>
			<div className="grid">
				<div className="col-12 sm:col-6 sm:flex-order-2 md:col-7">
					<FundedBillboards
						images={[
							data.billboard_01.childImageSharp.gatsbyImageData,
							data.billboard_02.childImageSharp.gatsbyImageData,
							data.billboard_03.childImageSharp.gatsbyImageData,
							data.billboard_04.childImageSharp.gatsbyImageData,
							data.billboard_05.childImageSharp.gatsbyImageData,
						]}
					/>
				</div>
				<div className="col-12 sm:col-6 sm:flex-order-1 md:col-5">
					<div className="p-6 md:px-10 md:py-8">
						<h2 className="text-gradient text-28 text-transform-none line-height-140 mb-6 sm:text-34">{title}</h2>
						<p className="text-ash line-height-160 mb-6">{par}</p>
						<CTA className="primary" to={to}>
							{cta}
						</CTA>
					</div>
				</div>
			</div>
		</div>
	);
}
