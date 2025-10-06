import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import { graphql, navigate } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import route, { routeWithUtmForm } from "@route";
import clsx from "clsx";
import { loopTo } from "@annex";

import Container from "@components/Container";
import CTA from "@components/CTA";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Modal from "@components/Modal";

import icon_revenues from "@img/pages/verticals-ev/icon_revenues.svg";
import icon_global from "@img/pages/verticals-ev/icon_global.svg";
import icon_screens from "@img/pages/verticals-ev/icon_screens.svg";
import icon_reports from "@img/pages/verticals-ev/icon_reports.svg";
import icon_safety from "@img/pages/verticals-ev/icon_safety.svg";
import carousel_arrow from "@img/ui/arrow_right_cerulean.svg";

import "@sass/pages/verticals/ev.scss";

import type { BroadsignPageProps } from "@types";

type Testimonial = {
	id: String;
	tagline: String;
	quote: String;
	cite: String;
};

type Feature = {
	id: String;
	overtitle: String;
	title: String;
	pars: String[];
};

type SellGowBox = {
	id: String;
	par: String;
};

export default function VerticalEV({ pageContext: { l, dicoPath }, location: { pathname }, data }: BroadsignPageProps) {
	const [showBookCallModal, setShowBookCallModal] = useState(false);

	const [testimonialsPosition, setTestimonialsPosition] = useState(0);
	const [userEmail, setUserEmail] = useState("");
	const [formReady, setFormReady] = useState(false);

	useDico(l, dicoPath);

	const testimonials: Testimonial[] = T?.texts?.testimonials?.list || [];
	const features: Feature[] = T?.texts?.features?.list || [];
	const doMoreWithout: String[] = T?.texts?.doMore?.without?.points || [];
	const doMoreWith: String[] = T?.texts?.doMore?.with?.points || [];
	const sellGrowBoxes: SellGowBox[] = T?.texts?.sellGrow?.boxes || [];

	function testimonialsLoop(dir) {
		if (testimonials.length > 1) {
			setTestimonialsPosition(loopTo(dir, testimonialsPosition, testimonials.length));
		}
	}

	const sellGrowIcons = {
		revenues: icon_revenues,
		global: icon_global,
		screens: icon_screens,
		reports: icon_reports,
		safety: icon_safety,
	};

	const testimonialsWrapper: MutableRefObject = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	function handleEmailEntry() {
		setTimeout(() => {
			if (typeof document !== "undefined") {
				const email = document.querySelector(".email_only input[type='email']");
				if (email && email.value) {
					setUserEmail(email.value);
				}
			}
		}, 100);
	}

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}

		setTimeout(() => {
			handleEmailEntry();
		}, 1000);

		if (typeof document !== "undefined") {
			document.addEventListener("keyup", handleEmailEntry, { passive: true });

			return () => {
				document.removeEventListener("keyup", handleEmailEntry);
			};
		}
	}, []);

	useEffect(() => {
		if (userEmail && formReady) {
			navigate(`${route("demo")}?email=${userEmail}&utm_form=vertical_ev_book_demo_step_1`);
		}
	}, [userEmail, formReady]);

	useEffect(() => {
		const initTestimonialCarouselHeight = () => {
			if (testimonialsWrapper) {
				let tallestTestimonialHeight = 0;

				for (const h of testimonialsWrapper.current.querySelectorAll(".testimonial")) {
					tallestTestimonialHeight = Math.max(tallestTestimonialHeight, h.clientHeight);
				}

				testimonialsWrapper.current.style.height = `${tallestTestimonialHeight}px`;
			}
		};

		setTimeout(initTestimonialCarouselHeight, 1000);

		if (typeof window !== "undefined") {
			window.addEventListener("resize", initTestimonialCarouselHeight, { passive: true });

			return () => {
				window.removeEventListener("resize", initTestimonialCarouselHeight);
			};
		}
	}, [testimonialsWrapper]);

	return (
		<Layout id="vertical_ev" className="vertical_ev theme_carolina">
			<div className="hero pb-25 pt-10 md:pt-25">
				<Container>
					<div className="grid justify-content-between">
						<div className="col-12 flex flex-column align-items-start justify-content-center mb-12 sm:col-6 sm:mb-0 sm:flex-order-1 md:col-5">
							<h1 className="font-superbold line-height-100">{T.translate("hero.title")}</h1>
							<p className="tagline text-ash line-height-180 mb-8 sm:mb-14">{T.translate("hero.tagline")}</p>
							<CTA className="primary" onClick={() => setShowBookCallModal(true)}>
								{T.translate("hero.cta")}
							</CTA>
						</div>
						<div className="col-12 sm:col-6 sm:flex-order-2">
							<Img alt="" image={data.hero.childImageSharp.gatsbyImageData} className="w-full sm:mt-10" />
						</div>
					</div>
				</Container>
			</div>
			<section className="clients pt-20 pb-25">
				{/* I CHOSE TO NOT USE THE LOGO COMPONENT HERE BECAUSE LOGOS ARE A SPECIAL COLOR, SPECIAL SIZE ETC. */}
				<Container>
					<h2 className="h4 text-center font-black max-w-800 mx-auto">{T.translate("clients.title")}</h2>
					<div className="logos flex flex-wrap justify-content-center">
						<Img alt="" className="logo" image={data.logo_chargeeuropa.childImageSharp.gatsbyImageData} objectFit="contain" />
						<Img alt="" className="logo" image={data.logo_clearchannel.childImageSharp.gatsbyImageData} objectFit="contain" />
						<Img alt="" className="logo" image={data.logo_global.childImageSharp.gatsbyImageData} objectFit="contain" />
						<Img alt="" className="logo" image={data.logo_jcdecaux.childImageSharp.gatsbyImageData} objectFit="contain" />
						<Img alt="" className="logo" image={data.logo_jolt.childImageSharp.gatsbyImageData} objectFit="contain" />
						<Img alt="" className="logo" image={data.logo_outedge.childImageSharp.gatsbyImageData} objectFit="contain" />
						<Img alt="" className="logo" image={data.logo_podpoint.childImageSharp.gatsbyImageData} objectFit="contain" />
						<Img alt="" className="logo" image={data.logo_revolt.childImageSharp.gatsbyImageData} objectFit="contain" />
						<Img alt="" className="logo" image={data.logo_swiftmile.childImageSharp.gatsbyImageData} objectFit="contain" />
						<Img alt="" className="logo" image={data.logo_numbat.childImageSharp.gatsbyImageData} objectFit="contain" />
					</div>
				</Container>
			</section>
			<section className="sell_grow bg-zircon pt-20 pb-16">
				<Container>
					{/* <div className="block text-center">
						<h4 className="subtitle-1 gradient mx-auto">{T.translate("sellGrow.overtitle")}</h4>
					</div> */}
					<h2 className="h4 text-center font-black max-w-800 mx-auto">{T.translate("sellGrow.title")}</h2>
					<p className="text-dark text-center line-height-180 max-w-800 mx-auto mb-15">{T.translate("sellGrow.par")}</p>
					<div className="grid justify-content-around md:justify-content-between">
						{sellGrowBoxes.map(({ id, par }) => (
							<div
								className="box col-12 bg-white text-center px-4 py-8 mx-2 mb-10 rounded-12 shadow-A sm:col-5 md:col-2 md:mx-0 md:mb-0"
								key={id}>
								<img className="icon mb-6" src={sellGrowIcons[id]} />
								<p className="text-dark line-height-180 m-0">{par}</p>
							</div>
						))}
					</div>
				</Container>
			</section>
			<section className="do_more pt-22 pb-25">
				<Container>
					{/* <div className="block text-center">
						<h4 className="subtitle-1 gradient mx-auto">{T.translate("doMore.overtitle")}</h4>
					</div> */}
					<h2 className="h4 text-center font-black max-w-800 mx-auto mb-18">{T.translate("doMore.title")}</h2>
					<div className="boxes_wrapper grid align-items-center justify-content-around md:justify-content-center mx-auto">
						<div className="box do_without col-10 bg-zircon px-4 pt-8 pb-6 mx-auto rounded-10 sm:col-6 sm:px-6">
							<h4 className="h5 text-center">{T.translate("doMore.without.title")}</h4>
							<ul className="checks_negative">
								{doMoreWithout.map((point, k) => (
									<li className="text-reflex line-height-180" key={k}>
										{point}
									</li>
								))}
							</ul>
						</div>
						<div className="box do_with col-12 bg-reflex px-4 pt-10 pb-6 rounded-10 sm:col-6 sm:px-6">
							<h4 className="h5 text-white text-center">{T.translate("doMore.with.title")}</h4>
							<ul className="checks_positive">
								{doMoreWith.map((point, k) => (
									<li className="text-white line-height-180" key={k}>
										{point}
									</li>
								))}
							</ul>
						</div>
					</div>
				</Container>
			</section>
			<section className="testimonials bg-zircon flex flex-center py-20">
				<Container className="flex flex-column align-items-center relative">
					<h4 className="subtitle-1 gradient text-center">{T.translate("testimonials.overtitle")}</h4>
					<h2 className="h4 text-center mb-18">{T.translate("testimonials.title")}</h2>
					<div className="grid flex-nowrap align-items-center w-full">
						<div className="loop_btn_wrapper col-1 align-items-start py-0 z-2">
							{testimonials.length > 1 && (
								<button className="div loop_btn prev" onClick={() => testimonialsLoop("prev")}>
									<img src={carousel_arrow} />
								</button>
							)}
						</div>
						<div className="col-10 flex justify-content-center z-1">
							<div className="testimonials_wrapper relative w-full" ref={testimonialsWrapper}>
								{testimonials.map(({ id, tagline, quote, cite }, k) => (
									<div
										className={clsx(
											"testimonial flex flex-column flex-nowrap align-items-center md:flex-row",
											testimonialsPosition === k ? "active" : ""
										)}
										key={id}>
										<Img alt="" className="portrait col-12 md:col-6" image={data[`portrait_${id}`].childImageSharp.gatsbyImageData} />
										<blockquote className="col-12 bg-reflex flex flex-column flex-nowrap align-items-start justify-content-center px-6 pt-6 pb-8 sm:pt-10 md:col-6">
											{tagline && (
												<p className="tagline text-white text-18 font-serif letter-spacing-5 line-height-150 mb-6 sm:text-20">
													{tagline}
												</p>
											)}
											<p className="quote text-white text-14 line-height-180 font-serif mb-6 sm:text-16">{quote}</p>
											<cite className="text-white text-14 sm:text-16">{cite}</cite>
										</blockquote>
									</div>
								))}
							</div>
						</div>
						<div className="loop_btn_wrapper col-1 align-items-end py-0 z-2">
							{testimonials.length > 1 && (
								<button className="div loop_btn next" onClick={() => testimonialsLoop("next")}>
									<img src={carousel_arrow} />
								</button>
							)}
						</div>
					</div>
				</Container>
			</section>
			<section className="features py-20 sm:py-0">
				<Container>
					{features.map(({ id, overtitle, title, pars }, k) => (
						<div className={clsx("feature grid py-8 sm:py-22", k % 2 === 0 ? "flex-row-reverse" : "flex-row")} key={k}>
							<figure className="col-12 flex flex-center mb-6 sm:col-6 sm:mb-0">
								<Img
									className="logo w-10 mx-auto sm:w-full"
									image={data[`feature_${id}`].childImageSharp.gatsbyImageData}
									objectFit="contain"
									alt=""
								/>
							</figure>
							<div className={clsx("col-12 flex flex-column justify-content-center sm:col-6", k % 2 === 0 ? "md:pr-20" : "md:pl-20")}>
								<h4 className="subtitle-1 gradient">{overtitle}</h4>
								<h3 className="h5 mb-8">{title}</h3>
								{pars.map((p, k) => (
									<p className="text-dark line-height-180" key={k}>
										{p}
									</p>
								))}
							</div>
						</div>
					))}
				</Container>
			</section>
			<section className="shin bg-reflex pt-20 pb-22">
				<Container className="flex flex-column flex-nowrap align-items-center">
					<h3 className="h4 text-white text-center max-w-600">{T.translate("shin.title")}</h3>
					<p className="text-white text-center line-height-180 mb-16 max-w-600">{T.translate("shin.par")}</p>
					<CTA className="primary border-white hover:border-cerulean" onClick={() => setShowBookCallModal(true)}>
						{T.translate("hero.cta")}
					</CTA>
				</Container>
			</section>
			<Modal show={showBookCallModal} variant="form" className="theme_carolina" onClose={() => setShowBookCallModal(false)}>
				<h3 className="h4 text-reflex mb-8">{T.translate("hero.cta")}</h3>
				<Form form="bookACall" campaign="bookACallAquarius" submitText="Book a Call" redirectUrl={routeWithUtmForm("thankYou", "book_a_call")} />
			</Modal>
		</Layout>
	);
}

export const queryVerticalEV = graphql`
	query VerticalEVImages {
		hero: file(relativePath: { eq: "pages/verticals-ev/hero.png" }) {
			...img
		}

		video_poster: file(relativePath: { eq: "video_posters/placeholder.jpg" }) {
			...img
		}

		logo_chargeeuropa: file(relativePath: { eq: "pages/verticals-ev/logo_chargeeuropa.png" }) {
			...img
		}
		logo_clearchannel: file(relativePath: { eq: "pages/verticals-ev/logo_clearchannel.png" }) {
			...img
		}
		logo_global: file(relativePath: { eq: "pages/verticals-ev/logo_global.png" }) {
			...img
		}
		logo_jcdecaux: file(relativePath: { eq: "pages/verticals-ev/logo_jcdecaux.png" }) {
			...img
		}
		logo_jolt: file(relativePath: { eq: "pages/verticals-ev/logo_jolt.png" }) {
			...img
		}
		logo_outedge: file(relativePath: { eq: "pages/verticals-ev/logo_outedge.png" }) {
			...img
		}
		logo_podpoint: file(relativePath: { eq: "pages/verticals-ev/logo_podpoint.png" }) {
			...img
		}
		logo_revolt: file(relativePath: { eq: "pages/verticals-ev/logo_revolt.png" }) {
			...img
		}
		logo_swiftmile: file(relativePath: { eq: "pages/verticals-ev/logo_swiftmile.png" }) {
			...img
		}
		logo_numbat: file(relativePath: { eq: "pages/verticals-ev/logo_numbat.png" }) {
			...img
		}

		portrait_swiftmile: file(relativePath: { eq: "pages/verticals-ev/portrait_swiftmile.jpg" }) {
			...img
		}
		portrait_chargeeuropa: file(relativePath: { eq: "pages/verticals-ev/portrait_chargeeuropa.jpg" }) {
			...img
		}
		portrait_revolt: file(relativePath: { eq: "pages/verticals-ev/portrait_revolt.jpg" }) {
			...img
		}

		feature_build: file(relativePath: { eq: "pages/verticals-ev/feature_build.png" }) {
			...img
		}
		feature_create: file(relativePath: { eq: "pages/verticals-ev/feature_create.png" }) {
			...img
		}
		feature_connect: file(relativePath: { eq: "pages/verticals-ev/feature_connect.png" }) {
			...img
		}
		feature_grow: file(relativePath: { eq: "pages/verticals-ev/feature_grow.png" }) {
			...img
		}
		feature_deliver: file(relativePath: { eq: "pages/verticals-ev/feature_deliver.png" }) {
			...img
		}
	}
`;
