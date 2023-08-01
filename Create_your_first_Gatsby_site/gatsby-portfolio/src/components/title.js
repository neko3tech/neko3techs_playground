import * as React from "react";

const Title = ({ children }) => {
    return (
        <title>{children && `${children} | `}ねこてっくのポートフォリオ</title>
    )
};

export default Title;