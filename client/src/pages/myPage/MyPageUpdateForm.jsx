import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile_img from "../../image/profile_for_my.png"
import * as S from "../myPage/Mypage.js"
import axios from "axios";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { loginDataRecoil } from "../../recoil/atom"

function MyPageUpdateForm(props) {
    // 네비게이트
    const navigate = useNavigate();

    // 로그인한 유저 정보 (세션에 저장된 데이터)    
    const [loginTrue, setLoginTrue] = useRecoilState(loginDataRecoil);
    const userName = loginTrue.sessionName;
    const userBirth = loginTrue.sessionBirth;
    const userEmail = loginTrue.sessionEmail;
    const userPass = loginTrue.sessionPass;

    // 유저 핸드폰번호(id)에 '-' 기호 붙여주기 위함
    const userId = loginTrue?.sessionId;
    const phoneStart = userId?.substring(0,3);
    const phoneMiddle = userId?.substring(3,7);
    const phoneLast = userId?.substring(7,11);

    // 이름 input
    const [nameInput, setNameInput] = useState(userName);
    // 생일 input
    const [birthInput, setBirthInput] = useState(userBirth);
    // 이메일 input
    const [emailInput, setEmailInput] = useState(userEmail);
    // 비밀번호 input
    const [passInput, setPassInput] = useState(userPass);

    // 휴대폰 인증 버튼 클릭
    const authPhoneOnClick = () => {
        navigate("/checkPhone");
    };

    // 이름 onchange
    const nameOnChange = (e) => {
        setNameInput(e.target.value)
    }
    // 생일 onchange
    const birthOnChange = (e) => {
        setBirthInput(e.target.value)
    }
    // 이메일 onchange
    const emailOnChange = (e) => {
        setEmailInput(e.target.value)
    }
    // 패스워드 onchange
    const passOnChange = (e) => {
        setPassInput(e.target.value)
    }

    // form submit 막기
    const userUpdateOnSubmit = (e) => {
        e.preventDefault();
        // updateDoneClick();
    };

    // 마이페이지 수정 정보 전송 [post]
    const userUpdateMutation = useMutation(
        (updateData) =>
        axios.post("http://localhost:4000/member/edit", updateData),
        {
            onSuccess : (response) => {
                const user = response.data.user;
                const result = response.data.result;

                // 세션값 수정
                if(result){
                    sessionStorage.setItem(
                        "auth",
                        user.MEMBER_AUTH
                    );
                    sessionStorage.setItem(
                        "birth",
                        user.MEMBER_BIRTH
                    );
                    sessionStorage.setItem(
                        "email",
                        user.MEMBER_EMAIL
                    );
                    sessionStorage.setItem("id", user.MEMBER_ID);
                    sessionStorage.setItem(
                        "name",
                        user.MEMBER_NAME
                    );
                    sessionStorage.setItem(
                        "num",
                        user.MEMBER_NUM
                    );
                    sessionStorage.setItem(
                        "profile",
                        user.MEMBER_PROFILE
                    );
                    sessionStorage.setItem(
                        "wallet",
                        user.MEMBER_WALLET
                    );

                    const sessionId = sessionStorage?.getItem("id");
                    const sessionprofile = sessionStorage?.getItem("profile");
                    const sessionAuth = sessionStorage?.getItem("auth");
                    const sessionEmail = sessionStorage?.getItem("email");
                    const sessionNum = sessionStorage?.getItem("num");
                    const sessionName = sessionStorage?.getItem("name");
                    const sessionWallet = sessionStorage?.getItem("wallet");
                    const sessionBirth = sessionStorage?.getItem("birth");

                    // loginRecoil 재할당
                    if (sessionId) {
                        const loginData = {
                            sessionId,
                            sessionprofile,
                            sessionAuth,
                            sessionEmail,
                            sessionNum,
                            sessionName,
                            sessionWallet,
                            sessionBirth,
                        };
                        setLoginTrue(loginData);
                    }
                }
                alert("수정되었습니다.")
                navigate("/mypage") // 마이페이지로 리다이렉트
            },
        }
    )

    // 수정완료 클릭
    const updateDoneClick = () => {
        if (nameInput == "" || birthInput == "" ||
            emailInput == "" || passInput == "") {
            alert("빈칸이 존재합니다.");
        } else {
            const updateData = {
                num : loginTrue.sessionNum,
                name : nameInput,
                birth : birthInput,
                email : emailInput,
                pass : passInput
            };

            userUpdateMutation.mutate(updateData);
        }
    };
    
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

                {/* 수정폼 */}
                <FormArea onSubmit={userUpdateOnSubmit}>
                    {/* <form onSubmit={userUpdateOnSubmit}> */}
                        <Input type="hidden"
                                defaultValue={loginTrue.sessionNum}>
                        </Input>
                        <Input type="text"
                                onChange={nameOnChange}
                                defaultValue={nameInput}>
                        </Input>
                        <Input type="Date"
                                onChange={birthOnChange}
                                defaultValue={birthInput}>
                        </Input>
                        <Input type="text"
                                onChange={emailOnChange}
                                defaultValue={emailInput}>
                        </Input>
                        <Input type="password"
                                onChange={passOnChange}
                                placeholder="비밀번호 수정">
                        </Input>
                        {/* 수정하기 버튼 */}
                        <div className="btn">
                            <UpdateDoneBtn onClick={updateDoneClick}>
                                수정완료
                            </UpdateDoneBtn>
                        </div>
                    {/* </form> */}
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

const FormArea = styled.form`
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
const UpdateDoneBtn = styled.button`
    margin-top: 40px;
    border: none;
    width: 60%;
    padding: 16px 0 16px 0;
    background-color: #432C20;
    color: #F6F290;
    font-size: 16px;
    border-radius: 30px;
    cursor: pointer;
`