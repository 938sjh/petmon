// import React from 'react';
// import { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import app from "../shared/firebase";
// import { getDownloadURL, getStorage, ref } from 'firebase/storage';
// import { useDispatch } from 'react-redux';
// import { setLoading } from '../redux/modules/product';

// function ProductInfo(props) {
//     const { price, images, title, description } = props;
//     const [imgUrl, setImgUrl] = useState("");
//     const [quantity, setQuantity] = useState(1);
//     const dispatch = useDispatch();
//     const storage = getStorage(app);
//     const imageRef = ref(storage, `image/${images[0].path}`);

//     useEffect(()=>{
//         dispatch(setLoading(true));
//         getDownloadURL(imageRef)
//         .then(url => {
//             setImgUrl(url)
//             dispatch(setLoading(false));
//        });
//     },[]);

//     const totalPrice = price * quantity;

//     return (
//         <ProductContainer>
//             <ImageWrapper>
//                 <img src={imgUrl}/>
//             </ImageWrapper>
//             <ProductInfoWrapper>
//                 <p>{title}</p>
//                 <PriceWrapper>
//                     <span>
//                         {price}
//                     </span>
//                     <QuantityWrapper>
//                         <button
//                             onClick={() => {
//                                 setQuantity(quantity - 1);
//                             }}
//                             disabled={quantity < 2}
//                         >
//                             -
//                         </button>
//                         <div>{quantity}</div>
//                         <button
//                             onClick={() => {
//                                 setQuantity(quantity + 1);
//                             }}
//                         >
//                             +
//                         </button>
//                     </QuantityWrapper>
//                 </PriceWrapper>
//                 <TotalPrice>
//                     <span>
//                         합계 <strong>{totalPrice} 원</strong>
//                     </span>
//                 </TotalPrice>
//                {/* <ButtonBox>
//                     <CartBtn onClick={cart}>장바구니 담기</CartBtn>
//                     <BuyBtn onClick={order}>바로 구매하기</BuyBtn>
//                 </ButtonBox> */}
//             </ProductInfoWrapper>
//         </ProductContainer>
//     );
// }

 
// const ProductContainer = styled.div`
//     box-sizing: border-box;
//     display: flex;
//     padding-top: 60px;
// `;
// const ImageWrapper = styled.div`
//     min-width: 600px;
//     & img {
//         width: 600px;
//         height: 400px;
//         min-height: 230px;
//         max-width: 100%;
//         border: none;
//         vertical-align: middle;
        
//     };  
// `;

// const ProductInfoWrapper = styled.div`
//     width: 100%;
//     background-color: white;
//     padding: 30px 24px;
//     flex: 1 1 0;
//     color: #3b3b3b;
//     & p {
//         font-size: 18px;
//         line-height: 24px;
//         font-weight: bold;
//         margin: 0;
//         padding: 0;
//         margin-bottom: 6px;
//     }
// `

// const PriceWrapper = styled.div`
//     margin-top: 40px;
//     display: flex;
//     justify-content: space-between;
//     & span {
//         font-size: 24px;
//         line-height: 24px;
//         font-weight: bold;
//         width: 100%;
//         & small {
//             font-size: 14px;
//             margin-left: 2px;
//             font-weight: bold;
//         }
//     }
// `;

// const QuantityWrapper = styled.div`
//     display: flex;
//     align-items: center;
//     width: 100%;
// `;

// const TotalPrice = styled.div`
//     text-align: right;

//     &span {
//         font-size: 14px;
//         &strong {
//             font-size: 22px;
//             color: #bda4d5;
//             margin-left: 7px;
//         }
//     }
// `;


// export default ProductInfo;