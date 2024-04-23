import React, { useEffect, useState } from "react";
import Spinner from "../shared/loading";
import { useGetAllProductsQuery } from "../redux/api/product";
import Container from "../components/Container";
import Item from "../components/Item";
import { useNavigate, useLocation} from "react-router-dom";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

const AllProduct = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page'));
    
    const { data: posts, isLoading, isFetching } = useGetAllProductsQuery({page});
    const navigate = useNavigate();
    const itemLoading = useSelector(state => state.product.isLoading);
  
    console.log(page);
    if (!posts?.productInfo) {
      return <div>No posts</div>
    }
  
    return (
    <React.Fragment>
        <Container text="전체보기">
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
        <Pagination startPage={posts.startPage} endPage={posts.endPage} maxPage={5} page={page} totalPage={posts.totalPage}/>
                    
    </React.Fragment>
    )
  }

export default AllProduct;