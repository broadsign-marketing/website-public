import React from "react";
import Layout from "@components/LayoutMinimal";
import { useDico } from "@hooks/useDico";
import Link from "@components/LocalizedLink";
import Tank from "@components/Tank";

import broadsign_logo from "@img/broadsign/broadsign.svg";

import "@sass/pages/downtime.scss";

export default function DowntimePage({ location: { pathname } }) {
	useDico("en", "noLocal");

	return (
		<Layout id="page_downtime">
			<Tank id="overlay">
				<div className="inner">
					<p>
						<Link to="/">
							<img id="logo" src={broadsign_logo} alt="" />
						</Link>
					</p>
					<p>This product is currently down for maintenance. We will be back shortly.</p>
					<p>Sorry for the inconvenience this may have caused.</p>
					<p>
						<span>In case of an emergency please contact </span>
						<a href="mailto:support@broadsign.com" target="_blank" rel="noopener noreferrer">
							Broadsign Support
						</a>
					</p>
				</div>
			</Tank>
		</Layout>
	);
}
