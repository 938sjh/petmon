import React, {useTransition, useState} from "react";
import styled from 'styled-components';
import { useNavigate, useLocation} from "react-router-dom";
import { Grid } from "../elements";
import { useDispatch, useSelector } from 'react-redux';
import cookie from "react-cookies";
import mainLogo from "../image/mainLogo.png";
import Nav from "./Nav";
import { useLogoutUserMutation } from "../redux/api/user";
import { setUserInfo } from "../redux/modules/user";
import Spinner from "../shared/loading";

const Header = (props) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.user.isLogin);
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const isCookie = cookie.load('x_auth') ? true : false;
    const userName = useSelector((state) => state.user.userName);
    const [logout, { isLoading, isError, error }] = useLogoutUserMutation();
    const [searchTerm, setSearchTerm] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            navigate(`/product/all?page=1&searchTerm=${searchTerm}`)
            startTransition(()=>{
                setSearchTerm("");
            })
        }
    };

    if(pathname === "/login" || pathname === "/signup"){
        return null;
    }
    if(isLogin && userName) {
        const handleLogout = async () => {
            try{
                if(isCookie){
                    const { data } = await logout();
                    if(data.logoutSuccess === true){
                        dispatch(setUserInfo({isLogin:false, userName:""}));
                        navigate("/");
                    }
                    else{
                        window.alert("로그아웃에 실패했습니다");
                    }
                }
                else{
                    dispatch(setUserInfo({isLogin:false, userName:""}));
                    navigate("/");
                }
            }
            catch (err){
                console.log("Logout failed", err);
            }
        };
        return (
            <Grid>
                <Grid
                $padding="0 15px"
                $width="1100px"
                $margin="10px auto">
                    {isAdmin ? 
                    <A onClick={()=>navigate("/product/upload")}>
                        <Span>
                            상품 업로드
                        </Span>
                    </A>
                    :
                    <Span/>
                    }
                    <ul
                        style={{
                        float: "right",
                        display: "flex",
                        margin: "10px 0 0 0"}}
                    >
                        <Li>
                            {userName}님
                            <span style={{margin: "0 13px"}}>|</span>
                        </Li>
                        <Li>
                            <A onClick={handleLogout}>로그아웃</A>
                            <span style={{margin: "0 13px"}}>|</span>
                        </Li>
                        <Li>
                            <A onClick={()=>navigate("/cart")}>장바구니</A>
                            <span style={{margin: "0 13px"}}>|</span>
                        </Li>
                        <Li>
                            <A onClick={()=>navigate("/order")}>주문내역</A>
                        </Li>
                    </ul>
                </Grid>
                <Grid
                    $isFlex="true"
                    $padding="0 15px"
                    $width="1100px"
                    $margin="10px auto"
                >
                    <A onClick={()=>navigate("/")}>
                        <img 
                        src={mainLogo}
                        width="180px"
                        height="35px"
                        />
                    </A>
                    <SearchBox 
                    placeholder="검색어를 입력해주세요"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                    />
                </Grid>
                <Nav/>
            </Grid>
        );  
    }
    return (
        <Grid>
            {isLoading && <Spinner/>}
            <Grid
            $padding="0 15px"
            $width="1100px"
            $margin="10px auto">
                <Span></Span>
                <ul
                style={{
                float: "right",
                display: "flex",
                margin: "10px 0 0 0"}}
                >
                    <Li>
                        <A onClick={()=>navigate("/login")}>로그인</A>
                        <span style={{margin: "0 13px"}}>|</span>
                    </Li>
                    <Li>
                        <A onClick={()=>navigate("/signup")}>회원가입</A>
                        <span style={{margin: "0 13px"}}>|</span>
                    </Li>
                    <Li>
                        <A onClick={()=>navigate("/cart")}>장바구니</A>
                        <span style={{margin: "0 13px"}}>|</span>
                    </Li>
                    <Li>
                        <A onClick={()=>navigate("/order")}>주문내역</A>
                    </Li>
                </ul>
            </Grid>
            <Grid
                $isFlex="true"
                $padding="0 15px"
                $width="1100px"
                $margin="10px auto"
            >
                <A onClick={()=>navigate("/")}>
                    <img 
                    src={mainLogo}
                    width="180px"
                    height="35px"
                    />
                </A>
                <SearchBox 
                placeholder="검색어를 입력해주세요"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                />
            </Grid>
            <Nav/>
        </Grid>
    );
};

const Span = styled.span`
    line-height: 40px;
    color: rgb(161,161,161);
    font-size: 13px;
    margin: 0 8px;
`;

const Li = styled.li`
    list-style: none;
    margin: 10px auto;
    height: 14px;
    font-size: 12px;
    position: relative;
    cursor: pointer;
`;

const SearchBox = styled.input`
    width: 220px;
    height: 35px;
    padding: 0px 15px;
    text-align: left;
    font-size: 13px;
`;

const A = styled.a`
    text-decoration: none;
    cursor: pointer;
`;

export default Header;
