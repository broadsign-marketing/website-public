import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { routeWithUtmForm } from "@route";

import Container from "@components/Container";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Modal from "@components/Modal";

import "@sass/pages/subscribe_inside_ooh.scss";

import bubble from "@img/pages/subscribe/inside_ooh_bubble.png";
import star from "@img/pages/subscribe/inside_ooh_star.svg";

import type { BroadsignPageProps } from "@types";

export default function SubscribeInsideOOH({ pageContext: { l, dicoPath, archives }, location: { pathname }, data }: BroadsignPageProps) {
	const [openPastEdition, setOpenPastEdition] = useState(null);

	useDico(l, dicoPath);

	const pastEditions = useMemo(() => {
		console.log(archives);
		return archives
			.filter((entry) => entry.Language.value === l && ["Buy-Side Weekly", "Inside OOH"].includes(entry.Series.value))
			.sort((a, b) => new Date(b.Date) - new Date(a.Date))
			.slice(0, 8);
	}, [l, archives]);

	const scrollContainerRef = useRef(null);

	const handleWindowResize = useCallback(() => {
		const scrollContainer = scrollContainerRef.current;
		const cards = document.querySelectorAll(".past_editions .card");

		if (!scrollContainer || cards.length === 0) return;

		const scrollContainerBottom = scrollContainer.getBoundingClientRect().bottom;

		cards.forEach((card) => {
			const cardBottom = card.getBoundingClientRect().bottom;

			if (window.innerWidth > 600 && cardBottom > scrollContainerBottom) {
				card.style.opacity = "0";
				scrollContainer.scrollTo({ top: 0 });
			} else {
				card.style.opacity = "1";
			}
		});
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("resize", handleWindowResize, { passive: true });

			handleWindowResize();

			return () => {
				window.removeEventListener("resize", handleWindowResize);
			};
		}
	}, [handleWindowResize]);

	return (
		<Layout id="subscribe_inside_ooh" className="theme_carolina">
			<section className="hero flex flex-column flex-nowrap justify-content-center align-items-center pt-12 z-1">
				<Img image={data.hero_bg.childImageSharp.gatsbyImageData} className="bg" alt="" />
				<div className="card p-8 z-1 sm:p-12 md:p-15">
					<div className="inline-block bg-gradient rounded-full px-4 py-2 mb-4">
						<p className="text-white text-14 font-medium uppercase line-height-80 m-0 letter-spacing-5">{T.translate("hero.overtitle")}</p>
					</div>
					<h1 className="text-white text-center line-height-120 text-transform-none">{T.translate("hero.title")}</h1>
					<p className="blurb text-white text-20 font-medium text-center">{T.translate("hero.par")}</p>
					<Form form="newsletterInsideOOH" submitText={T.translate("hero.cta")} redirectUrl={routeWithUtmForm("thankYou", "inside_ooh")} uid="1" />
				</div>
				<Container className="pb-25">
					<Img image={data.hero_img.childImageSharp.gatsbyImageData} className="hero_img absolute z-2" alt="" />
				</Container>
			</section>
			<Container tag="section" className="features mb-20 z-2">
				<div className="grid align-items-stretch -mt-15">
					{T.texts.features.map((feature, k) => (
						<div className="col-12 h-auto sm:col-4" key={k}>
							<div className="box h-full bg-white flex flex-column flex-nowrap align-items-center rounded-xl p-6 md:p-10">
								<img src={star} className="mx-auto mb-6" alt="" />
								<h3 className="text-20 mb-6">{feature.title}</h3>
								<p className="m-0">{feature.desc}</p>
							</div>
						</div>
					))}
				</div>
			</Container>
			<Container tag="section" className="hull">
				<div className="grid">
					<div className="col-12 sm:col-6 md:col-7 lg:col-8">
						<h2 className="text-ash font-thin line-height-140 text-transform-none mb-10">{T.translate("hull.title")}</h2>
						{T.texts.hull.pars.map((p, k) => (
							<p className="line-height-160 mb-8" key={k}>
								{p}
							</p>
						))}
						<div className="flex flex-nowrap align-items-center mb-15">
							<Img image={data.aliya.childImageSharp.gatsbyImageData} className="aliya_pic" alt="" />
							<div className="details flex flex-column justify-content-center">
								<p className="font-bold m-0">{T.translate("hull.author.name")}</p>
								<p className="m-0">{T.translate("hull.author.title")}</p>
							</div>
						</div>
						<div className="testimonials mb-12 sm:mb-20">
							<blockquote className="testimonial">
								<div className="bubble mb-2w-full">
									<img src={bubble} className="bubble_img absolute z-1" alt="" />
									<p className="text-reflex font-light relative z-2">{T.translate("hull.testimonials.0.quote")}</p>
								</div>
								<cite className="text-16 font-bold line-height-140">{T.translate("hull.testimonials.0.cite")}</cite>
							</blockquote>
						</div>
						<div className="form_card">
							<Img image={data.hero_bg.childImageSharp.gatsbyImageData} className="bg" alt="" />
							<div className="flex flex-column align-items-center p-6 z-2 md:p-10">
								<h2 className="text-white text-20 letter-spacing-1 text-center text-transform-none m-0 md:text-24">
									{T.translate("hull.formCard.title")}
								</h2>
								<p className="text-white text-20 letter-spacing-1 text-center mb-8 md:text-24">{T.translate("hull.formCard.subtitle")}</p>
								<Form
									form="newsletterInsideOOH"
									submitText={T.translate("hero.cta")}
									redirectUrl={routeWithUtmForm("thankYou", "inside_ooh")}
									uid="2"
								/>
							</div>
						</div>
					</div>
					<div className="col-12 sm:col-6 md:col-5 lg:col-4">
						<div className="past_editions_scroll sm:pl-8 lg:pl-0" ref={scrollContainerRef}>
							<h2 className="text-16 text-transform-none mb-3">{T.translate("pastEditions")}</h2>
							<div className="past_editions">
								{pastEditions.map((e, k) => (
									<button onClick={() => setOpenPastEdition(e.Link)} className="div card" key={k}>
										<h3 className="text-reflex text-transform-none mb-2">{e.Title}</h3>
										<p className="read_more font-medium">{T.translate("readMore")}</p>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>
			{openPastEdition && (
				<Modal variant="digest" onClose={() => setOpenPastEdition(null)}>
					<iframe src={openPastEdition}></iframe>
				</Modal>
			)}
		</Layout>
	);
}

export const query = graphql`
	query {
		hero_bg: file(relativePath: { eq: "pages/subscribe/inside_ooh_hero_bg.jpg" }) {
			...img
		}
		hero_img: file(relativePath: { eq: "pages/subscribe/inside_ooh_mobile.png" }) {
			...img
		}
		aliya: file(relativePath: { eq: "pages/subscribe/inside_ooh_aliya.png" }) {
			...img
		}
	}
`;
