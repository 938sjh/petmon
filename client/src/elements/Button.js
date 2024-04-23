import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
    const {
        text = false,
        isFloat = false,
        children = null,
    } = props;
    return (
        <React.Fragment>
            <ElButton {...props}>
                {text ? text : children}
            </ElButton>
        </React.Fragment>
    );
};


const ElButton = styled.button`
    box-sizing: border-box;
    padding: ${(props) => props.$padding || "12px 0px"};
    border: ${(props) => props.$border || "none"};
    border-radius: 4px;
    margin: ${(props) => props.$margin || "0px"};
    width: ${(props) => props.$width || "49.5%"};
    ${((props) => props.$bold ? `font-weight: 600` : "")};
    height: ${(props) => props.$height || "52px"};
    color: ${(props) => props.$color || "#FFFFFF"};
    background-color: ${(props) => props.$bg || "#BDA4D5"};
    cursor: pointer;
`;

export default Button;