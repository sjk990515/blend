import React, { useState } from "react";
import { styled } from "styled-components";
import smallBeans from "../../image/smallBeans.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bestImg1 from "../../image/bestImg1.png";
import bestImg2 from "../../image/bestImg2.png";
import bestImg3 from "../../image/bestImg3.png";
import bestImg4 from "../../image/bestImg4.png";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from "react-query";
import axios from "axios";

function MainPage() {
    const navigate = useNavigate();
    // slide 세팅
    const [noticeSlide, setNoticeSlide] = useState(0);
    //임시 로그인

    const loginTrue = sessionStorage.getItem("login");
    // const loginTrue = true;

    const beansSettings = {
        autoplay: true,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleSlideChange = (slideIndex) => {
        setNoticeSlide(slideIndex);
    };

    // best beans setting
    const bestSettings = {
        variableWidth: true,
        autoplay: true,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const loginOnClick = () => {
        navigate("/login");
    };
    // 유저
    const beansCountOnClick = () => {
        navigate("/mybeans");
    };

    // 유저 로그인 정보 불러오기
    const getUserData = async () => {
        const response = await axios.get(
            "http://localhost:4000/member/session"
        );
        // setFriendAllRecoil(response?.data);
        return response;
    };
    const { isLoading, isError, data, error } = useQuery(
        "userData",
        getUserData
    );

    console.log(data);

    return (
        <MainWrapDiv>
            {/* Bean박스 */}
            <BeanBox>
                <BeanTitle>
                    {loginTrue ? "안녕하세요!" : "로그인 해주세요"}
                </BeanTitle>
                {loginTrue ? (
                    <BeanSubTitle>김김김님</BeanSubTitle>
                ) : (
                    <BeanSubTitle onClick={loginOnClick}>
                        로그인 하러 가기 &gt;
                    </BeanSubTitle>
                )}

                <BeansImg src={smallBeans}></BeansImg>
                <BeansSmallImg src={smallBeans}></BeansSmallImg>

                {loginTrue ? (
                    <BeansCount onClick={beansCountOnClick}>
                        3100 <BeansCountSpan>&nbsp; BEANS</BeansCountSpan>
                        <IoIosArrowForward />
                    </BeansCount>
                ) : (
                    <></>
                )}
            </BeanBox>

            {/* 공지 */}
            <NoticeTitleDiv>
                <NoticeTitleH2>Notice</NoticeTitleH2>

                <NoticeCount>{noticeSlide + 1}/3</NoticeCount>
            </NoticeTitleDiv>
            <NoticeSlide>
                <Slider {...beansSettings} afterChange={handleSlideChange}>
                    <SliderText>안녕안녕안녕안녕11</SliderText>
                    <SliderText>안녕안녕안녕안녕22</SliderText>
                    <SliderText>안녕안녕안녕안녕33</SliderText>
                </Slider>
            </NoticeSlide>

            {/* best  제품 */}
            <BestBeansTitle> 요즘 뜨고 있는 Best beans ! </BestBeansTitle>
            <BestBeans>
                <Slider {...bestSettings}>
                    <BestImg src={bestImg1} />
                    <BestImg src={bestImg2} />
                    <BestImg src={bestImg3} />
                    <BestImg src={bestImg4} />
                </Slider>
            </BestBeans>

            {/* 추천 원두 */}
            <RecommendDiv>
                <RecommendH2>
                    좋아할 만한 맞춤 원두 <br /> 추천 해드릴까요?
                </RecommendH2>
                <RecommendTextP>어떤 원두가 나한테 맞을까?</RecommendTextP>

                <RecommendButton>좋아요!</RecommendButton>
            </RecommendDiv>
        </MainWrapDiv>
    );
}

export default MainPage;
const MainWrapDiv = styled.div`
    width: 100%;
    min-height: 100vh;
    margin-top: -70px;
    padding-top: 110px;
`;
const BeanBox = styled.div`
    position: relative;
    margin: 0 20px;
    padding: 20px;
    height: 170px;
    background: #e8e48f;
    border-radius: 10px;
    border: 2px solid #000;
    box-shadow: 2px 2px 5px 0 #727272;
`;
const BeanTitle = styled.h2`
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 15px;
`;
const BeanSubTitle = styled.p`
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
`;
const BeansImg = styled.img`
    position: absolute;
    width: 50px;
    top: 0;
    right: 10px;
`;
const BeansSmallImg = styled.img`
    position: absolute;
    width: 90px;
    top: 10px;
    right: 30px;
`;

const BeansCount = styled.p`
    position: absolute;
    display: flex;
    align-items: end;
    bottom: 20px;
    right: 20px;
    font-size: 22px;
    font-weight: 500;
    cursor: pointer;
`;
const BeansCountSpan = styled.span`
    font-size: 14px;
    font-weight: 700;
`;
const NoticeTitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 20px 15px;
`;
const NoticeTitleH2 = styled.h2`
    font-size: 16px;
    font-weight: 900;
`;
const NoticeCount = styled.p`
    font-size: 14px;
    font-weight: 500;
`;
const NoticeSlide = styled.div`
    height: 45px;
    margin: 0 20px;
    background-color: #fff;
    border-radius: 10px;
    border: 2px solid #000;
    box-shadow: 2px 2px 5px 0 #727272;
`;
const SliderText = styled.p`
    line-height: 40px;
    padding-left: 10px;
    font-size: 14px;
    font-weight: 500;
`;
const BestBeansTitle = styled.div`
    font-size: 16px;
    font-weight: 900;
    margin: 40px 20px 15px;
`;
const BestBeans = styled.div`
    height: 160px;

    .slick-slide {
        width: 140px;
        margin: 0 auto;
        padding-left: 20px;
        margin-right: 15px;
        padding-bottom: 10px;
    }
`;
const BestImg = styled.img`
    width: 120px;
    height: 160px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    object-fit: cover;
    box-shadow: 2px 2px 5px 0 #727272;
`;
const RecommendDiv = styled.div`
    position: relative;
    height: 160px;
    margin: 40px 20px;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #432c20;
    background: rgba(109, 190, 117, 0.2);
    box-shadow: 2px 2px 5px 0 #727272;
`;
const RecommendH2 = styled.h2`
    font-size: 16px;
    font-weight: 900;
    line-height: 1.3;
`;
const RecommendTextP = styled.p`
    font-size: 12px;
    font-weight: 300;
    margin-top: 10px;
`;
const RecommendButton = styled.button`
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 140px;
    height: 35px;
    background: #432c20;
    border: 0;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    color: #e8e48f;
    cursor: pointer;
`;
