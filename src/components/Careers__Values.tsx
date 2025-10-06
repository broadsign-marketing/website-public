import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import T from "i18n-react";
import clsx from "clsx";

import { GatsbyImage as Img } from "gatsby-plugin-image";

import icon_quote from "@img/pages/careers/icon_quote.svg";
import values_empower from "@img/pages/careers/values_empower.svg";
import values_great_things from "@img/pages/careers/values_great_things.svg";
import values_respect from "@img/pages/careers/values_respect.svg";
import values_right_thing from "@img/pages/careers/values_right_thing.svg";
import values_say_do from "@img/pages/careers/values_say_do.svg";

type ValueProps = {
	icon_active: string;
	icon_normal: string;
	id: string;
	text: string;
};

type ValueHoverableProps = { isActive: boolean; value: ValueProps; icon: string; onInteract: Function };

interface CareersSectionValuesProps {
	values: Value[];
	onChangeValue?: Function;
}

function ValueHoverable({ isActive, value, icon, onInteract }: ValueHoverableProps) {
	return (
		<div
			className={clsx("value_hoverable flex flex-row align-items-center justify-content-center py-4 sm:justify-content-start", {
				active: isActive,
			})}
			onMouseEnter={() => onInteract()}
			onMouseOver={() => onInteract()}>
			<img className="icon sm:mr-5" src={icon} alt={value} />
			<p className="text-reflex text-20 font-bold m-0 hidden sm:block">{value}</p>
		</div>
	);
}

function ValueQuote({ value, portrait, isActive }) {
	const { quote, sign } = value.quote;

	return (
		<div className={clsx("value_quote", { active: isActive })}>
			<p className="text-reflex text-20 font-bold mb-8 sm:hidden">{value.label}</p>
			<img className="icon_quote mb-6" src={icon_quote} alt="" />
			<p className="text-reflex font-serif line-height-180 mb-8">{quote}</p>
			<div className="flex flex-row align-items-center">
				<Img image={portrait} className="value_quote_portrait rounded-full overflow-hidden mr-4" alt={sign} />
				<span className="text-16">{sign}</span>
			</div>
		</div>
	);
}

export default function Careers__Values() {
	const [activeValue, setActiveValue] = useState<string>("empower");

	const data = useStaticQuery(graphql`
		query CareersValuesQuery {
			portrait_danny_baldoni: file(relativePath: { eq: "pages/careers/portrait_danny_baldoni.png" }) {
				...img
			}
			portrait_karoliina_paukku: file(relativePath: { eq: "pages/careers/portrait_karoliina_paukku.png" }) {
				...img
			}
			portrait_jarnail_singh: file(relativePath: { eq: "pages/careers/portrait_jarnail_singh.png" }) {
				...img
			}
			portrait_alexandra_roa: file(relativePath: { eq: "pages/careers/portrait_alexandra_roa.png" }) {
				...img
			}
			portrait_rob_cote: file(relativePath: { eq: "pages/careers/portrait_rob_cote.png" }) {
				...img
			}
		}
	`);

	const values = T.texts.values.list;

	const icons = {
		empower: values_empower,
		great_things: values_great_things,
		respect: values_respect,
		right_thing: values_right_thing,
		say_do: values_say_do,
	};

	return (
		<div className="mb-16 sm:mb-30">
			<p className="subtitle-1 gradient block text-center mx-auto">{T.translate("values.overtitle")}</p>
			<h2 className="h4 text-center">{T.translate("values.title")}</h2>
			<div className="values_wrapper flex flex-column flex-nowrap sm:flex-row">
				<div className="w-full flex flex-row sm:w-6 sm:flex-column z-1">
					{values.map((v) => (
						<ValueHoverable value={v.label} icon={icons[v.id]} onInteract={() => setActiveValue(v.id)} isActive={activeValue === v.id} key={v.id} />
					))}
				</div>
				<div className="quote_wrapper w-full px-4 py-8 z-2 sm:px-12 sm:py-10 sm:w-6">
					<div className="relative">
						{values.map((v) => (
							<ValueQuote
								value={v}
								portrait={data[`portrait_${v.quote.portrait}`].childImageSharp.gatsbyImageData}
								isActive={activeValue === v.id}
								key={v.id}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
