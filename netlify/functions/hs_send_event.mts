import hubspot from "@hubspot/api-client";

import { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
	const responseHeaders = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	};

	if (req.method === "OPTIONS") {
		return new Response(null, {
			status: 204,
			headers: responseHeaders,
		});
	}

	const params = await req.json();
	const { email } = params;

	const hubspotClient = new hubspot.Client({ accessToken: process.env.HS_TOKEN });

	const hubspotRequest = {
		limit: 1,
		after: "",
		sorts: ["email"],
		properties: ["hs_object_id", "email", "firstname", "lastname"],
		filterGroups: [
			{
				filters: [
					{
						propertyName: "email",
						operator: "EQ",
						value: email,
					},
				],
			},
		],
	};

	try {
		const contactsResponse = await hubspotClient.crm.contacts.searchApi.doSearch(hubspotRequest);

		console.log("contactsResponse", contactsResponse.results);

		if (!contactsResponse || !contactsResponse.results || !contactsResponse.results[0] || !contactsResponse.results[0].id) {
			return new Response(JSON.stringify({ belongsToList: false, state: "error", message: `Error : No contact to be found with email ${email}` }), {
				headers: responseHeaders,
			});
		}

		const contactId = contactsResponse.results[0].id;

		const properties = {
			additionalProp1: "string",
			additionalProp2: "string",
			additionalProp3: "string",
		};

		const BehavioralEventHttpCompletionRequest = { eventName: "Requested Broadsign Connect 2025 Product Video", email, properties, objectId: contactId };

		console.log("contactsResponse", BehavioralEventHttpCompletionRequest);

		const apiResponse = await hubspotClient.events.send.customEventDataApi.send(BehavioralEventHttpCompletionRequest);

		console.log("contactId", contactId);
		console.log(apiResponse);

		return new Response(JSON.stringify({ apiResponse, state: "success" }), { headers: responseHeaders });
	} catch (e) {
		return new Response(
			JSON.stringify({
				state: "error",
				message: e,
				details: `Error : Something failed.`,
			}),
			{
				headers: responseHeaders,
			}
		);
	}
};

export const config: Config = {
	path: "/api/send-hs-event",
};
