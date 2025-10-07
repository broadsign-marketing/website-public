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
				<h1>Politique de confidentialité</h1>
				<p>
					Broadsign reconnaît l'importance de la confidentialité. La présente politique de confidentialité s'applique à tous les produits, services et
					sites Web de Broadsign International, Inc. ou à ses filiales ou sociétés affiliées; nommées collectivement «&nbsp;services&nbsp;» Broadsign.
				</p>
				<p>
					N'hésitez pas à envoyer vos questions ou commentaires sur la présente politique de confidentialité ou sur le traitement des renseignements
					personnels par Broadsign à l'adresse<a href="mailto:broadsign-info@broadsign.com"> broadsign-info@broadsign.com </a>ou au 700, boulevard
					René-Lévesque Ouest, Suite #1200, 12<sup>e</sup> étage, Montréal, Québec, Canada, H3B 1X8.
				</p>
				<h3>
					AVIS RELATIF AU BOUCLIER DE PROTECTION DES DONNÉES UE–É.-U. ET SUISSE–É.-U., À LA LOI CANADIENNE ANTI-POURRIEL ET À LA LOI SUR LA PROTECTION
					DES RENSEIGNEMENTS PERSONNELS ET LES DOCUMENTS ÉLECTRONIQUES
				</h3>
				<p>
					Nous pouvons recevoir des données à caractère personnel de résidents de l'Espace économique européen ou de la Suisse. Nous adhérons aux
					principes du Bouclier de protection des données UE–É.-U. et Suisse–É.-U. en matière de collecte, d'utilisation et de conservation de données
					à caractère personnel de l'Espace économique européen et de la Suisse. En cas de conflit entre les principes du Bouclier de protection des
					données et les dispositions de la présente politique de confidentialité, les principes du Bouclier de protection des données prévalent en ce
					qui a trait au traitement des données à caractère personnel de résidents de l'Espace économique européen ou de la Suisse. Pour obtenir de
					plus amples renseignements sur le cadre d'action du Bouclier de protection des données et pour consulter notre certification
					«&nbsp;Premier&nbsp;», rendez-vous sur le site<a href="https://www.privacyshield.gov/welcome"> https://www.privacyshield.gov/</a>.
				</p>
				<p>
					Conformément aux principes du Bouclier de protection des données, nous nous engageons à régler les plaintes portant sur notre collecte ou
					notre utilisation de vos données à caractère personnel. Les résidents de l'Union européenne et de la Suisse voulant obtenir des
					renseignements ou déposer une plainte concernant notre conformité aux principes du Bouclier de protection des données devraient d'abord nous
					contacter comme indiqué dans la section «&nbsp;Communiquer avec nous&nbsp;». Dans certaines circonstances, vous pourriez avoir le droit de
					recourir à l'arbitrage exécutoire. Broadsign est soumise aux pouvoirs d'enquête et d'exécution de la Federal Trade Commission des États-Unis
					en ce qui concerne son adhésion aux principes du Bouclier de protection des données.
				</p>
				<p>
					Nous nous engageons également à coopérer avec les autorités de protection des données de l'Union européenne et de la Suisse relativement à
					toute plainte non résolue concernant le Bouclier de protection des données et vos données à caractère personnel dans le contexte d'une
					relation d'emploi. Si nous n'accusons pas réception de votre plainte dans un délai raisonnable, ou si vous n'êtes pas satisfait du
					traitement de votre plainte, veuillez communiquer avec les autorités de protection des données de l'Union européenne ou de la Suisse pour
					obtenir plus de renseignements ou pour déposer une plainte. Les services des autorités de protection des données de l'Union européenne et de
					la Suisse vous seront fournis gratuitement.
				</p>
				<p>
					Comme mentionné ci-dessous, nous pourrions transmettre vos données à caractère personnel à nos fournisseurs de services. Ceux-ci sont
					légalement ou contractuellement tenus de protéger vos données à caractère personnel et ne peuvent utiliser vos données à caractère personnel
					que selon nos indications. Dans certaines circonstances, il se peut que nous demeurions responsables des actes de ces tiers s'ils traitent
					les données d'une façon incompatible avec les principes du Bouclier de protection des données.
				</p>
				<p>
					Nous pourrions avoir à divulguer vos données à caractère personnel dans le cadre de procédures juridiques ou au titre d'autres exigences
					prévues par la loi, y compris pour nous conformer à une citation à comparaître ou pour répondre aux exigences en matière de sécurité
					nationale ou d'application de la loi aux États-Unis ou dans les autres pays où nous exerçons nos activités.
				</p>
			</Container>
			<React.Suspense>
				<Container className="mt-12">
					<Collapse title="Information recueillie" active={openCookiePolicy}>
						<Element name="info_we_collect">
							<p>
								Afin de vous offrir notre gamme complète de services, nous pourrions recueillir les différents types de renseignements suivants
								:
							</p>
						</Element>
						<p>
							Les renseignements personnels que vous fournissez à l'ouverture d'un compte Broadsign ou lors de l'inscription à un autre service
							Broadsign ou à une promotion, notamment votre nom, votre adresse de courriel et un mot de passe de compte. Pour certains services,
							nous pourrions également vous demander un numéro de carte de crédit ou d'autres informations de paiement que nous conservons dans
							des serveurs sécurisés sous forme chiffrée. Nous pourrions jumeler les renseignements que vous fournissez dans votre compte aux
							renseignements recueillis par d'autres services Broadsign ou par des tiers, et ce, afin d'améliorer votre expérience et la qualité
							de nos services. Pour certains services, nous pourrions vous donner la possibilité de refuser de jumeler ces renseignements.
						</p>
						<p>
							Fichiers témoins&nbsp;: lorsque vous visitez Broadsign, nous acheminons un ou plusieurs fichiers témoins (un petit fichier contenant
							une chaîne de caractères) vers votre ordinateur qui servent uniquement à identifier votre navigateur. Nous utilisons les fichiers
							témoins pour améliorer la qualité de nos services en stockant les préférences des utilisateurs et en suivant les tendances
							d'utilisation.
						</p>
						<p>
							Renseignements de connexion&nbsp;: lorsque vous accédez aux services Broadsign, nos serveurs enregistrent automatiquement les
							renseignements que votre navigateur envoie chaque fois que vous visitez un site Web. Ces journaux de serveur peuvent contenir des
							renseignements tels que la requête Web, l'adresse IP, le type de navigateur, la langue du navigateur, l'heure et la date de la
							requête ainsi qu'un ou plusieurs fichiers témoins servant exclusivement à identifier le navigateur.
						</p>
						<p>
							Communications de l'utilisateur&nbsp;: lorsque vous envoyez un courriel ou tout autre type de communication à Broadsign, nous
							pourrions conserver ces communications pour traiter vos demandes, répondre à vos requêtes et améliorer nos services.
						</p>
						<h5>sources des données</h5>
						<div>
							<p>
								Nous collectons des données à caractère personnel uniquement auprès de la personne concernée, sauf dans l'une ou l'autre des
								situations suivantes&nbsp;:
							</p>
							<ul>
								<li>
									La nature de l'objectif commercial nécessite la collecte de données à caractère personnel auprès d'autres personnes ou
									d'autres entités;
								</li>
								<li>
									La collecte doit être effectuée dans une situation d'urgence afin de protéger les intérêts vitaux de la personne concernée
									ou d'empêcher qu'une autre personne ne subisse une perte ou une blessure grave.
								</li>
							</ul>
						</div>
						<div>
							<p>
								Si des données à caractère personnel sont recueillies auprès de quelqu'un d'autre que la personne concernée, nous informerons la
								personne concernée de la collecte, sauf dans l'une ou l'autre des situations suivantes&nbsp;:
							</p>
							<ul>
								<li>La personne concernée a reçu l'information requise par un autre moyen;</li>
								<li>L'information est couverte par le secret professionnel et doit demeurer confidentielle;</li>
							</ul>
						</div>
					</Collapse>
					<Collapse title="Utilisation de l'information recueillie">
						<div>
							<p>
								Broadsign traite exclusivement les renseignements personnels aux fins décrites dans la présente politique de confidentialité, y
								compris&nbsp;:
							</p>
							<ul>
								<li>La poursuite des activités générales de l'entreprise et l'administration des entités de Broadsign;</li>
								<li>La prestation de services aux clients de Broadsign;</li>
								<li>L'administration et la gestion permanentes des services offerts aux clients;</li>
								<li>La conception et l'amélioration des produits et services de Broadsign.</li>
							</ul>
						</div>
						<div>
							<p>
								Nous traitons les données à caractère personnel conformément à toutes les lois et obligations contractuelles applicables. Plus
								précisément, nous traitons uniquement les données à caractère personnel si au moins l'une des exigences suivantes est satisfaite
								:
							</p>
							<ul>
								<li>
									La personne concernée a consenti au traitement de ses données à caractère personnel à une ou plusieurs fins déterminées;
								</li>
								<li>
									Le traitement est nécessaire à l'exécution d'un contrat auquel la personne concernée est partie ou à l'exécution de mesures
									précontractuelles à la demande de la personne concernée;
								</li>
								<li>Le traitement est nécessaire au respect d'une obligation légale à laquelle le responsable du traitement est soumis;</li>
								<li>
									Le traitement est nécessaire à la protection des intérêts vitaux de la personne concernée ou d'une autre personne physique;
								</li>
								<li>
									Le traitement est nécessaire à l'exécution d'une mission effectuée dans l'intérêt public ou à l'exercice légitime de
									l'autorité publique dont est investi le responsable du traitement;
								</li>
								<li>
									Le traitement est nécessaire à la réalisation de l'intérêt légitime poursuivi par le responsable du traitement ou par un
									tiers (sauf lorsque les droits fondamentaux et les libertés de la personne concernée prévalent sur ledit intérêt, en
									particulier dans les cas où la personne concernée est un enfant).
								</li>
							</ul>
						</div>
						<div>
							<p>
								Dans certaines circonstances, des données à caractère personnel peuvent faire l'objet d'un traitement ultérieur à des fins
								différentes de celles initialement prévues lors de la collecte. Dans ces circonstances, nous étudierons les conditions
								supplémentaires suivantes afin de déterminer l'équité et la transparence de tout traitement ultérieur à des fins différentes de
								celles initialement prévues lors de la collecte&nbsp;:
							</p>
							<ul>
								<li>
									Tout lien entre l'objet initial de la collecte des données à caractère personnel et les raisons du traitement ultérieur
									prévu;
								</li>
								<li>
									Le contexte de la collecte des données à caractère personnel, notamment en ce qui concerne la relation entre la personne
									concernée et le responsable du traitement;
								</li>
								<li>
									La nature des données à caractère personnel, notamment si des catégories particulières de données ou des données à caractère
									personnel relatives à des infractions ou à des condamnations pénales doivent être traitées;
								</li>
								<li>Les conséquences possibles du traitement ultérieur prévu pour la personne concernée;</li>
								<li>
									L'existence de garanties appropriées dans le cadre du traitement ultérieur prévu, telles que le chiffrement, l'anonymisation
									ou la pseudonymisation.
								</li>
							</ul>
						</div>
						<p>
							Broadsign traite les renseignements personnels sur ses serveurs aux États-Unis, au Canada et dans d'autres pays. Dans certains cas,
							nous traitons vos renseignements personnels sur un serveur se trouvant hors de votre pays. Nous pourrions traiter des renseignements
							personnels afin de fournir nos propres services. Dans certains cas, nous pourrions traiter des renseignements personnels au nom et
							selon les indications d'un tiers, notamment nos partenaires publicitaires.
						</p>
						<p>
							Si nous vous proposons d'utiliser vos renseignements personnels à des fins autres que celles décrites dans la présente politique de
							confidentialité ou dans les avis de confidentialité de certains services, nous vous offrirons un moyen efficace de refuser
							l'utilisation de vos renseignements personnels à ces autres fins. Nous ne recueillerons ni n'utiliserons de renseignements sensibles
							pour des fins autres que celles décrites dans cette politique de confidentialité ou dans les avis de confidentialité de services
							complémentaires, à moins d'avoir obtenu votre consentement préalable.
						</p>
						<p>
							La plupart des navigateurs sont initialement configurés pour accepter les fichiers témoins, mais vous pouvez régler votre navigateur
							pour qu'il refuse tous les fichiers témoins ou vous avise lors de l'envoi d'un fichier témoin. Toutefois, certaines fonctionnalités
							ou certains services de Broadsign pourraient ne pas fonctionner correctement si vos fichiers témoins sont désactivés.
						</p>
						<p>
							Vous pouvez refuser de soumettre des renseignements personnels pour n'importe lequel de nos services. En pareil cas, Broadsign
							pourrait ne pas être en mesure de vous fournir ces services.
						</p>
						<h5>catégories particulières de données</h5>
						<div>
							<p>
								Nous traiterons les catégories particulières de données (aussi appelées données sensibles) uniquement si la personne concernée y
								donne son consentement exprès ou si l'une des conditions suivantes s'applique&nbsp;:
							</p>
							<ul>
								<li>
									Tout lien entre l'objet initial de la collecte des données à caractère personnel et les raisons du traitement ultérieur
									prévu;
								</li>
								<li>
									Le contexte de la collecte des données à caractère personnel, notamment en ce qui concerne la relation entre la personne
									concernée et le responsable du traitement;
								</li>
								<li>
									La nature des données à caractère personnel, notamment si des catégories particulières de données ou des données à caractère
									personnel relatives à des infractions ou à des condamnations pénales doivent être traitées;
								</li>
								<li>Les conséquences possibles du traitement ultérieur prévu pour la personne concernée;</li>
								<li>
									L'existence de garanties appropriées dans le cadre du traitement ultérieur prévu, telles que le chiffrement, l'anonymisation
									ou la pseudonymisation.
								</li>
							</ul>
						</div>
						<p>
							Pour le traitement des catégories particulières de données, Broadsign appliquera des mesures de protection supplémentaires. Chaque
							entité de Broadsign prendra également des mesures supplémentaires afin de respecter les coutumes locales et les attentes sociales en
							ce qui a trait au traitement des catégories spéciales de données.
						</p>
						<h5>Données d'enfants</h5>
						<p>
							Les enfants étant incapables de consentir au traitement de données à caractère personnel pour l'utilisation de services de la
							société de l'information, nous demandons le consentement du titulaire de la responsabilité parentale de l'enfant. Il faut cependant
							noter que lorsque le traitement est légal pour d'autres motifs, le consentement de l'enfant ou du titulaire de la responsabilité
							parentale n'est pas requis.
						</p>
						<h5>Qualité des données</h5>
						<div>
							<p>
								Nous prenons toutes les mesures nécessaires afin d'assurer que les données à caractère personnel qui font l'objet d'une collecte
								et d'un traitement sont complètes et exactes, et qu'elles sont ensuite mises à jour pour refléter la situation actuelle de la
								personne concernée. Les mesures que nous avons adoptées pour assurer la qualité des données comprennent&nbsp;:
							</p>
							<ul>
								<li>
									Corriger les données à caractère personnel jugées fausses, inexactes, incomplètes, ambiguës, trompeuses ou désuètes, même si
									la personne concernée n'a pas demandé de correction.
								</li>
								<li>
									Conserver les données à caractère personnel uniquement pendant la période nécessaire pour satisfaire l'usage permis, ou pour
									la durée de conservation obligatoire applicable.
								</li>
								<li>
									Supprimer les données à caractère personnel qui contreviennent aux principes de protection des données ou qui ne sont plus
									nécessaires.
								</li>
								<li>
									Limiter le traitement des données à caractère personnel (au lieu de les supprimer), dans la mesure où&nbsp;:
									<ul>
										<li>Une loi interdit l'effacement;</li>
										<li>L'effacement pourrait porter atteinte aux intérêts légitimes de la personne concernée;</li>
										<li>
											La personne concernée soutient que ses données à caractère personnel sont exactes, mais il est impossible d'établir
											hors de tout doute que les renseignements sont exacts ou inexacts.
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</Collapse>

					<Collapse title="Conservation des données">
						<p>
							Nous conservons uniquement les données aussi longtemps que nécessaire par rapport aux finalités pour lesquelles elles ont été
							collectées initialement, ou traitées ultérieurement.
						</p>
					</Collapse>
					<Collapse title="Protection des données">
						<div>
							<p>
								Nous prenons des mesures physiques, techniques et organisationnelles pour assurer la sécurité des données à caractère personnel.
								Cela comprend la prévention contre les pertes ou dommages, l'altération, l'accès ou le traitement non autorisés et d'autres
								risques, provenant de l'action de l'homme ou du milieu physique ou naturel, auxquels les données peuvent être exposées. Parmi
								les mesures que nous prenons figurent&nbsp;:
							</p>
							<ul>
								<li>
									Empêcher toute personne non autorisée d'accéder aux systèmes de traitement de l'information dans lesquels des données à
									caractère personnel sont traitées.
								</li>
								<li>
									Empêcher toute personne autorisée à utiliser un système de traitement de l'information d'accéder à des données à caractère
									personnel desquelles elle n'a pas besoin ou pour lesquelles elle ne possède pas d'autorisation.
								</li>
								<li>
									Veiller à ce que les données à caractère personnel ne puissent pas être lues, copiées, modifiées ou effacées sans
									autorisation durant leur transmission par voie électronique.
								</li>
								<li>
									Veiller à ce que des journaux d'accès soient mis en place afin de déterminer quelles données à caractère personnel ont été
									entrées, modifiées ou supprimées dans le système de traitement de l'information, et par qui.
								</li>
								<li>
									Faire en sorte que les données puissent uniquement être traitées conformément aux instructions du responsable du traitement
									dans les cas où le traitement est effectué par un sous-traitant.
								</li>
								<li>Assurer la protection des données à caractère personnel contre toute perte ou destruction non souhaitée.</li>
								<li>
									Veiller à ce que les données à caractère personnel collectées à des fins différentes puissent être traitées séparément et
									soient traitées séparément.
								</li>
								<li>Veiller à ce que les données à caractère personnel soient conservées uniquement aussi longtemps que nécessaire.</li>
							</ul>
						</div>
					</Collapse>

					<Collapse title="Partage de renseignements">
						<p>
							Broadsign partage uniquement des renseignements personnels avec d'autres sociétés ou à des personnes à l'extérieur de Broadsign dans
							les circonstances limitées prévues ci-dessous&nbsp;:
						</p>
						<p>
							Nous avons obtenu votre consentement. Nous exigeons le consentement d'inclusion pour le partage de tout renseignement personnel de
							nature sensible.
						</p>
						<p>
							Nous fournissons ces renseignements à nos filiales, à nos sociétés affiliées ou à d'autres partenaires de confiance dans le but de
							traiter des renseignements personnels en notre nom. Nous exigeons que ces parties acceptent de traiter ces renseignements selon nos
							indications et en conformité avec la présente politique de confidentialité et toute autre mesure de sécurité et de confidentialité
							appropriée.
						</p>
						<p>
							Nous croyons de bonne foi que l'accès, l'utilisation, la préservation ou la divulgation de tels renseignements est raisonnablement
							nécessaire pour; a) satisfaire à toute loi, réglementation, procédure juridique ou requête gouvernementale applicable; b) faire
							respecter les conditions de service applicables, notamment l'enquête sur les violations possibles de celles-ci; c) détecter,
							prévenir ou traiter autrement les problèmes techniques, de fraude ou de sécurité; ou d) se protéger contre les préjudices imminents
							aux droits, à la propriété ou à la sécurité de Broadsign, de ses utilisateurs ou du public, comme requis ou autorisé par la loi.
						</p>
						<p>
							Dans le cas d'une éventuelle fusion, acquisition ou toute autre forme de vente de certains ou de l'ensemble de ses actifs, Broadsign
							fournira un préavis avant que les informations personnelles ne soient transférées et ne soient soumises à d'autres règles de
							confidentialité.
						</p>
						<p>
							Nous pourrions partager avec des tiers certains éléments d'information regroupée de nature non personnelle. Ces renseignements ne
							vous identifient pas personnellement.
						</p>
						<p>
							Veuillez communiquer avec nous à l'adresse ci-dessous pour toute question supplémentaire concernant la gestion ou l'utilisation des
							données à caractère personnel.
						</p>
					</Collapse>
					<Collapse title="Vos droits">
						<div>
							<p>Parmi vos droits figurent&nbsp;:</p>
							<ul>
								<li>L'accès à l'information;</li>
								<li>L'opposition au traitement des données;</li>
								<li>L'opposition à la prise de décision automatisée et au profilage;</li>
								<li>La limitation du traitement des données;</li>
								<li>La portabilité des données;</li>
								<li>La rectification des données;</li>
								<li>L'effacement des données.</li>
							</ul>
						</div>
						<p>
							Si vous faites une demande relativement aux droits énumérés ci-dessus, nous l'examinerons conformément aux lois et règlements
							applicables en matière de protection des données. Aucuns frais d'administration ne seront exigés pour étudier la demande ou s'y
							conformer à moins que la demande ne soit considérée comme étant de nature inutile ou excessive.
						</p>
						<div>
							<p>
								Vous avez le droit d'obtenir, sur demande présentée par écrit et après vérification de votre identité, les renseignements
								suivants à propos de vos données à caractère personnel&nbsp;:
							</p>
							<ul>
								<li>Les objets de la collecte, du traitement, de l'utilisation et de la conservation des données à caractère personnel;</li>
								<li>
									Les sources desquelles proviennent les données à caractère personnel, si elles n'ont pas été obtenues de la personne
									concernée;
								</li>
								<li>Les catégories auxquelles appartiennent les données à caractère personnel stockées;</li>
								<li>
									Les destinataires ou les catégories de destinataires à qui les données à caractère personnel ont été transmises ou
									pourraient être transmises, ainsi que l'emplacement de ces destinataires;
								</li>
								<li>
									La période de conservation prévue des données à caractère personnel ou une justification permettant de déterminer la durée
									de conservation;
								</li>
								<li>Le recours à toute prise de décision automatisée, y compris au profilage;</li>
								<li>
									Le droit de la personne concernée&nbsp;:
									<ul>
										<li>de s'opposer au traitement de ses données à caractère personnel,</li>
										<li>de porter plainte auprès d'une autorité de protection des données,</li>
										<li>de demander la rectification ou l'effacement de ses données à caractère personnel,</li>
										<li>de demander la limitation du traitement de ses données à caractère personnel.</li>
									</ul>
								</li>
							</ul>
						</div>
						<p>
							Une réponse sera donnée dans les trente (30) jours suivant la réception de la demande écrite de la personne concernée. Les
							procédures de vérification doivent confirmer que le demandeur est bien la personne concernée ou son représentant légal autorisé. Les
							personnes concernées ont le droit d'exiger que Broadsign corrige ou complète des données à caractère personnel erronées, trompeuses,
							désuètes ou incomplètes.
						</p>
						<div>
							<p>
								Si nous ne sommes pas en mesure de fournir une réponse complète à la demande dans un délai de trente (30) jours, nous fournirons
								tout de même les renseignements suivants à la personne concernée ou à son représentant légal autorisé dans le délai prévu&nbsp;:
							</p>
							<ul>
								<li>Un accusé de réception de la demande;</li>
								<li>Tous renseignements localisés au moment de produire l'accusé de réception;</li>
								<li>
									Les détails de tous renseignements ou de toutes modifications qui ne seront pas fournis à la personne concernée, la ou les
									raisons du refus, ainsi que toutes voies de recours possibles pour contester la décision;
								</li>
								<li>La date approximative à laquelle les réponses manquantes seront fournies;</li>
								<li>
									Une estimation des frais devant être assumés par la personne concernée (p. ex.&nbsp;: pour une demande qui est de nature
									excessive);
								</li>
								<li>Le nom et les coordonnées du représentant de Broadsign à contacter pour obtenir un suivi.</li>
							</ul>
						</div>
						<p>
							Il convient de noter que dans certaines situations, le fait de fournir les renseignements demandés par la personne concernée
							divulguerait les données à caractère personnel d'une autre personne. En pareil cas, les renseignements devront être censurés, ou ne
							devront pas être divulgués, dans la mesure où cela est nécessaire ou approprié pour protéger les droits de cette personne.
						</p>
						<p>Pour demander l'accès à l'information, veuillez utiliser le formulaire ci-dessous.</p>
						<Panel className="bg-zircon rounded-xl shadow-A">
							<Form form="privacyPolicy" submitText="Send Request" thankYouMessage="privacyPolicy" />
						</Panel>
					</Collapse>
					<Collapse title="Demandes d'organismes d'application de la loi et divulgation">
						<div>
							<p>
								Sur demande d'un organisme d'application de la loi ou des tribunaux judiciaires, les données à caractère personnel d'une
								personne concernée peuvent être transmises à son insu ou sans son consentement. Ce peut être le cas lorsque la divulgation des
								données à caractère personnel est nécessaire aux fins suivantes&nbsp;:
							</p>
							<ul>
								<li>Prévention ou détection d'actes criminels;</li>
								<li>Arrestation ou traduction en justice des contrevenants;</li>
								<li>Établissement ou recouvrement d'impôts ou de droits;</li>
								<li>Sur l'ordonnance d'un tribunal ou en vertu de toute règle de droit.</li>
							</ul>
						</div>
						<p>
							Si nous traitons des données à caractère personnel à l'une de ces fins, une exception pourrait être faite aux règles de traitement
							décrites dans cette politique, uniquement dans la mesure où ne pas déroger aux règles risquerait de nuire à l'affaire en question.
						</p>
					</Collapse>
					<Collapse title="Modifications à la politique de confidentialité">
						<p>
							Veuillez prendre note que la présente politique de confidentialité pourrait changer de temps à autre. Aucun changement, même mineur,
							entraînant une diminution de vos droits aux termes des présentes ne pourra avoir lieu sans votre consentement exprès. Quoi qu'il en
							soit, nous publierons tout changement sur cette page et, dans le cas où il s'agirait de changements significatifs, nous publierons
							un avis plus important. Chaque version de la présente politique de confidentialité sera identifiée en haut de la page par sa date
							d'entrée en vigueur, et les versions antérieures de cette politique seront préservées dans une archive pour consultation.
						</p>
					</Collapse>
					<Collapse title="Définitions">
						<p>Les termes figurant ci-dessous, qui sont utilisés dans la présente politique, sont définis comme suit&nbsp;:</p>
						<p>
							<b>Tiers</b>&nbsp;: Une organisation externe avec laquelle Broadsign fait affaire et qui est également autorisée, sous l'autorité
							directe de Broadsign, à traiter les données à caractère personnel des contacts de Broadsign.
						</p>
						<p>
							<b>Données à caractère personnel</b>&nbsp;: Toute information (y compris les opinions et les intentions) concernant une personne
							physique identifiée ou identifiable.
						</p>
						<p>
							<b>Contact</b>&nbsp;: Tout ancien client ou client actuel ou potentiel de Broadsign.
						</p>
						<p>
							<b>Personne physique identifiable</b>&nbsp;: Toute personne pouvant être identifiée, directement ou indirectement, notamment par
							référence à un identifiant, tel qu'un nom, un numéro d'identification, des données de localisation, un identifiant en ligne, ou à un
							ou plusieurs éléments spécifiques propres à son identité physique, physiologique, génétique, mentale, économique, culturelle ou
							sociale.
						</p>
						<p>
							<b>Responsable du traitement</b>&nbsp;: Une personne physique ou morale, une autorité publique, une agence ou un autre organisme
							qui, seul ou conjointement avec d'autres, détermine les finalités et les moyens du traitement des données à caractère personnel.
						</p>
						<p>
							<b>Entité de Broadsign</b>&nbsp;: Un établissement de Broadsign, y compris les filiales et les coentreprises sur lesquelles
							Broadsign exerce des activités de gestion..
						</p>
						<p>
							<b>Personne concernée</b>&nbsp;: La personne physique identifiée ou identifiable à laquelle les données se réfèrent.
						</p>
						<p>
							<b>Traitement des données</b>&nbsp;: Toute opération ou tout ensemble d'opérations effectuées ou non à l'aide de procédés
							automatisés. Les opérations effectuées peuvent comprendre la collecte, l'enregistrement, l'organisation, la structuration, le
							stockage, l'adaptation ou la modification, l'extraction, la consultation, l'utilisation, la communication par transmission, la
							diffusion ou toute autre forme de mise à disposition, le rapprochement ou l'interconnexion, la limitation, l'effacement ou la
							destruction.
						</p>
						<p>
							<b>Protection des données</b>&nbsp;: Le processus de protection des données à caractère personnel contre la divulgation, l'accès,
							l'altération, le traitement, le transfert ou la destruction non autorisés ou illicites.
						</p>
						<p>
							<b>Autorité de protection des données</b>&nbsp;: Une autorité publique indépendante responsable de contrôler l'application des
							règlements en matière de protection des données, conformément aux lois nationales.
						</p>
						<p>
							<b>Consentement</b>&nbsp;: Toute manifestation de volonté, libre, spécifique, éclairée et univoque par laquelle la personne
							concernée accepte, par une déclaration ou par un acte positif clair, que des données à caractère personnel la concernant fassent
							l'objet d'un traitement.
						</p>
						<p>
							<b>Catégories particulières de données</b>&nbsp;: Données à caractère personnel révélant l'origine raciale ou ethnique, les opinions
							politiques, les convictions religieuses ou philosophiques ou l'appartenance syndicale; données concernant la santé, la vie sexuelle
							ou l'orientation sexuelle; ou données génétiques ou biométriques.
						</p>
						<p>
							<b>Profilage</b>&nbsp;: Toute forme de traitement automatisé de données à caractère personnel consistant à utiliser ces données pour
							évaluer certains aspects personnels généraux ou spécifiques relatifs à une personne physique, notamment pour analyser ou prédire des
							éléments concernant le rendement au travail, la situation économique, la santé, les préférences personnelles, les intérêts, la
							fiabilité, le comportement, la localisation ou les déplacements de cette personne physique.
						</p>
						<p>
							<b>Chiffrement</b>&nbsp;: Le processus de conversion d'information ou de données en codes, afin d'éviter tout accès non autorisé.
						</p>
						<p>
							<b>Pseudonymisation</b>&nbsp;: Données traitées de manière à ce qu'aucune personne ne puisse être identifiée à partir de celles-ci
							(que ce soit directement ou indirectement) sans une «&nbsp;clé&nbsp;» permettant de réidentifier les données.
						</p>
						<p>
							<b>Anonymisation</b>&nbsp;: Données traitées de manière à ce qu'aucune personne ne puisse être identifiée à partir de celles-ci (que
							ce soit directement ou indirectement) par quelque moyen ou quelque personne que ce soit.
						</p>
					</Collapse>
					<Collapse title="Traitement des plaintes">
						<p>
							Lorsque vous déposez une plainte, une enquête est menée dans la mesure appropriée, selon le bien-fondé de chaque cas. Nous nous
							engageons à vous informer de l'évolution et de l'aboutissement de la plainte dans un délai raisonnable.
						</p>
						<p>
							Si le problème ne peut pas être résolu par une consultation entre les parties, vous pourriez avoir le droit de demander une
							réparation ou une médiation, de recourir à l'arbitrage exécutoire, de procéder par voie de litige ou de faire une plainte à
							l'autorité de protection des données du territoire de compétence concerné.
						</p>
					</Collapse>
					<Collapse title="Date d'entrée en vigueur">
						<p>Cette politique entre en vigueur à compter du 10 mai 2018.</p>
					</Collapse>
					<Collapse title="Communiquer avec nous">
						<p>
							N'hésitez pas à envoyer vos questions ou commentaires sur la présente politique de confidentialité ou sur le traitement des
							renseignements personnels par Broadsign à l'adresse <a href="mailto:broadsign-info@broadsign.com">broadsign-info@broadsign.com</a>{" "}
							ou au 700, boulevard René-Lévesque Ouest, Suite #1200, 12<sup>e</sup> étage, Montréal, Québec, Canada, H3B 1X8.
						</p>
					</Collapse>
				</Container>
			</React.Suspense>
		</div>
	);
}
