import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const article = ({ data }) => {
    return (
        <>
            <div>
                <GatsbyImage image={data.markdownRemark.frontmatter.image.childImageSharp.gatsbyImageData} alt="article-image" />
            </div>
            <div>
                <h1>{data.markdownRemark.frontmatter.title}</h1>
                <p>{data.markdownRemark.frontmatter.date}</p>
                <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
            </div>
        </>
    )
}

export default article;

export const query = graphql`
    query ArticleQuery ($slug: String!) {
        markdownRemark (fields: { slug: {eq: $slug } }) {
            frontmatter {
                date
                excerpt
                id
                title
                image {
                    childImageSharp {
                        gatsbyImageData(quality: 90, formats: [AUTO, WEBP, AVIF], placeholder: BLURRED, width: 1000)
                    }
                }
            }
            html
        }
    }
`;
