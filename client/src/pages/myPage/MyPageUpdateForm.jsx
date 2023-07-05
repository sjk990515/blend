import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile_img from "../../image/profile_for_my.png"
import * as S from "../myPage/Mypage.js"

function MyPageUpdateForm() {
    // 네비게이트
    const navigate = useNavigate();

    // X버튼(닫기) 클릭시 메인페이지로 네비게이트
    const mypageUpdateOnClick = () => {
        navigate("/mypage");
    };

    return(
        <S.Body>
            <div className="wrapper">
                 {/* 프사 영역 */}
                 <Profilearea>
                    <S.ImgBorder>
                        {/* 회원이 프사 수정하면 수정 필요 */}
                        <S.ProfileImg src={profile_img}></S.ProfileImg>
                    </S.ImgBorder>
                </Profilearea>

                {/* 회원 휴대폰번호(아이디) */}
                <S.UserArea>
                    <span>010-3302-1234</span>
                    <span>님</span>
                    <AuthPhoneArea>
                        <p className="txt">휴대폰 인증을 해주세요!</p>
                        <AuthPhoneBtn>휴대폰인증</AuthPhoneBtn>
                    </AuthPhoneArea>
                </S.UserArea>

                <FormArea>
                    <form action="/mypage/update" method="post">
                        <Input type="text" defaultValue={"블렌드"}></Input>
                        <Input type="Date" value={"2023-07-05"}></Input>
                        <Input type="text" defaultValue={"blend@gmail.com"}></Input>
                        <Input type="password" defaultValue={"0dgoajei"}></Input>
                        <UpdateDoneBtn onClick={ mypageUpdateOnClick }>수정완료</UpdateDoneBtn>
                    </form>
                </FormArea>

                {/* 버튼 */}
                <S.BtnArea>
                </S.BtnArea>
            </div>
        </S.Body>
    );
}

export default MyPageUpdateForm;

const Profilearea = styled.div`
    padding-top: 50px;
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
    margin-top: 5px;
    background-color: #F6F290;
    border: 1px solid #432C20;
    border-radius: 30px;
    font-size: 12px;
    cursor: pointer;
    padding: 2px 14px 2px 14px;
`

const FormArea = styled.div`
    text-align: center;
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
const UpdateDoneBtn = styled.button`
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