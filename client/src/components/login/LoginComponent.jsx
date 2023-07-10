import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import {
    loginDataRecoil,
    loginMenuRecoil,
    loginSignUp,
} from "../../recoil/atom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Session from "react-session-api";

function LoginComponent() {
    // 로그인 정보
    const [loginTrue, setLoginTrue] = useRecoilState(loginDataRecoil);

    const navigator = useNavigate();
    // 로그인 회원가입
    const [signUp, setSignUp] = useRecoilState(loginSignUp);
    // 비밀번호 온오프
    const [passIconOn, setPassIconOn] = useState(false);
    // 유저 로그인 메뉴
    const [loginMenu, setLoginMenu] = useRecoilState(loginMenuRecoil);
    // 로그인 input
    const [loginInput, setLoginInput] = useState("");
    // 비밀번호 input
    const [passInput, setPassInput] = useState("");

    // 패스워드 숨김 아이콘
    const passIconOnClick = () => {
        setPassIconOn(!passIconOn);
    };
    // 회원가입 이동
    const signUpOnClick = () => {
        setSignUp(true);
    };
    //로그인 form
    const loginOnSubmit = (e) => {
        e.preventDefault();
    };
    // 로그인 input
    const loginInputOnChange = (e) => {
        setLoginInput(e.target.value);
    };
    //  비밀번호 input
    const passInputOnChagne = (e) => {
        setPassInput(e.target.value);
    };
    // 로그인 정보 전송
    const loginPostMutation = useMutation(
        (newUser) =>
            axios.post("http://localhost:4000/member/checkLogin", newUser),
        {
            onSuccess: (response) => {
                const result = response.data.result;
                console.log(result);
                if (result) {
                    // Session.set("user", response.data.user);
                    sessionStorage.setItem(
                        "auth",
                        response.data.user.MEMBER_AUTH
                    );
                    sessionStorage.setItem(
                        "birth",
                        response.data.user.MEMBER_BIRTH
                    );
                    sessionStorage.setItem(
                        "email",
                        response.data.user.MEMBER_EMAIL
                    );
                    sessionStorage.setItem("id", response.data.user.MEMBER_ID);
                    sessionStorage.setItem(
                        "name",
                        response.data.user.MEMBER_NAME
                    );
                    sessionStorage.setItem(
                        "num",
                        response.data.user.MEMBER_NUM
                    );
                    sessionStorage.setItem(
                        "profile",
                        response.data.user.MEMBER_PROFILE
                    );
                    sessionStorage.setItem(
                        "wallet",
                        response.data.user.MEMBER_WALLET
                    );
                    alert("로그인에 성공.");
                    navigator("/");
                } else {
                    alert("로그인에 실패했습니다.");
                }
            },
        }
    );
    // 로그인 클릭
    const loginOnClick = () => {
        if (loginInput == "" || passInput == "") {
            alert("빈칸이 존재합니다.");
        } else {
            const loginData = {
                _id: loginInput,
                _pass: passInput,
            };

            loginPostMutation.mutate(loginData);
        }
    };

    // 로그인 여부
    useEffect(() => {
        if (loginTrue) {
            alert("이미 로그인 상태입니다.");
            navigator("/");
        }
    }, [loginTrue]);
    return (
        <>
            <LoginTextH2>로그인 하세요</LoginTextH2>

            <LoginForm onSubmit={loginOnSubmit}>
                <IdInput
                    type="text"
                    placeholder={
                        loginMenu
                            ? "휴대폰 번호 입력(-없이)"
                            : "사업자 번호 입력(-없이)"
                    }
                    onChange={loginInputOnChange}
                />
                <PassBox>
                    <PassInput
                        type={passIconOn ? "text" : "password"}
                        placeholder="비밀번호 입력"
                        onChange={passInputOnChagne}
                    />
                    <PassIcon onClick={passIconOnClick}>
                        {passIconOn ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </PassIcon>
                </PassBox>

                <LoginButton onClick={loginOnClick}>로그인</LoginButton>
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
