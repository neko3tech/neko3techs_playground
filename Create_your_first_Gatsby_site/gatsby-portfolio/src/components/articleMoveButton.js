import * as React from "react";
import { Link } from "gatsby";
import ArrowLeft from "../images/arrow-left.svg";
import ArrowRight from "../images/arrow-right.svg";
import * as style from "../styles/article.module.scss";

const ArticleMove = ({ pageContext }) => {
    const { previous, next } = pageContext;
    return (
        <div className={style.pnWrapper}>
            {previous &&
                <Link className={style.linkCard} to={`/blog${previous.fields.slug}`}>
                    <img src={ArrowLeft} alt="Previous" />
                    <h3>{previous.frontmatter.title}</h3>
                </Link>
            }
            {next &&
                <Link className={style.linkCard} to={`/blog${next.fields.slug}`}>
                    <img src={ArrowRight} alt="Next" />
                    <h3>{next.frontmatter.title}</h3>
                </Link>
            }
        </div>
    )
};

export default ArticleMove;
