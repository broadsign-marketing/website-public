import React, { memo } from "react";

import Helmet from "./App__SEOHelmet";
import Header from "./App__Header";
import Footer from "./App__Footer";

import "@sass/index.scss";

import { Children } from "@types";

type LayoutProps = {
	id: string;
	className: string;
	children: Children;
};

type HelmetProps = {
	seo: any;
};

const HelmetMemo = memo((): JSX.Element => <Helmet />);

const HeaderMemo = memo((): JSX.Element => <Header />);

const MainMemo = memo(
	({ id, className, children }: LayoutProps): JSX.Element => (
		<main className={className} id={id}>
			{children}
		</main>
	)
);

const FooterMemo = memo(() => <Footer />);

export default function Layout({ id, className, children }: LayoutProps): JSX.Element {
	return (
		<div id="global">
			<HelmetMemo />
			<HeaderMemo />
			<MainMemo id={id} className={className}>
				{children}
			</MainMemo>
			<FooterMemo />
		</div>
	);
}
