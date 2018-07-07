import React, { Component } from 'react';
import popUpBannerImage from '../../assets/img/banner/pop-banner.jpg';

class HeaderPopUpBanner extends Component {
  constructor() {
    super()
    this.state = {
      hidden: this.showPopUp()
    }
    this.hidePopUp = this.hidePopUp.bind(this)
  }

  showPopUp(){
    const expiredAt = localStorage.getItem('hideHeaderPopUpUntil')
    if(!expiredAt) { return false }
    return new Date().getTime() < expiredAt
  }

  hidePopUp() {
    this.setState({ hidden: true })

    const expiration = 1 * 24 * 60 * 60 * 1000 // 1 DAY
    const expiredAt = new Date().getTime() + expiration
    localStorage.setItem('hideHeaderPopUpUntil', expiredAt);
  }

  render() {
    return (
      <div className={`popup_banner ${this.state.hidden ? 'closed' : ''}`}>
        <span className="popup_off_banner"
          onClick={this.hidePopUp}>×</span>
        <div className="banner_popup_area">
          <img src={popUpBannerImage} alt="" />
        </div>
      </div>
    )
  }
}

export default HeaderPopUpBanner