import React, { useState } from "react";
import { AiFillAmazonCircle } from "react-icons/ai";
import styled from "styled-components";

function Menulayout() {
    const [aaa, setaaa] = useState(true);
    return (
        <Wrap>
            <Body aaa={aaa}>
                <LogoArea>
                    <img src="img/logo-small.png"></img>
                    <div
                        onClick={() => {
                            setaaa(false);
                        }}
                    >
                        X
                    </div>
                </LogoArea>
            </Body>
        </Wrap>
    );
}

export default Menulayout;
const Wrap = styled.div`
    width: 430px;
    overflow: hidden;
`;

const Body = styled.div`
    position: fixed;
    width: 100vw;
    max-width: 430px;
    height: 100%;
    top: 0;
    right: ${(props) => (props.aaa ? "50%" : "0")};
    transform: translateX(50%);
    z-index: 9999999999;
    padding-top: 20px;
    background-color: #e4e1e0;
    transition: 0.5s ease;
`;

const LogoArea = styled.div`
    padding-left: 20px;
    height: 57px;
    border-bottom: 1px solid #432c20;
`;
