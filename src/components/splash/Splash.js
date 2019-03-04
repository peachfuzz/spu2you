import React, { Component } from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";

const logoImage = require("../../images/virtual_student_logo_placeholder.png");
const splashImage = require('../../images/spu-splash-highres.jpg');

class Splash extends Component {
  render() {
    return (
      <div className="Splash">
        <img src={splashImage} className="Splash-image" alt="splash-image"/>
        <div className="Splash-overlay">
          <Card interactive={false} elevation={Elevation.FOUR}>
            <div className="header_logo">
                <img src={logoImage} className="w50-h50" alt="logo"/>
                <h1>Virtual Student</h1>
            </div>
            <div>
              <Button 
                onClick={() => 
                  /* eventually want to change card to allow info to be entered to login */
                  /* maybe call func like redrawLogInCard() */
                  this.props.history.push("/home")
                } 
                text = "Log In"
                large
              />
            </div>
            <br/>
            <div>
              <Button 
                onClick={() => this.props.history.push("/home")} 
                text = "Sign Up"
                large
              />
            </div>
            <br/>
          </Card>
        </div>
      </div>
    );
  }

    redrawLogInCard() {

    }
}

export default Splash;