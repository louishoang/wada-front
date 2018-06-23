import React, { Component } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      pauseOnHover: true,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div id="main-slider">
        <Slider {...settings}>
          <div>
            <img src={require('../../assets/img/banner/main-photo1.png')} alt="slider1" />
          </div>
          <div>
            <img src={require('../../assets/img/banner/main-photo2.png')} alt="slider2" />
          </div>
          <div>
            <img src={require('../../assets/img/banner/main-photo3.png')} alt="slider3" />
          </div>
        </Slider>
      </div>
    );
  }
}