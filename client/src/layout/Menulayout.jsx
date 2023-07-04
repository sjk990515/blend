import React from "react";
import styled from "styled-components";
import logo from "../image/logo_for_menupage.png";

function Menulayout() {
    return (
        <Body>
            <LogoArea>
                <LogoImg src={logo}></LogoImg>
                <div className="go-back">X</div>
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
    display:flex;
    padding-left: 20px;
    height: 57px;
    border-bottom: 1px solid #432C20;
    width:100%;
    justify-content: space-between;

    .go-back{
        margin-right: 20px;
    }
`;

const LogoImg = styled.img`
    
`;