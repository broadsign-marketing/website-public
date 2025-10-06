import React, { useState } from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";
import route, { routeWithUtmForm } from "@route";

import { FeatureWrapper, FeatureOverTitle, FeatureTitle, FeaturePar } from "@components/Aquarius";
import AquariusMissionInNumbers from "@components/AquariusMissionInNumbers";
import AquariusSOC2CTABox from "@components/AquariusSOC2CTABox";
import CTA from "@components/CTA";
import Container from "@components/Container";
import FAQCollapse from "@components/FAQCollapse";
import Form from "@components/Form";
import Layout from "@components/layout";
import LogosMarquee from "@components/LogosMarquee";
import Modal from "@components/Modal";

import faqs_data from "@assets/ids_aquarius_faqs.json";

import hero from "@img/pages/content-network-management/hero.svg";
import feature_automated_content_scheduling from "@img/pages/content-network-management/feature_automated_content_scheduling.svg";
import feature_network_operations_reporting from "@img/pages/content-network-management/feature_network_operations_reporting.svg";
import feature_soc_compatibility from "@img/pages/content-network-management/feature_soc_compatibility.svg";
import feature_cloud_based_server from "@img/pages/content-network-management/feature_cloud_based_server.svg";
import feature_api_integrations from "@img/pages/content-network-management/feature_api_integrations.svg";

import logo_ooh from "@logos/ooh_reflex.svg";
import logo_clear_channel from "@logos/clear_channel_reflex.svg";
import logo_global from "@logos/global_reflex.svg";
import logo_jcd from "@logos/jcd_reflex.svg";
import logo_cineplex from "@logos/cineplex_reflex.svg";
import logo_intersection from "@logos/intersection_reflex.svg";
import logo_lightbox from "@logos/lightbox_reflex.svg";
import logo_cinemark from "@logos/cinemark_reflex.svg";
import logo_lamar from "@logos/lamar_reflex.svg";
import logo_stingray from "@logos/stingray_reflex.svg";
import logo_enmedio from "@logos/enmedio_reflex.svg";

import "@sass/pages/content_network_management.scss";

export default function ContentNetworkManagementPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	const [showBookCallModal, setShowBookCallModal] = useState(false);

	useDico(l, dicoPath);

	return (
		<Layout id="content_network_management" className={clsx("theme_carolina")}>
			<div className="bg-zircon pt-10 pb-12 overflow-x-hidden md:pt-25">
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
									to={`${route("plans")}?pi=content-network-management`}
									className="bg-transparent text-reflex border-reflex w-full max-h-full mb-2 px-6 md:w-auto md:ml-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
									{T.translate("hero.ctaPricing")}
								</CTA>
							</div>
						</div>
						<div className="col-12 flex flex-center mt-10 sm:col-6 sm:mt-0 lg:col-offset-1">
							<img src={hero} alt="" height="420" width="500" loading="eager" className="w-full" />
						</div>
					</div>
				</Container>
				<Container className="text-center mt-12">
					<p className="subtitle-1 gradient font-medium mx-auto mb-10">{T.translate("logos.title")}</p>
				</Container>
				<LogosMarquee
					logos={[
						logo_ooh,
						logo_clear_channel,
						logo_global,
						logo_jcd,
						logo_cineplex,
						logo_intersection,
						logo_lightbox,
						logo_cinemark,
						logo_lamar,
						logo_stingray,
						logo_enmedio,
					]}
				/>
			</div>
			<div className="features">
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.automated_content_scheduling.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.automated_content_scheduling.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.automated_content_scheduling.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_automated_content_scheduling} alt="" height="420" width="500" loading="lazy" className="feature_img w-full" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.network_operations_reporting.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.network_operations_reporting.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.network_operations_reporting.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_network_operations_reporting} alt="" height="420" width="500" loading="lazy" className="feature_img w-full" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.soc_compatibility.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.soc_compatibility.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.soc_compatibility.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 hover:bg-cerulean" to="systemOnChip">
							{T.translate("features.soc_compatibility.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_soc_compatibility} alt="" height="420" width="500" loading="lazy" className="feature_img w-full" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="sm:flex-row-reverse">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.cloud_based_ad_server.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.cloud_based_ad_server.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.cloud_based_ad_server.par")}</FeaturePar>
						<CTA className="bg-reflex text-white mt-6 hover:bg-cerulean" to="/blog/introducing-broadsign-air">
							{T.translate("features.cloud_based_ad_server.cta")}
						</CTA>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_cloud_based_server} alt="" height="420" width="500" loading="lazy" className="feature_img w-full" />
					</div>
				</FeatureWrapper>
				<FeatureWrapper className="">
					<div className="col-12 flex flex-column align-items-start justify-content-center sm:col-6">
						<FeatureOverTitle>{T.translate("features.api_integrations.overtitle")}</FeatureOverTitle>
						<FeatureTitle>{T.translate("features.api_integrations.title")}</FeatureTitle>
						<FeaturePar>{T.translate("features.api_integrations.par")}</FeaturePar>
					</div>
					<div className="col-12 flex flex-center sm:col-6">
						<img src={feature_api_integrations} alt="" height="420" width="500" loading="lazy" className="feature_img w-full" />
					</div>
				</FeatureWrapper>
			</div>
			<AquariusSOC2CTABox className="pt-8 pb-0 sm:py-32" />
			<AquariusMissionInNumbers className="mt-10 mb-12 sm:mb-32" />
			<div className="faq bg-zircon pt-10 pb-14 sm:py-30">
				<Container>
					<h3 className="h4 text-transform-none">{T.translate("faq.title")}</h3>
					{T.texts.faq.list.map(({ id, q, a }) => (
						<FAQCollapse q={q} a={a} borders="ash" dataQ={faqs_data[id]} key={id} />
					))}
				</Container>
			</div>
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
							to={`${route("plans")}?pi=content-network-management`}
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
