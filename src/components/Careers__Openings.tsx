import React, { useCallback, useEffect, useMemo, useState } from "react";
import T from "i18n-react";
import clsx from "clsx";
import { iMatch } from "@annex";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton } from "react-share";

import Autocomplete from "@components/Autocomplete";
import CTA from "@components/CTA";
import Panel from "@components/Panel";
import Link from "@components/LocalizedLink";

import icon_department from "@icons/department.svg";
import icon_location from "@icons/location.svg";
import icon_search from "@icons/search.svg";
import icon_alert from "@icons/careers_alert.svg";
import icon_share from "@icons/share.svg";

import icon_social_media_email from "@img/icons/social_media_email_cerulean.svg";
import icon_social_media_facebook from "@img/icons/social_media_facebook_cerulean.svg";
import icon_social_media_linkedin from "@img/icons/social_media_linkedin_cerulean.svg";

type Filter = boolean | string;

type SearchFilters = {
	department: Filter;
	location: Filter;
	text: Filter;
	sort: Filter;
	direction: "asc" | "desc";
};

interface ShareMenuProps {
	url: string;
	reset: boolean;
}

interface CareersSectionOpeningsProps {
	preselectLocation: string;
}

function ShareMenu({ url = "", reset = false }: ShareMenuProps) {
	const [isActive, setIsActive] = useState(false);

	const toggleIsOpen = () => {
		setIsActive(!isActive);
	};

	useEffect(() => {
		if (reset) {
			setIsActive(false);
		}
	}, [reset]);

	return (
		<div className="share flex justify-content-end ml-4">
			<div className="CTA primary" onClick={() => toggleIsOpen()} role="button">
				<div className={clsx("share_menu", isActive ? "active" : "")}>
					<div className="inner">
						<FacebookShareButton url={url}>
							<img src={icon_social_media_facebook} alt={T.translate("shareFacebook")} title={T.translate("shareFacebook")} />
						</FacebookShareButton>
						<LinkedinShareButton url={url}>
							<img src={icon_social_media_linkedin} alt={T.translate("shareLinkedin")} title={T.translate("shareLinkedin")} />
						</LinkedinShareButton>
						<EmailShareButton url={url}>
							<img src={icon_social_media_email} alt={T.translate("shareEmail")} title={T.translate("shareEmail")} />
						</EmailShareButton>
					</div>
				</div>
				<img src={icon_share} alt="" />
			</div>
		</div>
	);
}

export default function Careers__Openings({ preselectLocation = "" }: CareersSectionOpeningsProps) {
	const [departments, setDepartments] = useState([]);
	const [locations, setLocations] = useState([]);
	const [filteredOpenings, setFilteredOpenings] = useState([]);
	const [filters, setFilters] = useState<SearchFilters>({ department: "", location: "", text: "", sort: "", direction: "asc" });
	const [isTextFilterFieldFocused, setIsTextFilterFieldFocused] = useState(false);
	const [openings, setOpenings] = useState([]);
	const [emitShareMenusReset, setEmitShareMenusReset] = useState<boolean>(false);
	const [maxOpenings, setMaxOpenings] = useState<number>(10);

	const updateFilters = useCallback(
		(targetFilter, value): void => {
			if (typeof filters[targetFilter] !== undefined) {
				let out: SearchFilters = { ...filters };
				if (value.length > 0) {
					out[targetFilter] = value;
				} else {
					out[targetFilter] = "";
				}
				setFilters(out);
			}
		},
		[filters]
	);

	const resetShareMenus = useCallback((): void => {
		setEmitShareMenusReset(true);

		setTimeout(() => {
			setEmitShareMenusReset(false);
		}, 600);
	}, []);

	useEffect(() => {
		function removeDuplicateLocations(arr) {
			return arr.filter((value, index, self) => index === self.findIndex((t) => t.label === value.label));
		}

		function formatDisplayLocation(str: string) {
			const split: string | string[] = str.split(",");
			if (typeof split === "object" && split.length === 3) {
				return `${split[0]}, ${split[2]}`.replace(/\s{2,}/, " ");
			}
			return str;
		}

		async function getOpenings() {
			let lang = T.translate("key") === "fr" ? "fr" : "";
			let response = await fetch(`https://boards.greenhouse.io/v1/boards/broadsign${lang}/departments`);
			let data = await response.json();

			if (data) {
				let _departments = [{ label: T.translate("openings.allDepartments"), value: "", default: true }];
				let _locations = [];
				let _openings = [];

				data.departments.forEach((department) => {
					if (department.jobs.length === 0) {
						return;
					}

					_departments.push({ label: department.name.trim(), value: department.name.trim() });

					department.jobs.forEach((job) => {
						_openings.push({
							id: job.id,
							department: department.name.trim(),
							link: job.absolute_url.trim(),
							location: job.location.name.trim(),
							displayLocation: formatDisplayLocation(job.location.name.trim()),
							title: job.title.trim(),
						});

						_locations.push({ label: formatDisplayLocation(job.location.name.trim()), value: job.location.name.trim() });
					});
				});

				setDepartments(_departments.sort());
				setLocations(removeDuplicateLocations(_locations));
				setOpenings(_openings);
			}
		}

		getOpenings();
	}, []);

	useEffect(() => {
		let out = openings;

		if (filters.text !== "") {
			out = out.filter((opening) => iMatch(filters.text, [opening.title, /* opening.department, */ opening.displayLocation].join()));
		}

		if (filters.department !== "" && filters.department !== "All departments") {
			out = out.filter((opening) => iMatch(filters.department, opening.department));
		}

		if (filters.location !== "") {
			out = out.filter((opening) => iMatch(filters.location, opening.displayLocation));
		}

		setFilteredOpenings(out);
	}, [openings, filters]);

	useEffect(() => {
		if (preselectLocation !== "") {
			updateFilters("location", preselectLocation);
		}
	}, [preselectLocation]);

	return (
		<div className="openings_wrapper mb-20">
			<p className="subtitle-1 gradient text-center">{T.translate("openings.overtitle")}</p>
			<h2 className="h4 text-center">{T.translate("openings.title")}</h2>
			<div className="job_search">
				<form className="toolbar">
					<Autocomplete
						className="toolbar_input input_style_gray list_departments"
						data={departments}
						initialValue={filters.department}
						placeholder={T.translate("openings.departments")}
						onChange={(val) => updateFilters("department", val)}
						icon={icon_department}
						clearable={true}
					/>
					<Autocomplete
						className="toolbar_input input_style_gray list_locations"
						data={locations}
						initialValue={filters.location}
						placeholder={T.translate("openings.locations")}
						onChange={(val) => updateFilters("location", val)}
						icon={icon_location}
						clearable={true}
					/>
					<div className={clsx("toolbar_input input_style_gray text_search", isTextFilterFieldFocused ? "focused" : "")}>
						<img src={icon_search} className="input_field_icon" alt="" />
						<input
							type="text"
							defaultValue={filters.text}
							placeholder={T.translate("openings.keywords")}
							className="with_icon"
							onKeyUp={(evt) => updateFilters("text", (evt.target as HTMLInputElement).value)}
							onFocus={() => setIsTextFilterFieldFocused(true)}
							onBlur={() => setTimeout(() => setIsTextFilterFieldFocused(false), 100)}
						/>
					</div>
				</form>
				{filteredOpenings.length === 0 && <p className="h3 text-center no_results">{T.translate("openings.noResults")}</p>}
				{filteredOpenings.length > 0 && (
					<div className={clsx("openings_scroll", filteredOpenings.length > 4 ? "mb-40" : "mb-20")} onMouseLeave={() => resetShareMenus()}>
						{filteredOpenings.slice(0, maxOpenings).map((opening) => (
							<div className="listing grid line-height-140 align-items-center py-4" key={opening.id}>
								<div className="title col-8 sm:col-12">
									<Link className="" to={opening.link}>
										{opening.title}
									</Link>
								</div>
								<div className="location col-12 text-right sm:text-left">{opening.displayLocation}</div>
								<div className="flex col-12 justify-content-end sm:col-12">
									<div className="apply">
										<CTA className="primary" to={opening.link}>
											{T.translate("openings.apply")}
										</CTA>
									</div>
									<ShareMenu url={opening.link} reset={emitShareMenusReset} />
								</div>
							</div>
						))}
						{maxOpenings < 1000 && filteredOpenings.length > 4 && (
							<p className="text-center">
								<CTA className="cerulean view_all" onClick={() => setMaxOpenings(1000)}>
									{T.translate("openings.viewAll")}
								</CTA>
							</p>
						)}
					</div>
				)}
			</div>
			<Panel color="ultra" className="ats rounded-8">
				<img src={icon_alert} className="icon" alt="" />
				<p>
					<span>{T.translate("ats.par1")}</span> <span>{T.translate("ats.par2")}</span>
				</p>
				<div className="cta">
					<CTA className="blue" onClick={() => console.log("to be implemented if ever we have a job openings newsletter available")}>
						{T.translate("ats.cta")}
					</CTA>
				</div>
			</Panel>
		</div>
	);
}
