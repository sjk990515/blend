import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile_img from "../../image/profile_for_my.png"
import * as S from "../myPage/Mypage.js"

function MyPageUpdateForm() {
    // 네비게이트
    const navigate = useNavigate();

    // 휴대폰 인증 버튼 클릭
    const authPhoneOnClick = () => {
        navigate("/checkPhone");
    };

    const userData = [{
        MEMBER_NUM : 1,
        MEMBER_ID : '01033332222',
        MEMBER_NAME : '김블렌드',
        MEMBER_BIRTH: "2022-07-06",
        MEMBER_EMAIL : "blend@gmail.com",
        MEMBER_PROFILE : "profile.png",
        MEMBER_PASSWORD : "0dgoajei"
    }]

    const userId = userData[0].MEMBER_ID;
    const phoneStart = userId.substring(0,3);
    const phoneMiddle = userId.substring(3,7);
    const phoneLast = userId.substring(7,11);

    return(
        <S.Body>
            <S.Wrapper>
                 {/* 프사 영역 */}
                 <Profilearea>
                    <S.ImgBorder>
                        {/* 회원이 프사 수정하면 수정 필요 */}
                        <S.ProfileImg src={profile_img}></S.ProfileImg>
                    </S.ImgBorder>
                </Profilearea>

                {/* 회원 휴대폰번호(아이디) */}
                <S.UserArea>
                    {/* 번호 데이터 받아서 바꿔야함 */}
                    <span>{phoneStart}-{phoneMiddle}-{phoneLast}</span>
                    <span>님</span>
                    <AuthPhoneArea>
                        <p className="txt">휴대폰 인증을 해주세요!</p>
                        <AuthPhoneBtn onClick={authPhoneOnClick}>휴대폰인증</AuthPhoneBtn>
                    </AuthPhoneArea>
                </S.UserArea>

                <FormArea>
                    {/* 추후 post로 바꿔야됨!! */}
                    <form action="/mypage/updatepro" method="get">
                        <Input type="text" name="name" defaultValue={userData[0].MEMBER_NAME}></Input>
                        <Input type="Date" name="date" defaultValue={userData[0].MEMBER_BIRTH}></Input>
                        <Input type="text" name="email" defaultValue={userData[0].MEMBER_EMAIL}></Input>
                        <Input type="password" name="password" defaultValue={userData[0].MEMBER_PASSWORD}></Input>
                        <div className="btn">
                        <UpdateDoneBtn>수정완료</UpdateDoneBtn>
                        </div>
                    </form>
                </FormArea>
            </S.Wrapper>
        </S.Body>
    );
}

export default MyPageUpdateForm;

const Profilearea = styled.div`
`

const AuthPhoneArea = styled.div`
    padding-top: 15px;
    padding-bottom: 10px;

    .txt{
        font-size: 11px;
        font-weight: 700;
        color: #432C20;
    }
`

const AuthPhoneBtn = styled.button`
    margin-top: 7px;
    background-color: #F6F290;
    border: 1px solid #432C20;
    border-radius: 30px;
    font-size: 13px;
    cursor: pointer;
    padding: 2px 14px 2px 14px;
`

const FormArea = styled.div`
    padding: 20px;
    text-align: center;
    /* margin-top: 5px; */

    .btn {
        text-align: center;
    }
`
const Input = styled.input`
    font-size: 14px;
    font-weight: 700;
    color: #432C20;
    margin-top: 14px;
    padding-left: 10px;
    padding-right: 10px;
    width: 95%;
    height: 55px;
    border: 1px solid #432C20;
    background-color: #E4E1E0;
    border-radius: 5px;
    outline: none;
`
const UpdateDoneBtn = styled.button.attrs({
    type: 'submit'
})`
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