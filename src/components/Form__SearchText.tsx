import React from "react";
import clsx from "clsx";

import "@sass/components/FormCustomInput.scss";

export default function Form__SearchText({ className, placeholder = "", type = "text", onChange }) {
	function handleChange(value) {
		onChange(value);
	}

	return (
		<div className={clsx("CustomInput SearchText", className)}>
			<input type={type} className="input" placeholder={placeholder} onKeyUp={($event) => handleChange($event.target.value)} />
		</div>
	);
}
