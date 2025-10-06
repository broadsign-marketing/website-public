import React, { useCallback, useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";

import Container from "@components/Container";
import Form from "@components/Form";
import Layout from "@components/layout";

import check from "@img/ui/check_circle_green.svg";
import logo_stroer from "@logos/stroer.svg";

import "@sass/pages/resubscribe.scss";

export default function ResubscribePage({ pageContext: { l, dicoPath }, location: { pathname, search } }) {
	const [isResubscribeLinkVisible, setIsResubscribeLinkVisible] = useState(false);
	const [isResubscribeLinkClicked, setIsResubscribeLinkClicked] = useState(false);
	const [isForStroer, setIsForStroer] = useState(false);

	useDico(l, dicoPath);

	const formID = "#hsForm_a6a7fe00-828c-4e1f-943b-38c1c2cabd94";

	const toggleShowResubscribeButton = useCallback((showButton) => {
		function show(target) {
			if (target) {
				target.classList.remove("hidden");
			}
		}

		function hide(target) {
			if (target) {
				target.classList.add("hidden");
			}
		}

		if (typeof document !== "undefined") {
			// const toggleHideEmailFieldLabel = document.querySelector(`${formID} .hs_email label`);
			const toggleHideFormContent = document.querySelector(`${formID} .legal-consent-container`);
			const toggleHideSubmitBtn = document.querySelector(`${formID} .actions`);
			// const toggleHideExplanation = document.querySelector(`#explanation`);

			if (showButton) {
				// hide(toggleHideEmailFieldLabel);
				hide(toggleHideFormContent);
				hide(toggleHideSubmitBtn);
				// show(toggleHideExplanation);
			} else {
				// show(toggleHideEmailFieldLabel);
				show(toggleHideFormContent);
				show(toggleHideSubmitBtn);
				// hide(toggleHideExplanation);
			}
		}
	}, []);

	useEffect(() => {
		setIsForStroer(search.match(/for=stroer/) ? true : false);

		const interval = setInterval(() => {
			const errorMsg1 = document.querySelector(`${formID} .resubscribe_error`);
			const errorMsg2 = document.querySelector(`${formID} .hs_email .hs-error-msgs a`);

			if (errorMsg1 || errorMsg2) {
				toggleShowResubscribeButton(true);
			} else {
				toggleShowResubscribeButton(false);
			}

			if (typeof document !== "undefined") {
				const resubscribeLink = document.querySelector(`${formID} .hs_email .hs-error-msgs a`);

				if (resubscribeLink) {
					setIsResubscribeLinkVisible(true);
					if (resubscribeLink.innerHTML.match(/did you mean/i)) {
						resubscribeLink.remove();
					} else if (resubscribeLink.innerHTML.match(/opt back in/i)) {
						resubscribeLink.innerHTML = T.translate("clickToResubscribe");
						resubscribeLink.addEventListener("click", () => setIsResubscribeLinkClicked(true));
					}
				} else {
					setIsResubscribeLinkVisible(false);
				}
			}
		}, 500);

		return () => clearInterval(interval);
	}, [search, toggleShowResubscribeButton]);

	return (
		<Layout path={pathname} id="subscribe" className={clsx("theme_carolina", isForStroer && "variation_stroer")}>
			<Container>
				<div className="flex flex-column justify-content-center mt-12 mb-40 mx-auto w-full">
					{!isResubscribeLinkClicked && (
						<div className="panel bg-zircon py-20 rounded-xl">
							{isForStroer && <img src={logo_stroer} className="feature_logo logo_stroer w-full" />}
							<div className="max-w-800 mx-auto">
								<Form form="emailSubscribe" />
								{isResubscribeLinkVisible && (
									<p className="text-16 text-ash mb-0" dangerouslySetInnerHTML={{ __html: T.texts.privacyPolicy }}></p>
								)}
							</div>
						</div>
					)}
					{isResubscribeLinkClicked && (
						<div className="panel bg-zircon py-20 rounded-xl text-center">
							<img src={check} className="thank_you_check mx-auto mb-8" alt="" />
							<h2 className="title h3 font-superbold text-center line-height-100 mb-8">{T.translate("thankYou.title")}</h2>
							<p
								className="blurb inline-block text-18 text-center my-0 mx-auto line-height-160 max-w-800"
								dangerouslySetInnerHTML={{ __html: T.texts.thankYou.blurb }}></p>
						</div>
					)}
				</div>
			</Container>
		</Layout>
	);
}

export const subscribeImg = graphql`
	query subscribeImages {
		HeaderImg: file(relativePath: { eq: "icons/subscribe_header_logo.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
