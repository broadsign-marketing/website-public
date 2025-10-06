import React, { memo, useEffect, useRef, useState, MutableRefObject } from "react";
import T from "i18n-react";
import clsx from "clsx";

import icon_audience_segment from "@img/auction-packages/icon_audience.svg";
import icon_dayparts from "@img/auction-packages/icon_dayparts.svg";
import icon_moments from "@img/auction-packages/icon_moments.svg";
import icon_points_of_interest from "@img/auction-packages/icon_points_of_interest.svg";
import icon_venue_types from "@img/auction-packages/icon_venues.svg";

function BoxWrapper({ icon, title, children }) {
	return (
		<div className="box bg-zircon w-full p-4 mb-3 rounded-8 sm:p-8">
			<img className="box_icon" src={icon} alt={title} />
			<h4 className="box_title">{title}</h4>
			{children}
		</div>
	);
}

const BoxAudienceSegment = memo(() => {
	return (
		<BoxWrapper icon={icon_audience_segment} title={T.translate("benefits.boxes.audienceSegment.title")}>
			<p>{T.translate("benefits.boxes.audienceSegment.content")}</p>
		</BoxWrapper>
	);
});

const BoxPointsOfInterest = memo(() => {
	return (
		<BoxWrapper icon={icon_points_of_interest} title={T.translate("benefits.boxes.pointsOfInterest.title")}>
			<p>{T.texts.benefits.boxes.pointsOfInterest.list.join(", ")}</p>
		</BoxWrapper>
	);
});

const BoxDayParts = memo(() => {
	return (
		<BoxWrapper icon={icon_dayparts} title={T.translate("benefits.boxes.dayparts.title")}>
			<ul>
				{T.texts.benefits.boxes.dayparts.list.map((item, k) => (
					<li key={k}>{item}</li>
				))}
			</ul>
		</BoxWrapper>
	);
});

const BoxVenueTypes = memo(() => {
	return (
		<BoxWrapper icon={icon_venue_types} title={T.translate("benefits.boxes.venueTypes.title")}>
			<ul>
				<li>
					<b>{T.translate("audience")}</b>: {T.translate("benefits.boxes.venueTypes.audience")}
				</li>
				<li>
					<b>{T.translate("placeBased")}</b>: {T.translate("benefits.boxes.venueTypes.placeBased")}
				</li>
				<li>
					<b>{T.translate("outdoor")}</b>: {T.translate("benefits.boxes.venueTypes.outdoor")}
				</li>
			</ul>
		</BoxWrapper>
	);
});

const BoxMoments = memo(() => {
	return (
		<BoxWrapper icon={icon_moments} title={T.translate("benefits.boxes.moments.title")}>
			{/* <p>
				<b>{T.translate("benefits.boxes.moments.subtitle")}</b>
			</p> */}
			<p>{T.translate("benefits.boxes.moments.content")}</p>
		</BoxWrapper>
	);
});

export default function AuctionPackages__BenefitsBoxes({ segment, className }) {
	const [isVisible, setIsVisible] = useState(false);

	const selfRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	useEffect(() => {
		function checkVisibility() {
			const { top } = selfRef.current.getBoundingClientRect() || 0;
			const threshold = window.innerHeight / 2;

			if (top <= threshold) {
				setIsVisible(true);
			}
		}

		checkVisibility();
		window.addEventListener("scroll", checkVisibility, { passive: true });

		return () => {
			window.removeEventListener("scroll", checkVisibility);
		};
	}, []);

	return (
		<div className={clsx("masonry flex flex-column flex-nowrap justify-content-between sm:flex-row", isVisible && "visible")} ref={selfRef}>
			<div className="column col_01">
				<BoxAudienceSegment />
				<BoxPointsOfInterest />
				<BoxDayParts />
			</div>
			<div className="column col_02">
				<BoxVenueTypes />
				{T.texts.benefits.boxes.moments && <BoxMoments />}
			</div>
		</div>
	);
}
