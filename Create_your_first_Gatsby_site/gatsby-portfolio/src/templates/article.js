import * as React from "react";
import { graphql } from "gatsby";

const article = ({ data }) => {
    return (
        <>
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            <p>{data.markdownRemark.frontmatter.date}</p>
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
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
            }
            html
        }
    }
`;
