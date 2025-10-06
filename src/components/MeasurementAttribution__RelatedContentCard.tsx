import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { blogPostSlug } from "@annex";
import cookie from "react-cookies";

import Form, { getFormID } from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Link from "@components/LocalizedLink";

import play from "@img/pages/measurement-attribution/play_triangle.svg";

export default function RelatedContentCard({ type, content }) {
	/*
	const [showVideoModal, setShowVideoModal] = useState<string>("");
	const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

	useEffect(() => {
		const webinar1FormId = getFormID("webinarAttributionForDOOHAdvertising");
		const webinar2FormId = getFormID("webinarUsingBrandLiftStudiesToMeasureDOOHImpact");

		const webinar1Cookie = cookie.load(`submitted-form-${webinar1FormId}`);
		const webinar2Cookie = cookie.load(`submitted-form-${webinar2FormId}`);

		if (webinar1Cookie || webinar2Cookie) {
			setIsFormSubmitted(true);
		}
	}, [showVideoModal]); */

	if (type === "blog") {
		return (
			<Link to={blogPostSlug(content.slug)} className="card type_blog flex flex-column justify-content-between h-full rounded-xl overflow-hidden">
				<div className="thumbnail w-full">
					<Img image={content.featuredImage.node.gatsbyImage} className="" alt="" />
				</div>
				<div className="desc bg-zircon flex flex-column justify-content-between p-4 md:px-6 md:py-5">
					<div className="date text-ash text-12 uppercase mb-2">{content.formattedDate}</div>
					<div className="title mb-5">
						<h3 className="text-20 line-height-160">{content.title}</h3>
					</div>
					<div className="link_cerulean_arrow text-cerulean text-14 letter-spacing-10 uppercase mt-auto mb-0">{T.translate("readArticle")}</div>
				</div>
			</Link>
		);
	}

	if (type === "webinar") {
		return (
			<Link to={content.link} className="card type_webinar flex flex-column justify-content-between text-left h-full rounded-xl p-0 overflow-hidden">
				<div className="thumbnail bg-zircon w-full">
					<div className="play_btn">
						<img src={play} alt="" />
					</div>
					<img className="youtube_thumbnail w-full" src={`https://img.youtube.com/vi/${content.youtubeId}/0.jpg`} alt="" />
				</div>
				<div className="desc bg-zircon flex flex-column justify-content-between p-4 md:px-6 md:py-5">
					<div className="date text-ash text-12 uppercase mb-2">{content.formattedDate}</div>
					<div className="title mb-5">
						<h3 className="text-20 line-height-160">{content.title}</h3>
					</div>
					<div className="link_cerulean_arrow text-cerulean text-14 letter-spacing-10 uppercase mt-auto mb-0">{T.translate("watchWebinar")}</div>
				</div>
			</Link>
		);
	}

	if (type === "ebook") {
		return (
			<Link to={content.link} className="card type_ebook flex flex-column justify-content-between h-full rounded-xl overflow-hidden">
				<div className="thumbnail bg-zircon w-full">
					<Img image={content.thumbnail} className="" alt="" />
				</div>
				<div className="desc bg-zircon flex flex-column justify-content-between p-4 md:px-6 md:py-5">
					<div className="date text-ash text-12 uppercase mb-2">{content.formattedDate}</div>
					<div className="title mb-5">
						<h3 className="text-20 line-height-160">{content.title}</h3>
					</div>
					<div className="link_cerulean_arrow text-cerulean text-14 letter-spacing-10 uppercase mt-auto mb-0">{T.translate("downloadGuide")}</div>
				</div>
			</Link>
		);
	}

	return null;
}
