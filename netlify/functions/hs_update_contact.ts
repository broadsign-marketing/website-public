const hubspot = require("@hubspot/api-client");

export default async function hubspotHandler(req, res) {
	const hubspotClient = new hubspot.Client({ accessToken: process.env.HS_ANALYTICS_TRACKING_TOKEN });

	const { contactId, properties } = req.body.contact;
	const updatedProperties = { properties };

	if (!contactId) {
		const message = "hs_update_contact: This user is not known by Hubspot and has no ID.";
		console.error(message);
		console.log("properties: ", updatedProperties);
		return message;
	}

	try {
		const apiResponse = await hubspotClient.crm.contacts.basicApi.update(contactId, updatedProperties);

		if (apiResponse) {
			console.log(JSON.stringify(apiResponse, null, 2));
			res.status(200).json(apiResponse);
			return apiResponse;
		}
	} catch (e) {
		e.message === "HTTP request failed" ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
		res.status(500).send(e);
	}
}
