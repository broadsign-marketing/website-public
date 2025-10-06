import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { scroller } from "react-scroll";

import Container from "@components/Container";
import Layout from "@components/layout";

const EN = lazy(() => import("@partials/privacy-policy__en"));
const FR = lazy(() => import("@partials/privacy-policy__fr"));
const ES = lazy(() => import("@partials/privacy-policy__es"));
const DE = lazy(() => import("@partials/privacy-policy__de"));

import "@sass/pages/privacy.scss";

export default function PrivacyPolicy({ pageContext: { l, dicoPath }, location: { hash } }) {
	useDico(l, dicoPath);

	const scrollTo = useCallback((anchor) => {
		const scrollOptions = {
			duration: 1000,
			delay: 100,
			smooth: true,
			offset: -120, // Scrolls to element + 50 pixels down the page
		};

		scroller.scrollTo(anchor, scrollOptions);

		setTimeout(() => {
			if (typeof window !== "undefined") {
				const newUrl = window.location.origin + window.location.pathname + "#" + anchor;
				window.location.replace(newUrl);
			}
		}, 1000);
	}, []);

	/* useEffect(() => {
		const scrollOptions = {
			duration: 1000,
			delay: 100,
			smooth: true,
			offset: -120, // Scrolls to element + 50 pixels down the page
		};
	}, [hash]); */

	return (
		<Layout id="privacy" className="privacy_policy">
			<Container>
				<h1 className="block font-superbold line-height-100 mb-10 w-full text-center">{T.translate("hero.title")}</h1>
				{l === "en" && (
					<Suspense>
						<EN hash={hash} scrollTo={scrollTo} />
					</Suspense>
				)}
				{l === "fr" && (
					<Suspense>
						<FR hash={hash} scrollTo={scrollTo} />
					</Suspense>
				)}
				{l === "es" && (
					<Suspense>
						<ES hash={hash} scrollTo={scrollTo} />
					</Suspense>
				)}
				{l === "de" && (
					<Suspense>
						<DE hash={hash} scrollTo={scrollTo} />
					</Suspense>
				)}
			</Container>
		</Layout>
	);
}
