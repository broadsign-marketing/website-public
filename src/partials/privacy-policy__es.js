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
				<h1>Política de protección de datos</h1>
				<p>
					En Broadsign, sabemos que la privacidad es importante. Esta Política de privacidad se aplica a todos los productos, los servicios y los
					sitios web ofrecidos por Broadsign International, Inc. o sus subsidiarias o filiales que, en conjunto, se mencionan como los “servicios” de
					Broadsign.
				</p>
				<p>
					No dude en enviarnos sus preguntas o inquietudes sobre esta Política de privacidad o sobre cómo Broadsign trata la información personal a
					broadsign-info@broadsign.com o bien escribirnos a:<a href="mailto:broadsign-info@broadsign.com"> broadsign-info@broadsign.com </a>o a 700,
					boulevard René-Lévesque Ouest, Suite #1200, 12<sup>e</sup> étage, Montréal, Québec, Canada, H3B 1X8.
				</p>
				<h3>
					AVISO SOBRE EL ESCUDO DE LA PRIVACIDAD UE-EE. UU., LA LEY ANTI-SPAM DE CANADÁ Y LA LEY DE PROTECCIÓN DE LA INFORMACIÓN PERSONAL Y
					DOCUMENTACIÓN ELECTRÓNICA
				</h3>
				<p>
					Es posible que recibamos Información personal de parte de particulares que se encuentren en el Espacio Económico Europeo o en Suiza.
					Cumplimos con los principios del Escudo de la Privacidad UE-EE. UU. (Principios del Escudo de la Privacidad) con respecto a la recolección,
					el uso y la conservación de la Información personal que provenga del Espacio Económico Europeo y Suiza. En caso de conflicto entre los
					términos de esta Declaración de privacidad y los Principios del Escudo de la Privacidad con respecto al procesamiento de la Información
					personal proveniente del Espacio Económico Europeo o Suiza, prevalecerán los Principios del Escudo de la Privacidad. Para obtener más
					información sobre el marco del Escudo de la Privacidad y visualizar la certificación, visite
					<a href="https://www.privacyshield.gov/welcome"> https://www.privacyshield.gov/</a>.
				</p>
				<p>
					En cumplimiento de los Principios del Escudo de la Privacidad, nos comprometemos a resolver los conflictos que surjan sobre la recolección o
					el uso de su Información personal. Los particulares de la Unión Europea y de Suiza que tengan inquietudes o reclamos respecto de nuestro
					cumplimiento de los Principios del Escudo de la Privacidad deben comunicarse primero como se indica más adelante en la sección
					“Contáctenos”. En determinados casos, podría ser posible que usted solicite un arbitraje vinculante. Broadsign está sujeto a las facultades
					de investigación y cumplimiento de la Comisión de Federal de Comercio de los EE. UU. con respecto a su cumplimiento de los Principios del
					Escudo de la Privacidad.
				</p>
				<p>
					Asimismo, nos comprometemos a colaborar con las autoridades de protección de datos (APD) de la Unión Europea y de Suiza con respecto a todos
					los reclamos pendientes que involucren el Escudo de la Privacidad y su Información personal en el contexto de la relación laboral. Si usted
					no recibe una confirmación oportuna de su reclamo de parte nuestra, o si no hemos abordado su reclamo de manera satisfactoria, comuníquese
					con las APD de la Unión Europea o de Suiza para obtener más información o para presentar un reclamo. Los servicios de las APD de la Unión
					Europea y de Suiza se brindan de manera gratuita.
				</p>
				<p>
					Como se indica más adelante, podemos compartir su Información personal con nuestros prestadores de servicios, quienes están exigidos por ley
					o por un contrato a protegerla, y solo podrán hacer uso de ella de conformidad con nuestras indicaciones. En determinados casos, podríamos
					ser responsables por los actos de estos terceros en caso de que procesaran la información de manera que incumpla los Principios del Escudo
					de la Privacidad.
				</p>
				<p>
					Podríamos tener que divulgar su Información personal si así se nos requiere en un proceso legal o por imperio de la ley, como, por ejemplo,
					en respuesta a una citación judicial, incluso para cumplir con requisitos de seguridad nacional o de las fuerzas policiales en los Estados
					Unidos y en otros países en los que operamos.
				</p>
			</Container>
			<React.Suspense>
				<Container className="mt-12">
					<Collapse title="La información que recolectamos" active={openCookiePolicy}>
						<Element name="info_we_collect">
							<p>A fin de prestar nuestra cartera completa de servicios, podemos recolectar los siguientes tipos de información:</p>
						</Element>
						<p>
							Información brindada por usted: al suscribirse para una Cuenta de Broadsign u otro servicio o promoción de Broadsign que requiera
							registrarse, le solicitamos información personal (como su nombre, dirección de correo electrónico y una contraseña para su cuenta).
							Para determinados servicios, también podríamos solicitarle información sobre su tarjeta de crédito u otra cuenta de pago, la cual
							mantendremos encriptada en servidores seguros. Podríamos combinar la información que usted envíe desde su cuenta con información de
							otros servicios de Broadsign o de terceros a fin de brindarle una mejor experiencia y de mejorar la calidad de nuestros servicios.
							Para determinados servicios, podríamos brindarle la oportunidad de optar por solicitarnos que no combinemos dicha información.
						</p>
						<p>
							Cookies: cuando usted visita Broadsign, enviamos una o más cookies, un pequeño archivo que contiene una serie de caracteres, a su
							computadora. Este archivo identifica su navegador de forma única. Utilizamos las cookies para mejorar la calidad de nuestro servicio
							al almacenar las preferencias de los usuarios y realizar un seguimiento de las tendencias de estos.
						</p>
						<p>
							Información de registros: cuando usted accede a los servicios de Broadsign, nuestros servidores registran automáticamente la
							información que su navegador envía siempre que visita un sitio web. Estos registros del servidor incluyen información tal como su
							solicitud en la web, la dirección del Protocolo de Internet, el tipo de navegador, el idioma del navegador, la fecha y hora de su
							solicitud y una o más cookies que podrían identificar de manera exclusiva a su navegador.
						</p>
						<p>
							Comunicaciones con los usuarios: cuando usted envía correos electrónicos u otras comunicaciones a Broadsign, podríamos conservar
							dichas comunicaciones a fin de procesar sus inquietudes, responder a sus solicitudes y mejorar nuestros servicios.
						</p>
						<h5>FUENTES DE DATOS</h5>
						<div>
							<p>
								Recolectamos la Información personal únicamente a partir del Sujeto de la información, a menos que se aplique algo de lo
								siguiente:
							</p>
							<ul>
								<li>
									La naturaleza del propósito comercial requiera la recolección de la Información personal de parte de otras personas u
									organismos.
								</li>
								<li>
									La recolección deba realizarse en una situación de urgencia a fin de proteger los intereses vitales del Sujeto de la
									información o para evitar pérdidas o lesiones graves a un tercero.
								</li>
							</ul>
						</div>
						<div>
							<p>
								Si la Información personal es recolectada de un tercero que no sea el Sujeto de la información, informaremos al Sujeto de la
								información respecto de la recolección, a menos que se aplique algo de lo siguiente:
							</p>
							<ul>
								<li>El Sujeto de la información ha recibido la información solicitada por otros medios.</li>
								<li>La información debe permanecer con carácter confidencial debido a una obligación de secreto profesional.</li>
							</ul>
						</div>
					</Collapse>
					<Collapse title="Cómo utilizamos la información recolectada">
						<div>
							<p>
								Broadsign solo procesa información personal a los fines descritos en esta Política de privacidad, como, por ejemplo, los
								siguientes:
							</p>
							<ul>
								<li>Mantener el funcionamiento y la administración general de la empresa y de las Entidades de Broadsign.</li>
								<li>Prestar servicios a los clientes de Broadsign.</li>
								<li>Realizar la administración y la gestión continuas de los servicios al cliente.</li>
								<li>Desarrollar y mejorar los productos y servicios de Broadsign.</li>
							</ul>
						</div>
						<div>
							<p>
								Procesamos la Información personal de conformidad con todas las leyes y las obligaciones contractuales vigentes. Más
								específicamente, no procesamos Información personal al menos que se cumpla uno de los siguientes requisitos:
							</p>
							<ul>
								<li>
									El Sujeto de la información ha prestado consentimiento al procesamiento de su Información personal para uno o más fines
									específicos.
								</li>
								<li>
									El procesamiento es necesario para el cumplimiento de un contrato del cual el Sujeto de la información es parte o a fin de
									tomar medidas a pedido del Sujeto de la información antes de celebrar un contrato.
								</li>
								<li>
									El procesamiento es necesario para el cumplimiento de una obligación legal de la cual el Controlador de la información es el
									sujeto.
								</li>
								<li>
									El procesamiento es necesario a fin de proteger los intereses vitales del Sujeto de la información de otra persona natural.
								</li>
								<li>
									El procesamiento es necesario para el cumplimiento de una tarea realizada en el interés público o en el ejercicio de una
									facultad oficial conferida al Controlador de la información.
								</li>
								<li>
									El procesamiento es necesario a los fines de intereses legítimos del Controlador de la información o un tercero (excepto si
									dichos intereses son sustituidos por los intereses o los derechos y libertades fundamentales del Sujeto de la información,
									en particular cuando el Sujeto de la información sea un menor).
								</li>
							</ul>
						</div>
						<div>
							<p>
								Hay determinados casos en los que la Información personal puede continuar procesándose con fines que superan el fin original
								para el cual se recopiló dicha Información personal. En esos casos, abordaremos las siguientes condiciones adicionales para
								determinar la equidad y la transparencia de todo el procesamiento que exceda el fin original para el cual se recopiló la
								Información personal:
							</p>
							<ul>
								<li>Todo vínculo entre el fin para el cual se recopiló la Información personal y los motivos para continuar procesándola.</li>
								<li>
									El contexto en el cual se ha recopilado la Información personal, en particular con respecto a la relación entre el Sujeto de
									la información y el Controlador de la información.
								</li>
								<li>
									La naturaleza de la Información personal, en particular si se están procesando categorías especiales de información o
									Información personal relacionada con condenas o delitos penales.
								</li>
								<li>Las posibles consecuencias de continuar procesando la Información personal.</li>
								<li>
									La existencia de resguardos adecuados respecto de la continuación del procesamiento, los que pueden incluir el cifrado, la
									anonimización o la pseudoanonimización.
								</li>
							</ul>
						</div>
						<p>
							Broadsign procesa la Información personal presente en nuestros servidores en los Estados Unidos de América, en Canadá y en otros
							países. En algunos casos, procesamos la Información personal en un servidor fuera de nuestro propio país. Podemos procesar
							información personal para prestar nuestros propios servicios. En algunos casos, podemos procesar Información personal en nombre de
							un tercero y según sus instrucciones, como, por ejemplo, nuestros socios publicitarios.
						</p>
						<p>
							Si proponemos utilizar Información personal con fines distintos de los descritos en esta Política de privacidad o en los avisos de
							privacidad específicos de los servicios, le ofreceremos una forma eficaz de rechazar el uso de su Información personal con esos
							fines. No recopilaremos ni utilizaremos información sensible con fines distintos de los descritos en esta Política de privacidad o
							en los avisos de privacidad complementarios de los servicios, a menos que hayamos obtenido su consentimiento previo.
						</p>
						<p>
							La mayoría de los navegadores están inicialmente configurados para aceptar cookies, pero usted puede reconfigurar su navegador para
							rechazar todas las cookies o para que le indique cuando se está enviando una cookie. Sin embargo, algunas funciones y servicios de
							Broadsign podrían no funcionar correctamente si tiene deshabilitadas las cookies.
						</p>
						<p>
							Puede optar por no enviar Información personal a ninguno de nuestros servicios, en cuyo caso Broadsign podría no ser capaz de
							brindárselos.
						</p>
						<h5>categorías especiales de información</h5>
						<div>
							<p>
								Solo procesaremos categorías especiales de información (también conocidas como información sensible) cuando el Sujeto de la
								información haya prestado expresamente su consentimiento a dicho procesamiento o cuando se aplique una de las siguientes
								condiciones:
							</p>
							<ul>
								<li>Todo vínculo entre el fin para el cual se recopiló la Información personal y los motivos para continuar procesándola.</li>
								<li>
									El contexto en el cual se ha recopilado la Información personal, en particular con respecto a la relación entre el Sujeto de
									la información y el Controlador de la información.
								</li>
								<li>
									La naturaleza de la Información personal, en particular si se están procesando categorías especiales de información o
									Información personal relacionada con condenas o delitos penales.
								</li>
								<li>Las posibles consecuencias de continuar procesando la Información personal.</li>
								<li>
									La existencia de resguardos adecuados respecto de la continuación del procesamiento, los que pueden incluir el cifrado, la
									anonimización o la pseudoanonimización.
								</li>
							</ul>
						</div>
						<p>
							Al procesar categorías especiales de información, Broadsign adoptará medidas de protección adicionales. Cada Entidad de Broadsign
							también podrá adoptar medidas adicionales para abordar las expectativas locales respecto a las costumbres o a lo social durante el
							procesamiento de categorías especiales de información.
						</p>
						<h5>información de menores</h5>
						<p>
							Los menores son incapaces de prestar consentimiento al procesamiento de información personal para los servicios sociales de
							información. Intentamos obtener el consentimiento de la persona que tiene la responsabilidad parental sobre el menor. Sin embargo,
							cabe destacar que cuando el procesamiento sea legal debido a otras cuestiones, no es necesario el consentimiento del menor ni de
							quien tenga la responsabilidad parental sobre este.
						</p>
						<h5>calidad de la información</h5>
						<div>
							<p>
								Adoptamos todas las medidas necesarias para garantizar que la Información personal que recolectamos y procesamos sea completa y
								veraz en primera instancia y que esté actualizada a fin de reflejar la situación actual del Sujeto de la información. Las
								medidas que adoptamos para garantizar la calidad de la información incluyen las siguientes:
							</p>
							<ul>
								<li>
									Corregir la Información personal que sabemos que es incorrecta, imprecisa, incompleta, ambigua, confusa o desactualizada,
									incluso si el Sujeto de la información no solicita la rectificación.
								</li>
								<li>
									Mantener la Información personal solo durante el período necesario para cumplir con los usos permitidos o con el período de
									retención legal vigente.
								</li>
								<li>
									Eliminar la Información personal que infrinja alguno de los Principios de protección de la información, o bien si la
									Información personal ya no es necesaria.
								</li>
								<li>
									Restringir, en lugar de eliminar, la Información personal siempre que:
									<ul>
										<li>La ley prohíba su eliminación.</li>
										<li>La eliminación perjudique los intereses legítimos del Sujeto de la información.</li>
										<li>
											El Sujeto de la información alegue que su Información personal es correcta y que no pueda determinarse claramente si
											es correcta o incorrecta.
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</Collapse>
					<Collapse title="Retención de la información">
						<p>
							No retenemos Información personal durante más tiempo del necesario en relación con los fines para los cuales se recolectó
							originalmente, o para los cuales se procesó.
						</p>
					</Collapse>
					<Collapse title="Protección de la información">
						<div>
							<p>
								Adoptamos medidas físicas, técnicas y organizacionales para garantizar la seguridad de la Información personal. Esto incluye la
								prevención de la pérdida o el daño; la modificación, el acceso o el procesamiento no autorizados y otros riesgos a los cuales
								podría estar expuesta en virtud de la acción humana o del entorno físico o natural. Las medidas que tomamos incluyen las
								siguientes:
							</p>
							<ul>
								<li>
									Evitar que personas no autorizadas tengan acceso a los sistemas de procesamiento de la información en los que se procesa la
									Información personal.
								</li>
								<li>
									Evitar que las personas autorizadas a utilizar el sistema de procesamiento de la información tengan acceso a la Información
									personal más allá de sus necesidades y autorizaciones.
								</li>
								<li>
									Garantizar que la Información personal en el curso de la transmisión electrónica durante el transporte no pueda ser leída,
									copiada, modificada ni eliminada sin autorización.
								</li>
								<li>
									Garantizar que los registros de acceso estén disponibles para establecer si se tuvo acceso, se modificó o se eliminó la
									Información personal de un sistema de procesamiento de la información, y quién fue el responsable.
								</li>
								<li>
									Garantizar que, en caso de que el procesamiento lo lleve a cabo un Procesador de información, la información pueda
									procesarse solo de acuerdo con las instrucciones del Controlador de la información.
								</li>
								<li>Garantizar que la Información personal esté protegida frente a la destrucción o pérdida indeseadas.</li>
								<li>Garantizar que la Información personal recolectada con fines distintos pueda y sea procesada en forma separada.</li>
								<li>Garantizar que la Información personal no se conserve durante más tiempo del necesario.</li>
							</ul>
						</div>
					</Collapse>
					<Collapse title="Transmisión de la información">
						<p>Broadsign solo comparte Información personal con otras empresas o personas ajenas a Broadsign en los siguientes casos puntuales:</p>
						<p>Tenemos su consentimiento. Requerimos un consentimiento afirmativo para compartir cualquier Información personal sensible.</p>
						<p>
							Brindamos dicha información a nuestras subsidiarias, filiales u otras empresas o personas de confianza con el fin de procesar la
							Información personal en nuestra representación. Requerimos que estas partes acuerden procesar dicha información en función de
							nuestras instrucciones y en cumplimiento de esta Política de privacidad y de cualquier otra medida de confidencialidad y seguridad
							que corresponda.
						</p>
						<p>
							Creemos de buena fe que el acceso, el uso, la preservación o la divulgación de dicha información es razonablemente necesario para
							(a) cumplir con alguna ley, norma, proceso legal o solicitud gubernamental vigentes; (b) cumplir con Términos de servicio vigentes,
							incluida una posible investigación de infracciones de dichos términos; (c) detectar, prevenir o abordar fraudes o problemas técnicos
							o de seguridad; o (d) brindar protección frente a un daño inminente a los derechos, la propiedad o la seguridad de Broadsign, sus
							usuarios o el público, conforme lo requiera o lo permita la ley.
						</p>
						<p>
							Si Broadsign queda implicado en una fusión, adquisición o cualquier tipo de venta de parte de sus activos o de todos ellos,
							brindaremos un aviso antes de transferir Información personal y de que esta esté sujeto a una política de privacidad distinta.
						</p>
						<p>
							Podemos compartir con terceros partes de información combinada de índole no personal. Dicha información no lo identifica
							personalmente.
						</p>
						<p>
							Comuníquese con nosotros a la dirección que figura más adelante si tiene alguna otra pregunta sobre la gestión o el uso de la
							información personal.
						</p>
					</Collapse>
					<Collapse title="Sus derechos">
						<div>
							<p>Usted tiene derecho a solicitar lo siguiente:</p>
							<ul>
								<li>Acceso a la información.</li>
								<li>Objeción al procesamiento.</li>
								<li>Objeción a la toma de decisiones y la creación de perfiles automatizadas.</li>
								<li>Restricción del procesamiento.</li>
								<li>Portabilidad de la información.</li>
								<li>Rectificación de la información.</li>
								<li>Eliminación de la información.</li>
							</ul>
						</div>
						<p>
							En caso de realizar una solicitud relacionada con cualquier de los derechos enumerados anteriormente, contemplaremos dicha solicitud
							de conformidad con todas las leyes y normas vigentes en materia de protección de la información. No se cobrará ningún arancel
							administrativo por contemplar o cumplir con dicha solicitud a menos que esta se considere innecesaria o excesiva en su naturaleza.
						</p>
						<div>
							<p>
								Usted tiene derecho a obtener, en función de una solicitud realizada por escrito previa verificación satisfactoria de su
								identidad, la siguiente información sobre su Información personal:
							</p>
							<ul>
								<li>Los fines de la recolección, el procesamiento, el uso y el almacenamiento de su Información personal.</li>
								<li>Las fuentes de la Información personal, si no se obtuvo de parte del Sujeto de la información.</li>
								<li>Las categorías de Información personal almacenadas sobre el Sujeto de la información.</li>
								<li>
									Los destinatarios o las categorías de destinatarios a quienes se ha transmitido o podría transmitirse la Información
									personal, junto con la ubicación de dichos destinatarios.
								</li>
								<li>
									El período previsto de almacenamiento de la Información personal o la justificación para determinar el período de
									almacenamiento.
								</li>
								<li>El uso de cualquier toma de decisiones automatizada, incluida la creación de perfiles.</li>
								<li>
									El derecho del Sujeto de la información a:
									<ul>
										<li>Objetar el procesamiento de su Información personal.</li>
										<li>Presentar un reclamo frente a una Autoridad de protección de la información.</li>
										<li>Solicitar la rectificación o la eliminación de su Información personal.</li>
										<li>Solicitar la restricción del procesamiento de su Información personal.</li>
									</ul>
								</li>
							</ul>
						</div>
						<p>
							Se brindará una respuesta a cada solicitud dentro de los 30 días de la recepción de la solicitud por escrito de parte del Sujeto de
							la información. La verificación adecuada debe confirmar que el solicitante es el Sujeto de la información o su representante legal
							autorizado. Los Sujetos de la información tendrán derecho a solicitar a Broadsign la corrección o la complementación de Información
							personal errónea, confusa, desactualizada o incompleta.
						</p>
						<div>
							<p>
								Si no podemos responder completamente a la solicitud dentro de los 30 días, le brindaremos la siguiente información a usted o a
								su representante legal autorizado dentro del plazo especificado:
							</p>
							<ul>
								<li>Un acuse de recibo de la solicitud.</li>
								<li>Cualquier información ubicada hasta la fecha.</li>
								<li>
									Detalles de la información o las modificaciones solicitadas que no se brindarán al Sujeto de la información, los motivos del
									rechazo y cualquier procedimiento disponibles para apelar dicha decisión.
								</li>
								<li>Una fecha estimada en la cual se brindarán las respuestas pendientes.</li>
								<li>
									Un cálculo de los costos que deberá abonar el Sujeto de la información (p. ej., si la solicitud es excesiva en su
									naturaleza).
								</li>
								<li>
									El nombre y la información de contacto de la persona de Broadsign con quien debe comunicarse el Sujeto de la información
									para el seguimiento.
								</li>
							</ul>
						</div>
						<p>
							Cabe destacar que pueden surgir situaciones en las que brindar la información solicitada por el Sujeto de la información divulgaría
							Información personal sobre un tercero. En esos casos, la información debe redactarse o retenerse según sea necesario o adecuado para
							proteger los derechos de ese tercero.
						</p>
						<p>To request your data, please use the form below</p>
						<Panel className="bg-zircon rounded-xl shadow-A">
							<Form form="privacyPolicy" submitText="Send Request" thankYouMessage="privacyPolicy" />
						</Panel>
					</Collapse>
					<Collapse title="Solicitudes y divulgaciones de parte de la justicia">
						<div>
							<p>
								Si lo solicitan organismos policiales o tribunales judiciales, puede compartirse Información personal sin el conocimiento o el
								consentimiento del Sujeto de la información. Esto sucede cuando la divulgación de la Información personal es necesaria por
								cualquiera de los siguientes fines:
							</p>
							<ul>
								<li>La prevención o detección de un delito.</li>
								<li>La detención o sentencia de delincuentes.</li>
								<li>La evaluación o cobro de un impuesto o cargo aduanero.</li>
								<li>Por orden de un tribunal o por imperio de la ley.</li>
							</ul>
						</div>
						<p>
							Si procesamos Información personal con uno de estos fines, podría aplicarse una excepción a las normas de procesamiento descritas en
							esta política, pero solo siempre que al no hacerlo se pusiera en riesgo la causa en cuestión.
						</p>
					</Collapse>
					<Collapse title="Modificaciones de esta política de privacidad">
						<p>
							Tenga en cuenta que esta Política de privacidad puede modificarse en forma periódica. No disminuiremos sus derechos conforme a esta
							Política de privacidad sin su consentimiento explícito, y esperamos que la mayor parte de los cambios sean menores. Sin embargo,
							publicaremos las modificaciones de esta Política de privacidad en esta página y, en caso de que los cambios sean significativos, le
							enviaremos un aviso más notorio. Cada versión de esta Política de privacidad se identificará en la parte superior de la página por
							su fecha de entrada en vigencia, y también mantendremos las versiones anteriores de esta Política de privacidad en un archivo para
							que usted pueda revisarlas.
						</p>
					</Collapse>
					<Collapse title="Definiciones">
						<p>A continuación, se definen algunos términos empleados en esta Política de privacidad.</p>
						<p>
							<b>Tercero</b> : Una organización externa con la cual Broadsign realiza operaciones comerciales y que está autorizado, según una
							orden directa de Broadsign, a procesar la Información personal de los contactos de Broadsign.
						</p>
						<p>
							<b>Información personal</b> : Toda información (incluidas opiniones e intenciones) que se relacionen con una persona natural
							identificada o identificable.
						</p>
						<p>
							<b>Contacto</b> : Todo cliente pasado, presente o futuro de Broadsign.
						</p>
						<p>
							<b>Persona natural identificable</b> : Cualquiera que pueda ser identificado, de forma directa o indirecta; en particular con
							referencia a un identificador como el nombre, un número de identificación, un dato de ubicación, un identificador en línea o uno o
							más factores específicos de la identidad física, fisiológica, genética, mental, económica, cultural o social de esa persona natural.
						</p>
						<p>
							<b>Controlador de la información</b> : Una persona natural o jurídica, una autoridad pública, una agencia u otro organismo que, solo
							o en conjunto con otros, determina los propósitos y los medios de procesamiento de la Información personal.
						</p>
						<p>
							<b>Entidad de Broadsign</b> : Una sede de Broadsign, incluidas las subsidiarias y los emprendimientos conjuntos que Broadsign
							administra.
						</p>
						<p>
							<b>Sujeto de la información</b> : La persona natural identificada o identificable a la cual se refiere la información.
						</p>
						<p>
							<b>Procesar, procesado, procesamiento</b> : Toda operación o conjunto de operaciones realizadas sobre la Información personal o
							sobre conjuntos de Información personal, ya sea por medios automatizados o no. Las operaciones realizadas pueden incluir la
							recolección, el registro, la organización, la estructuración, el almacenamiento, la adaptación o la alteración, la recuperación, la
							consulta, el uso, la divulgación por transmisión, la diseminación o la puesta a disposición, la alineación o la combinación, la
							restricción, la eliminación o la destrucción.
						</p>
						<p>
							<b>Protección de la información</b> : El proceso de resguardar la Información personal frente a la divulgación, el acceso, la
							alteración, el procesamiento, la transferencia o la destrucción no autorizados o ilícitos.
						</p>
						<p>
							<b>Autoridad de protección de la información</b> : Una autoridad pública independiente responsable de supervisar la aplicación de
							las normas relevantes de protección de la información en el ámbito nacional.
						</p>
						<p>
							<b>Consentimiento</b> : Toda indicación brindada de forma libre, específica, informada y no ambigua respecto de la intención del
							Sujeto de la información, mediante la cual hace una declaración o una acción afirmativa que significa la aceptación del
							procesamiento de la Información personal relacionada con él.
						</p>
						<p>
							<b>Categorías especiales de información</b> : Información personal que pertenece o revela el origen racial o étnico, opiniones
							políticas, creencias religiosas o filosóficas, pertenencia a sindicatos; información relacionada con la salud o la vida sexual y la
							orientación sexual; la información genética o los datos biométricos.
						</p>
						<p>
							<b>Creación de perfiles</b> : Cualquier tipo de procesamiento automatizado de la Información personal mediante la cual esta se
							utiliza para evaluar características específicas o generales relacionadas con una persona natural identificable. En particular, para
							analizar o predecir determinados aspectos relacionados con el desempeño laboral, la situación económica, la salud, las preferencias
							personales, los intereses, las responsabilidades, la conducta, la ubicación o el movimiento de esa persona natural.
						</p>
						<p>
							<b>Cifrado</b> : El proceso de convertir información o datos en código para prevenir el acceso no autorizado.
						</p>
						<p>
							<b>Pseudoanonimización</b> : Información enmendada de manera tal que no puede identificarse a ninguna persona a partir de ella (ya
							sea de forma directa o indirecta) sin una “clave” que permita que la información vuelva a identificarse.
						</p>
						<p>
							<b>Anonimización</b> : Información enmendada de manera tal que ningún medio y ninguna persona puede identificar a nadie a partir de
							ella (ya sea de forma directa o indirecta).
						</p>
					</Collapse>
					<Collapse title="Gestión de reclamos">
						<p>
							Al hacer un reclamo, se realizará una investigación del reclamo hasta el límite que sea necesario en función del mérito del caso en
							cuestión. Le informaremos sobre el progreso y el resultado del reclamo dentro de un período razonable.
						</p>
						<p>
							Si no es posible resolver el conflicto entre usted y nosotros, tiene derecho a recurrir a la mediación, a un arbitraje vinculante,
							al litigio judicial o a un reclamo frente a la Autoridad de protección de la información dentro de la jurisdicción que corresponda.
						</p>
					</Collapse>
					<Collapse title="Fecha de entrada en vigencia">
						<p>Esta política entra en vigencia el 10 de mayo de 2018.</p>
					</Collapse>
					<Collapse title="Contáctenos">
						<p>
							No dude en enviarnos sus preguntas o inquietudes sobre esta Política de privacidad o sobre cómo Broadsign trata la información
							personal a<a href="mailto:broadsign-info@broadsign.com"> broadsign-info@broadsign.com </a>o bien escribirnos a: 700, boulevard
							René-Lévesque Ouest, Suite #1200, 12<sup>e</sup> étage, Montréal, Québec, Canada, H3B 1X8.
						</p>
					</Collapse>
				</Container>
			</React.Suspense>
		</div>
	);
}
