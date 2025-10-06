import React, { useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";
import route, { routeWithUtmForm } from "@route";

import { FeatureWrapper, FeatureOverTitle, FeatureTitle, FeaturePar, ComingSoonTag } from "@components/Aquarius";
import Carousel from "@components/BroadsignAdsCarousel";
import CTA from "@components/CTA";
import Container from "@components/Container";
import FAQCollapse from "@components/FAQCollapse";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Modal from "@components/Modal";

import faqs_data from "@assets/ids_aquarius_faqs.json";

import "@sass/pages/local_signage_messaging.scss";

import feature_user_friendly from "@img/pages/local-signage-messaging/feature_user_friendly.svg";
import feature_timeline_visualization from "@img/pages/local-signage-messaging/feature_timeline_visualization.svg";

export default function LocalSignageMessagingPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [showBookCallModal, setShowBookCallModal] = useState(false);

	useDico(l, dicoPath);

	return (
		<Layout id="local_signage_messaging" className={clsx("theme_carolina")}>
			<div className="bg-zircon pt-10 pb-12 md:pt-25">
				<Container>
					<div className="hero grid">
						<div className="col-12 sm:col-6 lg:col-5">
							<p className="subtitle-1 gradient font-medium m-0">{T.translate("hero.overtitle")}</p>
							<h1 className="text-reflex font-superbold line-height-100 mb-8">{T.translate("hero.title")}</h1>
							<p className="tagline text-reflex text-16 line-height-180 mb-10">{T.translate("hero.blurb")}</p>
							<div className="ctas flex flex-column md:flex-row">
								<CTA onClick={() => setShowBookCallModal(true)} className="primary w-full max-h-full mb-2 sm:w-auto sm:mr-2">
									{T.translate("hero.ctaBookCall")}
								</CTA>
								<CTA
									to={`${route("plans")}?pi=local-signage-messaging`}
									className="bg-transparent text-reflex border-reflex w-full max-h-full mb-2 px-6 md:w-auto md:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
									{T.translate("hero.ctaPricing")}
								</CTA>
							</div>
						</div>
						<div className="col-12 flex flex-center mt-10 sm:col-6 sm:mt-0 lg:col-offset-1">
							<Img image={data.hero.childImageSharp.gatsbyImageData} alt="" className="w-full" />
						</div>
					</div>
				</Container>
			</div>
			<div className="features">
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.local_messaging.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.local_messaging.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.local_messaging.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img
							image={data.feature_local_messaging.childImageSharp.gatsbyImageData}
							alt=""
							height="420"
							width="500"
							loading="lazy"
							className="w-full"
						/>
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.custom_content.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.custom_content.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.custom_content.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img
							image={data.feature_custom_content.childImageSharp.gatsbyImageData}
							alt=""
							height="420"
							width="500"
							loading="lazy"
							className="w-full"
						/>
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.content_management.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.content_management.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.content_management.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img
							image={data.feature_content_management.childImageSharp.gatsbyImageData}
							alt=""
							height="420"
							width="500"
							loading="lazy"
							className="w-full"
						/>
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.insights.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.insights.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.insights.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img image={data.feature_insights.childImageSharp.gatsbyImageData} alt="" height="420" width="500" loading="lazy" className="w-full" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.user_friendly.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.user_friendly.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.user_friendly.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_user_friendly} alt="" height="420" width="500" className="feature_img w-full" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.clients_groups.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.clients_groups.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.clients_groups.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<Img
							image={data.feature_clients_groups.childImageSharp.gatsbyImageData}
							alt=""
							height="420"
							width="500"
							className="feature_img w-full"
						/>
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.timeline_visualization.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.timeline_visualization.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.timeline_visualization.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_timeline_visualization} alt="" height="420" width="500" className="feature_img w-full" />
					</div>
				</FeatureWrapper>
			</div>
			<div className="testimonials bg-zircon pt-10 pb-14 sm:pt-30 sm:pb-34">
				<Container>
					<h2 className="h4 mb-12 text-center mx-auto max-w-800">{T.translate("customers.title")}</h2>
					<Carousel loop={{ auto: true, duration: 6000 }} className="">
						{T.texts.customers.testimonials.map(({ id, quote }) => (
							<div className="bg-reflex p-8 rounded-xl sm:p-10 md:p-15" key={id}>
								<div className="grid flex-column-reverse sm:flex-row">
									<div className="col-12 flex flex-center sm:col-4 md:col-3">
										<Img image={data[`logo_${id}`].childImageSharp.gatsbyImageData} alt="" />
									</div>
									<div className="col-12 flex align-items-center sm:col-8 md:col-9">
										<p className="quote text-white line-height-200 font-serif mb-4 sm:m-0">{quote}</p>
									</div>
								</div>
							</div>
						))}
					</Carousel>
				</Container>
			</div>
			<div className="faq bg-white pt-10 pb-14 sm:py-30">
				<Container>
					<h3 className="h4 text-transform-none">{T.translate("faq.title")}</h3>
					{T.texts.faq.list.map(({ id, q, a }) => (
						<FAQCollapse q={q} a={a} borders="ash" dataQ={faqs_data[id]} key={id} />
					))}
				</Container>
			</div>
			{/* {["en"].includes(l) && (
				<div className="related_blog bg-zircon pt-10 pb-14 sm:pt-30 sm:pb-34">
					<Container>
						<Link to={T.translate("relatedBlog.to")} className="grid flex-row">
							<div className="col-12 sm:col-6">
								<FeatureTitle>{T.translate("relatedBlog.title")}</FeatureTitle>
								<FeaturePar>{T.translate("relatedBlog.par")}</FeaturePar>
							</div>
							<div className="col-12 sm:col-6 lg:col-4 lg:col-offset-1">
								<Img
									image={data.related_blog.childImageSharp.gatsbyImageData}
									alt=""
									height="420"
									width="500"
									className="w-full overflow-visible mb-4 sm:mb-0"
								/>
								<p className="text-12 text-reflex uppercase mt-4 mb-1">{T.translate("relatedBlog.postDate")}</p>
								<h4 className="h5">{T.translate("relatedBlog.postTitle")}</h4>
								<p className="text-13 text-cerulean uppercase link_cerulean_arrow">{T.translate("relatedBlog.postCTA")}</p>
							</div>
						</Link>
					</Container>
				</div>
			)} */}
			<Container className="aquarius_shin pt-12 pb-12 sm:pt-16 sm:pb-22">
				<div className="inner rounded-xl px-5 py-6 sm:py-16">
					<h2 className="h4 text-white text-left mb-4 sm:text-center">{T.translate("shin.title")}</h2>
					<p className="text-white text-left mb-10 mx-auto sm:text-center">{T.translate("shin.par")}</p>
					<div className="flex flex-column align-items-start justify-content-center w-full sm:flex-row sm:flex-nowrap">
						<CTA
							onClick={() => setShowBookCallModal(true)}
							className="bg-white text-reflex border-1 border-white mb-4 sm:mb-0 sm:mr-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{T.translate("shin.ctaBookCall")}
						</CTA>
						<CTA
							to={`${route("plans")}?pi=local-signage-messaging`}
							className="bg-transparent text-white border-1 border-white sm:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{T.translate("shin.ctaPricing")}
						</CTA>
					</div>
				</div>
			</Container>
			{showBookCallModal && (
				<Modal variant="form" className="theme_carolina" onClose={() => setShowBookCallModal(false)}>
					<h3 className="h4 text-reflex mb-8">{T.translate("shin.ctaBookCall")}</h3>
					<Form form="bookACall" campaign="bookACallAquarius" submitText="Book a Call" redirectUrl={routeWithUtmForm("thankYou", "book_a_call")} />
				</Modal>
			)}
		</Layout>
	);
}

export const subscribeImg = graphql`
	query {
		hero: file(relativePath: { eq: "pages/local-signage-messaging/hero.png" }) {
			...img
		}

		feature_local_messaging: file(relativePath: { eq: "pages/local-signage-messaging/feature_local_messaging.png" }) {
			...img
		}
		feature_custom_content: file(relativePath: { eq: "pages/local-signage-messaging/feature_custom_content.png" }) {
			...img
		}
		feature_content_management: file(relativePath: { eq: "pages/local-signage-messaging/feature_content_management.png" }) {
			...img
		}
		feature_insights: file(relativePath: { eq: "pages/local-signage-messaging/feature_insights.png" }) {
			...img
		}
		feature_clients_groups: file(relativePath: { eq: "pages/local-signage-messaging/feature_clients_groups.png" }) {
			...img
		}

		logo_bonjour_sante: file(relativePath: { eq: "pages/local-signage-messaging/logo_bonjour_sante.png" }) {
			...img
		}
		logo_hmn: file(relativePath: { eq: "pages/local-signage-messaging/logo_hmn.png" }) {
			...img
		}

		related_blog: file(relativePath: { eq: "pages/local-signage-messaging/related_blog_thumbnail.jpg" }) {
			...img
		}
	}
`;
