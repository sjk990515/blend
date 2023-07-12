import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
    loadingRecoil,
    loginDataRecoil,
    userHistoryRecoil,
} from "../../recoil/atom";

function Send() {
    const navigate = useNavigate();
    const [AddrNumber, setAddrNumber] = useState("");
    const [sendAmount, setSendAmount] = useState(0);
    // 로그인 정보
    const [loginTrue, setLoginTrue] = useRecoilState(loginDataRecoil);
    // 사용자 잔액, 내역 정보
    const [userHistoryState, setUserHistoryState] =
        useRecoilState(userHistoryRecoil);
    //로딩
    const [loading, setLoading] = useRecoilState(loadingRecoil);
    // 정보 전송
    // react-query
    const sendUserMutation = useMutation(
        (newData) =>
            axios.post("http://localhost:4000/trade/selectMember", newData),
        {
            onSuccess: (response) => {
                // 여기서 받아온정보가 없는 사람이면 경고
                const result = response.data;
                console.log(result);
                // queryClient.invalidateQueries("comment");
                setLoading(false);
                if (!result.result) {
                    alert("없는 주소입니다.");
                } else {
                    navigate("/sendcheck", {
                        state: {
                            // 받아온 사람이름도 넘겨야 함
                            name: result.name,
                            wallet: result.wallet,
                            num: result.num,
                            amount: sendAmount,
                            total: result.token_total,
                        },
                    });
                }
            },
        }
    );

    const SendCheck = async () => {
        // 서버에서 전달받아야 하는 값
        if (AddrNumber == "" || sendAmount == "") {
            alert("빈칸이 존재합니다.");
        } else {
            setLoading(true);
            const newData = {
                _id: AddrNumber, // 주소 & 번호
            };
            sendUserMutation.mutate(newData);
        }
    };

    const Scan = () => {
        navigate("/scan");
    };
    const AddrNumberOnChange = (e) => {
        setAddrNumber(e.target.value);
    };

    const SendAmountOnchange = (e) => {
        setSendAmount(e.target.value);
    };

    return (
        <Body>
            <div className="Title">
                {/* 내정보 폰번호 불러오기 */}
                <Phone>{loginTrue.sessionId}</Phone>
                {/* 주소 불러오기 */}
                <Addr>{loginTrue.sessionWallet}</Addr>
            </div>
            <InputBox>
                {/* 수량*/}
                <Ibox
                    onChange={SendAmountOnchange}
                    type="number"
                    placeholder="수량"
                ></Ibox>
                {/* 내 잔액 확인 */}
                <Bal> 나의 잔액은: {userHistoryState.total} </Bal>
                {/* 주소 혹은 핸드폰번호 */}
                <Ibox
                    required
                    onChange={AddrNumberOnChange}
                    type="number"
                    placeholder="주소 혹은 핸드폰 번호"
                ></Ibox>
                <Wrap>
                    <div className="ScanBtn">
                        <Scanbtn onClick={Scan}>스캔</Scanbtn>
                    </div>
                    <div className="notice">수량과 주소를 확인하세요.</div>
                </Wrap>
                <Sendbtn onClick={SendCheck}>보내기</Sendbtn>
            </InputBox>

            <Cancel>취소</Cancel>
        </Body>
    );
}

export default Send;

const Body = styled.div`
    background-color: #432c20;
    text-align: center;
    min-height: 100vh;
    margin-top: -70px;
`;

const Phone = styled.div`
    font-size: 26px;
    color: #f6f290;
    padding-top: 114px;
    text-align: center;
`;

const Addr = styled(Phone)`
    margin: 0 auto;
    width: 50%;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 102px;
`;

const Ibox = styled.input`
    width: 322px;
    height: 60px;
    border-radius: 30px;
    border: 2px solid #f6f290;
    background-color: #432c20;
    text-indent: 10px;
    color: #f2f2f2;
    font-size: 14px;
    ::placeholder {
        font-size: 14px;
    }
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const InputBox = styled.form`
    width: 320px;
    margin: 0 auto;
    .ScanBtn {
        text-align: left;
    }
    .notice {
        color: #d44c3d;
        font-size: 14px;
        margin-top: 22px;
        text-align: right;
    }
`;

const Bal = styled.div`
    padding: 10px;
    color: #f6f290;
    font-weight: 800px;
    text-align: left;
    font-size: 14px;
`;

const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Scanbtn = styled.div`
    width: 96px;
    height: 40px;
    border-radius: 30px;
    background-color: #f6f290;
    border: 0;
    text-align: center;
    margin-top: 10px;
    color: #432c20;
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 154px;
    line-height: 40px;
    cursor: pointer;
`;

const Sendbtn = styled.div`
    width: 110px;
    height: 46px;
    color: #432c20;
    font-weight: 800;
    font-size: 16px;
    cursor: pointer;
    background-color: #f6f290;
    border-radius: 30px;
    text-align: center;
    line-height: 46px;
    margin: 0 auto;
    margin-bottom: 26px;
`;

const Cancel = styled.div`
    text-align: center;
    /* content=''; */
    clear: both;
    display: block;
    color: #f6f290;
    font-weight: 800;
    font-size: 16px;
    padding-bottom: 84px;
`;
