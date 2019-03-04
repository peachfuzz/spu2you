import React, { Component } from 'react';

const splashImage = require('../../images/spu-splash-highres.jpg');
// dimensions: 1600 × 1067

class Splash extends Component {
  render() {
    return (
      <div className="Splash">
        <img src={splashImage} className="Splash-image" alt="logo" />
      </div>
    );
  }
}

export default Splash;