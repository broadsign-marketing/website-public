import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Container from "@components/Container";
import Layout from "@components/layout";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import RichTextRender from "@components/RichTextRender";

import "@sass/pages/sustainability_statement.scss";

export default function PrivacyPolicy({ pageContext: { l, dicoPath }, data }) {
	useDico(l, dicoPath);

	return (
		<Layout id="sustainability_statement" className="theme_carolina">
			<Img image={data.hero.childImageSharp.gatsbyImageData} className="hero w-full mb-20" objectPosition="center bottom" alt="" />
			<Container className="mb-40">
				<h1 className="mb-10">{T.translate("title")}</h1>
				{T.texts.content.map((section: any, k) => (
					<RichTextRender section={section} key={k} />
				))}
			</Container>
		</Layout>
	);
}

export const queryIndex = graphql`
	query {
		hero: file(relativePath: { eq: "pages/sustainability-statement/hero.png" }) {
			...img
		}
		bg: file(relativePath: { eq: "pages/sustainability-statement/bg.jpg" }) {
			...img
		}
	}
`;
