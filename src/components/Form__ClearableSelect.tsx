import React, { useEffect, useState } from "react";
import clsx from "clsx";
import chevron from "@img/controls/chevron_down_ash.svg";

import "@sass/components/FormCustomInput.scss";

export default function Form__ClearableSelect({ className, items = [], placeholder, onChange, onClear }) {
	const [currentValue, setCurrentValue] = useState("");

	useEffect(() => {
		onChange(currentValue);
	}, [currentValue, onChange]);

	return (
		<div className={clsx("CustomInput ClearableSelect", className)}>
			<select className="input" value={currentValue} onChange={($event) => setCurrentValue($event.target.value)}>
				{placeholder && <option value="">{placeholder}</option>}
				{items.map((item) => (
					<option value={item} key={item}>
						{item}
					</option>
				))}
			</select>
			{currentValue === "" ? (
				<button className="select_indicator unfold">
					<img src={chevron} alt="" />
				</button>
			) : (
				<button className="select_indicator clear" onClick={() => setCurrentValue("")}>
					&times;
				</button>
			)}
		</div>
	);
}
