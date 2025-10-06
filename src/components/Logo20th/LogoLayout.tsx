import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { Children } from "@types";

type Logo20thLayoutProps = {
	children: Children;
};

export default function Logo20thLayout({ children }: Logo20thLayoutProps) {
	return (
		<div className="LogoLayout">
			<p>Blah</p>
		</div>
	);
}
