import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { graphql, navigate } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";
import { shuffle, webinarSlug } from "@annex";
import { routeWithUtmForm } from "@route";
import cookie from "react-cookies";

import Container from "@components/Container";
import Form, { NoContextForm } from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
// import DevWPUtils from "@components/Dev__WPUtils";

import "@sass/templates/wp.scss";
import "@sass/templates/blog.scss";
import "@sass/templates/wp_webinar.scss";

function GatedVideo({ youtubeID, formID, isLocked, handleFormSubmit, origin }) {
	return (
		<div className="gated_content flex flex-center" data-origin={origin}>
			{isLocked ? (
				<div className="form_card flex flex-column flex-center w-full">
					<div className="bg-reflex flex flex-column flex-center rounded-xl p-8 z-5">
						<h4 className="text-h5 text-white mt-0">{T.translate("fillFormToUnlock")}</h4>
						<NoContextForm
							form={formID}
							bg="dark"
							onSubmit={() => {
								handleFormSubmit();
							}}
							origin={origin}
						/>
					</div>
					<img src={`https://i3.ytimg.com/vi/${youtubeID}/maxresdefault.jpg`} className="poster" />
				</div>
			) : (
				<iframe
					src={`https://www.youtube.com/embed/${youtubeID}`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen></iframe>
			)}
		</div>
	);
}

export default function WebinarPage({ pageContext, pageContext: { l }, location: { search }, data }) {
	const { page } = data;

	const isGated = page?.webinarOptions?.gating?.isGated || false;
	const HSFormID = page?.webinarOptions?.gating?.hubspotFormId || "";
	const { series } = page.webinarOptions;
	const cssSeriesClass = series ? `series_${series.replace(/([A-Z])/g, "_$1").toLowerCase()}` : "";
	const fromSearchQuery = search.match(/[?&]from=([^&]+)/)?.[1] || "";

	const [isLocked, setIsLocked] = useState(true);
	const [showBookCallModal, setShowBookCallModal] = useState(false);

	const gatedContainerRef = useRef(null);

	useDico(l, "webinar");

	T.setTexts({
		...T.texts,
		seo: {
			title: page.seo?.title || page.title,
			description: page.seo?.metaDesc || "",
		},
	});

	function setWebinarCookie(formID) {
		const expires = new Date();
		expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 365);
		cookie.save("subscribed-" + formID, true, { path: "/", expires, maxAge: 32000000 });
		setIsLocked(false);
	}

	function handleFormSubmit() {
		setWebinarCookie(HSFormID);
	}

	const handleShowBookCallModalLinkClick = useCallback(() => {
		setShowBookCallModal(true);
	}, [showBookCallModal]);

	const relatedVideos = useMemo(() => {
		if (data.relatedVideos?.nodes) {
			return shuffle(data.relatedVideos.nodes);
		}
		return [];
	}, [data.relatedVideos]);

	useEffect(() => {
		if (isGated && HSFormID) {
			if (isLocked) {
				const gatedElements = gatedContainerRef.current.querySelectorAll(".wp-block-embed-youtube");

				gatedElements.forEach((element) => {
					const youtubeID = element.innerHTML.match(/youtube\.com\/embed\/([^?&]{11})/)?.[1];
					if (youtubeID) {
						const root = createRoot(element);
						root.render(
							<>
								{createPortal(
									<GatedVideo
										youtubeID={youtubeID}
										formID={HSFormID}
										handleFormSubmit={() => handleFormSubmit(HSFormID)}
										isLocked={isLocked}
										origin={data.site.siteMetadata.siteUrl}
									/>,
									root._internalRoot.containerInfo
								)}
							</>
						);
					}
				});
			}
		}
	}, [gatedContainerRef, isLocked, HSFormID]);

	useEffect(() => {
		const webinarCookie = cookie.load(`subscribed-${HSFormID}`);
		if (webinarCookie === "true") {
			setIsLocked(false);
		}

		setTimeout(() => {
			const showBookCallModalLinks = document.querySelectorAll("a[href*='open_book_a_call_form'");
			if (showBookCallModalLinks) {
				showBookCallModalLinks.forEach((link) => {
					link.href = "";
					link.addEventListener("click", handleShowBookCallModalLinkClick);
				});
			}
		}, 1000);
	}, []);

	return (
		<Layout id="webinar" className={clsx("theme_carolina template_wp template_blog template_blog wp_webinar", cssSeriesClass)}>
			<Container className="pt-10 pb-20">
				<div className="breadcrumb text-ash">
					<p className="text-12">
						{fromSearchQuery ? (
							<Link to={fromSearchQuery} className="slash_after text-ash">
								{T.translate(`from_${fromSearchQuery}`)}
							</Link>
						) : (
							<Link to="events" className="slash_after text-ash">
								{T.translate("from_events")}
							</Link>
						)}
						{series && <span className="slash_after">{T.translate(series)}</span>}
						<b>{page.title}</b>
					</p>
				</div>
				<h1>
					{series && <span className="series">{T.translate(series)}</span>}
					{page.title}
				</h1>
				{isLocked && <div dangerouslySetInnerHTML={{ __html: data.page.content }} ref={gatedContainerRef}></div>}
				{!isLocked && <div dangerouslySetInnerHTML={{ __html: data.page.content }}></div>}
			</Container>
			{relatedVideos.length > 0 && (
				<Container className="mb-20">
					{data.page?.webinarOptions?.series ? (
						<h2 className="text-h4">{T.translate("relatedVideos")}:</h2>
					) : (
						<h2 className="text-h4">{T.translate("moreVideos")}:</h2>
					)}
					<div className="grid">
						{relatedVideos.slice(0, 3).map((video) => (
							<div className="col-12 mb-8 sm:col-4" key={video.id}>
								<Link
									to={webinarSlug(video.slug, video.webinarOptions.series)}
									className="related_video flex flex-column bg-zircon rounded-xl h-full">
									<Img image={video.featuredImage.node.gatsbyImage} className="thumbnail w-full " alt="" />
									<div className="description flex flex-column justify-content-between p-3 sm:p-4">
										<span className="block text-14 text-ash uppercase mb-2">
											{new Date(video.webinarOptions.webinarDates.webinarDate).toLocaleDateString(l, {
												year: "numeric",
												month: "long",
												day: "numeric",
												timeZone: "UTC",
											})}
										</span>
										<span className="block text-16 text-reflex font-bold mb-3">{video.title}</span>
										<span className="link_cerulean_arrow block text-14 text-cerulean uppercase mt-auto mb-0">
											{T.translate("watchVideo")}
										</span>
									</div>
								</Link>
							</div>
						))}
					</div>
				</Container>
			)}
			{showBookCallModal && (
				<Modal variant="form" className="theme_carolina" onClose={() => setShowBookCallModal(false)}>
					<h3 className="h4 text-reflex mb-8">{T.translate("bookCall")}</h3>
					<Form form="bookACallMediaBuyers" campaign="bookACallAquarius" redirectUrl={routeWithUtmForm("thankYou", "book_a_call")} />
				</Modal>
			)}
		</Layout>
	);
}

export const queryPage = graphql`
	query ($id: String, $l: String, $series: String) {
		site {
			siteMetadata {
				siteUrl
			}
		}

		page: wpWebinar(id: { eq: $id }) {
			id
			databaseId
			slug
			link
			title
			content
			date
			formatedDate: date(formatString: "LL", locale: $l)
			language {
				slug
			}
			seo {
				title
				metaDesc
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

		relatedVideos: allWpWebinar(filter: { status: { eq: "publish" }, id: { ne: $id }, webinarOptions: { series: { eq: $series } } }) {
			nodes {
				id
				title
				slug
				featuredImage {
					node {
						gatsbyImage(placeholder: BLURRED, width: 360)
					}
				}
				webinarOptions {
					series
					webinarDates {
						webinarDate
					}
				}
			}
		}
	}
`;
