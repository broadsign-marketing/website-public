import React, { useEffect /* , useMemo, useRef, useState */ } from "react";
// import T from "i18n-react";
// import { useDico } from "@hooks/useDico";
import { navigate } from "gatsby";

// import Helmet from "@components/Helmet";
import Layout from "@components/LayoutMinimal";

import "@sass/components/Header.scss";

export default function RedirectPage({ pageContext: { redirect, lang }, path }) {
	// const [dots, setDots] = useState("...");

	// LET'S REVISE LATER WHETHER THE REDIRECT MESSAGE IS NECESSARY...

	/* const l = useMemo(() => { return redirect.Language || "en"; }, [redirect]);

	const redirecting = {
		en: "You are being redirected",
		fr: "En redirection",
		es: "You are being redirected",
		zh: "You are being redirected",
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (dots + "." === "....") {
				setDots(".");
			} else {
				setDots(dots+".");
			}
		}, 300);

		return () => clearInterval(interval);
	}, [dots]);
	*/

	useEffect(() => {
		if (redirect.toPath.match("http")) {
			if (typeof window !== "undefined") {
				window.location.replace(redirect.toPath);
			}
		} else {
			navigate(redirect.toPath);
		}
	}, []);

	return (
		<Layout path={path}>
			<div
				style={{
					display: "grid",
					placeItems: "center",
					position: "fixed",
					backgroundColor: "#FFF",
					height: "100vh",
					width: "100vw",
					left: "0",
					top: "0",
				}}>
				{/* <h1 style={{position:"relative", fontSize:"3rem", fontFamily:"Roboto"}}>
					<span>{redirecting[l]}</span>
					<span style={{position:"absolute", bottom:"0", left:"100%"}}>{dots}</span>
				</h1> */}
			</div>
		</Layout>
	);
}
