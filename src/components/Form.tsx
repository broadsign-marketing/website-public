import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useL } from "@hooks/useDico";
import { getTranslations, iMatch, sanitizePath, strIs, cypher } from "@annex";

import clsx from "clsx";
import cookie from "react-cookies";

import HubSpotForm from "react-hubspot-form";
import Loading from "@components/Loading";

import "@sass/components/Form.scss";

import type { Locale, TranslationObj } from "@types";

type FormProps = {
	form: string;
	bg?: string;
	className?: string;
	campaign?: string;
	hidePlaceholders?: boolean;
	onReady?: false | Function;
	onBeforeSubmit?: false | Function;
	onSubmit?: false | Function;
	origin?: string;
	redirectUrl?: string;
	submitText?: string;
	thankYouMessage?: string;
	killHubspotSubmitActions?: boolean;
	uid?: string;
};

export function getFormID(formId: string = "") {
	const formIDs = require("../assets/hubspot_forms.json");

	if (formId) {
		if (strIs(formId, "formID")) {
			return formId;
		}

		if (formIDs[formId]) {
			return formIDs[formId];
		}
	}

	if (formId.match(/form/)) {
		console.error(
			`formId seems to lack a translation (${formId}) in /components/Form.js. Either verify that the ID is correct, or it might be worth trying a hard rebuild of the site if the translation files have failed to update.`
		);

		return "";
	}

	console.error(`Cannot find form id ${formId}`);
	return "";
}

export function NoContextForm({
	form,
	className = "",
	bg = "light",
	campaign = "",
	hidePlaceholders = false,
	onReady = false,
	onBeforeSubmit = false,
	onSubmit = false,
	origin = "https://broadsign.com",
	redirectUrl = "",
	submitText = "",
	thankYouMessage = "",
	killHubspotSubmitActions = false,
	standardizeLabels = true,
	uid = "1",
}: FormProps) {
	const [loaded, setLoaded] = useState<boolean>(false);

	const debug = process.env.DEBUG_FORMS === "true" ? true : false;

	// Special : Chinese language code has to be zh-cn for Hubspot.
	let l: Locale = useL();
	if (l === "zh") l = "zh-cn";

	function getFormRedirectURL(origin, path) {
		if (path.startsWith("https")) {
			return sanitizePath(path);
		}

		return sanitizePath(origin + path);
	}

	const getFormSFCampaign = useCallback((formId = "") => {
		const campaignIDs = require("../assets/salesforce_campaigns.json");
		if (campaignIDs?.[formId] && strIs(campaignIDs[formId], "sfCampaignID")) {
			return campaignIDs[formId];
		}

		return "";
	}, []);

	const translations: TranslationObj = useMemo(() => {
		if (!standardizeLabels) return {};

		const fetchDico = getTranslations("global/Forms");

		if (submitText !== "") {
			fetchDico.submitText = submitText;
		}

		if (fetchDico[l]) {
			return { [l]: { ...fetchDico[l], submitText } };
		}

		return { [l]: { ...fetchDico.en, submitText } };
	}, [l, standardizeLabels, submitText]);

	const formId = getFormID(form);

	const sfCampaignId = useMemo(() => {
		if (campaign === "") {
			return getFormSFCampaign(form);
		}

		if (strIs(campaign, "sfCampaignID")) {
			return campaign;
		}

		return getFormSFCampaign(campaign);
	}, [form, campaign, getFormSFCampaign]);

	const wrapperID = `form-wrapper-${formId}-${uid}`;

	const redirect = useMemo(() => {
		if (killHubspotSubmitActions || redirectUrl === "unset" || thankYouMessage !== "") {
			return null;
		}

		if (!onSubmit && redirectUrl !== "") {
			return getFormRedirectURL(origin, redirectUrl);
		}

		return null;
	}, [killHubspotSubmitActions, redirectUrl, thankYouMessage, onSubmit, origin]);

	const applyGlossary = useCallback(
		(translations: TranslationObj) => {
			const t: any = translations[l];

			if (!t?.glossary || !standardizeLabels) {
				return;
			}

			const labels = document.querySelectorAll(`#${wrapperID} label`);
			const options = document.querySelectorAll(`#${wrapperID} option`);
			const inputs = document.querySelectorAll(`#${wrapperID} input, #${wrapperID} textarea`);
			const languageField: HTMLInputElement | null = document.querySelector(`#${wrapperID} input[name='language']`);

			if (languageField) {
				languageField.dispatchEvent(new Event("input", { bubbles: true }));
				languageField.value = t.localeName;
			}

			for (const v of Object.entries(t.glossary)) {
				const from = v[0];
				const to = v[1];

				for (const label of labels) {
					if (iMatch(label.innerText, from, true)) {
						label.innerText = to;
					}
				}

				for (const option of options) {
					if (iMatch(option.textContent, from, true)) {
						option.textContent = to;
					}
				}

				for (const input of inputs) {
					if (iMatch(input.placeholder, from, true)) {
						input.placeholder = to;
					}
				}
			}
		},
		[l, standardizeLabels, wrapperID]
	);

	const formatThankYouMessage = useCallback(
		(messageId: string) => {
			function wrapper(content) {
				if (!Array.isArray(content)) {
					throw new Error(
						`Form Component, function formatThankYouMessage(), sub-function wrapper() : content "${content}" should be an array of "paragraphs".`
					);
				}

				let out = "";
				content.forEach((par) => {
					out += `<p class="${par.class}">${par.text}</p>`;
				});
				out += "";

				return `<div class="Form__ThankYouMessage thank_you_msg variant_${messageId} theme_lekevoid">${out}</div>`;
			}

			const t: any = translations[l];

			if (messageId === "unset" || killHubspotSubmitActions) {
				return "&nbsp;";
			}

			if (!messageId || !t?.thankYouMessages) {
				return undefined;
			}

			if (!t.thankYouMessages[messageId]) {
				throw new Error(`Form Component, function formatThankYouMessage() : messageId "${messageId}" doesn't exist in this locale (${l})`);
			}

			return wrapper(t.thankYouMessages[messageId]);
		},
		[l, translations, killHubspotSubmitActions]
	);

	const tyMsg = formatThankYouMessage(thankYouMessage);

	const formatSubmitBtnText = useCallback(
		(btnText) => {
			if (!standardizeLabels) return;

			if (!btnText) {
				throw new Error("Form Component, function formatSubmitBtnText() : btnText isn't set.");
			}

			const t: any = translations[l];

			const searchKey = btnText.toLowerCase();

			for (const key in t.submits) {
				if (key.toLowerCase() === searchKey) {
					return t.submits[key];
				}
			}

			throw new Error(`Form Component, function formatSubmitBtnText() : submit button text "${btnText}" doesn't exist in this locale (${l})`);
		},
		[l, standardizeLabels, translations]
	);

	const prepopulateFields = useCallback(() => {
		function ppFirstFormSubmitUrl() {
			const target = document.querySelector("input[name='first_form_submit_url']");
			const url = window.location.origin + window.location.pathname;

			if (!target || !url) return;

			target.value = url;
			target.dispatchEvent(new Event("input", { bubbles: true }));
		}

		// first_form_submit_url
		ppFirstFormSubmitUrl();
	}, []);

	const submitBtnText = submitText ? formatSubmitBtnText(submitText) : formatSubmitBtnText("default");

	if (submitBtnText) {
		translations[l].submitText = submitBtnText;
	}

	const handleReady = useCallback(() => {
		setLoaded(true);

		if (translations?.[l]) applyGlossary(translations);

		prepopulateFields();

		if (onReady) onReady();
	}, [onReady, applyGlossary, l, translations]);

	/* const handleHashedEmail = useCallback((formData) => {
		const email = formData.find((el) => el.name === "email").value;
		let hashedEmail = cypher(email);

		if (!hashedEmail) {
			hashedEmail = cookie.load("visitor_hashed_email");
		}

		if (!hashedEmail) return;

		function doCookie() {
			const expires = new Date();
			expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 365);
			cookie.save("visitor_hashed_email", true, { path: "/", expires, maxAge: 32000000 });
		}

		function doDataLayer() {
			dataLayer.push({ event: "set_hashed_email", visitor_hashed_email: hashedEmail });
		}

		function doVWO() {
			window.VWO = window.VWO || [];
			VWO.visitor =
				VWO.visitor ||
				function () {
					VWO.push(["visitor"].concat([].slice.call(arguments)));
				};
			VWO.visitor({ hashedemail: hashedEmail });
		}

		function doHockeyStack() {
			window.HockeyStack = window.HockeyStack || false;
			if (typeof HockeyStack === "undefined" || HockeyStack === false) return;
			HockeyStack.identify(email, { hashedEmail: hashedEmail });
		}

		doCookie();
		doDataLayer();
		// doHockeyStack();
		doVWO();
	}, []); */

	const handleDefaultBeforeSubmit = useCallback((formData) => {
		// This is run always, regardless of whether there's an onBeforeSubmit argument provided
		// handleHashedEmail(formData);
	}, []);

	const handleAfterSubmit = useCallback(
		({ formId }) => {
			function setCookieForSubmittingForm(formId) {
				const expires = new Date();
				expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 365);
				cookie.save("submitted-form-" + formId, true, { path: "/", expires, maxAge: 32000000 });
			}

			try {
				setCookieForSubmittingForm(formId);

				if (onSubmit) {
					onSubmit();
				}
			} catch (e) {
				throw new Error("Form Component, function onAfterSubmit() : ", e);
			}
		},
		[onSubmit]
	);

	useEffect(() => {
		window.dataLayer = window.dataLayer || [];
	}, []);

	if (formId === "") {
		throw new Error("Form Component : formId is required.");
	}

	const hsFormProps = {
		portalId: "297064",
		formId: formId,
		target: `#${wrapperID}`,
		formInstanceId: uid,
		sfdcCampaignId: sfCampaignId !== "" ? sfCampaignId : undefined,
		onReady: () => {
			handleReady();
		},
		onBeforeFormSubmit: ($form, submissionValues) => {
			if (submissionValues) handleDefaultBeforeSubmit(submissionValues);
			if (onBeforeSubmit) onBeforeSubmit();
		},
		onFormSubmitted: () => {
			handleAfterSubmit({ formId });
		},
		onSubmit: () => {
			// Only including because the module requires it.
			return;
		},
		redirectUrl: redirect,
		inlineMessage: tyMsg,
		locale: l,
		translations,
	};

	if (debug) {
		console.debug(hsFormProps);
	}

	return (
		<div
			id={wrapperID}
			className={clsx("Form", className, { loaded: loaded, hide_placeholders: hidePlaceholders }, bg && `bg_${bg}`)}
			data-form-id={debug ? formId : ""}
			data-campaign-id={debug ? sfCampaignId : ""}
			data-redirect-url={debug ? redirect : ""}
			data-thank-you-msg={debug ? tyMsg : ""}
			data-locale={l}>
			<Loading />
			<HubSpotForm {...hsFormProps} />
		</div>
	);
}

export default function Form({
	form,
	className = "",
	bg = "light",
	campaign = "",
	hidePlaceholders = false,
	onReady = false,
	onBeforeSubmit = false,
	onSubmit = false,
	origin = "",
	redirectUrl = "",
	submitText = "",
	thankYouMessage = "",
	killHubspotSubmitActions = false,
	standardizeLabels = true,
	uid = "1",
}: FormProps) {
	const data = useStaticQuery(graphql`
		query formComponentQuery {
			site {
				siteMetadata {
					siteUrl
				}
			}
		}
	`);

	return (
		<NoContextForm
			form={form}
			className={className}
			bg={bg}
			campaign={campaign}
			hidePlaceholders={hidePlaceholders}
			onReady={onReady}
			onBeforeSubmit={onBeforeSubmit}
			onSubmit={onSubmit}
			origin={origin || data.site.siteMetadata.siteUrl}
			redirectUrl={redirectUrl}
			submitText={submitText}
			thankYouMessage={thankYouMessage}
			killHubspotSubmitActions={killHubspotSubmitActions}
			standardizeLabels={standardizeLabels}
			uid={uid}
		/>
	);
}
