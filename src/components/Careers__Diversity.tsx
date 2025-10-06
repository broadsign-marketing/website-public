import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import T from "i18n-react";
import clsx from "clsx";
import { loopTo } from "@annex";

import { GatsbyImage as Img } from "gatsby-plugin-image";

export default function Careers__Diversity() {
	const [currentImage, setCurrentImage] = useState(0);

	const data = useStaticQuery(graphql`
		query {
			diversity_1: file(relativePath: { eq: "pages/careers/diversity_1.jpg" }) {
				...img
			}
			diversity_2: file(relativePath: { eq: "pages/careers/diversity_2.jpg" }) {
				...img
			}
		}
	`);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage(loopTo("next", currentImage, 2));
		}, 3000);

		return () => clearInterval(interval);
	}, [currentImage]);

	return (
		<div className="bg-gradient rounded-xl px-4 pt-8 pb-3 sm:p-12">
			<div className="grid">
				<div className="col-12 text-left sm:col-6">
					<h2 className="text-34 text-white text-transform-none mb-8">{T.translate("diversity.title")}</h2>
					<p className="text-16 text-white line-height-160 sm:mb-0">{T.translate("diversity.par")}</p>
				</div>
				<div className="col-12 sm:col-6 sm:pl-10">
					<div className="photo_diversity_wrapper flex flex-center h-full">
						<Img
							className={clsx(
								"photo_diversity w-full rounded-xl absolute max-h-full max-w-full overflow-hidden",
								currentImage === 0 ? "opacity-1" : "opacity-0"
							)}
							image={data.diversity_1.childImageSharp.gatsbyImageData}
							alt=""
						/>
						<Img
							className={clsx(
								"photo_diversity w-full rounded-xl absolute max-h-full max-w-full overflow-hidden",
								currentImage === 1 ? "opacity-1" : "opacity-0"
							)}
							image={data.diversity_2.childImageSharp.gatsbyImageData}
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
