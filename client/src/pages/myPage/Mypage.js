import styled from "styled-components";

export const Body = styled.div` 
    max-width: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height:100vh;
    margin-top:-70px;
`;

export const Wrapper = styled.div`
    width: 100%;
    padding-top: 70px;
`

// 프사 영역
 // 겉 테두리
 export const ImgBorder = styled.div`
 width: 140px;
 height: 140px;
 border-radius: 100%;
 border: 2px solid #432C20;
 position: relative;
 margin: 0 auto;
 `
// 프사
export const ProfileImg = styled.img`
 position: absolute;
 width: 100px;
 height: 100px;
 top:17px;
 left: 18px;
`;

export const BtnArea = styled.div`
 text-align: center;
`

export const GotoUpdateFormBtn = styled.button`
 margin-top: 55px;
 border: none;
 width: 60%;
 padding: 16px 0 16px 0;
 background-color: #432C20;
 color: #F6F290;
 font-size: 16px;
 border-radius: 30px;
 cursor: pointer;
`
export const UserArea = styled.div`
    padding-top: 30px;
    text-align: center;
    font-size: 20px;
    width: 100%;
`