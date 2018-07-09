import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class FooterSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="grey-bg pt-95 grey-bdr-top pt-sm-55">
        <div className="footer-top">
          <div className="container">
            <div className="row mb-60">
              <div className="col-xl-7 col-lg-7 ml-auto mr-auto col-md-8">
                <div className="news-desc text-center mb-30">
                  <h3>Sign Up For Newsletters</h3>
                  <p>Be the First to Know. Sign up for newsletter today</p>
                </div>
                <div className="newsletter-box">
                  <form action="#">
                    <input className="subscribe" placeholder="your email address" name="email" id="subscribe" type="text" />
                    <button type="submit" className="submit">subscribe!</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-footer mb-sm-40">
                  <h3 className="footer-title">Information</h3>
                  <div className="footer-content">
                    <ul className="footer-list">
                      <li><Link to="/about-us">About Us</Link></li>
                      <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                      <li><Link to="/terms_conditions">Terms &amp; Conditions</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-footer mb-sm-40">
                  <h3 className="footer-title">Customer Service</h3>
                  <div className="footer-content">
                    <ul className="footer-list">
                      <li><Link to="/shipping-delivery">Shipping &amp; Delivery</Link></li>
                      <li><Link to="/returns">Returns</Link></li>
                      <li><Link to="/faq">FAQs</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-footer mb-sm-40">
                  <h3 className="footer-title">Resource</h3>
                  <div className="footer-content">
                    <ul className="footer-list">
                      <li><Link to="/blog">Blog</Link></li>
                      <li><Link to="/career">Career</Link></li>
                      <li><Link to="/affiliate">Affiliate</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-footer mb-sm-40">
                  <h3 className="footer-title">My Account</h3>
                  <div className="footer-content">
                    <ul className="footer-list">
                      <li><Link to="/contact-us">Contact Us</Link></li>
                      <li><Link to="/my-account">My Account</Link></li>
                      <li><Link to="/order-history">Order History</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-middle text-center">
          <div className="container">
            <div className="footer-middle-content pt-20 pb-30">
              <ul className="social-footer">
                <li><a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a></li>
                <li><a href="https://twitter.com/"><i className="fab fa-twitter"></i></a></li>
                {/* <li><a href="#"><img src="img/icon/social-img1.png" alt="google play"></a></li>
                    <li><a href="#"><img src="img/icon/social-img2.png" alt="app store"></a></li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom pb-30">
          <div className="container">
            <div className="copyright-text text-center">
              <p>Copyright © 2018 Wadamart LLC. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default FooterSection