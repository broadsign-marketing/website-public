import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";
import { useFormatDate } from "@hooks/useFormatDate";
import clsx from "clsx";

import Container from "@components/Container";
import CTA from "@components/CTA";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import NeonBox from "@components/NeonBox";

import hero from "@img/pages/subscribe/product_news_hero.svg";
import title_img from "@img/pages/subscribe/community_digest_title.svg";
import email from "@img/pages/subscribe/email.svg";
import gradient_check from "@img/pages/subscribe/check_gradient.svg";
import green_check from "@img/pages/thank-you/check_circle_green.svg";

import "@sass/pages/subscribe.scss";

const DigestCard = memo(({ content, header, onOpenEdition }) => {
	const { title, date, deactivated } = content;

	return (
		<div className={clsx("digest_card h-full rounded-xl overflow-hidden", { deactivated })}>
			<button onClick={() => onOpenEdition()} className="bg div"></button>
			<div className="over flex flex-column flex-nowrap h-full z-5">
				<div className="bg-reflex flex align-items-center p-8 sm:p-4 md:p-8">
					<Img className="w-full" image={header} alt={title} />
				</div>
				<div className="bg-zircon p-8 mb-0 sm:p-4 md:p-8">
					<p className="text-12 text-ash uppercase">{date}</p>
					<h3 className="text-20 text-transform-none">{title}</h3>
				</div>
			</div>
		</div>
	);
});

function SubscribeForm({ className /* , onEmailKeyUp */ }) {
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);
	const [emailAddressState, setEmailAddressState] = useState("unknown");
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	/* const tempEmailField = useRef(null); */

	const handleEmailValidation = useCallback(() => {
		setEmailAddressState("valid");
		setIsFormModalOpen(true);

		/* const simpleEmailField: HTMLInputElement = tempEmailField.current as HTMLInputElement;
		const emailVerified = simpleEmailField.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

		if (emailVerified?.[0]) {
			setEmailAddressState("valid");
			setIsFormModalOpen(true);
		} else {
			setEmailAddressState("invalid");
		} */
	}, []);

	/* const populateEmailField = useCallback(() => {
		setTimeout(() => {
			if (typeof document === "undefined") return;
			const simpleEmailField: HTMLInputElement = tempEmailField.current as HTMLInputElement;
			const hubspotEmailField: HTMLInputElement = document.querySelector("#digest_subscribe_form .hs-input[name='email']") as HTMLInputElement;
			hubspotEmailField.value = simpleEmailField.value;
			hubspotEmailField.dispatchEvent(new Event("input", { bubbles: true }));
		}, 500);
	}, [tempEmailField]); */

	const handleFormSubmit = useCallback(() => {
		setIsFormSubmitted(true);
	}, []);

	return (
		<div className={clsx("email_only_field_wrapper", className /* , { error: emailAddressState === "invalid" } */)}>
			<CTA onClick={handleEmailValidation} className={clsx("send_btn primary z-2")}>
				{T.translate("hero.cta")}
			</CTA>
			{/*
				<div className="subscribe_email_only_field">
					<input
						name="email"
						inputMode="email"
						placeholder={T.translate("form.inputPlaceholder")}
						autoComplete="email"
						className="simple_email text-14 pl-4 z-1"
						type="email"
						onKeyUp={() => {
							onEmailKeyUp(tempEmailField.current.value);
							setEmailAddressState("unknown");
						}}
						onChange={() => setEmailAddressState("unknown")}
						ref={tempEmailField}
					/>
					<CTA onClick={handleEmailValidation} className={clsx("send_btn primary absolute right-0 z-2")}>
						{T.translate("hero.cta")}
					</CTA>
				</div>
				<div className="invalid_email">{T.translate("invalidEmail")}</div>
			*/}
			{isFormModalOpen && (
				<Modal variant="form" id="digest_subscribe_form" onClose={() => setIsFormModalOpen(false)}>
					{isFormSubmitted ? (
						<div className="text-center m-auto">
							<img className="mb-4" src={green_check} alt="" />
							<h3 className="text-24 text-transform-none mb-2">{T.translate("thankYou.title")}</h3>
							<p className="text-ash text-16">{T.translate("thankYou.par")}</p>
						</div>
					) : (
						<>
							<h2 className="text-24 text-transform-none w-full mb-6">{T.translate("form.header")}</h2>
							{/* <Form form="communityDigest" onReady={() => populateEmailField()} onSubmit={handleFormSubmit} /> */}
							<Form form="communityDigest" onSubmit={handleFormSubmit} />
						</>
					)}
				</Modal>
			)}
		</div>
	);
}

export default function SubscribeToProductNews({ pageContext: { l, dicoPath }, data }) {
	const [openEdition, setOpenEdition] = useState(null);
	/* const [tempEmail, setTempEmail] = useState(""); */

	useDico(l, dicoPath);

	const pastEditions = useMemo(
		() =>
			[
				{
					id: 4,
					title: "Edition 4: In-advance automated DOOH transactions, AI creative assistance and Header Bidder Pro for Programmatic SSP, new creative management capabilities.",
					date: "2025-07-02",
					link: "https://marketing.broadsign.com/the-broadsign-community-digest-edition-4",
					headerType: "community_digest",
				},
				{
					id: 3,
					title: "Edition 3: Global availability for Audience Campaigns and additional targeting capabilities for Guaranteed Campaigns.",
					date: "2025-03-27",
					link: "https://marketing.broadsign.com/the-broadsign-community-digest-your-quarterly-round-up-of-broadsign-platform-updates-is-here",
					headerType: "community_digest",
				},
				{
					id: 2,
					title: "Edition 2: Sophisticated targeting, creative management and UI improvements.",
					date: "2024-06-04",
					link: "https://marketing.broadsign.com/your-quarterly-round-up-of-broadsign-platform-updates-is-here",
					headerType: "community_digest",
				},
				{
					id: 1,
					title: "Edition 1: Welcome to the very first edition of the Broadsign Community Digest!",
					date: "2024-03-27",
					link: "https://marketing.broadsign.com/broadsign-community-digest-edition-1",
					headerType: "community_digest",
				},
			].map((e) => ({ ...e, date: useFormatDate({ date: e.date, lang: l }) })),
		[l]
	);

	/* const handleEmailKeyUp = useCallback((newVal) => {
		const emailFields = document.querySelectorAll(".simple_email");

		console.log(newVal);
		for (const field of emailFields) {
			if (field.value !== newVal) field.value = newVal;
		}
	}, []); */

	const included = T.texts.included.items;

	return (
		<Layout id="subscribe_community_digest" className={clsx("theme_carolina", "subscribe")}>
			<Container tag="section" className="hero">
				<div className="grid">
					<div className="col-12 flex justify-content-start sm:col-6 sm:flex-order-2">
						<img className="hero_img" src={hero} alt={T.translate("hero.title")} title={T.translate("hero.title")} />
					</div>
					<div className="col-12 pt-8 pb-16 sm:col-6 sm:flex-order-1 sm:pt-16 sm:pb-25">
						<p className="subtitle-1 gradient font-medium mb-2">{T.translate("hero.overtitle")}</p>
						<h1 className="text-30 text-reflex font-superbold text-transform-none line-height-120 mb-6 sm:text-34">{T.translate("hero.title")}</h1>
						<p className="tagline text-ash text-16 line-height-180 mb-10">{T.translate("hero.blurb")}</p>
						{/* <SubscribeForm onEmailKeyUp={handleEmailKeyUp} /> */}
						<SubscribeForm />
					</div>
				</div>
			</Container>
			<Container tag="section" className="included mb-10">
				<h2 className="text-reflex text-34 text-center text-transform-none line-height-120 mb-10">{T.translate("included.title")}</h2>
				<div className="flex flex-column flex-nowrap  sm:flex-row sm:align-items-center sm:justify-content-between">
					<img className="email_image hidden sm:inline-block" src={email} alt="" />
					<ul>
						{included.map((item, k) => (
							<li className={clsx("included_item block relative")} key={k}>
								<img className="email_image inline-block sm:hidden" src={email} alt="" />
								<NeonBox className="mb-10 sm:mb-4" innerClassName={clsx("text-20 sm:text-24 sm:pl-16")}>
									<img className="check" src={gradient_check} alt="" />
									<h3 className="text-transform-none mb-4">{item.title}</h3>
									<p className="text-16 line-height-180 mb-0">{item.description}</p>
									{item.error && <div className="error">{T.translate("included.error")}</div>}
								</NeonBox>
							</li>
						))}
					</ul>
				</div>
				{/* <SubscribeForm onEmailKeyUp={handleEmailKeyUp} className="mx-auto mt-6" /> */}
				<SubscribeForm className="mx-auto mt-6 mb-20 text-center" />
			</Container>
			<Container tag="section" className="past_editions pb-20">
				<div className="text-center">
					<p className="subtitle-1 gradient font-medium mb-2">{T.translate("pastEditions.overtitle")}</p>
					<h2 className="text-reflex text-34 text-transform-none line-height-120 mb-10">{T.translate("pastEditions.title")}</h2>
				</div>
				<div className="grid align-items-stretch">
					{pastEditions.map((e) => (
						<div className={clsx("col-12 sm:col-4 sm:block", { hidden: e.deactivated })} key={e.id}>
							<DigestCard
								content={e}
								header={data[`${e.headerType}_header`].childImageSharp.gatsbyImageData}
								onOpenEdition={() => setOpenEdition(e)}
							/>
						</div>
					))}
				</div>
			</Container>
			{openEdition?.id && (
				<Modal variant="digest" onClose={() => setOpenEdition(null)}>
					<iframe src={openEdition.link}></iframe>
				</Modal>
			)}
		</Layout>
	);
}

export const querySubscribe = graphql`
	query {
		community_digest_header: file(relativePath: { eq: "pages/subscribe/community_digest_header.png" }) {
			...img
		}
	}
`;
