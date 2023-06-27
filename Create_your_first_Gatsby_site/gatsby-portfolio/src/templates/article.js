import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import * as style from "../styles/article.module.scss";

const Article = ({ data }) => {
    return (
        <Layout>
            <div className={style.hero}>
                <GatsbyImage image={data.markdownRemark.frontmatter.image.childImageSharp.gatsbyImageData} alt="article-image" />
            </div>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <h1>{data.markdownRemark.frontmatter.title}</h1>
                    <p>{data.markdownRemark.frontmatter.date}</p>
                    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
                </div>
            </div>
        </Layout>
    )
}

export default Article;

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
