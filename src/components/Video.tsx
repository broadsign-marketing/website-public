import React, { useRef, useState, MutableRefObject } from "react";
import clsx from "clsx";

import { getSrc, IGatsbyImageData } from "gatsby-plugin-image";
import VideoHTML from "@components/VideoHTML";
import VideoVimeo from "@components/VideoVimeo";
import VideoYoutube from "@components/VideoYoutube";

import "@sass/components/Video.scss";

import type { PlayBtnStyle, PlayBtnColor } from "@types";

type VideoPropsBase =
	| { file: string; sources?: string[]; VimeoID?: string; YoutubeID?: string }
	| { file?: string; sources: string[]; VimeoID?: string; YoutubeID?: string }
	| { file?: string; sources?: string[]; VimeoID: string; YoutubeID?: string }
	| { file?: string; sources?: string[]; VimeoID?: string; YoutubeID: string };

type VideoProps = {
	className?: string;
	id?: string;
	children?: Children | string;
	title?: string;
	playBtnColor?: PlayBtnColor;
	playBtnStyle?: PlayBtnStyle;
	poster?: IGatsbyImageData;
	startAt?: string;
} & VideoPropsBase;

export default function Video({
	className,
	id,
	children,
	title,
	playBtnColor = "white",
	playBtnStyle = "none",
	poster,
	file = "",
	sources = [],
	VimeoID = "",
	YoutubeID = "",
	startAt = "",
}: VideoProps) {
	const [playing, setPlaying] = useState(false);

	const selfRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	if (VimeoID) {
		return <VideoVimeo id={id} className={className} VimeoID={VimeoID} poster={poster} playBtnColor={playBtnColor} playBtnStyle={playBtnStyle} />;
	}

	if (sources.length || file) {
		if (sources.length === 0 && file) {
			sources = Array.isArray(file) ? file : [file];
		}

		return (
			<VideoHTML
				id={id}
				className={clsx(className, "Video")}
				sources={sources}
				playing={playing}
				poster={getSrc(poster)}
				controls
				ref={selfRef}
				playBtnColor={playBtnColor}
				playBtnStyle={playBtnStyle}
				onClick={() => {
					if (selfRef && !playing) {
						selfRef.current.play();
						setPlaying(true);
					}
				}}
				onPlaying={() => {
					if (!playing) {
						setPlaying(true);
					}
				}}
			/>
		);
	}

	return (
		<VideoYoutube
			id={id}
			className={className}
			YoutubeID={YoutubeID}
			poster={poster}
			title={title}
			startAt={startAt}
			children={children}
			playBtnColor={playBtnColor}
			playBtnStyle={playBtnStyle}
		/>
	);
}
