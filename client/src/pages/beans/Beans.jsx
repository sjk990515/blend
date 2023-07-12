import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import beans from "../../image/beans_for_beansboard.png";
import beansDashboard from "../../image/beansDashboard.png";
import rankingLogo from "../../image/ranking.png";
import { useNavigate } from "react-router-dom";
import Background from "../../layout/Background";

function Beans() {
    // 네비게이트
    const navigate = useNavigate();

    // 해당 지갑의 거래 내역으로 이동
    const DetailOnclick = (props) => {
        navigate("/beans/detail/"+props);
    };

    const [amount, setAmount] = useState(["43,928,748", "3,729,203", "0"])

    /* 랭크된 유저 정보 불러오기
    const getUserData = async () => {
        const response = await axios.get(
           // "__주소__"
        );
        // setFriendAllRecoil(response?.data);
        return response;
    };
    const { isLoading, isError, data, error } = useQuery(
        // "userData",  사용할 key
        // getUserData  위의 함수를 사용하겠단 말
    );

    // console.log(data) 데이터는 data에 담김
    */

    // 더미 데이터
    const ranks = [
        {
            rank:1,
            balance: 358332906
        },
        {
            rank:2,
            balance: 25833290
        },
        {
            rank:3,
            balance: 11583329
        },
        {
            rank:4,
            balance: 1583329
        },
        {
            rank:5,
            balance: 1083335
        }
    ];

    return (
        <Body>
            <Wrapper>
                <BeansBoardDiv>
                    <TitleArea>
                        <BeansDashBoardTitle src={beansDashboard}></BeansDashBoardTitle>
                    </TitleArea>
                    <TokenArea>
                        <TokenInfoArticle>
                            <span className="lable">발행량</span>
                            {/* 데이터 받아서 넣기? */}
                            <span className="token-balance">{amount[0]}</span>
                        </TokenInfoArticle>
                        <TokenInfoArticle>
                            <span className="lable">보유량</span>
                            {/* 데이터 받아서 넣기? */}
                            <span className="token-balance">{amount[1]}</span>
                        </TokenInfoArticle>
                        <TokenInfoArticle>
                            <span className="lable">온체인량</span>
                            {/* 데이터 받아서 넣기? */}
                            <span className="token-balance">{amount[2]}</span>
                        </TokenInfoArticle>
                    </TokenArea>
                </BeansBoardDiv>
                <BackgroundArea>
                    <BackgroundBeansImg src={beans}></BackgroundBeansImg>
                </BackgroundArea>
                <RankingArea>
                    <div className="logo-area">
                        <RankingLogoImg src={rankingLogo}></RankingLogoImg>
                    </div>
                    <div className="ranking-article-area">
                        { ranks.map((i)=>{
                            return(
                                // 해당 순위 article 클릭 시 해당 지갑 주소로 이동
                                <RankingArticle onClick={() => DetailOnclick(i.rank)}>
                                    {/* 순위 1. 2. <- 이런 텍스트만 */}
                                    <RankTxt color={i.rank}>{i.rank}.</RankTxt>
                                    
                                    {/* 토큰 양 */}
                                    <TokenBalanceTxt>{i.balance.toLocaleString()}</TokenBalanceTxt>
                                </RankingArticle>
                            );
                        })}
                    </div>
                </RankingArea>
            </Wrapper>
        </Body>
    );
}

export default Beans;

const Body = styled.div`
    max-width: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height:100vh;
    margin-top:-70px;
    background: rgb(67,44,32);
    background: linear-gradient(344deg, rgba(67,44,32,1) 0%, rgba(94,75,65,1) 4%, rgba(152,141,136,1) 25%, rgba(171,163,160,1) 38%, rgba(217,217,217,1) 100%);
    position: relative;

`
const Wrapper = styled.div`
    width: 100%;
    margin-top: 110px;
`

const BeansBoardDiv = styled.div`
    z-index: 1;
    margin: 0 auto;
    position: relative;
    width: 90%;
    height: 232px;
    border-radius: 10px;
    border: 2px solid #432C20;
    backdrop-filter: blur(6px);
    background: rgb(246,242,144);
    background: linear-gradient(143deg, rgba(246,242,144,0.6) 0%, rgba(231,229,183,0.2259497549019608) 51%, rgba(217,217,217,0) 100%);
    box-shadow: 0px 4px 7px 0 #797979;
`

const TitleArea = styled.div`
    position: absolute;
    width: 100%;
    text-align: center;
    margin-top: 34px;
`

const BeansDashBoardTitle = styled.img`
    width: 70%;
`

const TokenArea = styled.div`
    position: absolute;
    width: 100%;
    top: 90px;
    padding: 0 25px 0 25px;
    `

const TokenInfoArticle = styled.div`
    height: 22px;
    width: 100%;
    display: flex;
    font-size: 15px;
    border-bottom: 1px solid #432C20;
    line-height: 22px;
    margin-bottom: 17px;
    
    .lable {
        color: #432C20;
        width: 50%;
        font-weight: 800;
    }
    
    .token-balance {
        color: #000;
        text-align: right;
        width: 50%;
        font-size: 20px;
    }
`

const BackgroundArea = styled.div`
    text-align: right;
`

const BackgroundBeansImg = styled.img`
    position: absolute;
    top: 20%;
    right: 0;
`

const RankingArea = styled.div`
    padding: 25px;
    margin-top: 50px;
`

const RankingLogoImg = styled.img`
    width: 30%;
    margin-left: 3px;
    margin-bottom: 10px;
`

const RankingArticle = styled.div`
    width: 100%;
    display: flex;
    background-color: #432C20;
    height: 58px;
    line-height: 58px;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 0 30px 0 30px;
`

const RankTxt = styled.span`
    width: 50%;
    font-weight: 100;
    font-size: 30px;
    color: ${(props) =>
        props.color == "1"
            ? "#F06A24"
            :(props.color == "2" 
                ? "#6DBE75"
              :( 
                  props.color == "3" 
                  ? "#F6F290"
                  : "#ffffff"
                )
             )
            };
` 

const TokenBalanceTxt = styled.span`
    width: 50%;
    font-size: 17px;
    font-weight: 800;
    color: #F6F290;
    text-align: right;
`

