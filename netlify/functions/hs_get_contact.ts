import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const axios = require("axios");

/* export default async function hubspotHandler(req, res) {
	const headers = {
		Authorization: `Bearer ${process.env.HS_ABM_HELPER_TOKEN}`,
		"Content-Type": "application/json",
	};

	const { hubspotutk } = req.body;

	if (hubspotutk === "undefined") {
		res.status(404);
		console.log("hs_get_contact: User does not have a Hubspot tracker.");
		return;
	}

	try {
		const result = await axios
			.get(`http://api.hubapi.com/contacts/v1/contact/utk/${hubspotutk}/profile`, {
				headers: headers,
			})
			.then((res) => res.data);

		res.status(200).json(result);
	} catch (error) {
		res.status(500).send(error);
	}
} */

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
	console.log(event);

	const headers = {
		Authorization: `Bearer ${process.env.HS_ABM_HELPER_TOKEN}`,
		"Content-Type": "application/json",
	};

	const { hubspotutk } = JSON.parse(event.body);

	if (hubspotutk === "undefined") {
		return {
			statusCode: 404,
			body: JSON.stringify({ message: "hs_get_contact: User does not have a Hubspot tracker." }),
		};
	}

	try {
		const result = await axios
			.get(`http://api.hubapi.com/contacts/v1/contact/utk/${hubspotutk}/profile`, {
				headers: headers,
			})
			.then((res) => res.data);

		console.log("HUBSPOT API RESULT", result);

		return {
			statusCode: 200,
			body: JSON.stringify({ message: result }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: error }),
		};
	}
};

export { handler };
