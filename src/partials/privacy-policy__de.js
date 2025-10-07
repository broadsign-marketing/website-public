import React, { useMemo, useState } from "react";
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
				<h1>
					Datenschutz
					<wbr />
					richtlinie
				</h1>
				<p>
					Wir bei Broadsign wissen, dass Datenschutz wichtig ist. Diese Datenschutzrichtlinie gilt für alle Produkte, Dienstleistungen und Websites,
					die von der Firma Broadsign International, Inc. oder ihren Tochtergesellschaften oder verbundenen Unternehmen, zusammen Broadsigns
					„Services“ angeboten werden.
				</p>
				<p>
					Bei Fragen oder Bedenken bezüglich dieser Datenschutzrichtlinie oder der Verarbeitung personenbezogener Daten durch Broadsign wenden Sie
					sich bitte an<a href="mailto:broadsign-info@broadsign.com"> broadsign-info@broadsign.com </a>oder schreiben Sie uns an: 700 René-Lévesque
					Boulevard West, Suite #1200, floor 12, Montreal, Quebec, H3B 1X8, Kanada.
				</p>
				<h3>
					EU-US, SWISS-US-PRIVACY SHIELD, KANADAS ANTI-SPAM-GESETZGEBUNG UND PERSÖNLICHER INFORMATIONSSCHUTZ UND MITTEILUNG ÜBER ELEKTRONISCHE
					DOKUMENTE
				</h3>
				<p>
					Wir erhalten möglicherweise personenbezogene Daten von Personen aus dem Europäischen Wirtschaftsraum und/oder der Schweiz. In Bezug auf die
					Erhebung, Verwendung und Speicherung personenbezogener Daten aus dem Europäischen Wirtschaftsraum und der Schweiz halten wir uns an die
					EU-US- und die Schweiz-US-Privacy Shield-Grundsätze (Privacy Shield Principles). Besteht ein Konflikt zwischen den Bestimmungen dieser
					Datenschutzerklärung und den Privacy-Shield-Grundsätzen in Bezug auf die Verarbeitung personenbezogener Daten aus dem Europäischen
					Wirtschaftsraum und/oder der Schweiz, gelten die Privacy-Shield-Grundsätze. Weitere Informationen zum Privacy Shield Framework und die
					Premier-Zertifizierung finden Sie unter<a href="https://www.privacyshield.gov/welcome"> https://www.privacyshield.gov/</a>.
				</p>
				<p>
					In Übereinstimmung mit den Privacy-Shield-Grundsätzen verpflichten wir uns, Beschwerden über unsere Erhebung oder Verwendung Ihrer
					personenbezogenen Daten zu klären. Personen aus der Europäischen Union und der Schweiz, die Anfragen oder Beschwerden bezüglich der
					Einhaltung der Privacy-Shield-Grundsätze haben, sollten sich zuerst an uns wenden, wie unten im Abschnitt „Kontaktaufnahme“ beschrieben.
					Unter bestimmten Umständen können Sie möglicherweise ein verbindliches Schiedsverfahren einleiten. Broadsign unterliegt den Ermittlungs- und
					Durchsetzungsbefugnissen der United States Federal Trade Commission hinsichtlich der Einhaltung der Privacy-Shield-Grundsätze.
				</p>
				<p>
					Wir verpflichten uns ferner, im Rahmen des Arbeitsverhältnisses mit der Europäischen Union und den Schweizer Datenschutzbehörden in Bezug
					auf ungelöste Privacy-Shield-Beschwerden bezüglich Ihrer personenbezogenen Daten zusammenzuarbeiten. Wenn Sie von uns keine rechtzeitige
					Bestätigung Ihrer Beschwerde erhalten oder wenn wir Ihre Beschwerde nicht zu Ihrer Zufriedenheit bearbeitet haben, wenden Sie sich bitte an
					die Datenschutzbehörden der Europäische Union und/oder der Schweiz, um weitere Informationen zu erhalten oder eine Beschwerde einzureichen.
					Die Dienste der Europäischen Union und der Schweizer Datenschutzbehörden werden Ihnen kostenlos zur Verfügung gestellt.
				</p>
				<p>
					Wie nachstehend erläutert, können wir Ihre personenbezogenen Daten an unsere Dienstleister weitergeben, die gesetzlich und/oder vertraglich
					zum Schutz Ihrer personenbezogenen Daten verpflichtet sind und Ihre personenbezogenen Daten nur gemäß unseren Anweisungen verwenden dürfen.
					Unter bestimmten Umständen können wir für die Handlungen dieser Dritten haftbar bleiben, wenn diese die Daten anschließend in einer Weise
					verarbeiten, die nicht mit den Privacy-Shield-Grundsätzen vereinbar ist.
				</p>
				<p>
					Möglicherweise müssen wir Ihre personenbezogenen Daten offenlegen, wenn dies im Rahmen eines Rechtsverfahrens oder auf andere gesetzlich
					vorgeschriebene Weise verlangt wird, z.&nbsp;B. als Reaktion auf eine Vorladung, einschließlich der Erfüllung der nationalen Sicherheits-
					und/oder Strafverfolgungsanforderungen in den USA und anderen Ländern, in denen wir tätig sind.
				</p>
			</Container>
			<React.Suspense>
				<Container className="mt-12">
					<Collapse title="INFORMATIONEN, DIE WIR SAMMELN" active={openCookiePolicy}>
						<Element name="info_we_collect">
							<p>Um unser gesamtes Leistungsspektrum zu erbringen, können wir die folgenden Arten von Informationen sammeln:</p>
						</Element>
						<p>
							Von Ihnen angegebene Informationen&nbsp;– Wenn Sie sich für ein Broadsign-Konto oder einen anderen Broadsign-Dienst oder eine Aktion
							anmelden, für die eine Registrierung erforderlich ist, werden Sie um persönliche Informationen gebeten (z.&nbsp;B. Ihren Namen, Ihre
							E-Mail-Adresse und ein Kontopasswort). Für bestimmte Dienste können wir auch Kreditkarten- oder andere Zahlungskontoinformationen
							anfordern, die wir in verschlüsselter Form auf sicheren Servern verwalten. Wir können die Informationen, die Sie über Ihr Konto
							übermitteln, mit Informationen von anderen Broadsign-Diensten oder Dritten kombinieren, um Ihnen eine bessere Nutzererfahrung zu
							bieten und die Qualität unserer Dienste zu verbessern. Für bestimmte Dienste bieten wir Ihnen möglicherweise die Möglichkeit, die
							Kombination solcher Informationen zu deaktivieren.
						</p>
						<p>
							Cookies&nbsp;– Wenn Sie Broadsign besuchen, senden wir ein oder mehrere Cookies an Ihren Computer. Ein Cookie ist eine kleine Datei,
							die eine bestimmte Zeichenfolge enthält und Ihren Browser eindeutig identifiziert. Wir verwenden Cookies, um die Qualität unserer
							Dienste zu verbessern, indem wir Benutzereinstellungen speichern und Benutzertrends verfolgen.
						</p>
						<p>
							Protokollinformationen&nbsp;– Wenn Sie auf Broadsign-Dienste zugreifen, zeichnen unsere Server automatisch Informationen auf, die
							Ihr Browser bei jedem Besuch einer Website sendet. Diese Serverprotokolle können Informationen wie Ihre Webanforderung,
							Internetprotokolladresse, Browsertyp, Browsersprache, Datum und Uhrzeit Ihrer Anfrage sowie ein oder mehrere Cookies enthalten, die
							Ihren Browser möglicherweise eindeutig identifizieren.
						</p>
						<p>
							Benutzerkommunikation&nbsp;– Wenn Sie E-Mails oder andere Mitteilungen an Broadsign senden, bewahren wir diese Mitteilungen
							möglicherweise auf, um Ihre Anfragen zu bearbeiten, auf Ihre Anfragen zu antworten und unsere Dienste zu verbessern.
						</p>
						<h5>DATENQUELLEN</h5>
						<div>
							<p>Wir erheben personenbezogene Daten nur vom Datensubjekt, es sei denn, eine der folgenden Bedingungen trifft zu:</p>
							<ul>
								<li>Die Art des Geschäftszwecks erfordert die Erhebung personenbezogener Daten von anderen Personen oder Stellen.</li>
								<li>
									Die Erhebung muss unter dringenden Umständen durchgeführt werden, um die vitalen Interessen der betroffenen Person zu
									schützen oder um einen ernsthaften Verlust oder eine Verletzung einer anderen Person zu verhindern.
								</li>
							</ul>
						</div>
						<div>
							<p>
								Wenn personenbezogene Daten von einer anderen Person als der betroffenen Person erhoben werden, informieren wir die betroffene
								Person über die Erhebung, sofern nicht eine der folgenden Bedingungen zutrifft:
							</p>
							<ul>
								<li>Die betroffene Person hat die erforderlichen Informationen auf andere Weise erhalten.</li>
								<li>Die Informationen müssen aufgrund einer professionellen Geheimhaltungsverpflichtung vertraulich behandelt werden.</li>
							</ul>
						</div>
					</Collapse>
					<Collapse title="WIE WIR DIE ERFASSTEN INFORMATIONEN VERWENDEN">
						<div>
							<p>
								Broadsign verarbeitet personenbezogene Daten nur zu den in dieser Datenschutzrichtlinie beschriebenen Zwecken. Zu diesen Zwecken
								gehören:
							</p>
							<ul>
								<li>Aufrechterhaltung des allgemeinen Geschäftsbetriebs und der Verwaltung von Broadsign-Unternehmen;</li>
								<li>Bereitstellung von Diensten für Broadsign-Kunden;</li>
								<li>Bereitstellung einer fortlaufenden Verwaltung und des Managements des Kundendienstes;</li>
								<li>Entwicklung und Verbesserung von Broadsign-Produkten und -Diensten.</li>
							</ul>
						</div>
						<div>
							<p>
								Wir verarbeiten personenbezogene Daten in Übereinstimmung mit allen geltenden Gesetzen und vertraglichen Verpflichtungen.
								Insbesondere werden wir personenbezogene Daten nur verarbeiten, wenn mindestens eine der folgenden Anforderungen erfüllt ist:
							</p>
							<ul>
								<li>
									Die betroffene Person hat der Verarbeitung ihrer personenbezogenen Daten für einen oder mehrere bestimmte Zwecke zugestimmt.
								</li>
								<li>
									Die Verarbeitung ist erforderlich, um einen Vertrag zu erfüllen, an dem die betroffene Person beteiligt ist, oder um auf
									Antrag der betroffenen Person vor Abschluss eines Vertrags Schritte zu unternehmen.
								</li>
								<li>
									Die Verarbeitung ist erforderlich, um einer gesetzlichen Verpflichtung nachzukommen, der der für die Verarbeitung
									Verantwortliche unterliegt.
								</li>
								<li>
									Die Verarbeitung ist erforderlich, um die vitalen Interessen der betroffenen Person oder einer anderen natürlichen Person zu
									schützen.
								</li>
								<li>
									Die Verarbeitung ist für die Erfüllung einer Aufgabe erforderlich, die im öffentlichen Interesse oder in Ausübung der dem
									für die Verarbeitung Verantwortlichen übertragenen behördlichen Befugnis ausgeführt wird.
								</li>
								<li>
									Die Verarbeitung ist zum Zwecke der berechtigten Interessen erforderlich, die vom für die Verarbeitung Verantwortlichen oder
									von Dritten verfolgt werden (es sei denn, diese Interessen werden durch die Interessen oder Grundrechte und -freiheiten der
									betroffenen Person außer Kraft gesetzt, insbesondere dann, wenn die betroffene Person ein Kind ist).
								</li>
							</ul>
						</div>
						<div>
							<p>
								Unter bestimmten Umständen können personenbezogene Daten für Zwecke weiterverarbeitet werden, die über den ursprünglichen Zweck
								hinausgehen, für den die personenbezogenen Daten erhoben wurden. Unter diesen Umständen werden wir die folgenden zusätzlichen
								Bedingungen berücksichtigen, um die Fairness und Transparenz einer Verarbeitung zu bestimmen, die über den ursprünglichen Zweck
								hinausgeht, für den die personenbezogenen Daten erhoben wurden:
							</p>
							<ul>
								<li>
									jegliche Verbindung zwischen dem Zweck, für den die personenbezogenen Daten erhoben wurden, und den Gründen für die
									beabsichtigte Weiterverarbeitung;
								</li>
								<li>
									der Kontext, in dem die personenbezogenen Daten erhoben wurden, insbesondere in Bezug auf die Beziehung zwischen der
									betroffenen Person und dem für die Verarbeitung Verantwortlichen;
								</li>
								<li>
									die Art der personenbezogenen Daten, insbesondere ob spezielle Datenkategorien verarbeitet werden oder ob personenbezogene
									Daten im Zusammenhang mit strafrechtlichen Verurteilungen und Straftaten verarbeitet werden;
								</li>
								<li>die möglichen Folgen der beabsichtigten Weiterverarbeitung für die betroffene Person;</li>
								<li>
									das Vorhandensein geeigneter Schutzmaßnahmen für die weitere Verarbeitung, einschließlich Verschlüsselung, Anonymisierung
									oder Pseudonymisierung.
								</li>
							</ul>
						</div>
						<p>
							Broadsign verarbeitet personenbezogene Daten auf unseren Servern in den Vereinigten Staaten von Amerika, Kanada und anderen Ländern.
							In einigen Fällen verarbeiten wir personenbezogene Daten auf einem Server außerhalb Ihres eigenen Landes. Wir können
							personenbezogene Daten verarbeiten, um unsere eigenen Dienste bereitzustellen. In einigen Fällen können wir personenbezogene Daten
							im Namen und gemäß den Anweisungen eines Dritten, wie z.&nbsp;B. unserer Werbepartner, verarbeiten.
						</p>
						<p>
							Wenn wir vorschlagen, personenbezogene Daten für andere als die in dieser Datenschutzrichtlinie und/oder in den spezifischen
							Datenschutzhinweisen für Dienste beschriebenen Zwecke zu verwenden, bieten wir Ihnen eine effektive Möglichkeit, die Verwendung
							personenbezogener Daten für diese anderen Zwecke zu deaktivieren. Wir werden sensible Informationen nicht für andere als die in
							dieser Datenschutzrichtlinie und/oder in den Datenschutzhinweisen für ergänzende Dienste beschriebenen Zwecke sammeln oder
							verwenden, es sei denn, wir haben Ihre vorherige Zustimmung eingeholt.
						</p>
						<p>
							Die meisten Browser sind zu Beginn so eingerichtet, dass sie Cookies akzeptieren. Sie können Ihren Browser jedoch so einstellen,
							dass alle Cookies abzulehnen sind, oder angeben, wann ein Cookie gesendet wird. Einige Broadsign-Funktionen und -Dienste
							funktionieren jedoch möglicherweise nicht ordnungsgemäß, wenn Cookies deaktiviert sind.
						</p>
						<p>
							Sie können die Übermittlung personenbezogener Daten an einen unserer Dienste ablehnen. In diesem Fall kann Broadsign diese Dienste
							möglicherweise nicht für Sie bereitstellen.
						</p>
						<h5>SPEZIELLE DATENKATEGORIEN</h5>
						<div>
							<p>
								Wir verarbeiten spezielle Datenkategorien (auch als sensible Daten bezeichnet) nur, wenn die betroffene Person einer solchen
								Verarbeitung ausdrücklich zustimmt oder wenn eine der folgenden Bedingungen gilt:
							</p>
							<ul>
								<li>
									jegliche Verbindung zwischen dem Zweck, für den die personenbezogenen Daten erhoben wurden, und den Gründen für die
									beabsichtigte Weiterverarbeitung;
								</li>
								<li>
									der Kontext, in dem die personenbezogenen Daten erhoben wurden, insbesondere in Bezug auf die Beziehung zwischen der
									betroffenen Person und dem für die Verarbeitung Verantwortlichen;
								</li>
								<li>
									die Art der personenbezogenen Daten, insbesondere ob spezielle Datenkategorien verarbeitet werden oder ob personenbezogene
									Daten im Zusammenhang mit strafrechtlichen Verurteilungen und Straftaten verarbeitet werden;
								</li>
								<li>die möglichen Folgen der beabsichtigten Weiterverarbeitung für die betroffene Person;</li>
								<li>
									das Vorhandensein geeigneter Schutzmaßnahmen für die weitere Verarbeitung, einschließlich Verschlüsselung, Anonymisierung
									oder Pseudonymisierung.
								</li>
							</ul>
						</div>
						<p>
							Wenn spezielle Datenkategorien verarbeitet werden, wird Broadsign zusätzliche Schutzmaßnahmen ergreifen. Jede Broadsign-Einheit kann
							auch zusätzliche Maßnahmen ergreifen, um den lokalen Gebräuchen oder sozialen Erwartungen bei der Verarbeitung spezieller
							Datenkategorien Rechnung zu tragen.
						</p>
						<h5>DATEN VON KINDERN</h5>
						<p>
							Kinder können der Verarbeitung personenbezogener Daten für Dienste der Informationsgesellschaft nicht zustimmen. Wir haben die
							Zustimmung der Person eingeholt, die die elterliche Verantwortung für das Kind trägt. Es ist jedoch zu beachten, dass, wenn die
							Verarbeitung aus anderen Gründen rechtmäßig ist, die Zustimmung des Kindes oder des Inhabers der elterlichen Verantwortung nicht
							eingeholt werden muss.
						</p>
						<h5>DATENQUALITÄT</h5>
						<div>
							<p>
								Wir ergreifen alle erforderlichen Maßnahmen, um sicherzustellen, dass die von ihr gesammelten und verarbeiteten
								personenbezogenen Daten in erster Linie vollständig und korrekt sind und aktualisiert werden, um der aktuellen Situation der
								betroffenen Person Rechnung zu tragen. Zu den Maßnahmen, die wir zur Gewährleistung der Datenqualität ergriffen haben, gehören:
							</p>
							<ul>
								<li>
									die Korrektur personenbezogener Daten, von denen bekannt ist, dass sie falsch, ungenau, unvollständig, mehrdeutig,
									irreführend oder veraltet sind, auch wenn die betroffene Person keine Berichtigung beantragt;
								</li>
								<li>
									die Aufbewahrung personenbezogener Daten nur für den Zeitraum, der zur Erfüllung der zulässigen Verwendungszwecke oder der
									geltenden gesetzlichen Aufbewahrungsfrist erforderlich ist;
								</li>
								<li>
									das Entfernen personenbezogener Daten, wenn gegen einen der Datenschutzgrundsätze verstoßen wird oder wenn die
									personenbezogenen Daten nicht mehr benötigt werden;
								</li>
								<li>
									die Einschränkung anstatt der Löschung personenbezogener Daten, wenn:
									<ul>
										<li>ein Gesetz das Löschen verbietet;</li>
										<li>das Löschen berechtigte Interessen der betroffenen Person beeinträchtigen würde;</li>
										<li>
											die betroffene Person bestreitet, dass ihre personenbezogenen Daten korrekt sind, und nicht eindeutig festgestellt
											werden kann, ob ihre Informationen korrekt oder falsch sind.
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</Collapse>
					<Collapse title="DATENBEWAHRUNG">
						<p>
							Wir speichern personenbezogene Daten nicht länger als nötig in Bezug auf die Zwecke, für die sie ursprünglich gesammelt oder für die
							sie weiterverarbeitet wurden.
						</p>
					</Collapse>
					<Collapse title="DATENSCHUTZ">
						<div>
							<p>
								Wir ergreifen physische, technische und organisatorische Maßnahmen, um die Sicherheit personenbezogener Daten zu gewährleisten.
								Dies umfasst die Verhinderung von Verlust oder Beschädigung, unbefugter Änderung, Zugriff oder Verarbeitung sowie anderer
								Risiken, denen sie aufgrund menschlicher Handlungen oder der physischen oder natürlichen Umgebung ausgesetzt sein können. Die
								Maßnahmen, die wir ergriffen haben, umfassen:
							</p>
							<ul>
								<li>
									das Verhindern, dass unbefugte Personen Zugriff auf Datenverarbeitungssysteme erhalten, in denen personenbezogene Daten
									verarbeitet werden;
								</li>
								<li>
									das Verhindern, dass Personen, die zur Nutzung eines Datenverarbeitungssystems berechtigt sind, über ihre Bedürfnisse und
									Berechtigungen hinaus auf personenbezogene Daten zugreifen;
								</li>
								<li>
									die Sicherstellung, dass personenbezogene Daten während der elektronischen Übertragung während des Transports nicht ohne
									Genehmigung gelesen, kopiert, geändert oder entfernt werden können;
								</li>
								<li>
									die Sicherstellung, dass Zugriffsprotokolle vorhanden sind, um festzustellen, ob und von wem die personenbezogenen Daten in
									ein Datenverarbeitungssystem eingegeben, geändert oder aus diesem entfernt wurden;
								</li>
								<li>
									die Sicherstellung, dass in dem Fall, in dem die Verarbeitung von einem Datenprozessor ausgeführt wird, die Daten nur gemäß
									den Anweisungen des Datenverarbeiters verarbeitet werden können;
								</li>
								<li>die Sicherstellung, dass personenbezogene Daten vor unerwünschter Zerstörung oder Verlust geschützt sind;</li>
								<li>
									die Sicherstellung, dass für verschiedene Zwecke gesammelte personenbezogene Daten separat verarbeitet werden können und
									werden;
								</li>
								<li>die Sicherstellung, dass personenbezogene Daten nicht länger als nötig aufbewahrt werden.</li>
							</ul>
						</div>
					</Collapse>
					<Collapse title="TEILEN VON INFORMATIONEN">
						<p>
							Broadsign gibt personenbezogene Daten nur unter den folgenden begrenzten Umständen an andere Unternehmen oder Personen außerhalb von
							Broadsign weiter:
						</p>
						<p>Wir haben Ihre Zustimmung. Für die Weitergabe sensibler personenbezogener Daten benötigen wir eine Einwilligungserklärung.</p>
						<p>
							Wir stellen diese Informationen unseren Tochterunternehmen, verbundenen Unternehmen oder anderen vertrauenswürdigen Unternehmen oder
							Personen zur Verfügung, um personenbezogene Daten in unserem Namen zu verarbeiten. Wir fordern diese Parteien auf, diese
							Informationen gemäß unseren Anweisungen und in Übereinstimmung mit dieser Datenschutzrichtlinie und allen anderen angemessenen
							Vertraulichkeits- und Sicherheitsmaßnahmen zu verarbeiten.
						</p>
						<p>
							Wir sind nach Treu und Glauben der Ansicht, dass der Zugang, die Verwendung, die Aufbewahrung oder die Offenlegung solcher
							Informationen zumutbar ist, um (a) alle geltenden Gesetze, Vorschriften, Rechtsverfahren oder durchsetzbaren behördlichen
							Anforderungen zu erfüllen, (b) geltende Nutzungsbedingungen durchzusetzen, einschließlich der Untersuchung von potenziellen
							Verstößen gegen diese Bestimmungen, (c) Betrug, Sicherheits- oder technische Probleme aufzudecken, zu verhindern oder sonstwie zu
							beheben oder (d) die Rechte, das Eigentum oder die Sicherheit von Broadsign, seinen Benutzern oder der Öffentlichkeit vor
							unmittelbar bevorstehenden Schäden zu schützen, wie dies gesetzlich vorgeschrieben oder zulässig ist
						</p>
						<p>
							Wenn Broadsign an einer Verschmelzung, einem Erwerb oder einer Form des Verkaufs einiger oder aller seiner Vermögenswerte beteiligt
							ist, werden wir dies mitteilen, bevor personenbezogene Daten übermittelt werden und einer anderen Datenschutzrichtlinie unterliegen.
						</p>
						<p>
							Wir können bestimmte aggregierte, nicht personenbezogene Daten an Dritte weitergeben. Solche Informationen identifizieren Sie nicht
							persönlich.
						</p>
						<p>
							Bitte kontaktieren Sie uns unter der unten angegebenen Adresse, wenn Sie weitere Fragen zur Verwaltung oder Verwendung
							personenbezogener Daten haben.
						</p>
					</Collapse>
					<Collapse title="IHRE RECHTE">
						<div>
							<p>Sie haben das Recht, Folgendes einzufordern:</p>
							<ul>
								<li>Informationszugriff</li>
								<li>Einspruch gegen die Verarbeitung</li>
								<li>Einspruch gegen automatisierte Entscheidungsfindung und Profilerstellung</li>
								<li>Einschränkung der Verarbeitung</li>
								<li>Datenportabilität</li>
								<li>Datenkorrektur</li>
								<li>Datenlöschung</li>
							</ul>
						</div>
						<p>
							Wenn Sie eine Anfrage bezüglich eines der oben aufgeführten Rechte stellen, werden wir jede solche Anfrage in Übereinstimmung mit
							allen geltenden Datenschutzgesetzen und -bestimmungen prüfen. Für die Prüfung und/oder Erfüllung einer solchen Anfrage wird keine
							Verwaltungsgebühr erhoben, es sei denn, die Anfrage wird als unnötig oder übermäßig angesehen.
						</p>
						<div>
							<p>
								Sie sind berechtigt, auf schriftlichen Antrag und nach erfolgreicher Überprüfung Ihrer Identität folgende Informationen über
								Ihre personenbezogenen Daten zu erhalten:
							</p>
							<ul>
								<li>die Zwecke der Erhebung, Verarbeitung, Verwendung und Speicherung Ihrer personenbezogenen Daten;</li>
								<li>die Quelle(n) der personenbezogenen Daten, sofern diese nicht von der betroffenen Person bezogen wurden;</li>
								<li>die Kategorien der für die betroffene Person gespeicherten personenbezogenen Daten;</li>
								<li>
									die Empfänger oder Kategorien von Empfängern, an die die personenbezogenen Daten übermittelt wurden oder werden dürfen,
									sowie den Standort dieser Empfänger;
								</li>
								<li>die vorgesehene Speicherdauer für die personenbezogenen Daten oder die Begründung für die Bestimmung der Speicherdauer;</li>
								<li>die Verwendung automatisierter Entscheidungen, einschließlich Profilerstellung.</li>
								<li>
									Das Recht der betroffenen Person:
									<ul>
										<li>Einspruch gegen die Verarbeitung ihrer personenbezogenen Daten zu erheben;</li>
										<li>eine Beschwerde bei der Datenschutzbehörde einzureichen;</li>
										<li>die Berichtigung oder Löschung ihrer persönlichen Daten zu verlangen;</li>
										<li>die Einschränkung der Verarbeitung ihrer personenbezogenen Daten zu verlangen.</li>
									</ul>
								</li>
							</ul>
						</div>
						<p>
							Auf jede Anfrage wird innerhalb von 30&nbsp;Tagen nach Eingang der schriftlichen Anfrage der betroffenen Person eine Antwort
							bereitgestellt. Eine angemessene Überprüfung muss bestätigen, dass der Antragsteller die betroffene Person oder ihr bevollmächtigter
							gesetzlicher Vertreter ist. Die betroffenen Personen haben das Recht, von Broadsign die Korrektur oder Ergänzung fehlerhafter,
							irreführender, veralteter oder unvollständiger personenbezogener Daten zu verlangen.
						</p>
						<div>
							<p>
								Wenn wir nicht innerhalb von 30&nbsp;Tagen vollständig auf die Anfrage antworten können, werden wir Ihnen oder Ihrem
								bevollmächtigten gesetzlichen Vertreter dennoch innerhalb der angegebenen Zeit die folgenden Informationen zur Verfügung
								stellen:
							</p>
							<ul>
								<li>eine Bestätigung des Eingangs der Anfrage;</li>
								<li>etwaige bisher gefundenen Informationen;</li>
								<li>
									Einzelheiten zu allen angeforderten Informationen oder Änderungen, die der betroffenen Person nicht mitgeteilt werden, die
									Gründe für die Ablehnung und alle Verfahren, mit denen die Entscheidung angefochten werden kann;
								</li>
								<li>ein voraussichtliches Datum, bis zu dem alle verbleibenden Antworten bereitgestellt werden;</li>
								<li>
									eine Schätzung aller von der betroffenen Person zu zahlenden Kosten (z.&nbsp;B. wenn die Anfrage übermäßiger Natur ist);
								</li>
								<li>
									der Name und die Kontaktinformationen der Broadsign-Person, an die sich die betroffene Person zur Nachverfolgung wenden
									sollte.
								</li>
							</ul>
						</div>
						<p>
							Es ist zu beachten, dass Situationen auftreten können, in denen die Bereitstellung der von einer betroffenen Person angeforderten
							Informationen personenbezogene Daten einer anderen Person offenlegen würde. In solchen Fällen müssen Informationen redigiert oder
							zurückgehalten werden, wenn dies zum Schutz der Rechte dieser Person erforderlich oder angemessen ist.
						</p>
						<p>Um den Zugriff auf Ihre Daten anzufordern, verwenden Sie bitte das folgende Formular.</p>
						<Panel className="bg-zircon rounded-xl shadow-A">
							<Form form="privacyPolicy" submitText="Send Request" thankYouMessage="privacyPolicy" />
						</Panel>
					</Collapse>
					<Collapse title="ANFRAGEN UND OFFENLEGUNGEN IN DER STRAFVERFOLGUNG">
						<div>
							<p>
								Auf Anforderung der Strafverfolgungsbehörden oder Gerichte können personenbezogene Daten ohne Wissen oder Zustimmung einer
								betroffenen Person weitergegeben werden. Dies ist der Fall, wenn die Offenlegung der personenbezogenen Daten für einen der
								folgenden Zwecke erforderlich ist:
							</p>
							<ul>
								<li>die Verhütung oder Aufdeckung von Straftaten;</li>
								<li>die Festnahme oder Verfolgung von Straftätern;</li>
								<li>die Veranlagung oder Erhebung einer Steuer oder Abgabe;</li>
								<li>auf Anordnung eines Gerichts oder von Gesetzes wegen.</li>
							</ul>
						</div>
						<p>
							Wenn wir personenbezogene Daten für einen dieser Zwecke verarbeiten, kann eine Ausnahme von den in dieser Richtlinie beschriebenen
							Verarbeitungsregeln angewandt werden, jedoch nur in dem Umfang, wie es den fraglichen Fall wahrscheinlich beeinträchtigen würde,
							wenn wir dies nicht täten.
						</p>
					</Collapse>
					<Collapse title="ÄNDERUNGEN DIESER DATENSCHUTZRICHTLINIE">
						<p>
							Bitte beachten Sie, dass sich diese Datenschutzrichtlinie von Zeit zu Zeit ändern kann. Wir werden Ihre Rechte aus dieser
							Datenschutzrichtlinie ohne Ihre ausdrückliche Zustimmung nicht einschränken, und wir gehen davon aus, dass die meisten dieser
							Änderungen geringfügig sind. Unabhängig davon werden wir alle Änderungen der Datenschutzrichtlinie auf dieser Seite veröffentlichen.
							Wenn die Änderungen erheblich sind, werden wir Sie stärker darauf hinweisen. Jede Version dieser Datenschutzrichtlinie wird bis zum
							Datum ihres Inkrafttretens oben auf der Seite gekennzeichnet. Wir werden auch frühere Versionen dieser Datenschutzrichtlinie zur
							Überprüfung in einem Archiv aufbewahren.
						</p>
						<p>
							Wenn wir personenbezogene Daten für einen dieser Zwecke verarbeiten, kann eine Ausnahme von den in dieser Richtlinie beschriebenen
							Verarbeitungsregeln angewandt werden, jedoch nur in dem Umfang, wie es den fraglichen Fall wahrscheinlich beeinträchtigen würde,
							wenn wir dies nicht täten.
						</p>
					</Collapse>
					<Collapse title="DEFINITIONEN">
						<p>Die folgenden in dieser Datenschutzrichtlinie verwendeten Begriffe sind wie folgt definiert.</p>
						<p>
							<b>Dritte: </b>Eine externe Organisation, mit der Broadsign Geschäfte abwickelt und die befugt ist, unter der direkten Autorität von
							Broadsign die personenbezogenen Daten von Broadsign-Kontakten zu verarbeiten.
						</p>
						<p>
							<b>Personenbezogene Daten: </b>Alle Informationen (einschließlich Meinungen und Absichten), die sich auf eine identifizierte oder
							identifizierbare natürliche Person beziehen.
						</p>
						<p>
							<b>Kontakt: </b>Jeder frühere, aktuelle oder potenzielle Broadsign-Kunde.
						</p>
						<p>
							<b>Identifizierbare natürliche Person: </b>Jeder, der direkt oder indirekt identifiziert werden kann, insbesondere unter Bezugnahme
							auf eine Kennung wie einen Namen, eine Identifikationsnummer, Standortdaten, eine Online-Kennung oder einen oder mehrere Faktoren,
							die für die physischen, physiologischen, genetischen, mentalen und wirtschaftlichen Faktoren spezifisch sind, die kulturelle oder
							soziale Identität dieser natürlichen Person.
						</p>
						<p>
							<b>Datenverantwortlicher: </b>Eine natürliche oder juristische Person, eine Behörde, eine Agentur oder eine andere Stelle, die
							allein oder gemeinsam mit anderen die Zwecke und Mittel der Verarbeitung personenbezogener Daten bestimmt.
						</p>
						<p>
							<b>Broadsign-Einheit: </b>Eine Broadsign-Niederlassung, einschließlich Tochterunternehmen und Joint Ventures, über die Broadsign die
							Kontrolle über das Management ausübt.
						</p>
						<p>
							<b>Betroffene Person (Datensubjekt): </b>Die identifizierte oder identifizierbare natürliche Person, auf die sich die Daten
							beziehen.
						</p>
						<p>
							<b>Prozess, verarbeitet, Verarbeitung: </b>Alle Operationen oder Sätze von Operationen, die mit personenbezogenen Daten oder mit
							Sätzen personenbezogener Daten durchgeführt werden, unabhängig davon, ob sie automatisiert sind oder nicht. Die durchgeführten
							Vorgänge können das Sammeln, Aufzeichnen, Organisieren, Strukturieren, Speichern, Anpassen oder Ändern, Abrufen, Konsultieren,
							Verwenden, Offenlegen durch Übermittlung, Verbreiten oder anderweitiges Bereitstellen, Ausrichten oder Kombinieren, Einschränken,
							Löschen oder Zerstören umfassen.
						</p>
						<p>
							<b>Datenschutz: </b>Der Prozess des Schutzes personenbezogener Daten vor unbefugter oder rechtswidriger Offenlegung, Zugriff,
							Änderung, Verarbeitung, Übertragung oder Zerstörung.
						</p>
						<p>
							<b>Datenschutzbehörde: </b>Eine unabhängige Behörde, die für die Überwachung der Anwendung der einschlägigen Datenschutzverordnung
							im nationalen Recht zuständig ist.
						</p>
						<p>
							<b>Zustimmung: </b>Jede frei gegebene, spezifische, informierte und eindeutige Angabe der Wünsche der betroffenen Person, durch die
							sie durch eine Erklärung oder durch eine klare positive Handlung eine Zustimmung zur Verarbeitung personenbezogener Daten in Bezug
							auf sie bedeutet.
						</p>
						<p>
							<b>Spezielle Datenkategorien: </b>Personenbezogene Daten, die sich auf die rassische oder ethnische Herkunft beziehen oder diese
							offenlegen, politische Meinungen, religiöse oder philosophische Überzeugungen, Gewerkschaftsmitgliedschaft; Daten zu Gesundheit oder
							Sexualleben und sexueller Orientierung; genetische Daten oder biometrische Daten.
						</p>
						<p>
							<b>Profilerstellung (Profiling): </b>Jede Form der automatisierten Verarbeitung personenbezogener Daten, bei der personenbezogene
							Daten zur Bewertung spezifischer oder allgemeiner Merkmale einer identifizierbaren natürlichen Person verwendet werden, insbesondere
							zur Analyse oder Vorhersage bestimmter Aspekte in Bezug auf die Leistung dieser natürlichen Person bei der Arbeit, wirtschaftliche
							Situationen, Gesundheit, persönliche Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Ort oder Bewegung.
						</p>
						<p>
							<b>Verschlüsselung: </b>Der Prozess der Umwandlung von Informationen oder Daten in einen Code, um unbefugten Zugriff zu verhindern.
						</p>
						<p>
							<b>Pseudonymisierung: </b>Wenn die Daten so abgeändert werden, dass von den Daten (direkt oder indirekt) ausgehend keine Person
							identifiziert werden kann, wenn kein „Schlüssel“ vorhanden ist, der es erlaubt, die Daten erneut zu identifizieren.
						</p>
						<p>
							<b>Anonymisierung: </b>Daten, die so abgeändert werden, dass die Identifizierung einer Person ausgehend von den Daten (direkt oder
							indirekt) durch andere Personen auf keine Weise möglich ist.
						</p>
					</Collapse>
					<Collapse title="BESCHWERDEMANAGEMENT">
						<p>
							Wenn Sie eine Beschwerde einreichen, wird eine Untersuchung der Beschwerde in dem Umfang durchgeführt, der aufgrund der
							Begründetheit des Einzelfalls angemessen ist. Wir werden Sie innerhalb einer angemessenen Frist über den Fortschritt und das
							Ergebnis der Beschwerde informieren.
						</p>
						<p>
							Wenn das Problem nicht durch Konsultation zwischen Ihnen und uns gelöst werden kann, haben Sie möglicherweise das Recht, durch
							Mediation, ein verbindliches Schiedsverfahren, einen Rechtsstreit oder durch Beschwerde bei der Datenschutzbehörde im jeweiligen
							Land Rechtsmittel einzulegen.
						</p>
					</Collapse>
					<Collapse title="DATUM DES INKRAFTTRETENS">
						<p>Diese Richtlinie gilt ab dem 10. Mai 2018.</p>
					</Collapse>
					<Collapse title="SO NEHMEN SIE KONTAKT MIT UNS AUF">
						<p>
							Bei Fragen oder Bedenken bezüglich dieser Datenschutzrichtlinie oder der Behandlung personenbezogener Daten durch Broadsign wenden
							Sie sich bitte an<a href="mailto:broadsign-info@broadsign.com"> broadsign-info@broadsign.com </a>oder schreiben Sie an unsere
							Adresse: 700, boulevard René-Lévesque Ouest, Suite #1200, 12<sup>e</sup> étage, Montréal, Québec, Canada, H3B 1X8.
						</p>
					</Collapse>
				</Container>
			</React.Suspense>
		</div>
	);
}
