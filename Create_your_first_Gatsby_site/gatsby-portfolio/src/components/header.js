import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <Link to="/">
                        <StaticImage src="../images/logo.png" alt="logo" quality={90} placeholder="dominantColor" formats={["auto", "webp", "avif"]} width={50} />
                        <ul>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </Link>
                </div>
            </div>
        </header>
    )
};

export default Header;
