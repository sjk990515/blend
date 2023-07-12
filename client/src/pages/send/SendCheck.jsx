import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import profile1 from "../../image/profile1.png";
import { useRecoilState } from "recoil";
import {
    loadingRecoil,
    loginDataRecoil,
    userHistoryRecoil,
} from "../../recoil/atom";
import { useMutation } from "react-query";
import axios from "axios";

function SendCheck() {
    // 로그인 정보
    const [loginTrue, setLoginTrue] = useRecoilState(loginDataRecoil);
    // 사용자 잔액, 내역 정보
    const [userHistoryState, setUserHistoryState] =
        useRecoilState(userHistoryRecoil);
    //로딩
    const [loading, setLoading] = useRecoilState(loadingRecoil);

    const navigate = useNavigate();

    const { state } = useLocation();

    console.log(state);

    // 정보 전송
    const sendInformationMutation = useMutation(
        (newData) =>
            axios.post("http://localhost:4000/trade/transfer", newData),
        {
            onSuccess: (response) => {
                // 여기서 받아온정보가 없는 사람이면 경고
                const result = response.data.result;
                console.log(result);
                setLoading(false);
                if (result) {
                    navigate("/senddone", {
                        state,
                    });
                } else {
                    alert("송금에 실패했습니다.");
                }
                // 성공하면
                // navigate("/senddone");
                // 실패하면
                // navigate("/send");
            },
        }
    );

    const SendDone = () => {
        setLoading(true);

        const newData = {
            user_wallet: loginTrue.sessionWallet,
            user_num: loginTrue.sessionNum,
            input_amount: state.amount,
            input_wallet: state.wallet,
            receiver_name: state.name,
            user_name: loginTrue.sessionName,
            receiver_num: state.num,
        };

        sendInformationMutation.mutate(newData);
    };

    return (
        <Body>
            <Wrap>
                <div className="Title">
                    <Phone>{loginTrue.sessionId}</Phone>
                    <Bal> 나의 잔액은: {userHistoryState.total} BEANS </Bal>
                </div>
                <Alertbx>
                    <Profile>
                        <ProfileImg src={profile1} alt="redbean" />
                    </Profile>
                    <div className="text">
                        <p>{state.name}님께</p>
                        <p className="price">{state.amount}</p>
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
