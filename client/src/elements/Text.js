import React from "react";
import styled from "styled-components";

const Text = (props) => {
    const {
        children = null
    } = props;

    return (
        <P {...props}>
          {children}  
        </P>
    );

};

const P = styled.p`
    font-size: ${(props) => props.$size || "1em"};
    font-weight: ${(props) => props.$bold ? "600" : "400"};
    margin: ${(props) => props.$margin || "0px"};
    ${(props) => props.$center ? `text-align : center` : ""};
    ${(props) => props.$color ? `color:${props.$color}` : ""};
`;

export default Text;