import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import Container from "@components/Container";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";

import "@sass/pages/privacy.scss";
import "@sass/pages/privacy_vendors.scss";

import serviceProviders from "@assets/privacy_service_providers.json";

export default function PrivacyPolicy({ pageContext: { l, dicoPath }, location: { hash } }) {
	useDico(l, dicoPath);

	const showCookies = true;

	const [cookieVendorsData, setCookieVendorsData] = useState([]);
	const [filteredCookieVendorsData, setFilteredCookieVendorsData] = useState([]);

	const searchTermRef = useRef(null);

	useEffect(() => {
		if (!showCookies) return;

		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				location: "cdn.cookielaw.org",
				domain: "204ab5d6-0e3c-459e-ac85-f4dffe9bd7e8",
				lang: "en",
				authorization: `Bearer ${process.env.ONETRUST_API_KEY}`,
			},
		};

		fetch("https://cookies-data.onetrust.io/bannersdk/domaindata", options)
			.then((res) => res.json())
			.then((res) => {
				let out = {};
				let sortedOut = {};

				const cookieGroups = res.culture.DomainData.Groups;

				// setCookieGroups(cookieGroups);

				for (let group of cookieGroups) {
					for (let host of group.Hosts) {
						const groupHostName = host.HostName.replace(/^\./g, "");
						if (out[groupHostName]) {
							out[groupHostName].Cookies.push(...host.Cookies);
						} else {
							out[groupHostName] = host;
						}
					}
				}

				const sortedKeys = Object.keys(out).sort();
				for (const key of sortedKeys) {
					sortedOut[key] = out[key];
				}

				setCookieVendorsData(Object.values(sortedOut));
				setFilteredCookieVendorsData(Object.values(sortedOut));
			})
			.catch((err) => console.error(err));

		//https://vendor-list.consensu.org/v3/vendor-list.json
	}, []);

	const handleSearch = useCallback(() => {
		if (!cookieVendorsData) return;

		if (searchTermRef.current.value !== "") {
			setFilteredCookieVendorsData(
				cookieVendorsData.filter((domain) => {
					if (domain.HostName.toLowerCase().includes(searchTermRef.current.value.toLowerCase())) return true;
					//domain.HostName.toLowerCase().includes(searchTermRef.current.value.toLowerCase())
				})
			);
		} else {
			setFilteredCookieVendorsData(cookieVendorsData);
		}
	}, [cookieVendorsData]);

	console.log(cookieVendorsData);

	return (
		<Layout id="privacy_vendors" className="privacy_policy">
			<Container className="service_providers">
				<h2 className="text-24 text-transform-none sm:text-34">Service Providers</h2>
				{T.texts.intro.map((text, i) => (
					<p className="text-16" key={i}>
						{text}
					</p>
				))}
				<div className="grid">
					<div className="col-12 sm:col-3">
						<h3 className="text-transform-none">Name of the Provider</h3>
					</div>
					<div className="col-12 sm:col-4">
						<p className="text-16"></p> <h3 className="text-transform-none">Type</h3>
					</div>
					<div className="col-12 sm:col-5">
						<h3 className="text-transform-none">Link to Provider's Privacy Policy</h3>
					</div>
				</div>
				{serviceProviders.map((vendor) => (
					<div className="grid" key={vendor.name}>
						<div className="col-12 sm:col-3">
							<p className="text-16">
								<b>{vendor.name}</b>
							</p>
						</div>
						<div className="col-12 sm:col-4">
							<p className="text-16">{T.translate(vendor.type)}</p>
						</div>
						<div className="col-12 sm:col-5">
							<p className="text-16">
								<Link to={vendor.privacyLink}>{vendor.privacyLink}</Link>
							</p>
						</div>
					</div>
				))}
			</Container>
			{showCookies && (
				<Container className="cookie_vendors">
					<h2 className="text-24 text-transform-none sm:text-34">Cookies</h2>
					<div className="grid">
						<div className="col-12 sm:col-2">
							<h3 className="text-transform-none">Domain</h3>
						</div>
						<div className="col-12 sm:col-10">
							<h3 className="text-transform-none">Cookies</h3>
						</div>
					</div>
					<div className="grid mb-10">
						<div className="col-12">
							<input
								type="text"
								placeholder="Search cookies, domains..."
								className="search_box w-full"
								ref={searchTermRef}
								onKeyUp={handleSearch}
							/>
						</div>
					</div>
					<div className="grid cookie_vendors_list">
						<div className="col-12 sm:col-2">
							<p className="domain_name">
								<b>Domain Name</b>
							</p>
						</div>
						<div className="col-12 sm:col-10">
							<div className="grid">
								<div className="col-12 sm:col-3">
									<p className="font-bold">Cookie Name</p>
								</div>
								<div className="col-12 sm:col-5">
									<p className="font-bold">Description</p>
								</div>
								<div className="col-12 sm:col-2">
									<p className="font-bold">Type</p>
								</div>
								<div className="col-12 sm:col-2">
									<p className="font-bold">Duration</p>
								</div>
							</div>
						</div>
					</div>
					{filteredCookieVendorsData.map((domain) => (
						<div className="grid" key={domain.HostId}>
							<div className="col-12 sm:col-2">
								<p className="domain_name">{domain.HostName}</p>
							</div>
							<div className="col-12 sm:col-10">
								{domain.Cookies.map((cookie) => (
									<div className="grid hover:bg-zircon" key={cookie.id}>
										<div className="col-12 sm:col-3">
											<p className="cookie_name">
												<b>{cookie.Name}</b>
											</p>
										</div>
										<div className="col-12 sm:col-5">
											<p className="cookie_description pr-2">{cookie.description}</p>
										</div>
										<div className="col-12 sm:col-2">
											<p className="cookie_thirdparty">{cookie.isThirdParty ? "Third-Party" : "First-Party"}</p>
										</div>
										<div className="col-12 sm:col-2">
											<p className="cookie_thirdparty">{cookie.IsSession ? "Session" : "Persistent"}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</Container>
			)}
		</Layout>
	);
}
