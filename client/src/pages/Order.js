import React from "react";
import styled from "styled-components";
import { useGetOrderQuery } from "../redux/api/user";
import Spinner from "../shared/loading";

const Order = () => {
    const { data, isLoading, isFetching, isSuccess } = useGetOrderQuery();

    if(isLoading) {
        return <Spinner/>
    }
    return (
        <Wrapper>
            <Title>
                주문내역
            </Title>
            <ProductContainer>
                <ProductHeader>
                    <ProductUl>
                        <li>상품정보</li>
                        <li>수량</li>
                        <li>상품금액</li>
                        <li>배송비/배송상태</li>
                    </ProductUl>
                </ProductHeader>
                <ProductBody>
                    {data.map((prd, idx) => {
                        return (
                            <ProductInfoUl key={idx}>
                                <li>
                                    <img 
                                    src={prd.images}/>
                                    <div>{prd.title}</div>
                                </li>
                                <li>
                                    {prd.quantity}
                                </li>
                                <li>
                                    {prd.price}원
                                </li>
                                <li>
                                    0원/배송완료
                                </li>
                            </ProductInfoUl>
                        )
                    })}
                    
                </ProductBody>
            </ProductContainer>
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

const ProductContainer = styled.div`
`;

const ProductHeader = styled.div`
    border-top: 2px solid rgb(51, 51, 51);
    height: 46px;
    border-bottom: 1px solid #d6dadd;
`;
const ProductBody = styled.div`
    min-height: 130px;
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

const ProductInfoUl = styled(ProductUl)`
    height:130px;
    & li{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & li:first-child{
        display: flex;
        justify-content: center;

        
        & img{
            width: 90px;
            height: 90px;
            margin: 20px 0;
            border-radius: 9px;
            cursor: pointer;
        }
        & div{
            width: 300px;
        }
    }
`;



export default Order;