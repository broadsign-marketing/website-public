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

import title from "@img/pages/events/ooh-social-milan-2024/title.svg";

import "@sass/pages/event_2024_ooh_social_milan.scss";

import type { BroadsignPageProps } from "@types";

export default function WooMilan({ pageContext: { l, dicoPath }, location: { pathname }, data }: BroadsignPageProps) {
	const [showRegisterFormModal, setShowRegisterFormModal] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	useDico(l, dicoPath);

	const { date, place, hosts } = T.texts;

	return (
		<Layout id="ooh_social_milan" className="theme_carolina">
			<section className="hero">
				<Container>
					<div className="grid">
						<div className="col-8 col-offset-2 pt-12 md:col-6 md:col-offset-0">
							<h1>
								<img src={title} alt={T.translate("hero.title")} title={T.translate("hero.title")} width="195" height="136" />
							</h1>
							<hr className="bg-gradient" />
							<DatePlace date={date} place={place} dateIcon="calendar_gradient" locationIcon="location_gradient" />
							{T.texts.hero.pars.map((p, k) => (
								<p className="text-reflex text-24 font-bold mb-8" style={{ maxWidth: "36ch" }} key={k}>
									{p}
								</p>
							))}
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
					{/* <NeonBox>
						<h3 className="text-34 text-transform-none text-center mt-4 mb-6">{T.translate("hostedBy")}</h3>
						<div className="flex flex-wrap flex-row justify-content-center mb-5">
							{hosts.map(({ id, name, title }) => (
								<Host
									portrait={data["portrait_tbc"].childImageSharp.gatsbyImageData}
									name={name}
									title={title}
									className="mb-8 sm:mb-0"
									key={id}
								/>
							))}
						</div>
					</NeonBox> */}
					<div className="bg-gradient rounded-xl flex flex-column align-items-center w-full mt-5 pt-5 pb-8 px-4">
						<h2 className="text-white text-34 font-bold text-transform-none mb-5">{T.translate("shin.title")}</h2>
						<CTA preset="primary-outline" hoverPreset="full-cerulean" onClick={() => setShowRegisterFormModal(true)}>
							{T.translate("shin.cta")}
						</CTA>
					</div>
				</Container>
			</section>
			<Modal show={showRegisterFormModal} variant="form" className="theme_carolina" onClose={() => setShowRegisterFormModal(false)}>
				{isFormSubmitted ? (
					<EventThankYou
						googleCalendarLink="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20241104T193000Z%2F20241104T220000Z&details=Join%20Broadsign%20for%20our%20OOH%20Social%20events%2C%20a%20global%20series%20that%20brings%20together%20industry%20leaders%20for%20exclusive%20networking%20experiences.%20Connect%20with%20peers%20and%20engage%20in%20dynamic%20conversations%20about%20the%20latest%20innovations%20and%20trends%20shaping%20the%20future%20of%20OOH.&location=Radio%20Rooftop%20Milan%20%20Via%20Marco%20Polo%2C%2018%2C%2020124%20Milano%20%20MI%2C%20Italy&text=OOH%20Social%20Milan"
						outlookCalendarLink="https://outlook.live.com/calendar/0/action/compose?allday=false&body=Join%20Broadsign%20for%20our%20OOH%20Social%20events%2C%20a%20global%20series%20that%20brings%20together%20industry%20leaders%20for%20exclusive%20networking%20experiences.%20Connect%20with%20peers%20and%20engage%20in%20dynamic%20conversations%20about%20the%20latest%20innovations%20and%20trends%20shaping%20the%20future%20of%20OOH.&enddt=2024-11-04T17%3A00%3A00&location=Radio%20Rooftop%20Milan%20%20Via%20Marco%20Polo%2C%2018%2C%2020124%20Milano%20%20MI%2C%20Italy&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2024-11-04T14%3A30%3A00&subject=OOH%20Social%20Milan"
						icsFileLink="https://marketing.broadsign.com/hubfs/ICS/2024_11_04_ooh_social_milan.ics"
						showCalendarLinks={true}>
						<p className="mb-2">We look forward to seeing you in Milan.</p>
						<p className="mb-8">Be sure to add the event to your calendar to stay up-to-date:</p>
					</EventThankYou>
				) : (
					<Form form="event2024WOOMilan" onSubmit={() => setIsFormSubmitted(true)} />
				)}
			</Modal>
		</Layout>
	);
}

export const query = graphql`
	query {
		hero01: file(relativePath: { eq: "pages/events/ooh-social-milan-2024/hero_01.png" }) {
			...img
		}
		hero02: file(relativePath: { eq: "pages/events/ooh-social-milan-2024/hero_02.png" }) {
			...img
		}

		portrait_tbc: file(relativePath: { eq: "pages/events/ooh-social-milan-2024/portrait_tbc.png" }) {
			...img
		}
	}
`;
