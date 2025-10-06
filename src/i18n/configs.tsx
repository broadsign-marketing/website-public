import { sortBy } from "../assets/annex";

type Lang = { code: string; nameEN: string; name: string; order: number };

const ls: Lang[] = [
	{
		code: "de",
		nameEN: "German",
		name: "Deutsch",
		order: 4,
	},
	{
		code: "en",
		nameEN: "English",
		name: "English",
		order: 1,
	},
	{
		code: "fr",
		nameEN: "French",
		name: "Français",
		order: 2,
	},
	{
		code: "es",
		nameEN: "Spanish",
		name: "Español",
		order: 3,
	},
	{
		code: "pt",
		nameEN: "Portuguese",
		name: "Português",
		order: 5,
	},
	{
		code: "nl",
		nameEN: "Dutch",
		name: "Nederlands",
		order: 6,
	},
	{
		code: "ja",
		nameEN: "Japanese",
		name: "日本語",
		order: 7,
	},
	{
		code: "zh",
		nameEN: "Chinese",
		name: "中文",
		order: 8,
	},
];

const langs = sortBy(ls, "order");

export default langs;
