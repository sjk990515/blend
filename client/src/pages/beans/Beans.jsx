import React from "react";
import styled from "styled-components";
import beans from "../../image/beans_for_beansboard.png";
import beansDashboard from "../../image/beansDashboard.png";
import ranking from "../../image/ranking.png";
import { useNavigate } from "react-router-dom";
import Background from "../../layout/Background";

function Beans() {
    return (
        <Body>
            <Wrapper>
                <BeansBoardDiv>
                    <TitleArea>
                        <BeansDashBoardTitle src={beansDashboard}></BeansDashBoardTitle>
                    </TitleArea>
                    <TokenArea>
                        <TokenInfoArticle>
                            <span className="lable">유통량</span>
                            {/* 데이터 받아서 넣기? */}
                            <span className="token-balance">12,345,000</span>
                        </TokenInfoArticle>
                        <TokenInfoArticle>
                            <span className="lable">소각량</span>
                            {/* 데이터 받아서 넣기? */}
                            <span className="token-balance">45,000</span>
                        </TokenInfoArticle>
                        <TokenInfoArticle>
                            <span className="lable">보유량</span>
                            {/* 데이터 받아서 넣기? */}
                            <span className="token-balance">1,234,500</span>
                        </TokenInfoArticle>
                    </TokenArea>
                </BeansBoardDiv>
                <BackgroundArea>
                    <BackgroundBeansImg src={beans}></BackgroundBeansImg>
                </BackgroundArea>
                <RankingArea>
                    <div className="logo-area">
                        <RankingLogoImg src={ranking}></RankingLogoImg>
                    </div>
                    <div className="ranking-article-area">
                        <RankingArticle>
                            <RankTxt>1.</RankTxt>
                            <TokenBalanceTxt>34,203,594</TokenBalanceTxt>
                        </RankingArticle>
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
    margin-top: 65px;
`

const RankingLogoImg = styled.img`
    width: 30%;
    margin-bottom: 15px;
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
    font-size: 30px;
` 

const TokenBalanceTxt = styled.span`
    width: 50%;
    font-size: 14px;
    font-weight: 800;
    color: #F6F290;
    text-align: right;
`