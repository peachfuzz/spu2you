import React, { Component } from "react";
import { Code, getKeyComboString, KeyCombo, Card } from "@blueprintjs/core";
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
      combo: null
    };
  }
  componentDidMount() {
    var video = document.querySelector("#videoElement"); //for camera access
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function(stream) {
          video.srcObject = stream;
        })
        .catch(function(error) {
          console.log("Something went wrong!");
        });
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
          height="450px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
          allowFullScreen
        /> */}
        <video autoplay="true" id="videoElement" width="450px" />
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
