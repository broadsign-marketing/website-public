import React, { useCallback, useEffect, useState } from "react";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import clsx from "clsx";

import "@sass/components/FlippingThumbs.scss";

import { Children, GatsbyImage } from "@types";

type Thumb = GatsbyImage | string;

interface FlippingThumbsProps {
	className: string;
	thumbs: Thumb[];
	visibleQty: number;
	children: Children;
	speed: number;
}

export default function FlippingThumbs({ className, thumbs, visibleQty = 4, speed = 2000 }: FlippingThumbsProps) {
	const [activeThumbs, setActiveThumbs] = useState<number[]>(Array.from({ length: visibleQty + 1 }, (_, i) => i + 1));
	const [enteringThumb, setEnteringThumb] = useState<number>(1);
	const [leavingThumb, setLeavingThumb] = useState<number>(visibleQty + 1);

	const totalNumberOfThumbs: number = thumbs.length;
	const topAdjustment = `${Math.max(80 - visibleQty * 20, 0)}px`;

	const calculateThumbStyles = useCallback(
		(pos: number) => {
			const rightBase = Math.max(pos - 2, 0);
			const bigMultiplier = 80 / visibleQty;
			const smallMultiplier = 16 / visibleQty;
			return { right: `min(${rightBase * bigMultiplier}px, ${rightBase * smallMultiplier}vw)`, top: `${-bigMultiplier * pos}px`, zIndex: pos + 10 };
		},
		[visibleQty]
	);

	useEffect(() => {
		const interval = setInterval(() => {
			let out = activeThumbs.map((n) => {
				if (n >= thumbs.length) {
					return 1;
				}
				return n + 1;
			});

			setActiveThumbs(out);
			setEnteringThumb(out[0]);
			setLeavingThumb(out[out.length - 1]);
		}, speed);

		return () => clearInterval(interval);
	}, [activeThumbs, speed, totalNumberOfThumbs, visibleQty, thumbs]);

	return (
		<div className={clsx("FlippingThumbs", className)} style={{ transform: `translateY(${topAdjustment})` }}>
			{thumbs.map((thumb, k) => {
				const thumbK = k + 1;
				const inc = String(thumbK).padStart(2, "0");
				const pos = activeThumbs.indexOf(thumbK) + 1 || 0;

				return (
					<Img
						className={clsx(`thumb thumb_${inc}`, {
							entering: thumbK === enteringThumb,
							leaving: thumbK === leavingThumb,
							"opacity-0": pos === 0,
						})}
						image={thumb}
						style={calculateThumbStyles(pos)}
						alt=""
						key={k}
					/>
				);
			})}
		</div>
	);
}
