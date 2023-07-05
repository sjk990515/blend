import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



function Receive() {
    const navigate = useNavigate();


    const Main =()=>{
        navigate("/")
    }
    return (
        
        <Body>
            <Wrap>
            <div className="Title">
                <Phone>010-3302-1234</Phone>
                <Stitle> 나의 QR코드 </Stitle>
            </div>
                <Qrbx> 
                    {/* QR IMAGE */}
                </Qrbx>
                <Addr>0x00000000000</Addr>

            <Cbtn onClick={Main}>받기취소</Cbtn>
      
            </Wrap>
        </Body>
    );
}

export default Receive;



const Body = styled.div`
background-color:#432C20;
text-align:center;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
/* overflow-y :hidden; */

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
margin-bottom:42px;
`;


const Stitle = styled.div`
 padding:10px;
 color:#F6F290;
 font-weight:800px; 
 text-align:center;
 font-size:14px;
 margin-bottom:54px;

`;



const Qrbx =styled.div`
width:320px;
height:320px;
border:2px solid #F6F290;
margin:0 auto;
border-radius : 10px;
margin-bottom: 28px;
padding:32px;


`;



const Profile = styled.div`
width:140px;
height:140px;
border-radius:100%;
border:2px solid #F06A24; 
text-align:center;
margin:0 auto;
padding-top:32px;
padding-bottom:38px;
position:relative;

`;

const ProfileImg = styled.img`
width:100px;
height:100px;
line-height:100px;
position:absolute;
top:20px; left:20px;
`;


const Cbtn =styled.div`
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
cursor: pointer;
/* margin-bottom:154px; */


`;
