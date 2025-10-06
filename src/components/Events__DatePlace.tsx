import React from "react";
import clsx from "clsx";
import Link from "@components/LocalizedLink";

import "@sass/components/EventsDatePlace.scss";

type Lines = string[];

type IconProps = {
	icon: string;
};

type DescProps = {
	content: Lines;
};

type ElProps = {
	icon: string;
	content: Lines;
};

type EventSpotProps = {
	date: Lines;
	place: Lines;
	className?: string;
	id?: string;
	dateIcon?: string;
	locationIcon?: string;
};

function Icon({ icon }: IconProps) {
	return (
		<div className="icon">
			<img src={`/icons/${icon}.svg`} className="mb-2" alt="" />
		</div>
	);
}

function Desc({ content }: DescProps) {
	return (
		<div className="text">
			{content.map((line, k) => (
				<p dangerouslySetInnerHTML={{ __html: line }} key={k} />
			))}
		</div>
	);
}

function El({ icon, content, link = "" }: ElProps) {
	if (link === "") {
		return (
			<div className="el w-full mb-4">
				<Icon icon={icon} />
				<Desc content={content} />
			</div>
		);
	}

	return (
		<Link className="el w-full mb-4" to={link}>
			<Icon icon={icon} />
			<Desc content={content} />
		</Link>
	);
}

export default function Events__DatePlace({
	id = "",
	className = "",
	date = [],
	place = [],
	placeLink = "",
	dateIcon = "calendar_reflex",
	locationIcon = "location_reflex",
}: EventSpotProps) {
	return (
		<div id={id} className={clsx("EventsDatePlace", "flex flex-column flex-nowrap border-reflex border-top-1 border-bottom-1 pt-4 mb-8", className)}>
			{date.length > 0 && <El icon={dateIcon} content={date} />}
			{place.length > 0 && <El icon={locationIcon} content={place} link={placeLink} />}
		</div>
	);
}
