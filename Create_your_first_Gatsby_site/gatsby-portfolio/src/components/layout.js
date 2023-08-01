import * as React from "react";
import Title from "../components/title";
import Header from "./header";
import Footer from "./footer";
import "../styles/all.scss";

const Layout = ({ title, children }) => {
    return (
        <>
            <Title>{title}</Title>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
};

export default Layout;
