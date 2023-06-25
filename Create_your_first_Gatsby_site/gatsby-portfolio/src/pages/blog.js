import * as React from "react";
import { graphql } from "gatsby";

const Blog = (props) => {
    return (
        <>
            <h1>ブログページ</h1>
            {
                props.data.allMarkdownRemark.edges.map((blog, index) =>
                    <div key={index}>
                        <h2>{blog.node.frontmatter.title}</h2>
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
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          date
          excerpt
          id
          image
          title
        }
      }
    }
  }
}
`