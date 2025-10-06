import T from "i18n-react";
import { sanitizePath } from "@annex";
import { useL } from "@hooks/useDico";
const router = require("./router");

export default function route(routeID, l) {
	if (!l) {
		l = useL();
	}

	let hash = false;
	const debug = process.env.DEBUG_ROUTES === "true" ? true : false;

	if (routeID.startsWith("https://")) {
		return routeID;
	}

	if (routeID.match(/^\/[a-z0-9\-/]+$/)) {
		return sanitizePath(routeID);
	}

	if (routeID.match(/#/)) {
		const decomposeRouteID = routeID.match(/(.+)#(.+)/);
		if (decomposeRouteID) {
			routeID = decomposeRouteID[1];
			hash = decomposeRouteID[2];
		}
	}

	if (routeID === "index" || routeID === "/") {
		return router.index[l] || router.index["en"];
	}

	const foundRoute = router.hasOwnProperty(routeID) ? router[routeID] : false;

	if (!foundRoute) {
		if (debug) {
			console.debug(`Route "${routeID}" doesn't exist in router`);
		}
		return "";
	}

	if (foundRoute[l]) {
		const r = sanitizePath("/" + foundRoute[l]) + (hash ? `#${hash}` : "");
		return r;
	}

	if (foundRoute.en.match(/\w+/)) {
		try {
			if (debug) {
				console.warn(`Route "${routeID}" doesn't exist in ${l.toUpperCase()} but exists in EN`);
			}

			const r = sanitizePath("/" + foundRoute.en) + (hash ? `#${hash}` : "");
			return r;
		} catch (e) {
			if (debug) {
				console.debug(`Error trying to fallback to EN version for route "${routeID}"`);
			}
		}
	}
}

export function routeWithUtmForm(routeID, utmForm) {
	return `${route(routeID)}?utm_form=${utmForm}`;
}
