import React, { useCallback, useEffect, useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import T from "i18n-react";
import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";
import clsx from "clsx";

import chevron from "@img/controls/chevron_down_ash.svg";

import video_audience_targeting_hd from "@videos/outmoove/feature_audience_targeting_hd.mp4";
import video_campaign_options_hd from "@videos/outmoove/feature_campaign_options_hd.mp4";
import video_campaign_reporting_hd from "@videos/outmoove/feature_campaign_reporting_hd.mp4";
import video_optimization_hd from "@videos/outmoove/feature_optimization_hd.mp4";
import video_planning_forecasting_hd from "@videos/outmoove/feature_planning_forecasting_hd.mp4";
import video_audience_targeting_sm from "@videos/outmoove/feature_audience_targeting_sm.mp4";
import video_campaign_options_sm from "@videos/outmoove/feature_campaign_options_sm.mp4";
import video_campaign_reporting_sm from "@videos/outmoove/feature_campaign_reporting_sm.mp4";
import video_optimization_sm from "@videos/outmoove/feature_optimization_sm.mp4";
import video_planning_forecasting_sm from "@videos/outmoove/feature_planning_forecasting_sm.mp4";

import "@sass/components/OutMooveFeatures.scss";

export default function OutMoove__Features({ className = "", baseImage, rotatingImages }: CarouselProps) {
	const data = useStaticQuery(graphql`
		query OutMoove__Features {
			planning_forecasting: file(relativePath: { eq: "pages/outmoove/feature_planning_forecasting.png" }) {
				...img
			}
			campaign_options: file(relativePath: { eq: "pages/outmoove/feature_campaign_options.png" }) {
				...img
			}
			audience_targeting: file(relativePath: { eq: "pages/outmoove/feature_audience_targeting.png" }) {
				...img
			}
			optimization: file(relativePath: { eq: "pages/outmoove/feature_optimization.png" }) {
				...img
			}
			campaign_reporting: file(relativePath: { eq: "pages/outmoove/feature_campaign_reporting.png" }) {
				...img
			}
		}
	`);

	const videos = {
		audience_targeting: { hd: video_audience_targeting_hd, sm: video_audience_targeting_sm },
		campaign_options: { hd: video_campaign_options_hd, sm: video_campaign_options_sm },
		campaign_reporting: { hd: video_campaign_reporting_hd, sm: video_campaign_reporting_sm },
		optimization: { hd: video_optimization_hd, sm: video_optimization_sm },
		planning_forecasting: { hd: video_planning_forecasting_hd, sm: video_planning_forecasting_sm },
	};

	const features = T.texts.features.list;

	const [current, setCurrent] = useState(features[0].id);
	const [previous, setPrevious] = useState("");

	const changeVideo = useCallback(
		(next) => {
			setPrevious(current);
			setCurrent(next);
			setTimeout(() => setPrevious(""), 1000);
		},
		[current]
	);

	return (
		<div className={clsx("OutMooveFeatures", className)}>
			<div className="grid">
				<div className="col-12 flex flex-column flex-center sm:col-6 md:col-7">
					<div className="video_wrapper rounded-xl w-full">
						{features.map(({ id }) => (
							<React.Fragment key={id}>
								{(id === current || id === previous) && (
									<video
										className={clsx("feature_video w-full rounded-xl", { active: id === current, exiting: id === previous })}
										autoPlay
										muted
										loop>
										<source src={videos[id].hd} type="video/mp4"></source>
										<source src={videos[id].sm} type="video/mp4"></source>
										<Img
											image={data[id].childImageSharp.gatsbyImageData}
											className={clsx("feature_thumb m-auto", { active: id === current })}
											alt=""
											key={id}
										/>
									</video>
								)}
							</React.Fragment>
						))}
					</div>
				</div>
				<div className="col-12 sm:col-6 md:col-5">
					<div className="flex flex-column h-full -mt-3">
						{features.map(({ id, name, desc }) => (
							<button className={clsx("div feature_link text-left py-3", { active: id === current })} onClick={() => changeVideo(id)} key={id}>
								<h3 className="name flex flex-row flex-nowrap">
									<span className="text-gradient text-16 text-transform-none">{name}</span>
									<img src={chevron} className="chevron" alt="" />
								</h3>
								<p className="desc text-ash text-16 m-0">{desc}</p>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
