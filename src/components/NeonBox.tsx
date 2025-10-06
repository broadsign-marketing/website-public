import React, { useEffect, useState } from "react";
import clsx from "clsx";

import type Children from "@types";

import "@sass/components/NeonBox.scss";

type NeonBoxProps = { id?: string; className?: string; innerClassName?: string; children: Children };

export default function NeonBox({ id, className, innerClassName, children }: NeonBoxProps) {
	return (
		<div id={id} className={clsx("NeonBox bg-gradient", className)}>
			<div className={clsx("inner", innerClassName)}>{children}</div>
		</div>
	);
}
