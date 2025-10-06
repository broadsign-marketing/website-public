import React from "react";
import { StaticQuery, graphql } from "gatsby";
import clsx from "clsx";

import { GatsbyImage as Img } from "gatsby-plugin-image";

import quote_mark from "@img/ui/quote_round_reflex.svg";

import "@sass/components/Quote.scss";

type Quote = { id?: string; quote: string; sign: string; portrait: string };
interface QuoteProps {
	id?: string;
	className?: string;
	quotes: Quote[];
	resetAnimationOnChange: boolean;
}

export default function Quote({ id = "", className = "", quotes = [], resetAnimationOnChange = false }: QuoteProps) {
	return (
		<StaticQuery
			query={graphql`
				query QuotePortraitsQuery {
					portrait_ben: file(relativePath: { eq: "ui/portrait_ben.png" }) {
						...img
					}
					portrait_danny: file(relativePath: { eq: "ui/portrait_danny.png" }) {
						...img
					}
					portrait_karoliina: file(relativePath: { eq: "ui/portrait_karoliina.png" }) {
						...img
					}
					portrait_khadija: file(relativePath: { eq: "ui/portrait_khadija.png" }) {
						...img
					}
					portrait_khalil: file(relativePath: { eq: "ui/portrait_khalil.png" }) {
						...img
					}
					portrait_kyle: file(relativePath: { eq: "ui/portrait_kyle.png" }) {
						...img
					}
					portrait_matthew: file(relativePath: { eq: "ui/portrait_matthew.png" }) {
						...img
					}
					portrait_natalia_rojas: file(relativePath: { eq: "ui/portrait_natalia_rojas.png" }) {
						...img
					}
					portrait_pira: file(relativePath: { eq: "ui/portrait_pira.png" }) {
						...img
					}
					portrait_raj: file(relativePath: { eq: "ui/portrait_raj.png" }) {
						...img
					}
				}
			`}
			render={(data) => {
				quotes.forEach((quote) => {
					if (typeof quote.portrait === "undefined" || typeof data[`portrait_${quote.portrait}`] === "undefined") {
						console.debug("Quote component cannot find portrait.", quote);
						return null;
					}
				});

				return (
					<div className={clsx("Quote", className)}>
						<div className="Quote_inner">
							<img className="Quote_mark" src={quote_mark} />
							{quotes.map((quote, k) => (
								<blockquote key={k}>
									<p>{quote.quote}</p>
									{quote.sign && (
										<cite>
											<Img alt="" className="Quote_portrait" image={data[`portrait_${quote.portrait}`].childImageSharp.gatsbyImageData} />
											<span>{quote.sign}</span>
										</cite>
									)}
								</blockquote>
							))}
						</div>
					</div>
				);
			}}
		/>
	);
}
