import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { loginMenuRecoil, loginSignUp } from "../../recoil/atom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function LoginComponent() {
    // 로그인 회원가입
    const [signUp, setSignUp] = useRecoilState(loginSignUp);
    // 비밀번호 온오프
    const [passIconOn, setPassIconOn] = useState(false);
    // 유저 로그인 메뉴
    const [loginMenu, setLoginMenu] = useRecoilState(loginMenuRecoil);

    // 패스워드 숨김 아이콘
    const passIconOnClick = () => {
        setPassIconOn(!passIconOn);
    };

    const signUpOnClick = () => {
        setSignUp(true);
    };

    return (
        <>
            <LoginTextH2>로그인 하세요</LoginTextH2>

            <LoginForm>
                <IdInput
                    type="text"
                    placeholder={
                        loginMenu
                            ? "휴대폰 번호 입력(-없이)"
                            : "사업자 번호 입력(-없이)"
                    }
                />
                <PassBox>
                    <PassInput
                        type={passIconOn ? "text" : "password"}
                        placeholder="비밀번호 입력"
                    />
                    <PassIcon onClick={passIconOnClick}>
                        {passIconOn ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </PassIcon>
                </PassBox>

                <LoginButton>로그인</LoginButton>
            </LoginForm>

            <ButtonSpanFlex>
                <ButtonSpan>아이디 찾기 </ButtonSpan>
                <ButtonSpan> | </ButtonSpan>
                <ButtonSpan>비밀번호 찾기 </ButtonSpan>
                <ButtonSpan> | </ButtonSpan>
                <ButtonSpan onClick={signUpOnClick}>회원가입</ButtonSpan>
            </ButtonSpanFlex>
        </>
    );
}

export default LoginComponent;
const LoginTextH2 = styled.h2`
    width: 100%;
    font-size: 18px;
    font-weight: 900;
    margin-top: 40px;
`;

const LoginForm = styled.form`
    margin-top: 40px;
    width: 100%;
    input:focus {
        outline: none;
    }
`;
const IdInput = styled.input`
    background: #e4e1e0;
    width: 100%;
    /* font-size: 12px; */
    margin-bottom: 40px;
    border: 0;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    text-indent: 5px;
`;
const PassBox = styled.div`
    position: relative;
`;
const PassInput = styled.input`
    background: #e4e1e0;
    width: 100%;
    /* font-size: 12px; */
    border: 0;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    text-indent: 5px;
`;
const PassIcon = styled.div`
    position: absolute;
    cursor: pointer;
    bottom: 5px;
    right: 10px;
`;

const LoginButton = styled.button`
    font-size: 16px;
    font-weight: 900;
    color: #fff;
    width: 100%;
    height: 60px;
    border-radius: 100px;
    background-color: #432c20;
    border: 0;
    cursor: pointer;
    margin-top: 50px;
`;

const ButtonSpanFlex = styled.div`
    display: flex;
    font-size: 12px;
    margin-top: 20px;
    font-weight: 500;
`;

const ButtonSpan = styled.p`
    margin: 0 5px;
    cursor: pointer;
`;
