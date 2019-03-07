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
  constructor(props) {
    super(props);
    this.state = {
      combo: null,
      videoAccess: "Start Video",
      mic: null
    };
    this.startVid = this.startVid.bind(this);
  }
  startVid() {
    var vid = document.querySelector("#videoElement"); //for camera access
    var oof;
    //var mediaRecorder; //= this.state.mic;
    if (navigator.mediaDevices.getUserMedia) {
      //make this use state bc currently, you're turning on stream twice
      //get rid of here section
      navigator.mediaDevices
        .getUserMedia({ video: true /*, audio: true*/ }) //doens't work with audio. Maybe make them separate??
        .then(function(stream) {
          if (vid.srcObject === "" || vid.srcObject === null) {
            vid.srcObject = stream; //start recording
            console.log(vid.srcObject);
            // mediaRecorder = new MediaRecorder(stream); //mic start
            // mediaRecorder.start();
            // console.log(mediaRecorder);
          } else {
            //here
            var tracks = stream.getTracks()[0]; //stop recording, currently stops display but keeps recording
            tracks.stop();
            console.log("off");
            tracks = null;
            //here
            vid.srcObject.getTracks()[0].stop(); //this workssssss yassss
            vid.srcObject = null; //no longer displayed
            vid.pause();
            vid.src = null;
            vid.src = "";
            // mediaRecorder.stop();
          }
        })
        .catch(function(error) {
          console.log("Something went wrong!");
          console.log(error);
          oof = error;
        });
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
        {/* <Iframe
          url="http://www.youtube.com/embed/xDMP3i36naA"
          width="450px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
          allowFullScreen
        /> */}
        <video autoPlay={true} id="videoElement" muted="muted" />
        <br />
        <Button
          text={this.state.videoAccess.toString()}
          onClick={this.startVid}
        />
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
