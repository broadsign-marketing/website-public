import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import T from "i18n-react";
import clsx from "clsx";
import cookie from "react-cookies";

import { WebinarThankYou } from "@components/Form__CustomThankYou";
import Form, { getFormID } from "@components/Form";
import Modal from "@components/Modal";
import NeonBox from "@components/NeonBox";
import Presenter from "@components/Presenter";
import Video from "@components/Video";

import icon_calendar from "@icons/calendar_gradient.svg";

import "@sass/components/WebinarsLPComponents.scss";

type HeroDateProps = {
	date: string;
	lines: "reflex" | "gradient";
	padding: string;
};

export const Presenters = memo(({ data, presenters }): JSX.Element => {
	let { title, list } = T.texts.presenters;

	if (presenters && presenters.length > 0) {
		title = presenters.title;
		list = presenters.list;
	}

	return (
		<NeonBox className="h-auto mb-4" innerClassName="px-4 py-6 sm:px-6">
			<div className="presenter_wrapper flex flex-column">
				<h2 className="text-24 text-transform-none line-height-80 sm:text-34">{title}</h2>
				{list.map((presenter) => (
					<Presenter
						avatar={data[`portrait_${presenter.portrait}`].childImageSharp.gatsbyImageData}
						{...presenter}
						className="mt-5"
						key={presenter.portrait}
					/>
				))}
			</div>
		</NeonBox>
	);
});

export const HeroDate = memo(function HeroDate({ date, lines = "reflex", padding = "4" }: HeroDateProps): JSX.Element {
	const wrapperCSSClasses = clsx(
		"HeroDate date_wrapper w-full",
		lines === "gradient" ? "lines_gradient" : "border-reflex border-top-1 border-bottom-1",
		`py-${padding}`
	);

	return (
		<div className={wrapperCSSClasses}>
			<div className="flex flex-row nowrap align-items-center justify-content-center sm:justify-content-start">
				<img src={icon_calendar} className="icon_calendar mr-4" style={{ marginTop: "1px" }} alt={date} />
				<p className="inline-block text-reflex text-16 font-medium my-0 pt-1 wrap">{date}</p>
			</div>
		</div>
	);
});

export function StickyColumn({ children }) {
	const [stickyState, setStickyState] = useState<"off" | "following" | "ended">("off");

	const stickyWrapperRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;
	const stickyRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	const handleSticky = useCallback(() => {
		if (typeof window === "undefined" || !stickyWrapperRef.current || !stickyRef.current) return;

		const stickyDistanceFromTop = 100;
		const { width: stickyWidth, top: stickyWrapperTop, bottom: stickyWrapperBottom } = stickyWrapperRef.current.getBoundingClientRect();
		const { height: stickyHeight } = stickyRef.current.getBoundingClientRect();

		stickyRef.current.style.width = stickyWidth + "px";

		if (stickyDistanceFromTop + stickyHeight > stickyWrapperBottom) {
			setStickyState("ended");
		} else if (stickyWrapperTop <= stickyDistanceFromTop) {
			setStickyState("following");
		} else {
			setStickyState("off");
		}
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleSticky);
		window.addEventListener("resize", handleSticky);

		return () => {
			window.removeEventListener("scroll", handleSticky);
			window.removeEventListener("resize", handleSticky);
		};
	}, [handleSticky]);

	return (
		<div className={clsx("sticky_wrapper", stickyState)} ref={stickyWrapperRef}>
			<div className={clsx("the_sticky")} ref={stickyRef}>
				{children}
			</div>
		</div>
	);
}

export function FormModalRegistration({ form, showModal, onSubmit, onClose }) {
	const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

	if (!showModal) return null;

	return (
		<Modal variant="form" className="narrow theme_carolina" onClose={onClose}>
			{isFormSubmitted ? (
				<WebinarThankYou>
					<p className="text-reflex mb-8">{T.translate("checkInbox")}</p>
					<p className="text-reflex mb-0">{T.translate("seeYou")}</p>
				</WebinarThankYou>
			) : (
				<>
					<h3 className="text-24 text-transform-none align-self-start text-left mb-8 sm:text-30">{T.translate("registerToOurWebinar")}</h3>
					<Form
						form={form}
						killHubspotSubmitActions={true}
						submitText="Register"
						onSubmit={() => {
							setIsFormSubmitted(true);
							if (onSubmit) onSubmit();
						}}
					/>
				</>
			)}
		</Modal>
	);
}

export function FormModalOnDemand({ form, showModal, onSubmit, onClose, video = "" }) {
	const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

	useEffect(() => {
		const formID = getFormID(form);
		const formCookie = cookie.load(`submitted-form-${formID}`);
		setIsFormSubmitted(!!formCookie);
	}, [form]);

	if (!video) return;

	let vimeoId = "";
	let youtubeId = "";

	if (video.match(/vimeo/) && video.match(/\/\d{10}/)) {
		vimeoId = video.match(/\/(\d{10})/)[1];
	} else if (video.match(/youtube/) && video.match(/v=[\w\d-_]{11}/)) {
		youtubeId = video.match(/v=([\w\d-_]{11})/)[1];
	} else if (video.match(/^[\w\d-_]{11}$/)) {
		youtubeId = video.match(/^([\w\d-_]{11})$/)[1];
	}

	if (!showModal) return null;

	return (
		<Modal variant={isFormSubmitted ? "video" : "form"} className="narrow theme_carolina" onClose={onClose}>
			{isFormSubmitted ? (
				<Video VimeoID={vimeoId} YoutubeID={youtubeId} />
			) : (
				<>
					<h3 className="text-24 text-transform-none align-self-start text-left mb-8 sm:text-30">{T.translate("requestRecording")}</h3>
					<Form
						form={form}
						killHubspotSubmitActions={true}
						submitText="Register"
						onSubmit={() => {
							setIsFormSubmitted(true);
							if (onSubmit) onSubmit();
						}}
					/>
				</>
			)}
		</Modal>
	);
}
