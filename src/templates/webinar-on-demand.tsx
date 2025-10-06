import React, { useEffect, useState } from "react";
import T from "i18n-react";
import cookie from "react-cookies";

import Container from "@components/Container";
import CTA from "@components/CTA";
import Form, { getFormID } from "@components/Form";
import Layout from "@components/layout";
import Modal from "@components/Modal";
import { Presenters, StickyColumn, FormModalOnDemand } from "@components/Webinars__LP_Components";
import Video from "@components/Video";

import "@sass/templates/webinars.scss";
import NeonBox from "@components/NeonBox";

export function FormModal(props) {
	return <FormModalOnDemand {...props} />;
}

export default function WebinarOnDemandTemplate({ id = "", data, formId, presenters, hero, description, ctaBox, video = "" }) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
	const [isFormJustSubmitted, setIsFormJustSubmitted] = useState<boolean>(false);

	useEffect(() => {
		const formHsId = getFormID(formId);
		const formCookie = cookie.load(`submitted-form-${formHsId}`);
		setIsFormSubmitted(!!formCookie);
	}, [formId]);

	let vimeoId = "";
	let youtubeId = "";

	if (video.match(/vimeo/) && video.match(/\/\d{10}/)) {
		vimeoId = video.match(/\/(\d{10})/)[1];
	} else if (video.match(/youtube/) && video.match(/v=[\w\d-_]{11}/)) {
		youtubeId = video.match(/v=([\w\d-_]{11})/)[1];
	} else if (video.match(/^[\w\d-_]{11}$/)) {
		youtubeId = video.match(/^([\w\d-_]{11})$/)[1];
	}

	if (!video) {
		return (
			<Layout id={id} className="theme_carolina webinar on_demand">
				<Container className="my-20">
					<p className="text-scarlet">A video has to be provided.</p>
				</Container>
			</Layout>
		);
	}

	const closeModal = () => {
		setShowModal(false);
		setIsFormJustSubmitted(false);
	};

	return (
		<Layout id={id} className="theme_carolina webinar on_demand">
			<section className="hero bg-zircon mb-20">{hero}</section>
			<Container tag="section" className="hull mb-20">
				<div className="grid">
					<div className="column_description col-12 sm:col-6">{description}</div>
					<div className="col-12 sm:col-6 md:col-5 md:col-offset-1">
						<StickyColumn>
							<Presenters data={data} presenters={presenters} />
							{isFormSubmitted ? (
								<NeonBox className="h-auto mb-4" innerClassName="px-4 py-6 sm:px-6">
									<p className="text-center my-10">
										<CTA preset="primary-outline" hoverPreset="full-reflex" onClick={() => setShowModal(true)}>
											{T.translate("watchWebinar")}!
										</CTA>
									</p>
								</NeonBox>
							) : (
								<NeonBox className="h-auto mb-4" innerClassName="px-4 py-6 sm:px-6">
									<h2 className="flexible_box_title text-24 text-reflex font-bold text-transform-none line-height-120 mb-6">
										{T.translate("accessWebinarOnDemand")}!
									</h2>
									<Form
										form={formId}
										killHubspotSubmitActions={true}
										submitText="Watch webinar"
										hideLabels={true}
										onSubmit={() => {
											setIsFormSubmitted(true);
											setIsFormJustSubmitted(true);
										}}
									/>
								</NeonBox>
							)}
						</StickyColumn>
					</div>
				</div>
			</Container>
			{(showModal || isFormJustSubmitted) && (
				<Modal variant="video" className="narrow webinar theme_carolina" onClose={closeModal}>
					<Video VimeoID={vimeoId} YoutubeID={youtubeId} />
				</Modal>
			)}
		</Layout>
	);
}
