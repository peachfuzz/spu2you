import React, { Component } from "react";
import { getKeyComboString, KeyCombo, Card, Button } from "@blueprintjs/core";

/* 
  todo: arrows move
  todo: s mutes sound
  todo: m mutes mic
  todo: v mutes video
*/

class Robot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      combo: null,
      videoAccess: "Start Video",
      mic: null
    };
    this.startVid = this.startVid.bind(this);
    this.setNeckPosition = this.setNeckPosition.bind(this);
    this.move = this.move.bind(this);
    this.clickToLook = this.clickToLook;
  }

  setNeckPosition() {
    window.Ohmni.setNeckTorqueEnabled(1);
    // setNeckPosition(300 =< pos =< 600, 80 =< speed =< 220)
    //                  down        up    fast           slow
    window.Ohmni.setNeckPosition(300, 100);
  }

  move() {
    // Ohmni.move(-500, 500, 2000); // Rotate in place for two seconds
    // Ohmni.move(700, 700, 1500); // Go forwards for 1.5 seconds
    // Ohmni.move(-200, -200, 5000); // Go backwards slowly for 5 seconds
    window.Ohmni.move(700, 700, 100); // Go forwards for .1 seconds
  }

  clickToLook() {
    window.Ohmni.clickToLook();
  }

  startVid() {
    var vid = document.querySelector("#videoElement"); //for camera access
    if (navigator.mediaDevices.getUserMedia) {
      //checking if there's already video/audio playing
      if (vid.srcObject === "" || vid.srcObject === null) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true }) //doens't work with audio. Maybe make them separate??
          .then(function(stream) {
            vid.srcObject = stream; //start recording
            console.log(vid.srcObject);
          })
          .catch(function(error) {
            console.log("Something went wrong!");
            console.log(error);
          });
      } else {
        console.log("off");
        vid.srcObject.getTracks()[0].stop(); //turning off vid
        vid.srcObject.getTracks()[1].stop(); //turning off mic
        vid.srcObject = null; //no longer displayed
        vid.src = null;
        vid.src = "";
      }
    }
    if (this.state.videoAccess === "Start Video")
      this.setState({ videoAccess: "End Video" });
    else this.setState({ videoAccess: "Start Video" });
  }

  render() {
    return (
      <Card
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        tabIndex={0}
      >
        <video autoPlay={true} id="videoElement" muted="muted" />
        <br />
        <Button
          text={this.state.videoAccess.toString()}
          onClick={this.startVid}
        />
        <br />
        <br />
        <div className="key-combo">{this.renderKeyCombo()}</div>
      </Card>
    );
  }

  renderKeyCombo() {
    const { combo } = this.state;
    if (combo == null) {
      return "Click here then press a key combo";
    } else {
      return (
        <>
          <KeyCombo combo={combo} />
        </>
      );
    }
  }

  handleKeyDown = e => {
    e.preventDefault();
    e.stopPropagation();

    const combo = getKeyComboString(e.nativeEvent);
    this.setState({ combo });
  };

  handleBlur = () => this.setState({ combo: null }); // sets to null when keypress!=down
}

export default Robot;
