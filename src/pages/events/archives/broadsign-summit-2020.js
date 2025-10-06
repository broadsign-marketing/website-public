import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { strIs } from "@annex";

import Layout from "@components/layout";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Container from "@components/Container";
import Modal from "@components/Modal";

import "@sass/pages/event_broadsign_summit_2020.scss";

function FeatureVideoCard({ video, poster, onClick }) {
	return (
		<div className="video_card featured flex flex-column align-items-start mt-12 rounded-xl overflow-hidden w-full sm:align-items-stretch md:mt-28">
			<div className="overlay w-full flex flex-column flex-nowrap z-2 sm:flex-row">
				<div className="thumbnail mb-4 overflow-hidden sm:mb-0">
					<Img image={poster} className="bg" alt="" />
				</div>
				<div className="description flex flex-column align-items-start justify-content-center px-4 pb-4 sm:p-6 md:p-8">
					{video.title && <h4 className="text-reflex text-22 md:text-24 line-height-120 mb-4">{video.title}</h4>}
					{video.speaker && <p className="text-ash text-12 uppercase mb-5">{video.speaker}</p>}
					{video.description && video.description.map((par) => <p className="text-ash text-15 mb-6 sm:mb-4 md:text-16 md:mb-8">{par}</p>)}
					<div className="cta uppercase">Watch</div>
				</div>
			</div>
			<button className="div bg bg-zircon rounded-xl z-1" onClick={() => onClick(video.youtubeID)}></button>
		</div>
	);
}

export default function Event2020BroadsignSummitPage({ pageContext: { l, dicoPath }, data }) {
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

	const { featuredVideo } = T.texts;

	return (
		<Layout id="broadsign_summit_2020" className="theme_carolina">
			<div className="hero bg-cerulean flex flex-column align-items-center">
				<Img className="hero_img" image={data.hero.childImageSharp.gatsbyImageData} alt="" />
			</div>
			{featuredVideo && (
				<Container className="mb-20">
					<FeatureVideoCard
						poster={data.featured.childImageSharp.gatsbyImageData}
						video={featuredVideo}
						onClick={(id) => {
							setActiveVideo(id);
						}}
					/>
				</Container>
			)}
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
		hero: file(relativePath: { eq: "pages/events/broadsign-summit-2020/hero.jpg" }) {
			...img
		}
		featured: file(relativePath: { eq: "pages/events/broadsign-summit-2020/video_poster.jpg" }) {
			...img
		}
	}
`;
