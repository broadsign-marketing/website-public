import React from "react";
import { useDico } from "@hooks/useDico";

import Container from "@components/Container";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import Helmet from "react-helmet";

import borkebot from "@img/ui/borkebot.svg";

import "@sass/pages/404.scss";

export default function NotFoundPage() {
	useDico("en", "noLocal");

	return (
		<Layout id="page_not_found" className="theme_carolina">
			<Helmet>
				<meta name="robots" content="noindex, follow" />
			</Helmet>
			<Container id="hull" className="mt-16 mb-20">
				<div className="grid">
					<div className="col-12 sm:col-6">
						<p className="subtitle-1 gradient">404 - Page not found</p>
						<h1 className="h3 mb-8">Oops! Something's wrong here</h1>
						<img src={borkebot} id="borkebot" className="block my-8 sm:hidden" alt="Borkebot" />
						<p className="line-height-160 mb-14">
							The page you're looking for doesn't exist or may have been removed. You can <Link to="/">return to our homepage</Link> or{" "}
							<Link to="contact">contact us</Link> to find what you're looking for.
						</p>
						<ul>
							<li>
								<Link to="/" className="link_cerulean_arrow text-14 uppercase mb-6">
									Homepage
								</Link>
							</li>
							<li>
								<Link to="broadsignPlatform" className="link_cerulean_arrow text-14 uppercase mb-6">
									The Broadsign Platform
								</Link>
							</li>
							<li>
								<Link to="resources" className="link_cerulean_arrow text-14 uppercase mb-6">
									Resources
								</Link>
							</li>
							<li>
								<Link to="contact" className="link_cerulean_arrow text-14 uppercase mb-6">
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-12 sm:col-6">
						<img src={borkebot} id="borkebot" className="hidden sm:block" />
					</div>
				</div>
			</Container>
		</Layout>
	);
}
