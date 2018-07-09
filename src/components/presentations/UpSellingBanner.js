import React from 'react';

const style={
  image: {
    width: "95%"
  }
}


const UpSellingBanner = () => {
  return (
    <div className="container" id="upsellingbanners-hp">
      <div className="row pt-30 pb-30">
        <div className="col-lg-6 col-xs-12 columns">
          <img src={require('../../assets/img/banner/skincare-bannerad.png')} 
            alt="Skin Care Banner"
            style={style.image} />
        </div>
        <div className="col-lg-6 col-xs-12 columns">
          <img src={require('../../assets/img/banner/furniture-bannerad.png')} 
            alt="Furnutire Banner"
            style={style.image} />
        </div>
      </div>
    </div>
  )
}

export default UpSellingBanner