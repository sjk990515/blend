import React, { useEffect } from "react";
import { styled } from "styled-components";
import redCircle from "../../image/redCircle.png";
import { useRecoilState } from "recoil";
import { loginDataRecoil, userHistoryRecoil } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";

function MyBeans() {
    const navigator = useNavigate();
    // 로그인 정보
    const [loginTrue, setLoginTrue] = useRecoilState(loginDataRecoil);
    // 사용자 잔액, 내역 정보
    const [userHistoryState, setUserHistoryState] =
        useRecoilState(userHistoryRecoil);

    // 로그인 여부
    useEffect(() => {
        if (!sessionStorage.getItem("id")) {
            alert("로그인 하세요");
            navigator("/login");
        }
    }, [loginTrue]);

    return (
        <MyBeansWrap>
            <MyBeansTitle>안녕하세요!</MyBeansTitle>
            <MyBeansSmallTitle>{loginTrue.sessionName}님</MyBeansSmallTitle>

            <CountBox>
                <BoxText>나의 잔액</BoxText>

                <BoxContent>
                    {userHistoryState.total} <BoxSpan>BEANS</BoxSpan>
                </BoxContent>

                <BoxImg src={redCircle} alt="redCircle" />
            </CountBox>

            <HistoryTitle>거래내역</HistoryTitle>
            {!userHistoryState.content ? (
                <HistoryNone>거래내역이 없습니다.</HistoryNone>
            ) : (
                <>
                    {userHistoryState?.content?.map((i) => {
                        return (
                            <History key={i.id}>
                                <HistoryDate>
                                    {i.TOKEN_REGDATE?.slice(0, 10)}
                                </HistoryDate>
                                <HistoryName>{i.TOKEN_CONTENT}</HistoryName>

                                <HistoryUse>{i.TOKEN_CHANGED}</HistoryUse>
                                <HistoryCount>
                                    잔액 {userHistoryState.total}
                                </HistoryCount>
                            </History>
                        );
                    })}
                </>
            )}
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
const HistoryNone = styled.h2`
    padding-top: 20px;
    font-size: 20px;
    text-align: center;
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
