import * as React from "react";
import { Link } from "gatsby";
import * as sytyle from "../styles/index.module.css";

const Index = () => {
    return (
        <>
            <h1 className={sytyle.h1Text}>Hello Gatsby world.</h1>
            <Link to="/blog">[ ブログページへ ]</Link>
        </>
    )
};

export default Index;
