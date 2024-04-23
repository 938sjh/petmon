import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const {
        children = null,
        _onClick = () => {},
    } = props;
    

    return (
        <React.Fragment>
            <GridBox {...props} onClick = {_onClick}>
                {children}
            </GridBox>
        </React.Fragment>
    );
};
const GridBox = styled.div`
    box-sizing: border-box;
    width: ${(props) => props.$width || "100%"};
    height: ${(props) => props.$height};
    line-height: ${(props) => props.$lineHeight};
    padding: ${(props) => props.$padding || "0px"};
    margin: ${(props) => props.$margin || "0px"};
    border: ${(props) => props.$border || "0"};
    border-top: ${(props) => props.$border_top || "0"};
    border-left: ${(props) => props.$border_left || "0"};
    border-right: ${(props) => props.$border_right || "0"};
    border-bottom: ${(props) => props.$border_bottom || "0"};
    ${((props) => props.$max_width ? `max-width: ${props.$max_width};` : "")}
    ${((props) => props.$max_height ? `max-width: ${props.$max_height};` : "")}
    ${((props) => props.$bg ? `background-color: ${props.$bg};` : "")}
    ${((props) => props.$radius ? `border-radius: ${props.$radius};` : "")}
    ${((props) => props.$isFlex 
        ? `display: flex; align-items: center; justify-content: space-between;`
        : "")}
    ${((props) => props.$center 
        ? `text-align: center;`
        : props.$right
        ? `text-align: right;`
        : "")}    
    ${((props) => props.$wrap ? `flex-wrap:wrap;` : "")}
    `;

export default Grid;