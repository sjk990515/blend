import React from "react";
import styled from "styled-components";
import logo from "../image/logo_for_menu.png";
import bean_img from "../image/bean_img.png";
import { AiOutlineClose } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoInstagram } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Menulayout() {
     // 네비게이트
     const navigate = useNavigate();

     // X버튼(닫기) 클릭시 메인페이지로 네비게이트
     const closeOnClick = () => {
         navigate("/");
     };
     
     // X버튼(닫기) 클릭시 메인페이지로 네비게이트
     const loginOnClick = () => {
         navigate("/login");
     };
     
     const logoutOnClick = () => {
         navigate("/logout");
     };

     const beansOnClick = () => {
         navigate("/beans");
     };

     const myPageOnClick = () => {
         navigate("/mypage");
     };

     const noticeOnClick = () => {
         navigate("/notice");
     };

     const shopOnClick = () => {
         navigate("/shop");
     };

    return (
        <Body>
           <div className="wrapper"> 
            {/* 로고와 메뉴 닫기 버튼 영역 */}
            <LogoArea>
                {/* BLEND 로고 */}
                <LogoImg src={logo}></LogoImg>

                {/* 메뉴 닫기 */}
                <AiOutlineClose className="close-btn" onClick={closeOnClick}></AiOutlineClose>
            </LogoArea>
            
            {/* 유저 정보 영역 */}
            <UserArea>
                <div className="no-login">
                    <div className="login-area">
                        <span className="info">로그인 해주세요.</span>
                        <p className="go-login" onClick={loginOnClick}>로그인 하러가기</p>
                    </div>

                    {/* 커피콩 이미지 */}
                    <div className="img-area">
                        <BeanImg src={bean_img}></BeanImg>
                    </div>
                </div> 
                <Logined>
                    <div className="user-info">
                        <p className="user-phone-area">
                            <span className="user-phone">010-1111-2222</span>
                            <span className="user-nim">님</span>
                        </p>
                        <div className="user-token-area">
                            <span className="user-token">3,100</span>
                            <span className="user-token-name">beans</span>
                        </div>
                    </div>
                    <div className="btn-area">
                        <TokenSendBtn></TokenSendBtn>
                        <TokenReceiveBtn></TokenReceiveBtn>
                    </div>
                </Logined>    
            </UserArea>

            {/* 메뉴 영역 */}
            <MenuArea>
                <MenuArticle onClick={beansOnClick}>Beans</MenuArticle>
                <MenuArticle onClick={myPageOnClick}>Mypage</MenuArticle>
                <MenuArticle onClick={noticeOnClick}>Notice</MenuArticle>
                <MenuArticle onClick={shopOnClick}>Shop</MenuArticle>

                <div className="cs-logo-area">
                    <BiLogoGmail className="icon"></BiLogoGmail>
                    <BiLogoTwitter className="icon"></BiLogoTwitter>
                    <BiLogoInstagram className="icon"></BiLogoInstagram>
                </div>
                <LogoutArea onClick={logoutOnClick}>LOGOUT</LogoutArea>
            </MenuArea>
            </div>
        </Body>
    );
}

export default Menulayout;

// 전체 감쌈
const Body = styled.div`
    overflow: hidden;
    height:100vh;
    width:100vw;    
    max-width: 430px;
    position: fixed;
    top: 0;
    background-color: #E4E1E0;
    z-index: 999999999;

    justify-content: center;
    align-items: center;

    .wrapper {
        width: 100%;
        position: absolute;
    }
`

// 상단 (로고랑 닫기 버튼 영역)
const LogoArea = styled.div`
    padding-left: 20px;
    display:flex;
    height: 57px;
    border-bottom: 1px solid #432C20;
    width:100%;
    justify-content: space-between;
    align-items: center;

    /* X 버튼 (메뉴 닫기) */
    .close-btn{
        margin-right: 23px;
        font-size: 25px;
        color: #432C20;
        cursor: pointer;
    }
`;

const LogoImg = styled.img`
    width: 72px;
`;

// 사용자 영역 (로그인 해주세요..)
const UserArea = styled.div`
    width: 100%;
    padding: 50px 0 80px 20px;
    position: relative;

    .no-login {
        display: none;
    }

    .login-area {
        position: absolute;
    }
    
    .info {
        color: #432C20;
        font-size: 30px;
        font-weight: 600;
    }
    
    .go-login{
        color: #432C20;
        padding-top: 17px;
        padding-left: 2px;
        cursor: pointer;
        &:hover{
            font-weight: 600;
            //text-decoration: underline;
        }
    }
    
    .img-area {
        width: 100%;
        text-align: right;
    }
    `;

const BeanImg = styled.img`
    padding-right: 18px;
    padding-top: 25px;
`;

const Logined = styled.div`
    height: 60px;
    color: #432C20;

    .user-phone-area {
        padding-bottom: 20px;
    }
    .user-phone {
        font-weight: 600;
        font-size: 18px;
        margin-right: 5px;
    }

    .user-nim {
        font-size: 15px;
    }

    .user-token-area {
        border-bottom: 1px solid #432C20;
        /* text-decoration: underline; */
        width: 154px;
    }

    .user-token {
        font-size: 28px;
        font-weight: 900;
        margin-right: 25px;
    }

    .user-token-name {
        font-size: 14px;
        font-weight: 600;

    }
`

// 토큰 보내기 버튼
const TokenSendBtn = styled.div`
    
`

// 토큰 받기 버튼
const TokenReceiveBtn = styled.div`
    
`

// 메뉴 영역
const MenuArea = styled.div`
    text-align: center;


    // 메일, 트위터, 인스타 영역
    .cs-logo-area {
        padding-top: 115px;
        font-size: 28px;
    }

    // 메일, 트위터, 인스타 로고
    .icon {
        color: #432C20;
        margin-right: 5px;
    }
`

// 개별 메뉴 영역
const MenuArticle = styled.div`
    height: 62px;
    border-bottom: 1px solid #432C20;
    color: #432C20;
    line-height: 62px;
    font-size: 26px;
    cursor: pointer;
`

const LogoutArea = styled.div`
    margin-top: 12px;
    font-weight: 900;
    font-size: 12px;
    color: #432C20;
    cursor: pointer;
`