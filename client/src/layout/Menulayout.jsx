import React from "react";
import styled from "styled-components";
import logo from "../image/logo_for_menupage.png";
import bean_img from "../image/bean_img.png";
import { AiOutlineClose } from "react-icons/ai";
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

    return (
        <Body>
           <div className="wrapper"> 
            {/* 로고와 메뉴 닫기 버튼 영역 */}
            <LogoArea>
                {/* BLEND 로고 */}
                <LogoImg src={logo}></LogoImg>

                {/* 메뉴 닫기 */}
                <AiOutlineClose className="close" onClick={closeOnClick}></AiOutlineClose>
            </LogoArea>
            
            {/* 유저 정보 영역 */}
            <UserArea>
                <div className="login-area">
                    <span className="info">로그인 해주세요.</span>
                    <p className="go-login" onClick={loginOnClick}>로그인 하러가기</p>
                </div>

                {/* 커피콩 이미지 */}
                <div className="img-area">
                    <BeanImg src={bean_img}></BeanImg>
                </div>
            </UserArea>

            {/* 메뉴 영역 */}
            <MenuArea>
                <MenuArticle>Beans</MenuArticle>
                <MenuArticle>Mypage</MenuArticle>
                <MenuArticle>Notice</MenuArticle>
                <MenuArticle>Shop</MenuArticle>
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
    width:100vh;
    top: 0;
    left: 0; 
    z-index: 999999999;
    //position: fixed;
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
    .close{
        margin-right: 23px;
        font-size: 25px;
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

    .login-area {
        position: absolute;

    }
    
    .info {
        font-size: 30px;
        font-weight: 600;
    }
    
    .go-login{
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

// 메뉴 영역
const MenuArea = styled.div`
    text-align: center;
`

// 개별 메뉴 영역
const MenuArticle = styled.div`
    height: 62px;
    border-bottom: 1px solid #432C20;
    line-height: 62px;
    font-size: 26px;
`