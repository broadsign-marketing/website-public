import React, { useCallback, useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";
import { routeWithUtmForm } from "@route";
import clsx from "clsx";

import CompanyNumbers from "@components/WhoWeAre__CompanyNumbers";
import Container from "@components/Container";
import CTA from "@components/CTA";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Logo20th from "@components/Logo20th";
import Modal from "@components/Modal";

import date_today_en from "@img/pages/our-story/date_today_en.svg";
import date_today_fr from "@img/pages/our-story/date_today_fr.svg";
import date_today_es from "@img/pages/our-story/date_today_es.svg";
import date_today_de from "@img/pages/our-story/date_today_de.svg";

import hero_cta from "@img/pages/our-story/hero_cta.svg";
import date_2003_2010 from "@img/pages/our-story/date_2003_2010.svg";
import date_2010_2017 from "@img/pages/our-story/date_2010_2017.svg";
import date_2018_2023 from "@img/pages/our-story/date_2018_2023.svg";
import quote_sign from "@img/pages/our-story/quote.svg";
import icon_countries from "@img/pages/our-story/icon_countries.svg";
import icon_employees from "@img/pages/our-story/icon_employees.svg";
import icon_signs from "@img/pages/our-story/icon_signs.svg";

import "@sass/pages/our_story.scss";

function HeavySVG({ src, className, alt = "" }) {
	/*
	This whole subcomponent is to make the SVG appear only when it is on screen.
	Otherwise, to save memory, its opacity is set to 0. Without this, some SVG
	animations seem to just fail.
	*/

	const [isOnScreen, setIsOnScreen] = useState(false);

	const selfRef = useRef(null);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		function handleScroll() {
			if (!selfRef.current) {
				return;
			}

			const { bottom, top, height } = selfRef.current.getBoundingClientRect();

			if (top + height * 2 > 0 && bottom - height * 2 < window.innerHeight) {
				setIsOnScreen(true);
			} else {
				setIsOnScreen(false);
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true });

		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isOnScreen, selfRef]);

	return (
		<div className={clsx(className, "svg", isOnScreen ? "opacity-1" : "opacity-0")} ref={selfRef}>
			<img src={src} alt={alt} title={alt} className="max-w-full" />
		</div>
	);
}

function StoryPartContent({ className, content, data }) {
	return content.map((el, k) => {
		if (el.type === "p") {
			return <p className={className} dangerouslySetInnerHTML={{ __html: el.text }} key={k} />;
		}

		if (el.type === "quote") {
			return (
				<figure className="quote mt-20 mb-14 sm:ml-10 md:ml-20" key={k}>
					<img src={quote_sign} className="quote_sign z-1" alt="" />
					<blockquote className="text-18 font-serif line-height-180 relative mb-5 z-2" dangerouslySetInnerHTML={{ __html: el.text }} />
					<figcaption className="relative flex flex-nowrap z-2">
						<span className="portrait flex align-items-center">
							<Img className="portrait" image={data[`portrait_${el.portrait}`].childImageSharp.gatsbyImageData} alt="" />
						</span>
						<span className="sign text-14 pl-4 py-3">
							<span className="font-bold">{el.cite.name}</span>, {el.cite.position}
						</span>
					</figcaption>
				</figure>
			);
		}

		return null;
	});
}

export default function OurStory({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [visibleStoryParts, setVisibleStoryParts] = useState(0);
	const [isStoryPart01Unfolded, setIsStoryPart01Unfolded] = useState(false);
	const [isStoryPart02Unfolded, setIsStoryPart02Unfolded] = useState(false);
	const [isStoryPart03Unfolded, setIsStoryPart03Unfolded] = useState(false);
	const [isStoryPart04Unfolded, setIsStoryPart04Unfolded] = useState(false);
	const [showContactUsModal, setShowContactUsModal] = useState(false);

	useDico(l, dicoPath);

	let date_today_i18n;

	switch (l) {
		case "fr":
			date_today_i18n = date_today_fr;
			break;
		case "es":
			date_today_i18n = date_today_es;
			break;
		case "de":
			date_today_i18n = date_today_de;
			break;
		default:
			date_today_i18n = date_today_en;
	}

	const storyPartsRefs = useRef([]);

	const includeStoryPartInRef = useCallback(
		(part) => {
			if (part && !storyPartsRefs.current.includes(part)) {
				storyPartsRefs.current.push(part);
			}
		},
		[storyPartsRefs]
	);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		function handleScroll() {
			const vh = window.innerHeight;

			for (let x = 0; x < storyPartsRefs.current.length; x++) {
				const storyPartRectTop = storyPartsRefs.current[x]?.getBoundingClientRect().top;
				if (visibleStoryParts < x + 1 && storyPartRectTop < vh / 1.5) {
					setVisibleStoryParts(x + 1);
				}
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true });

		handleScroll();

		if (visibleStoryParts >= storyPartsRefs.current.length) {
			window.removeEventListener("scroll", handleScroll);
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [storyPartsRefs, visibleStoryParts]);

	return (
		<Layout id="our_story" className="theme_carolina">
			<section className="hero pt-15 pb-10">
				<Img className="bg" image={data.heroBg.childImageSharp.gatsbyImageData} alt="" />
				<Container className="z-2 flex flex-column align-items-center text-center">
					<h1 className="w-full text-center mt-0 mb-10">
						<Logo20th l={l} />
					</h1>
					<p className="text-white text-16 line-height-180 mb-10 max-w-600">{T.translate("hero.blurb")}</p>
					<p className="text-white text-16 font-bold line-height-180 mb-10 max-w-600">{T.translate("hero.cta")}</p>
					<CTA onClick={() => scrollTo("story")} className="scroll_down">
						<img src={hero_cta} alt={T.translate("hero.cta")} title={T.translate("hero.cta")} />
					</CTA>
				</Container>
			</section>
			<section className="story mb-6 sm:mb-16" id="story">
				<div
					className={clsx("story_part part_01 mt-16", { visible: visibleStoryParts >= 1, unfolded: isStoryPart01Unfolded })}
					ref={(el) => includeStoryPartInRef(el)}>
					<Container>
						<div className="grid">
							<div className="col-12 sm:col-6 sm:flex-order-2">
								<div className="img_wrapper">
									<div className="story_img img_01" style={{ maxWidth: "70%", left: "0%" }}>
										<Img className="w-full" image={data.story0101.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_01_01")}</label>
									</div>
									<div className="story_img img_02" style={{ maxWidth: "50%", right: "0%", marginTop: "60%" }}>
										<Img className="w-full" image={data.story0102.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_01_02")}</label>
									</div>
								</div>
							</div>
							<div className="col-12 sm:col-6 sm:flex-order-1">
								<div className="text_part">
									<h2>
										<HeavySVG src={date_2003_2010} className="mb-3" alt={T.translate("story.s01.date")} />
									</h2>
									<h3 className="text-34 text-transform-none mb-8">{T.translate("story.s01.title")}</h3>
									<StoryPartContent content={T.texts.story.s01.content} data={data} />
									<div className={clsx("toggle_fold_story_wrapper", { visible: isStoryPart01Unfolded })}>
										<button className="toggle_fold_story div font-medium" onClick={() => setIsStoryPart01Unfolded((prev) => !prev)}>
											{T.translate("foldStory")}
										</button>
									</div>
								</div>
								<div className={clsx("toggle_fold_story_wrapper", { visible: !isStoryPart01Unfolded })}>
									<button className="toggle_fold_story div font-medium" onClick={() => setIsStoryPart01Unfolded((prev) => !prev)}>
										{T.translate("unfoldStory")}
									</button>
								</div>
							</div>
						</div>
					</Container>
				</div>
				<div
					className={clsx("story_part part_02 sm:mt-16", { visible: visibleStoryParts >= 2, unfolded: isStoryPart02Unfolded })}
					ref={(el) => includeStoryPartInRef(el)}>
					<Container>
						<div className="grid">
							<div className="col-12 sm:col-6">
								<div className="img_wrapper">
									<div className="story_img img_01" style={{ maxWidth: "50%", right: "0%" }}>
										<Img className="w-full" image={data.story0201.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_02_01")}</label>
									</div>
									<div className="story_img img_02" style={{ maxWidth: "60%", left: "0%", marginTop: "28%" }}>
										<Img className="w-full" image={data.story0202.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_02_02")}</label>
									</div>
									<div className="story_img img_03" style={{ maxWidth: "40%", right: "14%", marginTop: "48%" }}>
										<Img className="w-full" image={data.story0203.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_02_03")}</label>
									</div>
								</div>
							</div>
							<div className="col-12 sm:col-6">
								<div className="text_part">
									<h2>
										<HeavySVG src={date_2010_2017} className="mb-3" alt={T.translate("story.s02.date")} />
									</h2>
									<h3 className="text-34 text-transform-none mb-8">{T.translate("story.s02.title")}</h3>
									<StoryPartContent content={T.texts.story.s02.content} data={data} />
									<div className={clsx("toggle_fold_story_wrapper", { visible: isStoryPart02Unfolded })}>
										<button className="toggle_fold_story div font-medium" onClick={() => setIsStoryPart02Unfolded((prev) => !prev)}>
											{T.translate("foldStory")}
										</button>
									</div>
								</div>
								<div className={clsx("toggle_fold_story_wrapper", { visible: !isStoryPart02Unfolded })}>
									<button className="toggle_fold_story div font-medium" onClick={() => setIsStoryPart02Unfolded((prev) => !prev)}>
										{T.translate("unfoldStory")}
									</button>
								</div>
							</div>
						</div>
					</Container>
				</div>
				<div
					className={clsx("story_part part_03 sm:mt-16", { visible: visibleStoryParts >= 3, unfolded: isStoryPart03Unfolded })}
					ref={(el) => includeStoryPartInRef(el)}>
					<Container>
						<div className="grid">
							<div className="col-12 sm:col-6 sm:flex-order-2">
								<div className="img_wrapper">
									<div className="story_img img_01" style={{ maxWidth: "52%", right: "0%" }}>
										<Img className="w-full" image={data.story0301.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_03_01")}</label>
									</div>
									<div className="story_img img_02" style={{ maxWidth: "68%", left: "0%", marginTop: "30%" }}>
										<Img className="w-full" image={data.story0302.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_03_02")}</label>
									</div>
									<div className="story_img img_03" style={{ maxWidth: "40%", left: "15%", marginTop: "70%" }}>
										<Img className="w-full" image={data.story0303.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_03_03")}</label>
									</div>
									<div className="story_img img_04" style={{ maxWidth: "50%", right: "4%", marginTop: "96%" }}>
										<Img className="w-full" image={data.story0304.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_03_04")}</label>
									</div>
								</div>
							</div>
							<div className="col-12 sm:col-6 sm:flex-order-1">
								<div className="text_part">
									<h2>
										<HeavySVG src={date_2018_2023} className="mb-3" alt={T.translate("story.s03.date")} />
									</h2>
									<h3 className="text-34 text-transform-none mb-8">{T.translate("story.s03.title")}</h3>
									<StoryPartContent content={T.texts.story.s03.content} data={data} />
									<div className={clsx("toggle_fold_story_wrapper", { visible: isStoryPart03Unfolded })}>
										<button className="toggle_fold_story div font-medium" onClick={() => setIsStoryPart03Unfolded((prev) => !prev)}>
											{T.translate("foldStory")}
										</button>
									</div>
								</div>
								<div className={clsx("toggle_fold_story_wrapper", { visible: !isStoryPart03Unfolded })}>
									<button className="toggle_fold_story div font-medium" onClick={() => setIsStoryPart03Unfolded((prev) => !prev)}>
										{T.translate("unfoldStory")}
									</button>
								</div>
							</div>
						</div>
					</Container>
				</div>
				<div
					className={clsx("story_part part_04 sm:mt-16", { visible: visibleStoryParts >= 4, unfolded: isStoryPart04Unfolded })}
					ref={(el) => includeStoryPartInRef(el)}>
					<Container>
						<div className="grid">
							<div className="col-12 sm:col-6">
								<div className="img_wrapper">
									<div className="story_img img_01" style={{ maxWidth: "35%", right: "5%" }}>
										<Img className="w-full" image={data.story0401.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_04_01")}</label>
									</div>
									<div className="story_img img_02" style={{ maxWidth: "80%", left: "0%", marginTop: "18%" }}>
										<Img className="w-full" image={data.story0402.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_04_02")}</label>
									</div>
									<div className="story_img img_03" style={{ maxWidth: "66%", right: "0%", marginTop: "42%" }}>
										<Img className="w-full" image={data.story0403.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_04_03")}</label>
									</div>
									<div className="story_img img_04" style={{ maxWidth: "40%", left: "14%", marginTop: "65%" }}>
										<Img className="w-full" image={data.story0404.childImageSharp.gatsbyImageData} alt="" />
										<label>{T.translate("caption_04_04")}</label>
									</div>
								</div>
							</div>
							<div className="col-12 sm:col-6">
								<div className="text_part">
									<h2>
										<HeavySVG src={date_today_i18n} className="mb-12" alt={T.translate("story.s04.date")} />
									</h2>
									<StoryPartContent content={T.texts.story.s04.content} data={data} />
									<div className={clsx("toggle_fold_story_wrapper", { visible: isStoryPart04Unfolded })}>
										<button className="toggle_fold_story div font-medium" onClick={() => setIsStoryPart04Unfolded((prev) => !prev)}>
											{T.translate("foldStory")}
										</button>
									</div>
								</div>
								<div className={clsx("toggle_fold_story_wrapper", { visible: !isStoryPart04Unfolded })}>
									<button className="toggle_fold_story div font-medium" onClick={() => setIsStoryPart04Unfolded((prev) => !prev)}>
										{T.translate("unfoldStory")}
									</button>
								</div>
							</div>
						</div>
					</Container>
				</div>
			</section>
			<section className="stats mb-16 mx-auto sm:mb-30">
				<Container>
					<CompanyNumbers />
				</Container>
			</section>
			<section className="shin mb-16">
				<Container>
					<div className="grid">
						<div className="col-12 mb-8 sm:col-6 sm:flex-order-2 sm:mb-0 md:col-8">
							<Img className="thumb rounded-xl" image={data.inspired.childImageSharp.gatsbyImageData} alt="" />
						</div>
						<div className="col-12 sm:col-6 sm:flex-order-1 md:col-4 sm:flex sm:flex-column sm:align-items-start sm:justify-content-center">
							<h2 className="text-34 text-transform-none mb-2">{T.translate("shin.title")}</h2>
							<p className="mb-8">{T.translate("shin.par")}</p>
							<CTA className="primary" onClick={() => setShowContactUsModal(true)}>
								{T.translate("shin.cta")}
							</CTA>
						</div>
					</div>
				</Container>
			</section>
			{showContactUsModal && (
				<Modal variant="form" className="theme_carolina" onClose={() => setShowContactUsModal(false)}>
					<Form form="contact" submitText="Get in touch" redirectUrl={routeWithUtmForm("thankYou", "contact_us")} />
				</Modal>
			)}
		</Layout>
	);
}

export const query = graphql`
	query {
		heroBg: file(relativePath: { eq: "pages/our-story/hero_bg.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		story0101: file(relativePath: { eq: "pages/our-story/story_part_01_01.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0102: file(relativePath: { eq: "pages/our-story/story_part_01_02.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0201: file(relativePath: { eq: "pages/our-story/story_part_02_01.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0202: file(relativePath: { eq: "pages/our-story/story_part_02_02.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0203: file(relativePath: { eq: "pages/our-story/story_part_02_03.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0301: file(relativePath: { eq: "pages/our-story/story_part_03_01.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0302: file(relativePath: { eq: "pages/our-story/story_part_03_02.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0303: file(relativePath: { eq: "pages/our-story/story_part_03_03.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0304: file(relativePath: { eq: "pages/our-story/story_part_03_04.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0401: file(relativePath: { eq: "pages/our-story/story_part_04_01.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0402: file(relativePath: { eq: "pages/our-story/story_part_04_02.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0403: file(relativePath: { eq: "pages/our-story/story_part_04_03.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		story0404: file(relativePath: { eq: "pages/our-story/story_part_04_04.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		inspired: file(relativePath: { eq: "pages/our-story/inspired.jpg" }) {
			...img
		}

		portrait_bryan_mongeau: file(relativePath: { eq: "ui/portrait_bryan_mongeau.png" }) {
			...img
		}
		portrait_burr_smith: file(relativePath: { eq: "ui/portrait_burr_smith.png" }) {
			...img
		}
	}
`;

/* export const query = graphql`
	query ($l: String!) {}
`; */
