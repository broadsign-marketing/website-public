import React, { useEffect, useMemo, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";
import { routeWithUtmForm } from "@route";
import { blogPostSlug } from "@annex";
import cookie from "react-cookies";

import Campaigns from "@components/App__Carousel_CaseStudies";
import Container from "@components/Container";
import CTA from "@components/CTA";
import FAQCollapse from "@components/FAQCollapse";
import Form, { getFormID } from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import LogosMarquee from "@components/LogosMarquee";
import Link from "@components/LocalizedLink";
import Modal from "@components/Modal";
import NeonBox from "@components/NeonBox";
import RelatedContentCard from "@components/MeasurementAttribution__RelatedContentCard";

import faqs_data from "@assets/ids_aquarius_faqs.json";

import logo_activ8me from "@logos/activ8me_reflex.svg";
import logo_happydemics from "@logos/happydemics_reflex.svg";
import logo_mfour from "@logos/mfour_reflex.svg";
import logo_spotzi from "@logos/spotzi_reflex.svg";
import logo_native_touch from "@logos/native_touch_reflex.svg";
import logo_connected_interactive from "@logos/connected_interactive_reflex.svg";
import logo_arrivalist from "@logos/arrivalist_reflex.svg";
import logo_accretive_outcomes from "@logos/accretive_outcomes_reflex.svg";
import logo_mira from "@logos/mira_reflex.svg";
import logo_circana from "@logos/circana_reflex.svg";
import logo_veeva from "@logos/veeva_reflex.svg";
import logo_national_retail_solutions from "@logos/national_retail_solutions_reflex.svg";
import logo_iqvia from "@logos/iqvia_reflex.svg";
import logo_abcs_insights from "@logos/abcs_insights_reflex.svg";
import logo_kochava from "@logos/kochava_reflex.png";

import whirl from "@img/pages/measurement-attribution/whirl.svg";

import "@sass/pages/measurement_attribution.scss";

export default function Attribution({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);

	useDico(l, dicoPath);

	const posts = useMemo(() => {
		return data.posts.nodes.map((post) => {
			if (T.texts.resources?.posts?.[post.databaseId].title) {
				post.title = T.texts.resources.posts[post.databaseId].title;
			}

			return post;
		});
	}, [data, l]);

	return (
		<Layout id="attribution" className="theme_carolina">
			<Container tag="section" className="hero mb-20 sm:mb-4">
				<div className="grid">
					<div className="col-12 flex flex-center sm:flex-order-2 sm:col-6">
						<Img className="hero_img mt-12 mb-6 sm:my-20" image={data.hero.childImageSharp.gatsbyImageData} alt="" />
					</div>
					<div className="col-12 flex column-center sm:flex-order-1 sm:col-6">
						<h1 className="text-30 mb-4 sm:text-34">{T.translate("hero.title")}</h1>
						<p className="subtitle-1 gradient font-medium mb-6">{T.translate("hero.undertitle")}</p>
						<p className="mb-12">{T.translate("hero.blurb")}</p>
						<CTA className="primary" onClick={() => setShowTalkToASpecialistModal(true)}>
							{T.translate("hero.cta")}
						</CTA>
					</div>
				</div>
			</Container>
			<Container tag="section" className="solutions mb-15">
				<h2 className="text-30 text-center mb-10 sm:text-34">{T.translate("solutions.title")}</h2>
				<div className="grid">
					{T.texts.solutions.boxes.map(({ id, title, subtitle, par }) => (
						<div className="col-12 sm:col-4" key={id}>
							<NeonBox innerClassName="flex flex-column justify-content-between">
								<h3 className="text-20 sm:text-24">{title}</h3>
								<p className="subtitle-1 gradient font-medium mb-5">{subtitle}</p>
								<p className="mb-3">{par}</p>
								<div className="image_wrapper w-full mt-auto">
									<Img className="solution_img" image={data[`solution_${id}`].childImageSharp.gatsbyImageData} objectFit="contain" alt="" />
								</div>
							</NeonBox>
						</div>
					))}
				</div>
				<p className="text-center mt-10">
					<CTA className="primary mx-auto" to={T.translate("solutions.cta.to")}>
						{T.translate("solutions.cta.label")}
					</CTA>
				</p>
			</Container>
			<Container tag="section" className="partners text-center">
				<p className="subtitle-1 gradient font-medium mb-6">{T.translate("partners.title")}</p>
			</Container>
			<LogosMarquee
				className="mb-30"
				logos={[
					logo_activ8me,
					logo_happydemics,
					logo_mfour,
					logo_spotzi,
					logo_native_touch,
					logo_connected_interactive,
					logo_arrivalist,
					logo_accretive_outcomes,
					logo_mira,
					logo_circana,
					logo_veeva,
					logo_national_retail_solutions,
					logo_iqvia,
					logo_abcs_insights,
					logo_kochava,
				]}
			/>
			<Container tag="section" className="campaigns mb-20">
				<h2 className="text-30 text-center mb-8 sm:text-34 sm:mb-15">{T.translate("campaigns.title")}</h2>
				<Campaigns
					campaigns={["hnm", "white_claw", "seadoo", "holt_renfrew", "samsonite"]}
					bg="white"
					overtitle="none"
					showProps={["objective", "targetStrategy", "results"]}
					showLocationProps={false}
					cta={T.translate("readCaseStudy")}
				/>
			</Container>
			<Container tag="section" className="features">
				<h2 className="text-30 text-center mb-12 sm:text-34 sm:mb-20">{T.translate("features.title")}</h2>
				{T.texts.features.list.map(({ id, title, par, cta, to }, k) => (
					<div className={clsx("feature grid mb-20 sm:mb-16 md:mb-22 lg:mb-30", k % 2 !== 0 ? "" : "sm:flex-row-reverse")} key={id}>
						<div className="col-12 flex flex-center sm:col-6">
							<Img className="feature_img mb-8 sm:mb-0" image={data[`feature_${id}`].childImageSharp.gatsbyImageData} alt="" />
						</div>
						<div className={clsx("col-12 sm:col-6", k % 2 === 0 ? "sm:pr-10 md:pr-15" : "sm:pl-10 md:pl-15")}>
							<h3 className="text-20 mb-6 sm:text-24">{title}</h3>
							<p className="mb-10">{par}</p>
							<CTA className="primary" to={to}>
								{cta}
							</CTA>
						</div>
					</div>
				))}
			</Container>
			<Container tag="section" className="resources mb-20">
				<h2 className="text-30 text-center mb-8 sm:text-34">{T.translate("resources.title")}</h2>
				<div className="grid align-items-stretch">
					<div className="col-12 sm:col-4">
						<RelatedContentCard type="blog" content={posts[0]} />
					</div>
					<div className="col-12 sm:col-4">
						<RelatedContentCard type="blog" content={posts[1]} />
					</div>
					<div className="col-12 sm:col-4">
						<RelatedContentCard type="blog" content={posts[2]} />
					</div>
					<div className="col-12 sm:col-4">
						<RelatedContentCard type="webinar" content={T.texts.resources.resources[0]} />
					</div>
					<div className="col-12 sm:col-4">
						<RelatedContentCard type="webinar" content={T.texts.resources.resources[1]} />
					</div>
					<div className="col-12 sm:col-4">
						<RelatedContentCard
							type="ebook"
							content={{ ...T.texts.resources.resources[2], thumbnail: data.quick_guide_thumb.childImageSharp.gatsbyImageData }}
						/>
					</div>
				</div>
			</Container>
			<Container tag="section" className="faq pb-15">
				<h2 className="text-30 pb-4 mb-5 border-bottom-1 border-reflex sm:text-34">{T.translate("faq.title")}</h2>
				{T.texts.faq.list.map(({ id, q, a }) => (
					<FAQCollapse q={q} a={a} borders="reflex" dataQ={faqs_data[id]} key={id} />
				))}
			</Container>
			<Container tag="section" className="shin mb-8">
				<div className="bg-gradient rounded-xl">
					<div className="grid">
						<div className="col-12 text-center sm:col-5 md:col-4">
							<img src={whirl} className="whirl max-w-full" alt="" />
						</div>
						<div className="col-12 sm:col-7 md:col-8">
							<div className="pt-8 pb-10 px-4 sm:pr-10">
								<h2 className="text-white text-30 mb-8 sm:text-34">{T.translate("shin.title")}</h2>
								<CTA
									preset="primary-outline"
									hoverPreset="full-cerulean"
									className="border-none wrap"
									onClick={() => setShowTalkToASpecialistModal(true)}>
									{T.translate("shin.cta")}
								</CTA>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Modal show={showTalkToASpecialistModal} variant="form" className="theme_carolina narrow" onClose={() => setShowTalkToASpecialistModal(false)}>
				<h3 className="h4 text-reflex mb-8">{T.translate("hero.cta")}</h3>
				<Form form="talkToASpecialist" submitText="Get in touch" redirectUrl={routeWithUtmForm("thankYou", "talk_to_a_media_specialist")} />
			</Modal>
		</Layout>
	);
}

export const query = graphql`
	query ($l: String) {
		hero: file(relativePath: { eq: "pages/measurement-attribution/hero.png" }) {
			...img
		}

		solution_metrics: file(relativePath: { eq: "pages/measurement-attribution/solution_metrics.png" }) {
			...img
		}
		solution_traffic: file(relativePath: { eq: "pages/measurement-attribution/solution_traffic.png" }) {
			...img
		}
		solution_engagement: file(relativePath: { eq: "pages/measurement-attribution/solution_engagement.png" }) {
			...img
		}

		feature_impact: file(relativePath: { eq: "pages/measurement-attribution/feature_impact.png" }) {
			...img
		}
		feature_roi: file(relativePath: { eq: "pages/measurement-attribution/feature_roi.png" }) {
			...img
		}
		feature_spend: file(relativePath: { eq: "pages/measurement-attribution/feature_spend.png" }) {
			...img
		}

		quick_guide_thumb: file(relativePath: { eq: "pages/measurement-attribution/quick_guide_thumb.png" }) {
			...img
		}

		posts: allWpPost(filter: { status: { eq: "publish" }, databaseId: { in: [42687, 42868, 37276] } }, sort: { date: DESC }) {
			nodes {
				...BlogPost
				formattedDate: date(formatString: "LL", locale: $l)
			}
		}
	}
`;
