import React, { memo, useMemo } from "react";
import clsx from "clsx";
import { shuffle } from "@annex";

import "@sass/components/LogosMarquee.scss";

interface LogosRowProps {
	logos: string[];
}

interface LogosMarqueeProps {
	id?: string;
	className?: string;
	speed?: number;
	logoSize?: 50 | 60 | 80;
	logoSpacing?: 100 | 240;
	shuffled?: boolean;
	logos: string[];
	reverse?: boolean;
}

const LogosRow = memo(({ logos }: LogosRowProps) => {
	return (
		<div className="LogosMarquee_grid">
			{logos.map((img, k) => {
				const isWG = img.match(/warehouse_group/);
				return <img className={clsx("logo", { warehouse_group: isWG })} key={k} src={img} alt="" />;
			})}
		</div>
	);
});

const LogosMarquee = memo(
	({ id = "", className = "", speed = 0, logoSize = 50, logoSpacing = 240, shuffled = false, logos, reverse = false }: LogosMarqueeProps) => {
		const orderedLogos = useMemo(() => {
			if (shuffled) {
				const shuffledLogos = shuffle(logos);
				return [...shuffledLogos, ...shuffledLogos];
			}

			return [...logos, ...logos];
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [shuffled, logos]);

		if (speed === 0) {
			speed = Math.ceil(logos.length / 5) * 10;
		}

		if (!logos || logos.length === 0) {
			return <div>No logos</div>;
		}

		return (
			<div
				id={id}
				className={clsx("LogosMarquee", `logo_size_${logoSize}`, `logo_spacing_${logoSpacing}`, reverse ? "reverse" : "", className)}
				style={{ "--scroll-speed": `${speed}s` }}>
				<LogosRow logos={orderedLogos} />
			</div>
		);
	}
);

export default LogosMarquee;
