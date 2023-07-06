import React from "react";
import styled from "styled-components";
import beans from "../../image/beans_for_beansboard.png";
import beansDashboard from "../../image/beansDashboard.png";
import blend from "../../image/blendlogo_for_beansdetail.png";
import { useNavigate } from "react-router-dom";
import Background from "../../layout/Background";

function Beans() {
    return (
        <Body>
            <Wrapper>
                <BeansDashboardArea>
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
                </BeansDashboardArea>
                <BackgroundArea>
                    <BackgroundBeansImg src={beans}></BackgroundBeansImg>
                </BackgroundArea>
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
`
const Wrapper = styled.div`
    width: 100%;
    /* padding-top: 70px; */
    `

const BeansDashboardArea = styled.div`
    padding: 25px;
`

const BeansBoardDiv = styled.div`
    position: relative;
    width: 100%;
    height: 232px;
    border-radius: 10px;
    border: 2px solid #432C20;
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
    color: #432C20;
    border-bottom: 1px solid #432C20;
    line-height: 22px;
    margin-bottom: 17px;
    
    .lable {
        width: 50%;
        font-weight: 800;
    }
    
    .token-balance {
        text-align: right;
        width: 50%;
        font-size: 20px;
    }
`

const BackgroundArea = styled.div`
    height: 232px;
    text-align: right;
`

const BackgroundBeansImg = styled.img`
    
`