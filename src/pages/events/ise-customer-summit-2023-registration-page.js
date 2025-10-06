import React from "react";
import { useDico } from "@hooks/useDico";

import Layout from "@components/layout";
import Form from "@components/Form";
import Container from "@components/Container";

import hero from "@img/pages/ise-customer-summit-2023/hero.svg";
import calendar from "@img/pages/ise-customer-summit-2023/calendar_white.svg";

import "@sass/pages/ise_customer_summit_2023.scss";

export default function Event2023ISECustomerSummitPage({ pageContext, pageContext: { l, dicoPath }, location: { pathname } }) {
	useDico(l, dicoPath);

	return (
		<Layout id="ise_customer_summit_2023" className="theme_carolina">
			<div className="hero">
				<div className="blob blob1"></div>
				<div className="blob blob2"></div>
				<div className="blob blob3"></div>
				<div className="blob blob4"></div>
				<div className="blob blob5"></div>
				<div className="blob blob6"></div>
				<div className="blob blob7"></div>
				<div className="blob blob8"></div>
				<Container className="flex flex-column align-items-center">
					<img src={hero} className="ready_set_shine" alt="Ready, Set, Shine!" title="Ready, Set, Shine!" height="217" width="373" />
					<div className="calendar_wrapper mb-4">
						<img src={calendar} className="calendar" alt="" height="24" width="24" />
					</div>
					<p className="text-white text-20 font-medium text-center mb-1 mx-auto">When: Monday, January 30th</p>
					<p className="text-white text-20 font-medium text-center mb-1 mx-auto">Time: 12:00 PM - 8:00 PM CET</p>
					<p className="text-white text-20 font-medium text-center mb-1 mx-auto">
						Where: Alexandra Barcelona Hotel, Calle Mallorca 251, 08008 Barcelona Spain
					</p>
				</Container>
			</div>
			<Container className="hull grid mx-auto my-20">
				<div className="col-12 mb-20 sm:col-6 sm:pr-8">
					<h3 className="h5">Our ISE Customer Summit is back, and you're invited!</h3>
					<p className="text-reflex text-16 line-height-180">Here's what you can look forward to (besides cocktails and tapas):</p>
					<ul className="checks_gradient text-reflex">
						<li className="text-reflex line-height-160">Network with Broadsigners and industry experts from around the world</li>
						<li className="text-reflex line-height-160">Deep dives into key issues and trends impacting OOH in 2023</li>
						<li className="text-reflex line-height-160">A great session on why flexible campaign types should be part of your sales strategy</li>
						<li className="text-reflex line-height-160">A first glance at our 2023 product roadmap - big things are coming!</li>
					</ul>
					<p className="text-reflex text-16 line-height-180 mt-4">We can't wait to chat about all things out-of-home!</p>
				</div>
				<div className="col-12 mb-20 sm:col-6">
					<div className="block p-8 bg-alice rounded-xl sm:px-12">
						<Form form="placeholder" />
					</div>
				</div>
			</Container>
		</Layout>
	);
}
