import React,{useState} from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailProductQuery } from "../redux/api/product";
import { useSelector } from "react-redux";
import { useAddCartMutation } from "../redux/api/user";
import cookie from 'react-cookies';
import Spinner from "../shared/loading";

const DetailProduct = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [quantity, setQuantity] = useState(1);
    const isLogin = useSelector(state => state.user.isLogin);
    const { data, isLoading, isFetching, isSuccess } = useGetDetailProductQuery({id});
    const [addCart, { isLoading: isCartLoading, isError: isCartError, error: cartError }] = useAddCartMutation();
    const isCookie = cookie.load('x_auth') ? true : false;

    const handleBuy = async () => {
        if(!isLogin || !isCookie) {
            window.alert("로그인 후 구매할 수 있습니다.");
            navigate('/login');
        }
        else{
            try{
                const data = await addCart({id,quantity});
                navigate("/cart");
            }
            catch(err){
                console.error(err,"장바구니 추가 실패");
            }
        }
    
    };

    const handleCart = async () => {
        if(!isLogin || !isCookie) {
            window.alert("로그인 후 구매할 수 있습니다.");
            navigate('/login');
        }
        else{
            try{
                const data = await addCart({id,quantity});
                window.alert("장바구니에 담았습니다.");
            }
            catch(err){
                console.error(err,"장바구니 추가 실패");
            }
        }

    };

    if(isLoading){
        return <Spinner/>;
    }

    const productInfo = data.productInfo[0];
    const totalPrice = productInfo.price * quantity;

    return (
        <Wrapper>
            <ProductContainer>
                <ImageWrapper>
                    <img src={data.url}/>
                </ImageWrapper>
                <ProductInfoWrapper>
                    <p>{productInfo.title}</p>
                    <PriceWrapper>
                        <span>
                            {productInfo.price}
                            <small>
                                원
                            </small>
                        </span>
                        <QuantityWrapper>
                            <button
                                onClick={() => {
                                    setQuantity(quantity - 1);
                                }}
                                disabled={quantity < 2}
                            >
                                -
                            </button>
                            <div>{quantity}</div>
                            <button
                                onClick={() => {
                                    setQuantity(quantity + 1);
                                }}
                            >
                                +
                            </button>
                        </QuantityWrapper>
                    </PriceWrapper>
                    <TotalPrice>
                        <span>
                            합계 <strong>{totalPrice} 원</strong>
                        </span>
                    </TotalPrice>
                    <ButtonWrapper>
                        <CartButton onClick={handleCart}>장바구니 담기</CartButton>
                        <BuyButton onClick={handleBuy}>바로 구매하기</BuyButton>
                    </ButtonWrapper>
                </ProductInfoWrapper>
            </ProductContainer>
        </Wrapper>
    );
}

 
const ProductContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    padding-top: 60px;
`;
const ImageWrapper = styled.div`
    min-width: 600px;
    & img {
        width: 600px;
        height: 400px;
        min-height: 230px;
        max-width: 100%;
        border: none;
        vertical-align: middle;
        
    };  
`;

const ProductInfoWrapper = styled.div`
    width: 100%;
    background-color: white;
    padding: 30px 24px 0 24px;
    flex: 1 1 0;
    color: #3b3b3b;
    & p {
        font-size: 18px;
        line-height: 24px;
        font-weight: bold;
        margin: 0;
        padding: 0;
        margin-bottom: 6px;
    }
`

const PriceWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    & span {
        font-size: 24px;
        line-height: 24px;
        font-weight: bold;
        width: 100%;
        & small {
            font-size: 14px;
            margin-left: 2px;
            font-weight: bold;
        }
    }
`;

const QuantityWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    & button {
        width: 28px;
        height: 28px;
        margin: 0 10px;
        border: 1px solid rgb(236,236,236);
        cursor: pointer;
        background-color: white;
    }
`;

const TotalPrice = styled.div`
    text-align: right;
    margin: 150px 0px 35px 0px;
    & span {
        font-size: 14px;
        & strong {
            font-size: 22px;
            color: #bda4d5;
            margin-left: 7px;
        }
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 50px;
`;

const Button = styled.button`
    height: 50px;
    font-size: 16px;
    border-radius: 4px;
    font-weight: bold;
    width: 49%;
    margin: 0;
    padding: 0;
    cursor: pointer;
    border: 0;
`;

const CartButton = styled(Button)`
    background-color: #BDA4D5;
    color: white;
`;

const BuyButton = styled(Button)`
    background-color: white;
    color: #BDA4D5;
    border: 1px solid #BDA4D5;
`; 

const Wrapper = styled.div`
    width:1140px;
    margin: 0 auto 200px auto;
    background: white;
`;

export default DetailProduct;