import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import clsx from "clsx";

import PlayBtn from "@components/PlayBtn";

import btn_gradient_blue from "@img/controls/play_btn_gradient_blue.svg";

type VideoSources = string[];

interface VideoHTMLProps {
	sources: VideoSources;
	className: string;
	id: string;
	poster: string;
	loading: boolean;
	playing: boolean;
	playBtnColor: string;
	playBtnStyle: string;
	onClick: Function | undefined;
	onPlaying: Function | undefined;
}

type VideoStatus = "progress" | "start" | "complete";

type DataLayerEventPartial = {
	video_status?: VideoStatus;
	video_current_time?: number;
	video_percent?: number;
};

type DataLayerEvent = {
	event: "video_engagement";
	video_status: VideoStatus;
	video_current_time: number;
	video_duration: number;
	video_title?: string;
	video_url: string;
	video_percent: number;
};

const VideoHTML = forwardRef(function VideoHTML(
	{ id, className, title = "", poster, loading, playing, sources, playBtnColor = "", playBtnStyle = "gradient_blue", onClick, onPlaying }: VideoHTMLProps,
	ref: ForwardedRef<unknown>
) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);

	const [hasStarted, setHasStarted] = useState(false);
	const [hasWatched25Percent, setHasWatched25Percent] = useState(false);
	const [hasWatched50Percent, setHasWatched50Percent] = useState(false);
	const [hasWatched75Percent, setHasWatched75Percent] = useState(false);
	const [hasWatched100Percent, setHasWatched100Percent] = useState(false);

	const { origin } = useLocation();
	const videoSourceUrl = `${origin}/videos/${sources[0]}`;

	const dataLayerVideoEvent = useCallback(
		({ video_status = "progress", video_percent = 0 }: DataLayerEventPartial): DataLayerEvent => {
			return {
				event: "video_engagement",
				video_status,
				video_current_time: currentTime,
				video_percent,
				video_duration: duration,
				video_title: title || videoSourceUrl,
				video_url: videoSourceUrl,
			};
		},
		[currentTime, duration, title, videoSourceUrl]
	);

	useEffect(() => {
		const video = ref.current;

		const handleTimeUpdate = () => {
			if (duration === 0) {
				setDuration(video.duration);
			}

			setCurrentTime(video.currentTime);
			setProgress((video.currentTime / video.duration) * 100);
		};

		const handleVideoPlaying = () => {
			setIsPlaying(true);
			onPlaying();
		};

		const handleVideoPause = () => {
			setIsPlaying(false);
		};

		video.addEventListener("timeupdate", handleTimeUpdate);
		video.addEventListener("playing", handleVideoPlaying);
		video.addEventListener("pause", handleVideoPause);

		return () => {
			video.removeEventListener("timeupdate", handleTimeUpdate);
			video.removeEventListener("playing", handleVideoPlaying);
			video.removeEventListener("pause", handleVideoPause);
		};
	}, [ref, onClick, duration, isPlaying]);

	useEffect(() => {
		if (progress > 0 && !hasStarted) {
			setHasStarted(true);
			const videoEvent = dataLayerVideoEvent({ video_status: "start", video_percent: 0 });
			// console.log("Video started", videoEvent);
			dataLayer.push(videoEvent);
		}

		if (progress > 25 && !hasWatched25Percent) {
			setHasWatched25Percent(true);
			const videoEvent = dataLayerVideoEvent({ video_percent: 25 });
			// console.log("Watched 25%", videoEvent);
			dataLayer.push(videoEvent);
		}

		if (progress > 50 && !hasWatched50Percent) {
			setHasWatched50Percent(true);
			const videoEvent = dataLayerVideoEvent({ video_percent: 50 });
			// console.log("Watched 50%", videoEvent);
			dataLayer.push(videoEvent);
		}

		if (progress > 75 && !hasWatched75Percent) {
			setHasWatched75Percent(true);
			const videoEvent = dataLayerVideoEvent({ video_percent: 75 });
			// console.log("Watched 75%", videoEvent);
			dataLayer.push(videoEvent);
		}

		if (progress >= 100 && !hasWatched100Percent) {
			setHasWatched100Percent(true);
			const videoEvent = dataLayerVideoEvent({ video_percent: 100 });
			console.log("Watched 100% ; Video Complete", videoEvent);
			const videoCompleteEvent = dataLayerVideoEvent({ video_status: "complete", video_percent: 100 });
			dataLayer.push(videoEvent);
			dataLayer.push(videoCompleteEvent);
		}
	}, [dataLayerVideoEvent, duration, progress, hasStarted, hasWatched25Percent, hasWatched50Percent, hasWatched75Percent, hasWatched100Percent]);

	useEffect(() => {
		window.dataLayer = window.dataLayer || [];
	}, []);

	const playBtnType = playBtnStyle === "none" ? "none" : playBtnColor && playBtnStyle !== "gradient_blue" ? "component" : "img";

	return (
		<div id={id} className={clsx(className, "VideoHTML", loading && "loading", playing && "playing")}>
			{playBtnType === "component" && <PlayBtn color={playBtnColor} style={playBtnStyle} div />}
			{playBtnType === "img" && <img src={btn_gradient_blue} className="PlayBtn" alt="Play" />}
			<video poster={poster} controls preload="none" onClick={onClick} ref={ref}>
				{sources.map((src) => (
					<source src={`/videos/${src}`} type="video/mp4" key={src} />
				))}
			</video>
		</div>
	);
});

export default VideoHTML;
