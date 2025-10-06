import React, { useCallback, useEffect, useMemo, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import EmptyEventsList from "@components/Events__EmptyEventsList";
import EventBox from "@components/Events__EventBox";
import EventsList from "@components/Events__EventsList";
import Container from "@components/Container";
import Form from "@components/Form";
import { GatsbyImage as Img, StaticImage, IGatsbyImageData } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Modal from "@components/Modal";

import "@sass/pages/events.scss";

import { Children, BroadsignPageProps } from "@types";

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

interface EventBoxWWrapperProps {
	children: Children;
	className?: string;
	isFeatured?: boolean;
	salesforceCampaign: string;
	onClick?: Function;
	to?: string;
	type: string;
}

interface EventBoxProps extends Event {
	onClick: Function;
	type?: string;
	isArchived?: boolean;
	to?: string;
	className?: string;
	series?: string;
}

export default function EventsPage({ pageContext, pageContext: { l, dicoPath, today }, location: { search }, data }: BroadsignPageProps) {
	const [openModalFormID, setOpenModalFormID] = useState<string>("");
	const [modalContent, setModalContent] = useState<EventBoxProps | false>(false);

	useDico(l, dicoPath);

	/* const webinars = useMemo((): Event[] => {
		return data.webinars.nodes.map((webinar) => {
			const thumbnail = webinar.featuredImage.node.gatsbyImage;
			const { series } = webinar.webinarOptions;

			return {
				...webinar,
				series,
				type: "webinar",
				archived: true,
				date: webinar.formattedDate,
				thumbnail,
				to: `${webinarSlug(webinar.slug, webinar.webinarOptions.series)}?from=events`,
			};
		});
	}, [data.webinars.nodes]); */

	const archivedEvents = useMemo((): Event[] => {
		return T.texts?.archived.events.map((event) => ({ ...event, thumbnail: data[`thumbnail_${event.id}`].childImageSharp.gatsbyImageData })) || [];
	}, [data]);

	const handleOpenModal = useCallback(
		(eventID: string, _modalContent: any = false) => {
			setOpenModalFormID(eventID);
			setModalContent(_modalContent);
		},
		[data.events.nodes, pageContext.events]
	);

	const handleCloseModal = useCallback(() => {
		setOpenModalFormID("");
		setModalContent(false);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (modalContent !== false) {
				/* Pre-populate some form fields */
				const { title, date, dateStartYear } = modalContent;
				const leadSourceDetailsField: HTMLInputElement | null = document.querySelector("input[name='lead_source_details']");
				const messageField: HTMLInputElement | null = document.querySelector("input[name='message']");

				if (title && date) {
					if (leadSourceDetailsField) {
						leadSourceDetailsField.value = `${title} ${dateStartYear}`;
					}
					if (messageField) {
						messageField.value = `I'd like to meet with you at ${title} on ${date}`;
					}
				} else {
					if (leadSourceDetailsField) {
						leadSourceDetailsField.value = "General inquiry about events";
					}
					if (messageField) {
						messageField.value = "I'd like to talk to you about the events you are planning to attend.";
					}
				}
			}
		}, 2000);
	}, [modalContent]);

	return (
		<Layout id="events" className="theme_carolina">
			{data.events.nodes.length === 0 && pageContext.events.length === 0 ? (
				<EmptyEventsList data={data} l={l} />
			) : (
				<EventsList
					eventsFromWP={data.events.nodes}
					eventsFromBaserow={pageContext.events}
					highlight={search}
					today={today}
					l={l}
					onClickEvent={(eventID: string, _modalContent: any) => handleOpenModal(eventID, _modalContent)}
				/>
			)}
			<section className="archived">
				{archivedEvents.length && (
					<section className="w-full grid bg-zircon py-25 justify-content-center">
						<p className="subtitle-2 gradient font-medium">{T.translate("archived.overtitle")}</p>
						<h2 className="h4 text-center mb-20">{T.translate("archived.title")}</h2>
						<Container className="archived grid">
							{archivedEvents.map((event) => {
								if (event.thumbnail) {
									return <EventBox {...event} key={event.to} />;
								} else {
									console.error("Webinar", event.title, "doesn't seem to have a feature image.");
								}
							})}
						</Container>
					</section>
				)}
			</section>
			{openModalFormID !== "" && (
				<Modal className="modal_events" variant="form event" onClose={() => handleCloseModal()}>
					<Container>
						<h3 className="text-20 text-transform-none mb-8 sm:text-24">{T.texts.joinUsAt.replace("<event>", modalContent.title)}</h3>
						<Form form="events" campaign={modalContent.salesforceCampaign} />
					</Container>
				</Modal>
			)}
		</Layout>
	);
}

export const queryIndex = graphql`
	query ($l: String!) {
		events: allWpEvent(filter: { status: { eq: "publish" } }, sort: { eventOptions: { dateStart: ASC } }) {
			nodes {
				id
				title
				slug
				eventOptions {
					dateEnd
					dateStart
					hasEndDate
					location
					isFeatured
					salesforceCampaign
				}
				featuredImage {
					node {
						gatsbyImage(placeholder: BLURRED, width: 620)
					}
				}
			}
		}

		thumbnail_broadsign_connect_summit_2025: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/featured_thumbnail.jpg" }) {
			...img
		}
		thumbnail_broadsign_connect_summit_2024: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/featured_thumbnail.jpg" }) {
			...img
		}
		thumbnail_ise_customer_summit_2023: file(relativePath: { eq: "pages/events/ise-customer-summit-2023/thumbnail.jpg" }) {
			...img
		}
		thumbnail_broadsign_summit_2020: file(relativePath: { eq: "pages/events/broadsign-summit-2020/video_poster.jpg" }) {
			...img
		}
		thumbnail_broadsign_summit_2019: file(relativePath: { eq: "pages/events/broadsign-summit-2019/thumbnail.jpg" }) {
			...img
		}

		webinars: allWpWebinar(
			filter: { status: { eq: "publish" }, language: { slug: { eq: $l } } }
			sort: [{ webinarOptions: { webinarDates: { webinarDate: DESC } } }, { date: DESC }]
		) {
			nodes {
				id
				slug
				link
				title
				contentTypeName
				date
				formattedDate: date(formatString: "LL", locale: $l)
				language {
					slug
				}
				featuredImage {
					node {
						gatsbyImage(placeholder: BLURRED, width: 360)
					}
				}
				webinarOptions {
					series
					webinarDates {
						differentEndDate
						webinarDate
						webinarEndDate
					}
					gating {
						hubspotFormId
						isGated
					}
				}
			}
		}

		latestPost: wpPost(status: { eq: "publish" }, language: { slug: { eq: $l } }) {
			id
			slug
			title
			date: date(formatString: "LL", locale: $l)
			featuredImage {
				node {
					gatsbyImage(placeholder: BLURRED, width: 500)
				}
			}
		}
	}
`;
