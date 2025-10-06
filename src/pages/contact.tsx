import React from "react";
import { graphql } from "gatsby";
import T from "i18n-react";
import { useDico } from "@hooks/useDico";
import route, { routeWithUtmForm } from "@route";
import clsx from "clsx";

import Container from "@components/Container";
import Form from "@components/Form";
import { GatsbyImage as Img } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Link from "@components/LocalizedLink";
import NeonBox from "@components/NeonBox";

import icon_support from "@img/pages/contact/icon_support.svg";
import icon_careers from "@img/pages/contact/icon_careers.svg";
import icon_phone from "@img/pages/contact/icon_phone.svg";
import icon_sound from "@img/pages/contact/icon_sound.svg";

import "@sass/pages/contact.scss";

function Box({ icon, name, to }) {
	return (
		<Link to={to} className="Box">
			<NeonBox>
				<img src={icon} alt="" />
				<h2 className="text-30 text-transform-none mb-2 sm:text-34">{T.translate(`boxes.${name}.title`)}</h2>
				<p className="link_cerulean_arrow text-cerulean m-0">{T.translate(`boxes.${name}.cta`)}</p>
			</NeonBox>
		</Link>
	);
}

function Phone({ name }) {
	return (
		<div className="Phone col-12 flex align-items-center justify-content-start sm:col-6 sm:justify-content-center">
			<Link to={"tel:" + T.translate(`phones.${name}.number`)} className="flex">
				<img src={icon_phone} alt="" className="icon mr-2" />
				<img src={icon_sound} alt="" className="sound mr-2" />
				<div>
					<h2 className="text-white text-20 font-medium text-transform-none mb-0 sm:text-24">{T.translate(`phones.${name}.title`)}</h2>
					<p className="block text-white text-16 m-0">{T.translate(`phones.${name}.number`)}</p>
				</div>
			</Link>
		</div>
	);
}

function LocationCard({ city, coords, bg }) {
	const info = T.texts[city];

	return (
		<div className={clsx("location overflow-hidden rounded-xl", city)}>
			<Img alt="" image={bg} className="bg" objectFit="cover" />
			<Link to={`https://www.google.com/maps/place/${coords}`} className="info z-2">
				<h2 className="text-white text-24 font-bold text-transform-none mb-2">{info.title}</h2>
				<div>
					{info.address.map((line, k) => (
						<p className="text-white line-height-160 m-0" dangerouslySetInnerHTML={{ __html: line }} key={k} />
					))}
				</div>
			</Link>
		</div>
	);
}

export default function ContactPage({ pageContext: { l, dicoPath }, location: { pathname }, data }) {
	useDico(l, dicoPath);

	const icons = {
		support: icon_support,
		careers: icon_careers,
		phone: icon_phone,
	};

	if (l === "zh") {
		return <Layout />;
	}

	const offices = [
		{
			city: "montreal",
			coords: "https://www.google.com/maps/place/Broadsign+International/@45.5014527,-73.5674685,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc91a45495eeed5:0xf4d1bd1176507350!8m2!3d45.5014527!4d-73.5674685!16s%2Fg%2F1tgclxtf?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D",
		},
		{ city: "toronto", coords: "1+University+Ave+Floor+3,+Toronto,+ON+M5J+1S8/@43.64609,-79.3830851,17z" },
		{ city: "berlin", coords: "Oranienburger+Str.+5,+10178+Berlin,+Germany/@52.5237943,13.3991222,17z" },
		{ city: "sydney", coords: "12+Sydney+Rd,+Manly+NSW+2095,+Australia/@-33.79702,151.2845017,17z" },
		{ city: "shanghai", coords: "550+Yan'an+Rd+(E),+Huang+Pu+Qu,+Shang+Hai+Shi,+China,+200002/@31.2308146,121.4790151,16z" },
		{
			city: "amsterdam",
			coords: "OutMoove/@52.3481194,4.9125504,16z/data=!4m16!1m9!3m8!1s0x47c60981a218010d:0x76ec2d11a2732f43!2sMr.Treublaan+7,+1097+DP+Amsterdam,+Pays-Bas!3b1!8m2!3d52.3481162!4d4.9151253!10e3!16s%2Fg%2F11c1zr_fcw!3m5!1s0x47c60930c2a0c511:0x952c1cca84f94601!8m2!3d52.3481525!4d4.9151033!16s%2Fg%2F11h8j6_r9y",
		},
		{
			city: "st_louis",
			coords: "/Broadsign+International/@38.6686837,-90.4391247,17z/data=!3m1!5s0x87df334e5a0ff717:0x91b9c5537b86ea2f!4m16!1m9!3m8!1s0x87df32bc1ae2cadd:0x10e7883e8e10a49d!2s680+Craig+Rd+Suite+101,+St.+Louis,+MO+63141!3b1!8m2!3d38.6686795!4d-90.4365498!10e3!16s%2Fg%2F11qg140wt1!3m5!1s0x87df333387f9a65f:0xcba08a2e120d6176!8m2!3d38.6686795!4d-90.4365498!16s%2Fg%2F11w4jvz2ct",
		},
	];

	return (
		<Layout id="contact" className="theme_carolina">
			<Container tag="section" className="hero">
				<div className="grid">
					<div className="col-12 sm:col-6 sm:flex-order-2">
						<div className="grid mb-4 sm:mb-0">
							<div className="col-6 flex align-items-center sm:col-12 sm:hidden">
								<h1 className="text-30 text-transform-none sm:hidden sm:text-34">{T.translate("hero.title")}</h1>
							</div>
							<div className="col-6 sm:col-12">
								<div className="hero_img_wrapper bg-gradient mx-auto sm:mr-0">
									<div className="inner bg">
										<Img className="image" image={data.hero.childImageSharp.gatsbyImageData} alt="" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 sm:col-6 sm:flex-order-1">
						<div className="pt-0 pb-15 sm:pt-15">
							<h1 className="text-30 text-transform-none mb-8 hidden sm:block sm:text-34">{T.translate("hero.title")}</h1>
							<Form form="contact" submitText="Get in touch" redirectUrl={routeWithUtmForm("thankYou", "contact_us")} />
						</div>
					</div>
				</div>
			</Container>
			<Container tag="section" className="neck mb-20">
				<div className="grid mb-2">
					<div className="col-12 sm:col-6">
						<Box icon={icons["support"]} name="support" to="mailto:services@broadsign.com" />
					</div>
					<div className="col-12 sm:col-6">
						<Box icon={icons["careers"]} name="careers" to="careers" />
					</div>
				</div>
				<div className="bg-gradient px-4 py-8 rounded-xl sm:px-6 md:px-8">
					<div className="grid">
						<Phone name="montreal" />
						<Phone name="international" />
					</div>
				</div>
			</Container>
			<Container tag="section" className="locations my-10 sm:my-16">
				<div className="sm:text-center">
					<p className="subtitle-1 gradient font-medium">{T.translate("ourOffices")}</p>
					<h2 className="text-30 text-transform-none mb-8 sm:text-34">{T.translate("aroundTheWorld")}</h2>
				</div>
				<div className="grid">
					{offices.map(({ city, coords }) => (
						<LocationCard city={city} coords={coords} bg={data[city].childImageSharp.gatsbyImageData} key={city} />
					))}
				</div>
			</Container>
		</Layout>
	);
}

export const queryContact = graphql`
	query ContactImages {
		hero: file(relativePath: { eq: "pages/contact/hero.png" }) {
			...img
		}

		montreal: file(relativePath: { eq: "pages/contact/location_montreal.jpg" }) {
			...img
		}
		toronto: file(relativePath: { eq: "pages/contact/location_toronto.jpg" }) {
			...img
		}
		amsterdam: file(relativePath: { eq: "pages/contact/location_amsterdam.jpg" }) {
			...img
		}
		berlin: file(relativePath: { eq: "pages/contact/location_berlin.jpg" }) {
			...img
		}
		sydney: file(relativePath: { eq: "pages/contact/location_sydney.jpg" }) {
			...img
		}
		shanghai: file(relativePath: { eq: "pages/contact/location_shanghai.jpg" }) {
			...img
		}
		st_louis: file(relativePath: { eq: "pages/contact/location_st_louis.jpg" }) {
			...img
		}
	}
`;
