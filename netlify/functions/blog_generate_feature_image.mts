import { existsSync, statSync, copyFile } from "fs";

import { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
	const siteUrl = process.env.SITE_URL;

	const responseHeaders = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	};

	if (req.method === "OPTIONS") {
		console.log("if OPTIONS");
		return new Response(null, {
			status: 204,
			headers: responseHeaders,
		});
	}

	console.log("request.body:", request.body);
	console.log("context.params:", context.params);

	return new Response(
		JSON.stringify({
			message: "Netlify function blog_generate_feature_image() loaded.",
			whatHappened: "Nothing, really, that function seems empty.",
			siteUrl: siteUrl,
		}),
		{ headers: responseHeaders }
	);
};

export const config: Config = {
	path: "/api/blog_generate_feature_image",
};
