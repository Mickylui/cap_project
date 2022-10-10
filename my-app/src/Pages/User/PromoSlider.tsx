import React from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostItem from "../Platform/PostItem";
import SocialPlatform from "../Platform/SocialPlatform";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { post } from "fetch-mock";
import { Box } from "@chakra-ui/react";
import {Link as RouteLink} from "react-router-dom";

export default function SimpleSlider() {
  const dispatch: AppDispatch = useDispatch();

  const postList = useSelector((state: RootState) => state.platform.list);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
    {/* {[1, 2, 3, 4].map((item, index) => {
      return (
        <div key={index}>
          {item}
        </div>
      )
    })} */}
    

      </Slider>
    );
  }
