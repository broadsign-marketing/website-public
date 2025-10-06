import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Video from "@components/Video";
import "@sass/components/VideoPoster.scss";

export default function VideoPoster({ bg, poster, title, url, YoutubeID, playBtnStyle = "lines", playBtnColor = "white", className, id, children }) {
	const [siblingElements, setSiblingElements] = useState([]);

	if (!id && YoutubeID) {
		id = YoutubeID;
	}

	let sectionStyles = {};
	if (bg) {
		if (bg === "transparent" || (typeof bg === "string" && bg.match(/#\w{3,6}/))) {
			sectionStyles.backgroundColor = bg;
		}
	}

	useEffect(() => {
		setSiblingElements([].concat.apply([], [children]));
	}, [children]);

	return (
		<section id={"video_poster_" + id} className={clsx("VideoPoster", className)} style={sectionStyles}>
			{bg && typeof bg === "object" ? <Img alt="" image={bg} className={clsx("bg", className)} objectFit="cover" /> : null}
			{siblingElements.length > 0 && siblingElements.filter((node) => node && node.props && node.props.before)}
			<Video title={title} playBtnStyle={playBtnStyle} playBtnColor={playBtnColor} YoutubeID={YoutubeID} poster={poster} id={id}>
				{siblingElements.length > 0 && siblingElements.filter((node) => node && node.props && !node.props.before && !node.props.after)}
			</Video>
			{siblingElements.length > 0 && siblingElements.filter((node) => node && node.props && node.props.after)}
		</section>
	);
}

VideoPoster.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	bg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
	poster: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
	title: PropTypes.string,
	url: PropTypes.string,
	YoutubeID: PropTypes.string,
};
