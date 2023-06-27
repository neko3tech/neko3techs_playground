import * as React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import * as style from "../styles/blog.module.scss";

const Blog = ({ data }) => {
    return (
        <Layout>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <h1>Blog</h1>
                    <p>エンジニアの日常生活をお届けします</p>
                    {data.allMarkdownRemark.edges.map((blog, index) =>
                        <div key={index} className={style.blogCard}>
                            <div className={style.textContainer}>
                                <h3>{blog.node.frontmatter.title}</h3>
                                <p>{blog.node.frontmatter.excerpt}</p>
                                <p>{blog.node.frontmatter.date}</p>
                                <Link to={blog.node.fields.slug}>Read More</Link>
                            </div>
                            <GatsbyImage className={style.cardImg} image={blog.node.frontmatter.image.childImageSharp.gatsbyImageData} alt="card-image" />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
};

export default Blog;

export const query = graphql`
    query BlogListQuery {
        allMarkdownRemark (sort: {frontmatter: {id: DESC}}) {
            edges {
                node {
                    frontmatter {
                        date
                        excerpt
                        id
                        title
                        image {
                            childImageSharp {
                                gatsbyImageData(quality: 90, formats: [AUTO, WEBP, AVIF], placeholder: BLURRED)
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;
