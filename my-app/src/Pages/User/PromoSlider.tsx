import React from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostItem from "../Platform/PostItem";
import SocialPlatform from "../Platform/SocialPlatform";

export default function SimpleSlider() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
    {[1, 2, 3, 4].map((item, index) => {
      return (
        <div key={index}>
          {item}
        </div>
      )
    })}
      </Slider>
    );
  }
