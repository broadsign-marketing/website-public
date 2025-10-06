import T from "i18n-react";
import { useLocation } from "@reach/router";
import router from "@router";

import { Locale } from "@types";

export const useDico = (l: Locale = "en", dicoPath: string) => {
	const { pathname } = useLocation();

	if (l === "key") {
		l = "en";
	}

	if (dicoPath === undefined) {
		console.warn("A page has an undefined dicoPath", pathname);
		return {};
	}

	function fetchGlobalDico() {
		try {
			const globalDico = require(`@i18n/${l}/global.json`);
			const nav = require(`@i18n/${l}/components/Nav`);
			return { ...globalDico, nav };
		} catch (errorGlobal) {
			console.debug("Trouble loading globalDico for page", dicoPath);
		}

		return { key: l };
	}

	function fetchLocalDico() {
		if (dicoPath === "noLocal") {
			return {};
		}

		try {
			const localDico = require(`@i18n/${l}/${dicoPath}.js`);
			return localDico.default;
		} catch (errorJS) {}

		try {
			const localDico = require(`@i18n/${l}/${dicoPath}.json`);
			return localDico;
		} catch (errorJSON) {
			console.debug("Trouble loading localDico for page", dicoPath, errorJSON);
		}

		return {};
	}

	function fetchPageTranslations() {
		let path = "/";
		if (pathname !== "/") {
			path = pathname.replace(/^\//, "").replace(/\/$/, "");
		}

		const translationsFromRouter = Object.values(router).find((page) => Object.values(page).includes(path));
		return translationsFromRouter;
	}

	const globalDico = fetchGlobalDico();
	const localDico = fetchLocalDico();
	const translations = fetchPageTranslations();

	const out = { ...globalDico, ...localDico, translations };

	T.setTexts(out);
};

export const useL = (): Locale => {
	let out = T.translate("key");
	if (out === "key") {
		return "en";
	}
	return out;
};

export const useDicoImport = (l: string, dico: string) => {
	function fetchGlobalDico() {
		try {
			const globalDico = require(`@i18n/${l}/global.json`);
			return globalDico;
		} catch (errorGlobal) {
			console.debug("Trouble loading globalDico for page", dicoPath);
		}

		return {};
	}

	function fetchLocalDico() {
		if (dico[l]) {
			return dico[l];
		}

		return {};
	}

	const globalDico = fetchGlobalDico();
	const localDico = fetchLocalDico();
	const out = { ...globalDico, ...localDico };

	T.setTexts(out);
};

export const useDicoNamespace = (namespace: string) => {
	const l = useL();

	try {
		const addI18n = require(`../i18n/${l}/${namespace}.json`);
		T.setTexts({ ...addI18n, ...T.texts });
	} catch (e) {
		throw new Error(e);
	}
};
