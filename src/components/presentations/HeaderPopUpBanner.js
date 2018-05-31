import React, { Component } from 'react';
import popUpBannerImage from '../../assets/img/banner/pop-banner.jpg';

class HeaderPopUpBanner extends Component{
  constructor(){
    super()
    this.state = {
      hidden: sessionStorage.getItem('showHeaderPopUp') || false
    }
  }

  hidePopUp(e) {
    this.setState({hidden: true})
    sessionStorage.setItem('showHeaderPopUp', true);
  }

  render() {
    return(
      <div className={`popup_banner ${this.state.hidden ? 'closed' : ''}`}>
        <span className="popup_off_banner"
          onClick={this.hidePopUp.bind(this)}>×</span>
        <div className="banner_popup_area">
          <img src={popUpBannerImage} alt=""/>
        </div>
      </div>
    )
  }
}

export default HeaderPopUpBanner