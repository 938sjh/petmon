import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import Banner from "../components/Banner";

const Main = (props) => {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Wrapper>
                <Banner/>
            </Wrapper>
        </React.Fragment>
    );
};

const Wrapper = styled.div`
    justify-content: center;
    align-items: center;
`

export default Main;
