import React, { /* useEffect, */ useState } from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Collapse from "@components/Collapse";
import Layout from "@components/layout";
import { Element, scroller } from "react-scroll";
import PageLoading from "@components/PageLoading";
import Tank from "@components/Tank";

import "@sass/pages/privacy.scss";

export default function PrivacyPolicy({ pageContext: { l, dicoPath }, location: { pathname, hash } }) {
	const [openCookiePolicy, setOpenCookiePolicy] = useState(false);

	useDico(l, dicoPath);

	const { sections } = T.texts;

	/* useEffect(() => {
		if (hash.includes("cookies")) {
			setOpenCookiePolicy(true);
			scroller.scrollTo("info_we_collect", {
				duration: 1000,
				delay: 100,
				smooth: true,
				offset: -120, // Scrolls to element + 50 pixels down the page
			});
		}
	}, [hash]); */

	return (
		<Layout id="security_statement" className="privacy_policy">
			<Tank>
				<h1>{T.translate("title")}</h1>
				<p>{T.translate("intro")}</p>
			</Tank>
			<Tank>
				<React.Suspense fallback={<PageLoading />}>
					{sections.map((section) => (
						<Collapse title={section.title} active={openCookiePolicy} key={section.id}>
							<Element name={section.id}>
								<p>{section.par}</p>
							</Element>
						</Collapse>
					))}
				</React.Suspense>
			</Tank>
		</Layout>
	);
}
