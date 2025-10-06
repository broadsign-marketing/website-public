import React, { useEffect } from "react";

export default function BlogPopupLinks() {
	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}

		// Handle Demo links
		const demoLinks = document.querySelectorAll(".post_content a[href*='/request-a-demo'], .post_content a[data-form='demo']");

		for (const link of demoLinks) {
			link.href = "";
			link.addEventListener("click", () => setOpenDemoModal(true));
		}
	}, []);

	return (
		<>
			{openDemoModal && (
				<Modal variant="form" className="theme_carolina narrow" onClose={() => setOpenDemoModal(false)}>
					<h2 className="text-24">{T.translate("scheduleDemo")}</h2>
					<Form form="demo" />
				</Modal>
			)}
			{openBookACallModal && (
				<Modal variant="form" className="theme_carolina narrow" onClose={() => setOpenBookACallModal(false)}>
					<Form form="bookACall" />
				</Modal>
			)}
		</>
	);
}
