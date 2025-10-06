import { graphql } from "gatsby";

export const fragmentBlog = graphql`
	fragment BlogPost on WpPost {
		slug
		id
		databaseId
		title
		date
		nodeType
		language {
			slug
		}
		featuredImage {
			node {
				gatsbyImage(placeholder: BLURRED, width: 720, breakpoints: 350)
				localFile {
					publicURL
				}
			}
		}
		author {
			node {
				name
			}
		}
		categories {
			nodes {
				id
			}
		}
		tags {
			nodes {
				id
			}
		}
	}

	fragment NavPost on WpPost {
		id
		slug
		title
		language {
			slug
		}
		featuredImage {
			node {
				gatsbyImage(width: 280)
			}
		}
	}

	fragment CTATile on WpCtaTile {
		id
		title
		slug
		content
		nodeType
		featuredImage {
			node {
				gatsbyImage(width: 400)
			}
		}
		options {
			backgroundColor
			link
			includeOn {
				blogPage
				streams {
					... on WpContentStream {
						id
						slug
					}
				}
			}
			positions {
				start
				repeat
				frequency
			}
			redirectAfterSubmit
			setFeatureAsBackground
			textColor
			type
		}
	}
`;
