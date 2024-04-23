import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Image, Input, Button, Text} from "../elements";
import { useNavigate } from "react-router-dom";
import { emailCheck } from "../shared/common";
import mainLogo from "../image/mainLogo.png";
import { useSignupUserMutation } from "../redux/api/user";
import Spinner from "../shared/loading";

const Signup = (props) => {
    const navigate = useNavigate();
    const [signup, { isLoading, isError, error }] = useSignupUserMutation();

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(
            email === "" ||
            password === "" ||
            passwordCheck === "" ||
            userName === "" 
            ) {
                window.alert("회원 정보를 입력하세요.");
            return;
        }
        if(!emailCheck(email)) {
            window.alert("이메일 형식이 잘못되었습니다.");
        };
    
        if(password.length < 8) {
            window.alert("비밀번호는 8자리 이상으로 구성해야합니다.");
        }
        if(password !== passwordCheck) {
            window.alert("비밀번호가 일치하지 않습니다.");
        }
        try {
            const { data } = await signup({ email, password, userName, phoneNum });
            if(data.signupSuccess === true){
                navigate("/login");
            }
            else{
                window.alert("회원가입이 제대로 처리되지 않았습니다.");
            }
          } catch (err) {
            console.error('Signup failed:', err);
          }
    };
    useEffect(() => {
        if (phoneNum.length === 10) {
          setPhoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phoneNum.length === 13) {
          setPhoneNum(phoneNum.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
      }, [phoneNum]);

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
                    회원정보 입력
                </Text>
                <form onSubmit={onSubmitHandler}>
                    <FormInfo>
                        이메일
                    </FormInfo>
                    <Input
                        placeholder="이메일을 입력해 주세요"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        $width="350px"
                        $height="50px"
                        $margin="15px"
                    />
                    <FormInfo>
                        비밀번호
                    </FormInfo>
                    <Input
                        placeholder="비밀번호를 입력해 주세요"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        $width="350px"
                        $height="50px"
                        $margin="15px"
                        type="password"
                    />
                    <FormInfo>
                        비밀번호 확인
                    </FormInfo>
                    <Input
                        placeholder="비밀번호를 다시한번 입력해 주세요"
                        onChange={(e) => {
                            setPasswordCheck(e.target.value);
                        }}
                        value={passwordCheck}
                        $width="350px"
                        $height="50px"
                        $margin="15px"
                        type="password"
                    />
                    <FormInfo>
                        이름
                    </FormInfo>
                    <Input
                        placeholder="이름을 입력해 주세요"
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                        value={userName}
                        $width="350px"
                        $height="50px"
                        $margin="15px"
                    />

                    <FormInfo>
                        휴대폰 번호
                    </FormInfo>
                    <Input
                        placeholder="휴대폰 번호를 입력해 주세요"
                        onChange={(e) => {
                            //자동으로 하이픈 생성
                            const regex = /^[0-9\b -]{0,13}$/;
                            if (regex.test(e.target.value)) {
                                setPhoneNum(e.target.value);
                            }
                        }}
                        value={phoneNum}
                        $width="350px"
                        $height="50px"
                        $margin="15px"
                    />
                    <Button
                        $margin="15px 0px 0px"
                        $width="350px"
                        $border="1px solid #e7e7e7"
                    >
                        가입 완료하기
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

const FormInfo = styled.div`
    float: left;
    margin-left: 30px;
    font-size: 15px;
`;
export default Signup;