import React, { useEffect, useState } from "react";
import Logo from "../../image/Logo.png";
import { styled } from "styled-components";
import LoginComponent from "../../components/login/LoginComponent";
import SignUpComponent from "../../components/login/SignUpComponent";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginMenuRecoil, loginSignUp } from "../../recoil/atom";

function Login() {
    const navigate = useNavigate();

    // 개인 사업자 메뉴
    const [loginMenu, setLoginMenu] = useRecoilState(loginMenuRecoil);
    // 로그인 회원가입
    const [signUp, setSignUp] = useRecoilState(loginSignUp);

    const customer = () => {
        setLoginMenu(true);
    };

    const business = () => {
        setLoginMenu(false);
    };

    useEffect(() => {
        setSignUp(false);
        setLoginMenu(true);
    }, []);

    return (
        <LoginDIv>
            {/* 타이틀 */}
            <LoginTitleH2>{signUp ? "회원가입" : "로그인"}</LoginTitleH2>

            {/* 로그인 메뉴 */}
            <LoginMenu>
                <CustomerDiv onClick={customer} loginmenu={loginMenu ? 1 : 0}>
                    개인회원
                </CustomerDiv>
                <CustomerDiv onClick={business} loginmenu={!loginMenu ? 1 : 0}>
                    사업자회원
                </CustomerDiv>
            </LoginMenu>

            {signUp ? <SignUpComponent /> : <LoginComponent />}

            {/* <GoBack
                onClick={() => {
                    // navigate("/");
                    setSignUp(false);
                }}
            >
                뒤로가기
            </GoBack> */}
        </LoginDIv>
    );
}

export default Login;
const LoginDIv = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 0 20px;
    margin-top: -70px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const LoginTitleH2 = styled.h2`
    font-size: 20px;
    font-weight: 900;
    margin-top: 100px;
    margin-bottom: 40px;
`;

const LoginMenu = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #727272;
    cursor: pointer;
`;

const CustomerDiv = styled.div`
    width: 50%;
    border-bottom: ${(props) =>
        props.loginmenu ? "1px solid #F06A24" : "1px solid #000"};
    font-size: 14px;
    padding-bottom: 14px;
    color: ${(props) => (props.loginmenu ? "#F06A24" : "#000")};
    font-weight: ${(props) => (props.loginmenu ? "700" : "500")};
`;

const GoBack = styled.p`
    font-size: 16px;
    font-weight: 500;
    margin: 50px 0;
    cursor: pointer;
`;
