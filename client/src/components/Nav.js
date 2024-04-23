import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Ul = styled.ul`
    width: 1140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    font-weight: normal;
`;
const Li = styled.li`
    list-style: none;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;
const A = styled.a`
    text-decoration: none;
    display: block;
    padding: 0px 30px;
    cursor: pointer;
`;

const Nav = (props) =>{
    const navigate = useNavigate();

    return (
            <Wrapper>
                <Ul>
                    <Li>
                        <A onClick={() => navigate("/product/all?page=1")}>
                            전체보기
                        </A>
                    </Li>
                    <Li>
                        <A>
                            인기상품
                        </A>
                    </Li>
                    <Li>
                        <A>
                            신상품
                        </A>
                    </Li>
                    <Li>
                        <A>
                            강아지
                        </A>
                    </Li>
                    <Li>
                        <A>
                            고양이
                        </A>
                    </Li>
                    <Li>
                        <A>
                            소동물
                        </A>
                    </Li>
                    <Li>
                        <A>
                            커뮤니티
                        </A>
                    </Li>
                    
                </Ul>

            </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:50px;
    margin:15px auto;
    background-color: rgb(250,250,250);
`;

export default Nav;