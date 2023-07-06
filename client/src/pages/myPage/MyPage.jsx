import React from "react";
import styled from "styled-components";
import profile_img from "../../image/profile_for_my.png"
import { useNavigate } from "react-router-dom";

function MyPage() {
    // 네비게이트
    const navigate = useNavigate();

    // X버튼(닫기) 클릭시 메인페이지로 네비게이트
    const mypageUpdateFormOnClick = () => {
        navigate("/mypage/update");
    };

    return (
        <Body>
            <div className="wrapper">
                {/* 프사 영역 */}
                <div className="profile-area">
                    <ImgBorder>
                        {/* 회원이 프사 수정하면 수정 필요 */}
                        <ProfileImg src={profile_img}></ProfileImg>
                    </ImgBorder>
                </div>

                {/* 회원 휴대폰번호(아이디) */}
                <UserArea>
                    <span>010-3302-1234</span>
                    <span>님</span>
                </UserArea>

                {/* 정보 보여질 곳 */}
                <UserInfoArea>
                    <p className="user-info-txt">회원정보</p>
                    {/* 이름 */}
                    <UserInfoArticle>
                        <span>이름</span>
                        {/* 데이터 받아서 넣을 곳 */}
                        <span className="user-name input">블렌드</span>
                    </UserInfoArticle>

                    {/* 생일 */}
                    <UserInfoArticle>
                        <span>생일</span>
                        {/* 데이터 받아서 넣을 곳 */}
                        <span className="user-birth input">2022/07/05</span>
                    </UserInfoArticle>

                    {/* 이메일 */}
                    <UserInfoArticle>
                        <span>이메일</span>
                        {/* 데이터 받아서 넣을 곳 */}
                        <span className="user-email input">blend@gmail.com</span>
                    </UserInfoArticle>
                </UserInfoArea>

                {/* 버튼 */}
                <BtnArea>
                    <GotoUpdateFormBtn onClick={ mypageUpdateFormOnClick }>수정하기</GotoUpdateFormBtn>
                </BtnArea>
            </div>
        </Body>
    );
}

export default MyPage;

const Body = styled.div`
    height:100vh;
    max-width: 430px;
    display: flex;
    /* top: 0; */
    /* background-color: #E4E1E0; */
    /* z-index: 999999999;  */
    justify-content: center;
    align-items: center;
    min-height:100vh;
    margin-top:-70px;

    .wrapper {
        position: absolute;
        width: 100%;
    }

    .profile-area {
        padding-top: 30px;
    }

    `
// 프사 영역
 // 겉 테두리
const ImgBorder = styled.div`
    width: 140px;
    height: 140px;
    border-radius: 100%;
    border: 2px solid #432C20;
    position: relative;
    margin: 0 auto;
    `
 // 프사
const ProfileImg = styled.img`
    position: absolute;
    width: 100px;
    height: 100px;
    top:17px;
    left: 18px;
`;

const UserArea = styled.div`
    padding-top: 30px;
    text-align: center;
    font-size: 20px;
`

const UserInfoArea = styled.div`
    padding-top: 70px;
    padding-left: 20px;
    
    .user-info-txt {
        font-weight: 700;
        font-size: 16px;
        padding-left: 2px;
    }
`

const UserInfoArticle = styled.div`
    font-size: 14px;
    font-weight: 700;
    margin-top: 14px;
    padding-left: 10px;
    width: 95%;
    height: 55px;
    line-height: 55px;
    border: 1px solid #432C20;
    border-radius: 5px;

    .input {
        padding-left: 80px;
        font-weight: 700;
    }

    .user-email {
        padding-left: 67px;
    }
`

const BtnArea = styled.div`
    text-align: center;
`

const GotoUpdateFormBtn = styled.button`
    margin-top: 55px;
    border: none;
    width: 60%;
    padding: 16px 0 16px 0;
    background-color: #432C20;
    color: #F6F290;
    font-size: 16px;
    border-radius: 30px;
    cursor: pointer;
`