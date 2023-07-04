import React from "react";
import { styled } from "styled-components";

function Customer() {
    return (
        <>
            <LoginTextH2>로그인 하세요</LoginTextH2>
        </>
    );
}

export default Customer;
const LoginTextH2 = styled.h2`
    width: 100%;
    font-size: 18px;
    font-weight: 900;
    margin-top: 40px;
`;
