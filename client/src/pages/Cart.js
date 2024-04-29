import React, {useState,useEffect} from "react";
import styled from "styled-components";
import { useGetCartQuery } from "../redux/api/user";
import { useSelector } from "react-redux";
import { Button } from "../elements";
import { useNavigate } from "react-router-dom";
import { useBuyMutation } from "../redux/api/user";
import Spinner from "../shared/loading";

const Cart = (props) => {
    const id = useSelector(state=>state.user.userId);
    const { data, refetch ,isLoading, isFetching, isSuccess } = useGetCartQuery({id});
    const navigate = useNavigate();
    const [ buy, { isLoading : buyLoading, isError : isBuyError}] = useBuyMutation();

    const buyHandler = async () => {        
        try {
            const { data } = await buy();
    
            if(data.success === true){
                // 로그인 성공 후 유저 데이터 저장
                window.alert("구매가 완료 되었습니다.");
                navigate("/");
            }
            else{
                window.alert("구매 실패");
            }
          } catch (err) {
            console.error('Login failed:', err);
          }
    };


    if(isLoading) {
        return <Spinner/>
    }

    let totalPrice = 0;
    data.map((prod) => {
        totalPrice += prod.price * prod.quantity;
    })
   
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
                <ProductBody>
                    {data.map((prd, idx) => {
                        return (
                            <ProductInfoUl key={idx}>
                                <li>
                                    <img src={prd.images}/>
                                    <div>{prd.title}</div>
                                </li>
                                <li>
                                    {prd.quantity}
                                </li>
                                <li>
                                    {prd.price}원
                                </li>
                                <li>
                                    0원
                                </li>
                            </ProductInfoUl>
                        )
                    })}
                    
                </ProductBody>
            </ProductContainer>
            <PriceContainer>
                <PriceHeader>
                    <PriceUl>
                        <li>총주문금액</li>
                        <li>총할인금액</li>
                        <li>총결제금액</li>
                    </PriceUl>
                </PriceHeader>
                <PriceInfoUl>
                        <li>{totalPrice}원</li>
                        <li>0원</li>
                        <li>{totalPrice}원</li>
                </PriceInfoUl>
            </PriceContainer>
            <ButtonContainer>
                <Button
                    type="button"
                    onClick={()=>{
                        navigate("/product/all");
                    }}
                    $margin="0px 10px"
                    $width="350px"
                    $color="#BDA4D5"
                    $bg="#FFFFFF"
                    $border="1px solid #e7e7e7"
                >
                    쇼핑 계속하기
                </Button>
                <Button
                    type="button"
                    onClick={buyHandler}
                    $width="350px"
                    $margin="0px 10px"
                >
                    구매하기
                </Button>
            </ButtonContainer>

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
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`

const PriceInfoUl = styled(PriceUl)`
    text-align: center;
    & li{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;
    }
`;


export default Cart;