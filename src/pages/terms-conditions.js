import React, { Suspense, useEffect, useState } from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Collapse from "@components/Collapse";
import Container from "@components/Container";
import Layout from "@components/layout";

import EN from "@partials/terms-conditions__en";

import "@sass/pages/terms_conditions.scss";

export default function TermsConditions({ pageContext: { l, dicoPath }, location: { hash } }) {
	useDico(l, dicoPath);

	return (
		<Layout id="terms_conditions" className="pb-25">
			{l === "en" && <EN hash={hash} />}
		</Layout>
	);
}
