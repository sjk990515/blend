import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile_img from "../../image/profile_for_my.png"
import * as S from "./Mypage.js"

function MyPageUpdateForm() {
    // 네비게이트
    const navigate = useNavigate();

    // X버튼(닫기) 클릭시 메인페이지로 네비게이트
    const mypageUpdateFormOnClick = () => {
        navigate("/mypage/update");
    };

    return(
        <S.Body>
            수정폼페이지
            수정폼페이지
            수정폼페이지
            수정폼페이지
            <div className="wrapper">
                {/* 프사 영역 */}
                <div className="profile-area">
                    <S.ImgBorder>
                        {/* 회원이 프사 수정하면 수정 필요 */}
                        <S.ProfileImg src={profile_img}></S.ProfileImg>
                    </S.ImgBorder>
                </div>

                {/* 회원 휴대폰번호(아이디) */}
                <S.UserArea>
                    <span>010-3302-1234</span>
                    <span>님</span>
                </S.UserArea>

                {/* 정보 보여질 곳 */}
                <S.UserInfoArea>
                    <p className="user-info-txt">회원정보</p>
                    {/* 이름 */}
                    <S.UserInfoArticle>
                        <span>이름</span>
                        {/* 데이터 받아서 넣을 곳 */}
                        <span className="user-name input">블렌드</span>
                    </S.UserInfoArticle>

                    {/* 생일 */}
                    <S.UserInfoArticle>
                        <span>생일</span>
                        {/* 데이터 받아서 넣을 곳 */}
                        <span className="user-birth input">2022/07/05</span>
                    </S.UserInfoArticle>

                    {/* 이메일 */}
                    <S.UserInfoArticle>
                        <span>이메일</span>
                        {/* 데이터 받아서 넣을 곳 */}
                        <span className="user-email input">blend@gmail.com</span>
                    </S.UserInfoArticle>

                    {/* 비밀번호 */}
                    <S.UserInfoArticle>
                        <span>비밀번호</span>
                        {/* 데이터 받아서 넣을 곳 */}
                        <span className="user-email input">blend@gmail.com</span>
                    </S.UserInfoArticle>
                </S.UserInfoArea>

                {/* 버튼 */}
                <S.BtnArea>
                    <S.GotoUpdateFormBtn onClick={ mypageUpdateFormOnClick }>수정하기</S.GotoUpdateFormBtn>
                </S.BtnArea>
            </div>
        </S.Body>
    );
}

export default MyPageUpdateForm;