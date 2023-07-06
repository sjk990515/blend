import React from "react";
import styled from "styled-components";
import blend from "../../image/blendlogo_for_beansdetail.png";

function BeansDetail() {
    return (
        <Body>
            <Wrapper>
                {/* 유저 지갑 정보 */}
                <BlendDiv>
                    <BlenImgArea>
                        <BlenImg src={blend}></BlenImg>
                    </BlenImgArea>
                    <UserInfoArea>
                        <AddressArea>
                            <Label>주소</Label>
                            {/* 데이터 받아서 넣기 */}
                            <UserAddress>0x00000000</UserAddress>
                        </AddressArea>
                        <BalanceArea>
                            <Label>보유량</Label>
                            {/* 데이터 받아서 넣기 */}
                            <UserBalance>3458935093</UserBalance>
                        </BalanceArea>
                    </UserInfoArea>
                </BlendDiv>

                {/* 거래내역 */}
                <TransferArea>
                    <TitleDiv>

                    </TitleDiv>
                </TransferArea>
            </Wrapper>
        </Body>
    );
}

export default BeansDetail;

const Body = styled.div`
    max-width: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height:100vh;
    margin-top:-70px;
    position: relative;

`
const Wrapper = styled.div`
    width: 100%;
    margin-top: 110px;
`

const BlendDiv = styled.div`
    z-index: 1;
    margin: 0 auto;
    position: relative;
    width: 90%;
    height: 212px;
    border-radius: 10px;
    border: 2px solid #432C20;
    backdrop-filter: blur(6px);
    background: rgb(246,242,144);
    background: linear-gradient(143deg, rgba(246,242,144,0.6) 0%, rgba(231,229,183,0.2259497549019608) 51%, rgba(217,217,217,0) 100%);
    padding: 1.56em;
`

const BlenImgArea = styled.div`
    position: relative;
    width: 100%;
    margin-top: 8px;
`

const BlenImg = styled.img`
    width: 120px;
`

const UserInfoArea = styled.div`
    position: relative;
    width: 100%;
    height: 80px;
    color: #432C20;
    top: 20%;
`

const AddressArea = styled.div`
    display: flex;
    height: 40px;
    line-height: 40px;
`

const BalanceArea = styled.div`
    display: flex;
    height: 40px;
    line-height: 40px;
`

const Label = styled.span`
    width: 20%;
    font-size: 15px;
    font-weight: 800;
`

const UserAddress = styled.span`
    width: 80%;
    text-align: right;
    font-size: 25px;
    font-weight: 700;
`

const UserBalance = styled.span`
    width: 80%;
    text-align: right;
    font-size: 25px;
    font-weight: 700;
`

const TransferArea = styled.div`
    
    height: 40px;
    border-bottom: 1px solid #432C20;
`

const TitleDiv = styled.div`
    font-size: 16px;
    font-weight: 800;
`