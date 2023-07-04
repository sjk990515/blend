import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menulayout from "../layout/Menulayout";
import MainPage from "../pages/mainPage/MainPage";
import MyPage from "../pages/myPage/MyPage";
import GlobalStyles from "../GlobalStyles";

function Router() {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <>
                {/* <Header /> */}
                {/* <Menulayout /> */}
            </>

            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
