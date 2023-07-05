import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menulayout from "../layout/Menulayout";
import MainPage from "../pages/mainPage/MainPage";
import MyPage from "../pages/myPage/MyPage.jsx";
import GlobalStyles from "../GlobalStyles";
import { styled } from "styled-components";
import Header from "../layout/Header";
import MyPageUpdateForm from "../pages/myPage/MyPageUpdateForm";

function Router() {
    return (
        <BrowserRouter>
            <MobileWidthDiv>
                <GlobalStyles />
                <>
                    <Header />
                    {/* <Menulayout /> */}
                </>

                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/myPage" element={<MyPage />} />
                    <Route path="/myPage/update" element={<MyPageUpdateForm />} />
                </Routes>
            </MobileWidthDiv>
        </BrowserRouter>
    );
}

export default Router;
const MobileWidthDiv = styled.div`
    max-width: 430px;
    margin: 0 auto;
    background: #e4e1e0;
`;
