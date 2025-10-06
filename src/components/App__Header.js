import React, { useCallback, useMemo, useState } from "react";
import T from "i18n-react";
import clsx from "clsx";
import route, { routeWithUtmForm } from "@route";
import { useL } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";
import { useLocation } from "@reach/router";

import CTA from "@components/CTA";
import Link from "@components/LocalizedLink";
import Container from "@components/Container";
import Modal from "@components/Modal";
import DesktopNav from "@components/Nav/DesktopNav";
import MobileNav from "@components/Nav/MobileNav";
import NavReducer from "@components/Nav/NavReducer";

import Form from "@components/Form";
import LangSelector from "@components/LangSelector";

import logo_broadsign from "@img/broadsign/broadsign.svg";
import icon_log_in from "@icons/log_in_cerulean.svg";

import "@sass/components/Header.scss";

const BrandLogo = React.memo(() => {
	return (
		<Link className="branding w-160px" to="index" tabIndex="0">
			<img src={logo_broadsign} alt="Broadsign" title="Broadsign" className="broadsign_logo" width="160" height="70" />
		</Link>
	);
});

const LoginBarLink = React.memo(({ to, children }) => {
	return (
		<Link
			to={to}
			className="log_in_collapse_link flex nowrap align-items-center text-14 text-ash font-bold p-3 pr-4 rounded-8 hover:bg-zircon"
			tabIndex="-1">
			{children}
		</Link>
	);
});

const LoginBar = React.memo(() => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="log_in_bar bg-reflex w-full align-self-start z-5">
			<Container className="flex flex-nowrap align-items-center justify-content-end py-2">
				<div
					className={clsx("log_in_link", { active: isActive })}
					onMouseEnter={() => setIsActive(true)}
					onMouseOver={() => setIsActive(true)}
					onMouseLeave={() => setIsActive(false)}
					onBlur={() => setIsActive(false)}>
					<button className="div flex flex-nowrap align-items-center" onMouseOver={() => setIsActive(true)} tabIndex="-1">
						<img className="log_in_icon" src={icon_log_in} alt="Log in icon" />
						<span className="text-cerulean text-16 ml-2 line-height-100">{T.translate("nav.logIn")}</span>
					</button>
					<div className={clsx("log_in_collapse bg-white absolute flex flex-column overflow-hidden shadow-B rounded-xl px-3")}>
						<LoginBarLink to="https://app.broadsign.com/">{T.translate("nav.broadsignPlatform")}</LoginBarLink>
						<LoginBarLink to="https://console.outmoove.com/auth/login">
							<span>{T.translate("nav.outmooveLogin")}</span>{" "}
						</LoginBarLink>
						<LoginBarLink to="https://broadsign.force.com/">{T.translate("nav.broadsignCommunity")}</LoginBarLink>
					</div>
				</div>
			</Container>
		</div>
	);
});

const ContactUsCTA = React.memo(({ l, openContactUsModal }) => {
	const { pathname } = useLocation();
	const isContactPage = ["/contact/", "/fr/nous-rejoindre/", "/es/contacto/"].includes(pathname);
	const cssClasses = "contact_us primary min-h-0 letter-spacing-0 line-height-100 overflow-visible nowrap px-5 py-2";

	if (l === "pt") {
		return (
			<CTA className={cssClasses} to="contact">
				{T.translate("nav.contactUs")}
			</CTA>
		);
	}

	return (
		<CTA className={cssClasses} onClick={isContactPage ? () => window.scrollTo({ top: 0, behavior: "smooth" }) : openContactUsModal}>
			{T.translate("nav.contactUs")}
		</CTA>
	);
});

export default function Header() {
	const [showContactUsModal, setShowContactUsModal] = useState(false);

	const l = useL();
	const { pathname } = useLocation();

	const utm_form = pathname.match(/request-access/) ? "contact_us_main_nav_broadsign_ads" : "contact_us_main_nav";

	const openContactUsModal = useCallback(() => {
		setShowContactUsModal(true);
	}, []);

	return (
		<header sitetitle="Broadsign" className="Header">
			<NavReducer />
			<LoginBar />
			<Container className="grid flex-nowrap align-items-center justify-content-between my-0 z-2 md:hidden" tabIndex="1">
				<BrandLogo></BrandLogo>
				<MobileNav openContactUsModal={openContactUsModal}></MobileNav>
			</Container>
			<Container className="hidden grid flex-nowrap align-items-center justify-content-between my-0 z-2 md:flex">
				<BrandLogo></BrandLogo>
				<DesktopNav></DesktopNav>
				<LangSelector></LangSelector>
				<ContactUsCTA l={l} openContactUsModal={openContactUsModal} />
			</Container>
			<Modal
				show={showContactUsModal}
				id="contact_us_popup"
				className="contact_us_form submit_teal narrow"
				variant="form"
				onClose={() => setShowContactUsModal(false)}>
				<Form form="contact" redirectUrl={routeWithUtmForm("thankYou", utm_form)} submitText="Get in touch" />
			</Modal>
		</header>
	);
}
