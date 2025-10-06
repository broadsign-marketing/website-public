import React, { useEffect, useMemo, useState, useCallback } from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import route from "@route";
import { graphql } from "gatsby";
import clsx from "clsx";
import cookie from "react-cookies";
import { strIs } from "@annex";

import CTA from "@components/CTA";
import { GatsbyImage as Img, getSrc } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import Tank from "@components/Tank";
import VideoGrid from "@partials/programmatic-u__VideoGrid";

import programmatic_banner from "@img/heroes/programmatic_u.svg";
import doohx from "@img/heroes/doohx.svg";

import "@sass/pages/programmatic_u.scss";
import "@sass/components/Modal.scss";

import icon_programmatic_u_what from "@icons/programmatic_u_what_is_it.svg";
import icon_programmatic_u_who_its_for from "@icons/programmatic_u_who_its_for.svg";
import icon_programmatic_u_icon_3 from "@icons/programmatic_u_icon_3.svg";

import play_btn from "@img/controls/programmatic_u_play_btn.svg";

// import intro_video from "/videos/doohx_intro.mp4";

function VideoCard({ details, setModalContent }) {
	const { youtubeID, title, description, /* teachers, */ poster } = details;

	return (
		<div
			role="button"
			className={clsx("video_card", details.watched ? "watched" : "")}
			onClick={() => {
				setModalContent(youtubeID);
			}}
			onKeyDown={() => {
				setModalContent(youtubeID);
			}}
			tabIndex={0}>
			<div className="watched_tag">Watched</div>
			<img className="play_btn" src={play_btn} alt="" />
			<Img alt="" image={poster} className="poster" />
			<div className="details">
				<p className="title">{title}</p>
				<p className="description">{description}</p>
				<div className="foot">
					{/* <p className="teachers">{teachers}</p> */}
					<CTA className="teal px-8 py-2" onClick={() => setModalContent(youtubeID)}>
						{T.translate("cta.watch")}
					</CTA>
				</div>
			</div>
		</div>
	);
}

function HeroPanel({ className }) {
	return (
		<div className={clsx("panel", className)}>
			<p>{T.translate("nightSky.doohx.panelPar")}</p>
			<CTA
				className="bg-white text-cerulean border-white hover:bg-cerulean hover:text-white rounded-xl text-16"
				to="https://www.doohx.io/courses/pdooh-101?coupon=broadsignwebsitereferral15">
				{T.translate("nightSky.doohx.panelCTA")}
			</CTA>
		</div>
	);
}

export default function ProgrammaticUPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [modalContent, setModalContent] = useState(false);
	const [countdown, setCountdown] = useState(5);

	useDico(l, dicoPath);

	const markVideoAsWatched = useCallback((videoID) => {
		const expires = new Date();
		expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 365);
		cookie.save("watched-" + videoID, true, { path: "/", expires, maxAge: 32000000 });
	}, []);

	useEffect(() => {
		let interval = null;

		if (modalContent) {
			if (countdown <= 0) {
				markVideoAsWatched(modalContent);
			} else {
				interval = setInterval(() => {
					setCountdown(countdown - 1);
				}, 1000);
			}
		} else {
			clearInterval(interval);
			setCountdown(5);
		}

		return () => clearInterval(interval);
	}, [modalContent, countdown, markVideoAsWatched]);

	const allVideos = useMemo(() => {
		return Object.values(T.texts.videos).map((video) => ({
			...video,
			poster: data["thumb" + video.id].childImageSharp.gatsbyImageData,
			watched: cookie.load(`watched-${video.youtubeID}`) || false,
		}));
	}, []);

	const buyersVideos = useMemo(() => {
		return allVideos.filter((v) => v.series === "buyers");
	}, [allVideos]);

	const caseStudiesVideos = useMemo(() => {
		return allVideos.filter((v) => v.series === "cases");
	}, [allVideos]);

	const publishersVideos = useMemo(() => {
		return allVideos.filter((v) => v.series === "publishers");
	}, [allVideos]);

	return (
		<Layout id="programmatic_u">
			<Tank className="Hero flex justify-content-center">
				<h1>
					<img src={programmatic_banner} alt="Programmatic Digital Out-of-Home University" title="Programmatic Digital Out-of-Home University" />
				</h1>
			</Tank>
			<Tank className="neck">
				<div className="grid">
					<div className="col-12 md:col-4">
						<div className="box py-4 pr-4 mb-4 md:py-6 md:pr-6 md:mb-0">
							<img src={icon_programmatic_u_what} className="icon" alt="" />
							<h3 className="pl-16 sm:pl-20">{T.translate("fold.card1.title")}</h3>
							<p className="m-0 pl-16 sm:pl-20">{T.translate("fold.card1.tagline")}</p>
						</div>
					</div>
					<div className="col-12 md:col-4">
						<div className="box py-4 pr-4 mb-4 md:py-6 md:pr-6 md:mb-0">
							<img src={icon_programmatic_u_icon_3} className="icon" alt="" />
							<h3 className="pl-16 sm:pl-20">{T.translate("fold.card2.title")}</h3>
							<p className="m-0 pl-16 sm:pl-20">{T.translate("fold.card2.tagline")}</p>
						</div>
					</div>
					<div className="col-12 md:col-4">
						<div className="box py-4 pr-4 mb-4 md:py-6 md:pr-6 md:mb-0">
							<img src={icon_programmatic_u_who_its_for} className="icon" alt="" />
							<h3 className="pl-16 sm:pl-20">{T.translate("fold.card3.title")}</h3>
							<p className="m-0 pl-16 sm:pl-20">{T.translate("fold.card3.tagline")}</p>
						</div>
					</div>
				</div>
			</Tank>
			<Tank>
				<h2 className="new">{T.translate("new")}</h2>
			</Tank>
			<section className="night_sky">
				<Img alt="" image={data.Sky.childImageSharp.gatsbyImageData} className="bg" />
				<Tank className="flex wrap justify-content-between">
					<div className="doohx">
						<h2>
							<img src={doohx} alt="DOOHX: Brought to you by Broadsign" title="DOOHX: Brought to you by Broadsign" />
						</h2>
						<p>{T.translate("nightSky.doohx.par1")}</p>
						<p>{T.translate("nightSky.doohx.listTitle")}</p>
						<ul>
							<li>{T.translate("nightSky.doohx.list1")}</li>
							<li>{T.translate("nightSky.doohx.list2")}</li>
							<li>{T.translate("nightSky.doohx.list3")}</li>
							<li>{T.translate("nightSky.doohx.list4")}</li>
						</ul>
						<HeroPanel className="desktop" />
					</div>
					<div className="courses">
						<button className="div brooke" onClick={() => setModalContent("doohx_intro_teaser")}>
							<img className="play_btn" src={play_btn} alt="" />
							<Img alt="" image={data.Brooke.childImageSharp.gatsbyImageData} />
						</button>
						<div className="inner">
							<button className="div" onClick={() => setModalContent("doohx_intro_teaser")}>
								<p className="meet_trainer">{T.translate("nightSky.courses.meetBrooke")}</p>
							</button>
							<h4>{T.translate("nightSky.courses.availableCourses")}</h4>
							<h5>
								<Link to="https://www.doohx.io/courses/pdooh-101">{T.translate("nightSky.courses.course1Title")}</Link>
							</h5>
							<p>{T.translate("nightSky.courses.course1Description")}</p>
							<h5>{T.translate("nightSky.courses.course2Title")}</h5>
							<p>{T.translate("nightSky.courses.course2Description")}</p>
							<h5>{T.translate("nightSky.courses.course3Title")}</h5>
							<p>{T.translate("nightSky.courses.course3Description")}</p>
						</div>
					</div>
					<HeroPanel className="mobile" />
				</Tank>
			</section>
			<Tank id="videos_publishers" className="u_videos">
				<h2>{T.translate("getStarted")}</h2>
				<h3 className="section_title">{T.translate("forPublishers")}</h3>
				<VideoGrid videos={publishersVideos} setModalContent={setModalContent} />
				<hr />
			</Tank>
			<Tank id="videos_buyers" className="u_videos">
				<h3 className="section_title">{T.translate("forBuyers")}</h3>
				<VideoGrid videos={buyersVideos} setModalContent={setModalContent} />
				<hr />
			</Tank>
			<Tank id="videos_case_studies" className="u_videos">
				<h2>{T.translate("caseStudies")}</h2>
				<div className="video_cards_list">
					{caseStudiesVideos.map((v, k) => {
						return <VideoCard key={k} details={v} setModalContent={setModalContent} />;
					})}
				</div>
			</Tank>
			{modalContent && (
				<Modal variant="video" onClose={() => setModalContent(false)}>
					{strIs(modalContent, "youtubeID") ? (
						<iframe
							role="presentation"
							className="the_video_frame"
							allowFullScreen
							title={modalContent}
							src={`https://www.youtube.com/embed/${modalContent}?rel=0`}
							frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							onFocus={() => markVideoAsWatched(modalContent)}></iframe>
					) : (
						<video
							autoPlay
							controls
							src={`/videos/${modalContent}.mp4`}
							poster={getSrc(data.DOOHXTeaserVideoPoster.childImageSharp.gatsbyImageData)}></video>
					)}
				</Modal>
			)}
		</Layout>
	);
}

export const queryProgrammaticUPage = graphql`
	query ProgrammaticUImages {
		Sky: file(relativePath: { eq: "heroes/programmatic_u_sky.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		Brooke: file(relativePath: { eq: "ui/doohx_brooke.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		DOOHXTeaserVideoPoster: file(relativePath: { eq: "video_posters/doohx_trailer.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		certificate: file(relativePath: { eq: "icons/programmatic_certificate.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		thumbB1: file(relativePath: { eq: "video_posters/programmatic_u_buyers_V1.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		thumbB2: file(relativePath: { eq: "video_posters/programmatic_u_buyers_V2.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		thumbB3: file(relativePath: { eq: "video_posters/programmatic_u_buyers_V3.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		thumbB4: file(relativePath: { eq: "video_posters/programmatic_u_buyers_V4.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		thumbC1: file(relativePath: { eq: "video_posters/programmatic_u_case_studies_V1.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		thumbC2: file(relativePath: { eq: "video_posters/programmatic_u_case_studies_V2.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		thumbC3: file(relativePath: { eq: "video_posters/programmatic_u_case_studies_V3.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		thumbC4: file(relativePath: { eq: "video_posters/programmatic_u_case_studies_V4.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		thumbC5: file(relativePath: { eq: "video_posters/programmatic_u_case_studies_V5.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		thumbP1: file(relativePath: { eq: "video_posters/programmatic_u_publishers_V1.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		thumbP2: file(relativePath: { eq: "video_posters/programmatic_u_publishers_V2.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		thumbP3: file(relativePath: { eq: "video_posters/programmatic_u_publishers_V3.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		thumbP4: file(relativePath: { eq: "video_posters/programmatic_u_publishers_V4.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
