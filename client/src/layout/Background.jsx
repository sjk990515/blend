import React from "react";
import { styled } from "styled-components";
import bggreen from "../image/bggreen.png"
import bgred from "../image/bgred.png"
import bgskyblue from "../image/bgskyblue.png"
import bgpurple from "../image/bgpurple.png"
import btitle from "../image/btitle.png"
import bsub from "../image/bsub.png"


function Background() {
    return <Bg>
        <Wrap>
        <Bgbeans className="bggreen" src={bggreen} alt="bggreen" />
        <Bgbeans className="bgred" src={bgred} alt="bgred" />
        <Bgbeans className="bgskyblue" src={bgskyblue} alt="bgskyblue" />
        <Bgbeans className="bgpurple" src={bgpurple} alt="bgpurple" />
        <Btitle src={btitle} alt="btitle"/>
        <Bsub src={bsub} alt="bsub"/>
        </Wrap>
        </Bg>;
}

export default Background;
const Bg = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #432C20;
    background-size:cover;
    background-repeat:no-repeat;
    z-index: -1;
    overflow:hidden;
    position:fixed;
`;

const Wrap =styled.div`
position:relative;
width: 100%;
height: 100vh;
overflow:hidden;


.bggreen{
width:30%;
position:absolute;
top:15%;
left:-10%;
animation-name: floating;
animation-duration: 1.8s;
animation-iteration-count: infinite;
animation-timing-function: ease-in-out;

}


.bgred{
width:15%;
position:absolute;
top:5%;
left:35%;
animation-name: floating;
animation-duration: 3s;
animation-iteration-count: infinite;
animation-timing-function: ease-in-out;

}

.bgskyblue{
width:13%;
position:absolute;
top:75%;
left:20%;
animation-name: floating;
animation-duration: 3.5s;
animation-iteration-count: infinite;
animation-timing-function: ease-in-out;


}
.bgpurple{
width:15%;
position:absolute;
top:50%;
left:50%;
animation-name: floating;
animation-duration: 2.5s;
animation-iteration-count: infinite;
animation-timing-function: ease-in-out;

}


`;

const Bggreen = styled.img`
width:30%;
position:absolute;
top:30%;
left:-10%;

`;


const Bgbeans = styled.img`

@keyframes floating {
    from { transform: translate(0,  0px); }
    65%  { transform: translate(0, 15px); }
    to   { transform: translate(0, -0px); }    
}

`;



const Btitle = styled.img`
width:25%;
position:absolute;
top:40%;
left:20%;
`;

const Bsub = styled.img`
width:15%;
position:absolute;
top:55%;
left:20%;
`;