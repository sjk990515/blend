import React from "react";

import styled from "styled-components";
import loading from "../../image/loading.png";
import bean1 from "../../image/bean1.png";
import bean2 from "../../image/bean2.png";
import bean3 from "../../image/bean3.png";
import bean4 from "../../image/bean4.png";
import { useNavigate } from "react-router-dom";

function Loading() {
    const navigate = useNavigate();

    const Main = () => {
        navigate("/loading");
    };
    return (
        <Body>
            <Load src={loading}></Load>
            <Wrapper>
                <Beans className="bean1" src={bean1} alt="bean1" />
                <Beans className="bean2" src={bean2} alt="bean2" />
                <Beans className="bean3" src={bean3} alt="bean3" />
                <Beans className="bean4" src={bean4} alt="bean4" />
            </Wrapper>
        </Body>
    );
}

export default Loading;

const Body = styled.div`
    background-color: #432c20;
    max-width: 430px;
    text-align: center;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -70px;
    z-index: 9999999999999;
    position: fixed;
`;

const Load = styled.img`
    margin-top: 25px;
    margin-left: 30px;
    width: 60%;
    height: 60%;
`;

const Wrapper = styled.div`
    position: absolute;

    top: 35%;
    .bean2 {
        animation-delay: 0.25s;
    }
    .bean3 {
        animation-delay: 0.5s;
    }
    .bean4 {
        animation-delay: 0.75s;
    }
`;

const Beans = styled.img`
    width: 22px;
    height: 22px;
    animation: 2s bounce ease infinite;

    @keyframes bounce {
        50% {
            transform: translateY(25px);
        }
    }
`;
