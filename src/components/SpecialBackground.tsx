import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useScroll } from "@hooks/useScreen";
import { GatsbyImage as Img } from "gatsby-plugin-image";

import "@sass/components/SpecialBackground.scss";

export default function SpecialBackground({ image }) {
	const [mounted, setMounted] = useState(false);
	const bgRef = useRef<HTMLElement>(null);

	const scrollPos = useScroll();

	useEffect(() => {
		if (typeof document === "undefined" || !bgRef.current || window.innerWidth < 1600) {
			return;
		}

		const bg = bgRef.current.getBoundingClientRect();

		if (bg.height < window.innerHeight) {
			return;
		}

		const pageHeight = document.querySelector("#global").getBoundingClientRect().height;
		const percentScrolled = (scrollPos + window.innerHeight) / pageHeight;

		const bgFreedomOfMovement = bg.height - window.innerHeight;
		bgRef.current.style.top = `${Math.max(0 - bgFreedomOfMovement, 0 - bgFreedomOfMovement * percentScrolled)}px`;
	}, [scrollPos]);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (mounted) {
		return createPortal(
			<div className="bg_wrapper" ref={bgRef}>
				<Img image={image} className="w-full" alt="" />
			</div>,
			document.getElementById("special-bg-portal")
		);
	}

	return null;
}
