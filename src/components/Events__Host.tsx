import React from "react";
import clsx from "clsx";

import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";

import "@sass/components/EventsHost.scss";

type EventHostProps = {
	portrait: IGatsbyImageData;
	portraitSize: string | number;
	name: string;
	title: string;
	className: string;
	id: string;
};

export default function Events__Host({ id = "", className = "", portrait, portraitSize = 55, name = "", title = "" }: EventHostProps) {
	return (
		<div className={clsx("EventsHost", "flex flex-column align-items-center sm:flex-row", className)} id={id}>
			<div className="portrait">
				<Img image={portrait} className="portrait sm:my-3 sm:mr-4" alt={name} style={{ width: `${portraitSize}px` }} />
			</div>
			<div className="name text-center sm:text-left">
				<p className="font-bold m-0">{name}</p>
				<p className="m-0">{title}</p>
			</div>
		</div>
	);
}
