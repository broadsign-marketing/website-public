import React, { useCallback, useEffect, useRef, useState } from "react";
import { useL } from "@hooks/useDico";
import clsx from "clsx";
import { getTranslations } from "@annex";

import CTA from "@components/CTA";
import { GatsbyImage as Img } from "gatsby-plugin-image";

import icon_impressions from "@img/case_studies/icon_impressions_gradient.svg";
import icon_venues from "@img/case_studies/icon_venues_gradient.svg";
import icon_screens from "@img/case_studies/icon_screens_gradient.svg";
import icon_ads_served from "@img/case_studies/icon_screens_gradient.svg";

import "@sass/components/CaseStudyCard.scss";

type PossibleCampaignProps = "geolocation" | "locationTypes" | "demographics" | "objective" | "strategy" | "targetStrategy" | "results";

type Campaign = {
	id: string;
	title: string;
	geolocation: string;
	locationTypes: string;
	demographics: string;
	objective: string;
	strategy: string;
	targetStrategy: string;
	results: string;
	impressions: string;
	venues: string;
	screens: string;
	to: string;
};

interface CampaignCardProps {
	thumbnail: any;
	content: Campaign;
	overtitle: string;
	cta: string;
	showProps: PossibleCampaignProps[];
	showLocationProps: boolean;
}

export default function CaseStudyCard({ content, thumbnail, cta, overtitle, showProps, showLocationProps }: CampaignCardProps) {
	const l = useL();
	const __ = getTranslations(`${l}/components/CaseStudies`);

	const cardRef = useRef(null);
	const thumbRef = useRef(null);

	const icons = {
		impressions: icon_impressions,
		venues: icon_venues,
		screens: icon_screens,
		adsServed: icon_ads_served,
	};

	const _cardBottomProps = ["impressions", "venues", "screens", "adsServed"];
	const cardBottomProps = _cardBottomProps
		.map((prop, k) => {
			if (content[prop]) {
				return { id: prop, icon: icons[prop], num: content[prop], what: __[prop], isFirst: k === 0, isLast: k === _cardBottomProps.length - 1 };
			}
			return null;
		})
		.filter(Boolean);

	let cardOvertitle = __.spotlight;
	if (overtitle === "none") cardOvertitle = "";
	else if (overtitle) cardOvertitle = overtitle;

	const handleScroll = useCallback(() => {
		if (typeof window === "undefined" || window.innerWidth < 600) return;
		if (!cardRef.current || !thumbRef.current) return;

		const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"));
		const thumbRect = thumbRef.current.getBoundingClientRect(); // .CaseStudyCard__thumbnail_wrapper
		const cardRect = cardRef.current.getBoundingClientRect(); // .CaseStudyCard

		// Do not continue if thumb is as tall as the card
		if (thumbRect.height >= cardRect.height) {
			if (parseInt(thumbRef.current.style.top) > 0) {
				thumbRef.current.style.top = "0px";
			}
			return;
		}

		// Prevent thumb from going too high
		if (thumbRect.top < cardRect.top) {
			thumbRef.current.style.top = `${parseInt(thumbRef.current.style.top) + 1}px`;
			return;
		}

		// Prevent thumb from going too low
		if (thumbRect.bottom > cardRect.bottom) {
			thumbRef.current.style.top = `${parseInt(thumbRef.current.style.top) - 1}px`;
			return;
		}

		// Adjust thumb's top pos within these limits
		let newPos = headerHeight - cardRect.top;
		newPos = Math.min(newPos, cardRect.height - thumbRect.height);
		newPos = Math.max(newPos, 0);
		thumbRef.current.style.top = `${newPos}px`;
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll, { passive: true });
			handleScroll();
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	if (!thumbnail) {
		console.error("Campaign", content.title, "doesn't have a feature image.");
		return null;
	}

	return (
		<div className={clsx("CaseStudyCard theme_carolina grid h-full rounded-xl sm:justify-content-between")} ref={cardRef}>
			<div className="col-12 pt-10 sm:hidden">
				<p className="CaseStudyCard__prop_name subtitle-1 gradient font-medium mb-0 sm:mb-2">{cardOvertitle}</p>
				<h4 className="h5 font-black">{content.title}</h4>
			</div>
			<div
				className={clsx("CaseStudyCard__thumbnail_wrapper col-12 flex flex-column flex-center sm:col-6 sm:pl-6 sm:flex-order-2")}
				style={{ top: "0px" }}
				ref={thumbRef}>
				<Img image={thumbnail} className="CaseStudyCard__thumbnail w-full h-auto rounded-xl sm:h-full" objectFit="cover" alt="" />
			</div>
			<div className="CaseStudyCard__stats_wrapper col-12 sm:col-6 sm:pr-6 sm:flex-order-1">
				<p className="CaseStudyCard__prop_name subtitle-1 gradient font-medium mb-2 hidden sm:block">{cardOvertitle}</p>
				<h4 className="h5 font-black hidden sm:block">{content.title}</h4>
				{showProps.map((prop) => {
					if (content[prop]) {
						return (
							<div className="CaseStudyCard__prop" key={prop}>
								<hr className="my-4" />
								<p className="CaseStudyCard__prop_name subtitle-2 gradient mb-1">{__[prop]}</p>
								<div className="CaseStudyCard__prop_value text-16 line-height-160">{content[prop]}</div>
							</div>
						);
					}

					return null;
				})}
				<hr className="my-4" />
				{showLocationProps && (
					<div
						className={clsx(
							"CaseStudyCard__stats w-full flex flex-row flex-nowrap align-items-center text-center m-0 pt-4 md:flex-nowrap md:text-left md:pt-0",
							cardBottomProps.length < 3 ? "justify-content-around" : "justify-content-between"
						)}>
						{cardBottomProps.map((prop) => (
							<div
								className={clsx(
									"CaseStudyCard__stat CaseStudyCard__impressions w-4 flex flex-column flex-nowrap align-items-center justify-content-start mb-4 md:flex-row md:mb-0 md:w-auto md:mr-0",
									prop.isFirst ? "md:justify-content-start" : prop.isLast ? "md:justify-content-end" : "md:justify-content-center"
								)}
								key={prop.id}>
								<img className="icon mb-2 md:mb-0" src={prop.icon} alt="" />
								<span className="text-reflex text-14 md:ml-2 lg:nowrap">
									<span className="inline-block w-full md:w-auto">{prop.num}</span>{" "}
									<span className="inline-block w-full md:w-auto">{prop.what}</span>
								</span>
							</div>
						))}
					</div>
				)}
				{content.to && (
					<div className="mt-8 sm:mt-15">
						<CTA to={content.to} className="bg-reflex text-white max-h-full px-6 border-none md:mr-2 hover:bg-cerulean">
							{cta !== "" ? cta : __.seeCaseStudy}
						</CTA>
					</div>
				)}
			</div>
		</div>
	);
}
