import React from "react";
import styled from "styled-components";

const Image = (props) => {
    return (
        <React.Fragment>
            <DefaultImage {...props}></DefaultImage>
        </React.Fragment>
    );
};

const DefaultImage = styled.div`
    box-sizing:border-box;
    top:0;
    width:${(props)=>props.$width || "100%"};
    height:${(props)=>props.$height || "300px"};
    margin:${(props)=>props.$margin || "0"};
    background-image:url("${(props)=>props.$src}");
    background-size:cover;
    background-position:center;
`;

export default Image;