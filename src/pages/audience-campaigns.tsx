import React, { useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";
import clsx from "clsx";
import route, { routeWithUtmForm } from "@route";
import { blogPostSlug } from "@annex";

import { FeatureWrapper, FeatureOverTitle, FeatureTitle, FeaturePar } from "@components/Aquarius";
import CTA from "@components/CTA";
import Container from "@components/Container";
import Form from "@components/Form";
import FAQCollapse from "@components/FAQCollapse";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
// import LogosMarquee from "@components/LogosMarquee";
import Modal from "@components/Modal";
import Video from "@components/Video";

import faqs_data from "@assets/ids_aquarius_faqs.json";

import icon_money from "@img/pages/audience-campaigns/icon_money.svg";
import icon_report from "@img/pages/audience-campaigns/icon_report.svg";
import icon_people from "@img/pages/audience-campaigns/icon_people.svg";
import icon_trigger from "@img/pages/audience-campaigns/icon_trigger.svg";

import "@sass/pages/audience_campaigns.scss";

function Benefit({ item: { icon, title, par } }) {
	return (
		<div className="bg-zircon flex flex-row flex-nowrap align-items-center rounded-10 p-6 mb-4">
			<img src={icon} className="icon mb-2" alt="" />
			<div className="block text-left pl-6">
				<h3 className="h5 font-bold line-height-100 mb-2">{title}</h3>
				<p className="m-0">{par}</p>
			</div>
		</div>
	);
}

export default function AudienceCampaignsPage({ pageContext: { l, dicoPath }, location: { state }, data }) {
	const [showBookCallModal, setShowBookCallModal] = useState(false);
	const [showDemoModal, setShowDemoModal] = useState(false);

	useDico(l, dicoPath);

	const icons: any = {
		money: icon_money,
		report: icon_report,
		people: icon_people,
		trigger: icon_trigger,
	};

	const list_lattice = T.texts.lattice.boxes.map((box) => ({ ...box, icon: icons[box.id] }));

	const featuredPost = data.featured_post.nodes.find((post) => post.language.slug === (l === "fr" ? "fr" : "en")) || false;

	useEffect(() => {
		if (state?.scrollTo) {
			scrollTo(state.scrollTo);
		}
	}, [state]);

	return (
		<Layout id="audience_campaigns" className={clsx("theme_carolina")}>
			<div className="bg-zircon pt-10 pb-12 md:pt-25 md:pb-16">
				<Container>
					<div className="hero grid">
						<div className="col-12 sm:col-6 lg:col-5">
							<p className="subtitle-1 gradient font-medium m-0">{T.translate("hero.overtitle")}</p>
							<h1 className="text-reflex font-superbold line-height-100 mb-8">{T.translate("hero.title")}</h1>
							<p className="tagline text-ash text-16 line-height-180 mb-10">{T.translate("hero.blurb")}</p>
							<div className="ctas flex flex-column flex-wrap sm:flex-row">
								<CTA onClick={() => setShowBookCallModal(true)} className="primary w-full max-h-full mr-0 mb-2 sm:w-auto sm:mr-4">
									{T.translate("hero.ctaBookCall")}
								</CTA>
								<CTA
									to={`${route("plans")}?pi=campaign-planning`}
									className="bg-transparent text-reflex border-reflex w-full max-h-full mb-2 px-6 sm:w-auto md:ml-0 hover:bg-cerulean hover:text-white hover:border-cerulean">
									{T.translate("hero.ctaPricing")}
								</CTA>
							</div>
						</div>
						<div className="col-12 flex flex-center mt-10 sm:col-6 sm:mt-0 lg:col-offset-1">
							<Img image={data.hero.childImageSharp.gatsbyImageData} alt="" className="w-full" />
						</div>
					</div>
					<h2 className="h4 text-reflex font-superbold line-height-140 text-transform-none mx-auto mt-15 mb-6 w-full text-center">
						{T.translate("hero.videoTitle")}
					</h2>
					<Video VimeoID="950865320" playBtnStyle="full_reflex" poster={data.video_poster.childImageSharp.gatsbyImageData} />
				</Container>
				{/*
				<Container className="text-center mt-12">
					<p className="subtitle-1 gradient font-medium mx-auto mb-10">{T.translate("logos.title")}</p>
				</Container>
				<LogosMarquee logos={[logo_intersection, logo_quebecor, logo_outedge, logo_clear_channel]} speed={20} />
				*/}
			</div>
			<section className="features">
				<Container className="hidden text-center pt-15 pt-4 sm:block">
					<p className="subtitle-1 gradient font-medium mx-auto mb-2">{T.translate("features.overtitle")}</p>
					<h3 className="h4 text-reflex font-superbold line-height-140 text-transform-none mx-auto mb-0 w-full text-center">
						{T.translate("features.title")}
					</h3>
				</Container>
				<div>
					<FeatureWrapper className="">
						<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
							<FeatureOverTitle>{T.translate("features.feature_targeting.overtitle")}</FeatureOverTitle>
							<FeatureTitle className="text-24">{T.translate("features.feature_targeting.title")}</FeatureTitle>
							<FeaturePar>{T.translate("features.feature_targeting.par")}</FeaturePar>
						</div>
						<div className="col-12 flex flex-center sm:col-6">
							<Img image={data.feature_targeting.childImageSharp.gatsbyImageData} alt="" className="" />
						</div>
					</FeatureWrapper>
					<FeatureWrapper className="sm:flex-row-reverse">
						<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
							<FeatureOverTitle>{T.translate("features.feature_delivery.overtitle")}</FeatureOverTitle>
							<FeatureTitle className="text-24">{T.translate("features.feature_delivery.title")}</FeatureTitle>
							<FeaturePar>{T.translate("features.feature_delivery.par")}</FeaturePar>
						</div>
						<div className="col-12 flex flex-center sm:col-6">
							<Img image={data.feature_delivery.childImageSharp.gatsbyImageData} alt="" className="" />
						</div>
					</FeatureWrapper>
					<FeatureWrapper className="">
						<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
							<FeatureOverTitle>{T.translate("features.feature_revenue.overtitle")}</FeatureOverTitle>
							<FeatureTitle className="text-24">{T.translate("features.feature_revenue.title")}</FeatureTitle>
							<FeaturePar>{T.translate("features.feature_revenue.par")}</FeaturePar>
						</div>
						<div className="col-12 flex flex-center sm:col-6">
							<Img image={data.feature_revenue.childImageSharp.gatsbyImageData} alt="" className="" />
						</div>
					</FeatureWrapper>
				</div>
			</section>
			<section className="lattice pt-12 sm:pb-32">
				<Container className="text-center">
					<h2 className="h4 mb-12 mx-auto max-w-800">{T.translate("lattice.title")}</h2>
					{list_lattice.map((item, k) => (
						<Benefit item={item} key={k} />
					))}
					<div className="flex flex-column align-items-start justify-content-center w-full mt-10 sm:flex-row">
						<CTA onClick={() => setShowDemoModal(true)} className="primary w-full max-h-full mr-0 mb-2 sm:w-auto sm:mr-4">
							{T.translate("hero.ctaDemo")}
						</CTA>
						<CTA
							to={`${route("plans")}?pi=campaign-planning`}
							className="bg-transparent text-reflex border-reflex w-full max-h-full mb-2 px-6 sm:w-auto md:ml-0 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{T.translate("hero.ctaPricing")}
						</CTA>
					</div>
				</Container>
			</section>
			<div className="faq mb-12">
				<Container>
					<h3 className="h4 text-transform-none">{T.translate("faq.title")}</h3>
					{T.texts.faq.list.map(({ id, track, q, a }) => (
						<FAQCollapse q={q} a={a} borders="ash" dataQ={faqs_data[id]} key={id} />
					))}
				</Container>
			</div>
			{featuredPost && (
				<Container className="featured_post">
					<div className="bg-zircon px-5 pt-10 pb-8 rounded-xl sm:px-12">
						<div className="grid">
							<div className="col-12 sm:col-7 md:col-8 flex align-items-center">
								<h3 className="tagline h4 mb-4 sm:mb-0">{T.translate("featuredPost.tagline")}</h3>
							</div>
							<div className="col-12 sm:col-5 md:col-4">
								<Link to={blogPostSlug(featuredPost.slug, l === "fr" ? "fr" : "en")} className="post_card">
									<Img image={featuredPost.featuredImage.node.gatsbyImage} className="post_thumbnail w-full rounded-xl mb-4" alt="" />
									<p className="subtitle-1 text-dark font-light text-left mb-2 sm:text-center">
										<span className="text-12">{featuredPost.formattedDate}</span>
									</p>
									<h2 className="h6 mb-4">{l === "en" ? featuredPost.title : T.translate("featuredPost.title")}</h2>
									<span className="subtitle-2 link_cerulean_arrow mb-0">{T.translate("featuredPost.cta")}</span>
								</Link>
							</div>
						</div>
					</div>
				</Container>
			)}
			<Container className="aquarius_shin pt-12 pb-12 sm:pt-16 sm:pb-22">
				<div className="inner rounded-xl px-5 py-6 sm:py-16">
					<h2 className="h4 text-white text-left mb-4 mx-auto sm:text-center">{T.translate("shin.title")}</h2>
					<p className="text-white text-left mb-10 mx-auto sm:text-center">{T.translate("shin.par")}</p>
					<div className="flex flex-column align-items-start justify-content-center w-full sm:flex-row sm:flex-nowrap">
						<CTA
							onClick={() => setShowBookCallModal(true)}
							className="bg-white text-reflex border-1 border-white mb-4 sm:mb-0 sm:mr-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{T.translate("shin.ctaBookCall")}
						</CTA>
						<CTA
							to={`${route("plans")}?pi=campaign-planning`}
							className="bg-transparent text-white border-1 border-white sm:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{T.translate("shin.ctaPricing")}
						</CTA>
					</div>
				</div>
			</Container>
			{showDemoModal && (
				<Modal variant="form" className="theme_carolina" onClose={() => setShowDemoModal(false)}>
					<h3 className="h4 text-reflex mb-8">{T.translate("hero.ctaDemo")}</h3>
					<Form form="demo" submitText="Request a Demo" redirectUrl={routeWithUtmForm("thankYou", "request_a_demo")} />
				</Modal>
			)}
			{showBookCallModal && (
				<Modal variant="form" className="theme_carolina" onClose={() => setShowBookCallModal(false)}>
					<h3 className="h4 text-reflex mb-8">{T.translate("shin.ctaBookCall")}</h3>
					<Form form="bookACall" campaign="bookACallAquarius" submitText="Book a Call" redirectUrl={routeWithUtmForm("thankYou", "book_a_call")} />
				</Modal>
			)}
		</Layout>
	);
}

export const query = graphql`
	query ($l: String) {
		hero: file(relativePath: { eq: "pages/audience-campaigns/hero.png" }) {
			...img
		}
		video_poster: file(relativePath: { eq: "pages/audience-campaigns/video_poster.jpg" }) {
			...img
		}

		feature_targeting: file(relativePath: { eq: "pages/audience-campaigns/feature_targeting.png" }) {
			...img
		}
		feature_delivery: file(relativePath: { eq: "pages/audience-campaigns/feature_delivery.png" }) {
			...img
		}
		feature_revenue: file(relativePath: { eq: "pages/audience-campaigns/feature_revenue.png" }) {
			...img
		}

		featured_post: allWpPost(filter: { databaseId: { in: [41394, 42158] }, language: { slug: { in: ["en", "fr"] } } }) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: $l)
			}
		}
	}
`;
