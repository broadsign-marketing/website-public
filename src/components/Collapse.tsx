import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import clsx from "clsx";

import "@sass/components/Collapse.scss";

import { Children } from "@types";

type CollapseProps = {
	title: string;
	name: string;
	children: Children;
	active: boolean;
	className?: string;
	id?: string;
	icon?: string | null;
};

export default function Collapse({ className, id, title, name, children, icon, active = false }: CollapseProps) {
	const [open, setOpen] = useState(active);
	const [openHeight, setOpenHeight] = useState("0px");
	const collapseContent = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	function toggleOpen() {
		const toggle = !open;
		setOpen(toggle);
	}

	useEffect(() => {
		if (collapseContent) {
			const h = `${collapseContent.current.scrollHeight}px`;
			setOpenHeight(h);
		}
	}, [open]);

	/* 2021-02-23 - LeKevoid says : Isn't that extremely redundant ??? */
	useEffect(() => {
		if (active) {
			setOpen(true);
		}
	}, [active]);

	return (
		<div id={id} name={name} className={clsx("collapse", className, { open: open })}>
			<div className="title_container">
				<button className="div flex flex-row align-items-center" onClick={() => toggleOpen()}>
					{icon && <img src={icon} alt="" />}
					<h3 className="title">{title}</h3>
				</button>
			</div>
			<div className="content" ref={collapseContent} style={{ maxHeight: open ? openHeight : "0px" }}>
				{children}
			</div>
		</div>
	);
}
