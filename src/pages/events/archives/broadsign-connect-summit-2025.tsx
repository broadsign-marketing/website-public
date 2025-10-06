import React, { useCallback, useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import cookie from "react-cookies";
import { useDico } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";
import { blogPostSlug, strIs } from "@annex";
import competitors from "@assets/competitors.json";
import clsx from "clsx";

import Layout from "@components/layout";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Container from "@components/Container";
import Form, { getFormID } from "@components/Form";
import Link from "@components/LocalizedLink";
import Loading from "@components/Loading";
import Modal from "@components/Modal";
import Vimeo from "@u-wave/react-vimeo";

import hero_connect_logo from "@img/pages/events/broadsign-connect-summit-2025/hero_connect_logo.svg";
import featured_video_connect_logo from "@img/pages/events/broadsign-connect-summit-2025/featured_video_connect_logo.svg";
import btn_scroll_down from "@img/pages/events/broadsign-connect-summit-2025/btn_scroll_down.svg";
import vip from "@img/pages/events/broadsign-connect-summit-2025/vip.svg";
import vip_spark from "@img/pages/events/broadsign-connect-summit-2025/vip_spark.svg";
import play_btn from "@img/controls/play_btn_solid_white.svg";

import "@sass/pages/events/2025_broadsign_connect_summit.scss";

function VIPSparkBadge() {
	return (
		<span className="vip_spark_badge">
			<img className="vip_spark z-2" src={vip_spark} alt="VIP access only" />
			<img className="vip z-1" src={vip} alt="" />
		</span>
	);
}

function ResourceCard({ content: { title, formattedDate, slug, language, nodeType, featuredImage, to, thumbnail, cta } }) {
	if (nodeType === "Post") {
		to = blogPostSlug(slug, language.slug);
		thumbnail = featuredImage.node.gatsbyImage;
		cta = "Read Article";
	}

	return (
		<Link className="div resource_card bg-midnight flex flex-column align-items-start h-full rounded-xl overflow-hidden" to={to}>
			<div className="thumbnail z-1">
				<Img image={thumbnail} className="bg" alt="" />
			</div>
			<div className="details flex flex-column align-items-start justify-content-start bg-midnight p-4 z-1 sm:px-5">
				{formattedDate && <h4 className="text-white text-12 font-light uppercase letter-spacing-10 mb-2">{formattedDate}</h4>}
				{title && <h4 className="text-white text-20 font-bold mt-0 mb-10">{title}</h4>}
				<div className="link_cerulean_arrow text-white text-14 uppercase letter-spacing-10 mt-auto mb-0">{cta}</div>
			</div>
		</Link>
	);
}

function VideoCard({ video, video: { vimeoId, presenters, to, title, description }, data, onClick, gatedVideoIsAccessible }) {
	const thumbnail = data["thumb_" + vimeoId.replace(/\//, "_")].childImageSharp.gatsbyImageData || false;

	let cta = "Watch";
	if (video.gated && !gatedVideoIsAccessible) {
		cta = "Sign in to watch";
	}

	return (
		<button
			className="div resource_card video_card bg-midnight flex flex-column align-items-start h-full rounded-xl overflow-hidden"
			onClick={() => onClick(vimeoId)}>
			{thumbnail && (
				<div className="thumbnail z-1">
					{!to && <img className="play_btn z-5" src={play_btn} alt="" />}
					<Img image={thumbnail} className="bg" alt="" />
				</div>
			)}
			<div className="details flex flex-column align-items-start justify-content-between bg-midnight p-4 z-1 sm:px-5">
				{title && (
					<h4 className="text-white text-20 font-black mb-4 sm:text-24">
						{title}
						{video.gated && <VIPSparkBadge />}
					</h4>
				)}
				{presenters && (
					<div className="presenters mb-3">
						{presenters.map(({ id, name, position }, k) => (
							<div className="presenter flex flex-nowrap align-items-start my-2" key={id + k}>
								<div className="portrait_wrapper flex flex-center mr-3">
									<Img className="portrait" image={data[`portrait_${id}`].childImageSharp.gatsbyImageData} objectFit="cover" alt="" />
								</div>
								<div className="flex flex-column">
									<p className="text-white text-14 font-bold m-0">{name}</p>
									<p className="text-white text-14 m-0">{position}</p>
								</div>
							</div>
						))}
						<p className="dash mt-10"></p>
					</div>
				)}
				{description && <p className="text-white text-14 mb-6">{description}</p>}
				{to && <div className="cta text-14 letter-spacing-10 uppercase mt-auto">Read the article</div>}
				{!to && <div className="cta text-14 letter-spacing-10 uppercase mt-auto">{cta}</div>}
			</div>
		</button>
	);
}

function FeatureVideoCard({ video: { title, vimeoId }, thumbnail, onClick }) {
	return (
		<button
			className="resource_card video_card div featured bg-midnight flex flex-column align-items-stretch mb-4 rounded-xl overflow-hidden w-full sm:flex-row"
			onClick={() => onClick(vimeoId)}>
			<div className="thumbnail mb-4 overflow-hidden sm:mb-0">
				<img className="play_btn z-5" src={play_btn} alt="" />
				<Img image={thumbnail} className="bg z-1" alt="" />
			</div>
			<div className="flex flex-column align-items-start justify-content-center px-4 pb-4 sm:p-8">
				<img className="event_logo mb-6" src={featured_video_connect_logo} alt="" />
				{title && <h2 className="text-white text-16 font-regular line-height-180 text-transform-none mb-6">{title}</h2>}
				<span className="cta text-14 uppercase">Watch</span>
			</div>
		</button>
	);
}

export default function Event2025BroadsignConnectPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [activeVideo, setActiveVideo] = useState<string>("");
	const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
	const [tab, setTab] = useState<string>("sessions");

	const [showGatedModal, setShowGatedModal] = useState<boolean>(false);
	const [holdGatedVideo, setHoldGatedVideo] = useState<boolean>(false);
	const [isWaitingForAPI, setIsWaitingForAPI] = useState<boolean>(false);
	const [gatedVideoIsAccessible, setGatedVideoIsAccessible] = useState<boolean>(false);
	const [showLongerForm, setShowLongerForm] = useState<boolean>(false);
	const [emailToSendToLongerForm, setEmailToSendToLongerForm] = useState<boolean>(false);
	const [contactIsCompetitor, setContactIsCompetitor] = useState<boolean>(false);

	useDico(l, dicoPath.replace("events-archives", "events"));

	const emailFieldRef = useRef<HTMLElement>(null);

	function ungateVideo() {
		setActiveVideo(holdGatedVideo);
		setGatedVideoIsAccessible(true);
		setShowGatedModal(false);
	}

	function setFormSubmittedCookie(formId) {
		const expires = new Date();
		expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 365);
		cookie.save("submitted-form-" + formId, true, { path: "/", expires, maxAge: 32000000 });
	}

	const updateContactLeadSourceDetails = useCallback(async (email) => {
		setIsWaitingForAPI(true);

		const basePath = process.env.GATSBY_ACTIVE_ENV === "development" ? "https://broadsign.com" : "";

		const updateResponse = await fetch(basePath + "/api/update-contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				properties: { lead_source_details: "Broadsign Connect Summit 2025 - Watch Product Video" },
			}),
		})
			.then((res) => {
				setIsWaitingForAPI(false);
				if (res.ok) return res.json();
				return "Error";
			})
			.catch((e) => {
				return "Error : " + JSON.stringify(e);
			});
	}, []);

	const handleEnterEmail = useCallback(async () => {
		if (!emailFieldRef.current.value) return;

		setIsWaitingForAPI(true);

		const basePath = process.env.GATSBY_ACTIVE_ENV === "development" ? "https://broadsign.com" : "";

		const isContactAllowed = await fetch(basePath + "/api/contact-is-member-of-list", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: emailFieldRef.current.value, listId: "6298" }),
		})
			.then((res) => {
				if (res.ok) return res.json();
				setIsWaitingForAPI(false);
				return "Error";
			})
			.catch((e) => {
				return "Error : " + JSON.stringify(e);
			});

		if (emailFieldRef.current.value.match(new RegExp(`(${competitors.join("|")})`))) setContactIsCompetitor(true);

		if (isContactAllowed && isContactAllowed.belongsToList) {
			updateContactLeadSourceDetails(emailFieldRef.current.value);
			ungateVideo();
			const formId = getFormID("event2025BroadsignConnectSummitProductVideo");
			setFormSubmittedCookie(formId);
		} else {
			setEmailToSendToLongerForm(emailFieldRef.current.value);
			setGatedVideoIsAccessible(false);
			setShowLongerForm(true);
		}
	}, [emailFieldRef, holdGatedVideo]);

	const handleEmailKeyUp = useCallback(($e) => {
		if ($e.code === "Enter") handleEnterEmail();
	}, []);

	const populateEmailField = useCallback(() => {
		setTimeout(() => {
			const emailField = document.querySelector(".Modal .Form .hs_email input");
			emailField.value = emailToSendToLongerForm;
			emailField.dispatchEvent(new Event("input", { bubbles: true }));
			emailField.focus();
		}, 500);
	}, [emailToSendToLongerForm]);

	useEffect(() => {
		if (strIs(activeVideo, "vimeoId")) {
			setShowVideoModal(true);
		} else {
			setShowVideoModal(false);
		}
	}, [activeVideo]);

	useEffect(() => {
		const formID = getFormID("event2025BroadsignConnectSummitProductVideo");
		const formCookie = cookie.load(`submitted-form-${formID}`);
		if (formCookie) setGatedVideoIsAccessible(true);
	}, []);

	const { featuredVideo, videos } = T.texts;

	return (
		<Layout id="broadsign_connect_summit_2025" className="theme_carolina">
			<section className="hero bg-cerulean flex flex-column align-items-center py-16">
				<Container className="z-2">
					<div className="grid">
						<div className="col-12 sm:col-6">
							<h1 className="m-0">
								<img src={hero_connect_logo} alt={T.translate("hero.title")} />
							</h1>
						</div>
						<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
							<p className="text-white text-20 line-height-160 mb-10">{T.translate("hero.par")}</p>
							<button className="scroll_cta div" onClick={() => scrollTo("hull")}>
								<img src={btn_scroll_down} alt="" />
							</button>
						</div>
					</div>
				</Container>
			</section>
			<Container id="hull" className="hull mx-auto mt-12 mb-20">
				<div className="tabs flex align-items-stretch flex-nowrap mb-6">
					<button
						className={clsx("sessions div text-reflex text-16 uppercase", tab === "sessions" ? "active font-black" : "font-regular")}
						onClick={() => setTab("sessions")}>
						<span className="label">{T.translate("watchSessions")}</span>
					</button>
					<button
						className={clsx("extra_resources div text-reflex text-16 uppercase", tab === "extra_resources" ? "active font-black" : "font-regular")}
						onClick={() => setTab("extra_resources")}>
						<span className="label">{T.translate("extraResources")}</span>
					</button>
				</div>
				<div className="sections">
					<section className={clsx("sessions", { active: tab === "sessions" })}>
						{featuredVideo && (
							<FeatureVideoCard
								video={featuredVideo}
								thumbnail={data.thumb_featured.childImageSharp.gatsbyImageData}
								onClick={(id) => setActiveVideo(id)}
							/>
						)}
						<div className="grid">
							{videos.map((video) => (
								<div className="col-12 sm:col-6 md:col-4" key={video.vimeoId}>
									<VideoCard
										video={video}
										data={data}
										gatedVideoIsAccessible={gatedVideoIsAccessible}
										onClick={(id) => {
											if (video.gated && !gatedVideoIsAccessible) {
												setShowGatedModal(true);
												setHoldGatedVideo(video.vimeoId);
											} else {
												setActiveVideo(id);
											}
										}}
									/>
								</div>
							))}
						</div>
					</section>
					<section className={clsx("extra_resources", { active: tab === "extra_resources" })}>
						<div className="grid">
							{data.posts.nodes.map((post) => (
								<div className="col-12 sm:col-4" key={post.id}>
									<ResourceCard content={post} />
								</div>
							))}
							<div className="col-12 sm:col-4">
								<ResourceCard
									content={{
										formattedDate: "February 12, 2025",
										title: "The future of OOH transactions: faster, smarter, automated",
										nodeType: "webpage",
										to: "https://www.campaignlive.co.uk/article/future-ooh-transactions-faster-smarter-automated/1905851",
										thumbnail: data.extra_resource_campaignlive_article.childImageSharp.gatsbyImageData,
										cta: "Read article",
									}}
								/>
							</div>
							<div className="col-12 sm:col-4">
								<ResourceCard
									content={{
										formattedDate: "February 13, 2024",
										title: "The State of Static Out-of-Home Report",
										nodeType: "webpage",
										to: "stateOfStaticOOHReport",
										thumbnail: data.extra_resource_static_report.childImageSharp.gatsbyImageData,
										cta: "Read the report",
									}}
								/>
							</div>
						</div>
					</section>
				</div>
			</Container>
			{showVideoModal && (
				<Modal variant="video" onClose={() => setActiveVideo("")}>
					<Vimeo className="vimeo_video w-full" video={activeVideo} />
				</Modal>
			)}
			{showGatedModal && (
				<Modal variant="form" className="narrow" onClose={() => setShowGatedModal("")}>
					{!gatedVideoIsAccessible && !showLongerForm && (
						<>
							<div className={clsx("m-auto py-10", isWaitingForAPI ? "block" : "hidden")}>
								<Loading />
							</div>
							<div className={clsx("m-auto py-10 flex-column align-items-start", isWaitingForAPI ? "hidden" : "flex")}>
								<h2 className="text-24 line-height-120 text-transform-none mb-10 sm:text:30" style={{ maxWidth: "26ch" }}>
									Watch "The platform that powers OOH" <VIPSparkBadge />
								</h2>
								<p className="text-ash text-16 line-height-180 mb-10">
									This session is exclusively available to Broadsign Connect 2025 attendees. Please sign in with the email address used for
									your Broadsign Connect Summit registration.
								</p>
								<input type="email" className="email_only_field mb-10" placeholder="Email" ref={emailFieldRef} onKeyUp={handleEmailKeyUp} />
								<button className="CTA primary align-self-end" onClick={handleEnterEmail}>
									Submit
								</button>
							</div>
						</>
					)}
					{!gatedVideoIsAccessible && showLongerForm && (
						<div className="m-auto">
							{contactIsCompetitor ? (
								<h2 className="text-24 font-bold text-transform-none mb-4 sm:text:30">Sorry, your email domain is not accepted.</h2>
							) : (
								<>
									<h2 className="text-24 text-transform-none mb-4 sm:text:30">Oops! Looks like you weren't on our list!</h2>
									<p className="text-ash text-16 mb-4">
										But don't worry, you can still watch the session. We'll just need a tiny bit more information.
									</p>
									<Form form="event2025BroadsignConnectSummitProductVideo" onReady={populateEmailField} onSubmit={() => ungateVideo()} />
								</>
							)}
						</div>
					)}
				</Modal>
			)}
		</Layout>
	);
}

export const query = graphql`
	query ($l: String!) {
		thumb_featured: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/thumb_featured.jpg" }) {
			...img
		}
		thumb_1003304693: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/thumb_1003304693.jpg" }) {
			...img
		}
		thumb_1062157613: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/thumb_1062157613.jpg" }) {
			...img
		}
		thumb_1062522559: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/thumb_1062522559.jpg" }) {
			...img
		}
		thumb_1063599230: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/thumb_1063599230.jpg" }) {
			...img
		}
		thumb_1063681310: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/thumb_1063681310.jpg" }) {
			...img
		}
		thumb_1064721210: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/thumb_1064721210.jpg" }) {
			...img
		}

		portrait_adam_garrity: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/portrait_adam_garrity.png" }) {
			...img
		}
		portrait_emily_alcorn: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/portrait_emily_alcorn.png" }) {
			...img
		}
		portrait_francois_hechme: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/portrait_francois_hechme.png" }) {
			...img
		}
		portrait_gavin_lee: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/portrait_gavin_lee.png" }) {
			...img
		}
		portrait_harvin_gupta: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/portrait_harvin_gupta.png" }) {
			...img
		}
		portrait_neil_ackland: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/portrait_neil_ackland.png" }) {
			...img
		}
		portrait_sijmen_vos: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/portrait_sijmen_vos.png" }) {
			...img
		}
		portrait_vincent_letang: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/portrait_vincent_letang.png" }) {
			...img
		}

		extra_resource_campaignlive_article: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/extra_resource_campaignlive_article.jpg" }) {
			...img
		}
		extra_resource_static_report: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2025/resource_static_report.jpg" }) {
			...img
		}

		posts: allWpPost(filter: { databaseId: { in: [43217, 43451, 43208] } }) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: $l)
			}
		}
	}
`;
