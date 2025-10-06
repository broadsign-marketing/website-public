import React, { useCallback, useEffect, useRef, useState, MutableRefObject } from "react";
import { navigate } from "gatsby";
import { useL } from "@hooks/useDico";
import clsx from "clsx";
import { getTranslations, iMatch } from "@annex";

import Form from "@components/Form";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";

import "@sass/components/CalendlyForm.scss";

type FormattedSubmitTextProps = {
	hsForm: string;
};
type ShowCalendlyConditionsProps = [string, "isset"] | [string, "eq" | "lt" | "gt" | "lte" | "gte" | "match", string];

type CalendlyFormProps = {
	hsForm: string;
	calendlyFormUrl: string;
	campaign?: string;
	isHubspotFormReady?: boolean;
	onHubspotReady?: false | Function;
	onCalendlyReady?: false | Function;
	onHubspotSubmit?: false | Function;
	onCalendlySubmit?: false | Function;
	showCalendlyConditions?: "show_always" | ShowCalendlyConditionsProps[];
	submitText?: string;
	tyMsg?: string | string[] | HTMLElement | HTMLElement[];
	redirectUrl?: string;
};

function FormattedSubmitText({ hsForm }: FormattedSubmitTextProps) {
	console.log(hsForm);
	const l = useL();
	const __ = getTranslations(`${l}/components/Form__HubspotCalendly`);

	const content = __?.submitTexts?.[hsForm] || __.submitTexts.default;

	return (
		<div className="Form">
			<div className="submitted-message">
				{content.map((line) => (
					<p className={clsx(line?.extraClassNames)} dangerouslySetInnerHTML={{ __html: line.text }} />
				))}
			</div>
		</div>
	);
}

export default function Form__HubspotCalendly({
	hsFormClassName = "",
	hsForm = "",
	calendlyFormUrl = "",
	campaign = "",
	submitActionType = false,
	onHubspotReady = false,
	onCalendlyReady = false,
	onHubspotSubmit = false,
	onCalendlySubmit = false,
	showCalendlyConditions = "show_always",
	submitText = "",
	tyMsg = "",
	redirectUrl = "",
}: CalendlyFormProps) {
	const debug = process.env.DEBUG_FORMS === "true" ? true : false;

	const [trackedFields, setTrackedFields] = useState({});
	const [isHubspotFormSubmitted, setIsHubspotFormSubmitted] = useState(false);
	const [isCalendlyFormSubmitted, setIsCalendlyFormSubmitted] = useState(false);
	const [onSubmitActionType, setOnSubmitActionType] = useState("message");
	const [showCalendlyForm, setShowCalendlyForm] = useState(false);
	const [showSubmitText, setShowSubmitText] = useState(false);

	const selfRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	const killHubspotSubmitActions = tyMsg === "" || redirectUrl === "" ? true : false;

	const verifyShowCalendlyConditions = useCallback((): boolean => {
		if (!selfRef.current || Object.keys(trackedFields).length === 0) {
			return false;
		}

		/**
		 * "show_always" is the default. If showCalendlyConditions is "show_always", then show Calendly always upon Hubspot submission.
		 * If Calendly is not supposed to show at all, why are you using this component ???
		 */
		if (showCalendlyConditions === "show_always") {
			if (debug) {
				console.debug("No conditions set to show the Calendly form. The Calendly form will appear after submitting the Hubspot form no matter what.");
			}

			return true;
		}

		const passTheCheck = showCalendlyConditions.every((condition) => {
			const [fieldName, operation, value] = condition;
			const field = trackedFields.hasOwnProperty(fieldName) ? trackedFields[fieldName] : false;

			if (!field && field !== "") {
				console.error("Form__HubspotCalendly: Field", fieldName, "doesn't exist on form", hsForm, " / ", trackedFields);
				return false;
			}

			switch (operation) {
				case "eq":
					if (field !== value) {
						return false;
					}
					break;
				case "lt":
					if (parseFloat(field) >= parseFloat(value)) {
						return false;
					}
					break;
				case "gt":
					if (parseFloat(field) <= parseFloat(value)) {
						return false;
					}
					break;
				case "lte":
					if (parseFloat(field) > parseFloat(value)) {
						return false;
					}
					break;
				case "gte":
					if (parseFloat(field) < parseFloat(value)) {
						return false;
					}
					break;
				case "match":
					if (!iMatch(field, value, true)) {
						return false;
					}
					break;
				case "not_eq":
					if (field === value) {
						return false;
					}
					break;
				case "not_match":
					if (iMatch(field, value, true)) {
						return false;
					}
					break;
				case "not_empty":
					if (field === "") {
						return false;
					}
					break;
			}

			return true;
		});

		return passTheCheck;
	}, [showCalendlyConditions, trackedFields, hsForm, debug]);

	const handleFormFieldChange = useCallback(() => {
		const fields = selfRef.current.querySelectorAll("input[type=text], input[type=email], select, textarea");
		const fieldsData = {};
		fields.forEach((field) => {
			fieldsData[field.name] = field.value;
		});
		fieldsData.name = fieldsData.firstname + " " + fieldsData.lastname;

		setTrackedFields(fieldsData);
	}, []);

	const initFormFieldChangeListeners = useCallback(() => {
		const fields = selfRef.current.querySelectorAll("input[type=text], input[type=email], select, textarea");
		fields.forEach((field) => {
			field.addEventListener("keyup", ($evt) => handleFormFieldChange($evt));
			field.addEventListener("change", ($evt) => handleFormFieldChange($evt));
		});
		if (onHubspotReady) {
			onHubspotReady();
		}
	}, [handleFormFieldChange, onHubspotReady]);

	const handleHubspotSubmit = useCallback(() => {
		setIsHubspotFormSubmitted(true);

		if (onHubspotSubmit) {
			onHubspotSubmit();
		}
	}, [onHubspotSubmit]);

	const handleRedirectAfterSubmit = useCallback(() => {
		if (typeof document !== "undefined") {
			document.querySelector("body").style.overflowY = "unset";
		}

		navigate(redirectUrl);
	}, [redirectUrl]);

	useCalendlyEventListener({
		onProfilePageViewed: () => console.log("onProfilePageViewed"),
		onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
		onEventTypeViewed: () => {
			if (onCalendlyReady) {
				console.log("CalendlyForm : onReady()");
				onCalendlyReady();
			}
		},
		onEventScheduled: (e) => {
			console.log("CalendlyForm : onSubmit()");
			setIsCalendlyFormSubmitted(true);
			if (onCalendlySubmit) {
				onCalendlySubmit(e);
			}
		},
	});

	useEffect(() => {
		if (isHubspotFormSubmitted) {
			if (verifyShowCalendlyConditions()) {
				setShowCalendlyForm(true);
			}

			if (!verifyShowCalendlyConditions() && onSubmitActionType === "redirect") {
				handleRedirectAfterSubmit();
			}

			if (!verifyShowCalendlyConditions() && onSubmitActionType === "message") {
				setShowSubmitText(true);
			}
		}

		if (isHubspotFormSubmitted && isCalendlyFormSubmitted) {
			if (tyMsg) {
				setShowSubmitText(true);
			} else if (redirectUrl) {
				handleRedirectAfterSubmit();
			}
		}
	}, [
		isHubspotFormSubmitted,
		isCalendlyFormSubmitted,
		showCalendlyForm,
		redirectUrl,
		tyMsg,
		verifyShowCalendlyConditions,
		onSubmitActionType,
		handleRedirectAfterSubmit,
	]);

	useEffect(() => {
		if (submitActionType) {
			setOnSubmitActionType(submitActionType);
			return;
		}

		if (tyMsg !== "" && redirectUrl !== "") {
			return (
				<div className="FormHubspotCalendly warning">
					<p>Form__HubspotCalendly has both a thank-you message and a redirect URL set up. Please choose one.</p>
				</div>
			);
		} else if (redirectUrl !== "") {
			setOnSubmitActionType("redirect");
		} else if (tyMsg !== "") {
			setOnSubmitActionType("message");
		} else {
			setOnSubmitActionType("hubspot_default");
		}
	}, [submitActionType, tyMsg, redirectUrl]);

	return (
		<div
			className={clsx("FormHubspotCalendly", {
				is_hubspot: !isHubspotFormSubmitted,
				is_calendly: showCalendlyForm,
				is_hubspot_submitted: isHubspotFormSubmitted,
				is_calendly_submitted: isCalendlyFormSubmitted,
			})}
			ref={selfRef}>
			{(!isHubspotFormSubmitted || (isCalendlyFormSubmitted && onSubmitActionType === "hubspot_default")) && (
				<Form
					className={hsFormClassName}
					form={hsForm}
					campaign={campaign}
					submitText={submitText}
					onReady={() => initFormFieldChangeListeners()}
					onSubmit={() => handleHubspotSubmit()}
					killHubspotSubmitActions={killHubspotSubmitActions}
				/>
			)}
			{showCalendlyForm && <InlineWidget url={calendlyFormUrl} prefill={trackedFields} />}
			{onSubmitActionType === "message" && showSubmitText && <FormattedSubmitText hsForm={hsForm} />}
		</div>
	);
}
