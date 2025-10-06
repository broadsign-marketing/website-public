import React, { useEffect, useState } from "react";
import T from "i18n-react";
import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";
import clsx from "clsx";

interface CarouselProps {
	className: string;
	baseImage: IGatsbyImageData;
	rotatingImages: IGatsbyImageData[];
}

export default function AuctionPackages__HeroCarousel({ className = "", baseImage, rotatingImages }: CarouselProps) {
	const [current, setCurrent] = useState(0);

	const rotatingImagesLength = rotatingImages.length;

	useEffect(() => {
		const increment = () => {
			setCurrent((prev) => {
				if (prev >= rotatingImagesLength - 1) {
					return 0;
				}
				return prev + 1;
			});
		};

		const interval = setInterval(increment, 3000);

		return () => clearInterval(interval);
	}, [rotatingImagesLength]);

	return (
		<div className={clsx("HeroCarousel", className)}>
			<Img className="w-full z-1" image={baseImage} alt="" />
			{rotatingImages.map((image, k) => (
				<Img className={clsx("rotate z-2", { "opacity-0": k !== current })} image={image} alt="" key={k} />
			))}
		</div>
	);
}
