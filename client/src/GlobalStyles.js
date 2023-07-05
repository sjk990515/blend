import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"; // style-reset 패키지
const GlobalStyles = createGlobalStyle` 
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body { 
        font-family:'NanumSquareNeo';
    }

    @font-face {
        font-family: 'NanumSquareNeo';
        font-weight: 300;
        font-style: normal;
        src: url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-aLt.eot');
        src: url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-aLt.eot?#iefix') format('embedded-opentype'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-aLt.woff2') format('woff2'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-aLt.woff') format('woff'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-aLt.ttf') format("truetype");
        font-display: swap;
    } 
    @font-face {
        font-family: 'NanumSquareNeo';
        font-weight: 400;
        font-style: normal;
        src: url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-bRg.eot');
        src: url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-bRg.eot?#iefix') format('embedded-opentype'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-bRg.woff2') format('woff2'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-bRg.woff') format('woff'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-bRg.ttf') format("truetype");
        font-display: swap;
    } 
    @font-face {
        font-family: 'NanumSquareNeo';
        font-weight: 700;
        font-style: normal;
        src: url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-cBd.eot');
        src: url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-cBd.eot?#iefix') format('embedded-opentype'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-cBd.woff2') format('woff2'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-cBd.woff') format('woff'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-cBd.ttf') format("truetype");
        font-display: swap;
    } 
    @font-face {
        font-family: 'NanumSquareNeo';
        font-weight: 800;
        font-style: normal;
        src: url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-dEb.eot');
        src: url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-dEb.eot?#iefix') format('embedded-opentype'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-dEb.woff2') format('woff2'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-dEb.woff') format('woff'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-dEb.ttf') format("truetype");
        font-display: swap;
    } 
    @font-face {
        font-family: 'NanumSquareNeo';
        font-weight: 900;
        font-style: normal;
        src: url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-eHv.eot');
        src: url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-eHv.eot?#iefix') format('embedded-opentype'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-eHv.woff2') format('woff2'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-eHv.woff') format('woff'),
             url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo-eHv.ttf') format("truetype");
        font-display: swap;
    } 
`;

export default GlobalStyles;


