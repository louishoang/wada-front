import React from 'react';
import popUpBanner from '../../assets/img/banner/pop-banner.jpg';

const HeaderPopUpBanner = (props) => (
  <div className="popup_banner">
    <span className="popup_off_banner">×</span>
    <div className="banner_popup_area">
      <img src={popUpBanner} alt=""/>
    </div>
  </div>
)

export default HeaderPopUpBanner