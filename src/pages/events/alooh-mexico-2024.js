import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";
import { scrollTo } from "@hooks/useScreen";

import CalendarLinks from "@components/CalendarLinks";
import { EventThankYou } from "@components/Form__CustomThankYou";
import Container from "@components/Container";
import CTA from "@components/CTA";
import DatePlace from "@components/Events__DatePlace";
import Host from "@components/Events__Host";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";

import green_check from "@img/pages/thank-you/check_circle_green.svg";

import "@sass/pages/event_2024_woo_south_africa.scss";

export default function ALOOHMexico({ pageContext: { l, dicoPath }, data }) {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	useDico(l, dicoPath);

	const eventHosts = T.texts.hosts.map((host) => {
		return { ...host, portrait: data[`portrait_${host.id}`].childImageSharp.gatsbyImageData };
	});
	const eventDate = T.texts.date;
	const eventPlace = T.texts.place;
	const heroPars = T.texts.hero.pars;
	const thankYouForRegistering = T.texts.thankYouForRegistering;

	return (
		<Layout id="woo_south_africa" className="theme_carolina">
			<section className="hero mt-12 sm:mt-20">
				<Container>
					<div className="grid">
						<div className="col-12 sm:col-6 sm:pr-14">
							<p className="subtitle-1 gradient font-medium">{T.translate("hero.overtitle")}</p>
							<h1 className="">{T.translate("hero.title")}</h1>
							<DatePlace date={eventDate} place={eventPlace} />
							{heroPars.map((p) => {
								<p className="letter-spacing-5 line-height-180 mb-8">{p}</p>;
							})}
							<CTA className="primary mb-12" onClick={() => scrollTo("hull")}>
								RSVP
							</CTA>
						</div>
						<div className="col-12 sm:col-6">
							<Img image={data.hero.childImageSharp.gatsbyImageData} className="shadow-A" alt="" />
						</div>
					</div>
				</Container>
			</section>
			<section className="hull mt-15 mb-25" id="hull">
				<Container>
					<div className="grid">
						<div className="col-12 sm:col-6 sm:pr-14">
							<h3 className="h5">{T.translate("hostedBy")}</h3>
							{eventHosts.map(({ id, name, title }) => (
								<Host portrait={data[`portrait_${id}`].childImageSharp.gatsbyImageData} name={name} title={title} className="mb-8 sm:mb-0" />
							))}
						</div>
						<div className="col-12 mt-12 sm:col-6 sm:mt-0">
							<div className="bg-zircon px-12 py-8 rounded-xl">
								{isFormSubmitted ? (
									<EventThankYou
										className="my-4"
										showCalendarLinks={true}
										googleCalendarLink={T.translate("googleCalendarLink")}
										icsFileLink={T.translate("icsFileLink")}>
										{thankYouForRegistering.map((line) => (
											<p className="mb-2">{line}</p>
										))}
									</EventThankYou>
								) : (
									<Form form="placeholder" submitText="Reserve my spot" onSubmit={() => setIsFormSubmitted(true)} />
								)}
							</div>
						</div>
					</div>
				</Container>
			</section>
		</Layout>
	);
}

export const query = graphql`
	query {
		hero: file(relativePath: { eq: "pages/events/alooh-mexico-2024/hero.jpg" }) {
			...img
		}

		portrait_jose_delgado: file(relativePath: { eq: "pages/events/alooh-mexico-2024/portrait_jose_delgado.png" }) {
			...img
		}
		portrait_natalia_rojas: file(relativePath: { eq: "pages/events/alooh-mexico-2024/portrait_natalia_rojas.png" }) {
			...img
		}
		portrait_guillermo_garcia: file(relativePath: { eq: "pages/events/alooh-mexico-2024/portrait_guillermo_garcia.png" }) {
			...img
		}
		portrait_amalia_quintanilla: file(relativePath: { eq: "pages/events/alooh-mexico-2024/portrait_amalia_quintanilla.png" }) {
			...img
		}
		portrait_joe_cotugno: file(relativePath: { eq: "pages/events/alooh-mexico-2024/portrait_joe_cotugno.png" }) {
			...img
		}
	}
`;
