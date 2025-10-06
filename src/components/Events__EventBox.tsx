import React, { useCallback, useEffect, useMemo, useState } from "react";
import T from "i18n-react";
import clsx from "clsx";

import { GatsbyImage as Img, StaticImage, IGatsbyImageData } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";
import Loading from "@components/Loading";

interface EventBoxWWrapperProps {
	children: Children;
	className?: string;
	isFeatured?: boolean;
	salesforceCampaign: string;
	onClick?: Function;
	to?: string;
	type: string;
}

interface EventBoxProps extends Event {
	onClick: Function;
	type?: string;
	isArchived?: boolean;
	to?: string;
	className?: string;
	series?: string;
}

function EventBoxWrapper({ type, onClick = () => {}, className, slug, isFeatured, isFirst, salesforceCampaign, to, children }: EventBoxWWrapperProps) {
	if (to) {
		return (
			<Link
				to={to}
				className={clsx(
					"event_box cursor-pointer flex flex-column align-items-start justify-content-between mb-10 rounded-xl",
					className,
					`slug_${slug}`,
					type,
					isFeatured ? "w-full" : "col-12 sm:col-6 md:col-4"
				)}>
				{children}
			</Link>
		);
	}

	return (
		<div
			role="button"
			onClick={() => onClick()}
			data-sf-campaign={salesforceCampaign}
			data-slug={slug}
			className={clsx(
				"event_box cursor-pointer flex flex-column align-items-start justify-content-between mb-10 rounded-xl",
				className,
				isFeatured ? "FEATURED w-full sm:mb-0" : "col-12 sm:col-6 md:col-4"
			)}>
			{children}
		</div>
	);
}

export default function EventBox({
	slug,
	title,
	date,
	location,
	thumbnail,
	isFeatured,
	isFirst,
	isArchived,
	salesforceCampaign,
	to,
	className,
	onClick = () => {},
	type = "event",
	series = "",
}: EventBoxProps) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	if (isLoading) {
		if (isFirst) return <Loading />;
	}

	if (!title || !thumbnail) {
		return null;
	}

	const cta = isArchived ? `${type}Archived` : type;

	if (series) {
		title = T.translate(`webinars.${series}`) + `: ${title}`;
	}

	return (
		<EventBoxWrapper
			type={type}
			onClick={() => onClick(slug)}
			className={className}
			slug={slug}
			isFeatured={isFeatured}
			isFirst={isFirst}
			salesforceCampaign={salesforceCampaign}
			to={to}>
			{typeof thumbnail === "string" ? (
				<div className="event_box__thumb mb-4 w-full rounded-xl overflow-hidden flex-order-1">
					<img src={thumbnail} className="h-full w-full object-fit-cover" alt="" />
				</div>
			) : (
				<Img className="event_box__thumb mb-4 w-full rounded-xl flex-order-1" image={thumbnail} alt="" />
			)}
			<p
				className={clsx(
					"event_box__title text-reflex pr-2 font-bold line-height-120 text-transform-none",
					isArchived ? "flex-order-4 mb-4" : "flex-order-2 mb-1",
					isFeatured ? "h6" : "subtitle-1"
				)}>
				{title}
			</p>
			<div className="event_box__date_wrapper block mb-1 flex-order-3">
				<p className={clsx("event_box__date subtitle-2 mb-0", isArchived ? "text-ash" : "gradient")}>{date}</p>
			</div>
			{location && <p className="event_box__location subtitle-2 text-12 text-ash mb-6 flex-order-5">{location}</p>}
			<div
				className={clsx(
					"CTA span bg-reflex text-white pill text-14 justify-content-end px-6 py-2 mt-auto flex-order-6 hover:bg-cerulean",
					isFeatured ? "ml-auto mr-0" : ""
				)}>
				{T.translate(`ctas.${cta}`)}
			</div>
		</EventBoxWrapper>
	);
}
