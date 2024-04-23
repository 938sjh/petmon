import React,{useEffect, useState} from "react";
import { useLazyAuthUserQuery } from "./redux/api/user";
import { useNavigate } from "react-router-dom";
import Spinner from "./shared/loading";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./redux/modules/user";

//option =>{null:모두 출입 가능, true:로그인한 유저만 출입가능, false:로그인한 유저 출입 불가}
function AuthCheck({ component: Component, option = null, adminRoute = null }) {
    const [authUser, {data, isLoading, isError}] = useLazyAuthUserQuery();
    const isLogin = useSelector(state=>state.user.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function getResult() {
        const result = await authUser().unwrap();
        
        if (isError || !result.isAuth) {
            // 에러가 발생하거나 인증되지 않은 경우 로그인 페이지로 이동
            if(option){
                if(isLogin){
                    dispatch(setUserInfo({isLogin:false, userName:""}));
                    window.alert("다시 로그인 해주세요.");
                }
                navigate("/login");
            }
        }
        else {
            //관리자페이지는 isAdmin이 true면 가능
            if(adminRoute && !result.isAdmin){
                navigate("/");
            }
            else{
                //로그인, 회원가입 페이지는 로그인 이후 불가
                if(option === false){
                    navigate("/");
                }
            }
        }
    }
    useEffect(() => {            
        getResult();
    }, [Component]);

    //login이나 메인페이지로 가야되는 경우 spinner를 띄워줌으로 navigate까지 대기
    return (
        <React.Fragment>   
            {((!isLogin && (adminRoute || option)) || isLoading) && <Spinner/>}
            <Component/>
        </React.Fragment>
    );
}

export default AuthCheck;