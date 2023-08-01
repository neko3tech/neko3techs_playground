import * as React from "react";
import { Link } from "gatsby";
import github from "../images/github.svg";
import twitter from "../images/twitter.svg"
import * as style from "../styles/common.module.scss";

const Footer = () => {
    return (
        <footer className={style.footerWrapper}>
            <div className={style.insideContainer}>
                <a href="https://github.com/neko3tech"><img src={github} alt="logo" /></a>
                <a href="https://twitter.com/neko3tech"><img src={twitter} alt="logo" /></a>
                <hr />
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                <p>©{new Date().getFullYear()} NekoTech</p>
            </div>
        </footer>
    )
};

export default Footer;
