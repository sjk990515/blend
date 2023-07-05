import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menulayout from "../layout/Menulayout";
import MainPage from "../pages/mainPage/MainPage";
import MyPage from "../pages/myPage/MyPage";
import GlobalStyles from "../GlobalStyles";

import Send from "../pages/send/Send";
import Scan from "../pages/send/Scan";
import SendCheck from "../pages/send/SendCheck";
import SendDone from "../pages/send/SendDone";
import Receive from "../pages/receive/Receive";
import ReceiveDone from "../pages/receive/ReceiveDone";

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
                <Route path="/send" element={<Send />} />
                <Route path="/scan" element={<Scan />} />
                <Route path="/sendcheck" element={<SendCheck />} />
                <Route path="/senddone" element={<SendDone />} />
                <Route path="/receive" element={<Receive />} />
                <Route path="/receivedone" element={<ReceiveDone />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
