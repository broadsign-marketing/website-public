import T from "i18n-react";

interface formatDateProps {
	date: string;
	lang: string;
	time: string;
	showDay: boolean;
	showYear: boolean;
	timezone: string;
}

export const useFormatDate = ({ date, lang = false, time = "00:00", showDay = false, showYear = true, timezone = "ET" }) => {
	function isDST(d) {
		let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
		let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
		return Math.max(jan, jul) !== d.getTimezoneOffset();
	}

	const l = lang || T.translate("key");

	if (!date || !date.match(/(\d{4}-\d{2}-\d{2}|TBD)/)) {
		console.debug(
			`useFormatDate(date, lang="en", time="00:00") : Argument 'date' should be a String in the form 'YYYY-MM-DD' or 'TBD' (received '${date}')`
		);
		return "";
	}

	if (!time.match(/\d{2}:\d{2}/)) {
		console.debug(`Function formatDate(date, lang="en", time="00:00") : Argument 'time' should be a String in the form 'HH:MM' (received '${time}')`);
		return "";
	}

	if (String(date).toUpperCase() === "TBD") {
		return "TBD";
	}

	const dateTimestamp = new Date(new Date(date).getTime());
	const tzoffset: number = isDST(dateTimestamp)
		? new Date(dateTimestamp.getFullYear(), 6, 1).getTimezoneOffset() * 60000
		: new Date(dateTimestamp.getFullYear(), 0, 1).getTimezoneOffset() * 60000;
	const d: Date = new Date(new Date(date).getTime() + tzoffset);
	const day: string = String(d.getDate());
	const month: string = d.toLocaleString(l, { month: "long" });
	const year: string = String(d.getFullYear());

	let dayOfWeek = "";
	if (showDay) {
		dayOfWeek = d.toLocaleString(l, { weekday: "long" });
	}

	const t: string[] = time.match(/(\d{2}):(\d{2})/);
	let hours: number = parseInt(t[1]);
	let minutes: number = parseInt(t[2]);

	let ampm: string = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 === 0 ? 12 : hours % 12;

	let out = "";

	if (l === "fr") {
		timezone = "HE";
	}

	switch (l) {
		case "es":
		case "pt":
			if (showDay) {
				out += `${dayOfWeek}, `;
			}
			out += `${day} de ${month}`;
			if (showYear) {
				out += ` de ${year}`;
			}
			if (time !== "00:00") {
				out += ` a las ${hours}:${minutes}`;
			}
			break;
		case "fr":
			if (showDay) {
				out += `${dayOfWeek}, `;
			}
			out += `${day} ${month}`;
			if (showYear) {
				out += ` ${year}`;
			}
			if (time !== "00:00") {
				out += ` à ${hours}:${minutes} ${timezone}`;
			}
			break;
		case "en":
		default:
			if (showDay) {
				out += `${dayOfWeek}, `;
			}
			out += `${month} ${day}`;
			if (showYear) {
				out += `, ${year}`;
			}
			if (time !== "00:00") {
				out += " at ";
				if (minutes !== 0) {
					out += hours + ":" + String(minutes).padStart(2, "0") + ampm + " " + timezone;
				} else {
					out += hours + ampm + " " + timezone;
				}
			}
	}

	return out;
};
