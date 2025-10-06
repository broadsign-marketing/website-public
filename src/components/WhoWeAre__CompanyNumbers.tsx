import React, { memo, useMemo } from "react";
//import clsx from "clsx";
import { useL } from "@hooks/useDico";

import icon_countries from "@img/pages/who-we-are/icon_countries.svg";
import icon_employees from "@img/pages/who-we-are/icon_employees.svg";
import icon_signs from "@img/pages/who-we-are/icon_signs.svg";

import "@sass/components/WhoWeAreCompanyNumbers.scss";

type AvailLangs = "en" | "fr" | "es" | "de" | "ja" | "zh";

const WhoWeAre__CompanyNumbers = memo(function WhoWeAre__CompanyNumbers(): JSX.Element | null {
	const l: AvailLangs = useL();

	const __ = useMemo(() => {
		return {
			en: {
				countries: { num: "107", what: "Countries" },
				signs: { num: "2 million", what: "Signs" },
				employees: { num: "300", what: "Employees" },
			},
			fr: {
				countries: {
					num: "107",
					what: "Pays",
				},
				signs: {
					num: "2 millions",
					what: "de Panneaux",
				},
				employees: {
					num: "300",
					what: "Employés",
				},
			},
			es: {
				countries: { num: "107", what: "Países" },
				signs: { num: "2 millónes", what: "de letreros" },
				employees: { num: "300", what: "Empleados" },
			},
			de: {
				countries: {
					num: "107",
					what: "Ländern",
				},
				signs: {
					num: "2 Mio",
					what: "Anzeigetafeln",
				},
				employees: {
					num: "300",
					what: "Mitarbeiter",
				},
			},
			ja: {
				countries: { num: "107", what: "カ国に展開" },
				signs: { num: "150万", what: "のスクリーン" },
				employees: { num: "300", what: "人のメンバー" },
			},
			zh: {
				countries: { num: "107", what: "个国家" },
				signs: { num: "150万", what: "标识" },
				employees: { num: "300", what: "名员工" },
			},
		}[l];
	}, [l]);

	return (
		<div className="CompanyNumbers flex flex-wrap mx-auto sm:flex-nowrap sm:align-items-center sm:justify-content-between">
			<div className="stat_card">
				<div className="flex flex-row flex-nowrap align-items-center justify-content-center w-full">
					<img src={icon_countries} alt="" className="stat_icon mr-3 object-fit-contain" />
					<div className="flex flex-column flex-nowrap">
						<span className="num font-black">{__.countries.num}</span>
						<span className="what font-bold">{__.countries.what}</span>
					</div>
				</div>
			</div>
			<div className="separator hidden sm:block"></div>
			<div className="stat_card card_even">
				<div className="flex flex-row flex-nowrap align-items-center justify-content-center w-full">
					<img src={icon_signs} alt="" className="stat_icon mr-3 object-fit-contain" />
					<div className="flex flex-column flex-nowrap">
						<span className="num font-black">{__.signs.num}</span>
						<span className="what font-bold">{__.signs.what}</span>
					</div>
				</div>
			</div>
			<div className="separator hidden sm:block"></div>
			<div className="stat_card">
				<div className="flex flex-row flex-nowrap align-items-center justify-content-center w-full">
					<img src={icon_employees} alt="" className="stat_icon mr-3 object-fit-contain" />
					<div className="flex flex-column flex-nowrap">
						<span className="num font-black">{__.employees.num}</span>
						<span className="what font-bold">{__.employees.what}</span>
					</div>
				</div>
			</div>
		</div>
	);
});

export default WhoWeAre__CompanyNumbers;
