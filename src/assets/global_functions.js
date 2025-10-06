function setVWOVersion(testId, version) {
	const targetPrefix = `${testId}_`;
	const versionToSet = `${testId}_v${version}`;

	const testsList = document.documentElement.getAttribute("data-vwo").split(" ");
	if (!testsList || testsList.length === 0) {
		document.documentElement.setAttribute("data-vwo", versionToSet);
		return;
	}

	for (let i = 0; i < testsList.length; i++) {
		if (testsList[i].startsWith(targetPrefix)) {
			testsList[i] = versionToSet;
		}
	}

	document.documentElement.setAttribute("data-vwo", testsList.join(" "));
}

window.setVWOVersion = setVWOVersion;
