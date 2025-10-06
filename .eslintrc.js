module.exports = {
	globals: {
		__PATH_PREFIX__: true,
	},
	extends: ["airbnb", "plugin:react/recommended", "react-app"],
	rules: {
		indent: ["warn", "tab", { SwitchCase: 1 }],
		semi: ["warn", "always"],
		quotes: ["warn", "double"],
		"comma-spacing": ["warn", { before: false, after: true }],
		"no-multi-spaces": ["warn"],
		"space-in-brackets": ["warn", "always"],
		"object-curly-spacing": ["warn", "always"],
		"space-infix-ops": ["warn", { int32Hint: true }],
		"arrow-spacing": ["warn"],
		"key-spacing": ["warn", { afterColon: true, align: "value" }],
	},
};
