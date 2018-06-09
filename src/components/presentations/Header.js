import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="header-top-area rose-background">
      <div className="container-fluid">
        <div className="header-top">
          <ul>
            <li>Free Shipping on order over $35</li>
          </ul>
          <ul>
            <li className="header-li">
              <i className="fas fa-heart fa-heart-adjusted"></i>
              <Link to="/wishlist">Wish List</Link>
            </li>
            <li className="header-li">
              <i className="fas fa-percent fa-square-border"></i>
              <Link to="/deals">Deals</Link>
            </li>
            <li className="header-li">
              <Link to="#">My Account<i className="fa fa-angle-down"></i></Link>
              <ul className="ht-dropdown">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="header-middle ptb-15 red-background">
      <div className="container-fluid">
        <div className="row align-items-center no-gutters">
          <div className="col-lg-3 col-md-12">
            <div className="logo mb-all-30">
              <Link to="/">
                <img src="https://s3.amazonaws.com/s3origin.purch.com/s3_uploader-production/Store/19127/logo_image_url.png"
                  alt="logo-image"
                  id="main-logo" />
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-8 ml-auto mr-auto col-10">
            <div className="">
              <form action="#" id="main-search-form">
                {/* <div className="form-group">
                  <select className="bootstrap-select" name="poscats">
                    <option value="0">All categories</option>
                    <option value="2">Arrivals</option>
                    <option value="3">Cameras</option>
                    <option value="4">Cords and Cables</option>
                    <option value="5">gps accessories</option>
                    <option value="6">Microphones</option>
                    <option value="7">Wireless Transmitters</option>
                    <option value="8">GamePad</option>
                    <option value="9">cube lifestyle hd</option>
                    <option value="10">Bags</option>
                    <option value="11">Bottoms</option>
                    <option value="12">Shirts</option>
                    <option value="13">Tailored</option>
                    <option value="14">Home &amp; Kitchen</option>
                    <option value="15">Large Appliances</option>
                    <option value="16">Armchairs</option>
                    <option value="17">Bunk Bed</option>
                    <option value="18">Mattress</option>
                    <option value="19">Sideboard</option>
                    <option value="20">Small Appliances</option>
                    <option value="21">Bootees Bags</option>
                    <option value="22">Jackets</option>
                    <option value="23">Shelf</option>
                    <option value="24">Shoes</option>
                    <option value="25">Phones &amp; Tablets</option>
                    <option value="26">Tablet</option>
                    <option value="27">phones</option>
                  </select>
                </div> */}
                <input type="text" className="search-rounded" placeholder="Search..." />
                <button><i className="fas fa-search"></i></button>
              </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="cart-box mt-all-30">
              <ul className="d-flex justify-content-lg-end justify-content-center align-items-center">
                <li>
                  <Link to="/login">
                    <i className="far fa-user"></i>
                    <span className="sign-in">
                      <strong>Sign in</strong>
                    </span>
                  </Link>
                </li>
                <li className="shopping-cart">
                  <Link to="/shopping-cart">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="my-cart">
                      <span className="total-pro">2</span>
                      <span>cart</span>
                    </span>
                  </Link>
                  <ul className="ht-dropdown cart-box-width">
                    <li>
                      <div className="single-cart-box">
                        <div className="cart-img">
                          <a href="#"><img src={require('../../assets/img/products/1.jpg')} alt="cart-image" /></a>
                          <span className="pro-quantity">1X</span>
                        </div>
                        <div className="cart-content">
                          <h6><a href="product.html">Printed Summer Red </a></h6>
                          <span className="cart-price">27.45</span>
                          <span>Size: S</span>
                          <span>Color: Yellow</span>
                        </div>
                        <a className="del-icone" href="#"><i className="ion-close"></i></a>
                      </div>
                      <div className="single-cart-box">
                        <div className="cart-img">
                          <a href="#"><img src={require('../../assets/img/products/2.jpg')} alt="cart-image" /></a>
                          <span className="pro-quantity">1X</span>
                        </div>
                        <div className="cart-content">
                          <h6><a href="product.html">Printed Round Neck</a></h6>
                          <span className="cart-price">45.00</span>
                          <span>Size: XL</span>
                          <span>Color: Green</span>
                        </div>
                        <a className="del-icone" href="#"><i className="ion-close"></i></a>
                      </div>
                      <div className="cart-footer">
                        <ul className="price-content">
                          <li>Subtotal <span>$57.95</span></li>
                          <li>Shipping <span>$7.00</span></li>
                          <li>Taxes <span>$0.00</span></li>
                          <li>Total <span>$64.95</span></li>
                        </ul>
                        <div className="cart-actions text-center">
                          <a className="cart-checkout" href="checkout.html">Checkout</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="header-bottom  header-sticky">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-4 col-md-6 vertical-menu d-none d-lg-block">
            <span className="categorie-title">
              Shop by Categories
            </span>
          </div>
          <div className="col-xl-9 col-lg-8 col-md-12 ">
            <nav className="d-none d-lg-block">
              <ul className="header-bottom-list d-flex">
                <li className="active">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="wada-biz">Wadamart For Business<i className="fa fa-angle-down"></i></NavLink>
                  <ul className="ht-dropdown dropdown-style-two">
                    <li><a href="product.html">product details</a></li>
                    <li><a href="compare.html">compare</a></li>
                  </ul>
                </li>
                <li>
                  <NavLink to="/classified-ads">Classified Ads<i className="fa fa-angle-down"></i></NavLink>
                  <ul className="ht-dropdown dropdown-style-two">
                    <li><a href="single-blog.html">blog details</a></li>
                  </ul>
                </li>
                <li>
                  <NavLink to="/faq">FAQ</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div className="container d-block d-lg-none">
      <div className="vertical-menu mt-30">
        <span className="categorie-title mobile-categorei-menu">Shop by Categories</span>
        <nav>
          <div id="cate-mobile-toggle" className="category-menu sidebar-menu sidbar-style mobile-categorei-menu-list menu-hidden ">
            <ul>
              <li className="has-sub"><a href="#">Automotive & Motorcycle </a>
                <ul className="category-sub">
                  <li className="has-sub"><a href="shop.html">Office chair</a>
                    <ul className="category-sub">
                      <li><a href="shop.html">Bibendum Cursus</a></li>
                      <li><a href="shop.html">Dignissim Turpis</a></li>
                      <li><a href="shop.html">Dining room</a></li>
                      <li><a href="shop.html">Dining room</a></li>
                    </ul>
                  </li>
                  <li className="has-sub"><a href="shop.html">Purus Lacus</a>
                    <ul className="category-sub">
                      <li><a href="shop.html">Magna Pellentesq</a></li>
                      <li><a href="shop.html">Molestie Tortor</a></li>
                      <li><a href="shop.html">Vehicula Element</a></li>
                      <li><a href="shop.html">Sagittis Blandit</a></li>
                    </ul>
                  </li>
                  <li><a href="shop.html">gps accessories</a></li>
                  <li><a href="shop.html">Microphones</a></li>
                  <li><a href="shop.html">Wireless Transmitters</a></li>
                </ul>
              </li>
              <li className="has-sub"><a href="#">Sports & Outdoors</a>
                <ul className="category-sub">
                  <li className="menu-tile">Cameras</li>
                  <li><a href="shop.html">Cords and Cables</a></li>
                  <li><a href="shop.html">gps accessories</a></li>
                  <li><a href="shop.html">Microphones</a></li>
                  <li><a href="shop.html">Wireless Transmitters</a></li>
                </ul>
              </li>
              <li className="has-sub"><a href="#">Home & Kitchen</a>
                <ul className="category-sub">
                  <li><a href="shop.html">kithen one</a></li>
                  <li><a href="shop.html">kithen two</a></li>
                  <li><a href="shop.html">kithen three</a></li>
                  <li><a href="shop.html">kithen four</a></li>
                </ul>
              </li>
              <li className="has-sub"><a href="#">Phones & Tablets</a>
                <ul className="category-sub">
                  <li><a href="shop.html">phone one</a></li>
                  <li><a href="shop.html">Tablet two</a></li>
                  <li><a href="shop.html">Tablet three</a></li>
                  <li><a href="shop.html">phone four</a></li>
                </ul>
              </li>
              <li className="has-sub"><a href="#">TV & Video</a>
                <ul className="category-sub">
                  <li><a href="shop.html">smart tv</a></li>
                  <li><a href="shop.html">real video</a></li>
                  <li><a href="shop.html">Microphones</a></li>
                  <li><a href="shop.html">Wireless Transmitters</a></li>
                </ul>
              </li>
              <li><a href="#">Beauty</a> </li>
              <li><a href="#">Sport & tourisim</a></li>
              <li><a href="#">Meat & Seafood</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
)

export default Header