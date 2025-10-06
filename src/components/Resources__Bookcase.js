import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import "@sass/components/ResourcesBookcase.scss";

export default function ResourcesBookcase({ bookcaseUrl }) {
	return (
		<div className="ResourcesBookcase">
			<iframe src={bookcaseUrl} seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"></iframe>
		</div>
	);
}
