import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { useDico } from "@hooks/useDico";
import { strIs } from "@annex";

import Layout from "@components/layout";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Container from "@components/Container";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import StaticPlayBtn from "@components/StaticPlayBtn";

import hero from "@img/pages/events/ise-customer-summit-2023/hero.svg";
import videos_data from "@assets/ise_customer_summit_videos.json";
import "@sass/pages/ise_customer_summit_2023.scss";

function VideoCard({ video, data, onClick }) {
	return (
		<div className="youtube_card flex flex-column align-items-start h-full">
			{video.to && <Link to="/blog/sustainability-initiatives-in-ooh-highlights-from-broadsigns-sustainability-panel" className="bg"></Link>}
			{!video.to && <button className="bg" onClick={() => onClick(video.youtubeID)}></button>}
			<div className="thumbnail rounded-xl mb-4 overflow-hidden">
				{!video.to && <StaticPlayBtn />}
				{video?.to ? (
					<Img image={data.sustainability_panel.childImageSharp.gatsbyImageData} className="bg" alt="" />
				) : (
					<img className="bg" src={`https://img.youtube.com/vi/${video.youtubeID}/0.jpg`} alt="" />
				)}
			</div>
			{video.title && <h4 className="text-reflex text-16 font-black mb-4">{video.title}</h4>}
			{video.speaker && <p className="text-ash text-12 uppercase mb-5">{video.speaker}</p>}
			{video.description && <p className="text-ash text-14 mb-6">{video.description}</p>}
			{video.to && <div className="cta uppercase mt-auto">Read the article</div>}
			{!video.to && <div className="cta uppercase mt-auto">Watch</div>}
		</div>
	);
}

function FeatureVideoCard({ video, onClick }) {
	return (
		<div className="youtube_card feature_video flex flex-column align-items-start mt-28 w-full sm:align-items-stretch">
			<button className="bg" onClick={() => onClick(video.youtubeID)}></button>
			<div className="grid">
				<div className="col-12 sm:col-8">
					<div className="thumbnail rounded-xl mb-4 overflow-hidden">
						<StaticPlayBtn />
						<img className="bg" src={`https://img.youtube.com/vi/${video.youtubeID}/0.jpg`} alt="" />
					</div>
				</div>
				<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-4">
					{video.title && <h4 className="text-reflex text-24 font-black mb-4">{video.title}</h4>}
					{video.speaker && <p className="text-ash text-12 uppercase mb-5">{video.speaker}</p>}
					{video.description && <p className="text-ash text-16 mb-6 sm:mb-8">{video.description}</p>}
					<div className="cta uppercase">Watch</div>
				</div>
			</div>
		</div>
	);
}

function BoothVideoCard({ video, onClick }) {
	return (
		<div className="youtube_card booth_video flex flex-column align-items-start mt-28 w-full sm:align-items-stretch">
			<button className="bg" onClick={() => onClick(video.youtubeID)}></button>
			<div className="grid">
				<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
					{video.title && <h4 className="text-reflex text-24 font-black mb-4">{video.title}</h4>}
					{video.speaker && <p className="text-ash text-12 uppercase mb-5">{video.speaker}</p>}
					{video.description && <p className="text-ash text-16 mb-6 sm:mb-8">{video.description}</p>}
					<div className="cta uppercase">Watch</div>
				</div>
				<div className="col-12 sm:col-6">
					<div className="thumbnail rounded-xl mb-4 overflow-hidden">
						<StaticPlayBtn />
						<img className="bg" src={`https://img.youtube.com/vi/${video.youtubeID}/0.jpg`} alt="" />
					</div>
				</div>
			</div>
		</div>

		/* 	<div className="youtube_card booth_video flex flex-column align-items-start h-full">
			<button className="bg" onClick={() => onClick(video.youtubeID)}></button>
			<div className="thumbnail rounded-xl mb-4 overflow-hidden">
				<StaticPlayBtn />
				<img className="bg" src={`https://img.youtube.com/vi/${video.youtubeID}/0.jpg`} />
			</div>
			{video.title && <h4 className="text-reflex text-16 font-black mb-4">{video.title}</h4>}
			{video.speaker && <p className="text-ash text-12 uppercase mb-5">{video.speaker}</p>}
			{video.description && <p className="text-ash text-14 mb-6">{video.description}</p>}
			<div className="cta uppercase">Watch</div>
		</div> */
	);
}

export default function Event2023ISECustomerSummitPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
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

	const { featureVideo, boothVideo, videos } = videos_data;

	return (
		<Layout id="ise_customer_summit_2023" className="theme_carolina">
			<div className="hero">
				<div className="blob blob1"></div>
				<div className="blob blob2"></div>
				<div className="blob blob3"></div>
				<div className="blob blob4"></div>
				<div className="blob blob5"></div>
				<div className="blob blob6"></div>
				<div className="blob blob7"></div>
				<div className="blob blob8"></div>
				<Container className="flex flex-column align-items-center">
					<img src={hero} className="ready_set_shine mb-12" alt="Ready, Set, Shine!" title="Ready, Set, Shine!" height="217" width="373" />
					<p className="text-white text-20 font-medium text-center mb-10 mx-auto">
						Our ISE Customer Summit event might be over, but you can still watch the keynote sessions on demand.
					</p>
					<p className="text-white text-20 font-medium text-center mx-auto">Enjoy!</p>
				</Container>
			</div>
			{featureVideo && (
				<Container>
					<FeatureVideoCard
						poster={data.featured.childImageSharp.gatsbyImageData}
						video={featureVideo}
						onClick={(id) => {
							setActiveVideo(id);
						}}
					/>
				</Container>
			)}
			<Container className="hull mx-auto my-20">
				<div className="grid">
					{videos.map((video) => (
						<div className="col-12 mb-20 sm:col-6 md:col-4" key={video.youtubeID}>
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
			{boothVideo && (
				<div className="bg-zircon py-12 sm:py-25">
					<Container>
						<BoothVideoCard
							video={boothVideo}
							onClick={(id) => {
								setActiveVideo(id);
							}}
						/>
						{/* <div className="grid">
							<div className="col-12 sm:col-6 ">
								<h2 className="text-h4 text-transform-none mb-4">Broadsign booth at ISE Barcelona 2023</h2>
								<p className="line-height-180">
									Didn't get a chance to come and see our booth this year? Here's a sneak peek at all the ISE action from this year. See you
									next time!
								</p>
							</div>
							<div className="col-12 sm:col-6 ">
								<BoothVideoCard
									video={boothVideo}
									onClick={(id) => {
										setActiveVideo(id);
									}}
								/>
							</div>
						</div> */}
					</Container>
				</div>
			)}
			{showModal && (
				<Modal variant="video" onClose={() => setShowModal(false)}>
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

export const queryIndex = graphql`
	query {
		featured: file(relativePath: { eq: "pages/events/ise-customer-summit-2023/featured.png" }) {
			...img
		}
		sustainability_panel: file(relativePath: { eq: "pages/events/ise-customer-summit-2023/sustainability_panel.jpg" }) {
			...img
		}
	}
`;
