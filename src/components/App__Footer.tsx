import React, { useCallback, useMemo } from "react";
import { useLocation } from "@reach/router";
import T from "i18n-react";
import clsx from "clsx";
import { useL } from "@hooks/useDico";
import { useScreen } from "@hooks/useScreen";
import { getTranslations } from "@assets/annex";

import Collapse from "@components/Collapse";
import Container from "@components/Container";
import LangSelector from "@components/LangSelector";
import Link from "@components/LocalizedLink";

import icon_languages from "@img/nav/icon_languages.svg";
import logo_youtube from "@img/nav/footer_social_youtube.svg";
import logo_linkedin from "@img/nav/footer_social_linkedin.svg";
import logo_x from "@img/nav/footer_social_x.svg";

import "@sass/components/Footer.scss";

function MobileFooter({ sections }) {
	return (
		<div className="mobile_footer flex flex-column flex-nowrap">
			{sections.map(({ id, label, links }) => (
				<Collapse title={label} key={id}>
					<ul>
						{links.map(({ id, to, label }, k) => (
							<li id={id || null} key={`${to}-${k}`}>
								<Link to={to}>{label}</Link>
							</li>
						))}
					</ul>
				</Collapse>
			))}
		</div>
	);
}

function DesktopFooter({ sections }) {
	const extraColumns = sections.length % 4 === 0 ? [] : Array.from({ length: 4 - (sections.length % 4) }, (_, index) => index + 1);

	return (
		<div className="desktop_footer grid z-1">
			{sections.map(({ id, label, links }) => (
				<div className={clsx("section flex flex-column flex-nowrap align-items-start", id)} key={id}>
					<h3>{label}</h3>
					<ul aria-labelledby={label}>
						{links.map((el, k) => (
							<li id={el?.id || null} key={`${el.to}-${k}`}>
								<Link to={el.to} className="">
									{el.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
			{extraColumns.map((num) => (
				<div className="section" key={`extra_col_${num}`}></div>
			))}
		</div>
	);
}

export default function Footer() {
	const l = useL();
	const __ = getTranslations(`${l}/components/Footer`) || [];
	const { sections, privacy } = __;

	const isMobile = useScreen() === "xs" ? true : false;

	if (!["en", "fr", "es", "de", "ja", "zh"].includes(l)) {
		return null;
	}

	const { pathname } = useLocation();

	const openCookieBanner = useCallback(() => {
		OneTrust.ToggleInfoDisplay();
	}, []);

	const variation = useMemo(() => {
		if (["/retail-digital-signage/"].includes(pathname)) return "retail";
		return "default";
	}, [pathname]);

	return (
		<footer className={clsx("Footer", { variation_retail: variation === "retail" })} data-lang={l}>
			<Container tag="nav" className="footer_nav">
				{isMobile ? <MobileFooter sections={sections} /> : <DesktopFooter sections={sections} />}
				<div className="footer_social flex flex-wrap justify-content-between sm:flex-nowrap pb-4 sm:py-4 z-2">
					<div className="lang flex ml-0 mr-5">
						<img className="mr-1" src={icon_languages} alt="" />
						<LangSelector />
					</div>
					<div className="social flex ml-auto mr-0 sm:ml-0 sm:mr-auto">
						<div className="logos">
							<Link className="logo_link" to="https://www.youtube.com/c/Broadsignofficial">
								<img className="logo youtube" src={logo_youtube} alt="Youtube" title={__.social.youtube.title} height="20" width="20" />
							</Link>
							<Link className="logo_link" to="https://twitter.com/Broadsign">
								<img className="logo x" src={logo_x} alt="x" title={__.social.x.title} height="20" width="20" />
							</Link>
							<Link className="logo_link" to="https://www.linkedin.com/company/broadsign/">
								<img className="logo linkedin" src={logo_linkedin} alt="LinkedIn" title={__.social.linkedin.title} height="20" width="20" />
							</Link>
						</div>
					</div>
					<div className="policies flex w-full sm:w-auto sm:mr-0 sm:ml-auto">
						{privacy &&
							privacy.map(({ label, to }) => (
								<Link className="text-12 pr-6 sm:pr-0 sm:pl-6" to={to} key={to}>
									{label}
								</Link>
							))}
						<button id="cookie_link" className="div text-ash text-12 pr-6 sm:pr-0 sm:pl-6 hover:text-cerulean" onClick={openCookieBanner}>
							{__.cookiePreferences}
						</button>
					</div>
				</div>
			</Container>
		</footer>
	);
}
