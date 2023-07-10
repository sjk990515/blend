import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import BlendLogo from "../image/BlendLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { menuAble } from "../recoil/atom";
import { IoMdClose } from "react-icons/io";
import { loginDataRecoil } from "../recoil/atom";

function Header() {
    // 로그인 정보
    const [loginTrue, setLoginTrue] = useRecoilState(loginDataRecoil);

    //네비게이트
    const navigate = useNavigate();
    const [disable, setDisable] = useRecoilState(menuAble);

    //로고에서 메인페이지로 네비게이트
    const smallLogoOnClick = () => {
        navigate("/");
        setDisable(false);
    };

    const menuOnClick = () => {
        setDisable(!disable);
    };

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
        }
    }, [sessionStorage?.getItem("id")]);

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
