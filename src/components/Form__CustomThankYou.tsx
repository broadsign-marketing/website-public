import React from "react";
import CalendarLinks from "@components/CalendarLinks";
import { useL } from "@hooks/useDico";
import { getTranslations } from "@annex";
import clsx from "clsx";

import green_check from "@img/pages/thank-you/check_circle_green.svg";

import { Children } from "@types";

type CheckThankYouProps = {
	tyMsg: string;
};

type CustomThankYouProps = {
	googleCalendarLink: string;
	outlookCalendarLink: string;
	icsFileLink: string;
	tyMsg?: string;
	showCalendarLinks: boolean;
	className?: string;
	children: Children;
};

function CheckThankYou({ tyMsg }: CheckThankYouProps) {
	return (
		<div className="flex flex-wrap align-items-center mb-8">
			<img src={green_check} className="green_check my-2 mr-3" alt="" />
			<p className="inline-block h5 text-reflex font-black my-2 w-auto">{tyMsg}</p>
		</div>
	);
}

export function EventThankYou({
	googleCalendarLink = "",
	outlookCalendarLink = "",
	icsFileLink = "",
	tyMsg = "",
	showCalendarLinks = false,
	onClickCalendarLinks = undefined,
	className = "",
	children,
}: CustomThankYouProps) {
	const l = useL();
	const __ = getTranslations(`${l}/components/Form__CustomThankYou`);

	if (tyMsg === "") {
		tyMsg = __.thankYouForRegistering;
	}

	return (
		<div className={clsx("CustomThankYou EventThankYou", className, showCalendarLinks ? "" : "m-auto")}>
			<div className={clsx(showCalendarLinks ? "mb-4" : "")}>
				<CheckThankYou tyMsg={tyMsg} />
				{children}
			</div>
			{showCalendarLinks && (
				<CalendarLinks
					onClickCalendarLinks={onClickCalendarLinks}
					google={googleCalendarLink}
					outlook={outlookCalendarLink || icsFileLink}
					apple={icsFileLink}
				/>
			)}
		</div>
	);
}

export function WebinarThankYou({
	googleCalendarLink = "",
	outlookCalendarLink = "",
	icsFileLink = "",
	tyMsg = "",
	showCalendarLinks = false,
	className = "",
	children,
}: CustomThankYouProps) {
	const l = useL();
	const __ = getTranslations(`${l}/components/Form__CustomThankYou`);

	if (tyMsg === "") {
		tyMsg = __.thankYouForRegistering;
	}

	return (
		<div className={clsx("CustomThankYou WebinarThankYou m-auto", className)}>
			<p className="text-reflex text-24 font-black mb-8">{tyMsg}</p>
			{children}
			{showCalendarLinks && <CalendarLinks google={googleCalendarLink} outlook={outlookCalendarLink || icsFileLink} apple={icsFileLink} />}
		</div>
	);
}
