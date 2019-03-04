import React, { Component } from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";

const splashImage = require('../../images/spu-splash-highres.jpg');
// dimensions: 1600 × 1067

class Splash extends Component {
  render() {
    return (
      <div className="Splash">
        <img src={splashImage} className="Splash-image" alt="logo"/>
        <div className="Splash-overlay">
          <Card interactive={true} elevation={Elevation.TWO}>
            <h1>Virtual Student</h1>
            <div>
              <Button onClick={() => this.props.history.push("/home")}>
                Log In
              </Button>
            </div>
            <br/>
            <div>
              <Button onClick={() => this.props.history.push("/home")}>
                Sign Up
              </Button>
            </div>
            <br/>
          </Card>
        </div>
      </div>
    );
  }
}

export default Splash;