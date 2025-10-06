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
	const { email, listId } = params;

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
			return new Response(JSON.stringify({ belongsToList: false, state: "error", message: `Error : No contact to be found with email ${email}` }), {
				headers: responseHeaders,
			});
		}

		const contactId = contactsResponse.results[0].id;

		console.log(contactsResponse.results[0]);
		console.log(`Checking if contact ID ${contactId} (${email}) belongs to list ${listId}`);

		// "0-1" indicates objectTypeId === "contact"
		const membershipsResponse = await hubspotClient.crm.lists.membershipsApi.getLists("0-1", contactId);

		if (!membershipsResponse || !membershipsResponse.results || !membershipsResponse.results[0]) {
			return new Response(
				JSON.stringify({
					belongsToList: false,
					state: "error",
					message: `Error : No list can be returned for list ID ${listId} and contact ID ${contactId} (${email})`,
				}),
				{
					headers: responseHeaders,
				}
			);
		}

		const belongsToList = membershipsResponse.results.some((list) => list.listId == listId);

		//console.log(membershipsResponse.results);
		console.log(belongsToList);

		return new Response(JSON.stringify({ belongsToList, state: "success" }), { headers: responseHeaders });
	} catch (e) {
		return new Response(
			JSON.stringify({
				belongsToList: false,
				state: "error",
				message: e,
				details: `Error : Something failed. List ID ${listId} and contact ID ${contactId} (${email})`,
			}),
			{
				headers: responseHeaders,
			}
		);
	}
};

export const config: Config = {
	path: "/api/contact-is-member-of-list",
};
