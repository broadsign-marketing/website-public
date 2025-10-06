import React from "react";
import clsx from "clsx";
import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";

import "@sass/components/Presenter.scss";

interface PresenterProps {
	id?: string;
	className?: string;
	avatar: IGatsbyImageData;
	name: string;
	title: string;
	avatarSize?: string;
	company?: string;
	textColor?: string;
}

export default function Presenter({
	id = "",
	className = "",
	avatar,
	name,
	title,
	company,
	avatarSize = "60px",
	textColor = "reflex",
}: PresenterProps): JSX.Element {
	if (!avatar) {
		return null;
	}

	return (
		<div id={id} className={clsx("Presenter", className)} style={{ "--avatar-size": avatarSize }}>
			<div>
				<Img className="avatar" image={avatar} alt={name} />
			</div>
			<div className="details">
				{name && <p className={clsx("name font-bold m-0", `text-${textColor}`)}>{name}</p>}
				{title && <p className={clsx("title m-0", `text-${textColor}`)}>{title}</p>}
				{company && <p className={clsx("company m-0", `text-${textColor}`)}>{company}</p>}
			</div>
		</div>
	);
}
