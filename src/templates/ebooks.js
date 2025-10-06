import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { graphql, navigate } from "gatsby";
import T from "i18n-react";
import { useDicoNamespace } from "@hooks/useDico";
import { clsx } from "clsx";

// import clsx from "clsx";
import { getURLParamFromSearch, slugify, strIs } from "@annex";
import cookie from "react-cookies";

import Container from "@components/Container";
import FlipBook from "@components/FlipBook";
import Form, { getFormID } from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Loading from "@components/Loading";

import "@sass/templates/ebooks.scss";

/*
Reconsider using another PDF viewer ?

import { Worker, Viewer, ViewMode } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
	<Viewer fileUrl={ebook_en} className="ebook_viewer" />
</Worker>
*/

export default function EBookTemplate({
	location,
	heroBg = null,
	hero,
	heroImgPosition = "center center",
	intro,
	description = "",
	formHeader,
	formSubmitText,
	onFormReady = () => {},
	linkedInCampaign = "",
	hsContactToTrack = false,
	isUngated = false,
	formLayoutWidth = 6,
}) {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [isIFrameVisible, setIsIFrameVisible] = useState(false);
	const [visibleSeconds, setVisibleSeconds] = useState(0);
	const [hasBeenTracked, setHasBeenTracked] = useState(false);
	const [isPageLoaded, setIsPageLoaded] = useState(false);

	useDicoNamespace("ebooks");

	const formId = T.translate("id");
	const secondsForMeaningfulEngagement = 30;

	const iframeWrapperRef = useRef(null);
	const timerRef = useRef(null);

	let htmlID = slugify(T.translate("slug"), "_");
	if (htmlID.match(/^\d/)) {
		htmlID = "e_" + htmlID;
	}

	function formattedDescription() {
		if (description) {
			return description;
		}

		if (T.translate("description") !== "description") {
			return <p className="line-height-180">{T.translate("description")}</p>;
		}

		return false;
	}

	const getEbookCookie = useCallback(() => {
		if (cookie.load(`submitted-form-${getFormID(formId)}`)) {
			setIsFormSubmitted(true);
		}

		/*
		Special : The ebook /ebooks/increase-revenue-with-contextual-in-store-media/
		should be ungated if the form at /broadsign-zitcha/ has been filled out.
		*/
		if (location.pathname.match(/increase-revenue-with-contextual-in-store-media/)) {
			if (cookie.load(`submitted-form-${getFormID("partnersZitcha")}`)) {
				setIsFormSubmitted(true);
			}
		}
	}, [formId]);

	const getURLSubmissionGuid = useCallback(() => {
		const { search } = location;
		if (!search) {
			return;
		}

		const submissionGuid = getURLParamFromSearch(search, "submissionGuid");
		if (submissionGuid && strIs(submissionGuid, "formID")) {
			setIsFormSubmitted(true);
		}
	}, [location]);

	useEffect(() => {
		if (linkedInCampaign !== "") {
			getEbookCookie();
		}
	}, [linkedInCampaign]);

	useEffect(() => {
		getEbookCookie();
		getURLSubmissionGuid();
		setIsPageLoaded(true);
	}, [getEbookCookie, getURLSubmissionGuid]);

	useEffect(() => {
		if (hsContactToTrack === false || hasBeenTracked) {
			return;
		}

		const iframe = iframeWrapperRef.current;
		const observerOptions = {
			root: null,
			rootMargin: "50px",
			threshold: 1.0,
		};

		const intersectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				setIsIFrameVisible(entry.isIntersecting);
			});
		}, observerOptions);

		if (iframe) {
			intersectionObserver.observe(iframe);
		}

		return () => {
			if (iframe) {
				intersectionObserver.unobserve(iframe);
			}
		};
	}, [hsContactToTrack, hasBeenTracked]);

	useEffect(() => {
		if (hsContactToTrack === false || hasBeenTracked) {
			return;
		}

		if (isIFrameVisible) {
			timerRef.current = setInterval(() => {
				setVisibleSeconds((prev) => prev + 1);
			}, 1000);
		} else {
			clearInterval(timerRef.current);
		}

		if (visibleSeconds >= secondsForMeaningfulEngagement) {
			hubspotUpdateContact(hsContactToTrack);
			clearInterval(timerRef.current);
			setHasBeenTracked(true);

			dataLayer.push({ event: "analytics_ebook_engaged", ebook_id: T.translate("slug"), hubspot_contact_id: hsContactToTrack.contactId });
		}

		return () => {
			clearInterval(timerRef.current);
		};
	}, [hsContactToTrack, hasBeenTracked, isIFrameVisible, visibleSeconds]);

	useEffect(() => {
		window.dataLayer = window.dataLayer || [];
	}, []);

	return (
		<Layout id={htmlID} className={clsx("theme_carolina ebook_lp", { form_submitted: isFormSubmitted })}>
			<Container>
				<div className="breadcrumb text-12 text-ash my-8">
					<Link to="resources" className="slash_after text-ash">
						{T.translate("resources")}
					</Link>
					<span className="slash_after text-ash">{T.translate("ebooks")}</span>
					<strong>{T.translate("seo.title")}</strong>
				</div>
			</Container>
			<div className="hero flex align-items-center">
				{heroBg && <Img className="hero_img bg" image={heroBg} objectPosition={heroImgPosition} alt="" />}
				{hero && (
					<Container>
						<div className="grid py-16">{hero}</div>
					</Container>
				)}
			</div>
			{!isPageLoaded && (
				<div className="py-20">
					<Loading />
				</div>
			)}
			{isPageLoaded && !isFormSubmitted && !isUngated && (
				<div className="mt-16 mb-12">
					{intro && <Container>{intro}</Container>}
					{formattedDescription() && formId && (
						<Container>
							<div className="grid mb-20 justify-between">
								<div className={`col-12 md:col-${12 - formLayoutWidth}`}>{formattedDescription()}</div>
								<div className={`col-12 md:col-${formLayoutWidth}`}>
									<div id="form_box" className="form_box bg-zircon overflow-hidden rounded-xl">
										<div className="form_box_inner px-8 py-12">
											{formHeader && <h4 className="text-h5 mb-8">{formHeader}</h4>}
											<Form
												form={formId}
												submitText={formSubmitText || "Access Ebook"}
												onSubmit={() => setIsFormSubmitted(true)}
												onReady={onFormReady}
											/>
										</div>
									</div>
								</div>
							</div>
						</Container>
					)}
				</div>
			)}
			{(isFormSubmitted || isUngated) && <div className="">{T.texts?.flipbookUrl && <FlipBook url={T.translate("flipbookUrl")} type="fliphtml5" />}</div>}
		</Layout>
	);
}
