import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import JsLogo from "../images/javascript.svg";
import ReactLogo from "../images/react.svg";
import GatsbyLogo from "../images/gatsby.svg";
import NextLogo from "../images/next.svg";

const Index = () => {
    return (
        <>
            <div>
                <StaticImage src="../images/index-hero.jpg" alt="hero" quality={90} placeholder="blurred" formats={["auto", "webp", "avif"]} />
                <div>
                    <h1>I'm Neko Tech!!</h1>
                    <h3>Cats that live on the Internet.</h3>
                </div>
            </div>
            <div>
                <div>
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
                <div>
                    <h2>Skills</h2>
                    <div>
                        <div><img src={JsLogo} alt="js" /><span> JavaScript / 10 years </span></div>
                        <div><img src={ReactLogo} alt="react" /><span> React / few years </span></div>
                        <div><img src={GatsbyLogo} alt="gatsby" /><span> Gatsby / few years </span></div>
                        <div><img src={NextLogo} alt="next" /><span> Next.JS / few years </span></div>
                    </div>
                </div>
                <div>
                    <Link to="/contact">Make It Happen!</Link>
                </div>
            </div>
        </>
    )
};

export default Index;
