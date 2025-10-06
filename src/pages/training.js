import React, { useMemo } from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";

import ImgHat from "@components/ImgHat";
import Layout from "@components/layout";
import Row from "@components/Row";
import Tank from "@components/Tank";

import "@sass/pages/training.scss";

export default function Training({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	useDico(l, dicoPath);

	if (l === "zh") {
		return <Layout />;
	}

	return (
		<Layout id="page_training">
			<Tank id="intro">
				<Tank div>
					<h1 className="title">{T.translate("Hero.Title")}</h1>
					<p>{T.translate("Hero.Paragraph1")}</p>
					<p>{T.translate("Hero.Paragraph2")}</p>
					<p>{T.translate("Hero.Paragraph3")}</p>
				</Tank>
			</Tank>
			<Tank className="training">
				<Row>
					<ImgHat src={data.coreTraining.childImageSharp.gatsbyImageData}>
						<h3>{T.translate("trainings.broadsignTraining.Title")}</h3>
						<p>{T.translate("trainings.broadsignTraining.Paragraph")}</p>
					</ImgHat>
					<ImgHat src={data.custonTraining.childImageSharp.gatsbyImageData}>
						<h3>{T.translate("trainings.expertTraining.Title")}</h3>
						<p>{T.translate("trainings.expertTraining.Paragraph")}</p>
					</ImgHat>
					<ImgHat src={data.expertTraining.childImageSharp.gatsbyImageData}>
						<h3>{T.translate("trainings.customizedTraining.Title")}</h3>
						<p>{T.translate("trainings.customizedTraining.Paragraph")}</p>
					</ImgHat>
				</Row>
			</Tank>
			<Tank className="quotes">
				<Row>
					<ImgHat src={data.quote1.childImageSharp.gatsbyImageData}>
						<p>{T.translate("quotes.quote1.Paragraph1")}</p>
						<p>{T.translate("quotes.quote1.Paragraph2")}</p>
						<p className="user">{T.translate("quotes.quote1.User")}</p>
						<p>{T.translate("quotes.quote1.Company")}</p>
					</ImgHat>
					<div className="vertical_line" />
					<ImgHat src={data.quote2.childImageSharp.gatsbyImageData}>
						<p>{T.translate("quotes.quote2.Paragraph")}</p>
						<p className="user">{T.translate("quotes.quote2.User")}</p>
						<p>{T.translate("quotes.quote2.Company")}</p>
					</ImgHat>
				</Row>
			</Tank>
		</Layout>
	);
}

export const trainingImg = graphql`
	query TrainingImages {
		HeaderImg: file(relativePath: { eq: "icons/training_header_logo.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		coreTraining: file(relativePath: { eq: "icons/icon_core_training.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		custonTraining: file(relativePath: { eq: "icons/icon_expert_training.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		expertTraining: file(relativePath: { eq: "icons/icon_custom_training.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		quote1: file(relativePath: { eq: "icons/icon_training_quote_1.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		quote2: file(relativePath: { eq: "icons/icon_training_quote_2.png" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		videoTutoriaIntro: file(relativePath: { eq: "video_posters/tutorial_intro_install.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		videoTutorialLoop: file(relativePath: { eq: "video_posters/tutorial_loop_policies.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
		videoTutorialQuick: file(relativePath: { eq: "video_posters/tutorial_quick_start.jpg" }) {
			childImageSharp {
				gatsbyImageData
			}
		}
	}
`;
