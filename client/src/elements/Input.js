import React from "react";

import styled from "styled-components";

const Input = (props) => {
    const {
    } = props;

    return (
        <React.Fragment>
            <div>
                <ElInput {...props}/>
            </div>
        </React.Fragment>
    );

};

const ElInput = styled.input`
    box-sizing: border-box;
    border: 1px solid #e7e7e7;
    margin: ${(props) => props.$margin || "0"};
    padding: 0 15px;
    color: #2c2c2c;
    text-align: left;
    font-size: 13px;
    width: ${(props) => props.$width || "100%"};
    height: ${(props) => props.$height || "45px"};
`;

export default Input;