import React, { useMemo } from "react";
import clsx from "clsx";

import "@sass/components/Row.scss";

export default function Row(props) {
	const { id, className, children } = props;

	const colsNum = useMemo(() => {
		if (children && children.length) {
			return Object.values(children).filter((e) => e !== "").length;
		}
		return 1;
	}, [children]);

	return (
		<div className={clsx("Row", className, `cols-${colsNum}`)} id={id}>
			{children}
		</div>
	);
}
