import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { useDico } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";

import Container from "@components/Container";
import CTA from "@components/CTA";
import { EventThankYou } from "@components/Form__CustomThankYou";
import Host from "@components/Events__Host";
import DatePlace from "@components/Events__DatePlace";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";

import icon_calendar from "@img/pages/events/woo-south-africa/icon_calendar.svg";
import icon_place from "@img/pages/events/woo-south-africa/icon_place.svg";

import "@sass/pages/event_2024_woo_south_africa.scss";

export default function WooSouthAfrica({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [isFormSubmitted, setIsFormSubmitted] = useState(true);

	useDico(l, dicoPath);

	return (
		<Layout id="woo_south_africa" className="theme_carolina">
			<section className="hero mt-12 sm:mt-20">
				<Container>
					<div className="grid">
						<div className="col-12 sm:col-6 sm:pr-14">
							<p className="subtitle-1 gradient font-medium">WOO South Africa</p>
							<h1 className="">Connect with OOH experts from around the world at Broadsign's networking event</h1>
							<DatePlace
								date={["Monday, Mar 11, 2024", "8:30 PM (following the WOO Welcome Reception)"]}
								place={["The Athletic Club & Social", "35 Buitengracht St, CBD, Cape Town, 8001, South Africa"]}
							/>
							<p className="letter-spacing-5 line-height-180 mb-8">
								Join us for an intimate evening of cocktails and conversations at WOO South Africa. The event will be a great opportunity to
								network with industry peers and participate in conversations on all the exciting things happening in the world of OOH.
							</p>
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
							<h3 className="h5">Hosted by</h3>
							<Host
								portrait={data.portrait_frank_vallenga.childImageSharp.gatsbyImageData}
								name="Frank Vallenga"
								title="VP SaaS Sales, Broadsign"
								className="mb-8 sm:mb-0"
							/>
							<Host
								portrait={data.portrait_savvas_tombouloglou.childImageSharp.gatsbyImageData}
								name="Savvas Tombouloglou"
								title="Account Director EMEA, Broadsign"
								className="mb-8 sm:mb-0"
							/>
							<Host
								portrait={data.portrait_alexis_coulibaly.childImageSharp.gatsbyImageData}
								name="Alexis Coulibaly"
								title="Programmatic Team LEAD EMEA, Broadsign"
								className="mb-8 sm:mb-0"
							/>
							<Host
								portrait={data.portrait_miguel_castanon.childImageSharp.gatsbyImageData}
								name="Miguel Castañón"
								title="Sales Director EMEA"
								className="mb-8 sm:mb-0"
							/>
						</div>
						<div className="col-12 mt-12 sm:col-6 sm:mt-0">
							<div className="bg-zircon px-6 py-8 rounded-xl sm:px-12">
								{isFormSubmitted ? (
									<EventThankYou
										googleCalendarLink="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20240311T183000Z%2F20240311T213000Z&details=Join%20us%20for%20an%20intimate%20evening%20of%20cocktails%20and%20conversations%20at%20WOO%20South%20Africa.%20The%20event%20will%20be%20a%20great%20opportunity%20to%20network%20with%20industry%20peers%20and%20participate%20in%20conversations%20on%20all%20the%20exciting%20things%20happening%20in%20the%20world%20of%20OOH.&location=The%20Athletic%20Club%20%26%20Social%20%3A%2035%20Buitengracht%20St%2C%20CBD%2C%20Cape%20Town%2C%208001%2C%20South%20Africa&text=WOO%20South%20Africa"
										outlookCalendarLink="https://outlook.live.com/calendar/0/deeplink/compose?allday=false&body=Join%20us%20for%20an%20intimate%20evening%20of%20cocktails%20and%20conversations%20at%20WOO%20South%20Africa.%20The%20event%20will%20be%20a%20great%20opportunity%20to%20network%20with%20industry%20peers%20and%20participate%20in%20conversations%20on%20all%20the%20exciting%20things%20happening%20in%20the%20world%20of%20OOH.&enddt=2024-03-11T17%3A30%3A00&location=The%20Athletic%20Club%20%26%20Social%20%3A%2035%20Buitengracht%20St%2C%20CBD%2C%20Cape%20Town%2C%208001%2C%20South%20Africa&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2024-03-11T14%3A30%3A00&subject=WOO%20South%20Africa"
										icsFileLink="https://marketing.broadsign.com/hubfs/ICS/2024_03_woo_south_africa.ics">
										<p className="mb-2">We look forward to seeing you in Cape Town.</p>
										<p className="mb-8">Be sure to add the event to your calendar to stay up-to-date:</p>
									</EventThankYou>
								) : (
									<Form form="placeholder" onSubmit={() => setIsFormSubmitted(true)} />
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
		hero: file(relativePath: { eq: "pages/events/woo-south-africa/hero.jpg" }) {
			...img
		}

		portrait_alexis_coulibaly: file(relativePath: { eq: "pages/events/woo-south-africa/portrait_alexis_coulibaly.png" }) {
			...img
		}
		portrait_frank_vallenga: file(relativePath: { eq: "pages/events/woo-south-africa/portrait_frank_vallenga.png" }) {
			...img
		}
		portrait_miguel_castanon: file(relativePath: { eq: "pages/events/woo-south-africa/portrait_miguel_castanon.png" }) {
			...img
		}
		portrait_savvas_tombouloglou: file(relativePath: { eq: "pages/events/woo-south-africa/portrait_savvas_tombouloglou.png" }) {
			...img
		}
	}
`;
