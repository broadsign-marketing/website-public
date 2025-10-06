import React, { memo, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { strIs } from "@annex";

import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";
import PlayBtn, { PlayBtnGradientBlue } from "@components/PlayBtn";

import type { PlayBtnStyle, PlayBtnColor } from "@types";

type VideoYoutubeProps = {
	id?: string;
	className?: string;
	YoutubeID?: string;
	poster?: IGatsbyImageData;
	playBtnColor?: PlayBtnColor;
	playBtnStyle?: PlayBtnStyle;
	title?: string;
	startAt?: number;
	children?: Children | string;
};

type YoutubePosterProps = {
	YoutubeID?: string;
	poster?: IGatsbyImageData;
	playBtnColor?: PlayBtnColor;
	playBtnStyle?: PlayBtnStyle;
	children?: Children | string;
	onClick: Function | false;
};

type YoutubeIFrameProps = {
	YoutubeID?: string;
	title?: string;
	startAt?: number;
};

const YoutubeIFrame = memo(({ YoutubeID, title, startAt }: YoutubeIFrameProps) => {
	return (
		<iframe
			id={`iframe_${YoutubeID}`}
			title={title}
			allow="accelerometer; clipboard-write; encrypted-media; autoplay;"
			allowFullScreen
			src={`https://www.youtube.com/embed/${YoutubeID}?rel=0&enablejsapi=1${startAt ? "&start=" + startAt : ""}`}></iframe>
	);
});

function YoutubePoster({ poster, YoutubeID, playBtnStyle, playBtnColor, children, onClick = false }: YoutubePosterProps) {
	const posterType: string = !poster && YoutubeID && strIs(YoutubeID, "youtubeID") ? "youtube" : "image";
	const playBtnType: string = playBtnStyle === "none" ? "none" : playBtnColor && playBtnStyle !== "gradient_blue" ? "component" : "img";

	return (
		<button
			className="div poster"
			onClick={($event) => {
				$event.stopPropagation();
				if (onClick) {
					onClick();
				}
			}}>
			{posterType === "image" && <Img image={poster} objectFit="cover" className="bg" alt="" />}
			{posterType === "youtube" && <img src={`https://img.youtube.com/vi/${YoutubeID}/0.jpg`} className="bg" alt="" />}
			{playBtnType === "component" && <PlayBtn color={playBtnColor} style={playBtnStyle} div />}
			{playBtnStyle === "gradient_blue" && <PlayBtnGradientBlue />}
			<div className="tagline">{children}</div>
		</button>
	);
}

const VideoYoutube = React.memo(({ id, className, YoutubeID, poster, playBtnColor, playBtnStyle, title, startAt, children }: VideoYoutubeProps) => {
	const [player, setPlayer] = useState(null);
	const [playerStatus, setPlayerStatus] = useState("not_loaded");

	const loadVideo = useCallback(
		(player = false) => {
			function onPlayerStateChange($event) {
				const playerStatusNumber = $event.data;

				if (playerStatusNumber === -1) {
					setPlayerStatus("unstarted");
				} else if (playerStatusNumber === 0) {
					setPlayerStatus("ended");
				} else if (playerStatusNumber === 1) {
					setPlayerStatus("playing");
				} else if (playerStatusNumber === 2) {
					setPlayerStatus("paused");
				} else if (playerStatusNumber === 3) {
					setPlayerStatus("buffering");
				} else if (playerStatusNumber === 5) {
					setPlayerStatus("cued");
				}
			}

			function onPlayerReady($event) {
				// console.log("player should be ready", $event.target);
				setPlayer($event.target);
			}

			function onPlayerError($event) {
				// console.error($event.data);
			}

			if (!window.YT) {
				return;
			}

			new window.YT.Player(`iframe_${YoutubeID}`, {
				videoId: YoutubeID,
				events: {
					onReady: onPlayerReady,
					onStateChange: onPlayerStateChange,
					onError: onPlayerError,
				},
			});
		},
		[YoutubeID]
	);

	useEffect(() => {
		if (!YoutubeID || !document) {
			return;
		}

		if (!window.YT) {
			const tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			window.onYouTubeIframeAPIReady = loadVideo;
			const firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		} else {
			window.YT.ready(function () {
				loadVideo(player);
			});
		}

		return () => {
			if (player) {
				player.destroy();
			}
		};
	}, [YoutubeID, player, loadVideo]);

	const handlePosterClick = useCallback((player) => {
		if (player?.playVideo) {
			player.playVideo();
		}
	}, []);

	return (
		<div id={id} className={clsx("Video", className, playerStatus)}>
			<YoutubePoster
				poster={poster}
				YoutubeID={YoutubeID}
				onClick={() => handlePosterClick(player)}
				playBtnStyle={playBtnStyle}
				playBtnColor={playBtnColor}
				children={children}
			/>
			<YoutubeIFrame YoutubeID={YoutubeID} startAt={startAt} title={title} />
		</div>
	);
});

export default VideoYoutube;
