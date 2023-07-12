import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "react-query";
import axios from "axios";

function Send() {
    const navigate = useNavigate();
    const [AddrNumber,setAddrNumber] = useState("");
    const [SendAmount,setSendAmount] = useState(0);


    const SendCheck = async () => {

        // 서버에 보내는 것

        // const { data:_  } = await axios.post('', {
        //     address_or_number: AddrNumber,
        //     send_amount: SendAmount
        // });

        console.log(data)

        // 서버에서 전달받아야 하는 값
        const data = {
            is_validate: true, // 검증 여부 (1. 유저 잔고보다 요청한 금액이 많거나 2. 받는 사람의 정보가 조회되지 않았을 경우 false)
            to_user_name: '홍길동', // address_or_number의 유저 데이터의 이름
            amount: 1000, // send_amount
        };




        navigate("/sendcheck", {
            state : {
                user_name:data.to_user_name,
                amount: data.amount,
            }
        });

    };

    const Scan =()=>{
        navigate("/scan")
    }

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
                <Phone>010-3302-1234</Phone>
                {/* 주소 불러오기 */}
                <Addr>0x0000000000</Addr>
            </div>
            <InputBox >
                {/* 수량*/}
                <Ibox onChange={SendAmountOnchange} type="number" placeholder="금액"></Ibox>
                {/* 내 잔액 확인 */}
                <Bal> 나의 잔액은: {/* 백에서 가져온 잔액 */}</Bal>
            
                <Ibox onChange={AddrNumberOnChange} type="number" placeholder="주소 혹은 핸드폰 번호"></Ibox>
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
background-color:#432C20;
text-align:center;
min-height:100vh;
margin-top:-70px;
`;

const Phone = styled.div`
    font-size: 26px;
    color: #f6f290;
    padding-top: 114px;
    text-align: center;
`;

const Addr = styled(Phone)`
    margin:0 auto;
    width:50%;
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
   font-size:14px;
}
::-webkit-inner-spin-button{
  -webkit-appearance: none; 
  margin: 0; 
  }
  ::-webkit-outer-spin-button{
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
width:96px;
height:40px;
border-radius:30px;
background-color:#F6F290;
border:0;
text-align:center;
margin-top:10px;
color:#432C20;
font-size:14px;
font-weight:800;
margin-bottom:154px;
line-height:40px;
cursor:pointer;
`;

const Sendbtn = styled.div`
width:110px;
height:46px;
color:#432C20;
font-weight:800;
font-size:16px;
cursor: pointer;
background-color:#F6F290;
border-radius:30px;
text-align:center;
line-height:46px;
margin:0 auto;
margin-bottom:26px;
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
