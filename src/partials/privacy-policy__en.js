import React from "react";
import T from "i18n-react";
import clsx from "clsx";
import { Element } from "react-scroll";

import Collapse from "@components/Collapse";
import Container from "@components/Container";
import Form from "@components/Form";
import Panel from "@components/Panel";

export default function privacyPolicy__en({ openCookiePolicy }) {
	return (
		<div>
			<Container>
				<h1>Privacy Policy</h1>
				<p>
					At Broadsign we recognize that privacy is important. This Privacy Policy applies to all of the products, services and websites offered by
					Broadsign International, Inc. or its subsidiaries or affiliated companies; collectively, Broadsign's “services”.
				</p>
				<p>
					For any questions or concerns regarding this Privacy Policy or Broadsign's treatment of personal information, please feel free to contact us
					at <a href="mailto:broadsign-info@broadsign.com">broadsign-info@broadsign.com</a> or write to us at: 700 Ave René-Lévesque O., Suite 1200,
					12<sup>th</sup> Floor, Montreal, Quebec Canada H3B 1X8.
				</p>
				<h3>EU-US, SWISS-US PRIVACY SHIELD, CANADA'S ANTI-SPAM LEGISLATION AND PERSONAL INFORMATION PROTECTION AND ELECTRONIC DOCUMENT ACT NOTICE</h3>
				<p>
					We may receive Personal Data from individuals in the European Economic Area and/or Switzerland. We adhere to the EU-US and the Swiss-US
					Privacy Shield Principles (Privacy Shield Principles), with respect to the collection, use, and retention of Personal Data from the European
					Economic Area and Switzerland. If there is any conflict between the terms in this Privacy Statement and the Privacy Shield Principles, with
					respect to the processing of Personal Data from the European Economic Area and/or Switzerland, the Privacy Shield Principles shall govern.
					For more information about the Privacy Shield Framework, and to view Premier's certification, go to{" "}
					<a href="https://www.privacyshield.gov/welcome">https://www.privacyshield.gov/</a>.
				</p>
				<p>
					In compliance with the Privacy Shield Principles, we are committed to resolving complaints about our collection or use of your Personal
					Data. European Union and Swiss individuals with inquiries or complaints regarding our compliance with the Privacy Shield Principles should
					first contact us as discussed below in the “How to Contact Us” section. In certain circumstances, it may be possible for you to invoke
					binding arbitration. Broadsign is subject to the investigatory and enforcement powers of the United States Federal Trade Commission, with
					respect to its adherence to the Privacy Shield Principles.
				</p>
				<p>
					We are further committed to cooperate with European Union and Swiss data protection authorities (DPAs) with respect to any unresolved
					Privacy Shield complaints concerning your Personal Data, in the context of the employment relationship. If you do not receive timely
					acknowledgement of your complaint from us, or if we have not addressed your complaint to your satisfaction, please contact the European
					Union and/or Swiss DPAs for more information or to file a complaint. The services of the European Union and Swiss DPAs are provided at no
					cost to you.
				</p>
				<p>
					As discussed below, we may share your Personal Data with our service providers who are bound by law and/or contract to protect your Personal
					Data and may only use your Personal Data in accordance with our instructions. Under certain circumstances, we may remain liable for the acts
					of these third parties, if they subsequently process the data in a manner that is inconsistent with the Privacy Shield Principles.
				</p>
				<p>
					We may need to disclose your Personal Data when requested under legal process or as otherwise required by law, such as in response to a
					subpoena, including to meet national security and/or law enforcement requirements in the United States and other countries where we operate.
				</p>
			</Container>
			<React.Suspense>
				<Container className="mt-12">
					<Collapse title="Information we collect" active={openCookiePolicy}>
						<Element name="info_we_collect">
							<p>In order to provide our full range of services, we may collect the following types of information:</p>
						</Element>
						<p>
							Information you provide – When you sign up for a Broadsign Account or other Broadsign service or promotion that requires
							registration, we ask you for personal information (such as your name, email address and an account password). For certain services,
							we may also request credit card or other payment account information which we maintain in encrypted form on secure servers. We may
							combine the information you submit under your account with information from other Broadsign services or third parties in order to
							provide you with a better experience and to improve the quality of our services. For certain services, we may give you the
							opportunity to opt out of combining such information.
						</p>
						<p>
							Cookies – When you visit Broadsign, we send one or more cookies – a small file containing a string of characters – to your computer
							that uniquely identifies your browser. We use cookies to improve the quality of our service by storing user preferences and tracking
							user trends.
						</p>
						<p>
							Log information – When you access Broadsign services, our servers automatically record information that your browser sends whenever
							you visit a website. These server logs may include information such as your web request, Internet Protocol address, browser type,
							browser language, the date and time of your request and one or more cookies that may uniquely identify your browser.
						</p>
						<p>
							User communications – When you send email or other communications to Broadsign, we may retain those communications in order to
							process your inquiries, respond to your requests and improve our services.
						</p>
						<h5>Data sources</h5>
						<div>
							<p>We collect Personal Data only from the Data Subject unless one of the following apply:</p>
							<ul>
								<li>The nature of the business purpose necessitates collection of the Personal Data from other persons or bodies.</li>
								<li>
									The collection must be carried out under emergency circumstances in order to protect the vital interests of the Data Subject
									or to prevent serious loss or injury to another person.
								</li>
							</ul>
						</div>
						<div>
							<p>
								If Personal Data is collected from someone other than the Data Subject, we inform the Data Subject of the collection unless one
								of the following apply:
							</p>
							<ul>
								<li>The Data Subject has received the required information by other means.</li>
								<li>The information must remain confidential due to a professional secrecy obligation</li>
							</ul>
						</div>
					</Collapse>
					<Collapse title="How we use the collected information">
						<div>
							<p>Broadsign only processes personal information for the purposes described in this Privacy Policy, such purposes include:</p>
							<ul>
								<li>Maintaining general business operation and administration of Broadsign Entities;</li>
								<li>Providing services to Broadsign customers;</li>
								<li>Providing ongoing administration and management of customer services;</li>
								<li>Developing and improving Broadsign products and services.</li>
							</ul>
						</div>
						<div>
							<p>
								We Process Personal Data in accordance with all applicable laws and applicable contractual obligations. More specifically, we
								will not Process Personal Data unless at least one of the following requirements are met:
							</p>
							<ul>
								<li>The Data Subject has given Consent to the Processing of their Personal Data for one or more specific purposes;</li>
								<li>
									Processing is necessary for the performance of a contract to which the Data Subject is party or in order to take steps at
									the request of the Data Subject prior to entering into a contract;
								</li>
								<li>Processing is necessary for compliance with a legal obligation to which the Data Controller is subject;</li>
								<li>Processing is necessary in order to protect the vital interests of the Data Subject or of another natural person;</li>
								<li>
									Processing is necessary for the performance of a task carried out in the public interest or in the exercise of official
									authority vested in the Data Controller;
								</li>
								<li>
									Processing is necessary for the purposes of the legitimate interests pursued by the Data Controller or by a Third Party
									(except where such interests are overridden by the interests or fundamental rights and freedoms of the Data Subject, in
									particular where the Data Subject is a child).
								</li>
							</ul>
						</div>
						<div>
							<p>
								There are some circumstances in which Personal Data may be further processed for purposes that go beyond the original purpose
								for which the Personal Data was collected. In these circumstances, we will address the following additional conditions to
								determine the fairness and transparency of any Processing beyond the original purpose for which the Personal Data was collected:
							</p>
							<ul>
								<li>Any link between the purpose for which the Personal Data was collected and the reasons for intended further Processing.</li>
								<li>
									The context in which the Personal Data has been collected, in particular regarding the relationship between Data Subject and
									the Data Controller.
								</li>
								<li>
									The nature of the Personal Data, in particular whether Special Categories of Data are being Processed, or whether Personal
									Data related to criminal convictions and offences are being Processed.
								</li>
								<li>The possible consequences of the intended further Processing for the Data Subject.</li>
								<li>
									The existence of appropriate safeguards pertaining to further Processing, which may include Encryption, Anonymization or
									Pseudonymization.
								</li>
							</ul>
						</div>
						<p>
							Broadsign processes personal information on our servers in the United States of America, Canada and in other countries. In some
							cases, we process personal information on a server outside your own country. We may process personal information to provide our own
							services. In some cases, we may process personal information on behalf of and according to the instructions of a third party, such
							as our advertising partners.
						</p>
						<p>
							If we propose to use personal information for any purposes other than those described in this Privacy Policy and/or in the specific
							service privacy notices, we will offer you an effective way to opt out of the use of personal information for those other purposes.
							We will not collect or use sensitive information for purposes other than those described in this Privacy Policy and/or in the
							supplementary service privacy notices, unless we have obtained your prior consent.
						</p>
						<p>
							Most browsers are initially set up to accept cookies, but you can reset your browser to refuse all cookies or to indicate when a
							cookie is being sent. However, some Broadsign features and services may not function properly if your cookies are disabled.
						</p>
						<p>
							You can decline to submit personal information to any of our services, in which case Broadsign may not be able to provide those
							services to you.
						</p>
						<h5>Special categories of data</h5>
						<div>
							<p>
								We will only Process Special Categories of Data (also known as sensitive data) where the Data Subject expressly consents to such
								Processing or where one of the following conditions apply:
							</p>
							<ul>
								<li>The Processing relates to Personal Data which has already been made public by the Data Subject.</li>
								<li>The Processing is necessary for the establishment, exercise or defense of legal claims.</li>
								<li>The Processing is specifically authorized or required by law.</li>
								<li>
									The Processing is necessary to protect the vital interests of the Data Subject or of another natural person where the Data
									Subject is physically or legally incapable of giving consent.
								</li>
								<li>
									Further conditions, including limitations, based upon national law related to the Processing of genetic data, biometric data
									or data concerning health.
								</li>
							</ul>
						</div>
						<p>
							Where Special Categories of Data are being Processed, Broadsign will adopt additional protection measures. Each Broadsign Entity may
							also adopt additional measures to address local custom or social expectation over the Processing of Special Categories of Data.
						</p>
						<h5>Children Data</h5>
						<p>
							Children are unable to Consent to the Processing of Personal Data for information society services. We sought consent from the
							person who holds parental responsibility over the child. However, it should be noted that where Processing is lawful under other
							grounds, Consent need not be obtained from the child or the holder of parental responsibility.
						</p>
						<h5>Data quality</h5>
						<div>
							<p>
								We adopt all necessary measures to ensure that the Personal Data it collects and Processes is complete and accurate in the first
								instance and is updated to reflect the current situation of the Data Subject. The measures we adopted to ensure data quality
								include:
							</p>
							<ul>
								<li>
									Correcting Personal Data known to be incorrect, inaccurate, incomplete, ambiguous, misleading or outdated, even if the Data
									Subject does not request rectification.
								</li>
								<li>
									Keeping Personal Data only for the period necessary to satisfy the permitted uses or applicable statutory retention period.
								</li>
								<li>
									Removing Personal Data if in violation of any of the Data Protection principles or if the Personal Data is no longer
									required.
								</li>
								<li>
									Restricting, rather than deletion of Personal Data, insofar as:
									<ul>
										<li>A law prohibits erasure</li>
										<li>Erasure would impair legitimate interests of the Data Subject.</li>
										<li>
											The Data Subject disputes that their Personal Data is correct and it cannot be clearly ascertained whether their
											information is correct or incorrect.
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</Collapse>
					<Collapse title="Data retention">
						<p>
							We do not retain Personal Data for longer than necessary in relation to the purposes for which it was originally collected, or for
							which it was further Processed
						</p>
					</Collapse>
					<Collapse title="Data protection">
						<div>
							<p>
								We adopt physical, technical, and organizational measures to ensure the security of Personal Data. This includes the prevention
								of loss or damage, unauthorized alteration, access or Processing, and other risks to which it may be exposed by virtue of human
								action or the physical or natural environment. The measures we took include:
							</p>
							<ul>
								<li>Prevent unauthorized persons from gaining access to data processing systems in which Personal Data are Processed.</li>
								<li>
									Prevent persons entitled to use a data processing system from accessing Personal Data beyond their needs and authorizations.
								</li>
								<li>
									Ensure that Personal Data in the course of electronic transmission during transport cannot be read, copied, modified or
									removed without authorization.
								</li>
								<li>
									Ensure that access logs are in place to establish whether, and by whom, the Personal Data was entered into, modified on or
									removed from a data processing system.
								</li>
								<li>
									Ensure that in the case where Processing is carried out by a Data Processor, the data can be Processed only in accordance
									with the instructions of the Data Controller.
								</li>
								<li>Ensure that Personal Data is protected against undesired destruction or loss.</li>
								<li>Ensure that Personal Data collected for different purposes can and is Processed separately.</li>
								<li>Ensure that Personal Data is not kept longer than necessary</li>
							</ul>
						</div>
					</Collapse>
					<Collapse title="Information sharing">
						<p>
							Broadsign only shares personal information with other companies or individuals outside of Broadsign in the following limited
							circumstances:
						</p>
						<p>We have your consent. We require opt-in consent for the sharing of any sensitive personal information.</p>
						<p>
							We provide such information to our subsidiaries, affiliated companies or other trusted businesses or persons for the purpose of
							processing personal information on our behalf. We require that these parties agree to process such information based on our
							instructions and in compliance with this Privacy Policy and any other appropriate confidentiality and security measures.
						</p>
						<p>
							We have a good faith belief that access, use, preservation or disclosure of such information is reasonably necessary to (a) satisfy
							any applicable law, regulation, legal process or enforceable governmental request, (b) enforce applicable Terms of Service,
							including investigation of potential violations thereof, (c) detect, prevent, or otherwise address fraud, security or technical
							issues, or (d) protect against imminent harm to the rights, property or safety of Broadsign, its users or the public as required or
							permitted by law.
						</p>
						<p>
							If Broadsign becomes involved in a merger, acquisition, or any form of sale of some or all of its assets, we will provide notice
							before personal information is transferred and becomes subject to a different privacy policy.
						</p>
						<p>
							We may share with third parties certain pieces of aggregated, non-personal information. Such information does not identify you
							individually.
						</p>
						<p>Please contact us at the address below for any additional questions about the management or use of personal data</p>
					</Collapse>
					<Collapse title="Your rights">
						<div>
							<p>You have the rights to request:</p>
							<ul>
								<li>Information access</li>
								<li>Objection to Processing</li>
								<li>Objection to automated decision-making and profiling</li>
								<li>Restriction of Processing</li>
								<li>Data portability</li>
								<li>Data rectification</li>
								<li>Data erasure</li>
							</ul>
						</div>
						<p>
							If you make a request relating to any of the rights listed above, we will consider each such request in accordance with all
							applicable Data Protection laws and regulations. No administration fee will be charged for considering and/or complying with such a
							request unless the request is deemed to be unnecessary or excessive in nature.
						</p>
						<div>
							<p>
								You are entitled to obtain, based upon a request made in writing and upon successful verification of your identity, the
								following information about your Personal Data:
							</p>
							<ul>
								<li>The purposes of the collection, Processing, use and storage of their Personal Data.</li>
								<li>The source(s) of the Personal Data, if it was not obtained from the Data Subject;</li>
								<li>The categories of Personal Data stored for the Data Subject.</li>
								<li>
									The recipients or categories of recipients to whom the Personal Data has been or may be transmitted, along with the location
									of those recipients.
								</li>
								<li>The envisaged period of storage for the Personal Data or the rationale for determining the storage period.</li>
								<li>The use of any automated decision-making, including Profiling.</li>
								<li>
									The right of the Data subject to:
									<ul>
										<li>Object to Processing of their Personal Data.</li>
										<li>Lodge a complaint with the Data Protection Authority.</li>
										<li>Request rectification or erasure of their Personal Data.</li>
										<li>Request restriction of Processing of their Personal Data.</li>
									</ul>
								</li>
							</ul>
						</div>
						<p>
							A response to each request will be provided within 30 days of the receipt of the written request from the Data Subject. Appropriate
							verification must confirm that the requestor is the Data Subject or their authorized legal representative. Data Subjects shall have
							the right to require Broadsign to correct or supplement erroneous, misleading, outdated, or incomplete Personal Data.
						</p>
						<div>
							<p>
								If we cannot respond fully to the request within 30 days, we will nevertheless provide the following information to you, or your
								authorized legal representative within the specified time:
							</p>
							<ul>
								<li>An acknowledgement of receipt of the request</li>
								<li>Any information located to date</li>
								<li>
									Details of any requested information or modifications which will not be provided to the Data Subject, the reason(s) for the
									refusal, and any procedures available for appealing the decision
								</li>
								<li>An estimated date by which any remaining responses will be provided</li>
								<li>An estimate of any costs to be paid by the Data Subject (e.g. where the request is excessive in nature)</li>
								<li>The name and contact information of the Broadsign individual who the Data Subject should contact for follow up</li>
							</ul>
						</div>
						<p>
							It should be noted that situations may arise where providing the information requested by a Data Subject would disclose Personal
							Data about another individual. In such cases, information must be redacted or withheld as may be necessary or appropriate to protect
							that person's rights.
						</p>
						<p>To request access to your data, please use the form below.</p>
						<Panel className="bg-zircon rounded-xl shadow-A">
							<Form form="privacyPolicy" submitText="Send Request" thankYouMessage="privacyPolicy" />
						</Panel>
					</Collapse>
					<Collapse title="Law enforcement requests and disclosures">
						<div>
							<p>
								If requested by the law enforcement agencies or judicial courts, Personal Data may be shared without the knowledge or Consent of
								a Data Subject. This is the case where the disclosure of the Personal Data is necessary for any of the following purposes:
							</p>
							<ul>
								<li>The prevention or detection of crime</li>
								<li>The apprehension or prosecution of offenders</li>
								<li>The assessment or collection of a tax or duty</li>
								<li>By the order of a court or by any rule of law</li>
							</ul>
						</div>
						<p>
							If we Process Personal Data for one of these purposes, then it may apply an exception to the Processing rules outlined in this
							policy but only to the extent that not doing so would be likely to prejudice the case in question.
						</p>
					</Collapse>
					<Collapse title="Changes to this privacy policy">
						<p>
							Please note that this Privacy Policy may change from time to time. We will not reduce your rights under this Privacy Policy without
							your explicit consent, and we expect most such changes will be minor. Regardless, we will post any Privacy Policy changes on this
							page and, if the changes are significant, we will provide a more prominent notice. Each version of this Privacy Policy will be
							identified at the top of the page by its effective date, and we will also keep prior versions of this Privacy Policy in an archive
							for your review.
						</p>
						<p>
							If we Process Personal Data for one of these purposes, then it may apply an exception to the Processing rules outlined in this
							policy but only to the extent that not doing so would be likely to prejudice the case in question.
						</p>
					</Collapse>
					<Collapse title="Definitions">
						<p>Following terms used in this privacy policy are defined as follows.</p>
						<p>
							<b>Third Party</b>: An external organisation with which Broadsign conducts business and is also authorised to, under the direct
							authority of Broadsign, Process the Personal Data of Broadsign Contacts.
						</p>
						<p>
							<b>Personal Data</b>: Any information (including opinions and intentions) which relates to an identified or Identifiable Natural
							Person.
						</p>
						<p>
							<b>Contact</b>: Any past, current or prospective Broadsign customer.
						</p>
						<p>
							<b>Identifiable Natural Person</b>: Anyone who can be identified, directly or indirectly, in particular by reference to an
							identifier such as a name, an identification number, location data, an online identifier, or one or more factors specific to the
							physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.
						</p>
						<p>
							<b>Data Controller</b>: A natural or legal person, Public Authority, Agency or other body which, alone or jointly with others,
							determines the purposes and means of the Processing of Personal Data.
						</p>
						<p>
							<b>Broadsign Entity</b>: A Broadsign establishment, including subsidiaries and joint ventures over which Broadsign exercise
							management control.
						</p>
						<p>
							<b>Data Subject</b>: The identified or Identifiable Natural Person to which the data refers.
						</p>
						<p>
							<b>Process, Processed, Processing</b>: Any operation or set of operations performed on Personal Data or on sets of Personal Data,
							whether or not by automated means. Operations performed may include collection, recording, organisation, structuring, storage,
							adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available,
							alignment or combination, restriction, erasure or destruction.
						</p>
						<p>
							<b>Data Protection</b>: The process of safeguarding Personal Data from unauthorised or unlawful disclosure, access, alteration,
							Processing, transfer or destruction.
						</p>
						<p>
							<b>Data Protection Authority</b>: An independent Public Authority responsible for monitoring the application of the relevant Data
							Protection regulation set forth in national law.
						</p>
						<p>
							<b>Consent</b>: Any freely given, specific, informed and unambiguous indication of the Data Subject's wishes by which he or she, by
							a statement or by a clear affirmative action, signifies agreement to the Processing of Personal Data relating to him or her.
						</p>
						<p>
							<b>Special Categories of Data</b>: Personal Data pertaining to or revealing racial or ethnic origin, political opinions, religious
							or philosophical beliefs, trade-union membership; data concerning health or sex life and sexual orientation; genetic data or
							biometric data.
						</p>
						<p>
							<b>Profiling</b>: Any form of automated processing of Personal Data where Personal Data is used to evaluate specific or general
							characteristics relating to an Identifiable Natural Person. In particular to analyse or predict certain aspects concerning that
							natural person's performance at work, economic situations, health, personal preferences, interests, reliability, behaviour, location
							or movement.
						</p>
						<p>
							<b>Encryption</b>: The process of converting information or data into code, to prevent unauthorised access.
						</p>
						<p>
							<b>Pseudonymization</b>: Data amended in such a way that no individuals can be identified from the data (whether directly or
							indirectly) without a “key” that allows the data to be re-identified.
						</p>
						<p>
							<b>Anonymization</b>: Data amended in such a way that no individuals can be identified from the data (whether directly or
							indirectly) by any means or by any person.
						</p>
					</Collapse>
					<Collapse title="Complaints handling">
						<p>
							When you make a complaint, an investigation of the complaint will be carried out to the extent that is appropriate based on the
							merits of the specific case. We will inform you of the progress and the outcome of the complaint within a reasonable period.
						</p>
						<p>
							If the issue cannot be resolved through consultation between you and us, you may have the right to seek redress through mediation,
							binding arbitration, litigation, or via complaint to the Data Protection Authority within the applicable jurisdiction.
						</p>
					</Collapse>
					<Collapse title="Effective date">
						<p>This policy is effective as of May 10th, 2018.</p>
					</Collapse>
					<Collapse title="How to contact us">
						<p>
							<span>
								For any questions or concerns regarding this Privacy Policy or Broadsign's treatment of personal information, please feel free
								to contact us at <a href="mailto:broadsign-info@broadsign.com">broadsign-info@broadsign.com</a> or write to us at: 700 Ave
								René-Lévesque O., Suite 1200, 12<sup>th</sup> Floor, Montreal, Quebec Canada H3B 1X8.
							</span>
						</p>
					</Collapse>
				</Container>
			</React.Suspense>
		</div>
	);
}
