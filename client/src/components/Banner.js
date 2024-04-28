import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "../elements";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";


import banner_1 from "../image/banner_1.jpeg";
import banner_2 from "../image/banner_2.jpeg";
import banner_3 from "../image/banner_3.jpeg";
import banner_4 from "../image/banner_4.jpeg";



const Banner = () => {
  const navigate = useNavigate();
    const settings = {
      dots: true,
      arrows: true,
      fade: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 200,
      pauseOnHover: true,
      nextArrow: <RightArrow/> ,
		  prevArrow: <LeftArrow/>,
    };
  
    return (
    <Wrapper>
        <StyledSlider {...settings}> 
            <Image $height="940px" $src={banner_1}/>
            <Image $height="940px" $src={banner_2}/>
            <Image $height="940px" $src={banner_3}/>
            <Image $height="940px" $src={banner_4}/>
        </StyledSlider>        
    </Wrapper>  
    
    );
};

const Wrapper = styled.div`
    height:945px;
    background-color: #f7f7f7;
`;

const StyledSlider = styled(Slider)`
  position: relative;

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  };
  .slick-slide div {
    //슬라이더  컨텐츠
    cursor: pointer;
  };
`;

const CustomArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  color: #8f8f8f;
  cursor: pointer;
  font-size: 30px;
  
`;

const LeftArrow = (props) => {
  return (
    <PrevArrow className="slick-arrow slick-prev"
    onClick={props.onClick}> 
      <IoIosArrowBack/> 
    </PrevArrow> 
  )
}
const RightArrow = (props) => {
  return (
    <NextArrow className="slick-arrow slick-next"
    onClick={props.onClick} >
      <IoIosArrowForward/> 
    </NextArrow>
  )
}



// 왼쪽 화살표 스타일드 컴포넌트
const PrevArrow = styled(CustomArrow)`
  left: 100px;
`;

// 오른쪽 화살표 스타일드 컴포넌트
const NextArrow = styled(CustomArrow)`
  right: 100px;
`;
  
export default Banner;
  

