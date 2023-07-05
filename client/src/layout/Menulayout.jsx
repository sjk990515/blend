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
         navigate("/member/checkLogin");
     };

    return (
        <Body>
            {/* 로고와 메뉴 닫기 버튼 영역 */}
            <LogoArea>
                {/* BLEND 로고 */}
                <LogoImg src={logo}></LogoImg>

                {/* 메뉴 닫기 */}
                <AiOutlineClose className="close" onClick={closeOnClick}></AiOutlineClose>
            </LogoArea>
            
            {/* 유저 정보 영역 */}
            <UserArea>
                    <div className="info">로그인 해주세요.</div>
                    <div className="go-login" onClick={loginOnClick}>로그인 하러가기</div>
                    
                    {/* 커피콩 이미지 */}
                    <BeanImg src={bean_img}></BeanImg>
            </UserArea>
            <MenuArea>

            </MenuArea>
        </Body>
    );
}

export default Menulayout;

const Body = styled.div`
    overflow: hidden;
`

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

const UserArea = styled.div`
    width: 100%;
    padding: 50px 50px 80px 20px;
    position: relative;
    object-fit: contain;

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
`;

const BeanImg = styled.img`
    position: absolute;
    left: 222px;
    top:80px;
`;

const MenuArea = styled.div`

`