import React, { useCallback, useEffect, useMemo, useRef, useState, MutableRefObject } from "react";
import clsx from "clsx";
import { shuffle } from "@annex";
import { useScreen } from "@hooks/useScreen";

import { GatsbyImage as Img } from "gatsby-plugin-image";
import Orbit from "@components/Orbit";

import "@sass/components/HomeQuotes.scss";

function QuoteCard({ quote, onDoneEqualizing = null }) {
	const { id, text, name, title, company, companyLogo, portrait } = quote;

	const quoteTextRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	const screen = useScreen();

	useEffect(() => {
		function equalize() {
			const quoteTextWidth = parseInt(quoteTextRef.current.style.width);
			const quoteTextHeight = parseInt(quoteTextRef.current.clientHeight);

			if (quoteTextHeight > 150 && quoteTextWidth < window.innerWidth - 110) {
				quoteTextRef.current.style.width = `${quoteTextWidth + 10}px`;
				equalize();
				/* } else {
				onDoneEqualizing(id); */
			}
		}

		if (screen === "xs") return;

		equalize();
	}, [screen]);

	return (
		<blockquote className={clsx("quote_card flex flex-column flex-nowrap justify-content-between", id)}>
			<div className="bubble flex flex-column justify-content-between bg-zircon rounded-xl p-4 mb-auto sm:px-8 sm:py-6">
				<img className="logo my-0" src={companyLogo} alt={company} />
				<hr />
				<p className="quote_text font-serif text-reflex text-16 line-height-180 my-auto" style={{ width: 100 }} ref={quoteTextRef}>
					{text}
				</p>
			</div>
			<cite className="flex flex-row flex-nowrap align-items-center mt-8">
				<div className="portrait_border">
					<Img image={portrait} className="portrait" alt="" />
				</div>
				<div className="pl-5">
					<p className="name text-reflex uppercase m-0 text-18 font-black">{name}</p>
					<p className="title text-reflex m-0 text-16 line-height-120">{title}</p>
					<p className="company text-reflex m-0 text-16 line-height-120">{company}</p>
				</div>
			</cite>
		</blockquote>
	);
}

export default function QuotesOrbit({ quotes }) {
	const [windowWidth, setWindowWidth] = useState(0);

	/* const  = quotes.map((q) => q.id);
	const [quoteCardsReady, setQuoteCardsReady] = useState([]);

	const checkIfReadyToCalculateHeight = useCallback(
		(quoteCardId) => {
			setQuoteCardsReady((prev) => [...new Set([...prev, quoteCardId])]);
		},
		[quoteCardsReady]
	); */

	//const shuffledQuotes = useMemo(() => shuffle(quotes), [quotes]);

	function hasWindowWidthChanged() {
		if (typeof window === "undefined") return false;

		if (windowWidth !== window.innerWidth) {
			setWindowWidth(window.innerWidth);
			return true;
		}

		return false;
	}

	useEffect(() => {
		const computeHeight = () => {
			if (!selfRef.current) return;
			if (!hasWindowWidthChanged()) return;

			const _h = selfRef.current.querySelector(".orbit_item_grid").clientHeight;
			if (_h === 0) return;

			const orbit = selfRef.current.querySelector(".Orbit");
			const ribbon = selfRef.current.querySelector(".orbit_ribbon");
			orbit.style.height = `${_h}px`;
			ribbon.style.height = `${_h}px`;
		};

		if (typeof window === "undefined") return;

		const orbit = selfRef.current?.querySelector(".Orbit");
		const ribbon = selfRef.current?.querySelector(".orbit_ribbon");

		if (orbit && ribbon) setTimeout(computeHeight, 1400);

		window.addEventListener("resize", computeHeight, { passive: true });

		return () => {
			window.removeEventListener("resize", computeHeight);
		};
	}, [quotes, windowWidth]);

	const selfRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	//if (shuffledQuotes.length === 0) return <div></div>;

	return (
		<div className="Home_Quotes" ref={selfRef}>
			<Orbit alignItemsOnInit={true}>
				{quotes.map((quote) => (
					<QuoteCard quote={quote} /* onDoneEqualizing={checkIfReadyToCalculateHeight} */ key={quote.id} />
				))}
			</Orbit>
		</div>
	);
}
