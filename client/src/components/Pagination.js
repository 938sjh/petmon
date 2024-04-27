import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

//시작페이지, 한 화면에 보여질 페이지, 현재페이지, 총페이지 수
const Pagination = ({startPage, endPage, page, totalPage}) => {
    const navigate = useNavigate();

    return(
        <Nav>
            <Button onClick={()=>navigate(`?page=${page-1}`)} disabled={page === 1}> 
                &lt;
            </Button>
            {Array(endPage-startPage+1)
            .fill()
            .map((_, i)=>(
                <Button
                    key={startPage+i}
                    onClick={()=>navigate(`?page=${startPage+i}`)}
                    aria-current={page === startPage+i ? "page" : null}
                >
                    {i+1}
                </Button>
            ))}
            <Button onClick={()=>navigate(`?page=${page+1}`)}
                disabled={page === totalPage}>
                &gt;
            </Button>
        </Nav>
    )
}

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items:center;
    gap: 4px;
    margin: 16px;
`;

const Button = styled.button`
    border:none;
    padding: 8px;
    margin: 0;
    background-color:white;
    color:#444;
    font-size: 1rem;

    &:hover{
        color: #BDA4D5;
        font-weight: bolder;
        cursor:pointer;
        transform: translateY(-2px);
    }

    &[disabled] {
        cursor: revert;
        transform: revert;
    }

     &[aria-current] {
        font-weight: bold;
        color: #BDA4D5;
        cursor: revert;
        transform: revert;
    }
`;
export default Pagination;
