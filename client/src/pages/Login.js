import React, {useState} from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {Image, Input, Button, Text} from "../elements";
import { useNavigate } from "react-router-dom";
import mainLogo from "../image/mainLogo.png";
import { useLoginUserMutation } from "../redux/api/user";
import { setUserInfo } from "../redux/modules/user";
import Spinner from "../shared/loading";

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading, isError, error }] = useLoginUserMutation();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if(email === "" || password === "") {
            window.alert("아이디와 비밀번호를 입력해주세요.")
            return;
        }
        
        try {
            // 로그인 요청 보내기
            const { data } = await login({ email, password });
    
            if(data.loginSuccess === true){
                // 로그인 성공 후 유저 데이터 저장
                dispatch(setUserInfo({isLogin:true, userName:data.userName, userId: data.userId}))
                navigate("/");
            }
            else{
                window.alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            }
          } catch (err) {
            console.error('Login failed:', err);
          }
    };

    return(
        <Wrapper>
            <A onClick={()=>navigate("/")}>
                <Image
                    $src={mainLogo}
                    $margin="20px auto"
                    $width="113.04px"
                    $height="22.08px"
                />
            </A>
            
            {isLoading && <Spinner/>}

            <MainContainer>
                <Text 
                    $size="22px"
                    $bold 
                    $color="#BDA4D5"
                    $margin="15px"
                >
                    로그인
                </Text>
                <form
                    onSubmit={onSubmitHandler}
                >
                    <Input
                        placeholder="이메일"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        $width="350px"
                        $height="50px"
                    />
                    <Input
                        placeholder="비밀번호"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        $width="350px"
                        $height="50px"
                        $margin="10px"
                        type="password"
                    />
                    <Button
                        $margin="15px 0px 0px"
                        $width="350px"
                        $color="#BDA4D5"
                        $bg="#FFFFFF"
                        $border="1px solid #e7e7e7"
                    >
                        로그인
                    </Button>
                    <Button
                        type="button"
                        onClick={()=>{
                            navigate("/signup");
                        }}
                        $margin="10px"
                        $width="350px"
                    >
                        회원가입
                    </Button>
                </form>
            </MainContainer>
        </Wrapper>

    );
};

const Wrapper = styled.div`
    text-align: center;
    justify-content: center;

`;

const A = styled.a`
    text-decoration: none;
    cursor: pointer;
`;

const MainContainer = styled.div`
    width:400px;
    margin: 50px auto;
`;

export default Login;