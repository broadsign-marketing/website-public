import React, { useMemo } from "react";
import clsx from "clsx";

export default function Logo({ id, className, style, alt = "", title = "" }) {
	const logoShape = useMemo(() => {
		const squares = [
			"acura",
			"adelphic",
			"adomni",
			"carrefour",
			"citroen",
			"cleardm",
			"elan",
			"flix",
			"frito_lay",
			"global",
			"hmn",
			"honda",
			"lightbox",
			"mazda",
			"mediamath",
			"nissan",
			"plaxma",
			"publicis",
			"shell",
			"sito",
			"sito",
			"tps",
			"unilever",
			"viadirect",
			"vgi",
			"volkswagen",
			"warner_brothers",
			"ymca",
		];

		const wides = [
			"active_agent",
			"auchan",
			"cartology",
			"elevision",
			"intersection",
			"lumo",
			"nickelodeon",
			"omnicom",
			"sainsburys",
			"screenfeed",
			"starlite",
			"taptap",
			"tesco",
			"westjet",
		];

		// Look for square logos
		if (
			squares.find((imgID) => {
				const searchFormatRegExp = new RegExp(`${imgID}(_(white|grey))?`);
				if (id.match(searchFormatRegExp)) {
					return true;
				}
				return false;
			})
		) {
			return "square";
		}

		// Look for wide logos
		if (
			wides.find((imgID) => {
				const searchFormatRegExp = new RegExp(`${imgID}(_(white|grey))?`);
				if (id.match(searchFormatRegExp)) {
					return true;
				}
				return false;
			})
		) {
			return "wide";
		}

		return "regular";
	}, [id]);

	const format = useMemo(() => {
		const pngs = [
			"aclub",
			"amplifi",
			"arrow",
			"asiaray",
			"aspace",
			"avixa",
			"blue_bite",
			"bo",
			"caasie",
			"cartology",
			"clearchannel",
			"cleardm",
			"cleardm_symbol",
			"clubdm",
			"dsf",
			"elan",
			"elevision",
			"fepe",
			"flix",
			"form_srping_2019_logo",
			"frito_lay",
			"g2d",
			"google_ad_manager",
			"gpo_vallas",
			"gv",
			"infini",
			"juice_cover",
			"laysa",
			"lightbox_dark",
			"lumo",
			"massiva",
			"mp",
			"oh",
			"omnicom",
			"oohmedia",
			"outcome_health",
			"outedge",
			"plan_b",
			"plaxma",
			"publicis",
			"public_mobile",
			"qms",
			"quividi",
			"rajawali",
			"rzk_digital",
			"sage_archer",
			"sawa",
			"screenfeed",
			"shopper",
			"shuttle",
			"sito",
			"splash_cover",
			"starlite",
			"the_keg",
			"the_neuron",
			"tint",
			"tmtfactory",
			"tps",
			"ubimo",
			"viadirect",
			"vmo",
			"westfield",
			"xite",
		];

		if (
			pngs.find((imgID) => {
				const searchPNGsRegExp = new RegExp(`^${imgID}(_(white|grey|reflex))?$`);
				if (id.match(searchPNGsRegExp)) {
					return true;
				}
				return false;
			})
		) {
			return "png";
		}

		return "svg";
	}, [id]);

	const alts = require("../assets/logos_alts.json");
	const pureID = id.replace(/(_white|_grey|_reflex)/g, "");

	if (alts[pureID]) {
		if (title === "") {
			title = alts[pureID];
		}

		if (alt === "") {
			alt = `${alts[pureID]} Logo`;
		}
	}

	return (
		<div className={clsx("logo", id, `id_${pureID}`, className, "shape_" + logoShape)} style={style}>
			<img src={`/img/logos/${id}.${format}`} className={id} width="160" height="80" alt={alt} title={title} loading="lazy" />
		</div>
	);
}
