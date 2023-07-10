import React from "react";
import styled from "styled-components";
import blend from "../../image/blendlogo_for_beansdetail.png";
/*
    useParam 사용??
*/

function BeansDetail(props) {
    // 상단 네모에 보이는 주소 (더미 data)
    let userAddress = '0x8798dfbbD786B81486eD8762b25Af961011Db528';
    // 상단 네모에 보이는 토큰 보유량 (더미 data)
    let userBalance = 3458935093;

    /* 해당 유저의 거래 정보 불러오기
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

    /* 거래 내역에 보이는 주소 (더미 data)
       추후 order by 생각하기? */
    const transferData = [
        {
            id: 1,
            address: '0x8798dfbbD786B81486eD8762b25Af961011Db5281Db528',
            date: '2022-07-07',
            time: '22:30:32',
            kind: 'plus',
            amount: 800
        },
        {
            id: 2,
            address: '0x8798dfbbD786B81486eD8762b25Af961011Db528',
            date: '2022-07-07',
            time: '20:30:48',
            kind: 'minus',
            amount: 1200
        },
        {
            id: 3,
            address: '0x8798dfbbD786B81486eD8762b25Af961011Db528',
            date: '2022-07-06',
            time: '12:30:45',
            kind: 'minus',
            amount: 1000
        },
        {
            id: 4,
            address: '0x8798dfbbD786B81486eD8762b25Af961011Db528',
            date: '2022-07-05',
            time: '15:30:48',
            kind: 'plus',
            amount: 700
        },
        {
            id: 5,
            address: '0x8798dfbbD786B81486eD8762b25Af961011Db528',
            date: '2022-07-05',
            time: '11:30:48',
            kind: 'plus',
            amount: 300
        }
    ]

    return (
        <Body>
            <Wrapper>
                {/* 유저 지갑 정보 */}
                <SquareDiv>
                    <BlenImgArea>
                        <BlenImg src={blend}></BlenImg>
                    </BlenImgArea>
                    <UserInfoArea>
                        <AddressArea>
                            <Label>주소</Label>
                            {/* 데이터 받아서 넣기 */}
                            <UserAddress>{userAddress.substring(0,6)}...{userAddress.slice(-6)}</UserAddress>
                        </AddressArea>
                        <BalanceArea>
                            <Label>보유량</Label>
                            {/* 데이터 받아서 넣기 */}
                            <UserBalance>{userBalance.toLocaleString()}</UserBalance>
                        </BalanceArea>
                    </UserInfoArea>
                </SquareDiv>

                {/* 거래내역 */}
                <TransferArea>
                    <TitleDiv>거래내역</TitleDiv>

                    {/* 개별 거래내역 - 반복문을 통해 출력*/}
                    { transferData.map((i)=>{
                        return(
                            <TransferArticle>
                                <DateAndTimeDiv>
                                    {/* 거래 날짜 */}
                                    <TransferDate>{i.date}</TransferDate>
                                    {/* 거래 시간 */}
                                    <TransferTime>{i.time}</TransferTime>
                                </DateAndTimeDiv>

                                <AddressAndAmountDiv>
                                    {/* 거래된 주소 */}
                                    <TransferAddress>{i.address.substring(0,6)}...{i.address.slice(-6)}</TransferAddress>

                                    {/* 토큰거래양 앞의 +, - 기호 */}
                                    <SignAndAmountDiv>
                                        {/* 받은 토큰이라면 빨간색, 보낸 토큰이라면 파란색 */}
                                        {i.kind == 'plus'? 
                                            <AmountSign color={'#F06A24'}>+</AmountSign> 
                                                :
                                            <AmountSign color={'#0C77F8'}>-</AmountSign>
                                        }

                                        {/* 토큰 거래양 */}
                                        <TransferAmount as="span" color={ i.kind == 'plus'? '#F06A24' : '#0C77F8' }>
                                            {i.amount}
                                        </TransferAmount>
                                    </SignAndAmountDiv>
                                </AddressAndAmountDiv>
                            </TransferArticle>
                        );
                    })}
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
    min-height:100vh;
    margin-top:-70px;
`
const Wrapper = styled.div`
    width: 100%;
    padding-top: 110px;
`

const SquareDiv = styled.div`
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
    box-shadow: 0px 4px 7px 0 #797979;
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
const BalanceArea = styled(AddressArea)`
`

const Label = styled.span`
    width: 20%;
    font-size: 15px;
    font-weight: 800;
`

const UserAddress = styled.div`
    width: 80%;
    text-align: right;
    font-size: 22px;
    font-weight: 700;
`
const UserBalance = styled(UserAddress)``

const TransferArea = styled.div`
    padding: 20px;
    margin-top: 26px;
`

const TitleDiv = styled.div`
    border-bottom: 2px solid #432C20;
    font-size: 18px;
    font-weight: 800;
    height: 40px;
    line-height: 40px;
    padding-left: 5px;
    color: #432C20;
`

const TransferArticle = styled.div`
    width: 100%;
    height: 88px;
    padding: 10px 5px 0 5px;
    border-bottom: 1px solid #432C20;
`
const DateAndTimeDiv = styled.div`
    height: 50%;
    position: relative;
`

const TransferDate = styled.span`
    font-size: 14px;
    color: #432C20;
    padding-right: 5px;
`
const TransferTime = styled(TransferDate)``

const AddressAndAmountDiv= styled.div`
    line-height: 32px;
    height: 50%;
    display: flex;
`

const TransferAddress=styled.div`
    font-size: 14;
`
const SignAndAmountDiv = styled.div`
    width: 80%;
    text-align: right;
`

const TransferAmount = styled(TransferAddress)`
    font-weight: 800;
    font-size: 21px;
    text-align: right;
    color: ${(props) => props.color || "#432C20" };
    `

const AmountSign = styled.span`
    font-weight: 800;
    font-size: 20px;
    margin-right: 2px;
    color: ${(props) => props.color || "#432C20"};
`