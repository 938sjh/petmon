import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import app from "../shared/firebase";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/modules/product';

function Item(props) {
    const { price, images, title } = props;
    const [imgUrl, setImgUrl] = useState("");
    const dispatch = useDispatch();
    const storage = getStorage(app);
    const imageRef = ref(storage, `image/${images[0].path}`);

    useEffect(()=>{
        dispatch(setLoading(true));
        getDownloadURL(imageRef)
        .then(url => {
            setImgUrl(url)
            dispatch(setLoading(false));
       });
    },[]);

    return (        
        <ItemContainer>
            <ItemBody>
                <Img style={{backgroundImage:`url(${imgUrl})`,backgroundSize: 'cover', backgroundPosition: 'center'}} />
            </ItemBody>
            <ItemInfo>
                <Title>{title}</Title>
                <PriceBox>
                    <Price>
                        {price}
                        <Won>원</Won>
                    </Price>
                </PriceBox>
            </ItemInfo>
        </ItemContainer>
    );
}

const ItemContainer = styled.div`
    width: 274px;
    margin-right: 10px;
    margin-bottom: 50px;
    height: 389px;
    background-color: rgb(255, 255, 255);
    border: none;
`;
const ItemBody = styled.div`
    height: 274px;
    width: 100%;
    & Img:hover {
        opacity: 0.5;
    }
`;
const Img = styled.div`
    cursor: pointer;
    height: 100%;
    width: 100%;
    margin-bottom: 10px;
    z-index: 1;
`;

const ItemInfo = styled.div`
    margin: 20px 5px;
    cursor: default;
`;
const Title = styled.span`
    font-size: 14px;
    width: 274px;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 21px;
    
    color: rgb(59, 59, 59);
`;
const PriceBox = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: flex-start;
    flex-direction: column;
`;
const Price = styled.span`
    font-size: 20px;
    font-weight: bold;
`;
const Won = styled.small`
    font-size: 14px;
    margin-left: 2px;
    font-weight: normal;
`;

export default Item;