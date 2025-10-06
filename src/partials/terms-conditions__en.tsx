import React, { Suspense, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { scrollTo } from "@hooks/useScreen";

import Container from "@components/Container";
import Link from "@components/LocalizedLink";

export default function TermsConditions_EN({ hash }) {
	const [currentTab, setCurrentTab] = useState<"selfService" | "managedServices">("selfService");

	const toggleCurrentTab = useCallback((newVal) => {
		setCurrentTab(newVal);

		// Reset the hash from the URL, if present
		if (window.location.hash) {
			history.replaceState(null, "", window.location.pathname + window.location.search);
		}
	}, []);

	const preventContextMenu = (event) => {
		event.preventDefault();
	};

	useEffect(() => {
		if (!hash) return;

		if (["#selfService", "#self-service", "#selfServe", "#self-serve", "#ss"].includes(hash)) {
			setCurrentTab("selfService");
		}

		if (["#managedServices", "#managed-services", "#managedService", "#managed-service", "#managed", "#ms"].includes(hash)) {
			setCurrentTab("managedServices");
		}

		const treatedHash = location.hash.replace(/\./g, "_").replace(/#/, "");
		if (treatedHash.startsWith("ss")) setCurrentTab("selfService");
		if (treatedHash.startsWith("ms")) setCurrentTab("managedServices");

		setTimeout(() => {
			scrollTo(treatedHash);
		}, 300);
	}, [hash]);

	return (
		<>
			<Container tag="section" className="hero mt-10 text-center z-1 sm:mb-12">
				<h1 className="font-superbold line-height-100 mb-10 sm:mb-0">Terms and Conditions</h1>
			</Container>
			<div className="tabs bg-white w-full z-2">
				<Container className="z-2">
					<button
						onClick={() => toggleCurrentTab("selfService")}
						className={clsx("tab div relative text-16 font-bold w-6 sm:text-20", { active: currentTab === "selfService" })}>
						<span className="label text-reflex inline-block relative">Self Service</span>
					</button>
					<button
						onClick={() => toggleCurrentTab("managedServices")}
						className={clsx("tab div relative text-16 font-bold w-6 sm:text-20", { active: currentTab === "managedServices" })}>
						<span className="label text-reflex inline-block relative">Managed Services</span>
					</button>
				</Container>
			</div>
			<div className="buffer z-3"></div>
			<div className="tab_content_wrapper bg-white z-3">
				<section className={clsx("tab_content tab_self_service", { active: currentTab === "selfService" })} onContextMenu={preventContextMenu}>
					<Container>
						<h2>Self Service</h2>
						<p>
							These terms and conditions (“Terms and Conditions”) govern the provision of access to the Platform by Broadsign Advertising, Inc.
							(“Broadsign Advertising”) to the Client, as specified in the applicable Commercial Agreement. By executing the Commercial Agreement,
							the Client agrees to these Terms and Conditions, which together with the Commercial Agreement, and any schedules, exhibits, or other
							documents expressly incorporated by reference, collectively form the entire binding Master Services Agreement between the Parties.
						</p>
						<h3 id="ss1">1. Definitions</h3>
						<p>
							In these Terms and Conditions, in addition to the capitalized terms defined elsewhere herein or in the applicable Commercial
							Agreement, the following terms will have the meanings ascribed to them in this Section.
						</p>
						<p>
							<b>“Ad”</b> or <b>“Advertising Material(s)”</b> means any creative materials provided by Client as part of a Transaction for posting
							on Media;
						</p>
						<p>
							<b>“Ad Specification”</b> means the features of an Ad that determine such Ad's compatibility with the criteria set by an Exchange or
							Direct Publisher with respect to particular Media.
						</p>
						<p>
							<b>“Affiliate”</b> means, with respect to any Party, any corporation or other legal entity that such Party directly or indirectly
							controls, is controlled by, or is under common control with. In this context, a Party “controls” a corporation or other entity if it
							or any combination of it and/or its Affiliates owns more than fifty percent (50%) of the voting rights for the board of directors or
							other mechanism of control for such corporation or other entity.
						</p>
						<p>
							<b>"Aggregate Cost of Media"</b> means the total number of impressions delivered, divided by 1000, and multiplied by the applicable
							cost per 1000 impressions (CPM).
						</p>
						<p>
							<b>“Authorized User”</b> means any person or legal entity that has been provided with a Login to the Client Account.
						</p>
						<p>
							<b>“Advertiser”</b> means an advertiser, media agency or other third party, if any, on whose behalf Client's Authorized Users
							utilize the Platform.
						</p>
						<p>
							<b>“Bid”</b> means an offer by Client on behalf of Advertiser, entered into the Platform, to buy specific Media or data excluding
							applicable taxes and similar charges (including but not limited to sales, usage, excise and value added taxes).
						</p>
						<p>
							<b>“Campaign Reporting”</b> means any of the following (i) campaign reports, detailing campaign related spend data, such as timing,
							price, location of purchased Media pursuant to this MSA; (ii) Broadsign Advertising data and/or (iii) Client Data.
						</p>
						<p>
							<b>“Client”</b> means the entity that has signed the applicable Commercial Agreement and agreed to these Terms and Conditions.
						</p>
						<p>
							<b>“Client Account”</b> (or <b>“Seat”</b>) means Client's account that provides access to the Platform.
						</p>
						<p>
							<b>“Client Data”</b> means any data that is not Broadsign Advertising data and is used by Client or its Authorized Users in
							connection to the Platform, including but not limited to Ads, data created or provided by Client about locations, audiences or
							screens or data created or provided by Advertiser about audiences, sales, inventory levels, store data etc.
						</p>
						<p>
							<b>“Commercial Agreement”</b> means the document executed by the Parties that specifies the commercial terms of the MSA, including
							but not limited to the description of Services, pricing, payment terms, and any other agreed-upon provisions, and incorporates by
							reference the Terms and Conditions.
						</p>
						<p>
							<b>“Confidential Information”</b> means any information disclosed by one Party to the other Party under and/or in connection to this
							MSA that is marked as confidential or would normally be considered confidential including, but not limited to product or business
							plans. Confidential Information does not include information the recipient can demonstrate (i) was already known to the recipient at
							the time of disclosure from an external source not under a confidentiality obligation; (ii) became public through no fault, act, or
							omission of the recipient; or (iii) was independently developed by the recipient without reference to the discloser's Confidential
							Information. The terms of this MSA are also deemed Confidential Information.
						</p>
						<p>
							<b>“Cost Per Thousand Impressions”</b> or <b>“CPM”</b> means the cost per thousand impressions delivered, which is used to calculate
							the cost of media based on the number of impressions delivered to the Client through the Platform.
						</p>
						<p>
							<b>“Cost of Data”</b> means the amount the Client pays for data purchased or utilized through the Platform, including any data
							provided directly by Broadsign Advertising or other Data Providers associated with the Platform.
						</p>
						<p>
							<b>“Data Provider”</b> means a third party (not Client or Broadsign Advertising) that provides data.
						</p>
						<p>
							<b>“Direct Publisher”</b> means a third party (e.g., a media owner, media vendor, publisher, or network) that directly offers Media
							for purchase on the Platform and is not an Exchange.
						</p>
						<p>
							<b>“Exchange”</b> means an advertising exchange or other biddable source of Media.
						</p>
						<p>
							<b>“Login”</b> means user credentials to access the Client Account.
						</p>
						<p>
							<b>“Master Services Agreement”</b> or <b>“MSA”</b> means any applicable Commercial Agreement together with these Terms and
							Conditions, including any terms set forth in any schedule, exhibit, insertion order or addendum incorporated by reference.
						</p>
						<p>
							<b>“Media”</b> means all ad units or advertising inventory, where Ads can be displayed, including, without limitation, out of home
							or digital out of home advertising units, video streams, sponsorship opportunities, custom content and other forms of advertisements
							and creative units, which are made available through the Platform.
						</p>
						<p>
							<b>“Platform”</b> means Broadsign Advertising's demand-side platform, comprising proprietary technology services, platform features,
							and human support services, including tools and functionalities for the planning, purchase, management, optimization, and reporting
							of Media and data, as well as any associated reference materials provided in connection with such services.
						</p>
						<p>
							<b>“Platform Account”</b> means a unique account assigned by Broadsign Advertising to Client on the Platform, providing access to
							Platform features such as campaign management, media purchasing, data utilization, and reporting, subject to these Terms and
							Conditions.
						</p>
						<p>
							<b>“Platform User Interface”</b> or <b>“Platform UI”</b> means the web-based user interface provided by Broadsign Advertising,
							enabling the Client to access and utilize the features, functions, and services of the Platform.
						</p>
						<p>
							<b>“PII”</b> means personally identifiable information that, when used alone or with other relevant data, can identify an
							individual.
						</p>
						<p>
							<b>“Spend”</b> means, for a particular month, the sum of (i) the Aggregate Cost of Media purchased by the Client via the Client
							Account in that month, as reported by the Platform, including the cost of Media purchased by the Client from Exchanges and Direct
							Publishers; and (ii) the Cost of Data (including any data offered directly by Broadsign Advertising) purchased by the Client through
							the Platform Account in that month.
						</p>
						<p>
							<b>“Subcontractor”</b> means a subcontractor, consultant, third-party service provider or agent engaged by a Party (or a client of
							such Party) in connection with its use or provision of the Platform; provided, however, that Client's right to use Subcontractors
							will be subject to the requirements in this MSA with respect to Authorized Users (including, without limitation, the provision in{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss2")}>
								Section 2
							</button>{" "}
							hereof).
						</p>
						<p>
							<b>“Targeting Data”</b> means data that is intended to enable Client to target its purchases of Media through the Platform.
						</p>
						<p>
							<b>“Transaction(s)”</b> means a purchase or purchases of Media, data, and/or Targeting Data through the Platform by Client, via a
							Bid placed on the Platform, followed by a Bid win signal and proof of play (<b>“POP”</b>) signal from the Exchange within the
							Exchange timeout thresholds.
						</p>
						<h3 id="ss2">2. Provision of Platform</h3>
						<p>
							<b className="subpoint" id="ss2_1">
								2.1
							</b>{" "}
							Access to Platform. Subject to the terms and conditions of this MSA, Broadsign Advertising hereby provides the Client with access to
							its Platform and associated services (the "Services") solely for the purpose of planning, managing, optimizing and buying
							programmatic campaigns. This includes the submission of Bids, serving Ads onto Media via the Platform and receiving reports related
							thereto, provided, however, that only Authorized Users may exercise such right. Other than as permitted under the terms of this MSA,
							Client will not resell or distribute the Platform, nor any parts or copies thereof. No other rights or interest whatsoever in the
							Platform are granted to Client. Broadsign Advertising may suspend or revoke access to the Platform if there is a breach of
							intellectual property, unauthorized use, or if Client misuses any third-party content.
						</p>
						<p>
							<b className="subpoint" id="ss2_2">
								2.2
							</b>{" "}
							Restrictions. Broadsign Advertising will provide, and Client will use, the Platform under this MSA in compliance with all applicable
							laws and regulations, including any privacy and export laws, rules, regulations and sanctions programs. Client will not, and will
							not assist or knowingly permit any third party to: (i) pass information to Broadsign Advertising that applicable law recognizes as
							PII; (ii) misappropriate any part of the Platform or modify, disassemble, decompile, reverse engineer, copy, reproduce or create
							derivative works from or in respect of the Platform; (iii) revise, damage or tamper with any part of the Platform; (iv) breach any
							Broadsign Advertising security measure or introduce viruses or other malware to the Platform; (v) provide Broadsign Advertising any
							Ad that contains content or materials that are misleading, libelous, obscene, invasive of others' privacy, or hateful (racially or
							otherwise), or otherwise illegal; (vi) analyze, decompile, track or otherwise determine the source or location of any data (not
							including Client Data); (vii) use data (a) to determine employment, credit, health care, or insurance eligibility, (b) de-anonymized
							or disaggregated to re-identify or derive PII about someone, (c) combined with any PII information in violation of applicable laws,
							rules, and regulations, (d) for any unlawful or illegal purposes, or (e) associated with individuals under the age of 13; (viii) use
							the Platform for competitive analysis, or for the development, provision, or use of any competing service or product that is to
							Broadsign Advertising's detriment or commercial disadvantage; (ix) transfer the right to use the Platform or any part thereof to any
							third party without Broadsign Advertising's prior written consent.
						</p>
						<h3 id="ss3">3. Proprietary Rights</h3>
						<p>
							<b className="subpoint" id="ss3_1">
								3.1
							</b>{" "}
							Ownership of the Platform and Data. As between Broadsign Advertising and Client, Broadsign Advertising retains all right, title, and
							interest in and to the Broadsign Advertising data and the Platform, and Client acknowledges that it neither owns nor acquires any
							rights in and to the Broadsign Advertising data, the Platform or any related content, except for the limited Platform usage rights
							granted under this MSA. All changes, including but not limited to modifications, enhancements, extensions, and additions to the
							Platform and the Broadsign Advertising data, shall become the sole property of Broadsign Advertising, regardless of whether such
							changes are implemented by Broadsign Advertising or by Client. This includes any feedback, improvements, or developments made to the
							Platform during the Term of the MSA.
						</p>
						<p>
							<b className="subpoint" id="ss3_2">
								3.2
							</b>{" "}
							Client Data and Ownership. As between Client and Broadsign Advertising, Client will own all Spend reports, derived from its use of
							the Platform. Broadsign Advertising may use and disclose such data (i) to operate, manage, maintain and enhance the Platform
							(including, without limitation, to share Spend data for reporting and billing purposes) and (ii) if and as required by court order,
							law or governmental or regulatory agency (after, if permitted, giving reasonable notice to Client and using commercially reasonable
							efforts to provide Client with the opportunity to seek a protective order or the equivalent (at Client's expense)).
						</p>
						<p>
							<b className="subpoint" id="ss3_3">
								3.3
							</b>{" "}
							Client expressly acknowledges that it does not acquire any ownership rights by downloading any copyrighted material or Broadsign
							Advertising data from or through the Platform. Client shall not copy, distribute or publish any Broadsign Advertising data or any
							information obtained or derived therefrom except as permitted in this MSA, on or through the Platform or as otherwise permitted by
							applicable law.
						</p>
						<p>
							<b className="subpoint" id="ss3_4">
								3.4
							</b>{" "}
							Broadsign Advertising expressly acknowledges that it does not acquire any ownership rights by downloading any Client Data from or
							through the Platform. Broadsign Advertising shall not copy, distribute or publish any Client Data or any information obtained or
							derived therefrom except as permitted in this MSA or as otherwise permitted by applicable law.
						</p>
						<p>
							<b className="subpoint" id="ss3_5">
								3.5
							</b>{" "}
							Broadsign Advertising may use Client Data to provide the services requested by Client under this MSA. Client grants Broadsign
							Advertising the right to use and analyze aggregate system activity data associated with the use of the Platform by Client and its
							Users for the purposes of optimizing, improving or enhancing the way the Platform operates, and to create new features and
							functionality in connection with the Platform in the sole discretion of Broadsign Advertising.
						</p>
						<p>
							<b className="subpoint" id="ss3_6">
								3.6
							</b>{" "}
							Client is solely responsible for its own Client Data and the consequences of posting or publishing them on or through the Broadsign
							Advertising Platform. In connection with Client Data, Client affirms, represents, and warrants that: (i) Client either owns the
							Client Data or has the necessary licenses, rights, consents, and permissions to use and authorize Broadsign Advertising to display
							or otherwise use the Client Data under all patent, trademark, copyright, trade secrets, or other proprietary rights in and to your
							Client Data in a manner consistent with the intended features of the Platform and these Terms, and to grant the rights set forth in{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss3_5")}>
								Section 3.5
							</button>
							, and (ii) Broadsign Advertising's or any Broadsign Advertising licensees' use of such Client Data pursuant to these Terms, and
							Broadsign Advertising's or any Broadsign Advertising licensees' exercise of the license rights set forth in{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss3_5")}>
								Section 3.5
							</button>
							, do not and will not: (a) infringe, violate, or misappropriate any third-party right, including any copyright, trademark, patent,
							trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right; (b) violate
							any applicable law or regulation; or (c) require obtaining a license from or paying any fees and/or royalties by Broadsign
							Advertising to any third party for the performance of any platform Client has chosen to be performed by Broadsign Advertising or for
							the exercise of any rights granted in these Terms, unless Client and Broadsign Advertising otherwise agree.
						</p>
						<p>
							<b className="subpoint" id="ss3_7">
								3.7
							</b>{" "}
							Feedback. If Client or a User provides Broadsign Advertising with any comments, bug reports, feedback, or modifications for the
							Platform (“Feedback”), Broadsign Advertising shall have the right to use such Feedback at its discretion, including, but not limited
							to the incorporation of such suggested changes into the Platform. Client or User (as applicable) hereby grants Broadsign Advertising
							a perpetual, irrevocable, nonexclusive, royalty free license under all rights necessary to incorporate, publish, reproduce,
							distribute, modify, adapt, prepare derivative works of, publicly display, publicly perform, exploit and use your Feedback for any
							purpose.
						</p>
						<h3 id="ss4">4. Deployment</h3>
						<p>
							<b className="subpoint" id="ss4_1">
								4.1
							</b>{" "}
							Broadsign Advertising will provide the access to the Platform and will obtain all rights necessary to provide the Platform and
							hereunder. Broadsign Advertising does not guarantee the fulfilment of any of Client's Bids through the Platform and may in its sole
							discretion refuse any Client Bid. Transactions are non-refundable and Client must pay for the Media and data in accordance with the
							Transaction details and this MSA.
						</p>
						<p>
							<b className="subpoint" id="ss4_2">
								4.2
							</b>{" "}
							Broadsign Advertising will provide access to the Platform in accordance with its applicable policies that can be found at:
							<Link to="https://broadsign.com/programmatic-platform-policies/">
								https://broadsign.com/programmatic-platform-policies/
							</Link> and <Link to="https://broadsign.com/privacy-policy/">https://broadsign.com/privacy-policy/</Link>.
						</p>
						<p>
							<b className="subpoint" id="ss4_3">
								4.3
							</b>{" "}
							Broadsign Advertising will: (i) subject to the provisions of{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss8")}>
								Section 8
							</button>
							, provide the Platform to Client in good working order, (ii) upon Client's request offer technical support and training as requested
							by Client, (iii) obtain and maintain all rights necessary to provide Client with the ability to use the Platform in accordance with
							the terms of this MSA hereunder.
						</p>
						<p>
							<b className="subpoint" id="ss4_4">
								4.4
							</b>{" "}
							Client will: (i) be solely responsible for all use of the Platform hereunder and all inquiries relating to Ads, and the content of
							all Ads; (ii) use the Platform in compliance with Client's other agreements (including, without limitation, with Advertisers), as
							applicable; and (iii) be responsible that each of its Ad Specifications activated via the Platform is true and correct in all
							material respects.
						</p>
						<p>
							<b className="subpoint" id="ss4_5">
								4.5
							</b>{" "}
							Broadsign Advertising is entitled to act on instructions received from Client, however Client is solely responsible for ensuring the
							accuracy of all information provided in connection with the Platform (including the entering of budgets, bidding amounts, pacing and
							targeting criteria).
						</p>
						<p>
							<b className="subpoint" id="ss4_6">
								4.6
							</b>{" "}
							Client must diligently protect any account access and/or passwords and take all measures to prevent unauthorized access. Authorized
							Users will use Login credentials to access the Client Account. Client acknowledges and agrees that a Login can have unrestricted
							access or be limited by specific authorization levels as determined by Client. Logins are created and provided by Client's
							Authorized Users, provided they have owner rights, or by Broadsign Advertising at the written request of Client. Client will be
							solely responsible for any unauthorized usage. In the event that the Client Account is compromised or is being used in an
							unauthorized manner, Client must immediately notify Broadsign Advertising. Client should regularly log into the Client Account and
							review the details of its spending to ensure that there has not been an unauthorized transaction or other error.
						</p>
						<p>
							<b className="subpoint" id="ss4_7">
								4.7
							</b>{" "}
							Client hereby represents, warrants and covenants that: (i) it has all necessary rights and authority to enter into this MSA and to
							perform its obligations hereunder and that it is authorized to act on behalf of each of its Advertisers and Subcontractors, and
							Client will be liable for their Transactions, acts and omissions in connection with the Platform provided under this MSA.
						</p>
						<p>
							<b className="subpoint" id="ss4_8">
								4.8
							</b>{" "}
							Client further represents and warrants that (i) Advertising Materials comply with all applicable laws, and that Client has the full
							right and power to offer the Advertising Materials for posting by the applicable media owners pursuant to an approved Transaction;
							(ii) to the best of Client's knowledge, the Client Data does not violate any laws or regulations or infringe upon the rights of any
							third party or otherwise give rise to any third party claims; (iii) Advertising Materials do not contain any defamatory, libelous or
							slanderous material and will not violate any individual rights, including rights of privacy, publicity or personality of any person;
							(iv) it has obtained all consents, releases, waivers and rights (including intellectual property rights) necessary for posting such
							unaltered Advertising Materials on inventory purchased through the Platform as expressly authorized hereunder.
						</p>
						<p>
							<b className="subpoint" id="ss4_9">
								4.9
							</b>{" "}
							Client may use Targeting Data provided by Broadsign Advertising, Client, Advertiser, or a third party, such as a Data Provider,
							solely for the purpose of targeting its purchases of Media during campaigns. Targeting Data may only be used for the underlying
							campaign, and proprietary rights to Targeting Data shall not be transferred to Client.
						</p>
						<p>
							<b className="subpoint" id="ss4_10">
								4.10
							</b>{" "}
							Managed Services. At Client's request, Broadsign Advertising may provide managed services on Client's behalf, operating within
							Client's Account, to set up and manage campaigns in accordance with Client's budget and specified criteria. If Client wishes to use
							Broadsign Advertising's managed services, the Parties shall first discuss and agree upon the applicable fees, budget, and campaign
							objectives. These terms will be formalized in a separate insertion order, governed by distinct Terms and Conditions specific to
							managed services, which must be executed by the Parties.
						</p>
						<h3 id="ss5">5. Fees and Payment Terms</h3>
						<p>
							<b className="subpoint" id="ss5_1">
								5.1
							</b>{" "}
							Fees. In consideration of the access to Platform provided by Broadsign Advertising under this MSA, Client shall pay the fees
							specified in the Commercial Agreement (the “Broadsign Advertising Fees”) in accordance with the terms set forth in this section and
							the Commercial Agreement.
						</p>
						<p>
							<b className="subpoint" id="ss5_2">
								5.2
							</b>{" "}
							Transactions. Client acknowledges that any Transaction executed in accordance with the specifications of the Client's Bids through
							the Platform constitutes a valid order. No additional confirmation or order from the Client is required to finalize such a
							Transaction or to obligate the Client to pay the corresponding Broadsign Advertising Fees.
						</p>
						<p>
							<b className="subpoint" id="ss5_3">
								5.3
							</b>{" "}
							Payment for Media and Data. If the Client uses the Platform to purchase Media or utilize Data through a Client Account, the Client
							shall pay the Broadsign Advertising Fees to Broadsign Advertising, and Broadsign Advertising shall remit the Spend to the applicable
							Exchange, Direct Publisher, or Data Provider. The Client will remain solely and ultimately responsible for payment obligations to
							the applicable Exchange, Direct Publisher, or Data Provider in connection with the purchased Media or utilized data until such time
							as the Client has paid the Broadsign Advertising Fee to Broadsign Advertising, at which point Broadsign Advertising shall assume
							responsibility for the payment. For the avoidance of doubt, Broadsign Advertising shall have no responsibility for such payment
							obligations except as expressly set forth herein.
						</p>
						<p>
							<b className="subpoint" id="ss5_4">
								5.4
							</b>{" "}
							Indemnification. Client will defend, indemnify and hold harmless Broadsign Advertising's Indemnified Parties (as defined herein),
							from all third-party claims or liabilities, including, without limitation, reimbursement for reasonable outside attorneys' fees and
							disbursements, arising out of or related to Client's payment obligations for Media purchased and data utilized by Client through any
							Client Account(s).
						</p>
						<p>
							<b className="subpoint" id="ss5_5">
								5.5
							</b>{" "}
							Suspension for Non-Payment. If the Client fails to pay any undisputed fees in accordance with the invoicing and payment terms
							outlined in the Commercial Agreement, Broadsign Advertising may suspend the Client's access to the Platform upon written notice.
							Suspension will remain in effect until all overdue amounts, including any applicable interest, are paid in full to Broadsign
							Advertising's reasonable satisfaction.
						</p>
						<p>
							<b className="subpoint" id="ss5_6">
								5.6
							</b>{" "}
							Late Payments. If payment remains overdue for more than forty-five (45) days, Broadsign Advertising may terminate this MSA as
							provided in the{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss10")}>
								Section 10
							</button>
							. Interest on overdue amounts will accrue at a rate of 1.5% per month, calculated daily and compounded monthly, or the maximum rate
							permitted by applicable law, whichever is lower. Client shall reimburse Broadsign Advertising for all reasonable costs incurred in
							collecting overdue amounts, including attorneys' fees, court costs, and collection agency fees.
						</p>
						<p>
							<b className="subpoint" id="ss5_7">
								5.7
							</b>{" "}
							Taxes. All fees are exclusive of any taxes, levies, duties or similar governmental assessments of any nature including, value-added,
							sales, use or withholding taxes, assessable by any jurisdiction whatsoever (collectively, “Taxes”). Client is responsible for
							self-assessment of and self-remittance of any and all Taxes associated with this MSA to the applicable collecting agency or party.
						</p>
						<p>
							<b className="subpoint" id="ss5_8">
								5.8
							</b>{" "}
							Credit Limit. The Client's credit limit, if any, will be specified in the Commercial Agreement. Broadsign Advertising may adjust
							this credit limit at its sole discretion. The Client's total outstanding balance shall not exceed the specified credit limit, and
							Broadsign Advertising may restrict further purchases of Media or data if the credit limit is exceeded. Upon Broadsign Advertising's
							first request, the Client shall provide adequate, (based on Broadsign Advertising's exclusive discretion) (legal) security,
							including but not limited to a bank guarantee, advance payment, pledge or lien, for its payment obligations under the MSA.
						</p>
						<h3 id="ss6">6. Confidentiality</h3>
						<p>
							<b className="subpoint" id="ss6_1">
								6.1
							</b>{" "}
							Confidential Information. The Parties acknowledge that the Platform and the MSA and any other information of whatever kind (whether
							or not in material form and whether or not disclosed before or after the Effective Date of this MSA) disclosed or revealed by either
							Party to the other Party under or in relation to this MSA: (a) that is by its nature confidential; (b) is designated by the
							disclosing Party as confidential; or (c) the receiving Party knows or reasonably ought to know is confidential (together the
							“Confidential Information”), constitute the valuable property and trade secrets of the disclosing Party embodying substantial
							creative efforts and confidential information.
						</p>
						<p>
							<b className="subpoint" id="ss6_2">
								6.2
							</b>{" "}
							Obligation of Confidentiality. The Parties agree: (i) to take all measures necessary to keep the Confidential Information
							confidential; and (ii) not to release, disclose, divulge or otherwise make available any of the Confidential Information to any
							person except: (a) employees of the receiving Party who need to use the Confidential Information for the purposes of this MSA; or
							(b) its technical subcontractors, technical representatives and advisors, on only a “need to know” basis, and provided that each
							such subcontractor, representative or advisor will first execute a non-disclosure covenant no less protective of the Confidential
							Information than this Section 6.
						</p>
						<p>
							<b className="subpoint" id="ss6_3">
								6.3
							</b>{" "}
							Right to Injunctive Relief. The Parties acknowledge that monetary damages may not be a sufficient remedy for a breach of any of
							their obligations under this Section 6, and that the disclosing Party will be entitled, without waiving any of its other rights or
							remedies, to such injunctive or equitable relief as may be deemed proper by a court of competent jurisdiction.
						</p>
						<p>
							<b className="subpoint" id="ss6_4">
								6.4
							</b>{" "}
							Return of Confidential Information. The receiving Party agrees, upon the request of the disclosing Party, to promptly deliver to the
							disclosing Party (or, with the disclosing Party's consent, destroy) the originals and all copies, in any format, of the disclosing
							Party's Confidential Information then in the receiving Party's possession or control, including, without limitation, the portion of
							the Confidential Information that consists of data, analyses, compilations, programs, reports, proposals, studies, or other
							documentation prepared by a receiving Party or its representatives. The receiving Party shall not retain any such materials or
							copies thereof in any format following such delivery or destruction.
						</p>
						<h3 id="ss7">7. Limitation of Liability</h3>
						<p>
							<b className="subpoint" id="ss7_1">
								7.1
							</b>{" "}
							EXCEPT AS SET FORTH BELOW, NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, EXEMPLARY, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES
							OR FOR LOST PROFITS OR REVENUES ARISING UNDER OR IN CONNECTION WITH THIS MSA OR OTHERWISE RELATING TO THE USE OR PERFORMANCE OF THE
							PLATFORM OR ANY COMPONENTS THEREOF, OR ANY OTHER DEFAULT.
						</p>
						<p>
							<b className="subpoint" id="ss7_2">
								7.2
							</b>{" "}
							EXCEPT AS SET FORTH BELOW, NEITHER PARTY WILL HAVE LIABILITY ARISING IN ANY MANNER UNDER THIS MSA INCLUDING, BUT NOT LIMITED TO,
							LIABILITY ARISING OUT OF BREACH OF CONTRACT, NEGLIGENCE, STRICT LIABILITY, PRODUCT LIABILITY OR WARRANTY, FOR AN AMOUNT IN EXCESS OF
							THE FEES PAYABLE BY COMPANY UNDER THIS MSA DURING THE TWELVE (12) MONTH PERIOD WHICH PRECEDES THE EVENT WHICH GIVES RISE TO THE
							CLAIM OR IF THE EVENT GIVING RISE TO THE CLAIM OCCURS IN THE FIRST TWELVE (12) MONTHS OF THE TERM, THE AMOUNT PROJECTED AS PAYABLE
							IN THE FIRST TWELVE (12) MONTHS OF THE TERM.
						</p>
						<p>
							<b className="subpoint" id="ss7_3">
								7.3
							</b>{" "}
							THE FOREGOING LIMITATIONS OF LIABILITY IN{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss7_1")}>
								SECTIONS 7.1 AND 7.2
							</button>{" "}
							OF THIS MSA SHALL NOT APPLY TO ANY CLAIM FOR BREACH OF CONFIDENTIALITY, OR THE INDEMNIFICATION OBLIGATIONS AS SET FORTH IN{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss9")}>
								SECTION 9
							</button>{" "}
							OF THIS MSA OR BREACH THEREOF, PROVIDED LIABILITY FOR SUCH CLAIMS OR OBLIGATIONS, IN THE CASE OF BROADSIGN ADVERTISING, SHALL NOT
							EXCEED INSURANCE COVERAGE OBTAINED BY BROADSIGN ADVERTISING. WHERE NO COVERAGE APPLIES, BROADSIGN ADVERTISING'S LIABILITY FOR SUCH
							CLAIMS OR OBLIGATIONS SHALL NOT EXCEED ONE MILLION DOLLARS ($1,000,000).
						</p>
						<h3 id="ss8">8. Disclaimers</h3>
						<p>
							Except as expressly provided in this MSA, Broadsign Advertising makes no representations or warranties, whether express, statutory,
							or implied, with respect to the Platform, the Documentation, and all Services provided under this MSA. The Platform is made
							available "as is" and "as available." Specifically, Broadsign Advertising disclaims all warranties, conditions, and undertakings not
							expressly set forth in this MSA, including, without limitation, any implied warranty of merchantability, merchantable quality,
							fitness for a particular purpose, or arising by a course of dealing or usage of trade. Broadsign Advertising does not represent or
							warrant that (a) the use of the Platform will be secure, timely, uninterrupted, error-free, or operate in combination with any other
							hardware, software, system, or data; (b) the Platform will meet the Parties' requirements or expectations; (c) any stored data or
							reporting will be accurate, reliable, or free from loss; or (d) the Platform will be free of viruses or other harmful components.
						</p>
						<p>
							Broadsign Advertising further disclaims all liability in respect of the commercial and trading relationships between Broadsign
							Advertising, Broadsign Advertising's clients, Client, Client's clients, advertisers, media buyers, media agencies, media sellers,
							media owners, or other commercial partners in connection with the use of the Platform. Furthermore, except for the express
							warranties, conditions, and undertakings set forth in this MSA, Broadsign Advertising disclaims all representations and warranties,
							express, statutory, or implied, including any implied warranties of fitness for a particular purpose, title, merchantability,
							non-infringement, course of dealing, or performance.
						</p>
						<h3 id="ss9">9. Indemnification</h3>
						<p>
							<b className="subpoint" id="ss9_1">
								9.1
							</b>{" "}
							Indemnity by Broadsign Advertising. Broadsign Advertising will defend, indemnify, and hold Client harmless from and against any
							third-party claims, liabilities, damages, or expenses (including reasonable outside attorneys' fees and costs) arising out of a
							claim that Client's authorized use of the Platform, in accordance with this MSA, infringes a third party's patent, trademark, trade
							secret, or copyright (an “IP Claim”), provided that: (i) Client provides Broadsign Advertising with prompt written notice of the IP
							Claim (failure to provide timely notice will relieve Broadsign Advertising of its obligations only to the extent Broadsign
							Advertising is materially prejudiced); (ii) Client reasonably cooperates with Broadsign Advertising, at Broadsign Advertising's
							expense, in the defense of the IP Claim; and (iii) Broadsign Advertising has sole control over the defense and settlement of the IP
							Claim, provided that settlements requiring non-monetary obligations from Client require Client's prior written consent, not to be
							unreasonably withheld.
						</p>
						<p>
							<b className="subpoint" id="ss9_2">
								9.2
							</b>{" "}
							Exclusions to Broadsign Advertising's Indemnity Obligation. Broadsign Advertising's obligations under{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss9_1")}>
								Section 9.1
							</button>{" "}
							will not apply to the extent the IP Claim arises from: (i) Client's use of the Platform in violation of this MSA or applicable law;
							(ii) modifications to the Platform made by or at the direction of Client; (iii) the combination, operation, or use of the Platform
							with unauthorized third-party products, services, or materials where the IP Claim would not have arisen but for such combination,
							operation, or use; or (iv) any Client Data, Ads, or other materials provided by Client.
						</p>
						<p>
							<b className="subpoint" id="ss9_3">
								9.3
							</b>{" "}
							Indemnity by Client. Client agrees to defend, indemnify, and hold Broadsign Advertising harmless from and against any third-party
							claims, liabilities, damages, or expenses (including reasonable outside attorneys' fees and costs) arising out of or related to: (i)
							Client's breach of this MSA or applicable law; (ii) Client's use of the Platform in a manner not authorized by this MSA; (iii)
							modifications to the Platform made by or at the direction of Client; (iv) the combination, operation, or use of the Platform with
							unauthorized third-party products, services, or materials; or (v) Client Data, Ads, or other materials provided by Client in
							connection with the Platform. Broadsign Advertising must provide prompt written notice of any such claim and reasonably cooperate in
							the defense, at Client's expense. Client will have sole control over the defense and settlement of such claims, provided that Client
							may not settle any claim imposing non-monetary obligations on Broadsign Advertising without Broadsign Advertising's prior written
							consent, not to be unreasonably withheld.
						</p>
						<p>
							<b className="subpoint" id="ss9_4">
								9.4
							</b>{" "}
							Remedies. If Broadsign Advertising reasonably believes the Platform is, or is likely to become, the subject of an IP Claim,
							Broadsign Advertising may, at its sole option and expense: (a) procure for Client the right to continue using the Platform; (b)
							modify the Platform to render it non-infringing without materially reducing its functionality; or (c) replace the Platform with a
							functionally equivalent, non-infringing service. If none of these options is commercially reasonable, Broadsign Advertising may
							terminate this MSA upon written notice, and Client will be entitled to a pro-rata refund of prepaid, unused fees for periods during
							which the Platform was unavailable due to the IP Claim.
						</p>
						<p>
							<b className="subpoint" id="ss9_5">
								9.5
							</b>{" "}
							Exclusive Remedy.{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss9_1")}>
								Sections 9.1 through 9.4
							</button>{" "}
							set forth the sole and exclusive remedy of the Parties for any IP Claims or third-party infringement allegations arising under this
							MSA.
						</p>
						<h3 id="ss10">10. Term, Suspension and Termination</h3>
						<p>
							<b className="subpoint" id="ss10_1">
								10.1
							</b>{" "}
							Term. This MSA shall commence on the Effective Date and shall continue until terminated in accordance with this Section (the
							“Term”).
						</p>
						<p>
							<b className="subpoint" id="ss10_2">
								10.2
							</b>{" "}
							Termination for Convenience. Either Party may terminate this MSA for any reason or no reason by providing at least thirty (30) days'
							prior written notice to the other Party.
						</p>
						<p>
							<b className="subpoint" id="ss10_3">
								10.3
							</b>{" "}
							Suspension. Broadsign Advertising may suspend Client's access to the Platform immediately upon written notice if the Client: (i)
							breaches{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss2")}>
								Section 2
							</button>
							; (ii) violates any applicable laws, regulations, or sanctions; or (iii) compromises the security, integrity, or functionality of
							the Platform. Suspension will remain in effect until the breach is cured to Broadsign Advertising's reasonable satisfaction or until
							Broadsign Advertising elects to terminate the MSA as provided below.
						</p>
						<p>
							<b className="subpoint" id="ss10_4">
								10.4
							</b>{" "}
							Termination for Breach. Either Party may terminate this MSA immediately upon written notice if the other materially breaches its
							obligations and fails to cure such breach within ten (10) days of receiving notice.
						</p>
						<p>
							<b className="subpoint" id="ss10_5">
								10.5
							</b>{" "}
							Immediate Termination. Broadsign Advertising may terminate this MSA immediately if the Client:(i) engages in improper use of the
							Platform; (ii) breaches confidentiality obligations; (iii) violates intellectual property rights; or (iv) commits any act prohibited
							under{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ss2")}>
								Section 2
							</button>
							.
						</p>
						<p>
							<b className="subpoint" id="ss10_6">
								10.6
							</b>{" "}
							Termination for Legal or Regulatory Changes. Either Party may terminate this MSA immediately upon written notice of changes in law,
							regulation, or policy rendering the provision or use of the Platform unlawful.
						</p>
						<p>
							<b className="subpoint" id="ss10_7">
								10.7
							</b>{" "}
							Effects of Termination. Upon termination, Broadsign Advertising may disable Client's access to the Platform, and the Client will
							remain liable for all fees accrued or committed before termination. Each Party must destroy or return all Confidential Information
							within five (5) business days of termination and certify such destruction upon request.
						</p>
						<p>
							<b className="subpoint" id="ss10_8">
								10.8
							</b>{" "}
							Survival. The following provisions survive termination: Fees and Payment Terms Confidentiality, Indemnification, Limitation of
							Liability, Provision of Platform, and any other provisions intended by their nature to survive termination.
						</p>
						<h3 id="ss11">11. Miscellaneous</h3>
						<p>
							<b className="subpoint" id="ss11_1">
								11.1
							</b>{" "}
							Force Majeure. Broadsign Advertising shall not be responsible or liable in any way for failure or delay in carrying out the terms of
							this MSA resulting from any force majeure cause or circumstance beyond its reasonable control, including, but not limited to, fire,
							flood, other natural disasters, war, labour difficulties, interruption of transit, power, telecommunication or third party systems
							outages or interruptions, accident, explosion, civil commotion, and acts of any governmental authority (“Force Majeure”); provided,
							however, that Broadsign Advertising will give prompt notice thereof to Client.
						</p>
						<p>
							<b className="subpoint" id="ss11_2">
								11.2
							</b>{" "}
							Dispute Resolution. The Parties recognize that disputes as to certain matters may from time to time arise during the Term of this
							MSA which relate to either Party's rights and/or obligations hereunder. It is the objective of the Parties to establish procedures
							to facilitate the resolution of disputes arising under this MSA in an expedient manner by mutual cooperation and without resort to
							litigation. To accomplish this objective, the Parties agree to follow the procedures set forth in this Section 11 if and when a
							dispute arises under this MSA, which shall be the sole and exclusive procedures for the resolution of any such dispute(s).
						</p>
						<div className="indent_1">
							<p>
								<b className="subpoint" id="ss11_2_i">
									(i)
								</b>{" "}
								Negotiation Between Executives. The Parties shall attempt in good faith to resolve any dispute arising out of or relating to
								this MSA promptly by negotiation between executives who have authority to settle the controversy and who are at a higher level
								of management than the persons with direct responsibility for administration of this MSA. To initiate a negotiation, a party
								shall give the other Party written notice of any dispute not resolved in the normal course of business. Within thirty (30) days
								after delivery of the notice, the executives of both Parties shall meet at a mutually acceptable time and place, and thereafter
								as often as they reasonably deem necessary, to attempt to resolve the dispute. All negotiations pursuant to this clause are
								confidential and shall be treated as compromise and settlement negotiations for purposes of applicable rules of evidence.
							</p>
							<p>
								<b className="subpoint" id="ss11_2_ii">
									(ii)
								</b>{" "}
								Arbitration. If any dispute has not been resolved by negotiation as provided herein, then the Parties will submit all disputes
								arising under this MSA to arbitration in New York City, New York before a single arbitrator of the American Arbitration
								Association (“AAA”). The arbitrator shall be selected by application of the rules of the AAA, or by mutual agreement of the
								Parties. Any dispute(s) arising under this MSA shall be governed by and interpreted in accordance with the laws of the State of
								Delaware, USA, without regard to principles of conflict of laws. No Party to this MSA will challenge the jurisdiction or venue
								provisions as provided in this Section. The arbitrator shall render a written opinion stating the reasons upon which the award
								is based.
							</p>
							<p>
								<b className="subpoint" id="ss11_2_iii">
									(iii)
								</b>{" "}
								Injunctive and Provisional Relief. Notwithstanding{" "}
								<button className="div link_to_section" onClick={() => scrollTo("ss11_2_ii")}>
									Section 11.2(ii)
								</button>
								, the Parties expressly agree that either Party shall retain the right to seek relief in the courts, as specified in{" "}
								<button className="div link_to_section" onClick={() => scrollTo("ss11_2_iv")}>
									Section 11.2(iv)
								</button>{" "}
								hereof, for the purpose of obtaining injunctive and provisional relief until such time as the subject dispute is finally settled
								and any arbitral award regarding such a dispute has been recognized and fully enforced in such jurisdictions as are necessary
								for the benefit and protection of the prevailing Party. Further, Company expressly agrees and accepts that any breach of its
								obligations under this MSA shall cause Broadsign or its affiliate(s) irreparable harm and further, that on such basis, Broadsign
								shall be entitled to seek injunctive and provisional relief from such courts. In the event and to the extent that a dispute
								between the Parties involves an issue which is determined to be not arbitral, then the Parties expressly agree to submit that
								issue for resolution by the courts specified in{" "}
								<button className="div link_to_section" onClick={() => scrollTo("ss11_2_iv")}>
									Section 11.2(iv)
								</button>{" "}
								of this MSA.
							</p>
							<p>
								<b className="subpoint" id="ss11_2_iv">
									(iv)
								</b>{" "}
								Applicable Courts. The Parties expressly consent and submit to exclusive personal jurisdiction and proper venue in the state or
								federal courts located in the State of Delaware, USA, applying the laws of the State of Delaware and the Parties hereby waive
								any objections regarding the jurisdictional authority, proper venue, and the forum's convenience as to such courts.
							</p>
						</div>
						<p>
							<b className="subpoint" id="ss11_3">
								11.3
							</b>{" "}
							Non-Assignment. Client may not assign this MSA, or any right or obligation hereunder, in whole or in part without the prior written
							consent of Broadsign Advertising, which shall not be unreasonably withheld or delayed. Broadsign Advertising may assign this MSA
							without Client's consent upon notice (i) in connection with a merger, stock or asset sale of all or substantially all of its
							business; (ii) to a parent or an affiliated company; (iii) in connection with a consolidation, reorganization, or dissolution not
							involving third parties; or (iv) through government action or order. This MSA will inure to the benefit of and be enforceable by and
							against the Parties and their successors and permitted assigns. There are no third-Party beneficiaries to this MSA.
						</p>
						<p>
							<b className="subpoint" id="ss11_4">
								11.4
							</b>{" "}
							Notices. All notices or communications under this MSA must be in writing and will be considered delivered if sent by certified mail,
							courier, or email to the addresses listed on the Commercial Agreement. Either Party may update its contact details with written
							notice. Notices are considered received upon delivery if sent electronically or personally, or on the third business day if mailed.
						</p>
						<p>
							<b className="subpoint" id="ss11_5">
								11.5
							</b>{" "}
							Entire Agreement and Modifications. These Terms and Conditions, together with the Commercial Agreement executed by the Parties, and
							any schedules, exhibits, statements of work (SOWs), or other documents expressly incorporated by reference, constitute the entire
							agreement between the Parties concerning the subject matter hereof and supersede all prior discussions, negotiations, or agreements
							relating to the same subject matter. In the event of a conflict between these Terms and Conditions and the Commercial Agreement, the
							provisions of the Commercial Agreement shall prevail. Broadsign Advertising reserves the right to update these Terms and Conditions
							periodically to reflect changes in operational practices, applicable laws, or regulatory requirements. By continuing to use the
							Platform after any update, the Client acknowledges and agrees to be bound by the revised Terms and Conditions.
						</p>
						<p>
							<b className="subpoint" id="ss11_6">
								11.6
							</b>{" "}
							Independent Contractors. The Parties hereto are and will remain independent contractors. Nothing herein will be deemed to establish
							a partnership, joint venture, or agency relationship between the Parties. Neither Party will have the right to obligate or bind the
							other Party in any manner to any third party.
						</p>
						<p>
							<b className="subpoint" id="ss11_7">
								11.7
							</b>{" "}
							Drafting and Comprehension. The Parties acknowledge that they have both participated in the drafting of this MSA, and that the
							language of this MSA has been carefully reviewed by counsel for each Party. The Parties agree that none of the Parties (or the
							Parties' respective attorneys) shall be deemed to be the draftsman of this MSA, and that this MSA shall be construed as if the
							Parties jointly prepared it, such that no uncertainty or ambiguity shall be interpreted against any one Party because of the manner
							in which this MSA was drafted or prepared. Each Party acknowledged and represented to the other Party that it and its counsel have
							had adequate opportunity to review the terms of this MSA carefully, and to make whatever investigation or inquiry they may deem
							necessary or desirable in connection with the subject matter of this MSA prior to executing this MSA.
						</p>
						<p>
							<b className="subpoint" id="ss11_8">
								11.8
							</b>{" "}
							Rules of Interpretation. In this MSA: (i) words denoting the singular include the plural and vice versa and words denoting any
							gender include all genders; (ii) all usage of the word “including” or the phrase “e.g.,” in this MSA shall mean “including, without
							limitation,” throughout this MSA. Headings and the division of this MSA into articles and sections are for convenience of reference
							only and shall not affect the interpretation hereof.
						</p>
						<p>
							<b className="subpoint" id="ss11_9">
								11.9
							</b>{" "}
							Authority & Position. Each Party represents and warrants to the other Party that: (i) it is not in a disparate bargaining position
							with respect to the negotiation of this MSA; (ii) it has full authority to enter into this MSA and is competent to do so; and (iii)
							it has taken all corporate action necessary for the compliance with and performance of this MSA by itself.
						</p>
						<p>
							<b className="subpoint" id="ss11_10">
								11.10
							</b>{" "}
							Severability. The invalidity or unenforceability of any provision contained in this MSA will in no way affect the validity or
							enforceability of any other provision. Any provision declared invalid or unenforceable by a court of competent jurisdiction will be
							deemed to be automatically amended and replaced by a valid and enforceable provision that accomplishes as far as possible the
							purpose and intent of such original provision, and the remaining terms and conditions of this MSA will remain in full force and
							effect. All amendments hereto must be in writing and executed by both Parties and expressly state that they are amending this MSA.
						</p>
						<p>
							<b className="subpoint" id="ss11_1">
								11.1
							</b>{" "}
							Waiver. Any term or condition of this MSA may be waived at any time by the Party that is entitled to the benefit thereof solely with
							respect to such Party, but no such waiver will be effective unless set forth in a written instrument duly executed by or on behalf
							of the Party waiving such term or condition. The waiver by either Party of any right hereunder or of the failure to perform or of a
							breach by the other Party will not be deemed a waiver of any other right hereunder or of any other breach or failure by such other
							Party whether of a similar nature or otherwise.
						</p>
						<p>
							<b className="subpoint" id="ss11_2">
								11.2
							</b>{" "}
							Publicity. The Parties agree that each Party may use the name and/or logo of the other Party in press releases, public
							announcements, websites, advertisements, blogs, or other form of publicity in relation to this MSA.
						</p>
						<p>
							<b className="subpoint" id="ss11_13">
								11.13
							</b>{" "}
							Non-Disparagement. Neither Party shall, by way of statement, act or omission, discredit or reflect adversely upon the reputation of
							or the quality of the other Party or the products or services provided by the other Party.
						</p>
					</Container>
				</section>
				<section className={clsx("tab_content tab_managed_services", { active: currentTab === "managedServices" })} onContextMenu={preventContextMenu}>
					<Container>
						<h2>Managed Services</h2>
						<p>
							These terms and conditions (“Terms and Conditions”) govern the provision of digital advertising campaign management services
							(“Services”) by Broadsign Advertising, Inc. (“Broadsign Advertising”) to Client as specified in the applicable Insertion Order. By
							executing an Insertion Order, the Client agrees to these Terms and Conditions, which together with the Insertion Order, and any
							schedules, exhibits, or other documents expressly incorporated by reference, constitute the entire binding Agreement between the
							Parties.
						</p>
						<h3 id="ms1">1. Definitions</h3>
						<p>
							In these Terms and Conditions, in addition to the capitalized terms defined elsewhere herein or in the applicable Insertion Order,
							the following terms will have the meanings ascribed to them in this Section.
						</p>
						<p>
							<b>“Agreement”</b> means any applicable Insertion Order together with these Terms and Conditions, including any terms set forth in
							any schedule, exhibit, or addendum incorporated by reference.
						</p>
						<p>
							<b>“Campaign”</b> means an advertising campaign managed by Broadsign Advertising on behalf of the Client as specified in the
							applicable IO.
						</p>
						<p>
							<b>“Client”</b> means the entity that has signed the applicable IO and agreed to these Terms and Conditions.
						</p>
						<p>
							<b>“Fees”</b> means amounts payable by the Client as specified in the IO or invoices issued by Broadsign Advertising.
						</p>
						<p>
							<b>“IO”</b> or “Insertion Order” means the document executed by the Parties that specifies the commercial terms of the Agreement,
							including but not limited to campaign details, budget, services, payment terms, and any other agreed-upon provisions, and
							incorporates by reference the Managed Services Terms and Conditions.
						</p>
						<p>
							<b>“Media”</b> means all ad units or advertising inventory, where Ads can be displayed, including, without limitation, out of home
							or digital out of home advertising units, video streams, sponsorship opportunities, custom content and other forms of advertisements
							and creative units, which are made available through the Platform.
						</p>
						<p>
							<b>“Platform”</b> means Broadsign Advertising's demand-side platform, comprising proprietary technology services, platform features,
							and human support services, including tools and functionalities for the planning, purchase, management, optimization, and reporting
							of Media and data, as well as any associated reference materials provided in connection with such services.
						</p>
						<h3 id="ms2">2. Services</h3>
						<p>
							Broadsign Advertising will provide the Services using its Platform as specified in the applicable IO based on the specifications
							outlined below.
						</p>
						<p>
							<b className="subpoint" id="ms2_1">
								2.1
							</b>{" "}
							The Parties acknowledge and agree that:
						</p>
						<div className="indent_1">
							<p>
								<b className="subpoint" id="ms2_1_a">
									a.
								</b>{" "}
								The Campaign will be created and fully managed by Broadsign Advertising, including line-item creation, budget breakout,
								targeting by line item, creative upload and full applicable campaign optimization strategies to maximize impressions within the
								given campaign budget.
							</p>
							<p>
								<b className="subpoint" id="ms2_1_b">
									b.
								</b>{" "}
								Broadsign Advertising will utilize its platform to achieve the optimal results in delivering the most impressions within the
								desired target for the best possible price by performing daily campaign performance and delivery monitoring and taking necessary
								actions to optimize delivery to best meet Campaign objectives and instructions as stated herein.
							</p>
							<p>
								<b className="subpoint" id="ms2_1_c">
									c.
								</b>{" "}
								Any changes to the Campaign parameters must be communicated and approved by both Parties in writing.
							</p>
						</div>
						<p>
							<b className="subpoint" id="ms2_2">
								2.2
							</b>{" "}
							Client further agrees that:
						</p>
						<div className="indent_1">
							<p>
								<b className="subpoint" id="ms2_2_a">
									a.
								</b>{" "}
								The impression delivery is non-guaranteed, and all services are provided on a best-effort basis.
							</p>
							<p>
								<b className="subpoint" id="ms2_2_b">
									b.
								</b>{" "}
								No make goods are issued for under-delivery or discrepancies in impression/views.
							</p>
							<p>
								<b className="subpoint" id="ms2_2_c">
									c.
								</b>{" "}
								Client shall provide all necessary creative assets and materials according to the specifications outlined herein.
							</p>
						</div>
						<h3 id="ms3">3. Fees and Payment Terms</h3>
						<p>
							<b className="subpoint" id="ms3_1">
								3.1
							</b>{" "}
							Fees. In consideration of the services provided by Broadsign Advertising under this Agreement, Client shall pay the fees specified
							in the IO in accordance with the terms set forth in this Section and the IO.
						</p>
						<p>
							<b className="subpoint" id="ms3_2">
								3.2
							</b>{" "}
							Late Payments. If payment remains overdue for more than forty-five (45) days, Broadsign Advertising may terminate this Agreement as
							provided in{" "}
							<button className="div link_to_section" onClick={() => scrollTo("ms4")}>
								Section 4
							</button>
							. Interest on overdue amounts will accrue at a rate of 1.5% per month, calculated daily and compounded monthly, or the maximum rate
							permitted by applicable law, whichever is lower. Client shall reimburse Broadsign Advertising for all reasonable costs incurred in
							collecting overdue amounts, including attorneys' fees, court costs, and collection agency fees.
						</p>
						<p>
							<b className="subpoint" id="ms3_3">
								3.3
							</b>{" "}
							Suspension for Non-Payment. If the Client fails to pay any undisputed fees in accordance with the invoicing and payment terms
							outlined in the Insertion Order, Broadsign Advertising may suspend the Client's access to the Platform upon written notice.
							Suspension will remain in effect until all overdue amounts, including any applicable interest, are paid in full to Broadsign
							Advertising's reasonable satisfaction.
						</p>
						<p>
							<b className="subpoint" id="ms3_4">
								3.4
							</b>{" "}
							Taxes. All fees are exclusive of any taxes, levies, duties or similar governmental assessments of any nature including, value-added,
							sales, use or withholding taxes, assessable by any jurisdiction whatsoever (collectively, “Taxes”). Client is responsible for
							self-assessment of and self-remittance of any and all Taxes associated with this Agreement to the applicable collecting agency or
							party.
						</p>
						<h3 id="ms4">4. Term and termination</h3>
						<p>
							<b className="subpoint" id="ms4_1">
								4.1
							</b>{" "}
							Term. This Agreement shall commence on the Effective Date specified in the IO and will continue in effect for the duration of the
							Campaign as specified in the IO, unless terminated earlier as provided below.
						</p>
						<p>
							<b className="subpoint" id="ms4_2">
								4.2
							</b>{" "}
							Termination for Material Breach. Either Party may terminate this Agreement by providing written notice if the other Party materially
							breaches any provision of this Agreement. The breaching Party shall have thirty (30) days to cure the breach after receiving written
							notice. If the breach is not cured within this period, the non-breaching Party may terminate the Agreement immediately.
						</p>
						<p>
							<b className="subpoint" id="ms4_3">
								4.3
							</b>{" "}
							Effect of Termination. Upon termination of this Agreement, all licenses, consents, and authorizations granted by either Party to the
							other shall immediately terminate, and the Client shall pay all outstanding fees due for services rendered up to the date of
							termination.
						</p>
						<p>
							<b className="subpoint" id="ms4_4">
								4.4
							</b>{" "}
							Survival of Terms. Sections regarding confidentiality, payment obligations, limitation of liability, indemnification, and any other
							provisions that, by their nature, should survive termination, will continue to be in effect after the termination or expiration of
							this Agreement.
						</p>
						<h3 id="ms5">5. Confidentiality</h3>
						<p>
							<b className="subpoint" id="ms5_1">
								5.1
							</b>{" "}
							Confidential Information. The Parties acknowledge that the Platform and the Agreement and any other information of whatever kind
							(whether or not in material form and whether or not disclosed before or after the Effective Date of this Agreement) disclosed or
							revealed by either Party to the other Party under or in relation to this Agreement: (a) that is by its nature confidential; (b) is
							designated by the disclosing Party as confidential; or (c) the receiving Party knows or reasonably ought to know is confidential
							(together the “Confidential Information”), constitute the valuable property and trade secrets of the disclosing Party embodying
							substantial creative efforts and confidential information.
						</p>
						<p>
							<b className="subpoint" id="ms5_2">
								5.2
							</b>{" "}
							Obligation of Confidentiality. The Parties agree: (i) to take all measures necessary to keep the Confidential Information
							confidential; and (ii) not to release, disclose, divulge or otherwise make available any of the Confidential Information to any
							person except: (a) employees of the receiving Party who need to use the Confidential Information for the purposes of this Agreement;
							or (b) its technical subcontractors, technical representatives and advisors, on only a “need to know” basis, and provided that each
							such subcontractor, representative or advisor will first execute a non-disclosure covenant no less protective of the Confidential
							Information than this Section.
						</p>
						<p>
							<b className="subpoint" id="ms5_3">
								5.3
							</b>{" "}
							Right to Injunctive Relief. The Parties acknowledge that monetary damages may not be a sufficient remedy for a breach of any of
							their obligations under this Section, and that the disclosing Party will be entitled, without waiving any of its other rights or
							remedies, to such injunctive or equitable relief as may be deemed proper by a court of competent jurisdiction.
						</p>
						<p>
							<b className="subpoint" id="ms5_4">
								5.4
							</b>{" "}
							Return of Confidential Information. The receiving Party agrees, upon the request of the disclosing Party, to promptly deliver to the
							disclosing Party (or, with the disclosing Party's consent, destroy) the originals and all copies, in any format, of the disclosing
							Party's Confidential Information then in the receiving Party's possession or control, including, without limitation, the portion of
							the Confidential Information that consists of data, analyses, compilations, programs, reports, proposals, studies, or other
							documentation prepared by a receiving Party or its representatives. The receiving Party shall not retain any such materials or
							copies thereof in any format following such delivery or destruction.
						</p>
						<h3 id="ms6">6. Limitation of Liability</h3>
						<p>
							Broadsign Advertising's maximum liability under this Agreement shall be limited to the total Fees paid by the Client under the
							relevant IO during the six (6) months preceding the claim. Broadsign Advertising shall not be liable for any indirect, incidental,
							special, or consequential damages, including lost profits, business, or data, arising from the performance of this Agreement, the
							Campaign, or the use of Broadsign Advertising services.
						</p>
						<h3 id="ms7">7. Indemnity</h3>
						<p>
							<b className="subpoint" id="ms7_1">
								7.1
							</b>{" "}
							Indemnification by the Client. The Client shall indemnify, defend, and hold harmless Broadsign Advertising, its affiliates,
							officers, directors, employees, and agents from any third-party claims, damages, liabilities, costs, and expenses (including
							reasonable attorneys' fees) arising from: (a) any material breach of the Agreement by the Client; (b) infringement of intellectual
							property rights due to assets provided by the Client or the improper use of the Platform by the Client; (c) failure by the Client to
							comply with applicable laws and regulations related to the Services; or (d) violations involving the protection of personal or
							confidential data caused by the Client's negligence or willful misconduct.
						</p>
						<p>
							<b className="subpoint" id="ms7_2">
								7.2
							</b>{" "}
							Indemnification by Broadsign Advertising. Broadsign Advertising shall indemnify, defend, and hold harmless the Client, its
							affiliates, officers, directors, employees, and agents from third-party claims, damages, liabilities, costs, and expenses (including
							reasonable attorneys' fees) arising from Claims that the Platform infringes any valid third-party intellectual property rights,
							provided that such claims are not related to materials or data provided by the Client.
						</p>
						<p>
							<b className="subpoint" id="ms7_3">
								7.3
							</b>{" "}
							Conditions of Indemnification. Indemnification obligations are conditioned on the indemnified Party: (i) providing prompt written
							notice of any claim; (ii) granting control of the defense and settlement to the indemnifying Party, provided that no settlement may
							impose non-monetary obligations without prior written consent; (iii) cooperating fully in the defense.
						</p>
						<h3 id="ms8">8. Miscellaneous</h3>
						<p>
							<b className="subpoint" id="ms8_1">
								8.1
							</b>{" "}
							Force Majeure. Broadsign Advertising shall not be responsible or liable in any way for failure or delay in carrying out the terms of
							this Agreement resulting from any force majeure cause or circumstance beyond its reasonable control, including, but not limited to,
							fire, flood, other natural disasters, war, labour difficulties, interruption of transit, power, telecommunication or third party
							systems outages or interruptions, accident, explosion, civil commotion, and acts of any governmental authority (“Force Majeure”);
							provided, however, that Broadsign Advertising will give prompt notice thereof to Client.
						</p>
						<p>
							<b className="subpoint" id="ms8_2">
								8.2
							</b>{" "}
							Dispute Resolution. The Parties recognize that disputes as to certain matters may from time to time arise during the term of this
							Agreement which relate to either Party's rights and/or obligations hereunder. It is the objective of the Parties to establish
							procedures to facilitate the resolution of disputes arising under this Agreement in an expedient manner by mutual cooperation and
							without resort to litigation. To accomplish this objective, the Parties agree to follow the procedures set forth in this Section if
							and when a dispute arises under this Agreement, which shall be the sole and exclusive procedures for the resolution of any such
							dispute(s).
						</p>
						<div className="indent_1">
							<p>
								<b className="subpoint" id="ms8_2_a">
									a.
								</b>{" "}
								Negotiation Between Executives. The Parties shall attempt in good faith to resolve any dispute arising out of or relating to
								this Agreement promptly by negotiation between executives who have authority to settle the controversy and who are at a higher
								level of management than the persons with direct responsibility for administration of this Agreement. To initiate a negotiation,
								a party shall give the other Party written notice of any dispute not resolved in the normal course of business. Within thirty
								(30) days after delivery of the notice, the executives of both Parties shall meet at a mutually acceptable time and place, and
								thereafter as often as they reasonably deem necessary, to attempt to resolve the dispute. All negotiations pursuant to this
								clause are confidential and shall be treated as compromise and settlement negotiations for purposes of applicable rules of
								evidence.
							</p>
							<p>
								<b className="subpoint" id="ms8_2_b">
									b.
								</b>{" "}
								Arbitration. If any dispute has not been resolved by negotiation as provided herein, then the Parties will submit all disputes
								arising under this Agreement to arbitration in New York City, New York before a single arbitrator of the American Arbitration
								Association (“AAA”). The arbitrator shall be selected by application of the rules of the AAA, or by mutual agreement of the
								Parties. Any dispute(s) arising under this Agreement shall be governed by and interpreted in accordance with the laws of the
								State of Delaware, USA, without regard to principles of conflict of laws. No Party to this Agreement will challenge the
								jurisdiction or venue provisions as provided in this Section. The arbitrator shall render a written opinion stating the reasons
								upon which the award is based.
							</p>
							<p>
								<b className="subpoint" id="ms8_2_c">
									c.
								</b>{" "}
								Injunctive and Provisional Relief. Notwithstanding{" "}
								<button className="div link_to_section" onClick={() => scrollTo("ms8_2_b")}>
									Section 8.2(b)
								</button>
								, the Parties expressly agree that either Party shall retain the right to seek relief in the courts, as specified in{" "}
								<button className="div link_to_section" onClick={() => scrollTo("ms8_2_d")}>
									Section 8.2(d)
								</button>{" "}
								hereof, for the purpose of obtaining injunctive and provisional relief until such time as the subject dispute is finally settled
								and any arbitral award regarding such a dispute has been recognized and fully enforced in such jurisdictions as are necessary
								for the benefit and protection of the prevailing Party. Further, Company expressly agrees and accepts that any breach of its
								obligations under this Agreement shall cause Broadsign Advertising or its affiliate(s) irreparable harm and further, that on
								such basis, Broadsign shall be entitled to seek injunctive and provisional relief from such courts. In the event and to the
								extent that a dispute between the Parties involves an issue which is determined to be not arbitral, then the Parties expressly
								agree to submit that issue for resolution by the courts specified in{" "}
								<button className="div link_to_section" onClick={() => scrollTo("ms8_2_d")}>
									Section 8.2(d)
								</button>{" "}
								of this Agreement.
							</p>
							<p>
								<b className="subpoint" id="ms8_2_d">
									d.
								</b>{" "}
								Applicable Courts. The Parties expressly consent and submit to exclusive personal jurisdiction and proper venue in the state or
								federal courts located in the State of Delaware, USA, applying the laws of the State of Delaware and the Parties hereby waive
								any objections regarding the jurisdictional authority, proper venue, and the forum's convenience as to such courts.
							</p>
						</div>
						<p>
							<b className="subpoint" id="ms8_3">
								8.3
							</b>{" "}
							Non-Assignment. Client may not assign this Agreement, or any right or obligation hereunder, in whole or in part without the prior
							written consent of Broadsign Advertising, which shall not be unreasonably withheld or delayed. Broadsign Advertising may assign this
							Agreement without Client's consent upon notice (i) in connection with a merger, stock or asset sale of all or substantially all of
							its business; (ii) to a parent or an affiliated company; (iii) in connection with a consolidation, reorganization, or dissolution
							not involving third parties; or (iv) through government action or order. This Agreement will inure to the benefit of and be
							enforceable by and against the Parties and their successors and permitted assigns. There are no third-Party beneficiaries to this
							Agreement.
						</p>
						<p>
							<b className="subpoint" id="ms8_4">
								8.4
							</b>{" "}
							Notices. All notices or communications under this Agreement must be in writing and will be considered delivered if sent by certified
							mail, courier, or email to the addresses listed on the Commercial Agreement. Either Party may update its contact details with
							written notice. Notices are considered received upon delivery if sent electronically or personally, or on the third business day if
							mailed.
						</p>
						<p>
							<b className="subpoint" id="ms8_5">
								8.5
							</b>{" "}
							Entire Agreement and Modification. This Agreement including all the schedules, IOs, exhibits and any statement(s) of work attached
							hereto constitute the entire Agreement between Broadsign Advertising and Client with respect to the subject matter hereof. In the
							event of a contradiction between the body of this Agreement and any one of the schedules thereto, unless the schedule expressly
							provides otherwise, the provisions contained in this Agreement will prevail. Broadsign Advertising reserves the right to update
							these Terms and Conditions periodically to reflect changes in operational practices, applicable laws, or regulatory requirements. By
							continuing to use the Platform after any update, the Client acknowledges and agrees to be bound by the revised Terms and Conditions,
							which will be made available online..
						</p>
						<p>
							<b className="subpoint" id="ms8_6">
								8.6
							</b>{" "}
							Independent Contractors. The Parties hereto are and will remain independent contractors. Nothing herein will be deemed to establish
							a partnership, joint venture, or agency relationship between the Parties. Neither Party will have the right to obligate or bind the
							other Party in any manner to any third party.
						</p>
						<p>
							<b className="subpoint" id="ms8_7">
								8.7
							</b>{" "}
							Drafting and Comprehension. The Parties acknowledge that they have both participated in the drafting of this Agreement, and that the
							language of this Agreement has been carefully reviewed by counsel for each Party. The Parties agree that none of the Parties (or the
							Parties' respective attorneys) shall be deemed to be the draftsman of this Agreement, and that this Agreement shall be construed as
							if the Parties jointly prepared it, such that no uncertainty or ambiguity shall be interpreted against any one Party because of the
							manner in which this Agreement was drafted or prepared. Each Party acknowledged and represented to the other Party that it and its
							counsel have had adequate opportunity to review the terms of this Agreement carefully, and to make whatever investigation or inquiry
							they may deem necessary or desirable in connection with the subject matter of this Agreement prior to executing this Agreement.
						</p>
						<p>
							<b className="subpoint" id="ms8_8">
								8.8
							</b>{" "}
							Rules of Interpretation. In this Agreement: (i) words denoting the singular include the plural and vice versa and words denoting any
							gender include all genders; (ii) all usage of the word “including” or the phrase “e.g.,” in this Agreement shall mean “including,
							without limitation,” throughout this Agreement. Headings and the division of this Agreement into articles and sections are for
							convenience of reference only and shall not affect the interpretation hereof.
						</p>
						<p>
							<b className="subpoint" id="ms8_9">
								8.9
							</b>{" "}
							Authority & Position. Each Party represents and warrants to the other Party that: (i) it is not in a disparate bargaining position
							with respect to the negotiation of this Agreement; (ii) it has full authority to enter into this Agreement and is competent to do
							so; and (iii) it has taken all corporate action necessary for the compliance with and performance of this Agreement by itself.
						</p>
						<p>
							<b className="subpoint" id="ms8_10">
								8.10
							</b>{" "}
							Severability. The invalidity or unenforceability of any provision contained in this Agreement will in no way affect the validity or
							enforceability of any other provision. Any provision declared invalid or unenforceable by a court of competent jurisdiction will be
							deemed to be automatically amended and replaced by a valid and enforceable provision that accomplishes as far as possible the
							purpose and intent of such original provision, and the remaining terms and conditions of this Agreement will remain in full force
							and effect. All amendments hereto must be in writing and executed by both Parties and expressly state that they are amending this
							Agreement.
						</p>
						<p>
							<b className="subpoint" id="ms8_11">
								8.11
							</b>{" "}
							Waiver. Any term or condition of this Agreement may be waived at any time by the Party that is entitled to the benefit thereof
							solely with respect to such Party, but no such waiver will be effective unless set forth in a written instrument duly executed by or
							on behalf of the Party waiving such term or condition. The waiver by either Party of any right hereunder or of the failure to
							perform or of a breach by the other Party will not be deemed a waiver of any other right hereunder or of any other breach or failure
							by such other Party whether of a similar nature or otherwise.
						</p>
						<p>
							<b className="subpoint" id="ms8_12">
								8.12
							</b>{" "}
							Publicity. The Parties agree that each Party may use the name and/or logo of the other Party in press releases, public
							announcements, websites, advertisements, blogs, or other form of publicity in relation to this Agreement.
						</p>
						<p>
							<b className="subpoint" id="ms8_13">
								8.13
							</b>{" "}
							Non-Disparagement. Neither Party shall, by way of statement, act or omission, discredit or reflect adversely upon the reputation of
							or the quality of the other Party or the products or services provided by the other Party.
						</p>
					</Container>
				</section>
			</div>
		</>
	);
}
