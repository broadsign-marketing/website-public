import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import cookie from "react-cookies";
import { useDico } from "@hooks/useDico";
import { blogPostSlug } from "@annex";
import clsx from "clsx";

import { FeatureWrapper, FeatureOverTitle, FeatureTitle, FeaturePar, ComingSoonTag } from "@components/Aquarius";
import CaseStudies from "@components/App__Carousel_CaseStudies";
import Container from "@components/Container";
import CTA from "@components/CTA";
import Form, { getFormID } from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import NeonBox from "@components/NeonBox";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import LogosMarquee from "@components/LogosMarquee";
import Modal from "@components/Modal";
import Overtitle from "@components/Overtitle";
import Presenter from "@components/Presenter";
import Video from "@components/Video";

import whirl from "@img/pages/inventory-marketplace/custom_package.svg";
import check_circle_green from "@img/ui/check_circle_green.svg";

import icon_confidence from "@img/pages/dsp/account-manager/icon_confidence.svg";
import icon_consumers from "@img/pages/dsp/account-manager/icon_consumers.svg";
import icon_marketers from "@img/pages/dsp/account-manager/icon_marketers.svg";
import icon_money from "@img/pages/dsp/account-manager/icon_money.svg";
import icon_speed from "@img/pages/dsp/account-manager/icon_speed.svg";

// Logos for testimonials
import logo_stackadapt from "@logos/stackadapt_reflex.svg";
import logo_displayce from "@logos/displayce_reflex.svg";
import logo_illumin from "@logos/illumin_reflex.svg";

// Logos for Marquee
import logo_active_agent from "@logos/active_agent_reflex.svg";
import logo_adelphic from "@logos/adelphic_reflex.svg";
import logo_adform from "@logos/aform_reflex.svg";
import logo_adomni from "@logos/adomni_reflex.svg";
import logo_adquick from "@logos/aquick_reflex.svg";
import logo_adtheorent from "@logos/atheorent_reflex.svg";
import logo_arago from "@logos/arago_reflex.svg";
import logo_beeyond from "@logos/beeyond_reflex.svg";
import logo_bidtheatre from "@logos/bidtheatre_reflex.svg";
import logo_bitposter from "@logos/bitposter_reflex.svg";
import logo_broadsign_ads from "@logos/broadsign_ads_reflex.svg";
import logo_caasie from "@logos/caasie_reflex.svg";
import logo_display_video_360 from "@logos/display_video_360_reflex.svg";
import logo_flow_city from "@logos/flow_city_reflex.svg";
import logo_hawk from "@logos/hawk_reflex.svg";
import logo_mediamath from "@logos/mediamath_reflex.svg";
import logo_outmoove from "@logos/outmoove_reflex.svg";
import logo_pladway from "@logos/pladway_reflex.svg";
import logo_pulsepoint from "@logos/pulsepoint_reflex.svg";
import logo_quotient from "@logos/quotient_reflex.svg";
import logo_roku from "@logos/roku_reflex.svg";
import logo_rtbmarkt from "@logos/rtbmarkt_reflex.png";
import logo_sage_archer from "@logos/sage_archer_reflex.png";
import logo_scoota from "@logos/scoota_reflex.svg";
import logo_splicky from "@logos/splicky_reflex.svg";
import logo_taptap from "@logos/taptap_reflex.svg";
import logo_the_neuron from "@logos/the_neuron_reflex.png";
import logo_the_trade_desk from "@logos/the_trade_desk_reflex.svg";
import logo_yahoo from "@logos/yahoo_reflex.svg";

import "@sass/pages/dsp/account_manager.scss";
const Quotes = lazy(() => import("@components/QuotesOrbit"));

export default function DspAccountManager({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [showBookACallModal, setShowBookACallModal] = useState(false);
	const [showMediaKitModal, setShowMediaKitModal] = useState(false);
	const [showVideoModal, setShowVideoModal] = useState(false);
	const [hasSubmittedMediaKitForm, setHasSubmittedMediaKitForm] = useState(false);
	const [isMediaKitFormSubmitted, setIsMediaKitFormSubmitted] = useState(false);
	const [isBookACallFormSubmitted, setIsBookACallFormSubmitted] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [userName, setUserName] = useState("");

	useDico(l, dicoPath);

	const { why, features, trySSP } = T.texts;

	const icons = {
		confidence: icon_confidence,
		consumers: icon_consumers,
		marketers: icon_marketers,
		money: icon_money,
		speed: icon_speed,
	};

	const quotesCompanyLogos = {
		stackadapt: logo_stackadapt,
		displayce: logo_displayce,
		illumin: logo_illumin,
	};

	const quotes = T.texts.testimonials.list.map((quote) => ({
		...quote,
		companyLogo: quotesCompanyLogos[quote.id],
		portrait: data[`portrait_${quote.id}`].childImageSharp.gatsbyImageData,
	}));

	const posts = data.posts.nodes;
	const postsCols = Math.max(posts.length, 3);

	const clockwiseLink = `https://www.getclockwise.com/c/drew-thachuk-broadsign-com/dooh-strategy-call?email=${userEmail}&name=${userName}`;

	const startBookACallFormListeners = useCallback(() => {
		const domForm = document.querySelector(".hubspot_clockwise form");

		if (!domForm) return;

		domForm.addEventListener("keyup", () => {
			const emailField = domForm?.querySelector("input[name='email']");
			const fnameField = domForm?.querySelector("input[name='firstname']");
			const lnameField = domForm?.querySelector("input[name='lastname']");

			setUserEmail(emailField?.value);
			setUserName(fnameField?.value + " " + lnameField?.value);
		});
	}, []);

	const populateLeadSourceDetails = useCallback(() => {
		const domForm = document.querySelector(".Modal form");
		const leadSourceDetailsField = domForm?.querySelector("input[name='lead_source_details']");

		if (!leadSourceDetailsField) return;

		leadSourceDetailsField.value = "Account Manager: " + T.translate("accountManagerName");
		leadSourceDetailsField.dispatchEvent(new Event("input", { bubbles: true }));
	}, []);

	useEffect(() => {
		const formID = getFormID("mediaKitProgrammaticDSP");
		const formCookie = cookie.load(`submitted-form-${formID}`);

		if (formCookie) {
			setHasSubmittedMediaKitForm(true);
		}
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;

		if (isBookACallFormSubmitted) {
			window.open(clockwiseLink, "_blank");
			setTimeout(() => setShowBookACallModal(false), 8000);
		}
	}, [isBookACallFormSubmitted]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		if (isMediaKitFormSubmitted) {
			window.open(T.translate("mediaKitProgrammaticLink"), "_blank");
			setTimeout(() => setShowMediaKitModal(false), 8000);
		}
	}, [isMediaKitFormSubmitted]);

	return (
		<Layout id="dsp_account_manager" className="theme_carolina">
			<Container tag="section" className="hero pt-16 mb-30 sm:mb-15">
				<div className="grid">
					<div className="col-12 mb-15 sm:col-6 sm:pr-8 sm:mb-0">
						<Overtitle className="mb-2">{T.translate("hero.overtitle")}</Overtitle>
						<h1 className="mb-8">{T.translate("hero.title")}</h1>
						<p className="text-dark line-height-180 mb-8">{T.translate("hero.par")}</p>
						<Presenter
							className="mb-8"
							avatar={data.portrait_drew_thachuk.childImageSharp.gatsbyImageData}
							name={T.translate("hero.presenter.name")}
							title={T.translate("hero.presenter.title")}
							textColor="dark"
						/>
						{isBookACallFormSubmitted ? (
							<CTA className="primary" to={clockwiseLink}>
								{T.translate("hero.cta")}
							</CTA>
						) : (
							<CTA className="primary" onClick={() => setShowBookACallModal(true)}>
								{T.translate("hero.cta")}
							</CTA>
						)}
					</div>
					<div className="col-12 sm:col-6 md:flex-center">
						<Img image={data.hero.childImageSharp.gatsbyImageData} className="" alt="" />
					</div>
				</div>
			</Container>
			<Container tag="section" className="why mb-12">
				<h2 className="mb-8 sm:text-center sm:mx-auto">{T.translate("why.title")}</h2>
				<div className="grid">
					{why.boxes.map(({ id, num, numSize, what, source }) => (
						<div className="col-12 sm:col-4" key={id}>
							<NeonBox className="" innerClassName="">
								<img src={icons[id]} alt="" />
								<p className={clsx("text-reflex font-black mb-3 sm:mb-0", `num_${numSize}`)}>{num}</p>
								<Overtitle className="text-16 text-transform-none mb-2" weight="bold">
									{what}
								</Overtitle>
								<p className={clsx("text-ash text-12")}>{source}</p>
							</NeonBox>
						</div>
					))}
				</div>
			</Container>
			{posts.length > 0 && (
				<Container tag="section" className="related_posts text-center pt-10 mb-20">
					<h2 className="mb-10 sm:text-center sm:mx-auto">{T.translate("relatedPosts.title")}</h2>
					<div className="grid align-items-stretch mb-12">
						{posts.map((post: any) => (
							<div className={clsx("col-12", { "sm:col-6": postsCols === 2, "sm:col-4": postsCols === 3 })} key={post.slug}>
								<Link
									to={blogPostSlug(post.slug, "en")}
									className={clsx("post_card bg-zircon flex flex-column rounded-xl overflow-hidden")}
									key={post.id}>
									<Img className="post_thumb" image={post.featuredImage.node.gatsbyImage} alt="" />
									<div className="post_details flex flex-column justify-content-between flex-auto text-left p-4 md:px-6 md:py-5">
										<h3 className="post_title text-reflex font-black text-transform-none mb-8">{post.title}</h3>
										<p className="mb-0 mt-auto">
											<span className="link_cerulean_arrow text-cerulean letter-spacing-5">{T.translate("readArticle")}</span>
										</p>
									</div>
								</Link>
							</div>
						))}
					</div>
					<CTA className="primary" to="streamVerticalStrategies">
						{T.translate("allIndustries")}
					</CTA>
				</Container>
			)}
			<section className="features mb-25">
				<Container className="text-center mb-8">
					<Overtitle className="mb-2">{T.translate("features.overtitle")}</Overtitle>
					<h2 className="sm:text-center sm:mx-auto">{T.translate("features.title")}</h2>
				</Container>
				{features.list.map(({ id, overtitle, title, par, cta, ctaCallback, ctaLink }, k) => (
					<FeatureWrapper className={clsx({ "sm:flex-row-reverse": k % 2 === 0 })} key={id}>
						<div className="col-12 flex flex-center sm:col-6">
							<Img image={data[`feature_${id}`].childImageSharp.gatsbyImageData} className="" alt="" />
						</div>
						<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
							<FeatureOverTitle>{overtitle}</FeatureOverTitle>
							<FeatureTitle>{title}</FeatureTitle>
							<FeaturePar>{par}</FeaturePar>
							{cta && (
								<>
									{ctaLink && (
										<CTA className="primary wrap mt-10" to={ctaLink}>
											{cta}
										</CTA>
									)}
									{ctaCallback === "setShowMediaKitModal" && (
										<>
											{isMediaKitFormSubmitted || hasSubmittedMediaKitForm ? (
												<CTA className="primary wrap mt-10" to={T.translate("mediaKitProgrammaticLink")}>
													{cta}
												</CTA>
											) : (
												<CTA className="primary wrap mt-10" onClick={() => setShowMediaKitModal(true)}>
													{cta}
												</CTA>
											)}
										</>
									)}
									{ctaCallback === "setShowVideoModal" && (
										<CTA className="primary wrap mt-10" onClick={() => setShowVideoModal(true)}>
											{cta}
										</CTA>
									)}
								</>
							)}
						</div>
					</FeatureWrapper>
				))}
			</section>
			<section className="partners mb-20 text-center">
				<Container>
					<Overtitle className="mb-4">{T.translate("partners.overtitle")}</Overtitle>
				</Container>
				<LogosMarquee
					logos={[
						logo_active_agent,
						logo_adelphic,
						logo_adomni,
						logo_arago,
						logo_bitposter,
						logo_caasie,
						logo_display_video_360,
						logo_hawk,
						logo_roku,
						logo_scoota,
						logo_taptap,
					]}
					logoSize={60}
					logoSpacing={100}
					speed={60}
				/>
				<LogosMarquee
					logos={[
						logo_adquick,
						logo_beeyond,
						logo_broadsign_ads,
						logo_outmoove,
						logo_pulsepoint,
						logo_rtbmarkt,
						logo_splicky,
						logo_the_neuron,
						logo_yahoo,
					]}
					reverse={true}
					logoSize={60}
					logoSpacing={100}
					speed={60}
				/>
				<LogosMarquee
					logos={[
						logo_adform,
						logo_adtheorent,
						logo_bidtheatre,
						logo_displayce,
						logo_flow_city,
						logo_mediamath,
						logo_pladway,
						logo_quotient,
						logo_sage_archer,
						logo_stackadapt,
						logo_the_trade_desk,
					]}
					logoSize={60}
					logoSpacing={100}
					speed={60}
				/>
			</section>
			<Container tag="section" className="try_ssp mb-25">
				<h2 className="mb-12 sm:text-center sm:mx-auto">{T.translate("trySSP.title")}</h2>
				<div className="grid">
					{trySSP.boxes.map(({ id, overtitle, par }) => (
						<div className="col-12 sm:col-4" key={id}>
							<NeonBox className="" innerClassName="">
								<img className="block mb-2" src={icons[id]} alt="" />
								<Overtitle className="text-transform-none mb-6" weight="bold">
									{overtitle}
								</Overtitle>
								<p>{par}</p>
							</NeonBox>
						</div>
					))}
				</div>
			</Container>
			<Container tag="section" className="case_studies mb-18">
				<CaseStudies
					campaigns={["hp", "boehringer_ingelheim", "hnm", "jotex", "veet", "white_claw", "foodora", "peugeot", "pepsi_max", "xite", "public_mobile"]}
					overtitle={T.translate("caseStudies.overtitle")}
					bg="white"
					showProps={["objective", "targetStrategy", "results"]}
					showLocationProps={false}
				/>
			</Container>
			<section className="testimonials mb-20">
				<Suspense>
					<Quotes quotes={quotes} />
				</Suspense>
			</section>
			<Container tag="section" className="shin pt-22 mb-14">
				<div className={clsx("bg-gradient rounded-xl")}>
					<div className="grid">
						<div className="col-12 text-center sm:col-5 md:col-4">
							<img src={whirl} className="img max-w-full" alt="" />
						</div>
						<div className="col-12 sm:col-7 md:col-8">
							<div className="pt-8 pb-10 px-4 sm:pr-10">
								<h2 className="h4 text-white text-left mb-4">{T.translate("shin.title")}</h2>
								<p className="text-white text-left line-height-180 mb-10 sm:mb-6">{T.translate("shin.par")}</p>
								<Presenter
									className="mb-10"
									avatar={data.portrait_drew_thachuk.childImageSharp.gatsbyImageData}
									name={T.translate("hero.presenter.name")}
									title={T.translate("hero.presenter.title")}
									textColor="white"
								/>
								{isBookACallFormSubmitted ? (
									<CTA preset="primary-outline" hoverPreset="full-white" to={clockwiseLink} className="max-w-full">
										{T.translate("shin.cta")}
									</CTA>
								) : (
									<CTA preset="primary-outline" hoverPreset="full-white" onClick={() => setShowBookACallModal(true)} className="max-w-full">
										{T.translate("shin.cta")}
									</CTA>
								)}
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Modal show={showBookACallModal} variant="form" className="narrow hubspot_clockwise form_hide_labels" onClose={() => setShowBookACallModal(false)}>
				{isBookACallFormSubmitted ? (
					<div className="thank_you_message flex flex-column align-items-center w-full my-auto">
						<img className="mb-4" src={check_circle_green} style={{ width: "60px" }} alt="" />
						<h3 className="text-24 text-transform-none mb-4">{T.translate("formBookACall.thankYou.title")}</h3>
						<p className="text-16 mb-0">
							<span>{T.translate("formBookACall.thankYou.par")}</span>{" "}
							<Link to={clockwiseLink}>{T.translate("formBookACall.thankYou.cta")}.</Link>
						</p>
					</div>
				) : (
					<>
						<h2 className="text-24 text-transform-none w-full mb-3 sm:text-30">{T.translate("formBookACall.title")}</h2>
						<Presenter
							className="w-full mb-15"
							avatar={data.portrait_drew_thachuk.childImageSharp.gatsbyImageData}
							name={T.translate("hero.presenter.name")}
							title={T.translate("hero.presenter.title")}
							textColor="dark"
						/>
						<p className="text-reflex text-16 font-black w-full mb-5">{T.translate("formBookACall.par")}</p>
						<Form
							form="dspAccountManager"
							className="hide_labels"
							submitText="Book a Time"
							onReady={() => {
								startBookACallFormListeners();
								populateLeadSourceDetails();
							}}
							onSubmit={() => {
								setIsBookACallFormSubmitted(true);
							}}
						/>
					</>
				)}
			</Modal>
			<Modal show={showMediaKitModal} variant="form" className="narrow" onClose={() => setShowMediaKitModal(false)}>
				{isMediaKitFormSubmitted ? (
					<div className="thank_you_message flex flex-column align-items-center w-full my-auto">
						<img className="mb-4" src={check_circle_green} style={{ width: "60px" }} alt="" />
						<h3 className="text-24 text-transform-none mb-4">{T.translate("formMediaKit.thankYou.title")}</h3>
						<p className="text-16 mb-0">
							<span>{T.translate("formMediaKit.thankYou.par")}</span> <Link to={clockwiseLink}>{T.translate("formMediaKit.thankYou.cta")}.</Link>
						</p>
					</div>
				) : (
					<>
						<h2 className="text-24 text-transform-none w-full mb-8 sm:text-30">{T.translate("formMediaKit.title")}</h2>

						<Form
							form="mediaKitProgrammaticDSP"
							className="hide_labels"
							onReady={() => {
								populateLeadSourceDetails();
							}}
							onSubmit={() => {
								setIsMediaKitFormSubmitted(true);
							}}
						/>
					</>
				)}
			</Modal>
			{showVideoModal && (
				<Modal show={showVideoModal} className="theme_carolina" variant="video" onClose={() => setShowVideoModal(false)}>
					<Video YoutubeID="Y0LurtvbZ7c" poster={data.video_poster.childImageSharp.gatsbyImageData} />
				</Modal>
			)}
		</Layout>
	);
}

export const query = graphql`
	query {
		hero: file(relativePath: { eq: "pages/dsp/account-manager/hero.png" }) {
			...img
		}

		video_poster: file(relativePath: { eq: "pages/dsp/account-manager/video_poster.jpg" }) {
			...img
		}

		feature_campaign: file(relativePath: { eq: "pages/dsp/account-manager/feature_campaign.png" }) {
			...img
		}
		feature_deal: file(relativePath: { eq: "pages/dsp/account-manager/feature_deal.png" }) {
			...img
		}
		feature_inventory: file(relativePath: { eq: "pages/dsp/account-manager/feature_inventory.png" }) {
			...img
		}

		portrait_stackadapt: file(relativePath: { eq: "pages/dsp/account-manager/portrait_stackadapt.png" }) {
			...img
		}
		portrait_displayce: file(relativePath: { eq: "pages/dsp/account-manager/portrait_displayce.png" }) {
			...img
		}
		portrait_illumin: file(relativePath: { eq: "pages/dsp/account-manager/portrait_illumin.png" }) {
			...img
		}

		portrait_drew_thachuk: file(relativePath: { eq: "pages/dsp/account-manager/portrait_drew_thachuk.png" }) {
			...img
		}

		posts: allWpPost(filter: { status: { eq: "publish" }, databaseId: { in: [41451, 38278, 42039] } }, sort: { date: DESC }) {
			nodes {
				...BlogPost
			}
		}
	}
`;
