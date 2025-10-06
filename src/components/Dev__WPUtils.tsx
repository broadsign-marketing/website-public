import React, { memo, useEffect, useState } from "react";
import clsx from "clsx";
import { useLocation } from "@reach/router";
import Link from "@components/LocalizedLink";

import "@sass/components/DevWPUtils.scss";

import logo_broadsign from "@img/broadsign/broadsign_icon.svg";
import wp_favicon from "@img/broadsign/wp_favicon.png";

type PostType = "content-stream" | "page" | "post";
type WPAdminLink = { id: string };

const WPAdminLink = memo(function WPAdminLink({ id }: WPAdminLink): JSX.Element {
	return (
		<Link to={`https://writers.broadsign.com/wp-admin/post.php?post=${id}&action=edit`} className="WPAdminLink" title="Go to WP Post">
			<img src={wp_favicon} className="favicon" alt="Go to WP Post" />
		</Link>
	);
});

const WPProdLink = memo(function WPProdLink(): JSX.Element | null {
	const { pathname } = useLocation();

	if (pathname) {
		return (
			<Link to={`https://broadsign.com${pathname}`} target="_self" className="WPAdminLink" title="Go to Post on broadsign.com">
				<img src={logo_broadsign} className="favicon block" alt="Go to Post on broadsign.com" />
			</Link>
		);
	}

	return null;
});

const DevWPUtils = memo(function Dev__WPUtils({ id }: WPAdminLink): JSX.Element | null {
	const [isDev, setIsDev] = useState(false);
	const { origin } = useLocation();

	useEffect(() => {
		if (origin && origin.match(/(dev|test|wip|staging)\.broadsign\.com/)) {
			setIsDev(true);
		}
	}, [origin]);

	if (!isDev) {
		return null;
	}

	return (
		<div className="Dev__WPUtils">
			<WPProdLink />
			<WPAdminLink id={id} />
		</div>
	);
});

export default Dev__WPUtils;
