import type { ReactNode } from "react";
import type { PageProps, PageContextType } from "gatsby";
import type { IGatsbyImageData } from "gatsby-plugin-image";

export type Children = ReactNode | JSX.Element | Element | string | false;

export type GatsbyImage = IGatsbyImageData;

export type PageContext = {
	dicoPath?: string;
	l?: string;
};

export type PageLocation = {
	pathname?: string;
	href?: string;
	search?: string;
};

export type SEOContent = {
	title: String;
	description: String;
	robots?: String;
	type?: "article" | "website";
	datePublished?: String;
};

export type SEOAuthor = {
	name: String;
	url?: String;
};

export type Coords = {
	x: number | string;
	y: number | string;
};

export type Locale = "en" | "fr" | "es" | "de" | "pt" | "nl" | "ja" | "id" | "zh" | "key";

export type TranslationObj = {
	[key in Locale]?: String;
};

export type LocalizedImage = {
	[key in Locale]?: HTMLImageElement;
};

export type AuctionPackagesMasonryBox = {
	icon: string;
	title: string;
	content: string;
};

export interface StringMap {
	[key: string]: string;
}

type BroadsignPageContext = PageContextType & { l: string; dicoPath: string };

export type BroadsignPageProps = PageProps & { pageContext: BroadsignPageContext };

export type PlayBtnStyle = "none" | "lines" | "gradient_blue" | "full_reflex";
export type PlayBtnColor = "white" | "reflex";
