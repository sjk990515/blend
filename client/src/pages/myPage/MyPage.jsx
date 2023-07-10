import React from "react";
import styled from "styled-components";
import profile_img from "../../image/profile_for_my.png";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginDataRecoil } from "../../recoil/atom";

function MyPage() {
    // 네비게이트
    const navigate = useNavigate();

    // 로그인 정보
    const [loginTrue, setLoginTrue] = useRecoilState(loginDataRecoil);

    // 마이페이지 수정폼
    // const [mypageform, setMypageForm] = useRecoilState(myPageRecoil);

    // const goUpdateForm = () => {
    //     setMypageForm(true);
    // };

    // X버튼(닫기) 클릭시 메인페이지로 네비게이트
    const mypageUpdateFormOnClick = () => {
        navigate("/mypage/update"); // 추후 MEMBER_NUM 넘기도록
    };

    // 마이페이지에 들어온 유저의 더미 데이터
    const userData = [
        {
            MEMBER_NUM: 1,
            MEMBER_ID: "01033332222",
            MEMBER_NAME: "김블렌드",
            MEMBER_BIRTH: "2022-07-06",
            MEMBER_EMAIL: "blend@gmail.com",
            MEMBER_PROFILE: "profile.png",
        },
    ];

    const userId = userData[0].MEMBER_ID;
    const phoneStart = userId.substring(0, 3);
    const phoneMiddle = userId.substring(3, 7);
    const phoneLast = userId.substring(7, 11);

    return (
        <Body>
            <div className="wrapper">
                {/* 프사 영역 */}
                <ImgBorder>
                    {/* 회원이 프사 수정하면 수정 필요 */}
                    <ProfileImg src={profile_img}></ProfileImg>
                </ImgBorder>

                {/* 회원 휴대폰번호(아이디) */}
                <UserArea>
                    {/* <span>{phoneStart}-{phoneMiddle}-{phoneLast}</span> */}
                    <span>{loginTrue.sessionId}</span>
                    <span>님</span>
                </UserArea>

                {/* 정보 보여질 곳 */}
                <UserInfoArea>
                    <p className="user-info-txt">회원정보</p>
                    {/* 이름 */}
                    <UserInfoArticle>
                        <span>이름</span>
                        {/* 데이터 받아서 넣을 곳 */}
                        <span className="user-name input">
                            {loginTrue.sessionName}
                        </span>
                    </UserInfoArticle>

                    {/* 생일 */}
                    <UserInfoArticle>
                        <span>생일</span>
                        {/* 데이터 받아서 넣을 곳 */}
                        <span className="user-birth input">
                            {userData[0].MEMBER_BIRTH}
                        </span>
                    </UserInfoArticle>

                    {/* 이메일 */}
                    <UserInfoArticle>
                        <span>이메일</span>
                        {/* 데이터 받아서 넣을 곳 */}
                        <span className="user-email input">
                            {userData[0].MEMBER_EMAIL}
                        </span>
                    </UserInfoArticle>
                </UserInfoArea>

                {/* 버튼 */}
                <BtnArea>
                    {/* 추후 MEMBER_NUM 넘기도록 할 것?? */}
                    <GotoUpdateFormBtn onClick={mypageUpdateFormOnClick}>
                        수정하기
                    </GotoUpdateFormBtn>
                </BtnArea>

                {/* {mypageform ? <MyPageUpdateComponet /> : <LoginComponent />} */}
            </div>
        </Body>
    );
}

export default MyPage;

const Body = styled.div`
    max-width: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin-top: -70px;

    .wrapper {
        width: 100%;
        padding-top: 70px;
        padding-bottom: 50px;
    }
`;
// 프사 영역
// 겉 테두리
const ImgBorder = styled.div`
    width: 140px;
    height: 140px;
    border-radius: 100%;
    border: 2px solid #432c20;
    position: relative;
    margin: 0 auto;
`;
// 프사
const ProfileImg = styled.img`
    position: absolute;
    width: 100px;
    height: 100px;
    top: 17px;
    left: 18px;
`;

const UserArea = styled.div`
    padding-top: 30px;
    text-align: center;
    font-size: 20px;
    width: 100%;
`;

const UserInfoArea = styled.div`
    padding-top: 70px;
    padding-left: 20px;

    .user-info-txt {
        font-weight: 700;
        font-size: 16px;
        padding-left: 2px;
    }
`;

const UserInfoArticle = styled.div`
    font-size: 14px;
    font-weight: 700;
    margin-top: 14px;
    padding-left: 10px;
    width: 95%;
    height: 55px;
    line-height: 55px;
    border: 1px solid #432c20;
    border-radius: 5px;

    .input {
        padding-left: 80px;
        font-weight: 700;
    }

    .user-email {
        padding-left: 67px;
    }
`;

const BtnArea = styled.div`
    text-align: center;
`;

const GotoUpdateFormBtn = styled.button`
    margin-top: 55px;
    border: none;
    width: 60%;
    padding: 16px 0 16px 0;
    background-color: #432c20;
    color: #f6f290;
    font-size: 16px;
    border-radius: 30px;
    cursor: pointer;
`;
