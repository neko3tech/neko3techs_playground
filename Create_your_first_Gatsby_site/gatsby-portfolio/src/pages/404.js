import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";

const style = {
  textAlign: "center",
  height: "70vh",
};

const NotFoundPage = () => {
  return (
    <Layout>
      <div style={style}>
        <h1>404 : Page Not Found</h1>
        <p>ページが見つかりません。</p>
        <Link to="/">Go home.</Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage;

export const Head = () => <title>Not found</title>
