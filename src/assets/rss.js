const annex = require("./annex.js");

const rss = {
	getAuthorEmail: (name) => {
		const authors = [
			{ email: "rob.cote@broadsign.com", regex: /rob/ },
			{ email: "kayla.caticchio@broadsign.com", regex: /kayla/ },
			{ email: "kristen.theodore@broadsign.com", regex: /kristen/ },
			{ email: "catherine.lee@broadsign.com", regex: /catherine/ },
			{ email: "christian.dion@broadsign.com", regex: /christian/ },
			{ email: "burr.smith@broadsign.com", regex: /burr/ },
			{ email: "samantha.brault@broadsign.com", regex: /samantha/ },
			{ email: "michelle.huang@broadsign.com", regex: /michelle/ },
			{ email: "harleen.tumber@broadsign.com", regex: /harleen/ },
			{ email: "stephanie.gutnik@broadsign.com", regex: /stephanie/ },
		];

		for (const author of authors) {
			const { email, regex } = author;
			if (name.match(regex)) {
				return `${email} (${name})`;
			}
		}

		return "broadsign-info@broadsign.com (Broadsign)";
	},
	formatContent: (str) => {
		let out = str
			.replace(/\[[^\]]+\]/g, "")
			.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, "")
			.replace(/class=".+"/g, "");
		out = out.replace(/<iframe.+<\/iframe>/g, "");
		out = out.replace(/<script.+<\/script>/g, "");
		out = out.replace(/<br\s*\/*>/g, "");
		out = out.replace(/“/g, '"').replace(/”/g, '"');
		out = out.replace(/<img\s*\/>/g, "");
		out = out.replace(/\/\/blog/g, "/blog");
		out = out.replace(/([",])[\s]?(\/static\/[^\s",]+\.(jpg|jpeg|webp|png))/g, "$1https://broadsign.com$2");

		return out;
	},
	formatDescription: (str, lang) => {
		if (lang === "fr") {
			return str.replace("writers.broadsign.com", `${process.env.SITE_URL}fr/blogue/${str}`);
		}
		return str.replace("writers.broadsign.com", `${process.env.SITE_URL}blog`);
	},
	formatTitle: (str) => {
		let out = "";
		if (str) {
			out = str
				.replace(/&#8217;/g, "'")
				.replace(/&#8211;/g, "-")
				.replace(/&#038;/g, "&")
				.replace(/&#039;/g, "'")
				.replace(/&amp;/gi, "&")
				.replace(/&#160;/gi, " ");
		}
		return out;
	},
	formatURL: (str, lang) => {
		return `${process.env.SITE_URL}${annex.blogPostSlug(str, lang).replace(/^\//, "")}`;
	},
};

module.exports = rss;
