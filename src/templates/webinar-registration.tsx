import React from "react";
import Container from "@components/Container";
import Layout from "@components/layout";
import { Presenters, StickyColumn, FormModalRegistration } from "@components/Webinars__LP_Components";

import "@sass/templates/webinars.scss";

export function FormModal(props) {
	return <FormModalRegistration {...props} />;
}

export default function WebinarRegistrationTemplate({ id = "", data, presenters, hero, description, ctaBox }) {
	return (
		<Layout id={id} className="theme_carolina webinar registration">
			<section className="hero bg-zircon mb-20">{hero}</section>
			<Container tag="section" className="hull mb-20">
				<div className="grid">
					<div className="column_description col-12 sm:col-6">{description}</div>
					<div className="col-12 sm:col-6 md:col-5 md:col-offset-1">
						<StickyColumn>
							<Presenters data={data} presenters={presenters} />
							{ctaBox}
						</StickyColumn>
					</div>
				</div>
			</Container>
		</Layout>
	);
}
