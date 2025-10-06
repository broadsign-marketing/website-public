import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { Children } from "@types";

type IntersectionProps = {
	tag?: keyof HTMLElementTagNameMap;
	className?: string;
	id?: string;
	threshold?: number;
	children: Children;
	onObserved?: Function;
};

export default function Intersection({ children, tag = "div", id = "", className = "", threshold = 0.5, onObserved = null }: IntersectionProps) {
	const [isObserved, setIsObserved] = useState(false);

	const CustomTag = tag;

	const selfRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsObserved(true);
					if (onObserved) onObserved();
					observer.disconnect();
				}
			},
			{ root: null, threshold }
		);

		if (selfRef.current) observer.observe(selfRef.current);

		return () => {
			if (selfRef.current) observer.disconnect();
		};
	}, [isObserved, threshold, onObserved]);

	return (
		<CustomTag id={id} className={clsx(className, { observed: isObserved })} ref={selfRef}>
			{children}
		</CustomTag>
	);
}
