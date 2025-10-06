import React, { useCallback, useEffect } from "react";
import T from "i18n-react";
import clsx from "clsx";

import Collapse from "@components/Collapse";
import Container from "@components/Container";
import Form from "@components/Form";
import Link from "@components/LocalizedLink";

export default function privacyPolicy__en({ hash, scrollTo }) {
	useEffect(() => {
		if (hash.includes("california")) scrollTo("california");
		if (hash.includes("eu")) scrollTo("eu");
	}, [hash]);

	return (
		<>
			<p>Last Updated: [Date]</p>
			<p>
				Thank you for using Broadsign International Holding Company and its subsidiaries or affiliated entities (collectively, “Broadsign”, “we,” “us,”
				or “our”). At Broadsign, we recognize that privacy is important and we are committed to protecting your privacy and, for that reason, we have
				adopted this Privacy Policy to explain our data collection, use, and disclosure practices for the Broadsign website (including your interactions
				with the <Link to="/">https://broadsign.com/</Link> website), participation in events we organize or sponsor, communications with our sales and
				marketing teams, and any other services provided by Broadsign that link to or reference this Privacy Policy (collectively, the “Services”).
			</p>
			<p>
				If you reside in the State of California, please{" "}
				<button className="div" onClick={() => scrollTo("california")}>
					click here
				</button>{" "}
				to learn more about your privacy rights. To the extent that there is a conflict between this Privacy Policy and the Privacy Notice for
				California Residents, the Privacy Notice for California Residents will prevail with respect to California Residents (as defined below) only.
			</p>
			<p>
				If you reside in a country in the European Economic Area or in Switzerland, please{" "}
				<button className="div" onClick={() => scrollTo("eu")}>
					click here
				</button>{" "}
				to learn more about your privacy rights. To the extent that there is a conflict between this Privacy Policy and the Privacy Notice for European
				Residents, the Privacy Notice for European Residents will prevail with respect to European Residents (as defined below) only.
			</p>
			<p>
				This Privacy Policy applies to information Broadsign collects through the Services, as well as other information provided to us online or
				offline by third parties, when we associate that information with consumers or users of the Services; however, it does not apply to information
				collected from our employees, contractors, or vendors. Any Personal Information collected from our customers in connection with their use of
				Broadsign’s products or services is governed by the relevant customer agreement entered into between Broadsign and the customer. It also does
				not apply to information that you ask us to share with third parties or that is collected by certain other third parties whose software or
				services are featured or included in the Services (as further described below).
			</p>
			<p>This Privacy Policy describes, among other things: </p>
			<ul>
				<li>Personal and other information we collect about you;</li>
				<li>How we use your information;</li>
				<li>How we may share your information with third parties; and</li>
				<li>Your choices regarding the personal information we collect about you.</li>
			</ul>
			<p>
				For any questions or concerns regarding this Privacy Policy or Broadsign's treatment of Personal Information (as defined below), please feel
				free to contact us at{" "}
				<Link to="mailto:privacy@broadsign.com" className="">
					privacy@broadsign.com
				</Link>{" "}
				or write to us at: <address>700 René-Lévesque Blvd W, Suite 1200, Montreal, Quebec Canada H3B 1X8</address>.
			</p>
			<h2>1. Consent</h2>
			<p>
				By accessing or using the Services, you consent to this Privacy Policy. If you do not agree with this Privacy Policy, please do not access or
				use the Services.
			</p>
			<h2>2. Collection of Your Personal and Other Information</h2>
			<p>
				When you sign up for a Broadsign account or other Broadsign service or promotion that requires registration, or use our Services, we may collect
				Personal Information. By “Personal Information,” we mean information that can identify or reasonably be linked to an individual, such as the
				following types of information:
			</p>
			<ul>
				<li>Names;</li>
				<li>Personal or business addresses;</li>
				<li>Email addresses;</li>
				<li>Phone Numbers;</li>
				<li>
					Certain information related to your business, such as business name, industry or sector, business size (e.g., annual revenue range or number
					of employees), and other qualifying information you provide to us;
				</li>
				<li>Job title; and</li>
				<li>Information contained in any image, photograph or profile you submit to us.</li>
			</ul>
			<p>
				We may combine the information you submit under your account with other information you voluntarily provide from other Broadsign services in
				order to provide you with a better experience and to improve the quality of our services.
			</p>
			<p>
				Our Services may link with digital advertising platforms, including Meta (formerly Facebook), Google, Reddit, Paved, X and LinkedIn. When you
				link from a digital advertising account to our Services, then we may collect information about that digital advertising account and share
				information (such as email addresses) with that digital advertising account as described in the connection process. This collected information
				may include, but is not limited to, your name, email address, demographic information from your profile, friend lists, postings or other
				content, and your profile picture. You acknowledge and agree that Broadsign is not responsible for the data collection or use practices of any
				such linked digital advertising platform. You should read each digital advertising platform’s privacy policy before linking to or from that
				digital advertising account.
			</p>
			<p>
				We also use technology from third-party service providers including,{" "}
				<Link to="https://www.hotjar.com/legal/policies/privacy/">Hotjar Ltd.</Link> and <Link to="https://vwo.com/privacy-policy/">VWO</Link>, to
				collect user experience data, which reproduces your interactions with the Services, including mouse movements, page scrolling, screen taps, and
				other actions you take while using the Services. We may replace these third-party service providers without giving notice to you. Reproduced
				data may include technical and usage data, as well as visual representations of actions you take while using the Services. Our use of this data
				is limited to helping us understand how users interact with our Services and to design a better user experience for you.
			</p>
			<p>
				You may choose not to provide Personal Information, (subject to the controls offered by your personal device’s (e.g., mobile device, laptop, or
				desktop computer) operating system), but this may prevent you from receiving certain features of the Services.
			</p>
			<p>
				We also collect non-Personal Information relating to the Services, that is, information that does not personally identify an individual. The
				non-Personal Information we collect includes how you interact with the Services, information generally collected or “logged” by Internet
				websites or Internet services when accessed or used by users, and information about your web browser or device accessing or using the Services.
			</p>
			<ul>
				<li>Examples of the non-Personal Information we collect are:</li>
				<li>The pages of our website that you viewed during a visit;</li>
				<li>What information, content or advertisements you view or interact with using the Services;</li>
				<li>Language preferences;</li>
				<li>The city and state in which you are located (but not your precise geographic location); and</li>
			</ul>
			<p>
				Unique identifiers that are not connected and cannot reasonably be connected to your identity. We will not use non-Personal Information to try
				to identify you, and if we associate any non-Personal Information with information that personally identifies you, then we will treat it as
				Personal Information. As discussed in more detail below, we sometimes use cookies and other automatic information gathering technologies to
				gather Personal Information and non-Personal Information.
			</p>
			<p>
				Information collected by the Services may be collected by us or one of the third parties we utilize in providing the Services (as further
				described below).
			</p>
			<p>
				When you send email or other communications to Broadsign, we may retain those communications in order to process your inquiries, respond to your
				requests and improve our Services.
			</p>
			<h2>3. Use of Your Information</h2>
			<p>We may use the information we collect for the purposes described in this Privacy Policy, which may include:</p>
			<ul>
				<li>Maintaining general business operations and administration of Broadsign and its subsidiaries or affiliated entities;</li>
				<li>Providing services to Broadsign’s customers;</li>
				<li>Providing ongoing administration and management of customer services;</li>
				<li>Developing and improving Broadsign’s online operations, products and services;</li>
				<li>Assisting us in providing, maintaining, and protecting the Services;</li>
				<li>Setting up, maintaining, and protecting accounts to use the Services;</li>
				<li>Processing transactions;</li>
				<li>
					Communicating with you, such as providing you with account- or transaction-related communications, marketing communications, product or
					company news, event invitations, or other newsletters, RSS feeds, and/or other communications relating to the Services;
				</li>
				<li>Sending or displaying offers and other content that is customized to your interests or preferences;</li>
				<li>Performing research and analysis aimed at improving our products and services and developing new products or services; and</li>
				<li>Managing and maintaining the systems that provide the Services. </li>
			</ul>
			<p>
				We will not collect or use your Personal Information for purposes other than those described in this Privacy Policy, unless we have obtained
				your prior consent.
			</p>
			<p>
				You can decline to submit Personal Information to any of our Services, in which case Broadsign may not be able to provide those Services to you.
			</p>
			<h2>4. Children</h2>
			<p>
				The Services are designed for a general audience and are not directed to children under 13 years of age. We do not knowingly collect Personal
				Information from children under 13. If we learn that we have inadvertently collected Personal Information from a child under 13 without
				verifiable parental consent, we will delete it promptly. If you believe we have collected information from a child under 13, please contact us
				at{" "}
				<Link to="mailto:privacy@broadsign.com" className="mailto_privacy">
					privacy@broadsign.com
				</Link>{" "}
				or <address>700 René-Lévesque Blvd W, Suite 1200, Montreal, Quebec, Canada H3B 1X8</address>.
			</p>
			<h2>5. Information Security</h2>
			<p>
				We utilize reasonable information security measures to safeguard your Personal Information against unauthorized access, modification, or
				destruction. For example, we utilize Secure Socket Layer (SSL), Transport Layer Security (TLS), or similar encryption technology when sensitive
				data is transmitted over the Internet, and use firewalls to help prevent external access into our network. However, no data transmission over
				the Internet and no method of data storage can be guaranteed to be 100% secure. Therefore, while we strive to use commercially acceptable means
				to protect your Personal Information, we cannot guarantee its security.
			</p>
			<h2>6. Disclosure of Your Information</h2>
			<p>Broadsign may disclose your Personal Information to third parties, as described below in the following limited circumstances:</p>
			<ul>
				<li>
					<b>Service Providers.</b> We may disclose Personal Information to Service Providers in order to provide the Services, or when you authorize
					or instruct us to do so, for example, when you use the Services to submit content or profile information. By “Service Providers” we mean
					companies, agents, contractors, service providers, or others engaged to perform functions on our behalf (such as processing of payments,
					provision of data storage, hosting of our website, marketing of our products and services, and conducting audits). When we use a Service
					Provider, we require that the Service Provider use and disclose the Personal Information received from us only to provide their services to
					us or as required by applicable law.
				</li>
				<li>
					<b>Online Tool Providers and Tracking Technologies.</b> We may also disclose Personal Information and non-Personal Information to Online
					Tool Providers. By “Online Tool Provider” we mean a licensor of software that we include in, or use with, the Services, including an
					application programming interface (“API”) or software development kit (“SDK”), that provides a specialized function or service to us and
					that requires the transmission of Personal Information and/or non-Personal Information to the Online Tool Provider.
				</li>
			</ul>
			<p>
				Online Tool Providers, Cookies, web beacons, pixels, tags, and similar third-party technologies are collectively referred to herein as “Tracking
				Technologies.” Tracking Technologies may have the right to use Personal Information and non-Personal Information about you for their own
				business purposes. The use and disclosure of Personal Information and non-Personal Information by third-party Tracking Technologies are
				described in their respective privacy policies. See Section 7 below for some of the key Tracking Technologies we use.
			</p>
			<ul>
				<li>
					<b>Business Partners.</b> We may partner with industry business partners or other related companies to provide you with special offers, or
					to conduct joint marketing campaigns or related initiatives. If you redeem or respond to an offer, we may provide your Personal Information
					to the industry business partner or related company, including your name, email address, company name and title. If you answer questions or
					fill out surveys from a partner, we may share information with that partner. The industry business partner’s or related company’s privacy
					policy will govern their use of your information, which may include marketing of other products or services to you. You should read each
					industry business partner’s or related company’s privacy policy before providing information to that applicable entity.
				</li>
				<li>
					<b>Affiliates.</b> We may share information to our subsidiaries, affiliated companies or other trusted businesses or persons for the purpose
					of processing personal information on our behalf. We require that these parties agree to process such information based on our instructions
					and in compliance with this Privacy Policy and any other appropriate confidentiality and security measures.
				</li>
				<li>
					<b>Compliance.</b> We may disclose your Personal Information to third parties when we believe in good faith and in our discretion, that such
					disclosure of such information is reasonably necessary to (a) comply with any applicable legal or regulatory requirements or an enforceable
					governmental request, (b) enforce or apply the terms and conditions of the Services, including investigation of potential violations
					thereof, (c) detect, prevent, or otherwise address fraud, security or technical issues, (d) protect the rights, property or safety of
					Broadsign, its users or other third parties, (e) prevent a crime or protect national security, or (f) submit insurance claims, cooperate
					with insurance investigations, and fulfil insurance subrogation activities.
				</li>
				<li>
					<b>Business Transfers.</b> We reserve the right to transfer information (including your Personal Information) to a third party in the event
					of a sale, merger, transfer of all or substantially all of the assets of our company relating to the Services, or in the unlikely event of a
					bankruptcy, liquidation, or receivership of our business. We will use commercially reasonable efforts to notify you of such transfer, for
					example, via email or by posting a notice on our website.
				</li>
				<li>
					<b>Aggregated Data.</b> We may disclose non-Personal Information, aggregated with information about our other users, to our clients,
					business partners, merchants, advertisers, investors, potential buyers and other third parties if we deem such disclosure, in our sole
					discretion, to have sound business reasons or justifications.
				</li>
			</ul>
			<p>Please contact us at the address below for any additional questions about the management or use of Personal Information.</p>
			<h2>7. Cookies and Automatic Information Gathering Technologies</h2>
			<p>
				Every time you use the Services (e.g., access a Service webpage, or navigate to a specific location within the Service mobile app), we collect
				Personal Information and non-Personal Information (as described in Section 2). For example, to improve our Services, we collect how, when, and
				which parts of the Services or their features you use, which social media platforms you connect to the Services, and when, how, and what you
				post to the social media platforms through the Service app. Also, we may use your device’s unique identifier (UDID) or other unique identifiers
				to assist us in collecting and analyzing this data.
			</p>
			<p>
				To support this, we may employ a variety of technologies, including Cookies, local browser storage, and “web beacons,” “pixels,” or “tags.” A
				“Cookie” is a small amount of data a website operator, or a third party whose content is embedded in that website, may store in your web browser
				and that the website operator or, as applicable, the third party, can access when you visit the website. A web beacon, pixel or tag is a small,
				usually-transparent image placed on a web page that allows the operator of that image, which may be the operator of the website you visit or a
				third party, to read or write a Cookie.
			</p>
			<p>
				Your operating system and web browser may allow you to erase information stored in Cookies and local browser storage. But if you do so, you may
				be required to login to the Services again, and you may lose some preferences or settings. You may also be able to set your browser to refuse
				all website storage or to indicate when it is permitted, but some features of our Services may not function properly without it. We may use
				Cookies to keep you logged in, save your preferences for the Services, and to collect information about how you use our Services.
			</p>
			<p>
				More information about managing Cookies is available here. To learn how to manage privacy and storage settings for your local browser storage,
				please refer to the end-user documentation for your browser.
			</p>
			<p>
				Tracking Technologies may collect information automatically, in which case Personal Information and non-Personal Information it receives are
				subject to the Tracking Technology’s privacy policy. Some Tracking Technologies may allow you to opt out of certain collection and/or uses of
				your information. We may replace any of these Tracking Technologies without notice to you. For more information about the privacy practices of
				the Tracking Technologies that Broadsign currently uses (and/or that we reserve the right to use), please read more{" "}
				<Link to="privacyVendors">here</Link>.
			</p>
			<h2>8. Transparency and Choice; Do Not Track Signals</h2>
			<p>
				You may request access to your Personal Information by sending an email to{" "}
				<Link to="mailto:privacy@broadsign.com" className="mailto_privacy">
					privacy@broadsign.com
				</Link>
				. We will try to locate and provide you with your Personal Information and give you the opportunity to correct this data, if it is inaccurate,
				or to delete it, at your request. However, in either case, we may need to retain it for legal reasons or for legitimate business purposes. You
				may also remove any content that you post to the Services using the deletion or removal options within the Services. However, we (and you) are
				not able to control information that you have already shared with other users or made available to third parties through the Services.
			</p>
			<p>
				If you need further assistance with removing any content you posted through the Services, you can email us at{" "}
				<Link to="mailto:privacy@broadsign.com" className="">
					privacy@broadsign.com
				</Link>
				. Removal of your posted content may not ensure complete or comprehensive removal from our computer systems.
			</p>
			<p>
				We ask individual users to identify themselves and the information requested to be accessed, corrected, or removed before processing such
				requests, and we may decline to process requests that are unreasonably repetitive or systematic, require disproportionate technical effort,
				jeopardize the privacy of others, would be extremely impractical (for instance, requests concerning information residing on backups), or relate
				to information that is not associated with your Personal Information. In any case, where we provide information access and correction, we
				perform this service free of charge, except if doing so would require a disproportionate effort. We may also require you to verify your identity
				to our satisfaction before providing you with access to Personal Information.
			</p>
			<p>
				Please be aware that if you request us to delete your Personal Information, you may not be able to continue to use the Services. Also, even if
				you request that we delete your Personal Information, we may need to retain certain information for a limited period of time to satisfy our
				legal, audit and/or dispute resolution requirements.
			</p>
			<p>
				We may use third-party service providers that collect information for interest-based advertising purposes (advertisements that are tailored to
				your likely interests, based on categories in which you have shown an interest). To learn more about these third parties and the choices they
				offer users, please visit the Network Advertising Initiative’s <Link to="https://www.networkadvertising.org/choices/">choices page</Link> or the
				Digital Advertising Alliance’s <Link to="https://www.aboutads.info/choices/">choices page</Link>. If you are reading this Privacy Policy from a
				mobile device, you can learn more about the DAA's mobile choices program <Link to="https://www.aboutads.info/appchoices">here</Link>.
			</p>
			<p>
				We support the development and implementation of a standard "do not track" browser feature that provides customers with control over the
				collection and use of information about their web-browsing activities. Once a standardized "do not track" feature is released, we intend to
				adhere to the browser settings accordingly.
			</p>
			<p>
				You can opt out of receiving marketing e-mails from us by clicking on the “unsubscribe” link in the e-mails. Please note that we use multiple
				Service Providers for sending marketing e-mails, and if you unsubscribe via a specific email, your request will only affect correspondence from
				that particular Service Provider; it will not automatically apply to all future marketing e-mails sent through our other Service Providers.
				Therefore, you may continue to receive marketing emails from other Service Providers unless you unsubscribe from each individually or contact us
				directly at{" "}
				<Link to="mailto:privacy@broadsign.com" className="mailto_privacy">
					privacy@broadsign.com
				</Link>{" "}
				to have your preferences updated across all systems. Additionally, please be aware that it may take up to ten (10) business days for your
				opt-out request to be processed. Also, even if you opt out of marketing e-mails, we may continue to send you certain account-related e-mails,
				such as notices about your account and confirmations of transactions you have requested.
			</p>
			<h2>9. Certain United States Residents</h2>
			<p>
				You may be aware that certain states in the United States have enacted mandatory privacy laws that provide residents of those states with
				certain rights regarding their personal information. As of the date this Privacy Policy was last updated, such states include California,
				Virginia, Colorado, Connecticut, Utah, Oregon, Texas, Montana, Delaware, Iowa, Nebraska, New Hampshire, and New Jersey.
			</p>
			<p>
				If you reside in the State of California, please{" "}
				<button className="div" onClick={() => scrollTo("california")}>
					click here
				</button>{" "}
				to learn more about your privacy rights. Our Services are not currently subject to the laws in Virginia, Colorado, Connecticut, Utah, Oregon,
				Texas, Montana, Delaware, Iowa, Nebraska, New Hampshire, and New Jersey. However, we do provide notice and transparency about our collection and
				use of Personal Information as described in this Privacy Policy.
			</p>
			<h2>10. Residents of Nevada</h2>
			<p>
				We do not sell your Personal Information. However, you may contact us at{" "}
				<Link to="mailto:privacy@broadsign.com" className="mailto_privacy">
					privacy@broadsign.com
				</Link>{" "}
				with questions.
			</p>
			<h2>11. Residents of Canada</h2>
			<p>
				If you have an objection to the use of your Personal Information as described in this Privacy Policy, you may file a complaint by sending an
				email to{" "}
				<Link to="mailto:privacy@broadsign.com" className="mailto_privacy">
					privacy@broadsign.com
				</Link>
				. We will attempt to accommodate your objection or complaint, but you understand that, to the extent you object to our processing of Personal
				Information that is necessary for us to provide the Services to you, certain features and functionalities of the Services may no longer be
				available to you. Nothing in this Privacy Policy prejudices your rights to file a complaint with the Office of the Privacy Commissioner of
				Canada, and/or with any other applicable data protection authorities. Further, we remain responsible for the Personal Information in our
				possession or custody, including information that we transfer to third parties for processing. When we engage Service Providers to handle
				Personal Information on our behalf, we make sure through our agreements and practices that those Service Providers provide a comparable level of
				protection for the Personal Information as we do.
			</p>
			<h2>12. Third Party Websites</h2>
			<p>
				Please note that the Services may link to or integrate with third-party sites, services or apps. We are not responsible for the privacy or
				security policies or practices or the content of such third parties. Accordingly, we encourage you to review the privacy and security policies
				and terms of service of those third parties so that you understand how they collect, use, share and protect your information.
			</p>
			<h2>13. Changes to this Privacy Policy</h2>
			<p>
				We may modify or update this Privacy Policy periodically with or without prior notice by posting the updated policy on this page. You can always
				check the “Last Updated” date at the top of this document to see when the Privacy Policy was last changed. If we make any material changes to
				this Privacy Policy, we will notify you by reasonable means, which may be by e-mail or posting a notice of the changes on our website or through
				the Services’ mobile app prior to the changes becoming effective. We encourage you to check this Privacy Policy from time to time. IF YOU DO NOT
				AGREE TO CHANGES TO THIS PRIVACY POLICY, YOU MUST STOP USING THE SERVICES AFTER THE EFFECTIVE DATE OF SUCH CHANGES (WHICH IS THE “LAST UPDATED”
				DATE OF THIS PRIVACY POLICY).
			</p>
			<h2>14. How to Contact Us</h2>
			<p>
				For any questions or concerns regarding this Privacy Policy or Broadsign's treatment of Personal Information, please feel free to contact us at
				<Link to="mailto:privacy@broadsign.com" className="">
					privacy@broadsign.com
				</Link>{" "}
				or write to us at: <address>700 René-Lévesque Blvd W, Suite 1200, Montreal, Quebec Canada H3B 1X8</address>.
			</p>
			<hr />
			<h2 id="california">Privacy Notice for California Residents</h2>
			<p>
				This Privacy Notice for California Residents (the “<b>Notice</b>”) supplements the information contained in our{" "}
				<Link to="privacyPolicy">Privacy Policy</Link> and applies only if you reside in the State of California (you are a “<b>California Consumer</b>
				”).
			</p>
			<p>
				For purposes of this Notice “Sell,” “Selling,” “Sale,” or “Sold,” means selling, renting, releasing, disclosing, disseminating, making
				available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, Personal Information to another
				business or a third party for monetary or other valuable consideration.
			</p>
			<p>
				“Share”, “Shared,” or “Sharing” means sharing, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise
				communicating orally, in writing, or by electronic or other means, Personal Information to a third party for Cross-context Behavioral
				Advertising, whether or not for monetary or other valuable consideration.
			</p>
			<p>
				“Cross-context Behavioral Advertising” means the targeting of advertising to a consumer based on that consumer’s Personal Information obtained
				from activity across businesses or distinctly-branded websites, applications, or services, other than the business or distinctly-branded
				website, application, or service with which the consumer intentionally interacts. (In other words, if we send you an ad based solely on your
				interaction with us or our Services, this is not Cross-context Behavioral Advertising.)
			</p>
			<p>“Sensitive Personal Information” means Personal Information that is not publicly available and reveals one or more of the following:</p>
			<ul>
				<li>A consumer’s Social Security, driver’s license, state identification card, or passport number;</li>
				<li>
					A consumer’s account log-in, financial account, debit card or credit card number in combination with any required security or access code,
					password, or credentials allowing access to an account;
				</li>
				<li>A consumer’s precise geolocation;</li>
				<li>A consumer’s racial or ethnic origin, religious or philosophical beliefs, or union membership;</li>
				<li>The contents of a consumer’s mail, email, and text messages unless we are the intended recipient of the communication;</li>
				<li>A consumer’s genetic or biometric data;</li>
				<li>A consumer’s neural data; or</li>
				<li>Personal Information collected and analyzed concerning a consumer’s health, sex life, or sexual orientation.</li>
			</ul>
			<p>
				“Verifiable Request” means that the identifying information provided by a consumer in connection with a request matches the Personal Information
				of the consumer already maintained by us. Identifying information you can submit in order to permit Broadsign to verify your Verifiable Request
				may include your first and last name, certain information related to your business and other qualifying business information you provide to us,
				and the email address and phone number that is associated with your account.
			</p>
			<h3>1. Information We Collect</h3>
			<p>In the past twelve (12) months, Broadsign has collected the following categories of Personal Information from California residents:</p>
			<ul>
				<li>Identifiers (names, personal or business addresses, email addresses, and IP addresses).</li>
				<li>Other information which is not required to use our Services but that you choose to provide to us through an online form.</li>
			</ul>
			<p>In the past twelve (12) months, Broadsign has not collected Sensitive Personal Information from California residents.</p>
			<p>Broadsign obtains this Personal Information from the following types of sources:</p>
			<ul>
				<li>Directly from you. For example, from forms you complete or products and services that you purchase.</li>
				<li>
					Indirectly from you. For example, from information automatically sent by your web browser or from analyzing data about your actions on our
					website.
				</li>
			</ul>
			<h3>2. Use of Personal Information</h3>
			<p>Broadsign may use, Share, or disclose the Personal Information we collect for one or more of the following “Business Purpose(s):”</p>
			<ul>
				<li>To fulfill or meet the reason you provided the information;</li>
				<li>To provide our website or online services, and improve our online operations;</li>
				<li>To facilitate Cross-context Behavioral Advertising;</li>
				<li>To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations;</li>
				<li>To respond to your requests under the California Consumer Privacy Act of 2018 (the “CCPA”), as amended;</li>
				<li>To perform research and analysis aimed at improving our products and services and developing new products or services; </li>
				<li>For any other purpose described to you when we collect your Personal Information; and</li>
				<li>For any other acceptable purposes as set forth in the CCPA. </li>
			</ul>
			<p>
				Unless we notify you otherwise, we will not collect additional categories of Personal Information, nor use the Personal Information we collect
				for any other materially different, unrelated, or incompatible purposes.
			</p>
			<h3>3. Retention of Personal Information</h3>
			<p>
				We retain each category of your Personal Information for no longer than is reasonably necessary for one or more Business Purposes, subject to
				your right to request we delete your Personal Information. Due to the nature of the Services, it is not possible to predict the length of time
				that we intend to retain your Personal Information. Instead, we use the following criteria to determine whether it remains reasonably necessary
				to retain your Personal Information for one or more disclosed Business Purpose(s):
			</p>
			<ul>
				<li>Whether or not there is a retention period required by statute or regulations;</li>
				<li>Pendency of any actual or threatened litigation for which we are required to preserve the information;</li>
				<li>Generally accepted best practices in our industry; and/or</li>
				<li>Pendency of applicable statutes of limitations for potential legal claims.</li>
			</ul>
			<p>
				When we determine that it is no longer reasonably necessary to retain your Personal Information for one or more disclosed Business Purpose(s)
				based on the above criteria, we will delete your Personal Information.
			</p>
			<h3>4. Disclosure of Personal Information</h3>
			<p>
				Broadsign may disclose Personal Information to our “service providers”, to our “contractors”, and to “third parties” (each as defined by the
				CCPA) for a Business Purpose. When we disclose Personal Information for a Business Purpose, we enter into an agreement with the receiving party
				that describes the purpose for sharing the Personal Information, and that requires the receiving party to keep that Personal Information
				confidential. In the case of disclosures to our “service providers,” our “service providers” are obligated not to use the Personal Information
				for any purpose other than performing the services according to their agreement with us. In the case of our “contractors”, our “contractors’ are
				obligated not to use the Personal Information for any purpose unrelated to the business purpose for which we’ve engaged them.
			</p>
			<p>
				We may disclose your Personal Information with the following categories of entities: (i) “service providers”, (ii) “contractors,” and (iii) our
				“third party” industry business partners.
			</p>
			<p>In the past twelve (12) months, Broadsign has not Sold any Personal Information about its California Consumers. </p>
			<p>
				We Share Personal Information, subject to your right to opt-out of those Sharing. In the past twelve (12) months, Broadsign has Shared the
				following categories of Personal Information about its California Consumers:
			</p>
			<table>
				<tr>
					<th>Category of personal information that is Shared</th>
					<th>Business Purpose for which it is Shared</th>
					<th>Types of entities to whom it is Shared</th>
				</tr>
				<tr>
					<td>Your identifiers (names, personal or business addresses, email addresses, and IP addresses).</td>
					<td>To facilitate Cross-context Behavioral Advertising</td>
					<td>Third party industry business partners, Service Providers and contractors. </td>
				</tr>
				<tr>
					<td>Other information which is not required to use our Services but that you choose to provide to us through an online form.</td>
					<td>To facilitate Cross-context Behavioral Advertising</td>
					<td>Third party industry business partners, Service Providers and contractors. </td>
				</tr>
			</table>
			<h3>5. Your Rights and Choices</h3>
			<p>
				If you are a California Consumer, you may request information about our collection, use, disclosure and Sale of your Personal Information over
				the past twelve (12) months, whether or not it was collected electronically. If you submit a Verifiable Request, we will provide you with
				information regarding:
			</p>
			<ul>
				<li>
					the categories of Personal Information we have collected about you; the categories of sources from which your Personal Information was
					collected; our Business Purpose for collecting, Selling, or Sharing your Personal Information; the categories of third parties with whom we
					disclose that Personal Information; and the specific pieces of Personal Information we collected about you; and
				</li>
				<li>
					if we Sold, Shared, or disclosed your Personal Information for a Business Purpose: what categories of Personal Information we Sold or
					Shared, and to which categories of recipients we Sold or Shared it; and what categories of Personal Information we disclosed for a Business
					Purpose, and to which categories of recipients we disclosed it.
				</li>
			</ul>
			<p>
				You also have the right to request a copy of your Personal Information, and/or to request that we transmit your Personal Information to another
				entity. To the extent technically feasible, we will comply with your request and provide and/or transmit your Personal Information in a
				structured, commonly used, machine-readable format. Please note that we may deny a request if it is excessive, repetitive, or clearly unfounded,
				as permitted by the CCPA.
			</p>
			<p>
				You also have the right to request that we delete any of your Personal Information that we collect or maintain by submitting a Verifiable
				Request. We may deny your deletion request if retaining your Personal Information is necessary for us or our “service providers” or
				“contractors” to:
			</p>
			<ul>
				<li>
					Complete the transaction for which we collected your Personal Information, fulfill the terms of a written warranty or product recall
					conducted in accordance with federal law, provide goods or services that you requested, take actions reasonably anticipated by you within
					the context of our ongoing business relationship with you, or otherwise perform our contract with you;
				</li>
				<li>
					Help to ensure security and integrity to the extent the use of your Personal Information is reasonably necessary and proportionate for those
					purposes;
				</li>
				<li>Debug products to identify and repair errors that impair existing intended functionality;</li>
				<li>
					Exercise free speech, ensure the right of another consumer to exercise that consumer’s right of free speech, or exercise another right
					provided for by law;
				</li>
				<li>Comply with the California Electronic Communications Privacy Act (Cal. Penal Code § 1546 et. seq.);</li>
				<li>
					Engage in public or peer-reviewed scientific, historical, or statistical research that conforms or adheres to all other applicable ethics
					and privacy laws, when the information’s deletion may likely render impossible or seriously impair the ability to complete such research, if
					you previously provided informed consent;
				</li>
				<li>
					Enable solely internal uses that are reasonably aligned with consumer expectations based on your relationship with us and compatible with
					the context in which you provided the information; or
				</li>
				<li>Comply with a legal obligation.</li>
			</ul>
			<p>
				You further have the right to request that we correct any of your Personal Information that is inaccurate by submitting a Verifiable Request. We
				will correct any inaccurate Personal Information pursuant to your request to the extent possible using commercially reasonable efforts. We may
				deny your correction request if the Personal Information is accurate. We may also delete your Personal Information instead of correcting it to
				the extent such deletion would not negatively impact you. If you choose to exercise a privacy right under the CCPA, you have the right not to
				receive discriminatory treatment.
			</p>
			<p>
				You may submit a Verifiable Request for the information listed above, or exercise any of your rights enumerated under this Notice, by calling us
				at +1 877 399 1184 or 514-399-1184, or by completing a form on our website, available here. You may also submit a Verifiable Request on behalf
				of your minor child.
			</p>
			<p>
				After we receive your Verifiable Request, we will provide to you, in writing and free of charge (unless your request is excessive, repetitive,
				or manifestly unfounded), the requested information for the 12-month period preceding your request (unless you specifically request disclosure
				beyond such 12-month period, in which case, we will process your request with respect to Personal Information we have collected during the time
				period you specify, provided that (a) the earliest date that your request may apply to is January 1, 2022, and (b) processing your request does
				not require disproportionate effort). You can choose to have this information delivered to you by postal mail, or electronically. We will try to
				respond to your verified request within forty-five (45) days of receipt, but if we require more time (up to another forty-five (45) days) we
				will inform you of the reason and extension period in writing. Please note that we are not required to comply with your request for information
				more than twice in any 12-month period. If applicable, our response will explain the reasons why we cannot comply with your request.
			</p>
			<h1>SUPER IMPORTANT STEP TO COMPLETE HERE</h1>
			<p>
				You have the right to direct us to stop Sharing your Personal Information to third parties at any time. You may opt-out here. However, if you
				change your mind, you may opt-in to Personal Information Sharing at any time by [INSERT OPT-IN INSTRUCTIONS OR LINK]. Consumers who opt-in to
				Personal Information Sharing may opt-out of future Sharing at any time.
			</p>
			<p>Broadsign does not and will not, without first obtaining your consent, Sell Personal Information.</p>
			<ul>
				<li>Should you choose to exercise any of the rights enumerated under this Notice, we will not:</li>
				<li>Deny you goods or services;</li>
				<li>
					Charge you different prices or rates for goods or services, including through granting discounts or other benefits, or imposing penalties;
				</li>
				<li>Provide you a different level or quality of goods or services; or</li>
				<li>Suggest that you may receive a different price or rate for goods or services or a different level or quality of goods or services.</li>
			</ul>

			<p>
				However, please be aware that it may be a functional necessity for our Services to have Personal Information about you in order to operate, and
				we may not be able to provide some or all of our Services to you if you direct us to delete your Personal Information.
			</p>
			<hr />
			<h2 id="eu">Privacy Notice for European Residents</h2>
			<p>
				If you reside in a country in the European Economic Area, the United Kingdom, or Switzerland (a “European Resident”) or the United Kingdom (a
				“UK Resident”), then information we collect from you may be subject to Regulation (EU) 2016/679 of the European Parliament and of the Council of
				27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and
				repealing Directive 95/46/EC (the “EU GDPR”), Regulation (EU) 2016/679 of the European Parliament and of the Council of 27th April 2016 on the
				protection of natural persons with regard to the processing of personal data and on the free movement of such data (General Data Protection
				Regulation), as implemented by the UK Data Protection Act of 2018, and as it forms part of the law of England and Wales, Scotland and Northern
				Ireland by virtue of Section 3 of the European Union (Withdrawal) Act 2018 (the “UK GDPR”), or the equivalent laws of the United Kingdom and
				Switzerland (collectively, “Data Protection Laws”), and the following additional information is provided for your benefit. For purposes of this
				Privacy Notice for European Residents, in addition to the meaning set forth in the Privacy Policy, “Personal Information” shall also include
				“personal data” as that term is defined by the EU GPDR and UK GDPR, as well as “personal data” or similar terminology as defined by other
				applicable Data Protection Laws.
			</p>
			<p>The controller of the Personal Information collected through the Services is:</p>
			<div className="bg-zircon inline-block p-6 rounded-xl mb-10">
				<address>
					<p className="m-0">
						<b>Broadsign International, Inc.</b>
					</p>
					<p className="m-0">700 René-Lévesque Blvd W, Suite 1200</p>
					<p className="m-0">Montreal, Quebec, Canada H3B 1X8</p>
				</address>
			</div>
			<p>
				If you use the Services, you acknowledge that your Personal Information is being processed pursuant to the lawful bases described below, and you
				specifically consent to your Personal Information gathered through the Services being transferred, used, and stored in the United States or
				other third party countries which do not have local privacy laws that are equivalent to the Data Protection Laws. You acknowledge and agree that
				the local laws in such countries may be materially different from, and provide for a lesser degree of protection regarding your Personal
				Information (including, but not limited to, with respect to governmental and law enforcement agencies’ ability to access your Personal
				Information under certain conditions) than, Data Protection Laws.
			</p>
			<h3>1. Personal Information</h3>
			<p>If you use the Services, we may collect certain categories of Personal Information, as described in Section 2 of the Privacy Policy.</p>
			<h3>2. Your Rights</h3>
			<p>You have the following rights under applicable Data Protection Laws:</p>
			<ul>
				<li>
					You have the right to know why we collect your Personal Information, how and why it is processed by us, and what our legal bases for such
					processing are.
				</li>
				<li>Right of access: you have the right to access your Personal Information.</li>
				<li>
					Right to rectification and deletion: you have the right to supplement or correct the Personal Information we’ve collected about you, or to
					direct us to delete your Personal Information.
				</li>
				<li>If you give us your consent to process your Personal Information, you have the right to revoke that consent.</li>
				<li>
					Right to data portability: you have the right to request that we transfer all your Personal Information to another controller in a
					reasonably understandable format.
				</li>
				<li>
					Right to object: you may object to our processing of your Personal Information. We will make commercially reasonable efforts to comply with
					your objection, unless there are legally permissible reasons why we can or must continue to process your Personal Information.
				</li>
			</ul>
			<h3>3. Lawful Bases for Processing</h3>
			<p>
				Under European law, companies must have a legal basis to process data. You have particular rights available to you depending on which legal
				basis we use, and we've explained these above. You always have the right to request access to, rectification of, and erasure of your data under
				applicable Data Protection Laws. To exercise your rights, please email us at{" "}
				<Link to="mailto:privacy@broadsign.com" className="mailto_privacy">
					privacy@broadsign.com
				</Link>
				.
			</p>
			<h4>Pursuant to a contract with you:</h4>
			<p>
				We may process data as necessary to perform our contracts with you. We describe the contractual services for which this data processing is
				necessary throughout our <Link to="privacyPolicy">Privacy Policy</Link>. The main uses of your data necessary to provide our contractual
				services are described in the “Use of Your Information” section of the <Link to="privacyPolicy">Privacy Policy</Link>.
			</p>
			<p>
				We'll use the Personal Information we have to provide the Services and as otherwise described in our{" "}
				<Link to="privacyPolicy">Privacy Policy</Link> if you choose not to provide certain data, the quality of your experience using the Services may
				be negatively impacted.
			</p>
			<p>
				When we process data you provide to us as necessary to perform our contracts with you, you have the right to receive a portable copy of it
				(meaning to receive a copy of your data in a structured, commonly used and machine-readable format) under applicable Data Protection Laws. To
				exercise your rights, please email us at{" "}
				<Link to="mailto:privacy@broadsign.com" className="mailto_privacy">
					privacy@broadsign.com
				</Link>
				.
			</p>
			<p>The other legal bases we rely on in certain instances when processing your data are:</p>
			<h4>Your Consent:</h4>
			<p>We may process your Personal Information on the lawful basis of consent.</p>
			<p>
				When we process data you provide to us based on your consent, you have the right to withdraw your consent at any time and to receive a portable
				copy of the data you provide to us, under applicable Data Protection Laws. To exercise your rights, please email us at{" "}
				<Link to="mailto:privacy@broadsign.com" className="mailto_privacy">
					privacy@broadsign.com
				</Link>
				.
			</p>
			<h4>Legitimate Interests:</h4>
			<p>
				We may process your Personal Information where our legitimate interests, or the legitimate interests of a third party, are not outweighed by
				your interests or fundamental rights and freedoms.
			</p>
			<p>The legitimate interests for our processing of Personal Information are to:</p>
			<ul>
				<li>Assist us in providing, maintaining, and protecting the Services;</li>
				<li>Set up, maintain, and protect accounts to use the Services;</li>
				<li>Improve our online operations;</li>
				<li>Process transactions;</li>
				<li>Provide customer service;</li>
				<li>
					Communicate with you, such as provide you with account- or transaction-related communications, or other newsletters, RSS feeds, and/or other
					communications relating to the Services;
				</li>
				<li>Send or display offers and other content that is customized to your interests or preferences;</li>
				<li>Perform research and analysis aimed at improving our products and services and developing new products or services;</li>
				<li>Manage and maintain the systems that provide the Services</li>
				<li>
					Prevent and address fraud, unauthorized use of the Services, violations of our terms and policies, or other harmful or illegal activity; to
					protect ourselves (including our rights, property or products), our users or others, including as part of investigations or regulatory
					inquiries; or to prevent death or imminent bodily harm; and
				</li>
				<li>Operate our day-to-day business and planning, including executing strategic corporate transactions, such as mergers.</li>
			</ul>
			<p>
				You have the right to object to, and seek restriction of, such processing; to exercise your rights, please email us at{" "}
				<Link to="mailto:privacy@broadsign.com" className="mailto_privacy">
					privacy@broadsign.com
				</Link>
				.
			</p>
			<p>
				We will consider several factors when assessing an objection to our processing in furtherance of Broadsign’s legitimate interests, including:
				our users' reasonable expectations; the benefits and risks to you, us, other users, or third parties; and other available means to achieve the
				same purpose that may be less invasive and do not require disproportional effort. Your objection will be upheld, and we will cease processing
				your information, unless the processing is based on compelling legitimate grounds or is needed for legal reasons.
			</p>
			<h4>Compliance with a legal obligation:</h4>
			<p>
				We need to process your Personal Information when applicable law requires it, including, for example, if there is a valid legal request for
				certain data.
			</p>
			<h3>4. Disclosures of Your Information</h3>
			<p>“Processors” means our Service Providers and their respective service providers.</p>
			<p>
				We may also disclose your Personal Information, (as well as Usage Data, without the same restrictions that apply to your Personal Information)
				to our Processors who we engage to perform certain functions for us, or on our behalf (including, but not limited to, processing of payments,
				provision of data storage, hosting of our website, marketing of our products and services, conducting audits, and performing web analytics). A
				list of our Processors and a description of the services that they perform for us follows. We establish data processing agreements that govern
				our Processors’ use of your Personal Information, but our Processors’ use of your Personal Information may also be subject to the Processors’
				own privacy policies. Please click <Link to="privacyVendors">here</Link> to review the links to our Processors’ privacy policies.
			</p>
			<h3>5. Retention of Your Information</h3>
			<p>
				We retain each category of your Personal Information for no longer than is reasonably necessary for one or more of the above lawful bases for
				processing, subject to your right to request we delete your Personal Information. Due to the nature of the services, it is not possible to
				predict the length of time that we intend to retain your Personal Information. Instead, we use the following criteria to determine whether it
				remains reasonably necessary to retain your Personal Information for one or more disclosed lawful bases for processing:
			</p>
			<p>
				When we determine that it is no longer reasonably necessary to retain your Personal Information for one or more disclosed lawful bases for
				processing based on the above criteria, we will delete your Personal Information.
			</p>
			<h3>6. Questions and Complaints</h3>
			<p>
				If you have any questions or complaints regarding our use of your Personal Information, please contact us at{" "}
				<Link to="mailto:privacy@broadsign.com" className="">
					privacy@broadsign.com
				</Link>
				. You also have the right to submit a complaint to your applicable Data Protection Authority.
			</p>
		</>
	);
}
