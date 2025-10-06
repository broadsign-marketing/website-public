import React, { useEffect, useRef, useState } from "react";
import { useScrollPercent } from "@hooks/useScreen";

export default function ScrollPercentBar() {
	const [hasScrolled25Percent, setHasScrolled25Percent] = useState(false);
	const [hasScrolled50Percent, setHasScrolled50Percent] = useState(false);
	const [hasScrolled75Percent, setHasScrolled75Percent] = useState(false);
	const [hasScrolled100Percent, setHasScrolled100Percent] = useState(false);

	const barRef = useRef(null);
	const scroll = useScrollPercent("#blog_post .post_content");

	useEffect(() => {
		if (typeof scroll === "number") {
			barRef.current.style.height = `${scroll}%`;

			if (scroll > 25 && !hasScrolled25Percent) {
				setHasScrolled25Percent(true);
				dataLayer.push({ event: "blog_scroll_threshold", distance_percent: 25 });
			}

			if (scroll > 50 && !hasScrolled50Percent) {
				setHasScrolled50Percent(true);
				dataLayer.push({ event: "blog_scroll_threshold", distance_percent: 50 });
			}

			if (scroll > 75 && !hasScrolled75Percent) {
				setHasScrolled75Percent(true);
				dataLayer.push({ event: "blog_scroll_threshold", distance_percent: 75 });
			}

			if (scroll >= 100 && !hasScrolled100Percent) {
				setHasScrolled100Percent(true);
				dataLayer.push({ event: "blog_scroll_threshold", distance_percent: 100 });
			}
		}
	}, [scroll]);

	useEffect(() => {
		window.dataLayer = window.dataLayer || [];
	}, []);

	return (
		<div className="scroll_percent_bar">
			<div className="color_bar" ref={barRef}></div>
		</div>
	);
}
