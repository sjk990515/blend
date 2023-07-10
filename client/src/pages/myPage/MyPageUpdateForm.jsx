import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile_img from "../../image/profile_for_my.png"
import * as S from "../myPage/Mypage.js"
import axios from "axios";
import { useMutation } from "react-query";

function MyPageUpdateForm() {
    // 네비게이트
    const navigate = useNavigate();

    // 휴대폰 인증 버튼 클릭
    const authPhoneOnClick = () => {
        navigate("/checkPhone");
    };

    // 더미 데이터
    const userData = [{
        MEMBER_NUM : 1,
        MEMBER_ID : '01033332222',
        MEMBER_NAME : '김블렌드',
        MEMBER_BIRTH: "2022-07-06",
        MEMBER_EMAIL : "blend@gmail.com",
        MEMBER_PROFILE : "profile.png",
        MEMBER_PASSWORD : "0dgoajei"
    }]

    //아이디 input
    const [idInput, setIdInput] = useState(userData[0].MEMBER_ID);
    // 이름 input
    const [nameInput, setNameInput] = useState(userData[0].MEMBER_NAME);
    // 생일 input
    const [birthInput, setBirthInput] = useState(userData[0].MEMBER_BIRTH);
    // 이메일 input
    const [emailInput, setEmailInput] = useState(userData[0].MEMBER_EMAIL);
    // 비밀번호 input
    const [passInput, setPassInput] = useState(userData[0].MEMBER_PASSWORD);

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
    };

    // 마이페이지 수정 정보 전송
    const userUpdatePostMutation = useMutation(
        (userUpdate) =>
            axios.post("http://localhost:4000/member/edit", userUpdate),
        {
            onSuccess : (response) => {
                const result = response.data.result;
                console.log(result);
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
                id : idInput,
                name : nameInput,
                birth : birthInput,
                email : emailInput,
                pass : passInput
            };

            console.log(updateData)
            userUpdatePostMutation.mutate(updateData);
        }
    };
    
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

                {/* 수정폼 */}
                <FormArea>
                    <form onSubmit={userUpdateOnSubmit}>
                        <Input type="hidden" name="_id"
                                value={idInput}>
                        </Input>
                        <Input type="text" name="_name"
                                onChange={nameOnChange}
                                defaultValue={nameInput}>
                        </Input>
                        <Input type="Date" name="_birth"
                                onChange={birthOnChange}
                                defaultValue={birthInput}>
                        </Input>
                        <Input type="text" name="_email"
                                onChange={emailOnChange}
                                defaultValue={emailInput}>
                        </Input>
                        <Input type="password" name="_password"
                                onChange={passOnChange}
                                defaultValue={passInput}>
                        </Input>
                        {/* 수정하기 버튼 */}
                        <div className="btn">
                            <UpdateDoneBtn onClick={updateDoneClick}>
                                수정완료
                            </UpdateDoneBtn>
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