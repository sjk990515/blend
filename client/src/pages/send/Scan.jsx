import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



function Scan() {
    const navigate = useNavigate();


    const Main =()=>{
        navigate("/")
    }
    
    return (
        
        <Body>
            <Wrap>
                <div className="Title">
                    <Phone>010-3302-1234</Phone>
                    <Bal> 나의 잔액은: 3,000 BEANS </Bal>
                </div>
                    <Alertbx>
                        <p class="qr">QR코드스캔</p>
                        <p class="al1">모바일환경에서</p> 
                        <p class="al1">가능합니다.</p>
                    </Alertbx>

                <Back onClick={Main}>뒤로가기</Back>
            </Wrap>
            
        </Body>
    );
}

export default Scan;

const Body = styled.div`
background-color:#432C20;
text-align:center;
min-height:100vh;
display:flex;
justify-content:center;
align-items:center;
margin-top:-70px;
padding-top:100px;

`;



const Wrap =styled.div`


`;


const Phone = styled.div`
font-size:26px;
color:#F6F290;
text-align:center;

`;

const Addr =  styled(Phone)`
font-size:14px;
padding-top:10px;
padding-bottom:102px;
`;


const Bal = styled.div`
 padding:10px;
 color:#F6F290;
 font-weight:800px; 
 text-align:center;
 font-size:14px;
 margin-bottom:54px;
`;


const Alertbx =styled.div`
width:320px;
height:320px;
background-color:#F6F290;
margin:0 auto;
border-radius : 10px;
margin-bottom:90px;

.qr{
    font-size:20px;
    font-weight:bold;
    padding-top:112px;
    margin-bottom:34px;
    
}

.al1{
  line-height:20px;
  color:#F06A24
}
`;


const Back =styled.div`
width:110px;
height:46px;
border-radius:30px;
background-color:#F6F290;
border:0;
text-align:center;
margin:0 auto;
line-height:46px;
margin-top:10px;
color:#432C20;
font-size:14px;
font-weight:800;
cursor:pointer;


`;