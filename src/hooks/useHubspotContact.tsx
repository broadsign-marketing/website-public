import { useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import cookie from "react-cookies";

type RequestedProps = false | string[];

type ContactToUpdate = {
	contadtId: string;
	properties: object;
};

export const useHubspotContact = (props: RequestedProps = false) => {
	const [hs, setHs] = useState(false);
	const { origin } = useLocation();
	const hubspotutk = cookie.load("hubspotutk");

	useEffect(() => {
		async function fetchContact() {
			if (!origin || !hubspotutk) {
				return false;
			}

			const baseUrl = process.env.SITE_URL?.replace(/\/$/, "") || origin || "";

			// console.log(baseUrl + "/.netlify/functions/hs_get_contact");
			// console.log(hubspotutk);

			const fetchContact = await fetch("/.netlify/functions/hs_get_contact", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ hubspotutk }),
			}).then((res) => {
				if (res.ok) {
					return res.json();
				}
				return;
			});

			let out = {};

			if (props && props.length) {
				const { properties } = fetchContact;
				for (const prop of props) {
					if (properties?.[prop]) {
						out[prop] = properties[prop].value;
					}
				}
			} else {
				out = fetchContact;
			}

			setHs(out);
		}

		fetchContact();
	}, [props, origin, hubspotutk]);

	return hs;
};

export const useHubspotContactProps = () => {
	const { properties } = useHubspotContact();
	return properties ? Object.keys(properties) : [];
};

export async function hubspotUpdateContact(contact: ContactToUpdate) {
	const updateContact = await fetch("/api/hs_update_contact", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ contact }),
	}).then((res) => {
		return res.json();
	});

	// console.log(updateContact);
}
