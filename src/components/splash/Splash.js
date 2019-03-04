import React, { Component } from 'react';


const splashImage = require('../../images/spu-splash-highres.jpg');

// dimensions: 1600 × 1067

// <img src={splashImage} className="w1600-h1067" alt="logo" />


class Splash extends Component {
  constructor() {
    super();
    this.state = {id: "splash"};
  }

  // ^ allows you to: "<p>This state id  == {this.state.id} </p>"
  render() {
    // console.log(this.props); // many props!
    return (
      <div className="Splash">
      </div>
    );
  }
}

export default Splash;