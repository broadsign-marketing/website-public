import React, { useEffect, useMemo, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import CompanyNumbers from "@components/WhoWeAre__CompanyNumbers";
import Container from "@components/Container";
import CTA from "@components/CTA";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Logo20th from "@components/Logo20th";
import Layout from "@components/layout";
import Modal from "@components/Modal";
import Video from "@components/Video";

import "@sass/pages/who_we_are.scss";

function LeaderProfile({ onOpen, profile, thumbnail }) {
	const openProfile = () => {
		onOpen && onOpen(profile);
	};

	return (
		<div className="profile rounded-xl flex flex-center" id={profile.key}>
			<div className="profile_wrapper w-full">
				<Img image={thumbnail} alt={profile.name} />
				<div className="profile_container">
					<div className="text">
						<div className="bg"></div>
						<h3 className="name">{profile.name}</h3>
						<p className="title">{profile.title}</p>
						<CTA
							id={profile.key}
							className="bg-cerulean text-white border-cerulean hover:bg-white hover:text-cerulean rounded-8"
							onClick={() => {
								openProfile();
							}}>
							{T.translate("viewProfile")}
						</CTA>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function WhoWeArePage({ pageContext: { l, dicoPath }, location: { pathname, hash }, data }) {
	const [modalContent, setModalContent] = useState(false);
	const [heroBgIsLoaded, setHeroBgIsLoaded] = useState(false);

	useDico(l, dicoPath);

	const leaders = useMemo(() => {
		const leaderDescriptions = data.leadersData.nodes;

		return leaderDescriptions.map((leader) => {
			leader.imageFull = data[leader.key].childImageSharp.gatsbyImageData;
			leader.imageSquare = data[`${leader.key}_square`].childImageSharp.gatsbyImageData;
			return leader;
		});
	}, [data]);

	useEffect(() => {
		const h = hash.replace("#", "");
		const findALeader = leaders.find((leader) => leader.key === h);

		if (findALeader && findALeader) {
			setModalContent(findALeader);
		}
	}, [hash, leaders]);

	return (
		<Layout id="who_we_are" className="theme_carolina">
			<div className="hero flex flex-center">
				<Img image={data.heroBg.childImageSharp.gatsbyImageData} className="bg" alt="" onStartLoad={() => setHeroBgIsLoaded(true)} />
				<Container>
					<h1 className="w-full text-center">{heroBgIsLoaded && <Logo20th l={l} />}</h1>
				</Container>
			</div>
			<Container className="intro my-20">
				{["en"].includes(l) && (
					<div className="grid">
						<div className="col-12">
							<h2 className="h4 text-reflex line-height-140 text-transform-none text-center">{T.translate("intro.title")}</h2>
						</div>
						<div className="col-12 sm:col-6">
							<p className="text-16 line-height-180">{T.translate("intro.par1")}</p>
						</div>
						<div className="col-12 sm:col-6">
							<p className="text-16 line-height-180">{T.translate("intro.par2")}</p>
						</div>
					</div>
				)}
				{["fr", "ja", "zh"].includes(l) && (
					<div className="grid">
						<div className="col-12 sm:col-6">
							<h2 className="h4 text-reflex line-height-140 text-transform-none">{T.translate("intro.par1")}</h2>
						</div>
						<div className="col-12 sm:col-6">
							<p className="text-16 line-height-180">{T.translate("intro.par2")}</p>
							<p className="text-16 line-height-180">{T.translate("intro.par3")}</p>
							<p className="text-16 line-height-180">{T.translate("intro.par4")}</p>
						</div>
					</div>
				)}
				{["cn"].includes(l) && (
					<div className="grid">
						<div className="col-12 sm:col-6">
							<h2 className="h4 text-reflex line-height-140 text-transform-none pr-6">{T.translate("content.contentTitle")}</h2>
						</div>
						<div className="col-12 sm:col-6">
							<p className="text-16 line-height-180">{T.translate("content.contentBelieve")}</p>
							<p className="text-16 line-height-180">{T.translate("content.contentEasier")}</p>
						</div>
					</div>
				)}
			</Container>
			<section className="stats mb-16 mx-auto sm:mb-30">
				<Container>
					<CompanyNumbers />
				</Container>
			</section>
			<Container className="mt-8 sm:mt-16">
				<Video poster={data[`videoPoster_${l}`].childImageSharp.gatsbyImageData} VimeoID="889511049" playBtnStyle="gradient_blue" />
			</Container>
			<Container className="leadership">
				<div className="gradient_line"></div>
				<h2 className="h4 text-reflex line-height-140 text-transform-none text-center sm:text-left">{T.translate("leadersTitle")}</h2>
				<div className="profiles">
					{leaders.map((leader) => (
						<LeaderProfile profile={leader} key={leader.key} thumbnail={leader.imageSquare} onOpen={() => setModalContent(leader)} />
					))}
				</div>
			</Container>
			{modalContent && (
				<Modal className="modal_leader_profile flex flex-column sm:flex-row" variant="large" onClose={() => setModalContent(false)}>
					<Img alt="" className="profile_picture desktop h-full" image={modalContent.imageFull} objectPosition="right top" />
					<Img alt="" className="profile_picture mobile" image={modalContent.imageSquare} objectPosition="center top" />
					<div className="description">
						<h3 className="name mb-4">{modalContent.name}</h3>
						<h4 className="title">
							{modalContent.title} {modalContent.badge && <em>{modalContent.badge}</em>}
						</h4>
						{modalContent.description.map((par, k) => (
							<p key={k}>{par}</p>
						))}
					</div>
				</Modal>
			)}
		</Layout>
	);
}

export const queryWhoWeAre = graphql`
	fragment LeaderSquare on File {
		childImageSharp {
			gatsbyImageData(width: 280, height: 300)
		}
	}

	fragment LeaderFull on File {
		childImageSharp {
			gatsbyImageData(width: 480)
		}
	}

	query ($l: String!) {
		heroBg: file(relativePath: { eq: "pages/who-we-are/hero_bg.jpg" }) {
			...img
		}

		videoPoster_en: file(relativePath: { eq: "video_posters/this_screen_runs_on_broadsign_en.jpg" }) {
			...img
		}
		videoPoster_fr: file(relativePath: { eq: "video_posters/this_screen_runs_on_broadsign_fr.jpg" }) {
			...img
		}
		videoPoster_es: file(relativePath: { eq: "video_posters/this_screen_runs_on_broadsign_es.jpg" }) {
			...img
		}
		videoPoster_ja: file(relativePath: { eq: "video_posters/this_screen_runs_on_broadsign_en.jpg" }) {
			...img
		}
		videoPoster_zh: file(relativePath: { eq: "video_posters/this_screen_runs_on_broadsign_en.jpg" }) {
			...img
		}

		burrsmith_square: file(relativePath: { eq: "leaders/burr_smith_square.jpg" }) {
			...LeaderSquare
		}
		danatunks_square: file(relativePath: { eq: "leaders/dana_tunks_square.jpg" }) {
			...LeaderSquare
		}
		joecotugno_square: file(relativePath: { eq: "leaders/joe_cotugno_square.jpg" }) {
			...LeaderSquare
		}
		maartendollevoet_square: file(relativePath: { eq: "leaders/maarten_dollevoet_square.jpg" }) {
			...LeaderSquare
		}
		adamgreen_square: file(relativePath: { eq: "leaders/adam_green_square.jpg" }) {
			...LeaderSquare
		}
		bryanmongeau_square: file(relativePath: { eq: "leaders/bryan_mongeau_square.jpg" }) {
			...LeaderSquare
		}
		raphaelabele_square: file(relativePath: { eq: "leaders/raphael_abele_square.jpg" }) {
			...LeaderSquare
		}
		tracyanema_square: file(relativePath: { eq: "leaders/tracy_anema_square.jpg" }) {
			...LeaderSquare
		}
		johndolan_square: file(relativePath: { eq: "leaders/john_dolan_square.jpg" }) {
			...LeaderSquare
		}
		edithgagne_square: file(relativePath: { eq: "leaders/edith_gagne_square.jpg" }) {
			...LeaderSquare
		}
		giovangentile_square: file(relativePath: { eq: "leaders/giovan_gentile_square.jpg" }) {
			...LeaderSquare
		}
		liseannegillham_square: file(relativePath: { eq: "leaders/liseanne_gillham_square.jpg" }) {
			...LeaderSquare
		}
		meghanhastings_square: file(relativePath: { eq: "leaders/meghan_hastings_square.jpg" }) {
			...LeaderSquare
		}
		francoishechme_square: file(relativePath: { eq: "leaders/francois_hechme_square.jpg" }) {
			...LeaderSquare
		}
		francoromanelli_square: file(relativePath: { eq: "leaders/franco_romanelli_square.jpg" }) {
			...LeaderSquare
		}
		frankvallenga_square: file(relativePath: { eq: "leaders/frank_vallenga_square.jpg" }) {
			...LeaderSquare
		}
		remiroques_square: file(relativePath: { eq: "leaders/remi_roques_square.jpg" }) {
			...LeaderSquare
		}

		burrsmith: file(relativePath: { eq: "leaders/burr_smith.png" }) {
			...LeaderFull
		}
		danatunks: file(relativePath: { eq: "leaders/dana_tunks.png" }) {
			...LeaderFull
		}
		joecotugno: file(relativePath: { eq: "leaders/joe_cotugno.png" }) {
			...LeaderFull
		}
		maartendollevoet: file(relativePath: { eq: "leaders/maarten_dollevoet.png" }) {
			...LeaderFull
		}
		adamgreen: file(relativePath: { eq: "leaders/adam_green.png" }) {
			...LeaderFull
		}
		bryanmongeau: file(relativePath: { eq: "leaders/bryan_mongeau.png" }) {
			...LeaderFull
		}
		raphaelabele: file(relativePath: { eq: "leaders/raphael_abele.png" }) {
			...LeaderFull
		}
		tracyanema: file(relativePath: { eq: "leaders/tracy_anema.png" }) {
			...LeaderFull
		}
		johndolan: file(relativePath: { eq: "leaders/john_dolan.png" }) {
			...LeaderFull
		}
		edithgagne: file(relativePath: { eq: "leaders/edith_gagne.png" }) {
			...LeaderFull
		}
		giovangentile: file(relativePath: { eq: "leaders/giovan_gentile.png" }) {
			...LeaderFull
		}
		liseannegillham: file(relativePath: { eq: "leaders/liseanne_gillham.png" }) {
			...LeaderFull
		}
		meghanhastings: file(relativePath: { eq: "leaders/meghan_hastings.png" }) {
			...LeaderFull
		}
		francoishechme: file(relativePath: { eq: "leaders/francois_hechme.png" }) {
			...LeaderFull
		}
		francoromanelli: file(relativePath: { eq: "leaders/franco_romanelli.png" }) {
			...LeaderFull
		}
		frankvallenga: file(relativePath: { eq: "leaders/frank_vallenga.png" }) {
			...LeaderFull
		}
		remiroques: file(relativePath: { eq: "leaders/remi_roques.png" }) {
			...LeaderFull
		}

		leadersData: allLeadersJson(filter: { language: { eq: $l } }, sort: { order: ASC }) {
			nodes {
				badge
				key
				name
				title
				description
				language
			}
		}
	}
`;
