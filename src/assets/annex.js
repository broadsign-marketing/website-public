var __assign =
	(this && this.__assign) ||
	function () {
		__assign =
			Object.assign ||
			function (t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
				}
				return t;
			};
		return __assign.apply(this, arguments);
	};
// Normalization function taken from https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
function normalizeString(str) {
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}
function normalizeArray(arr) {
	return arr.map(function (v) {
		return v
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
	});
}
var annex = {
	apLink: function (linkID, token, medium) {
		if (medium === void 0) {
			medium = "";
		}
		var out = "https://buy.broadsign.com/auction-packages/".concat(linkID, "?token=").concat(token);
		if (medium !== "") out += "&utm_medium=referral&utm_content=".concat(medium);
		return out;
	},
	authorPageSlug: function (slug, lang) {
		if (lang === void 0) {
			lang = "en";
		}
		if (slug) {
			var authorTrans = { en: "author", fr: "auteur", es: "autor", de: "autor", pt: "autor" };
			var pathPrefix = lang === "en" ? "/author" : authorTrans[lang] ? "/".concat(lang, "/").concat(authorTrans[lang]) : "/".concat(lang, "/author");
			return "".concat(pathPrefix, "/").concat(slug);
		} else {
			console.warn("Invalid author page :", slug);
			return "";
		}
	},
	blogPostSlug: function (slug, lang) {
		if (lang === void 0) {
			lang = "en";
		}
		if (slug) {
			// Most languages will have a URL start with /:lang/blog ; a few exceptions only
			var exceptions = { fr: "/fr/blogue", ja: "/jp/blog" };
			var pathPrefix = lang === "en" ? "/blog" : exceptions[lang] ? exceptions[lang] : "/".concat(lang, "/blog");
			return "".concat(pathPrefix, "/").concat(slug);
		} else {
			console.warn("Invalid post slug :", slug);
			return "";
		}
	},
	capitalize: function (str) {
		if (str.length === 0) {
			return str;
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	},
	webinarSlug: function (slug, series, lang) {
		if (series === void 0) {
			series = "";
		}
		if (lang === void 0) {
			lang = "en";
		}
		var webinarTrans = { en: "webinars", fr: "webinaires", es: "seminarios-web" };
		var out = "/";
		if (webinarTrans === null || webinarTrans === void 0 ? void 0 : webinarTrans[lang]) {
			out += (webinarTrans === null || webinarTrans === void 0 ? void 0 : webinarTrans[lang]) + "/";
		} else {
			out += webinarTrans.en + "/";
		}
		if (series) {
			out += series.replace(/([A-Z])/g, "-$1").toLowerCase() + "/";
		}
		out += slug;
		return out;
	},
	loopTo: function (dir, currentIndex, maxIndex) {
		if (dir === "next") {
			return (currentIndex + 1) % maxIndex;
		}
		if (dir === "prev" || dir === "previous") {
			return (currentIndex - 1 + maxIndex) % maxIndex;
		}
		return false;
	},
	clamp: function (_min, _num, _max) {
		var min = parseInt(_min);
		var num = parseInt(_num);
		var max = parseInt(_max);
		return Math.min(Math.max(min, num), max);
	},
	empty: function (variable) {
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
	},
	excerpt: function (string, maxLength) {
		if (maxLength === void 0) {
			maxLength = 60;
		}
		var maxChars = string.indexOf(" ", maxLength);
		if (maxChars > 0 && maxChars < string.length) {
			string =
				string
					.slice(0, maxChars) // Strip down to max length
					.replace(/(.+)\.$/g, "$1") + // Remove trailing period, if any
				"...";
		}
		return string;
	},
	filterDuplicates: function (arr) {
		return arr.filter(function (value, index, self) {
			return value !== null && self.indexOf(value) === index;
		});
	},
	getTranslations: function (path) {
		if (path.match(/key\//)) {
			path = path.replace("key/", "en/");
			console.warn("@annex : The path to translation file for ".concat(path, ' had "key" as a language ; defaulting to "en"'));
		}
		try {
			return require("../i18n/".concat(path, ".json"));
		} catch (e) {
			console.warn("@annex : No translation file found for : ".concat(path));
		}
		return {};
	},
	computerLang: function (l) {
		if (l === "jp") return "ja";
		if (l === "cn") return "zh";
		return l;
	},
	humanLang: function (l) {
		if (l === "ja") return "jp";
		if (l === "zh") return "cn";
		return l;
	},
	getURLParamFromSearch: function (search, param) {
		if (!search) {
			console.error("@annex.getURLParamFromSearch : Please provide a search object.");
			return false;
		}
		if (!param) {
			console.error("@annex.getURLParamFromSearch : Please specify a param to look for in the search object a search object.");
			return false;
		}
		var paramRegex = new RegExp("[?&]".concat(param, "=([^?&]+)"), "i");
		var paramMatch = search.match(paramRegex);
		return (paramMatch === null || paramMatch === void 0 ? void 0 : paramMatch[1]) || false;
	},
	hasCommonValue: function (array1, array2) {
		for (var _i = 0, array1_1 = array1; _i < array1_1.length; _i++) {
			var el = array1_1[_i];
			if (array2.includes(el)) {
				return true;
			}
		}
		return false;
	},
	htmlChars: function (str) {
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
	},
	/**
	 * Compares two arrays of strings. Matches all the values of both arrays and returns true if any value matches in a fuzzy manner.
	 * e.g.:
	 * ["one","two","three"] vs ["thr","four"] would return true.
	 * ["one","two","three"] vs ["four","five"] would return false.
	 */
	arraysFuzzyMatch: function (arr1, arr2) {
		var useArr1 = normalizeArray(arr1);
		var useArr2 = normalizeArray(arr2);
		for (var _i = 0, useArr1_1 = useArr1; _i < useArr1_1.length; _i++) {
			var str1 = useArr1_1[_i];
			var str1Regexp = new RegExp(str1);
			for (var _a = 0, useArr2_1 = useArr2; _a < useArr2_1.length; _a++) {
				var str2 = useArr2_1[_a];
				var str2Regexp = new RegExp(str2);
				if (str1.match(str2Regexp) || str2.match(str1Regexp)) {
					return true;
				}
			}
		}
		return false;
	},
	/**
	 * Function to compare two strings, or two arrays, in a way that's case-insensitive and handles diacritics gracefully.
	 * In the case of two strings, it's a direct comparison. If the two strings are equal, it returns true.
	 * In the case of two arrays, it returns true if there's at least one common value to both arrays.
	 * @param val1
	 * @param val2
	 * @returns Boolean
	 */
	iMatch: function (val1, val2) {
		function stringsMatch(str1, str2) {
			if (str1 === str2) {
				return true;
			} else {
				if (str1 && str2) {
					if (str1.includes(str2) || str2.includes(str1)) {
						return true;
					}
				}
			}
			return false;
		}
		if (typeof val1 === "string" && typeof val2 === "string") {
			var formattedStr1 = normalizeString(val1);
			var formattedStr2 = normalizeString(val2);
			return stringsMatch(formattedStr1, formattedStr2);
		}
		if (typeof val1 === "object" && typeof val2 === "object") {
			var formattedArray1 = normalizeArray(val1);
			var formattedArray2 = normalizeArray(val2);
			for (var _i = 0, formattedArray1_1 = formattedArray1; _i < formattedArray1_1.length; _i++) {
				var formattedStr1 = formattedArray1_1[_i];
				if (formattedArray2.includes(formattedStr1)) {
					return true;
				}
			}
			return false;
		}
		if (typeof val1 === "string" && typeof val2 === "object") {
			var formattedStr1 = normalizeString(val1);
			var formattedArray2 = normalizeArray(val2);
			for (var _a = 0, formattedArray2_1 = formattedArray2; _a < formattedArray2_1.length; _a++) {
				var formattedStr2 = formattedArray2_1[_a];
				if (stringsMatch(formattedStr1, formattedStr2)) {
					return true;
				}
			}
			return false;
		}
		if (typeof val1 === "object" && typeof val2 === "string") {
			var formattedArray1 = normalizeArray(val1);
			var formattedStr2 = normalizeString(val2);
			for (var _b = 0, formattedArray1_2 = formattedArray1; _b < formattedArray1_2.length; _b++) {
				var formattedStr1 = formattedArray1_2[_b];
				if (stringsMatch(formattedStr1, formattedStr2)) {
					return true;
				}
			}
			return false;
		}
		console.error("iMatch : Something happened. Arg 1 is", typeof val1, val1, "; Arg 2 is", typeof val2, val2);
		return false;
	},
	isMobile: function () {
		// Formula from https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
		var hasTouchScreen = false;
		if ("maxTouchPoints" in navigator) {
			hasTouchScreen = navigator.maxTouchPoints > 0;
		} else if ("msMaxTouchPoints" in navigator) {
			hasTouchScreen = navigator["msMaxTouchPoints"] > 0;
		} else {
			var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
			if (mQ && mQ.media === "(pointer:coarse)") {
				hasTouchScreen = !!mQ.matches;
			} else if ("orientation" in window) {
				hasTouchScreen = true; // deprecated, but good fallback
			} else {
				// Only as a last resort, fall back to user agent sniffing
				var UA = navigator.userAgent;
				hasTouchScreen = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
			}
		}
		return hasTouchScreen;
	},
	palette: function () {
		var out = [
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
	},
	pathRegExp: function (path) {
		return new RegExp("^/?".concat(path.replace(/^\/|\/$/g, ""), "/?$"));
	},
	sanitizePath: function (path) {
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
			var decomposePath = path.match(/(?<dPath>.+)(?<dSeparator>[#?])(?<dQuery>.+)/);
			var _a = decomposePath.groups,
				dPath = _a.dPath,
				dQuery = _a.dQuery,
				dSeparator = _a.dSeparator;
			if (dPath && dQuery && dSeparator) {
				return removeUnwantedSlashes("/".concat(dPath, "/")) + dSeparator + dQuery;
			}
		}
		return removeUnwantedSlashes("/".concat(path, "/"));
	},
	shuffle: function (arr) {
		var j, i, x;
		for (i = arr.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = arr[i];
			arr[i] = arr[j];
			arr[j] = x;
		}
		return arr;
	},
	slugify: function (str, preferredChar) {
		if (preferredChar === void 0) {
			preferredChar = "-";
		}
		return str.replace(/(\s|_|-)/g, preferredChar).toLowerCase();
	},
	snakeToPascal: function (str) {
		return str
			.split("_")
			.map(function (word) {
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			})
			.join("");
	},
	sortBy: function (initialObject, sortBy, sortDir) {
		if (sortBy === void 0) {
			sortBy = "name";
		}
		if (sortDir === void 0) {
			sortDir = "asc";
		}
		var out = [];
		if (typeof initialObject === "object") {
			out = Object.entries(initialObject).map(function (e) {
				return __assign(__assign({}, e[1]), { key: e[0] });
			});
		} else {
			out = initialObject;
		}
		if (out.length > 0) {
			out.sort(function (a, b) {
				if (!a[sortBy] && a[sortBy] !== 0) {
					console.debug("Error : Trying to sort by ".concat(sortBy, " ; Object ").concat(a, " doesn't have a \"").concat(sortBy, '" attribute.'));
					return 0;
				}
				var nameA = "".concat(a[sortBy]).toLowerCase(),
					nameB = "".concat(b[sortBy]).toLowerCase();
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
	},
	strIs: function (str, is) {
		var regex = /./;
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
	},
};
module.exports = annex;
