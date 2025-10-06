import React, { useEffect, useState } from "react";
import T from "i18n-react";
import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";
import clsx from "clsx";
import { useScreen } from "@hooks/useScreen";

export default function AuctionPackages__AudienceSegment({ segment, className }) {
	/*
	const [openState, setOpenState] = useState("untouched");

	const screen = useScreen();

	function toggleOpen() {
		switch (openState) {
			case "closed":
			case "untouched":
				setOpenState("open");
				break;
			case "open":
			default:
				setOpenState("closed");
		}
	} */

	return (
		<div className={clsx("audience_segment w-full flex flex-wrap sm:p-4", /* openState, */ className)}>
			<div className="segment_category w-full sm:w-3 sm:pb-0 md:w-2" /* onClick={toggleOpen} */>
				<p className="category">{segment.category}</p>
			</div>
			<div className="segment_description w-full sm:w-9 sm:pl-12 md:w-10">
				<p className="">{segment.description}</p>
			</div>
		</div>
	);
}
