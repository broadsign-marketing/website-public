const React = require("react");

const activateWDDR = false;

require("./src/assets/global_functions.js");

exports.onClientEntry = () => {
	if (process.env.GATSBY_ACTIVE_ENV === "development" && activateWDDR) {
		const whyDidYouRender = require("@welldone-software/why-did-you-render");
		whyDidYouRender(React, {
			trackAllPureComponents: true,
			trackHooks: true,
			include: [/Page/],
		});
	}
};

exports.onRouteUpdate = ({ location }) => {
	if (location.hash) {
		const treatedHash = location.hash.replace(/\./g, "_");
		const targetElement = document.querySelector(treatedHash);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth" });
		}
	} else {
		window.scrollTo(0, 0);
	}
};
