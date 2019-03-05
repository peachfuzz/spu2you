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
      // if (this.state.videoAccess === true) {
      //   navigator.mediaDevices
      //     .getUserMedia({ video: false, audio: false })
      //     .then(function(stream) {
      //       console.log("Vid off");
      //       this.setState({ videoAccess: false });
      //     });
      // } else if (this.state.videoAccess === false) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(function(stream) {
          if (video.srcObject === "" || video.srcObject === null)
            video.srcObject = stream;
          else {
            // let tracks = video.srcObject.stream.getTracks();

            // tracks.forEach(function(track) {
            //   track.stop();
            // });
            video.srcObject = null;
            console.log("off");
          }
        })
        .catch(function(error) {
          console.log("Something went wrong!");
          console.log(error);
        });
      this.setState({ videoAccess: true });
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
