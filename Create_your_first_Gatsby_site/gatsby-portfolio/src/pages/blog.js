import * as React from "react";
import { graphql, Link } from "gatsby";

const Blog = ({ data }) => {
    return (
        <>
            <h1>ブログページ</h1>
            {
                data.allMarkdownRemark.edges.map((blog, index) =>
                    <div key={index}>
                        <Link to={blog.node.fields.slug}>
                            <h2>{blog.node.frontmatter.title}</h2>
                        </Link>
                        <p>{blog.node.frontmatter.date}</p>
                    </div>
                )
            }
        </>
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
                        image
                        title
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;
