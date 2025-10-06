import { graphql } from "gatsby";

export const fragmentCommon = graphql`
	fragment img on File {
		childImageSharp {
			gatsbyImageData
		}
	}

	fragment imgW500 on File {
		childImageSharp {
			gatsbyImageData(width: 500)
		}
	}

	fragment imgH88 on File {
		childImageSharp {
			gatsbyImageData(width: 130)
		}
	}
`;
