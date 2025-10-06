import React, { memo } from "react";

type DevBlogPostKeywordsProps = {
	keywords: string[];
	meta: string;
};

const DevBlogPostKeywords = memo(({ keywords }: DevBlogPostKeywordsProps): JSX.Element | null => {
	if (process.env.GATSBY_ACTIVE_ENV !== "development" || process.env.DEBUG_BLOG_SEARCH !== "true") return null;

	return (
		<div className="block bg-zircon rounded-xl text-14 line-height-120 my-8 p-4">
			<div className="block font-bold">Keywords :</div>
			<div className="block">{keywords.join(", ")}</div>
		</div>
	);
});

export default DevBlogPostKeywords;
