type ColorSwatch = { id: string; name: string; code: string };
type OverUnder = "under" | "over" | "exactly";
type StringType = "formID" | "sfCampaignID" | "youtubeID";
type SortBy = "name" | "timestamp" | "order";
type SortDir = "asc" | "desc";
type I18nObject = {
	en?: string;
	fr?: string;
	es?: string;
	de?: string;
	pt?: string;
	ja?: string;
	nl?: string;
	id?: string;
};
type Language = "en" | "fr" | "es" | "de" | "pt" | "nl" | "id" | "ja";

// Normalization function taken from https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
function normalizeString(str: string) {
	if (!str) return "";

	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

function normalizeArray(arr: string[]) {
	if (!arr) return [];

	return arr.map((v) =>
		v
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
	);
}

export const apLink = (linkID: string, token: string, medium: string = ""): string => {
	let out = `https://buy.broadsign.com/auction-packages/${linkID}?token=${token}`;
	if (medium !== "") out += `&utm_medium=referral&utm_content=${medium}`;
	return out;
};

export const authorPageSlug = (slug: string, lang: string = "en"): string => {
	if (slug) {
		const authorTrans: I18nObject = { en: "author", fr: "auteur", es: "autor", de: "autor", pt: "autor" };
		const pathPrefix: string = lang === "en" ? "/author" : authorTrans[lang as keyof I18nObject] ? `/${lang}/${authorTrans[lang]}` : `/${lang}/author`;
		return `${pathPrefix}/${slug}`;
	} else {
		console.warn("Invalid author page :", slug);
		return "";
	}
};

export const blogPostSlug = (slug: string, lang: string = "en"): string => {
	if (slug) {
		// Most languages will have a URL start with /:lang/blog ; a few exceptions only
		const exceptions: I18nObject = { fr: "/fr/blogue", ja: "/jp/blog" };
		const pathPrefix: string = lang === "en" ? "/blog" : exceptions[lang as keyof I18nObject] ? exceptions[lang] : `/${lang}/blog`;
		return `${pathPrefix}/${slug}`;
	} else {
		console.warn("Invalid post slug :", slug);
		return "";
	}
};

export const capitalize = (str: string): string => {
	if (str.length === 0) {
		return str;
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const webinarSlug = (slug: string, series: string = "", lang: Language = "en"): string => {
	const webinarTrans: I18nObject = { en: "webinars", fr: "webinaires", es: "seminarios-web" };
	let out = "/";

	const translation = webinarTrans?.[lang] || webinarTrans.en;
	out += translation + "/";

	if (series) {
		out += series.replace(/([A-Z])/g, "-$1").toLowerCase() + "/";
	}

	out += slug;
	out = out.replace(new RegExp(`(${translation}/+${translation}/)`, "g"), `${translation}/`).replace(/\/+/g, "/");

	return out;
};

export const loopTo = (dir: string, currentIndex: number, maxIndex: number): number => {
	if (dir === "next") {
		return (currentIndex + 1) % maxIndex;
	}
	if (dir === "prev" || dir === "previous") {
		return (currentIndex - 1 + maxIndex) % maxIndex;
	}
	return 0;
};

export const clamp = (_min: number | string, _num: number | string, _max: number | string): number => {
	const min: number = parseInt(_min as string);
	const num: number = parseInt(_num as string);
	const max: number = parseInt(_max as string);
	return Math.min(Math.max(min, num), max);
};

export const empty = (variable: unknown): boolean => {
	// Checks if a variable is "falsy" : null, undefined, empty string, empty array. Boolean "false" doesn't count as "empty" here.
	if (typeof variable === "boolean") {
		return false;
	} else if (variable) {
		if (typeof variable === "undefined") {
			return true;
		}
		if ((typeof variable === "object" && Object.values(variable).length === 0) || (variable instanceof Array && variable.length === 0)) {
			return true;
		}
		if (variable === "") {
			return true;
		}
	}
	return false;
};

export const excerpt = (string: string, maxLength: number = 60): string => {
	const maxChars: number = string.indexOf(" ", maxLength);
	if (maxChars > 0 && maxChars < string.length) {
		string =
			string
				.slice(0, maxChars) // Strip down to max length
				.replace(/(.+)\.$/g, "$1") + // Remove trailing period, if any
			"...";
	}
	return string;
};

export const filterDuplicates = (arr: string[]) => {
	return arr.filter((value, index, self) => {
		return value !== null && self.indexOf(value) === index;
	});
};

export const getTranslations = (path: string): object => {
	if (path.match(/key\//)) {
		path = path.replace("key/", "en/");
		console.warn(`@annex : The path to translation file for ${path} had "key" as a language ; defaulting to "en"`);
	}

	try {
		return require(`../i18n/${path}.json`);
	} catch (e) {
		console.warn(`@annex : No translation file found for : ${path}`);
	}

	return {};
};

export const computerLang = (l: string): string => {
	if (l === "jp") return "ja";
	if (l === "cn") return "zh";
	return l;
};

export const humanLang = (l: string): string => {
	if (l === "ja") return "jp";
	if (l === "zh") return "cn";
	return l;
};

export const getURLParamFromSearch = (search: string, param: string): string | boolean => {
	if (!search) {
		console.error("@annex.getURLParamFromSearch : Please provide a search object.");
		return false;
	}

	if (!param) {
		console.error("@annex.getURLParamFromSearch : Please specify a param to look for in the search object a search object.");
		return false;
	}

	const paramRegex = new RegExp(`[?&]${param}=([^?&]+)`, "i");
	const paramMatch = search.match(paramRegex);

	return paramMatch?.[1] || false;
};

export const hasCommonValue = (array1: string[], array2: string[]) => {
	for (let el of array1) {
		if (array2.includes(el)) {
			return true;
		}
	}
	return false;
};

export const htmlChars = (str: string) => {
	if (str) {
		str = str.replace(/&#8217;/g, "'");
		str = str.replace(/&#8211;/g, "-");
		str = str.replace(/&#038;/g, "&");
		str = str.replace(/&#039;/g, "'");
		str = str.replace(/&amp;/gi, "&");
		str = str.replace(/&#160;/gi, " ");
		return str;
	}
	return "";
};

/**
 * Compares two arrays of strings. Matches all the values of both arrays and returns true if any value matches in a fuzzy manner.
 * If direction is "uni", then arr1 is compared against arr2.
 * If direction is "both", then arr1 is compared against arr2 and vice-versa.
 * e.g.:
 * ["one","two","three"] vs ["thr","four"] would return true if direction="both" but false if direction="uni".
 * ["thr","four"] vs ["one","two","three"] would always return true.
 * ["one","two","three"] vs ["four","five"] would always return false.
 */
export const arraysFuzzyMatch = (arr1: string[], arr2: string[], direction: "both" | "uni" = "uni"): boolean => {
	const useArr1 = normalizeArray(arr1);
	const useArr2 = normalizeArray(arr2);

	for (const str1 of useArr1) {
		const str1Regexp = new RegExp(str1);
		for (const str2 of useArr2) {
			const str2Regexp = new RegExp(str2);
			if (str2.match(str1Regexp) || (direction === "both" && str1.match(str2Regexp))) {
				return true;
			}
		}
	}

	return false;
};

/**
 * Function to compare two strings, or two arrays, in a way that's case-insensitive and handles diacritics gracefully.
 * In the case of two strings, it's a direct comparison. If the two strings are equal, it returns true.
 * In the case of two arrays, it returns true if there's at least one common value to both arrays.
 * @param val1
 * @param val2
 * @returns Boolean
 */
export const iMatch = (val1: string | string[], val2: string | string[], exact: boolean = false): boolean => {
	function stringsMatch(str1: string, str2: string): boolean {
		if (str1 === str2) return true;

		if (str1 && str2) {
			if (exact && str1 === str2) return true;
			if (!exact && (str1.includes(str2) || str2.includes(str1))) return true;
		}

		return false;
	}

	if (typeof val1 === "string" && typeof val2 === "string") {
		const formattedStr1 = normalizeString(val1);
		const formattedStr2 = normalizeString(val2);
		return stringsMatch(formattedStr1, formattedStr2);
	}

	if (typeof val1 === "object" && typeof val2 === "object") {
		const formattedArray1 = normalizeArray(val1);
		const formattedArray2 = normalizeArray(val2);

		for (const formattedStr1 of formattedArray1) {
			if (formattedArray2.includes(formattedStr1)) {
				return true;
			}
		}

		return false;
	}

	if (typeof val1 === "string" && typeof val2 === "object") {
		const formattedStr1 = normalizeString(val1);
		const formattedArray2 = normalizeArray(val2);

		for (const formattedStr2 of formattedArray2) {
			if (stringsMatch(formattedStr1, formattedStr2)) {
				return true;
			}
		}

		return false;
	}

	if (typeof val1 === "object" && typeof val2 === "string") {
		const formattedArray1 = normalizeArray(val1);
		const formattedStr2 = normalizeString(val2);

		for (const formattedStr1 of formattedArray1) {
			if (stringsMatch(formattedStr1, formattedStr2)) {
				return true;
			}
		}

		return false;
	}

	console.error("iMatch : Something happened. Arg 1 is", typeof val1, val1, "; Arg 2 is", typeof val2, val2);
	return false;
};

export const isMobile = (): boolean => {
	// Formula from https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
	let hasTouchScreen: boolean = false;

	if ("maxTouchPoints" in navigator) {
		hasTouchScreen = navigator.maxTouchPoints > 0;
	} else if ("msMaxTouchPoints" in navigator) {
		hasTouchScreen = navigator["msMaxTouchPoints"] > 0;
	} else {
		const mQ: MediaQueryList = window.matchMedia && matchMedia("(pointer:coarse)");
		if (mQ && mQ.media === "(pointer:coarse)") {
			hasTouchScreen = !!mQ.matches;
		} else if ("orientation" in window) {
			hasTouchScreen = true; // deprecated, but good fallback
		} else {
			// Only as a last resort, fall back to user agent sniffing
			const UA: string = navigator.userAgent;
			hasTouchScreen = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
		}
	}

	return hasTouchScreen;
};

export const palette = (): ColorSwatch[] => {
	let out = [
		{ id: "reflex", name: "Reflex Blue", code: "#001464" },
		{ id: "cerulean", name: "Cerulean", code: "#1056FB" },
		{ id: "scarlet", name: "Scarlet Red", code: "#FF3F3F" },
		{ id: "ash", name: "Ash Grey", code: "#505969" },
		{ id: "soft", name: "Soft Grey", code: "#ECECEC" },
		{ id: "ultra", name: "Ultra-Light Cyan", code: "#E3F7FA" },
		{ id: "light", name: "Light Cyan", code: "#C8F0F5" },
		{ id: "medium", name: "Cyan", code: "#9BE0EB" },
		{ id: "primary", name: "Primary", code: "#001464" },
		{ id: "secondary", name: "Secondary", code: "#1056FB" },
	];

	return out;
};

export const pathRegExp = (path: string): RegExp => {
	return new RegExp(`^/?${path.replace(/^\/|\/$/g, "")}/?$`);
};

export const sanitizePath = (path: string): string => {
	function removeUnwantedSlashes(str) {
		return str
			.replace(/\/{2,}/g, "/")
			.replace(/^\/http/, "http")
			.replace(/^http:\/([^/])/, "http://$1")
			.replace(/^https:\/([^/])/, "https://$1");
	}

	if (path === "/") {
		return path;
	}

	if (path && path.match(/^(#.+|\?.+=.+)/)) {
		return path;
	}

	if (path && path.match(/(.+)([#?])(.+)/)) {
		const decomposePath: any = path.match(/(?<dPath>.+)(?<dSeparator>[#?])(?<dQuery>.+)/);
		const { dPath, dQuery, dSeparator } = decomposePath.groups;

		if (dPath && dQuery && dSeparator) {
			return removeUnwantedSlashes(`/${dPath}/`) + dSeparator + dQuery;
		}
	}

	return removeUnwantedSlashes(`/${path}/`);
};

export const shuffle = (arr: Array<unknown>): Array<unknown> => {
	let j: number, i: number, x: unknown;
	for (i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = arr[i];
		arr[i] = arr[j];
		arr[j] = x;
	}
	return arr;
};

export const slugify = (str: string, preferredChar: string = "-"): string => {
	return str.replace(/(\s|_|-)/g, preferredChar).toLowerCase();
};

export const snakeToPascal = (str: string): string => {
	return str
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("");
};

export const sortBy = (initialObject: object | Array<object>, sortBy: SortBy = "name", sortDir: SortDir = "asc"): Array<object> => {
	let out: object[] = [];

	if (typeof initialObject === "object") {
		out = Object.entries(initialObject).map((e) => ({ ...e[1], key: e[0] }));
	} else {
		out = initialObject;
	}

	if (out.length > 0) {
		out.sort(function (a, b): number {
			if (!a[sortBy] && a[sortBy] !== 0) {
				console.debug(`Error : Trying to sort by ${sortBy} ; Object ${a} doesn't have a "${sortBy}" attribute.`);
				return 0;
			}

			const nameA = `${a[sortBy]}`.toLowerCase(),
				nameB = `${b[sortBy]}`.toLowerCase();

			if (nameA > nameB) {
				return sortDir === "asc" ? 1 : -1;
			}

			if (nameA < nameB) {
				return sortDir === "asc" ? -1 : 1;
			}

			return 0;
		});
	}

	return out;
};

export const strIs = (str: string, is: StringType): boolean => {
	let regex = /./;
	if (str && is) {
		switch (is) {
			case "formID":
				regex = /^[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}$/;
				break;
			case "sfCampaignID":
				regex = /^[\w\d]{18}$/;
				break;
			case "youtubeID":
				regex = /^[\w\d-_]{11}$/;
				break;
		}
		if (str.match(regex)) {
			return true;
		}
	}
	return false;
};

export const cypher = (str: string, seed: number): string => {
	// Same as the cyrb53 function in GTM
	if (!seed) seed = 0;

	if (!str) return "false";

	var h1 = 0xdeadbeef ^ seed,
		h2 = 0x41c6ce57 ^ seed;

	for (var i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}

	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
	h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
	h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

	const prefix = str.length < 3 ? str : str.slice(0, 3);
	const suffix = str.length < 3 ? str : str.slice(-3);
	const infix = String(4294967296 * (2097151 & h2) + (h1 >>> 0));

	return prefix + infix + suffix;
};
