import React from "react";
import clsx from "clsx";
import Container from "@components/Container";
import "@sass/components/Aquarius.scss";

// type ShinCTACTAProps = { to: string; label: string; onClick: Function | null };
// type ShinCTAProps = { title: string; par: string; ctas: ShinCTACTAProps[] };
import { Children } from "@types";

type SimpleComponentProps = { className?: string; wrapperClassName?: string; children: Children };

export function FeatureWrapper({ ...props }: SimpleComponentProps) {
	return (
		<div className={clsx("aquarius_feature", props.wrapperClassName)}>
			<Container>
				<div className={clsx("feature grid flex-row", props.className)}>{props.children}</div>
			</Container>
		</div>
	);
}
export function FeatureOverTitle({ ...props }: SimpleComponentProps) {
	return <p className={clsx("subtitle-1 gradient font-medium mb-2", props.className)}>{props.children}</p>;
}

export function FeatureTitle({ ...props }: SimpleComponentProps) {
	const { className } = props;
	return (
		<h3 className={clsx("text-reflex font-superbold line-height-140 text-transform-none mb-8", className, !className?.match(/text-/) ? "h4" : "")}>
			{props.children}
		</h3>
	);
}

export function FeaturePar({ ...props }: SimpleComponentProps) {
	return <p className={clsx("text-reflex text-16 line-height-180 mb-8 sm:mb-0", props.className)}>{props.children}</p>;
}

export function ComingSoonTag({ ...props }: SimpleComponentProps) {
	return (
		<div className="block mb-4">
			<p
				className={clsx(
					"inline-block bg-reflex text-white text-12 uppercase px-3 py-1 rounded-6 line-height-120 letter-spacing-20 m-0 w-auto",
					props.className
				)}>
				{props.children}
			</p>
		</div>
	);
}

/*
export function ShinCTA({ title, par, ctas = [{ to: "demo", label: "", onClick }] }: ShinCTAProps) {
	return (
		<Container className="aquarius_shin pt-12 pb-12 sm:pt-16 sm:pb-22">
			<div className="inner rounded-xl px-5 py-6 sm:py-16">
				<h2 className="h4 text-white text-left mb-4 sm:text-center">{title}</h2>
				<p className="text-white text-left mb-10 mx-auto sm:text-center">{par}</p>
				<div className="flex flex-column align-items-start justify-content-center w-full sm:flex-row sm:flex-nowrap">
					{ctas[0] && (
						<CTA
							onClick={ctas[0].onClick}
							to={ctas[0].to}
							className="bg-white text-reflex border-1 border-white sm:mr-2 hover:bg-cerulean hover:text-white hover:border-cerulean">
							{ctas[0].label}
						</CTA>
					)}
					{ctas[1] && (
						<CTA
							onClick={ctas[0].onClick}
							to={ctas[1].to}
							className="bg-transparent text-white border-1 border-white sm:ml-2 hover:bg-cerulean hover:border-cerulean">
							{ctas[1].label}
						</CTA>
					)}
				</div>
			</div>
		</Container>
	);
}
 */
