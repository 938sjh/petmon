import React,{useState} from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailProductQuery } from "../redux/api/product";

const DetailProduct = (props) => {
    const {id} = useParams();
    const [quantity, setQuantity] = useState(1);
    const { data, isLoading, isFetching } = useGetDetailProductQuery({id});
    console.log(id);

    return(
        <Wrapper>
            
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width:1100px;
    margin: 0 auto;
`;

export default DetailProduct;