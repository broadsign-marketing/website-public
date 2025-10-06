import React, { useCallback, useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import clsx from "clsx";

import Container from "@components/Container";
import Form from "@components/Form__HubspotCalendly";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import NeonBox from "@components/NeonBox";

import gift_card from "@img/pages/events/csp-forum-2025/gift_card.svg";
import gift_card_hover from "@img/pages/events/csp-forum-2025/gift_card_hover.svg";

import "@sass/pages/events/2025_csp_forum.scss";

export default function Woo20Page({ pageContext: { l, dicoPath }, data }) {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	useDico(l, dicoPath);

	return (
		<Layout id="csp_forum_2025" className="theme_carolina">
			<Container className="pt-15 pb-30 sm:pb-40">
				<div className="grid">
					<div className="col-12 mb-20 sm:col-6 sm:pr-6 sm:mb-0 lg:col-7">
						<h1 className="text-30 font-bold text-transform-none mb-6 md:text-34">{T.translate("title")}</h1>
						<ul className="checks_gradient mb-6">
							{T.texts.points.map((p, k) => (
								<li className="py-0" key={`point_${k}`}>
									<span className="subtitle-1 gradient font-bold text-transform-none line-height-160 m-0 letter-spacing-0">{p}</span>
								</li>
							))}
						</ul>
						{T.texts.pars.map((p, k) => (
							<p className="text-dark line-height-180 mb-8" key={`par_${k}`}>
								{p}
							</p>
						))}
						<div className="img_wrapper bg-zircon rounded-xl p-4 sm:p-5">
							<div className="grid">
								<div className="col-12 flex flex-center sm:col-6 sm:col-5 md:col-4 lg:col-3">
									<div className="card_wrapper">
										<img className="gift_card" src={gift_card} alt="" />
										<img className="gift_card hover" src={gift_card_hover} alt="" />
									</div>
								</div>
								<div className="col-12 sm:col-6 sm:col-7 md:col-8 lg:col-9">
									<h2 className="text-20 text-transform-none mb-2 sm:text-24">{T.translate("giftCardTitle")}</h2>
									<p className="text-dark line-height-180 m-0">{T.translate("giftCardDesc")}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 sm:col-6 sm:pl-6 lg:col-5">
						<NeonBox className="h-auto">
							{!isFormSubmitted && (
								<>
									<h2 className="text-20 text-transform-none mt-0 mb-6 md:text-24">{T.translate("formTitle")}</h2>
									<p className="text-dark line-height-180 mb-6">{T.translate("formDesc")}</p>
								</>
							)}
							<div className={clsx("mb-auto", isFormSubmitted ? "mt-auto" : "mt-0")}>
								<Form
									hsForm="event2025CSPRetailForum"
									calendlyFormUrl="https://calendly.com/everett-goldthorp-broadsign/csp-qr-code-event?month=2025-04"
									onHubspotSubmit={() => setIsFormSubmitted(true)}
									tyMsg="cspForum"
									submitText="Book a meeting"
								/>
							</div>
						</NeonBox>
					</div>
				</div>
			</Container>
		</Layout>
	);
}

export const query = graphql`
	query {
		gift_card: file(relativePath: { eq: "pages/events/csp-forum-2025/gift_card.png" }) {
			...img
		}
	}
`;
