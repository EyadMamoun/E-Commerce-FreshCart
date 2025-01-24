import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import imageSlider1 from '../../images/Electronics.jpeg'
import imageSlider2 from '../../images/360_F_882532703_GauZMHOCoLQ6ynjAfYamVZpeUq8HO4Z9.jpg'

import HomeSliderCSS from './HomeSlider.module.css'

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  
  return (
    <Slider {...settings}>
      <div>
        <img className={"w-100 " + HomeSliderCSS.sliderHeight} src={imageSlider1} alt="" />
      </div>
      <div>
        <img className={"w-100 " + HomeSliderCSS.sliderHeight} src={imageSlider2} alt="" />
      </div>
      
    </Slider>
  );
}
