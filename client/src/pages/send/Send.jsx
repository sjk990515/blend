import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Send() {
    const navigate = useNavigate();

    const SendCheck = () => {
        navigate("/sendcheck");
    };

    return (
        <Body>
            <div className="Title">
                <Phone>010-3302-1234</Phone>
                <Addr>0x0000000000</Addr>
            </div>
            <InputBox>
                <Ibox placeholder="수량"></Ibox>
                <Bal> 나의 잔액은: 3000 </Bal>
                <Ibox placeholder="주소 혹은 핸드폰 번호"></Ibox>
                <Wrap>
                    <div className="ScanBtn">
                        <Scan>스캔</Scan>
                    </div>
                    <div className="notice">수량과 주소를 확인하세요.</div>
                </Wrap>
            </InputBox>
            <Sendbtn onClick={SendCheck}>보내기</Sendbtn>
            <Cancel>취소</Cancel>
        </Body>
    );
}

export default Send;

const Body = styled.div`
    background-color: #432c20;
    text-align: center;
    margin-top: -70px;
    min-height: 100vh;
`;

const Phone = styled.div`
    font-size: 26px;
    color: #f6f290;
    padding-top: 114px;
    text-align: center;
`;

const Addr = styled(Phone)`
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 102px;
`;

const Ibox = styled.input`
width:322px;
height:60px;
border-radius:30px;
border:2px solid #F6F290;
background-color:#432C20;
text-indent:10px;
color:#f2f2f2;
font-size:14px;
::placeholder{
    14px;
}
`;

const InputBox = styled.div`
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

const Scan = styled.button`
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
`;

const Sendbtn = styled(Scan)`
    width: 110px;
    height: 46px;
    color: #432c20;
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 26px;
    cursor: pointer;
`;

const Cancel = styled.div`
text-align:center;
content='';
clear:both;
display:block;
color:#F6F290;
font-weight:800;
font-size:16px;
padding-bottom:84px;
`;
