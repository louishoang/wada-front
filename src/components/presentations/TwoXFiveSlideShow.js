import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class TwoXFiveSlideShow extends Component{
  constructor(props){
    super(props)
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render(){
    const { list } = this.props
    const settings = {
      className: "center",
      centerMode: false,
      infinite: true,
      centerPadding: "68px",
      slidesToShow: 1,
      speed: 500,
      rows: 2,
      slidesPerRow: 5,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 1350,
          settings: {
            slidesPerRow: 4,
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesPerRow: 3,
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesPerRow: 2,
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesPerRow: 1,
            slidesToShow: 1,
          }
        }
      ]
    };

    return (
      <div className="two-x-five-slider">
        <div className="slider-nav">
          <button className="button-nav" onClick={this.previous}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <button className="button-nav" onClick={this.next}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <Slider ref={c => (this.slider = c)} {...settings}>
          {
            list.map(p => (
              <div className="single-product" key={p.name}>
                <div className="pro-img">
                  <Link to={`/products/${p.permalink}`}>
                    <img src={p.product_images.length > 0 ? p.product_images[0].url : require('../../assets/img/products/1.jpg')}
                      alt={p.name} />
                  </Link>
                </div>
                <div className="pro-content">
                  <div className="pro-info">
                    <h4><Link to={`/products/${p.permalink}`}>{p.name}</Link></h4>
                    <p><span className="price">$ {p.price}</span></p>
                  </div>
                  <div className="pro-actions">
                    <div className="actions-primary">
                      <Link to={`/products/${p.permalink}`}> View Item</Link>
                    </div>
                    <div className="actions-secondary">
                      <a href="wishlist.html" title="WishList">
                        <i className="far fa-heart"></i> <span>Add to WishList</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </Slider>
      </div>
    )
  }
}

TwoXFiveSlideShow.defaultProps = {
  list: []
}

TwoXFiveSlideShow.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TwoXFiveSlideShow