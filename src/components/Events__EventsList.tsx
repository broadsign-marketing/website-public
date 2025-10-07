import React, { useCallback, useEffect, useMemo, useState } from "react";
import T from "i18n-react";
import { useFormatDate } from "@hooks/useFormatDate";
import { slugify } from "@annex";

import EmptyEventsList from "@components/Events__EmptyEventsList";
import EventBox from "@components/Events__EventBox";
import Container from "@components/Container";
import Loading from "@components/Loading";

type Event = {
	id: string | number;
	title: string;
	slug?: string;
	thumbnail?: IGatsbyImageData;
	to?: string;
	dateStartYear?: string;
	dateStart?: string;
	dateEnd?: string;
	location?: string;
	isFeatured?: boolean;
	salesforceCampaign?: string;
	date: string;
	description?: string;
	isArchived?: boolean;
	googleCalendarLink?: string;
	outlookCalendarLink?: string;
	icsFile?: string;
};

type EventCalendarLinkBuildObject = {
	title: string;
	content: string;
	dateStart: string;
	dateEnd: string;
	location: string;
	calendar: string;
};

type WpEvent = {
	title: string;
	slug: string;
	eventOptions: {
		dateEnd: string;
		dateStart: string;
		hasEndDate: boolean;
		location: string;
		isFeatured: boolean;
		salesforceCampaign: string;
	};
	featuredImage: IGatsbyImageData;
};

function createGoogleCalendarLink() {
	/*
	"googleCalendarLink": "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20250605T023000Z%2F20250605T050000Z&details=Following%20the%20WOO%20Welcome%20Reception%2C%20join%20Broadsign%20for%20our%20exclusive%20OOH%20Social%20event%2C%20where%20industry%20leaders%20will%20come%20together%20for%20unparalleled%20networking%20opportunities%20and%20local%20cocktails.%20Taking%20place%20in%20%3Ca%20href%3D%22https%3A%2F%2Fbroadsign.com%2Fevents%2Fooh-social-mexico%2F%22%20target%3D%22_blank%22%3EMexico%3C%2Fa%3E%2C%20this%20edition%20provides%20the%20ideal%20backdrop%20for%20meaningful%20connections%20and%20lively%20discussions%20on%20the%20latest%20innovations%20and%20trends%20shaping%20the%20future%20of%20OOH.&location=La%20%C3%9Anica%20CDMX%2C%20Anatole%20France%2098%2C%20Polanco%20III%20Secci%C3%B3n%2C%20Miguel%20Hidalgo%2C%2011550%20Ciudad%20de%20M%C3%A9xico%2C%20CDMXLa%20%C3%9Anica%20CDMX%2C%20Anatole%20France%2098%2C%20Polanco%20III%20Secci%C3%B3n%2C%20Miguel%20Hidalgo%2C%2011550%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX&text=OOH%20Social%20Mexico",
	"outlookCalendarLink": "https://outlook.live.com/calendar/0/action/compose?allday=false&body=Following%20the%20WOO%20Welcome%20Reception%2C%20join%20Broadsign%20for%20our%20exclusive%20OOH%20Social%20event%2C%20where%20industry%20leaders%20will%20come%20together%20for%20unparalleled%20networking%20opportunities%20and%20local%20cocktails.%20Taking%20place%20in%20%3Ca%20href%3D%22https%3A%2F%2Fbroadsign.com%2Fevents%2Fooh-social-mexico%2F%22%20target%3D%22_blank%22%3EMexico%3C%2Fa%3E%2C%20this%20edition%20provides%20the%20ideal%20backdrop%20for%20meaningful%20connections%20and%20lively%20discussions%20on%20the%20latest%20innovations%20and%20trends%20shaping%20the%20future%20of%20OOH.&enddt=2025-06-05T01%3A00%3A00&location=La%20%C3%9Anica%20CDMX%2C%20Anatole%20France%2098%2C%20Polanco%20III%20Secci%C3%B3n%2C%20Miguel%20Hidalgo%2C%2011550%20Ciudad%20de%20M%C3%A9xico%2C%20CDMXLa%20%C3%9Anica%20CDMX%2C%20Anatole%20France%2098%2C%20Polanco%20III%20Secci%C3%B3n%2C%20Miguel%20Hidalgo%2C%2011550%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2025-06-04T22%3A30%3A00&subject=OOH%20Social%20Mexico",
	"icsFileLink": "https://marketing.broadsign.com/hubfs/ICS/2025_06_ooh_social_mexico.ics",
	*/
	return "";
}

function createOutlookCalendarLink() {
	return "";
}

function createICSFile() {
	return "";
}

function createCalendarLink(props: EventCalendarLinkBuildObject): string | void {
	if (!props.content) {
		return; //console.warn("createCalendarLink() : Calendar invite needs content.");
	}

	if (!props.calendar) {
		return; //console.warn("createCalendarLink() : Please specify a calendar.");
	}

	if (props.calendar === "google") {
		return createGoogleCalendarLink(props);
	} else if (props.calendar === "outlook") {
		return createOutlookCalendarLink(props);
	} else if (props.calendar === "ics") {
		return createICSFile(props);
	} else {
		return "";
	}
}

export default function EventsList({ l, today, eventsFromWP, eventsFromBaserow, highlight, onClickEvent }) {
	function formatDateRange(date1: string, date2: string): string {
		const tzoffset: number = new Date().getTimezoneOffset() * 60000;
		const dateRegex = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hours>\d{2}):(?<minutes>\d{2})/;
		const start = date1.match(dateRegex)?.groups;
		const end = date2.match(dateRegex)?.groups;
		const localizedMonth = new Date(new Date(date1).getTime()).toLocaleString(l, { month: "long" });

		if (!start || !end) {
			console.debug(`At least one of the dates (${date1}, ${date2}) isn't formatted properly. Make sure they're all in the form YYYY-MM-DD.`);
			return "";
		}

		if (date1 === date2) {
			// Return "April 24, 2022"
			return `${useFormatDate({ date: date1 })}`;
		} else if (start.year === end.year && start.month === end.month && start.day === end.day && start.hours !== end.hours) {
			const formattedTime = new Date(date1).toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: start.minutes === "00" ? undefined : "numeric",
				hour12: true,
			});

			return `${useFormatDate({ date: date1 })} at ${formattedTime}`;
		} else if (start.year !== end.year) {
			// Return "April 24, 2022 – April 24, 2023"
			return `${useFormatDate({ date: date1 })} – ${useFormatDate({ date: date2 })}`;
		} else if (start.month !== end.month) {
			// Return "April 24 – May  24, 2022"
			return `${useFormatDate({ date: date1, showYear: false })} – ${useFormatDate({ date: date2, showYear: false })}, ${end.year}`;
		} else if (start.day !== end.day) {
			// Return "April 24-26, 2022"
			const startDay = parseInt(start.day);
			const startEnd = parseInt(end.day);

			switch (l) {
				case "fr":
					return `${startDay} au ${startEnd} ${localizedMonth} ${end.year}`;
				case "es":
					return `${startDay} al ${startEnd} de ${localizedMonth} de ${end.year}`;
				case "en":
				default:
					return `${localizedMonth} ${startDay}-${startEnd}, ${end.year}`;
			}
		}

		console.debug(`No date was returned for some reason. An edge case ? (${date1}, ${date2})`);
		return "";
	}

	const [clientEvents, setClientEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const [serverEvents, setServerEvents] = useState((): Event[] => {
		const today = new Date().toISOString().slice(0, 10);
		const tzoffset: number = new Date().getTimezoneOffset() * 60000;

		const baserowEventsServer: Event[] = eventsFromBaserow.map((event) => {
			const id = event.id;
			const title = event["Name"];
			const location = event["Location"];
			const content = event["Calendar Invite Description EN"];
			const thumbnail = event["Image"][0]?.url || false;

			const dateStart = event["Date Start"] ? new Date(new Date(event["Date Start"]).getTime() - tzoffset).toISOString() : "";
			const dateEnd = event["Date End"] ? new Date(new Date(event["Date End"]).getTime() - tzoffset).toISOString() : dateStart;

			if (dateEnd < today || !title || !thumbnail) return null;

			let out = {
				id,
				title,
				slug: slugify(title),
				dateStart,
				dateStartYear: dateStart.slice(0, 4),
				dateEnd,
				location,
				isArchived: false,
				isFeatured: event["Featured"],
				salesforceCampaign: event["Salesforce Campaign"],
				thumbnail,
				date: formatDateRange(dateStart, dateEnd),
				googleCalendarLink: createCalendarLink({ title, content, dateStart, dateEnd, location, calendar: "google" }),
				outlookCalendarLink: createCalendarLink({ title, content, dateStart, dateEnd, location, calendar: "outlook" }),
				icsFile: createCalendarLink({ title, content, dateStart, dateEnd, location, calendar: "ics" }),
			};

			return out;
		});

		const wpEvents: WpEvent[] = eventsFromWP.map((event) => {
			const { id, title, slug, content } = event;
			const { location, isFeatured, salesforceCampaign } = event.eventOptions;
			const thumbnail = event?.featuredImage?.node?.gatsbyImage;

			let _dateStart = event.eventOptions.dateStart.slice(0, 10).replace(/\//g, "-");
			if (_dateStart.match(/^\d{2}-\d{2}-\d{4}$/)) {
				_dateStart = _dateStart.split("-").reverse().join("-");
			}
			let _dateEnd = event.eventOptions.dateEnd ? event.eventOptions.dateEnd.slice(0, 10).replace(/\//g, "-") : "";
			if (_dateEnd.match(/^\d{2}-\d{2}-\d{4}$/)) {
				_dateEnd = _dateEnd.split("-").reverse().join("-");
			}

			const dateStart = _dateStart ? new Date(new Date(_dateStart).getTime()).toISOString() : "";
			const dateEnd = _dateEnd ? new Date(new Date(_dateEnd).getTime()).toISOString() : dateStart;

			if (dateEnd < today || !thumbnail) return null;

			let out = {
				id,
				title,
				slug,
				dateStart,
				dateStartYear: dateStart.slice(0, 4),
				dateEnd,
				location,
				isArchived: false,
				isFeatured,
				salesforceCampaign,
				thumbnail: event.featuredImage.node.gatsbyImage,
				date: formatDateRange(dateStart, dateEnd),
				googleCalendarLink: createCalendarLink({ title, content, dateStart, dateEnd, location, calendar: "google" }),
				outlookCalendarLink: createCalendarLink({ title, content, dateStart, dateEnd, location, calendar: "outlook" }),
				icsFile: createCalendarLink({ title, content, dateStart, dateEnd, location, calendar: "ics" }),
			};

			// Exceptions
			if (slug === "new-revenue-same-shelf-webinar") {
				out.date = "September 9, 2025 at 12PM AEST";
			}

			return out;
		});

		let out = [...baserowEventsServer, ...wpEvents]
			.filter(Boolean)
			.sort((a, b) => {
				if (a.dateStart < b.dateStart) return -1;
				if (a.dateStart > b.dateStart) return 1;
				return 0;
			})
			.sort((a, b) => {
				if (a.isFeatured && !b.isFeatured) return -1;
				return 0;
			});

		return out;
	});

	async function fetchClientEventsFromBaserow() {
		const tzoffset: number = new Date().getTimezoneOffset() * 60000;

		const response = await fetch(
			"https://api.baserow.io/api/database/rows/table/679522/?user_field_names=true&filters=%7B%22filter_type%22%3A%22AND%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22boolean%22%2C%22field%22%3A%22Display%22%2C%22value%22%3A%221%22%7D%5D%2C%22groups%22%3A%5B%7B%22filter_type%22%3A%22OR%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22date_is_on_or_after%22%2C%22field%22%3A%22Date%20Start%22%2C%22value%22%3A%22America%2FToronto%3F%3Ftoday%22%7D%2C%7B%22type%22%3A%22date_is_on_or_after%22%2C%22field%22%3A%22Date%20End%22%2C%22value%22%3A%22America%2FToronto%3F%3Ftoday%22%7D%5D%2C%22groups%22%3A%5B%5D%7D%5D%7D",
			{
				method: "GET",
				headers: {
					Authorization: `Token ${process.env.GATSBY_BASEROW_TOKEN}`,
				},
			}
		);

		const data = await response.json();

		const formattedData = data.results
			.map((event) => {
				const id = event.id;
				const title = event["Name"];
				const location = event["Location"];
				const content = event["Calendar Invite Description EN"];
				const thumbnail = event["Image"][0]?.url || false;

				const dateStart = event["Date Start"] ? new Date(new Date(event["Date Start"]).getTime()).toISOString() : "";
				const dateEnd = event["Date End"] ? new Date(new Date(event["Date End"]).getTime()).toISOString() : dateStart;

				if (dateEnd < today || !title || !thumbnail) return null;

				return {
					id,
					title,
					slug: slugify(title),
					dateStart,
					dateStartYear: dateStart.slice(0, 4),
					dateEnd,
					location,
					isArchived: false,
					isFeatured: event["Featured"],
					salesforceCampaign: event["Salesforce Campaign"],
					thumbnail,
					date: formatDateRange(dateStart, dateEnd),
					googleCalendarLink: createCalendarLink({ title, content, dateStart, dateEnd, location, calendar: "google" }),
					outlookCalendarLink: createCalendarLink({ title, content, dateStart, dateEnd, location, calendar: "outlook" }),
					icsFile: createCalendarLink({ title, content, dateStart, dateEnd, location, calendar: "ics" }),
				};
			})
			.filter(Boolean);

		setClientEvents(formattedData);
		setLoading(false);
	}

	useEffect(() => {
		fetchClientEventsFromBaserow();
	}, []);

	/*
		Aggregate events.
		Then allows to pass the slug of an event, e.g.:
		https://broadsign.com/events?highlight=geopath-oaaa-conference
		If such a slug is detected, the corresponding event will be put as featured (on top) on the page.
		Any event that is normally marked as featured, will be ignored (i.e., NON-Featured) in this case.
	*/

	const highlightEvent: string = highlight.match(/highlight=([^?&]+)/)?.[1] || "";

	const events = useMemo(() => {
		const allEvents = [...clientEvents, ...serverEvents];
		const uniqueEvents = allEvents.filter((event, index, self) => index === self.findIndex((e) => e.id === event.id));
		return uniqueEvents
			.sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart))
			.map((e) => ({ ...e, isFeatured: false }))
			.sort((a, b) => {
				if (a.slug === highlightEvent) {
					return -1;
				}
				if (b.slug === highlightEvent) {
					return 1;
				}

				return 0;
			});
	}, [clientEvents, serverEvents, highlightEvent]);

	const handleOpenModal = useCallback(
		(eventID: string) => {
			const _modalContent = events.find((e) => e.slug === eventID);
			onClickEvent(eventID, _modalContent);
		},
		[events]
	);

	return (
		<>
			<section className="hero">
				{events.length > 0 ? (
					<>
						<Container className="grid my-10 mx-auto sm:mt-22 mb-0">
							<div className="col-12 sm:col-5">
								<h1 className="mb-12 font-superbold line-height-80">{T.translate("hero.title")}</h1>
								<div className="tagline pr-8">
									<p className="text-16 text-ash line-height-160">{T.translate("hero.par1")}</p>
									<p className="text-16 text-ash line-height-160">{T.translate("hero.par2")}</p>
								</div>
							</div>
							<div className="col-12 sm:col-7">
								{events.length && (
									<EventBox {...events[0]} isFirst={true} onClick={(eventID: string) => handleOpenModal(eventID)} className="featured" />
								)}
							</div>
						</Container>
						<Container className="w-full mb-25">
							<div className="col-12">
								<hr className="bg-reflex" />
							</div>
						</Container>
					</>
				) : (
					<EmptyEventsList data={data} l={l} />
				)}
			</section>
			<section className="hull flex flex-column align-items-center mb-20">
				{events.length > 1 && (
					<Container className="upcoming grid">
						{events.slice(1).map((details) => (
							<EventBox {...details} onClick={(eventID: string) => handleOpenModal(eventID)} key={details.slug} />
						))}
					</Container>
				)}
				{loading && (
					<div className="w-full" style={{ height: "200px" }}>
						<Loading />
					</div>
				)}
			</section>
		</>
	);
}
