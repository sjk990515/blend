import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import BlendLogo from "../image/BlendLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { menuAble, userHistoryRecoil } from "../recoil/atom";
import { IoMdClose } from "react-icons/io";
import { loginDataRecoil } from "../recoil/atom";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

function Header() {
    // 로그인 정보
    const [loginTrue, setLoginTrue] = useRecoilState(loginDataRecoil);
    // 사용자 잔액, 내역 정보
    const [userHistoryState, setUserHistoryState] =
        useRecoilState(userHistoryRecoil);

    //네비게이트
    const navigate = useNavigate();
    const [disable, setDisable] = useRecoilState(menuAble);

    //로고에서 메인페이지로 네비게이트
    const smallLogoOnClick = () => {
        navigate("/");
        setDisable(false);
    };

    //메뉴 클릭
    const menuOnClick = () => {
        setDisable(!disable);
    };

    // console.log(userHistoryState);

    // const userHistory = async () => {
    //     const response = await axios.post(
    //         "http://localhost:4000/token/myToken",
    //         { _num: loginTrue.sessionId }
    //     );
    //     // setUserHistoryState(response);
    //     return response;
    // };

    // const {
    //     isLoading,
    //     isError,
    //     data: userHistoryData,
    //     error,
    // } = useQuery("userHistory", userHistory);

    useEffect(() => {
        // 로그인 확인
        const sessionId = sessionStorage?.getItem("id");
        const sessionprofile = sessionStorage?.getItem("profile");
        const sessionAuth = sessionStorage?.getItem("auth");
        const sessionEmail = sessionStorage?.getItem("email");
        const sessionNum = sessionStorage?.getItem("num");
        const sessionName = sessionStorage?.getItem("name");
        const sessionWallet = sessionStorage?.getItem("wallet");
        const sessionBirth = sessionStorage?.getItem("birth");

        if (sessionId) {
            const loginData = {
                sessionId,
                sessionprofile,
                sessionAuth,
                sessionEmail,
                sessionNum,
                sessionName,
                sessionWallet,
                sessionBirth,
            };

            setLoginTrue(loginData);

            // 사용자 잔액, 거래 내역
        }
    }, [sessionStorage?.getItem("id")]);

    // 사용자 잔액, 거래내역
    const userHistoryMutation = useMutation(
        (newUser) => axios.post("http://localhost:4000/token/myToken", newUser),
        {
            onSuccess: (response) => {
                const result = response.data;
                setUserHistoryState(result);

                console.log(result);
                // setSignUp(false);
            },
        }
    );

    useEffect(() => {
        if (loginTrue) {
            console.log(loginTrue.sessionNum);
            userHistoryMutation.mutate({ _num: loginTrue.sessionNum });
        }
    }, [loginTrue, window.location.href]);

    return (
        <HeaderDiv>
            {/* 작은 로고 클릭시 홈 이동 */}
            <LogoImg src={BlendLogo} onClick={smallLogoOnClick} />

            {/* 햄버거 메뉴 */}
            {disable ? (
                <IoMdClose className="menu" onClick={menuOnClick} />
            ) : (
                <RxHamburgerMenu className="menu" onClick={menuOnClick} />
            )}
        </HeaderDiv>
    );
}

export default Header;
const HeaderDiv = styled.div`
    z-index: 999999;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 430px;
    background: #432c20;
    height: 70px;
    .menu {
        font-size: 30px;
        color: #f6f290;
        margin-right: 20px;
        cursor: pointer;
    }
`;
const LogoImg = styled.img`
    margin-left: 20px;
    cursor: pointer;
    width: 70px;
`;
