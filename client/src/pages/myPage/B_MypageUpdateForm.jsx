import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile_img from "../../image/profile_for_my.png"
import * as S from "./Mypage.js"

function B_Mypage(){
    // 네비게이트
    const navigate = useNavigate();

    // 휴대폰 인증 버튼 클릭
    const authPhoneOnClick = () => {
        navigate("/checkPhone");
    };

    return (
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
                    <span>010-3302-1234</span>
                    <span>님</span>
                    <AuthPhoneArea>
                        <p className="txt">휴대폰 인증을 해주세요!</p>
                        <AuthPhoneBtn onClick={authPhoneOnClick}>휴대폰인증</AuthPhoneBtn>
                    </AuthPhoneArea>
                </S.UserArea>

                <FormArea>
                    <form action="/mypage/updatepro" method="get">
                        <Input type="text" name="name" defaultValue={"블렌드"}></Input>
                        <Input type="Date" name="date" defaultValue={"2023-07-05"}></Input>
                        <Input type="text" name="email" defaultValue={"blend@gmail.com"}></Input>
                        <Input type="password" name="password" defaultValue={"0dgoajei"}></Input>
                        <div className="btn">
                        <UpdateDoneBtn>수정완료</UpdateDoneBtn>
                        </div>
                    </form>
                </FormArea>
            </S.Wrapper>
        </S.Body>

    );
}

export default B_Mypage