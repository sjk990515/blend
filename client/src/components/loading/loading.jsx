import React from 'react'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loadingimg from "../../image/loading.png";
import bean1 from "../../image/bean1.png";
import bean2 from "../../image/bean2.png";
import bean3 from "../../image/bean3.png";
import bean4 from "../../image/bean4.png";



function Loading() {
  return (
    <Body>
        <Wrapper>
            <Beans className='bean1' src={bean1} alt="bean1" />
            <Beans className='bean2' src={bean2} alt="bean2" />
            <Beans className='bean3' src={bean3} alt="bean3" />
            <Beans className='bean4' src={bean4} alt="bean4" />
        </Wrapper>
       <Load src={loadingimg}></Load>
    </Body>

    

  )
}



export default Loading



const Body = styled.div`
background-color:#432C20;
text-align:center;
min-height:100vh;
display:flex;
justify-content:center;
align-items:center;
margin-top:-70px;
z-index:9999999999999;
position:fixed;
top:100;

`;

const Load = styled.img`
margin-top:30px;
width:70%;
height:70%;
`;


const Wrapper = styled.div `
position:absolute;

top:35%;
  .bean2{
    animation-delay: .25s;
}
  .bean3{
    animation-delay: .50s;
}
  .bean4{
    animation-delay: .75s;
}
`;
  


const Beans =styled.img`
  width: 22px;
  height: 22px;
  animation: 2s bounce ease infinite;




  @keyframes bounce {  
    50% {
        transform: translateY(25px);
    }

}

`;





