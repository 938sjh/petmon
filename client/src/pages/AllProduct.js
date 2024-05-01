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
    const page = parseInt(searchParams.get('page')) || 1;
    const category = searchParams.get('category') || "";
    const searchTerm = searchParams.get('searchTerm') || "";
    
    const { data: posts, isLoading, isFetching } = useGetAllProductsQuery({page, category, searchTerm});
    const navigate = useNavigate();
    const itemLoading = useSelector(state => state.product.isLoading);
    const title = category || "전체보기";
  
    //상품 로딩
    if (isLoading){
        return <Spinner/>
    }

    //검색 이후 전체보기 페이지로 이동했을 때 paging 정보 받아올 때까지 대기
    if (!searchTerm && !posts?.startPage) {
       return <Spinner/>
    }
  
    return (
    <React.Fragment>
        <Container text={title}>
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
        {searchTerm ? "" : <Pagination startPage={posts.startPage} endPage={posts.endPage} maxPage={5} page={page} totalPage={posts.totalPage} category={category}/>}
                    
    </React.Fragment>
    )
  }

export default AllProduct;