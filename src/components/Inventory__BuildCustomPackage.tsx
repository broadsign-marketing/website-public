import React, { useState } from "react";
import CTA from "@components/CTA";
import clsx from "clsx";

import { ModalTalkToASpecialist } from "@partials/auctionPackages";

import whirl from "@img/pages/inventory-marketplace/custom_package.svg";

import "@sass/components/InventoryBuildCustomPackage.scss";

interface Inventory__BuildCustomPackageProps {
	className: string;
	onClick: Function;
}

export default function Inventory__BuildCustomPackage({ title, par, cta, className }: Inventory__BuildCustomPackageProps) {
	const [showTalkToASpecialistModal, setShowTalkToASpecialistModal] = useState(false);

	return (
		<div className={clsx("InventoryBuildCustomPackage bg-gradient rounded-xl", className)}>
			<div className="grid">
				<div className="col-12 text-center sm:col-5 md:col-4">
					<img src={whirl} className="img max-w-full" alt="" />
				</div>
				<div className="col-12 sm:col-7 md:col-8">
					<div className="pt-8 pb-10 px-4 sm:pr-10">
						<h2 className="h4 text-white text-left mb-4">{title}</h2>
						<p className="text-white text-left line-height-180 mb-10 sm:mb-6">{par}</p>
						<CTA
							preset="white-outline-transparent"
							hoverPreset="full-white"
							onClick={() => setShowTalkToASpecialistModal(true)}
							className="max-w-full">
							{cta}
						</CTA>
					</div>
				</div>
			</div>
			{showTalkToASpecialistModal && <ModalTalkToASpecialist onClose={() => setShowTalkToASpecialistModal(false)} />}
		</div>
	);
}
