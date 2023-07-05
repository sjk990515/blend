import React from "react";
import styled from "styled-components";

function Menulayout() {
    return (
        <Body>
            <LogoArea>
                <img src="img/logo-small.png"></img>
                <div>X</div>
            </LogoArea>
        </Body>
    )
    ;
}

export default Menulayout;

const Body = styled.div`
    padding-top: 20px;
    background-color: #E4E1E0;
`;

const LogoArea = styled.div`
    padding-left: 20px;
    height: 57px;
    border-bottom: 1px solid #432C20;
`;