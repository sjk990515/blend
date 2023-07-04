import React, { useState } from "react";
import Logo from "../../image/Logo.png";
import { styled } from "styled-components";
import Customer from "../../components/login/Customer";

function Login() {
    // 개인 사업자 메뉴
    const [loginMenu, setLoginMenu] = useState(true);

    const customer = () => {
        setLoginMenu(true);
    };

    const business = () => {
        setLoginMenu(false);
    };

    return (
        <LoginDIv>
            {/* 로고 */}
            <LoginLogoImg src={Logo} />
            {/* 타이틀 */}
            <LoginTitleH2>로그인</LoginTitleH2>

            {/* 로그인 메뉴 */}
            <LoginMenu>
                <LoginMenuDiv onClick={customer} loginMenu={loginMenu}>
                    개인회원
                </LoginMenuDiv>
                <LoginMenuDiv onClick={business} loginMenu={!loginMenu}>
                    사업자회원
                </LoginMenuDiv>
            </LoginMenu>

            <Customer />
        </LoginDIv>
    );
}

export default Login;
const LoginDIv = styled.div`
    width: 100%;
    height: 100vh;
    padding: 0 20px;
    margin-top: -70px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const LoginLogoImg = styled.img`
    margin: 100px 0 40px;
`;

const LoginTitleH2 = styled.h2`
    font-size: 20px;
    font-weight: 900;
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

const LoginMenuDiv = styled.div`
    width: 50%;
    border-bottom: ${(props) =>
        props.loginMenu ? "1px solid #F06A24" : "1px solid #000"};
    font-size: 14px;
    padding-bottom: 14px;
    color: ${(props) => (props.loginMenu ? "#F06A24" : "#000")};
    font-weight: ${(props) => (props.loginMenu ? "700" : "500")};
`;
