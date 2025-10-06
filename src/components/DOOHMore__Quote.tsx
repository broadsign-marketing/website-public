import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import T from "i18n-react";
import clsx from "clsx";
import { shuffle } from "@annex";

import { GatsbyImage as Img } from "gatsby-plugin-image";

const Quote = memo(({ id, companyLogo, company, quote, portrait, name, position }) => {
	return (
		<blockquote className={clsx("quote_card flex flex-column flex-nowrap justify-content-between", id)}>
			<div className="bubble flex flex-column justify-content-between bg-zircon rounded-xl p-4 mb-auto sm:px-8 sm:py-6">
				<img src={companyLogo} className="company_logo" alt={company} />
				<hr />
				<p className="quote_text font-serif text-reflex text-16 line-height-180 my-auto">{quote}</p>
			</div>
			<cite className="flex flex-row flex-nowrap align-items-center">
				<div className="portrait_border bg-gradient">
					<div className="portrait_border p-1">
						<Img image={portrait} className="portrait" alt="" />
					</div>
				</div>
				<div className="pl-5">
					<p className="name text-reflex uppercase m-0 text-18 font-black">{name}</p>
					<p className="title text-reflex m-0 text-16 line-height-120">{position}</p>
					<p className="company text-reflex m-0 text-16 line-height-120">{company}</p>
				</div>
			</cite>
		</blockquote>
	);
});

export default Quote;
