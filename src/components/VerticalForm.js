import React from "react";
import route, { routeWithUtmForm } from "@route";

import Container from "@components/Container";
import Form from "@components/Form";

const VerticalForm = ({ children }) => {
	return (
		<section className="VerticalForm bg-zircon py-10 sm:py-20" id="VerticalForm">
			<Container className="form_zone">
				<div className="grid">
					<div className="col-12 sm:col-8 sm:col-offset-2 md:col-6 md:col-offset-3">
						{children && children}
						<Form form="demo" redirectUrl={routeWithUtmForm("thankYou", "request_a_demo")} submitText="Request a Demo"></Form>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default VerticalForm;
