import React from "react";
import styled from "styled-components";

const Cart = (props) => {

    return (
        <Wrapper>
            <Title>
                장바구니
                <StepLocation>
                    <Strong>01 장바구니 {"<"}&nbsp;</Strong>
                    <span>02 주문/결제 {"<"}&nbsp;</span>
                    <span>03 결제완료</span>
                </StepLocation>
            </Title>
            <ProductContainer>
                <ProductHeader>
                    <ProductUl>
                        <li>상품정보</li>
                        <li>수량</li>
                        <li>상품금액</li>
                        <li>배송비</li>
                    </ProductUl>
                </ProductHeader>
            </ProductContainer>
            <PriceContainer>
                <PriceHeader>
                    <PriceUl>
                        <li>총주문금액</li>
                        <li>총할인금액</li>
                        <li>총결제금액</li>
                    </PriceUl>
                </PriceHeader>
            </PriceContainer>

        </Wrapper>

    );
};

const Wrapper = styled.div`
    justify-content: center;
    margin: 30px auto;
    width: 1100px;
`;

const Title = styled.div`
    font-size:24px;
    font-weight:600;
    margin:30px;
`;

const StepLocation = styled.div`
    display: flex;
    float: right;
    font-size: 18px;
    color: #adb5bd;
`;

const Strong = styled.strong`
    color: #bda4d5;
`;

const ProductContainer = styled.div`
`;

const ProductHeader = styled.div`
    border-top: 2px solid rgb(51, 51, 51);
    height: 46px;
    border-bottom: 1px solid #d6dadd;
`;

const ProductUl = styled.ul`
    list-style: none;
    display: flex;
    text-align:center;
    font-weight: 600;

    & li:first-child{
        width:500px;
    }
    & li:nth-child(2){
        width:100px;
    }
    & li:nth-child(3){
        width:250px;
    }
    & li:nth-child(4){
        width:250px;
    }
`;

const PriceContainer = styled.div`
`;

const PriceHeader = styled.div`
    border-top: 2px solid rgb(51, 51, 51);
    height: 46px;
    border-bottom: 1px solid #d6dadd;
`;

const PriceUl = styled.ul`
    list-style: none;
    display: flex;
    text-align:center;
    font-weight: 600;

    & li:first-child{
        width:500px;
    }
    & li:nth-child(2){
        width:300px;
    }
    & li:nth-child(3){
        width:300px;
    }
`;

export default Cart;