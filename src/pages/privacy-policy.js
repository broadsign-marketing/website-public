import React, { useEffect, useState } from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Layout from "@components/layout";
import { scroller } from "react-scroll";

import EN from "@partials/privacy-policy__en";
import FR from "@partials/privacy-policy__fr";
import ES from "@partials/privacy-policy__es";
import DE from "@partials/privacy-policy__de";

import "@sass/pages/privacy.scss";

export default function PrivacyPolicy({ pageContext: { l, dicoPath }, location: { hash } }) {
	const [openCookiePolicy, setOpenCookiePolicy] = useState(false);

	useDico(l, dicoPath);

	useEffect(() => {
		if (hash.includes("cookies")) {
			setOpenCookiePolicy(true);
			scroller.scrollTo("info_we_collect", {
				duration: 1000,
				delay: 100,
				smooth: true,
				offset: -120, // Scrolls to element + 50 pixels down the page
			});
		}
	}, [hash]);

	return (
		<Layout id="page_privacy_policy" className="privacy_policy">
			{l === "en" && <EN openCookiePolicy={openCookiePolicy} />}
			{l === "fr" && <FR openCookiePolicy={openCookiePolicy} />}
			{l === "es" && <ES openCookiePolicy={openCookiePolicy} />}
			{l === "de" && <DE openCookiePolicy={openCookiePolicy} />}
		</Layout>
	);
}
