import React from "react";
import { styled } from "styled-components";
import redCircle from "../../image/redCircle.png";

function MyBeans() {
    //더미 데이터
    const aaa = [
        // SmsAuth
        {
            id: 1,
            time: "2023.07.03 22:33",
            name: "보라카페",
            pay: "-700",
            wallet: "1400",
        },
        {
            id: 2,
            time: "2023.07.03 22:33",
            name: "동그란카페",
            pay: "-700",
            wallet: "1400",
        },
        {
            id: 3,
            time: "2023.07.03 22:33",
            name: "ㅁㄴㅇㄹ",
            pay: "-700",
            wallet: "1400",
        },
        {
            id: 4,
            time: "2023.07.03 22:33",
            name: "ㅁㄴㅇㄹ",
            pay: "-700",
            wallet: "1400",
        },
        {
            id: 5,
            time: "2023.07.03 22:33",
            name: "ㅁㄴㅇㄹ",
            pay: "-700",
            wallet: "1400",
        },
    ];

    return (
        <MyBeansWrap>
            <MyBeansTitle>안녕하세요!</MyBeansTitle>
            <MyBeansSmallTitle>누구누구님</MyBeansSmallTitle>

            <CountBox>
                <BoxText>나의 잔액</BoxText>

                <BoxContent>
                    3100 <BoxSpan>BEANS</BoxSpan>
                </BoxContent>

                <BoxImg src={redCircle} alt="redCircle" />
            </CountBox>

            <HistoryTitle>거래내역</HistoryTitle>
            {aaa.map((i) => {
                return (
                    <History>
                        <HistoryDate>{i.time}</HistoryDate>
                        <HistoryName>{i.name}</HistoryName>

                        <HistoryUse>{i.pay}</HistoryUse>
                        <HistoryCount>잔액 {i.wallet}</HistoryCount>
                    </History>
                );
            })}
        </MyBeansWrap>
    );
}

export default MyBeans;

const MyBeansWrap = styled.div`
    min-height: 100vh;
    margin: -70px 20px 50px;
`;
const MyBeansTitle = styled.h2`
    color: #432c20;
    font-size: 28px;
    font-weight: 700;
    padding: 100px 0 10px 0;
`;
const MyBeansSmallTitle = styled.p`
    color: #432c20;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
`;
const CountBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 170px;
    background: #e8e48f;
    border: 2px solid #432c20;
    border-radius: 10px;
    box-shadow: 2px 2px 5px 0 #727272;
`;
const BoxText = styled.p`
    font-size: 14px;
    margin-bottom: 15px;
    font-weight: 700;
`;
const BoxContent = styled.h2`
    font-size: 50px;
    font-weight: 500;
`;
const BoxSpan = styled.span`
    font-size: 14px;
    font-weight: 700;
`;
const BoxImg = styled.img`
    width: 50px;
    position: absolute;
    top: 20px;
    right: 20px;
`;
const HistoryTitle = styled.h2`
    margin-top: 40px;
    font-size: 16px;
    font-weight: 700;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;
const History = styled.div`
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;
`;
const HistoryDate = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin: 10px 0;
`;
const HistoryName = styled.div`
    font-size: 20px;
    font-weight: 700;
`;
const HistoryUse = styled.div`
    text-align: right;
    margin: 7px 0;
    color: #f06a24;
    font-size: 20px;
    font-weight: 700;
`;
const HistoryCount = styled.div`
    text-align: right;
    font-size: 14px;
`;
