import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import profile1 from "../../image/profile1.png";

function SendCheck() {
    const navigate = useNavigate();

    const {state} = useLocation();

    console.log(state);


    const SendDone =()=>{
        navigate("/senddone")
    }

    return (
        <Body>
            <Wrap>
                <div className="Title">
                    <Phone>010-3302-1234</Phone>
                    <Bal> 나의 잔액은: 3,000 BEANS </Bal>
                </div>
                <Alertbx>
                    <Profile>
                        <ProfileImg src={profile1} alt="redbean" />
                    </Profile>
                    <div className="text">
                        <p>{}님께</p>
                        {/* 백에서 가져온 이름  */}
                        <p className="price">{}</p>
                        {/* 백에서 가져온 금액 */}
                        <p>BEANS를 이체합니다.</p>
                    </div>
                </Alertbx>

                <Sendbtn onClick={SendDone}>보내기</Sendbtn>
            </Wrap>
        </Body>
    );
}

export default SendCheck;

const Body = styled.div`
    background-color: #432c20;
    text-align: center;
    min-height: 100vh;
    margin-top: -70px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow-y :hidden; */
`;

const Wrap = styled.div``;

const Phone = styled.div`
    font-size: 26px;
    color: #f6f290;
    /* padding-top:114px; */
    text-align: center;
`;

const Addr = styled(Phone)`
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 102px;
`;

const Bal = styled.div`
    padding: 10px;
    color: #f6f290;
    font-weight: 800px;
    text-align: center;
    font-size: 14px;
    margin-bottom: 54px;
`;

const Alertbx = styled.div`
    width: 320px;
    height: 320px;
    background-color: #f6f290;
    margin: 0 auto;
    border-radius: 10px;
    margin-bottom: 90px;
    padding: 32px;

    .qr {
        font-size: 20px;
        font-weight: bold;
        padding-top: 112px;
        margin-bottom: 34px;
    }

    .al1 {
        line-height: 20px;
        color: #f06a24;
    }

    p {
        font-size: 14px;
        margin: 10px;
    }

    .price {
        font-size: 20px;
        font-weight: 800;
    }

    .text {
        margin-top: 32px;
    }
`;

const Profile = styled.div`
    width: 140px;
    height: 140px;
    border-radius: 100%;
    border: 2px solid #f06a24;
    text-align: center;
    margin: 0 auto;
    padding-top: 32px;
    padding-bottom: 38px;
    position: relative;
`;

const ProfileImg = styled.img`
    width: 100px;
    height: 100px;
    line-height: 100px;
    position: absolute;
    top: 17px;
    left: 18px;
`;

const Sendbtn = styled.div`
    width: 110px;
    height: 46px;
    border-radius: 30px;
    background-color: #f6f290;
    border: 0;
    text-align: center;
    margin: 0 auto;
    line-height: 46px;
    margin-top: 10px;
    color: #432c20;
    font-size: 14px;
    font-weight: 800;
    /* margin-bottom:154px; */
`;
