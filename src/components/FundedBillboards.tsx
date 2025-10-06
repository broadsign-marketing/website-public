import React, { useMemo, useState } from "react";
import T from "i18n-react";
import clsx from "clsx";
import { shuffle } from "@annex";

import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";
import Intersection from "@components/Intersection";

import "@sass/components/FundedBillboards.scss";

import coin from "@img/pages/dooh-more/coin.svg";
import sold from "@img/pages/dooh-more/sold.svg";

type FundedBillboardsProps = {
	images: IGatsbyImageData[];
};

function FundedBillboard({ delay, image }) {
	return (
		<div className={clsx("FundedBillboard flex flex-column align-items-center justify-content-between", `delay_${delay}`)}>
			<div className="coins">
				<img src={coin} className="coin" alt="" />
				<img src={coin} className="coin" alt="" />
				<img src={coin} className="coin" alt="" />
			</div>
			<div className="sold_zone">
				<img className="sold" src={sold} alt={T.translate("sold")} />
			</div>
			<div className="billboard_wrapper">
				<Img image={image} className="billboard" alt="" />
			</div>
		</div>
	);
}

export default function FundedBillboards({ images = [] }: FundedBillboardsProps) {
	const delays = useMemo(() => {
		const numbers = shuffle([1, 2, 3, 4]);
		numbers.unshift(0);
		return numbers.map((n) => n * 500);
	}, []);

	return (
		<Intersection className="FundedBillboards flex flex-nowrap">
			{images.map((image, k) => (
				<FundedBillboard image={image} delay={delays[k]} key={k} />
			))}
		</Intersection>
	);
}
