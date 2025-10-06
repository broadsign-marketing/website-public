import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import T from "i18n-react";
import { isScreenUnder, useScroll } from "@hooks/useScreen";
import clsx from "clsx";
import cookie from "react-cookies";
import { routeWithUtmForm } from "@route";

import CTA from "@components/CTA";
import Form, { getFormID } from "@components/Form";
import Modal from "@components/Modal";

function fadeOutAfterSubmit(shownFormId) {
	if (typeof document !== "undefined") {
		const boxWrapper = document.querySelector(".cta_box_wrapper");
		const hiddenForm = document.querySelector(shownFormId === "form_uid_2" ? ".form_uid_1" : ".form_uid_2");

		if (hiddenForm) {
			hiddenForm.parentNode.classList.add("hide_after_submit");
		}

		setTimeout(() => {
			if (boxWrapper) {
				boxWrapper.classList.add("opacity-0");
			}
		}, 4000);
	}
}

const CTABoxStickyWrapper = memo(function CTABoxStickyWrapper({ className, relativeBox, fixedBox }) {
	const scroll = useScroll();
	const wrapperRef = useRef(null);
	const innerRefSticky = useRef(null);
	const innerRefRelative = useRef(null);
	const screenIsSmOrSmaller = isScreenUnder("sm");

	useEffect(() => {
		const innerRefRelativeBox = innerRefRelative.current.getBoundingClientRect();

		if (innerRefRelativeBox.top < 240 && innerRefRelativeBox.top !== 0) {
			innerRefSticky.current.classList.add("opacity-0");
			innerRefRelative.current.classList.remove("opacity-0");
		} else {
			innerRefSticky.current.classList.remove("opacity-0");
			innerRefRelative.current.classList.add("opacity-0");
		}
	}, [scroll, wrapperRef, screenIsSmOrSmaller]);

	return (
		<div className="cta_box_wrapper" ref={wrapperRef}>
			<div className={clsx("CTABox", className, "fixed")} ref={innerRefSticky}>
				{fixedBox}
			</div>
			<div className={clsx("CTABox", className)} ref={innerRefRelative}>
				{relativeBox}
			</div>
		</div>
	);
});

function CTABoxTitle({ text, color = "white" }) {
	return <p className={clsx("text-h5 font-bold line-height-140", `text-${color}`)}>{text}</p>;
}

function CTABoxPar({ text, color = "white" }) {
	return <p className={clsx("line-height-140 mb-8", `text-${color}`)}>{text}</p>;
}

function CTABoxTagline({ text, color = "white" }) {
	return <p className={clsx("text-h5 font-bold line-height-140", `text-${color}`)}>{text}</p>;
}

const ReflexCTABox__InlineForm = memo(function ReflexCTABox__InlineForm({ text: { title, par, tagline }, form }) {
	const BoxElement = memo(({ formUid }) => {
		return (
			<>
				{title && <CTABoxTitle text={title} />}
				{par && <CTABoxPar text={par} />}
				{tagline && <CTABoxTagline text={tagline} />}
				{!title && !par && !tagline && <CTABoxTagline text={T.translate("ctaBox.newsletter.tagline")} />}
				<Form
					form={form}
					className={`form_uid_${formUid}`}
					bg="dark"
					uid={formUid}
					submitText="Subscribe Now"
					thankYouMessage={form}
					onSubmit={() => fadeOutAfterSubmit(`form_uid_${formUid}`)}
				/>
			</>
		);
	});

	return <CTABoxStickyWrapper className="bg-reflex p-6 rounded-xl" relativeBox={<BoxElement formUid="1" />} fixedBox={<BoxElement formUid="2" />} />;
});

const ReflexCTABox__ModalForm = memo(function ReflexCTABox__ModalForm({ type, text }) {
	const [showModal, setShowModal] = useState(false);

	if (!text) {
		return null;
	}

	const { title, par, tagline, cta } = text;

	const BoxElement = memo(() => {
		return (
			<>
				{title && <CTABoxTitle text={title} />}
				{par && <CTABoxPar text={par} />}
				{tagline && <CTABoxTagline text={tagline} />}
				{!title && !par && !tagline && <CTABoxTagline text={T.translate("ctaBox.bookCallPlatform.tagline")} />}
				{cta && (
					<CTA onClick={() => setShowModal(true)} className="primary border-white hover:border-cerulean">
						{cta}
					</CTA>
				)}
			</>
		);
	});

	const form =
		{
			"ad-server": { id: "bookACall", header: cta, utm: "book_a_call_blog" },
			"audience-campaigns": { id: "bookACall", header: tagline, utm: "book_a_call_blog" },
			"dooh-more-platform": { id: "bookACall", header: cta, utm: "book_a_call_blog" },
			"book-a-call-programmatic": { id: "bookACallMediaBuyers", header: cta, utm: "book_a_call_blog" },
			"free-trial": { id: "freeTrial", header: cta, utm: "free_trial" },
			newsletter: { id: "newsletter", header: cta, utm: "newsletter" },
			"platform-deep-dive": { id: "bookACall", header: cta, utm: "book_a_call_blog" },
		}[type] || false;

	return (
		<>
			<CTABoxStickyWrapper className="bg-reflex p-6 rounded-xl" relativeBox={<BoxElement></BoxElement>} fixedBox={<BoxElement></BoxElement>} />
			{showModal && (
				<Modal variant="form" className="theme_carolina" onClose={() => setShowModal(false)}>
					{form.header && <h3 className="h4 text-reflex mb-8">{form.header}</h3>}
					{form.utm && <Form form={form.id} redirectUrl={routeWithUtmForm("thankYou", form.utm)} />}
					{!form.utm && <Form form={form.id} />}
				</Modal>
			)}
		</>
	);
});

const ReflexCTABox__Link = memo(function ReflexCTABox__Link({ type, text }) {
	const { title, par, tagline, cta } = text;

	const BoxElement = memo(() => {
		return (
			<>
				{title && <CTABoxTitle text={title} />}
				{par && <CTABoxPar text={par} />}
				{tagline && <CTABoxTagline text={tagline} />}
				{cta && (
					<CTA to={to} className="primary border-white hover:border-cerulean">
						{cta}
					</CTA>
				)}
			</>
		);
	});

	const to =
		{
			"dooh-more-platform": "doohMore",
			"static-report": "stateOfStaticOOHReport",
		}[type] || false;

	if (!to) {
		return null;
	}

	return (
		<>
			<CTABoxStickyWrapper className="bg-reflex p-6 rounded-xl" relativeBox={<BoxElement></BoxElement>} fixedBox={<BoxElement></BoxElement>} />
		</>
	);
});

const BlogCTABox = memo(function BlogCTABox({ postId, tags }) {
	const [hasSubmittedNewsletter, setHasSubmittedNewsletter] = useState(false);

	const { isAboutBroadsignPlatform, isAboutProgrammatic } = tags;

	const type = useMemo(() => {
		switch (postId) {
			//// Ad Server
			case 41077: // EN
			case 41094: // FR
			case 41100: // ES
			case 41097: // DE
				return "ad-server";
			//// Broadsign Platform Deep Dive
			case 40329: // EN
				return "platform-deep-dive";
			//// Audience Campaigns
			case 41394: // EN
			case 42158: // FR
				return "audience-campaigns";
			//// Static Campaigns
			case 41183: // EN
			case 41209: // FR
			case 41214: // ES
			case 41330: // DE
				return "free-trial";
			//// State of Static OOH Report
			case 41514: // What to look for, EN
			case 41798: // Spotlight on static, EN
			case 42069: // Joe's post on Static, EN
			case 42135: // Sneak Peek, EN
				return "static-report";
		}

		if (isAboutBroadsignPlatform) {
			return "dooh-more-platform";
		}

		if (isAboutProgrammatic) {
			return "book-a-call-programmatic";
		}

		return "newsletter";
	}, []);

	const newsletterFallbackType = useMemo(() => {
		if (isAboutProgrammatic) {
			return "book-a-call-programmatic";
		}

		return "dooh-more-platform";
	}, []);

	const hasFormBeenSubmitted = useCallback((formName) => {
		const formID = getFormID(formName);
		const formCookie = cookie.load(`submitted-form-${formID}`);
		return !!formCookie;
	}, []);

	if (hasFormBeenSubmitted("newsletter") && !hasSubmittedNewsletter) {
		setHasSubmittedNewsletter(true);
	}

	switch (type) {
		case "newsletter":
			if (!hasSubmittedNewsletter) {
				return <ReflexCTABox__InlineForm text={T.texts.ctaBox[type]} form="newsletter" />;
			}
			return <ReflexCTABox__ModalForm type={newsletterFallbackType} text={T.texts.ctaBox[newsletterFallbackType]} />;
		case "ad-server":
		case "audience-campaigns":
		case "book-a-call-programmatic":
		case "free-trial":
		case "platform-deep-dive":
			return <ReflexCTABox__ModalForm type={type} text={T.texts.ctaBox[type]} />;
		case "dooh-more-platform":
		case "static-report":
			return <ReflexCTABox__Link type={type} text={T.texts.ctaBox[type]} />;
	}

	return null;
});

export default BlogCTABox;
