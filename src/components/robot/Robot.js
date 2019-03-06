import React, { Component } from "react";
import {
  Code,
  getKeyComboString,
  KeyCombo,
  Card,
  Button
} from "@blueprintjs/core";
import Iframe from "react-iframe";

/* TODO:
  arrows move
  s mutes sound
  m mutes mic
  v mutes video
*/

class Robot extends Component {
  constructor() {
    super();
    this.state = {
      combo: null,
      videoAccess: false,
      streaming: null
    };
    this.startVid = this.startVid.bind(this);
  }
  startVid() {
    var video = document.querySelector("#videoElement"); //for camera access
    if (navigator.mediaDevices.getUserMedia) {
      //make this use state bc currently, you're turning on stream twice
      //get rid of here section
      navigator.mediaDevices
        .getUserMedia({ video: true }) //doens't work with audio. Maybe make them separate??
        .then(function(stream) {
          if (video.srcObject === "" || video.srcObject === null) {
            video.srcObject = stream; //start recording
            console.log(video.srcObject);
          } else if (
            video.srcObject !== "" ||
            video.srcObject.active === true
          ) {
            //here
            var tracks = stream.getTracks()[0]; //stop recording, currently stops display but keeps recording
            tracks.stop();
            console.log("off");
            tracks = null;
            //here

            video.srcObject.getTracks()[0].stop(); //this workssssss yassss
            video.srcObject = null; //no longer displayed
            video.pause();
            video.src = null;
            video.src = "";
          }
        })
        .catch(function(error) {
          console.log("Something went wrong!");
          console.log(error);
        });
      //else turn it off
      // this.setState({ videoAccess: true });
      // }
    }
  }

  render() {
    return (
      <Card
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        tabIndex={0}
      >
        {/* <Iframe
          url="http://www.youtube.com/embed/xDMP3i36naA"
          width="450px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
          allowFullScreen
        /> */}
        <video autoPlay={true} id="videoElement" width="450px" muted="muted" />
        <br />
        <Button text="Start Video" onClick={this.startVid} />
        <br />
        {this.renderKeyCombo()}
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
          <Code>{combo}</Code>
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

  handleBlur = () => this.setState({ combo: null });
}

export default Robot;
