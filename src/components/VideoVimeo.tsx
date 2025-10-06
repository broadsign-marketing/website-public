import React, { useState } from "react";
import clsx from "clsx";

import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";
import Vimeo from "@u-wave/react-vimeo";
import { PlayBtnGradientBlue, PlayBtnFullReflex } from "@components/PlayBtn";

type VideoVimeoProps = {
	VimeoID: string;
	id?: string;
	className?: string;
	poster?: IGatsbyImageData;
	playBtnStyle?: string;
};

const VideoVimeo = React.memo(({ VimeoID, id = "", className = "", poster, playBtnStyle = "none" }: VideoVimeoProps) => {
	const [playerStatus, setPlayerStatus] = useState("not_loaded");

	function handlePlay() {
		setPlayerStatus("playing");
	}

	return (
		<div id={id} className={clsx("Video VideoVimeo h-full", className, playerStatus)}>
			{poster && (
				<button className="video_poster div bg z-5" onClick={() => handlePlay()}>
					{playBtnStyle === "full_reflex" && <PlayBtnFullReflex className="z-5" />}
					{playBtnStyle === "gradient_blue" && <PlayBtnGradientBlue className="z-5" />}
					{playBtnStyle === "none" && <PlayBtnGradientBlue className="z-5" />}
					<Img image={poster} className="video_poster_img" alt="Play" />
				</button>
			)}
			{!poster && <Vimeo video={VimeoID} className="desktop h-full z-2" />}
			{poster && playerStatus === "playing" && <Vimeo video={VimeoID} autoplay className="desktop h-full z-2" />}
			<Vimeo video={VimeoID} className="ipad z-1" />
		</div>
	);
});

export default VideoVimeo;
