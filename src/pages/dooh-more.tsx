import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { useSwipeable } from "react-swipeable";
import clsx from "clsx";
import { blogPostSlug, loopTo } from "@annex";

import Container from "@components/Container";
import CTA from "@components/CTA";
import Form from "@components/Form";
import FundedBillboards from "@components/FundedBillboards";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import NeonBox from "@components/NeonBox";
import Video from "@components/Video";

import { NeckSectionAnimations, FeaturesRotatingTitle, FeatureCampaignReallocation, FeatureNewBuyers } from "@components/DOOHMore__Anims";
import TestimonyQuote from "@components/DOOHMore__Quote";

import "@sass/pages/dooh_more.scss";

import curvy_arrow from "@img/pages/dooh-more/curvy_arrow.svg";

import logo_ocean from "@logos/ocean_reflex.svg";
import logo_elevision from "@logos/elevision_reflex.svg";
import logo_imedia from "@logos/imedia_reflex.svg";
import logo_orb from "@logos/orb_reflex.svg";

import arrow_previous_cerulean from "@img/controls/arrow_previous_cerulean.svg";

import overtitle from "@img/pages/dooh-more/overtitle.svg";

import more_campaigns_en from "@img/pages/dooh-more/more_campaigns_en.svg";
import more_campaigns_fr from "@img/pages/dooh-more/more_campaigns_en.svg";
import billions_more_en from "@img/pages/dooh-more/billions_more_en.svg";
import billions_more_fr from "@img/pages/dooh-more/billions_more_en.svg";

import type { BroadsignPageProps } from "@types";

function PostCard({ link, thumb, companyLogo, title, cta }) {
	const [showVideoModal, setShowVideoModal] = useState(false);

	if (link === "ocean") {
		return (
			<div className="col col-12 sm:col-6 lg:col-3">
				<button onClick={() => setShowVideoModal(true)} className={clsx("post_card div bg-zircon flex flex-column rounded-xl h-full overflow-hidden")}>
					<Img className="post_thumb" image={thumb} alt="" />
					<div className="post_details flex flex-column justify-content-between flex-auto text-left p-4 md:px-6 md:py-5">
						<img className="company_logo mb-4" src={companyLogo} alt="" />
						<h3 className="post_title text-reflex text-20 font-bold text-transform-none mb-8">{title}</h3>
						<p className="mb-0 mt-auto">
							<span className="link_cerulean_arrow text-14 text-cerulean uppercase letter-spacing-10">{cta}</span>
						</p>
					</div>
				</button>
				<Modal show={showVideoModal} variant="video" onClose={() => setShowVideoModal(false)}>
					<Video YoutubeID="tHudkCbed9E" poster={thumb} />
				</Modal>
			</div>
		);
	}

	return (
		<div className="col col-12 sm:col-6 lg:col-3">
			<Link to={link} className={clsx("post_card bg-zircon flex flex-column rounded-xl h-full overflow-hidden")}>
				<Img className="post_thumb" image={thumb} alt="" />
				<div className="post_details flex flex-column justify-content-between flex-auto text-left p-4 md:px-6 md:py-5">
					<img className="company_logo mb-4" src={companyLogo} alt="" />
					<h3 className="post_title text-reflex text-20 font-bold text-transform-none mb-8">{title}</h3>
					<p className="mb-0 mt-auto">
						<span className="link_cerulean_arrow text-14 text-cerulean uppercase letter-spacing-10">{cta}</span>
					</p>
				</div>
			</Link>
		</div>
	);
}

function Testimonies({ data, companyLogos }) {
	const [pos, setPos] = useState(0);
	const [adjustLeftPos, setAdjustLeftPos] = useState(0);

	const testimonies = T.texts.testimonies.list;
	const testimoniesQty = testimonies.length;

	const handleSwipe = useCallback(
		($e) => {
			if ($e.dir === "Right") {
				setPos(loopTo("prev", pos, testimoniesQty));
			}

			if ($e.dir === "Left") {
				setPos(loopTo("next", pos, testimoniesQty));
			}

			setAdjustLeftPos(0);
		},
		[pos, testimoniesQty]
	);

	const handleMouseDown = useCallback(($e) => {
		if ($e.deltaX) {
			setAdjustLeftPos($e.deltaX);
			return;
		}
	}, []);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: ($e) => handleSwipe($e),
		onSwipedRight: ($e) => handleSwipe($e),
		onSwiping: ($e) => handleMouseDown($e),
		trackMouse: true,
		trackTouch: true,
	});

	const scrollbarTrackerPos = Math.round((pos / testimoniesQty) * 100);
	const scrollbarTrackerWidth = 100 / testimoniesQty;

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "ArrowRight") {
				handleSwipe({ dir: "Left" });
			} else if (event.key === "ArrowLeft") {
				handleSwipe({ dir: "Right" });
			}
		};

		window.addEventListener("keyup", handleKeyDown);
		window.addEventListener("touchend", () => setAdjustLeftPos(0));

		return () => {
			window.removeEventListener("keyup", handleKeyDown);
			window.removeEventListener("touchend", () => setAdjustLeftPos(0));
		};
	}, [handleSwipe, handleMouseDown]);

	return (
		<section className="testimonies overflow-hidden">
			<Container>
				<h2 className="overtitle text-30 text-transform-none text-center mx-auto mb-15 sm:text-34">{T.translate("testimonies.title")}</h2>
				<div className="DOOHMoreQuotes bg-white" {...swipeHandlers} data-carousel-pos={pos}>
					<button className="arrow_btn prev div" onClick={() => handleSwipe({ dir: "Right" })}>
						<span className="arrow_wrapper">
							<img className="arrow" src={arrow_previous_cerulean} alt="" />
						</span>
					</button>
					<div className="overflow-hidden w-full">
						<div
							className={clsx("quotes_wrapper flex align-items-stretch nowrap w-full", adjustLeftPos === 0 ? "" : "is_swiping")}
							style={{ transform: `translateX(calc(-${pos * 100}% - ${pos * 32}px))`, left: `${adjustLeftPos}px` }}>
							{testimonies.map((e) => (
								<TestimonyQuote
									{...e}
									companyLogo={companyLogos[e.id]}
									portrait={data[`portrait_${e.id}`].childImageSharp.gatsbyImageData}
									key={e.id}
								/>
							))}
						</div>
					</div>
					<div className="scrollbar bg-ev w-full">
						<div className="tracker bg-cerulean h-full" style={{ left: `${scrollbarTrackerPos}%`, width: `${scrollbarTrackerWidth}%` }}></div>
					</div>
					<button className="arrow_btn next div" onClick={() => handleSwipe({ dir: "Left" })}>
						<span className="arrow_wrapper">
							<img className="arrow" src={arrow_previous_cerulean} alt="" />
						</span>
					</button>
				</div>
			</Container>
		</section>
	);
}

export default function DOOHMore({ pageContext: { l, dicoPath }, data }: BroadsignPageProps) {
	const [showBookACallModal, setShowBookACallModal] = useState(false);

	useDico(l, dicoPath);

	const companyLogos = {
		ocean: logo_ocean,
		elevision: logo_elevision,
		imedia: logo_imedia,
		orb: logo_orb,
	};

	const handleBlogScroll = useCallback((dir) => {
		if (!document) return;

		const target = document.querySelector(".blog_posts .grid");
		const distance = target.offsetWidth / 2;

		if (dir === "prev") {
			target.scrollLeft -= distance;
		}

		if (dir === "next") {
			target.scrollLeft += distance;
		}

		setTimeout(() => {
			const btnPrev = document.querySelector(".blog_posts .arrow_btn.prev");
			const btnNext = document.querySelector(".blog_posts .arrow_btn.next");

			const maxScrollLeft = target.scrollWidth - target.clientWidth;

			// Update btnPrev class
			if (target.scrollLeft === 0) {
				btnPrev.classList.add("opacity-0");
				btnPrev.classList.remove("opacity-1");
			} else {
				btnPrev.classList.add("opacity-1");
				btnPrev.classList.remove("opacity-0");
			}

			// Update btnNext class
			if (target.scrollLeft >= maxScrollLeft) {
				btnNext.classList.add("opacity-0");
				btnNext.classList.remove("opacity-1");
			} else {
				btnNext.classList.add("opacity-1");
				btnNext.classList.remove("opacity-0");
			}
		}, 500);
	}, []);

	const handleScroll = useCallback(($e) => {
		const { target } = $e.event;
		const distance = target.parentNode.offsetWidth / 2;

		if ($e.dir === "Right") {
			target.parentNode.scrollLeft -= distance;
		}

		if ($e.dir === "Left") {
			target.parentNode.scrollLeft += distance;
		}
	}, []);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: ($e) => handleScroll($e),
		onSwipedRight: ($e) => handleScroll($e),
		trackMouse: true,
		trackTouch: false,
	});

	const postIDs: { en: number[] } = { en: [43163, 42639, 41739] };

	const posts: any = data.posts.nodes
		.map((post: any) => {
			const ids = postIDs[l] || postIDs["en"];
			if (!ids.includes(post.databaseId)) return null;

			let out = post;
			out.link = blogPostSlug(post.slug, post.language.slug);

			if (out.link.match(/orb/)) out.companyId = "orb";
			if (out.link.match(/elevision/)) out.companyId = "elevision";
			if (out.link.match(/i\-media/)) out.companyId = "imedia";

			return out;
		})
		.filter(Boolean);

	const more_campaigns = useMemo(() => {
		if (l === "fr") return more_campaigns_fr;
		return more_campaigns_en;
	}, [l]);

	const billions_more = useMemo(() => {
		if (l === "fr") return billions_more_fr;
		return billions_more_en;
	}, [l]);

	return (
		<Layout id="dooh_more" className="theme_carolina">
			<section className="hero mb-20">
				<Container>
					<div className="bg-city">
						<div className="grid">
							<div className="col-12 sm:col-6 md:col-5">
								<h1 className="text-gradient line-height-100 text-transform-none pb-2 mt-10 sm:mt-0">{T.translate("hero.title")}</h1>
								<h3 className="text-24 text-transform-none mb-8">{T.translate("hero.subtitle")}</h3>
								<p className="blurb text-ash mb-0 sm:mb-8" style={{ maxWidth: "400px" }}>
									{T.translate("hero.blurb")}
								</p>
								<CTA className="primary hidden sm:inline-flex" onClick={() => setShowBookACallModal(true)}>
									{T.translate("hero.cta")}
								</CTA>
							</div>
							<div className="col-12 sm:col-6 md:col-7">
								<div className="flex align-items-center w-full sm:h-full">
									<FundedBillboards
										images={[
											data.hero_billboard_01.childImageSharp.gatsbyImageData,
											data.hero_billboard_02.childImageSharp.gatsbyImageData,
											data.hero_billboard_03.childImageSharp.gatsbyImageData,
											data.hero_billboard_04.childImageSharp.gatsbyImageData,
											data.hero_billboard_05.childImageSharp.gatsbyImageData,
										]}
									/>
								</div>
								<CTA className="primary inline-flex mt-25 mb-10 sm:hidden" onClick={() => setShowBookACallModal(true)}>
									{T.translate("hero.cta")}
								</CTA>
							</div>
						</div>
					</div>
				</Container>
			</section>
			<Container tag="section" className="neck mb-40 sm:mb-20">
				<div className="grid">
					<div className="col-12 sm:col-5">
						<NeonBox className="box_1">
							<p className="text-reflex mb-6">{T.translate("neck.box1.intro")}</p>
							<img className="box_desc" src={more_campaigns} alt={T.translate("neck.box1.what") + " " + T.translate("neck.box1.desc")} />
						</NeonBox>
					</div>
					<div className="col-12 sm:col-2">
						<div className="h-full w-full flex flex-column flex-center">
							<p className="resulting_in block relative text-reflex font-regular text-center uppercase mb-4">{T.translate("neck.resultingIn")}</p>
							<img className="curvy_arrow w-full" src={curvy_arrow} alt="" />
						</div>
					</div>
					<div className="col-12 sm:col-5">
						<NeonBox className="box_2">
							<p className="text-white opacity-0 mb-6 hidden sm:block">{T.translate("neck.box1.intro")}</p>
							<img className="box_desc" src={billions_more} alt={T.translate("neck.box2.num") + " " + T.translate("neck.box2.desc")} />
						</NeonBox>
					</div>
				</div>
				<NeckSectionAnimations
					images={[
						data.hero_billboard_05.childImageSharp.gatsbyImageData,
						data.hero_billboard_04.childImageSharp.gatsbyImageData,
						data.hero_billboard_01.childImageSharp.gatsbyImageData,
						data.hero_billboard_06.childImageSharp.gatsbyImageData,
						data.hero_billboard_02.childImageSharp.gatsbyImageData,
						data.hero_billboard_03.childImageSharp.gatsbyImageData,
					]}
				/>
			</Container>
			<Container tag="section" className="before_after mb-20">
				<h2 className="overtitle text-30 text-transform-none text-center mx-auto mb-15 max-w-800 sm:text-34">{T.translate("beforeAfter.title")}</h2>
				<div className="flex flex-column flex-nowrap align-items-center sm:flex-row">
					<div className="w-full sm:w-6">
						<div className="before bg-zircon px-4 py-6 sm:px-5">
							<h3 className="text-20 font-bold text-transform-none text-center mb-5 sm:text-24 sm:mb-8">
								{T.translate("beforeAfter.before.title")}
							</h3>
							<ul>
								{T.texts.beforeAfter.before.list.map((item) => (
									<li className="text-16 text-ash line-height-180 mb-4" key={item}>
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="w-full sm:w-6">
						<div className="after rounded-xl px-4 py-6 sm:px-5 sm:py-18">
							<h3 className="text-white text-20 font-bold text-transform-none text-center mb-5 sm:text-24 sm:mb-8">
								{T.translate("beforeAfter.after.title")}
							</h3>
							<ul>
								{T.texts.beforeAfter.after.list.map((item) => (
									<li className="text-white text-16 line-height-180 mb-4" key={item}>
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</Container>
			<Container tag="section" className="do_more mb-20">
				<div className="bg-gradient rounded-xl px-5 pt-8 pb-6">
					<div className="grid">
						<div className="col-12 sm:col-6 md:col-7 lg:col-8">
							<h3 className="text-white text-30 font-bold text-transform-none text-left sm:text-34 md:text-center">
								{T.translate("doMore.title")}
							</h3>
						</div>
						<div className="col-12 flex flex-center sm:col-6 md:col-5 lg:col-4">
							<CTA preset="primary-outline" hoverPreset="full-cerulean" className="border-none" onClick={() => setShowBookACallModal(true)}>
								{T.translate("doMore.cta")}
							</CTA>
						</div>
					</div>
				</div>
			</Container>
			<Container tag="section" className="features mb-12 sm:mb-25">
				<FeaturesRotatingTitle />
				<div className="feature grid sm:mb-20">
					<div className="col-12 flex flex-center pt-8 sm:col-6 sm:pt-0 sm:flex-order-2">
						<FeatureCampaignReallocation
							images={[
								data.hero_billboard_07.childImageSharp.gatsbyImageData,
								data.hero_billboard_04.childImageSharp.gatsbyImageData,
								data.hero_billboard_05.childImageSharp.gatsbyImageData,
								data.hero_billboard_01.childImageSharp.gatsbyImageData,
								data.hero_billboard_05.childImageSharp.gatsbyImageData,
								data.hero_billboard_02.childImageSharp.gatsbyImageData,
							]}
						/>
					</div>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6 sm:pr-10 sm:flex-order-1">
						<h3 className="text-20 font-bold text-transform-none mt-8 mb-8 sm:text-24 sm:mt-0">
							{T.translate("features.featureCampaignReallocation.title")}
						</h3>
						<p className="line-height-180 mb-8">{T.translate("features.featureCampaignReallocation.par")}</p>
					</div>
				</div>
				<div className="feature grid sm:mb-20">
					<div className="col-12 flex flex-center sm:col-6">
						<FundedBillboards
							images={[
								data.hero_billboard_01.childImageSharp.gatsbyImageData,
								data.hero_billboard_02.childImageSharp.gatsbyImageData,
								data.hero_billboard_03.childImageSharp.gatsbyImageData,
								data.hero_billboard_04.childImageSharp.gatsbyImageData,
								data.hero_billboard_05.childImageSharp.gatsbyImageData,
							]}
						/>
					</div>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6 sm:pl-10">
						<h3 className="text-20 font-bold text-transform-none mb-8 sm:text-24">{T.translate("features.featureFlexibleBuyingOptions.title")}</h3>
						<p className="line-height-180 mb-8">{T.translate("features.featureFlexibleBuyingOptions.par")}</p>
					</div>
				</div>
				<div className="feature grid sm:mb-20">
					<div className="col-12 flex flex-center sm:col-6 sm:flex-order-2">
						<FeatureNewBuyers />
					</div>
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6 sm:pr-10 sm:flex-order-1">
						<h3 className="text-20 font-bold text-transform-none mt-4 mb-8 sm:text-24 sm:mt-0">{T.translate("features.featureNewBuyers.title")}</h3>
						<p className="line-height-180 mb-8">{T.translate("features.featureNewBuyers.par")}</p>
					</div>
				</div>
			</Container>
			<Testimonies data={data} companyLogos={companyLogos} />
			<Container tag="section" className="blog_posts mb-15 sm:mb-30 md:mb-15">
				<h2 className="overtitle text-30 text-transform-none text-center mx-auto max-w-full relative sm:text-34">
					<img className="curvy" src={overtitle} alt={T.translate("blogPosts.overtitle")} />
					<span>{T.texts.blogPosts.title}</span>
				</h2>
				<div className="grid_wrapper">
					<button className="arrow_btn prev div" onClick={() => handleBlogScroll("prev")}>
						<span className="arrow_wrapper">
							<img className="arrow" src={arrow_previous_cerulean} alt="" />
						</span>
					</button>
					<div className="grid bg-white sm:flex-nowrap align-items-stretch mb-15" {...swipeHandlers}>
						<PostCard
							link="ocean"
							thumb={data.thumb_ocean.childImageSharp.gatsbyImageData}
							companyLogo={logo_ocean}
							title={T.translate("blogPosts.oceanPost.title")}
							cta={T.translate("blogPosts.oceanPost.cta")}
						/>
						{posts.map((post: any) => (
							<PostCard
								link={post.link}
								thumb={post.featuredImage.node.gatsbyImage}
								companyLogo={companyLogos[post.companyId]}
								title={post.title}
								cta={T.translate("readArticle")}
								key={post.slug}
							/>
						))}
					</div>
					<button className="arrow_btn next div" onClick={() => handleBlogScroll("next")}>
						<span className="arrow_wrapper">
							<img className="arrow" src={arrow_previous_cerulean} alt="" />
						</span>
					</button>
				</div>
			</Container>
			<Container tag="section" className="shin mb-20">
				<div className="bg-gradient rounded-xl px-5 pt-8 pb-6">
					<div className="grid">
						<div className="col-12 sm:col-6 sm:pl-6 md:col-7 md:pl-8 lg:col-8 lg:pl-10">
							<h3 className="text-white text-30 font-bold text-transform-none text-left sm:text-34">{T.translate("shin.title")}</h3>
							<p className="text-white line-height-160 sm:mb-0">{T.translate("shin.par")}</p>
						</div>
						<div className="col-12 flex flex-center sm:col-6 md:col-5 lg:col-4">
							<CTA preset="primary-outline" hoverPreset="full-cerulean" className="border-none" onClick={() => setShowBookACallModal(true)}>
								{T.translate("shin.cta")}
							</CTA>
						</div>
					</div>
				</div>
			</Container>
			<Modal show={showBookACallModal} variant="form" className="narrow form_hide_labels" onClose={() => setShowBookACallModal(false)}>
				<div>
					<h2 className="text-24 text-transform-none w-full mb-3 sm:text-30">{T.translate("formBookACall.title")}</h2>
					<Form form="bookACall" campaign="bookACallDOOHMore" submitText="Book a Call" />
				</div>
			</Modal>
		</Layout>
	);
}

export const queryDOOHMore = graphql`
	query ($l: String!) {
		hero_billboard_01: file(relativePath: { eq: "pages/dooh-more/hero_billboard_01.jpg" }) {
			...img
		}
		hero_billboard_02: file(relativePath: { eq: "pages/dooh-more/hero_billboard_02.jpg" }) {
			...img
		}
		hero_billboard_03: file(relativePath: { eq: "pages/dooh-more/hero_billboard_03.jpg" }) {
			...img
		}
		hero_billboard_04: file(relativePath: { eq: "pages/dooh-more/hero_billboard_04.jpg" }) {
			...img
		}
		hero_billboard_05: file(relativePath: { eq: "pages/dooh-more/hero_billboard_05.jpg" }) {
			...img
		}
		hero_billboard_06: file(relativePath: { eq: "pages/dooh-more/hero_billboard_06.jpg" }) {
			...img
		}
		hero_billboard_07: file(relativePath: { eq: "pages/dooh-more/hero_billboard_07.jpg" }) {
			...img
		}

		feature_01_img: file(relativePath: { eq: "pages/dooh-more/feature_01_img.png" }) {
			...img
		}

		portrait_elevision: file(relativePath: { eq: "pages/dooh-more/portrait_elevision.png" }) {
			...img
		}
		logo_elevision: file(relativePath: { eq: "pages/dooh-more/logo_elevision.png" }) {
			...img
		}
		portrait_imedia: file(relativePath: { eq: "pages/dooh-more/portrait_imedia.png" }) {
			...img
		}
		portrait_orb: file(relativePath: { eq: "pages/dooh-more/portrait_orb.png" }) {
			...img
		}
		logo_imedia: file(relativePath: { eq: "pages/dooh-more/logo_imedia.png" }) {
			...img
		}
		logo_orb: file(relativePath: { eq: "pages/dooh-more/logo_orb.png" }) {
			...img
		}

		thumb_ocean: file(relativePath: { eq: "pages/dooh-more/post_thumb_ocean.jpg" }) {
			...img
		}

		posts: allWpPost(sort: { date: DESC }, filter: { status: { eq: "publish" }, databaseId: { in: [43163, 42639, 41739] } }) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: $l)
			}
		}
	}
`;
