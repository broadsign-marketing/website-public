import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";

import Container from "@components/Container";
import CTA from "@components/CTA";
import { EventThankYou } from "@components/Form__CustomThankYou";
import Host from "@components/Events__Host";
import DatePlace from "@components/Events__DatePlace";
import Form from "@components/Form";
import NeonBox from "@components/NeonBox";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Modal from "@components/Modal";

import title from "@img/pages/events/ooh-social-mexico-2025/title.svg";

import "@sass/pages/events/2025_ooh_social_mexico.scss";

import type { BroadsignPageProps } from "@types";

export default function WooMexico({ pageContext: { l, dicoPath }, location: { pathname }, data }: BroadsignPageProps) {
	const [showRegisterFormModal, setShowRegisterFormModal] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	useDico(l, dicoPath);

	const { date, place, hosts } = T.texts;

	return (
		<Layout id="ooh_social_mexico" className="theme_carolina">
			<section className="hero">
				<Container>
					<div className="grid">
						<div className="col-8 col-offset-2 pt-12 md:col-6 md:col-offset-0">
							<h1>
								<img src={title} alt={T.translate("hero.title")} title={T.translate("hero.title")} width="195" height="136" />
							</h1>
							<hr className="bg-gradient" />
							{T.texts.hero.pars.map((p, k) => (
								<p className="text-reflex text-24 font-bold mb-4" style={{ maxWidth: "36ch" }} key={k}>
									{p}
								</p>
							))}
							<DatePlace
								date={date}
								place={place}
								placeLink="https://maps.app.goo.gl/m5zEug4rVeNsFAvh6"
								dateIcon="calendar_gradient"
								locationIcon="location_gradient"
							/>
							<CTA className="primary mb-12" onClick={() => setShowRegisterFormModal(true)}>
								{T.translate("hero.cta")}
							</CTA>
						</div>
						<div className="hero_images col-12 md:col-6 md:pl-8">
							<div className="hero_img_wrapper hero_img_01 mt-25">
								<Img image={data.hero01.childImageSharp.gatsbyImageData} alt="" />
							</div>
							<div className="hero_img_wrapper hero_img_02">
								<Img image={data.hero02.childImageSharp.gatsbyImageData} alt="" />
							</div>
						</div>
					</div>
				</Container>
			</section>
			<section className="hull mt-15 mb-25" id="hull">
				<Container className="flex flex-column align-items-center justify-content-start">
					<p className="blurb text-gradient font-bold text-center mx-auto mb-15">{T.translate("blurb")}</p>
					<div className="bg-gradient rounded-xl flex flex-column align-items-center w-full mt-5 pt-5 pb-8 px-4">
						<h2 className="text-white text-34 font-bold text-transform-none mb-5">{T.translate("shin.title")}</h2>
						<CTA preset="primary-outline" hoverPreset="full-cerulean" onClick={() => setShowRegisterFormModal(true)}>
							{T.translate("shin.cta")}
						</CTA>
					</div>
				</Container>
			</section>
			<Modal show={showRegisterFormModal} variant="form" className="theme_carolina narrow" onClose={() => setShowRegisterFormModal(false)}>
				{isFormSubmitted ? (
					<EventThankYou
						googleCalendarLink={T.translate("googleCalendarLink")}
						outlookCalendarLink={T.translate("outlookCalendarLink")}
						icsFileLink={T.translate("icsFileLink")}
						showCalendarLinks={true}>
						<p className="mb-2">We look forward to seeing you in Mexico.</p>
						<p className="mb-8">Be sure to add the event to your calendar to stay up-to-date:</p>
					</EventThankYou>
				) : (
					<Form form="event2025WOOMexico" onSubmit={() => setIsFormSubmitted(true)} />
				)}
			</Modal>
		</Layout>
	);
}

export const query = graphql`
	query {
		hero01: file(relativePath: { eq: "pages/events/ooh-social-mexico-2025/hero_01.png" }) {
			...img
		}
		hero02: file(relativePath: { eq: "pages/events/ooh-social-mexico-2025/hero_02.png" }) {
			...img
		}

		portrait_tbc: file(relativePath: { eq: "pages/events/ooh-social-mexico-2025/portrait_tbc.png" }) {
			...img
		}
	}
`;
