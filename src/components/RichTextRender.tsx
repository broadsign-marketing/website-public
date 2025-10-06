import React, { memo } from "react";
import clsx from "clsx";

import "@sass/components/RichTextRender.scss";

type RichTextBase = {
	id: string;
	className: string;
	type: string;
	text?: string;
	items?: string[];
};

type RichTextSectionProps =
	| {
			type: "h2" | "h3" | "p";
			text: string;
	  }
	| {
			type: "list";
			items: string[];
	  };

type RichTextProps = {
	section: RichTextBase & RichTextSectionProps;
};

const RichTextRender = memo(function RichTextRender({ section: { id = "", className = "", type = "p", text = "", items = [] } }: RichTextProps) {
	if (type === "list") {
		return (
			<ul className={clsx("RichText checks_gradient", className)} id={id}>
				{items.map((item: string, k) => (
					<li dangerouslySetInnerHTML={{ __html: item }} key={item.substring(1, 10) + k} />
				))}
			</ul>
		);
	}

	if (type === "h2") {
		return <h2 className={clsx("RichText", className)} id={id} dangerouslySetInnerHTML={{ __html: text }} />;
	}

	if (type === "h3") {
		return <h3 className={clsx("RichText", className)} id={id} dangerouslySetInnerHTML={{ __html: text }} />;
	}

	return <p className={clsx("RichText", className)} id={id} dangerouslySetInnerHTML={{ __html: text }} />;
});

export default RichTextRender;
