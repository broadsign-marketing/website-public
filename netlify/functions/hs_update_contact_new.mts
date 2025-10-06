import hubspot from "@hubspot/api-client";

import { Config, Context } from "@netlify/functions";

function hsError(e) {
	const responseHeaders = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	};

	if (e.message === "HTTP request failed") {
		const response = JSON.stringify(e.response, null, 2);
		console.error(response);
		return new Response(response, { headers: responseHeaders });
	} else {
		const response = JSON.stringify(e);
		console.error(response);
		return new Response(response, { headers: responseHeaders });
	}
}

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
	const { email, properties } = params;

	const hubspotClient = new hubspot.Client({ accessToken: process.env.HS_TOKEN });

	const hubspotRequest = {
		limit: 1,
		after: "",
		sorts: ["email"],
		properties: ["hs_object_id", "email"],
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

		if (!contactsResponse || !contactsResponse.results || !contactsResponse.results[0] || !contactsResponse.results[0].id) {
			return new Response(JSON.stringify({ state: "error", message: `Error : No contact to be found with email ${email}` }), {
				headers: responseHeaders,
			});
		}

		const contactId = contactsResponse.results[0].id;

		console.log("contactId", contactId);
		console.log("properties", properties);
		console.log(`Contact ID ${contactId} (${email})`);

		await hubspotClient.crm.contacts.basicApi.update(contactId, { properties });

		return new Response(
			JSON.stringify({ message: `Contact ID ${contactId} (${email}) was updated with properties ${JSON.stringify(properties)}`, state: "success" }),
			{ headers: responseHeaders }
		);
	} catch (e) {
		return new Response(
			JSON.stringify({
				state: "error",
				message: e,
				details: `Error : Something failed. Contact ID ${contactId} (${email})`,
			}),
			{
				headers: responseHeaders,
			}
		);
	}
};

export const config: Config = {
	path: "/api/update-contact",
};
