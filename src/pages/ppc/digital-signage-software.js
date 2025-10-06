import React, { useEffect, useMemo, useState } from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import { scrollTo } from "@hooks/useScreen";
import route, { routeWithUtmForm } from "@route";
import { graphql } from "gatsby";

import CTA from "@components/CTA";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/LayoutMinimal";
import Link from "@components/LocalizedLink";
import LogosList from "@components/LogosList";
import Logo from "@components/Logo";
import Tank from "@components/Tank";
import { Row, Column } from "@components/Grid";

import "@sass/pages/digital_signage_software.scss";

import broadsign_logo from "@img/broadsign/broadsign.svg";

export default function DigitalSignageSoftware({ pageContext: { l, dicoPath }, location: { pathname, search }, data }) {
	const [geo, setGeo] = useState(false);

	useDico(l, dicoPath);

	let request = "free-trial";
	let formId = "freeTrialPPC";
	let submitText = "Get Free Trial";
	let redirectUrl = routeWithUtmForm("thankYou", "ppc_free_trial");

	if (search && search.match(/request=demo/)) {
		request = "demo";
		formId = "demoPPC";
		submitText = "Request a Demo";
		redirectUrl = routeWithUtmForm("thankYou", "ppc_request_a_demo");
	}

	useEffect(() => {
		function coordsAreANZ(coords) {
			const minLatitude = -47;
			const maxLatitude = -12;
			const minLongitude = 115;
			const maxLongitude = 178;

			if (coords.latitude >= minLatitude && coords.latitude <= maxLatitude && coords.longitude >= minLongitude && coords.longitude <= maxLongitude) {
				return true;
			}

			return false;
		}

		function coordsAreAPAC(coords) {
			const minLatitude = -47;
			const maxLatitude = -12;
			const minLongitude = 115;
			const maxLongitude = 178;

			if (coords.latitude >= minLatitude && coords.latitude <= maxLatitude && coords.longitude >= minLongitude && coords.longitude <= maxLongitude) {
				return true;
			}

			return false;
		}

		let geoHasChanged = false;

		if (search && search.match(/utm_content=en-nz/)) {
			geoHasChanged = true;
			setGeo("nz");
		}

		if (l === "id" || (search && search.match(/utm_content=en-apac/))) {
			geoHasChanged = true;
			setGeo("apac");
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((res) => {
				if (coordsAreANZ(res.coords)) {
					geoHasChanged = true;
					setGeo("nz");
				}

				if (coordsAreAPAC(res.coords)) {
					geoHasChanged = true;
					setGeo("apac");
				}
			});
		}

		if (!geoHasChanged) {
			setGeo("en");
		}
	}, [l, search]);

	return (
		<Layout id="digital_signage_software">
			<Tank className="header">
				<Link to="index">
					<img className="branding" src={broadsign_logo} />
				</Link>
			</Tank>
			<Tank className="Hero">
				<Row>
					<Column className="align-items-center">
						<h1>{T.translate("Hero.title")}</h1>
						<p>{T.translate("Hero.par")}</p>
						<CTA onClick={() => scrollTo("shin")} className="bg-reflex text-white hover:bg-cerulean">
							{request === "demo" ? T.translate("Hero.ctaDemo") : T.translate("Hero.cta")}
						</CTA>
					</Column>
					<Column className="aside align-items-center">
						<Img alt="" className="screenshot" image={data.Hero.childImageSharp.gatsbyImageData} objectFit="contain" />
					</Column>
				</Row>
			</Tank>
			<Tank className="trusted_by flex justify-content-center wrap">
				<hr />
				<h3>{T.translate("trustedBy.title")}</h3>
				{["en", "id", "de"].includes(l) && (
					<LogosList variation="grey">
						{(["nz", "apac", "de"].includes(geo) || ["id"].includes(l)) && <Logo id="jcd" />}
						{["en", "de"].includes(geo) && <Logo id="stroer" />}
						{["en", "nz", "de"].includes(geo) && <Logo id="oohmedia" />}
						{(["en", "apac", "de"].includes(geo) || ["id"].includes(l)) && <Logo id="clearchannel" />}
						{["en"].includes(geo) && <Logo id="lamar" />}
						{["en", "de"].includes(geo) && <Logo id="outedge" />}
						{["de"].includes(geo) && <Logo id="jcd" />}
						{["nz"].includes(geo) && <Logo id="qms" />}
						{["nz"].includes(geo) && <Logo id="lumo" />}
						{["nz"].includes(geo) && <Logo id="vmo" />}
						{["nz"].includes(geo) && <Logo id="shopper" />}
						{(["apac"].includes(geo) || ["id"].includes(l)) && <Logo id="asiaray" />}
						{(["apac"].includes(geo) || ["id"].includes(l)) && <Logo id="infini" />}
						{(["apac"].includes(geo) || ["id"].includes(l)) && <Logo id="rajawali" />}
					</LogosList>
				)}
				{["es"].includes(l) && (
					<LogosList variation="grey">
						<Logo id="jcd" />
						<Logo id="clearchannel" />
						<Logo id="enmedio" />
						<Logo id="rzk_digital" />
						<Logo id="gpo_vallas" />
						<Logo id="massiva" />
					</LogosList>
				)}

				<hr />
			</Tank>
			<Tank className="why_broadsign">
				<h2>{T.translate("whyBroadsign.title")}</h2>
				<Row>
					<Img alt="" className="Column" image={data.why.childImageSharp.gatsbyImageData} objectFit="contain" />
					<Column className="features">
						<div className="feature">
							<h4>{T.translate("whyBroadsign.feature1.title")}</h4>
							<p>{T.translate("whyBroadsign.feature1.par")}</p>
						</div>
						<div className="feature">
							<h4>{T.translate("whyBroadsign.feature2.title")}</h4>
							<p>{T.translate("whyBroadsign.feature2.par")}</p>
						</div>
						<div className="feature">
							<h4>{T.translate("whyBroadsign.feature3.title")}</h4>
							<p>{T.translate("whyBroadsign.feature3.par")}</p>
						</div>
					</Column>
				</Row>
			</Tank>
			<section className="do_better">
				<Tank>
					<h2>{T.translate("doBetter.title")}</h2>
					<div className="grid features">
						<div className="feature">
							<Img alt="" className="icon" image={data.iconAutomatedYield.childImageSharp.gatsbyImageData} objectFit="contain" />
							<div className="description">
								<h4>{T.translate("doBetter.automatedYield.title")}</h4>
								<p>{T.translate("doBetter.automatedYield.par")}</p>
							</div>
						</div>
						<div className="feature">
							<Img alt="" className="icon" image={data.iconContentManagement.childImageSharp.gatsbyImageData} objectFit="contain" />
							<div className="description">
								<h4>{T.translate("doBetter.contentManagement.title")}</h4>
								<p>{T.translate("doBetter.contentManagement.par")}</p>
							</div>
						</div>
						<div className="feature">
							<Img alt="" className="icon" image={data.iconOOHSales.childImageSharp.gatsbyImageData} objectFit="contain" />
							<div className="description">
								<h4>{T.translate("doBetter.oOHSales.title")}</h4>
								<p>{T.translate("doBetter.oOHSales.par")}</p>
							</div>
						</div>
						<div className="feature">
							<Img alt="" className="icon" image={data.iconOpenAPI.childImageSharp.gatsbyImageData} objectFit="contain" />
							<div className="description">
								<h4>{T.translate("doBetter.openAPI.title")}</h4>
								<p>{T.translate("doBetter.openAPI.par")}</p>
							</div>
						</div>
						<div className="feature">
							<Img alt="" className="icon" image={data.iconProgrammaticSales.childImageSharp.gatsbyImageData} objectFit="contain" />
							<div className="description">
								<h4>{T.translate("doBetter.programmaticSales.title")}</h4>
								<p>{T.translate("doBetter.programmaticSales.par")}</p>
							</div>
						</div>
						<div className="feature">
							<Img alt="" className="icon" image={data.iconSecurity.childImageSharp.gatsbyImageData} objectFit="contain" />
							<div className="description">
								<h4>{T.translate("doBetter.security.title")}</h4>
								<p>{T.translate("doBetter.security.par")}</p>
							</div>
						</div>
					</div>
					<div className="ctas flex justify-content-center">
						<CTA onClick={() => scrollTo("shin")} className="bg-transparent border-1 border-white text-white hover:bg-white hover:text-cerulean">
							{request === "demo" ? T.translate("flexible.ctaDemo") : T.translate("flexible.cta")}
						</CTA>
					</div>
				</Tank>
			</section>
			<Tank className="quotes">
				<h2>{T.translate("quotes.title")}</h2>
				{["en"].includes(geo) && (
					<Row>
						<Column>
							<blockquote>
								<p className="quote">{T.translate("quotes.q1.quote")}</p>
								<p className="sign">{T.translate("quotes.q1.cite")}</p>
							</blockquote>
						</Column>
						<Column>
							<blockquote>
								<p className="quote">{T.translate("quotes.q2.quote")}</p>
								<p className="sign">{T.translate("quotes.q2.cite")}</p>
							</blockquote>
						</Column>
					</Row>
				)}
				{["nz"].includes(geo) && (
					<Row>
						<Column>
							<blockquote>
								<p className="quote">{T.translate("quotes.q3.quote")}</p>
								<p className="sign">{T.translate("quotes.q3.cite")}</p>
							</blockquote>
						</Column>
						<Column>
							<blockquote>
								<p className="quote">{T.translate("quotes.q4.quote")}</p>
								<p className="sign">{T.translate("quotes.q4.cite")}</p>
							</blockquote>
						</Column>
					</Row>
				)}
				{["apac"].includes(geo) && (
					<Row>
						<Column>
							<blockquote>
								<p className="quote">{T.translate("quotes.q5.quote")}</p>
								<p className="sign">{T.translate("quotes.q5.cite")}</p>
							</blockquote>
						</Column>
						<Column>
							<blockquote>
								<p className="quote">{T.translate("quotes.q6.quote")}</p>
								<p className="sign">{T.translate("quotes.q6.cite")}</p>
							</blockquote>
						</Column>
					</Row>
				)}
			</Tank>
			<section className="flexible">
				<Img alt="" className="bg" image={data.flexibleBg.childImageSharp.gatsbyImageData} objectFit="contain" objectPosition="right bottom" />
				<Tank>
					<Row>
						<Column>
							<h2>{T.translate("flexible.title")}</h2>
							<p>{T.translate("flexible.par")}</p>
							<CTA onClick={() => scrollTo("shin")} className="bg-reflex text-white hover:bg-cerulean">
								{request === "demo" ? T.translate("flexible.ctaDemo") : T.translate("flexible.cta")}
							</CTA>
						</Column>
						<Column></Column>
					</Row>
				</Tank>
			</section>
			<div className="shin flex justify-content-center" id="shin">
				<Img alt="" className="bg" image={data.shinBg.childImageSharp.gatsbyImageData} />
				<div className="card bg-zircon rounded-xl p-4 sm:p-10">
					<h2 className="text-30 text-left">{T.translate("formTitle")}</h2>
					<Form form={formId} submitText={submitText} redirectUrl={redirectUrl} />
				</div>
			</div>
		</Layout>
	);
}

export const DigitalSignageSoftwarePage = graphql`
	query DigitalSignageSoftwareImages {
		Hero: file(relativePath: { eq: "heroes/digital_signage_software.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		why: file(relativePath: { eq: "ui/digital_signage_software_why_broadsign.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		iconAutomatedYield: file(relativePath: { eq: "icons/digital_signage_software_automated_yield.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconContentManagement: file(relativePath: { eq: "icons/digital_signage_software_content_management.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconOOHSales: file(relativePath: { eq: "icons/digital_signage_software_ooh_sales.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconOpenAPI: file(relativePath: { eq: "icons/digital_signage_software_open_api.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconProgrammaticSales: file(relativePath: { eq: "icons/digital_signage_software_programmatic_sales.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		iconSecurity: file(relativePath: { eq: "icons/digital_signage_software_security.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}

		flexibleBg: file(relativePath: { eq: "heroes/broadsign_platform.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		shinBg: file(relativePath: { eq: "bg/digital_signage_software_shin.webp" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
