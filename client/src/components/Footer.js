import React from "react";
import styled from "styled-components";
import {useLocation} from "react-router-dom";

const Footer = (props) => {
    const {pathname} = useLocation();

    if(pathname === "/login" || pathname === "signup")
        return null;

    return (
        <React.Fragment>
            <Bottom></Bottom>
        </React.Fragment>
    );
};

const Bottom = styled.div`
    height:100px;
    margin:100px 0;
    background-color: rgb(180,180,180);
`

export default Footer;