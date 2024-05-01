import React from "react";
import Spinner from "../shared/loading";
import { useGetNewProductsQuery } from "../redux/api/product";
import Container from "../components/Container";
import Item from "../components/Item";
import { useNavigate, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";

const NewProduct = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const { data: posts, isLoading, isFetching } = useGetNewProductsQuery();
    const navigate = useNavigate();
    const itemLoading = useSelector(state => state.product.isLoading);
  
    if (!posts?.productInfo) {
      return <Spinner/>
    }
  
    return (
    <React.Fragment>
        <Container text="신상품">
            {(isLoading || itemLoading) && <Spinner/>}
            {posts.productInfo.map(({ _id, title, price, images}) => (
                <div 
                    key={_id}
                    onClick={() => {
                        navigate(`/product/detail/${_id}`);
                    }}
                >
                    <Item key={_id} title={title} price={price} images={images}/>
                </div>
        ))}
        </Container>
    </React.Fragment>
    )
  }

export default NewProduct;