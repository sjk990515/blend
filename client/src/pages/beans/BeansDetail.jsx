import React, { useState } from "react";
import styled from "styled-components";
import blend from "../../image/blendlogo_for_beansdetail.png";
import { BiCopy } from "react-icons/bi";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";

function BeansDetail(props) {
    // 서버에서 받아온 정보를 저장 (거래내역에 보일 token에 대한 정보들)
    const [content, setContent] = useState([]);

    // 서버에 전달한 파라미터
    const param = useParams();
    const userNum = param.num; // 멤버 번호
    const { state } = useLocation();
    const userToken = state.token; // 해당 멤버의 토큰 보유량

    // 클립보드 복사 기능을 위해 사용
    const userWallet = JSON.stringify(state.wallet).substring(1, 43);

    // 서버와 연결
    const getUserData = async () => {
        const response = await axios.get("http://localhost:4000/token/select", {
            params: {
                _num: userNum,
                _total: userToken,
            },
        });

        const contents = response.data.content;
        setContent(contents);

        return response;
    };

    console.log(content);

    // 왜 이게 있어야 데이터가 뜨는거지
    const { isLoading, isError, data, error } = useQuery(
        "getUserData",
        getUserData
    );

    // TOKEN_CHANGED가 음수인지 양수인지 체크하는 함수
    const checkSign = (target) => {
        let sign = "";
        let check = Math.sign(target);

        return check == 1 ? (sign = "plus") : "minus";
    };

    // 클릭씨 주소 복사 시키는 함수
    const clickCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("주소가 복사되었습니다!");
        } catch (e) {
            alert("복사에 실패하였습니다.");
        }
    };

    return (
        <Body>
            <Wrapper>
                {/* 유저 지갑 정보 */}
                <SquareDiv>
                    <BlenImgArea>
                        <BlenImg src={blend}></BlenImg>
                    </BlenImgArea>
                    <UserInfoArea>
                        <AddressArea
                            onClick={() => {
                                clickCopyClipBoard(userWallet);
                            }}
                        >
                            <Label>주소</Label>
                            <Text>
                                <UserAddress>
                                    {state.wallet.substring(0, 6)}…
                                    {state.wallet.slice(-6)}
                                    &nbsp;
                                    <BiCopy className="copy-icon"></BiCopy>
                                </UserAddress>
                            </Text>
                        </AddressArea>
                        <BalanceArea>
                            <Label>보유량</Label>
                            <UserBalance>
                                {state.token.toLocaleString()}
                            </UserBalance>
                        </BalanceArea>
                    </UserInfoArea>
                </SquareDiv>

                {/* 거래내역 */}
                <TransferArea>
                    <TitleDiv>거래내역</TitleDiv>
                    {/* 개별 거래내역 - 반복문을 통해 출력*/}
                    {content?.length != undefined ? (
                        <>
                        { content?.map((i) => {
                            return (
                                <TransferArticle key={i.TOKEN_NUM}>
                                    <DateAndTimeDiv>
                                        {/* 거래 날짜 */}
                                        <TransferDate>
                                            {i.TOKEN_REGDATE}
                                        </TransferDate>
                                    </DateAndTimeDiv>

                                    <AddressAndAmountDiv>
                                        {/* 거래된 주소 */}
                                        <TransferAddress>
                                            {i.TRADE_ADDRESS.substring(0, 6)}
                                            …
                                            {i.TRADE_ADDRESS.slice(-6)}
                                        </TransferAddress>

                                        {/* 토큰거래양 - 음수∙양수에 따라 색깔 다르게 보여줌 */}
                                        <SignAndAmountDiv>
                                                {checkSign(i.TOKEN_CHANGED) ==
                                                "plus" ? (
                                                    <TransferAmount
                                                        color={"#F06A24"}
                                                    >
                                                        +{i.TOKEN_CHANGED.toLocaleString()}
                                                    </TransferAmount>
                                                ) : (
                                                    <TransferAmount
                                                        color={"#0C77F8"}
                                                    >
                                                        {i.TOKEN_CHANGED.toLocaleString()}
                                                    </TransferAmount>
                                                )}
                                        </SignAndAmountDiv>
                                        </AddressAndAmountDiv>
                                    </TransferArticle>
                                );
                            })}
                        </>
                    ) : (
                        <NoData>
                            거래내역이 존재하지 않습니다.
                        </NoData>
                    )}
                </TransferArea>
            </Wrapper>
        </Body>
    );
}

export default BeansDetail;

const Body = styled.div`
    max-width: 430px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin-top: -70px;
`;
const Wrapper = styled.div`
    width: 100%;
    padding-top: 110px;
`;

const SquareDiv = styled.div`
    z-index: 1;
    margin: 0 auto;
    position: relative;
    width: 90%;
    height: 212px;
    border-radius: 10px;
    border: 2px solid #432c20;
    backdrop-filter: blur(6px);
    background: rgb(246, 242, 144);
    background: linear-gradient(
        143deg,
        rgba(246, 242, 144, 0.6) 0%,
        rgba(231, 229, 183, 0.2259497549019608) 51%,
        rgba(217, 217, 217, 0) 100%
    );
    padding: 1.56em;
    box-shadow: 0px 4px 7px 0 #797979;
`;

const BlenImgArea = styled.div`
    position: relative;
    width: 100%;
    margin-top: 8px;
`;

const BlenImg = styled.img`
    width: 120px;
`;

const UserInfoArea = styled.div`
    position: relative;
    width: 100%;
    height: 80px;
    color: #432c20;
    top: 20%;
`;

const AddressArea = styled.div`
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
`;
const BalanceArea = styled(AddressArea)``;

const Label = styled.span`
    width: 20%;
    font-size: 15px;
    font-weight: 800;
`;

const Text = styled.div`
    width: 100%;
    text-align: right;
    cursor: pointer;
    position: relative;

    .copy-icon {
        font-size: 18px;
    }
`;

const UserAddress = styled.span`
    font-size: 22px;
    font-weight: 700;
    /* margin-right: 6px; */

    &::after {
        content: "주소 복사하기";
        position: absolute;
        top: 40px;
        right: 0px;
        background-color: #e9e9e9;
        border-radius: 8px;
        border: 1px solid #432c20;
        font-size: 12px;
        line-height: 12px;
        padding: 8px;
        opacity: 0;
        transition: 0.3s ease;
    }

    &:hover::after {
        opacity: 1;
    }
`;

const UserBalance = styled(UserAddress)`
    width: 80%;
    text-align: right;
`;

const TransferArea = styled.div`
    padding: 20px;
    margin-top: 26px;
`;

const TitleDiv = styled.div`
    border-bottom: 2px solid #432c20;
    font-size: 18px;
    font-weight: 800;
    height: 40px;
    line-height: 40px;
    padding-left: 5px;
    color: #432c20;
`;

const TransferArticle = styled.div`
    width: 100%;
    height: 88px;
    padding: 10px 5px 0 5px;
    border-bottom: 1px solid #432c20;
`;
const DateAndTimeDiv = styled.div`
    height: 50%;
    position: relative;
`;

const TransferDate = styled.span`
    font-size: 14px;
    color: #432c20;
    padding-right: 5px;
`;
const AddressAndAmountDiv = styled.div`
    line-height: 32px;
    height: 50%;
    display: flex;
    justify-content: space-between;
`;

const TransferAddress = styled.div`
    /* width: 80%; */
    font-size: 14;
`;
const SignAndAmountDiv = styled.div`
    /* width: 80%; */
    text-align: right;
`;

const TransferAmount = styled(TransferAddress)`
    /* width: 20%; */
    font-weight: 800;
    font-size: 21px;
    text-align: right;
    color: ${(props) => props.color || "#432C20"};
`;

const NoData = styled.div`
    text-align: center;
    height: 360px;
    line-height: 360px;
`