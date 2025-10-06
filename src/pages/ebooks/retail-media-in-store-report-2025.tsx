import React, { useCallback, useEffect, useState } from "react";
import { graphql, navigate } from "gatsby";
import T from "i18n-react";
import cookie from "react-cookies";
import { useDico } from "@hooks/useDico";
import { getFormID } from "@components/Form";
import { getURLParamFromSearch } from "@annex";
import { scrollTo } from "@hooks/useScreen";

import CTA from "@components/CTA";
import { GatsbyImage as Img } from "gatsby-plugin-image";

import Template from "@templates/ebooks";

import type { BroadsignPageProps } from "@types";

export default function EbookRetailMediaInStoreReport2025({ pageContext: { l, dicoPath }, location, data }: BroadsignPageProps) {
	useDico(l, dicoPath);

	const handleScroll = useCallback(() => {
		if (typeof document === "undefined" || typeof window === "undefined") return;

		function setFix(fixedState, formBox) {
			if (fixedState === true) {
				formBox.classList.add("fixed");
				formBox.parentElement.classList.remove("flex", "flex-column", "justify-content-end");
			} else {
				formBox.parentElement.classList.add("flex", "flex-column", "justify-content-end");
				formBox.classList.remove("fixed");
			}
		}

		const formBox = document.querySelector("#form_box");

		const pos = window.scrollY;
		const hero = document.querySelector(".hero");
		const page = document.querySelector("#retail_media_in_store_report_2025");

		const heroTop = hero.getBoundingClientRect().top + 20;
		const pageBottom = page.getBoundingClientRect().bottom;
		const reducedNav = document.querySelector("html")?.getAttribute("data-reduced-nav") === "true";

		if (!formBox || window.innerWidth < 900) {
			formBox.style.top = "";
			return setFix(false, formBox);
		}

		if (pos < heroTop) {
			formBox.style.top = heroTop - 20 + "px";
			setFix(true, formBox);
		} else if (pageBottom < window.innerHeight - 20) {
			return setFix(false, formBox);
		} else {
			formBox.style.top = reducedNav ? "50px" : "80px";
			setFix(true, formBox);
		}
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	return (
		<Template
			location={location}
			hero={
				<>
					<div className="col-12 z-2 sm:col-7">
						<h1 className="text-transform-none">
							{T.texts.hero.title.map((txt, k) => (
								<span className="inline-block bg-white mb-2" key={k}>
									{txt}
								</span>
							))}
						</h1>
					</div>
					<Img image={data[`hero_${l}`].childImageSharp.gatsbyImageData} className="hero_bg absolute z-1" alt="" />
				</>
			}
			description={
				<div className="md:pr-6">
					<p className="inline-block bg-gradient text-white font-medium letter-spacing-10 rounded-full px-8 py-1">{T.translate("intro.overtitle")}</p>
					<h2 className="text-30 text-transform-none mb-8 sm:text-32">
						{T.translate("intro.title.0")}
						<br />
						<u>{T.translate("intro.title.1")}</u>
					</h2>
					<p className="mb-8">{T.translate("intro.par")}</p>
					<p className="text-reflex font-bold mb-8">{T.translate("intro.whatYoullLearn")}</p>
					<ul className="checks_gradient mb-8">
						{T.texts.intro.list.map(({ title, desc }, k) => (
							<li className="flex-column text-18 pt-3 align-items-start" key={k}>
								<span className="header text-20 text-reflex font-medium mb-2 sm:text-24">
									<b>{title}</b>
								</span>
								<span className="desc text-14">{desc}</span>
							</li>
						))}
					</ul>
					<div className="bg-gradient rounded-xl p-6 mb-20 md:px-10 md:mb-0">
						<p className="text-white text-20 font-normal mb-5 md:text-24">
							<b>{T.translate("ctaBox.title")}</b>
						</p>
						<p className="text-white text-14 mb-4">{T.translate("ctaBox.par")}</p>
						<CTA onClick={() => scrollTo("form_box")} preset="white-outline-transparent" hoverPreset="full-cerulean">
							{T.translate("ctaBox.cta")}
						</CTA>
					</div>
				</div>
			}
			formLayoutWidth={4}
			formHeader={T.translate("formHeader")}
			formSubmitText={"Download the Report"}
			onFormReady={handleScroll}
		/>
	);
}

export const queryContact = graphql`
	query {
		hero_en: file(relativePath: { eq: "ebooks/in-store-retail-report-2025-hero.jpg" }) {
			...img
		}
	}
`;
