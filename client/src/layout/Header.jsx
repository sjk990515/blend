import React from "react";
import { styled } from "styled-components";
import small_Logo from "../image/small_Logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Header() {
    //네비게이트
    const navigate = useNavigate();

    //로고에서 메인페이지로 네비게이트
    const smallLogoOnClick = () => {
        navigate("/");
    };

    return (
        <HeaderDiv>
            {/* 작은 로고 클릭시 홈 이동 */}
            <LogoImg src={small_Logo} onClick={smallLogoOnClick} />

            {/* 햄버거 메뉴 */}
            <RxHamburgerMenu className="menu" />
        </HeaderDiv>
    );
}

export default Header;
const HeaderDiv = styled.div`
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
`;
