import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { strIs } from "@annex";

import Layout from "@components/layout";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Container from "@components/Container";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import StaticPlayBtn from "@components/StaticPlayBtn";

import play_btn from "@img/controls/play_btn_solid_white.svg";

import "@sass/pages/event_broadsign_connect_summit_2024.scss";

function VideoCard({ video, video: { youtubeID, speakers, to }, data, onClick }) {
	return (
		<div className="video_card bg-zircon flex flex-column align-items-start h-full rounded-xl overflow-hidden">
			{to && <Link to="/blog/sustainability-initiatives-in-ooh-highlights-from-broadsigns-sustainability-panel" className="play_zone bg z-2"></Link>}
			{!to && <button className="play_zone bg z-2" onClick={() => onClick(video.youtubeID)}></button>}
			<div className="thumbnail mb-4 z-1">
				{!to && <img className="play_btn z-5" src={play_btn} alt="" />}
				{video?.to ? (
					<Img image={data.video_thumbnail.childImageSharp.gatsbyImageData} className="bg" alt="" />
				) : (
					<img className="bg" src={`https://img.youtube.com/vi/${video.youtubeID}/0.jpg`} alt="" />
				)}
			</div>
			<div className="details bg-zircon p-3 sm:px-6 sm:py-4 z-1">
				{video.title && <h4 className="text-reflex text-20 font-black mb-6">{video.title}</h4>}
				{speakers && (
					<div className="speakers mb-8">
						{speakers.map(({ portrait, name }, k) => (
							<div className="speaker flex flex-row flex-nowrap align-items-center my-2" key={portrait + k}>
								<div className="portrait_wrapper mr-2">
									<Img className="portrait" image={data[`portrait_${portrait}`].childImageSharp.gatsbyImageData} objectFit="cover" alt="" />
								</div>
								<p className="subtitle-1 gradient font-medium m-0">{name}</p>
							</div>
						))}
					</div>
				)}
				{video.description && <p className="text-ash text-14 mb-6">{video.description}</p>}
				{to && <div className="cta uppercase mt-auto">Read the article</div>}
				{!to && <div className="cta uppercase mt-auto">Watch</div>}
			</div>
		</div>
	);
}

function FeatureVideoCard({ video, poster, onClick }) {
	return (
		<div className="video_card featured flex flex-column align-items-start mt-12 rounded-xl overflow-hidden w-full sm:align-items-stretch md:mt-28">
			<div className="overlay w-full flex flex-column flex-nowrap z-2 sm:flex-row">
				<div className="thumbnail mb-4 overflow-hidden sm:mb-0">
					<Img image={poster} className="bg" objectPosition="left center" alt="" />
				</div>
				<div className="flex flex-column align-items-start justify-content-center px-4 pb-4 sm:p-8">
					{video.title && <h4 className="h4 text-reflex mb-4">{video.title}</h4>}
					{video.speaker && <p className="text-ash text-12 uppercase mb-5">{video.speaker}</p>}
					{video.description && <p className="text-ash text-16 mb-6 sm:mb-8">{video.description}</p>}
					<div className="cta uppercase">Watch</div>
				</div>
			</div>
			<button className="div bg bg-zircon rounded-xl z-1" onClick={() => onClick(video.youtubeID)}></button>
		</div>
	);
}

export default function Event2024BroadsignConnectPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [activeVideo, setActiveVideo] = useState("");
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (strIs(activeVideo, "youtubeID")) {
			setShowModal(true);
		} else {
			setShowModal(false);
		}
	}, [activeVideo]);

	useDico(l, dicoPath.replace("events-archives", "events"));

	const { featuredVideo, videos } = T.texts;

	return (
		<Layout id="broadsign_connect_summit_2024" className="theme_carolina">
			<div className="hero bg-cerulean flex flex-column align-items-center">
				<Img className="hero_img mx-auto mb-10" image={data.hero.childImageSharp.gatsbyImageData} alt="" />
				<Container className="flex flex-column align-items-center sm:pb-8">
					{T.texts.hero.pars.map((par, k) => (
						<p className="text-white text-20 font-medium text-center mb-8 mx-auto" key={k}>
							{par}
						</p>
					))}
				</Container>
			</div>
			{featuredVideo && (
				<Container>
					<FeatureVideoCard
						poster={data.featured.childImageSharp.gatsbyImageData}
						video={featuredVideo}
						onClick={(id) => {
							setActiveVideo(id);
						}}
					/>
				</Container>
			)}
			<Container className="hull mx-auto mt-4 mb-20 md:mt-20">
				<div className="grid">
					{videos.map((video) => (
						<div className="col-12 sm:col-6 md:col-4" key={video.youtubeID}>
							<VideoCard
								video={video}
								data={data}
								onClick={(id) => {
									setActiveVideo(id);
								}}
							/>
						</div>
					))}
				</div>
			</Container>
			{showModal && (
				<Modal variant="video" onClose={() => setActiveVideo("")}>
					<iframe
						allowFullScreen
						role="presentation"
						className="the_video_frame"
						title={activeVideo.title}
						src={"https://www.youtube.com/embed/" + activeVideo}
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						onFocus={() => setWebinarCookie(modalContent.formID)}></iframe>
				</Modal>
			)}
		</Layout>
	);
}

export const query = graphql`
	query {
		hero: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/hero.png" }) {
			...img
		}
		featured: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/featured_thumbnail.jpg" }) {
			...img
		}
		video_thumbnail: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/video_thumbnail.jpg" }) {
			...img
		}

		portrait_francois_hechme: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/portrait_francois_hechme.png" }) {
			...img
		}
		portrait_gavin_lee: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/portrait_gavin_lee.png" }) {
			...img
		}
		portrait_daan_krijnen: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/portrait_daan_krijnen.png" }) {
			...img
		}
		portrait_pascal_arntz: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/portrait_pascal_arntz.png" }) {
			...img
		}
		portrait_judita_jersovaite: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/portrait_judita_jersovaite.png" }) {
			...img
		}
		portrait_catherine_lee: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/portrait_catherine_lee.png" }) {
			...img
		}
		portrait_annie_rickard: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/portrait_annie_rickard.png" }) {
			...img
		}
		portrait_ben_milne: file(relativePath: { eq: "pages/events/broadsign-connect-summit-2024/portrait_ben_milne.png" }) {
			...img
		}
	}
`;
