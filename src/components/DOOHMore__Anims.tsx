import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import T from "i18n-react";
import clsx from "clsx";
import { loopTo, shuffle } from "@annex";

import { GatsbyImage as Img, IGatsbyImageData } from "gatsby-plugin-image";
import Intersection from "@components/Intersection";

import person_01 from "@img/pages/dooh-more/person_01.svg";
import person_02 from "@img/pages/dooh-more/person_02.svg";
import person_03 from "@img/pages/dooh-more/person_03.svg";
import person_04 from "@img/pages/dooh-more/person_04.svg";
import person_05 from "@img/pages/dooh-more/person_05.svg";
import person_06 from "@img/pages/dooh-more/person_06.svg";
import person_07 from "@img/pages/dooh-more/person_07.svg";
import person_08 from "@img/pages/dooh-more/person_08.svg";
import person_09 from "@img/pages/dooh-more/person_09.svg";
import person_10 from "@img/pages/dooh-more/person_10.svg";
import person_11 from "@img/pages/dooh-more/person_11.svg";
import bubble from "@img/pages/dooh-more/bubble.svg";
import eye from "@img/pages/dooh-more/eye.svg";

import new_buyer_bubble_01 from "@img/pages/dooh-more/feature_02_01_bubble.svg";
import new_buyer_person_01 from "@img/pages/dooh-more/feature_02_01_person.svg";
import new_buyer_rect_01 from "@img/pages/dooh-more/feature_02_01_rectangle.svg";
import new_buyer_bubble_02 from "@img/pages/dooh-more/feature_02_02_bubble.svg";
import new_buyer_person_02 from "@img/pages/dooh-more/feature_02_02_person.svg";
import new_buyer_rect_02 from "@img/pages/dooh-more/feature_02_02_rectangle.svg";
import new_buyer_bubble_03 from "@img/pages/dooh-more/feature_02_03_bubble.svg";
import new_buyer_person_03 from "@img/pages/dooh-more/feature_02_03_person.svg";
import new_buyer_rect_03 from "@img/pages/dooh-more/feature_02_03_rectangle.svg";

type NeckSectionAnimationsProps = {
	images: IGatsbyImageData[];
};

export function FeaturesRotatingTitle() {
	const [pos, setPos] = useState(0);
	const [words, setWords] = useState([{ word: T.texts.features.title.rotatingWords[0], state: "current" }]);

	const allWords = T.texts.features.title.rotatingWords;

	const wrapperRef = useRef(null);

	useEffect(() => {
		function getWordState(pos, k) {
			if (loopTo("next", pos, allWords.length) === k) return "next";
			if (loopTo("next", k, allWords.length) === pos) return "prev";
			if (k === pos) return "current";
			return "";
		}

		function updateLoop() {
			setPos(loopTo("next", pos, allWords.length));
			setWords(
				allWords.map((w, k) => ({
					word: w,
					state: getWordState(pos, k),
				}))
			);
		}

		if (typeof document == "undefined") return;

		const interval = setInterval(updateLoop, 2000);
		return () => clearInterval(interval);
	}, [pos, words, allWords]);

	useEffect(() => {
		if (!wrapperRef.current) return;

		const rotatingElements = wrapperRef.current.querySelectorAll(".rotating");
		let maxWidth = 0;

		if (words.length <= 1) return;

		rotatingElements.forEach((element) => {
			const elementWidth = element.offsetWidth;
			if (elementWidth > maxWidth) {
				maxWidth = elementWidth;
			}
		});

		wrapperRef.current.style.width = `${maxWidth}px`;
	}, [words, wrapperRef]);

	return (
		<h2 className="FeaturesRotatingTitle overtitle text-30 text-transform-none text-center mx-auto mb-15 sm:text-34">
			<span>{T.translate("features.title.p1")}</span>
			<span className="rotating_wrapper relative" ref={wrapperRef}>
				{words.map(({ word, state }) => (
					<span className={clsx("rotating text-gradient font-bold", state)} key={word}>
						{" "}
						{word}{" "}
					</span>
				))}
			</span>
			<span>{T.translate("features.title.p3")}</span>
		</h2>
	);
}

export function FeatureCampaignReallocation({ images }) {
	const handleObserved = useCallback(() => {
		const animatedSlot1 = slotsRef.current.querySelector(".slot.fly_in_1");
		setTimeout(() => animatedSlot1.classList.remove("border-dashed"), 1600);
	}, []);

	const slotsRef = useRef(null);

	return (
		<Intersection className="CampaignReallocation flex flex-column align-items-stretch justify-content-start m-auto" onObserved={() => handleObserved()}>
			<div className="wrapper border-1 border-reflex rounded-xl">
				<div className="header px-2 py-4 border-bottom-1 border-reflex text-14 font-bold sm:px-4">Slots D1</div>
				<div className="hull p-2 flex flex-nowrap align-items-stretch justify-content-between sm:p-4" ref={slotsRef}>
					{images.map((e, k) => {
						const animatedClasses = {
							2: "fly_in fly_in_1 border-dashed z-5",
						};

						return (
							<div className={clsx("slot rounded-10", k in animatedClasses ? animatedClasses[k] : "")} key={k}>
								<Img image={e} className="slot_content rounded-8" alt="" />
							</div>
						);
					})}
				</div>
			</div>
		</Intersection>
	);
}

export function FeatureNewBuyers() {
	const animDelays = shuffle([600, 1200, 1800]);
	const gap = 600;

	return (
		<Intersection className="NewBuyers w-full">
			<div className="profile z-1">
				<img className="person z-1" src={new_buyer_person_01} style={{ transitionDelay: `${animDelays[0]}ms` }} alt="" />
				<img className="bubble z-2" src={new_buyer_bubble_01} style={{ transitionDelay: `${animDelays[0] + gap}ms` }} alt="" />
				<img className="rect z-3" src={new_buyer_rect_01} alt="" />
				<div className="hide_field hide_field_1" style={{ transitionDelay: `${animDelays[0] + gap * 2}ms` }}></div>
				<div className="hide_field hide_field_2" style={{ transitionDelay: `${animDelays[0] + gap * 3}ms` }}></div>
			</div>
			<div className="profile z-2 sm:z-3">
				<img className="person z-1" src={new_buyer_person_02} style={{ transitionDelay: `${animDelays[1]}ms` }} alt="" />
				<img className="bubble z-2" src={new_buyer_bubble_02} style={{ transitionDelay: `${animDelays[1] + gap}ms` }} alt="" />
				<img className="rect z-3" src={new_buyer_rect_02} alt="" />
				<div className="hide_field hide_field_1" style={{ transitionDelay: `${animDelays[1] + gap * 2}ms` }}></div>
				<div className="hide_field hide_field_2" style={{ transitionDelay: `${animDelays[1] + gap * 3}ms` }}></div>
			</div>
			<div className="profile z-3 sm:z-2">
				<img className="person z-1" src={new_buyer_person_03} style={{ transitionDelay: `${animDelays[2]}ms` }} alt="" />
				<img className="bubble z-2" src={new_buyer_bubble_03} style={{ transitionDelay: `${animDelays[2] + gap}ms` }} alt="" />
				<img className="rect z-3" src={new_buyer_rect_03} alt="" />
				<div className="hide_field hide_field_1" style={{ transitionDelay: `${animDelays[2] + gap * 2}ms` }}></div>
				<div className="hide_field hide_field_2" style={{ transitionDelay: `${animDelays[2] + gap * 3}ms` }}></div>
			</div>
		</Intersection>
	);
}

function EyeBubble({ appearDelay }) {
	const eyeRef = useRef<HTMLElement>(null);

	const doBlink = useCallback(() => {
		if (!eyeRef.current) return;

		const blinkDelay = Math.ceil(Math.random() * 8000 + 2000);
		const mode = Math.ceil(Math.random() * 2);

		eyeRef.current.classList.add(mode === 1 ? "blink_single" : "blink_double");

		setTimeout(() => {
			if (!eyeRef.current) return;
			eyeRef.current.classList.remove("blink_single");
			eyeRef.current.classList.remove("blink_double");
		}, 1500);

		setTimeout(doBlink, blinkDelay);
	}, []);

	useEffect(() => {
		const blinkDelay = Math.ceil(Math.random() * 8000 + 2000);
		setTimeout(doBlink, blinkDelay);
	}, [doBlink]);

	return (
		<div className="eye_bubble" style={{ transitionDelay: `${parseInt(appearDelay) + 200}ms` }}>
			<img className="bubble" src={bubble} alt="" />
			<img className="eye" src={eye} alt="" ref={eyeRef} />
		</div>
	);
}

const Person = memo(({ num, image, appearDelay }) => {
	return (
		<div className={clsx("person", `person_${num}`)}>
			<EyeBubble appearDelay={appearDelay} />
			<div className="overflow-hidden">
				<img className="person_img" src={image} alt="" style={{ transitionDelay: appearDelay }} />
			</div>
		</div>
	);
});

const People = memo(() => {
	const transitionDelays = Array.from({ length: 11 }, (_, i) => `${150 * i + 1600}ms`);

	return (
		<Intersection className="People flex flex-row flex-nowrap flex-center mt-6">
			<Person num="01" image={person_01} appearDelay={transitionDelays[3]} />
			<Person num="02" image={person_02} appearDelay={transitionDelays[6]} />
			<Person num="03" image={person_03} appearDelay={transitionDelays[8]} />
			<Person num="04" image={person_04} appearDelay={transitionDelays[10]} />
			<Person num="05" image={person_05} appearDelay={transitionDelays[2]} />
			<Person num="06" image={person_06} appearDelay={transitionDelays[9]} />
			<Person num="07" image={person_07} appearDelay={transitionDelays[0]} />
			<Person num="08" image={person_08} appearDelay={transitionDelays[1]} />
			<Person num="09" image={person_09} appearDelay={transitionDelays[4]} />
			<Person num="10" image={person_10} appearDelay={transitionDelays[5]} />
			<Person num="11" image={person_11} appearDelay={transitionDelays[7]} />
		</Intersection>
	);
});

const EchoBillboards = memo(({ images = [] }) => {
	return (
		<Intersection className="EchoBillboards flex flex-row flex-nowrap justify-content-start">
			{images.map((image, k) => (
				<div className="echo_billboard_wrapper inline-block" key={k}>
					<Img image={image} className={clsx("echo_billboard", `echo_billboard_0${k + 1}`, "z-2")} alt="" />
				</div>
			))}
		</Intersection>
	);
});

export const NeckSectionAnimations = memo(({ images = [] }: NeckSectionAnimationsProps) => {
	return (
		<div className="animations flex flex-nowrap justify-content-between">
			<EchoBillboards images={images} />
			<People />
		</div>
	);
});
