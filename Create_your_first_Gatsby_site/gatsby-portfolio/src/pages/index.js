import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import JsLogo from "../images/javascript.svg";
import ReactLogo from "../images/react.svg";
import GatsbyLogo from "../images/gatsby.svg";
import NextLogo from "../images/next.svg";
import * as style from "../styles/index.module.scss";

const Index = () => {
    return (
        <Layout>
            <div className={style.hero}>
                <StaticImage className={style.heroImg} src="../images/index-hero.jpg" alt="hero" quality={90} placeholder="blurred" formats={["auto", "webp", "avif"]} />
                <div className={style.textContainer}>
                    <h1>I'm Neko Tech!!</h1>
                    <h3>Cats that live on the Internet.</h3>
                </div>
            </div>
            <div className={style.container}>
                <div className={style.profile}>
                    <div>
                        <h2>Anime/game geek</h2>
                        <p>
                            I am like a cat that continues to do as it pleases in both the real and virtual worlds.
                            I have loved anime and video games since I was a child and continue to watch both old and new.
                            Perhaps because of my love of games, I have learned to program as a hobby and have even made a living at it.
                            He is interested in anything that looks interesting, and he is always trying his hand at programming.
                        </p>
                    </div>
                    <StaticImage src="../images/profile.jpg" alt="profile" quality={90} placeholder="dominantColor" formats={["auto", "webp", "avif"]} />
                </div>
                <div className={style.skills}>
                    <h2>Skills</h2>
                    <div className={style.skillsContainer}>
                        <div><img src={JsLogo} alt="js" /><span> JavaScript / 10 years </span></div>
                        <div><img src={ReactLogo} alt="react" /><span> React / a few years </span></div>
                        <div><img src={GatsbyLogo} alt="gatsby" /><span> Gatsby / a few years </span></div>
                        <div><img src={NextLogo} alt="next" /><span> Next.JS / a few years </span></div>
                    </div>
                </div>
                <div className={style.ctaButton}>
                    <Link to="/contact">Make It Happen!</Link>
                </div>
            </div>
        </Layout>
    )
};

export default Index;
