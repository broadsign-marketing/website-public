import React from "react";
import Form from "@components/Form";
import { routeWithUtmForm } from "@route";

/**
 * This can be very static because we're using the same verbiage on every instance,
 * and the test is only running on English pages.
 */

export default function FormLetsConnectVWO40VB({ onReady = null, onSubmit = null, redirectUrl = null }) {
	if (!redirectUrl) redirectUrl = routeWithUtmForm("thankYou", "lets_connect");

	return (
		<>
			<h3 className="h4 text-reflex mb-4">Book a DOOH Strategy Call</h3>
			<p className="text-reflex font-black mb-8">Fill out the form to connect with our media specialists.</p>
			<Form
				form="letsConnectVWO40VB"
				submitText="Book a Strategy Call"
				className="hide_labels"
				hideLabels={true}
				onReady={onReady}
				onSubmit={onSubmit}
				redirectUrl={redirectUrl}
			/>
		</>
	);
}
