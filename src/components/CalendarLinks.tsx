import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import clsx from "clsx";

import "@sass/components/CalendarLinks.scss";

export default function CalendarLinks({ className = "", google = "", apple = "", outlook = "", onClickCalendarLinks = undefined }) {
	const data = useStaticQuery(graphql`
		query {
			logo_google: file(relativePath: { eq: "pages/events/calendar_icon_google.png" }) {
				...img
			}
			logo_apple: file(relativePath: { eq: "pages/events/calendar_icon_apple.png" }) {
				...img
			}
			logo_outlook: file(relativePath: { eq: "pages/events/calendar_icon_outlook.png" }) {
				...img
			}
		}
	`);

	return (
		<div className={clsx("CalendarLinks flex flex-nowrap", className)}>
			{google && (
				<a className="link mr-2" target="_blank" href={google} rel="noreferrer" onClick={onClickCalendarLinks}>
					<Img image={data.logo_google.childImageSharp.gatsbyImageData} alt="" />
				</a>
			)}
			{apple && (
				<a className="link mr-2" target="_blank" href={apple} rel="noreferrer" onClick={onClickCalendarLinks}>
					<Img image={data.logo_apple.childImageSharp.gatsbyImageData} alt="" />
				</a>
			)}
			{outlook && (
				<a className="link mr-2" target="_blank" href={outlook} rel="noreferrer" onClick={onClickCalendarLinks}>
					<Img image={data.logo_outlook.childImageSharp.gatsbyImageData} alt="" />
				</a>
			)}
		</div>
	);
}
