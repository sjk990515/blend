import styled from "styled-components";

export const Body = styled.div` 
    height:100vh;
    max-width: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height:100vh;
    margin-top:-70px;

    .wrapper {
        position: absolute;
        width: 100%;
    }
`;

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

export const UserArea = styled.div`
 padding-top: 30px;
 text-align: center;
 font-size: 20px;
`

export const UserInfoArea = styled.div`
 padding-top: 70px;
 padding-left: 20px;
 
 .user-info-txt {
     font-weight: 700;
     font-size: 16px;
     padding-left: 2px;
 }
`

export const UserInfoArticle = styled.div`
 font-size: 14px;
 font-weight: 700;
 margin-top: 14px;
 padding-left: 10px;
 width: 95%;
 height: 55px;
 line-height: 55px;
 border: 1px solid #432C20;
 border-radius: 5px;

 .input {
     padding-left: 80px;
     font-weight: 700;
 }

 .user-email {
     padding-left: 67px;
 }
`

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
