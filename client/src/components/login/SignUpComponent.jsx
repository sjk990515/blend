import React, { useState } from "react";
import { styled } from "styled-components";
import { loginMenuRecoil } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMutation } from "react-query";
import axios from "axios";

function SignUpComponent() {
    // 비밀번호 온오프
    const [passIconOn, setPassIconOn] = useState(false);
    // 유저 로그인 메뉴
    const [loginMenu, setLoginMenu] = useRecoilState(loginMenuRecoil);
    // 유저 로그인 메뉴
    const [phoneCheck, setPhoneCheck] = useState("");
    // 휴대폰 인증번호
    const [checkNumber, setCheckNumber] = useState("");
    // 인증번호 input
    const [checkNumberValue, setCheckNumberValue] = useState("");
    // 인증 성공
    const [checkSuccess, setCheckSuccess] = useState(false);

    // 패스워드 숨김 아이콘
    const passIconOnClick = () => {
        setPassIconOn(!passIconOn);
    };

    const IdOnChange = (e) => {
        setPhoneCheck(e.target.value);
    };

    const numberPostMutation = useMutation(
        (newNumber) =>
            axios.post("http://localhost:4000/member/smsAuth", newNumber),
        {
            onSuccess: (response) => {
                const result = response.data.auth_Num;
                console.log(result);
                setCheckNumber(result);
                // queryClient.invalidateQueries("comment");
            },
        }
    );

    const phoneMessage = () => {
        // const bbb = new FormData();
        // bbb.append("_id", phoneCheck);
        alert("인증번호가 전송되었습니다");

        const newNumber = {
            _id: phoneCheck,
        };
        // const aaa = JSON.stringify(newNumber);

        numberPostMutation.mutate(newNumber);

        //시도 2

        //     fetch("http://localhost:4000/member/smsAuth", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: {
        //             id: phoneCheck,
        //         },
        //     }).then((response) => console.log(response));
        // };

        //시도 2
        // axios({
        //     url: "http://localhost:4000/member/smsAuth",
        //     method: "post",
        //     data: bbb,
        // }).then(function (res) {
        //     console.log(res);
        // });
    };

    const checkNumberOnClick = () => {
        // checkNumber
        // checkNumberValue

        // checkNumberValue == checkNumber ? {} : {};

        if (checkNumberValue == checkNumber) {
            alert("인증 되었습니다.");
            setCheckNumber("");
            setCheckSuccess(true);
        } else {
            alert("인증 실패했습니다.");
        }
    };

    const checkNumberOnChange = (e) => {
        setCheckNumberValue(e.target.value);
    };
    return (
        <>
            <SignUpForm>
                <InputText>
                    {loginMenu ? "휴대폰 번호" : "사업자 번호"}
                </InputText>
                <Phonediv>
                    {checkNumber || checkSuccess ? (
                        <IdInput
                            type="text"
                            onChange={IdOnChange}
                            placeholder={
                                loginMenu
                                    ? "휴대폰 번호 입력(-없이)"
                                    : "사업자 번호 입력(-없이)"
                            }
                            readOnly
                        />
                    ) : (
                        <IdInput
                            type="number"
                            onChange={IdOnChange}
                            placeholder={
                                loginMenu
                                    ? "휴대폰 번호 입력(-없이)"
                                    : "사업자 번호 입력(-없이)"
                            }
                        />
                    )}
                    {loginMenu ? (
                        checkSuccess ? (
                            ""
                        ) : (
                            <IdCheck onClick={phoneMessage}>
                                {checkNumber ? "재전송" : "인증"}
                            </IdCheck>
                        )
                    ) : (
                        ""
                    )}
                </Phonediv>

                {checkNumber ? (
                    <Phonediv>
                        <InputText>인증번호</InputText>
                        <SignUpInput
                            type="text"
                            placeholder="인증번호 입력"
                            onChange={checkNumberOnChange}
                        />
                        <IdCheck onClick={checkNumberOnClick}>확인</IdCheck>
                    </Phonediv>
                ) : (
                    ""
                )}

                <InputText>{loginMenu ? "이름" : "가맹점 이름"}</InputText>
                <SignUpInput type="text" placeholder="이름 입력" />

                {loginMenu ? (
                    <></>
                ) : (
                    <>
                        <InputText>대표자 이름</InputText>
                        <SignUpInput
                            type="text"
                            placeholder="대표자 이름 입력"
                        />
                    </>
                )}

                <InputText>{loginMenu ? "생일" : "휴대폰 번호"}</InputText>
                <SignUpInput
                    type={loginMenu ? "date" : "text"}
                    placeholder={
                        loginMenu ? "생일 입력" : "휴대폰 번호 입력(-없이)"
                    }
                />

                <InputText>이메일</InputText>
                <SignUpInput type="text" placeholder="이메일 입력" />

                <InputText>비밀번호</InputText>
                <PassBox>
                    <PassInput
                        type={passIconOn ? "text" : "password"}
                        placeholder="비밀번호 입력"
                    />
                    <PassIcon onClick={passIconOnClick}>
                        {passIconOn ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </PassIcon>
                </PassBox>

                <InputText>비밀번호 확인</InputText>
                <PassBox>
                    <PassInput
                        type={passIconOn ? "text" : "password"}
                        placeholder="비밀번호 입력"
                    />
                    <PassIcon onClick={passIconOnClick}>
                        {passIconOn ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </PassIcon>
                </PassBox>

                <SignUpButton>회원가입</SignUpButton>
            </SignUpForm>
        </>
    );
}

export default SignUpComponent;

const SignUpForm = styled.form`
    margin-top: 40px;
    width: 100%;
    input:focus {
        outline: none;
    }
`;
const InputText = styled.h3`
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 15px;
`;
const Phonediv = styled.div`
    position: relative;
`;
const IdInput = styled.input`
    background: #e4e1e0;
    width: 100%;
    margin-bottom: 25px;
    border: 0;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    text-indent: 5px;
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
const IdCheck = styled.p`
    position: absolute;
    bottom: 35px;
    right: 10px;
    font-size: 12px;
    font-weight: 500;
    color: #f06a24;
    cursor: pointer;
`;
const SignUpInput = styled.input`
    background: #e4e1e0;
    width: 100%;
    border: 0;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    text-indent: 5px;
    margin-bottom: 25px;
`;

const PassBox = styled.div`
    position: relative;
    margin-bottom: 25px;
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

const SignUpButton = styled.button`
    font-size: 16px;
    font-weight: 900;
    color: #fff;
    width: 100%;
    height: 60px;
    border-radius: 100px;
    background-color: #432c20;
    border: 0;
    cursor: pointer;
    margin-top: 25px;
`;
