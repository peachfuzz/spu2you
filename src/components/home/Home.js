import React, { Component } from "react";
import { Card, H5, Button } from "@blueprintjs/core";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Card>
          <H5>Welcome to Virtual Student</H5>
          <p>
            You can start reserving telecommuting robots by clicking reserve.
          </p>
          <Button
            text="Reserve"
            onClick={() => this.props.history.push("/calendar")}
          />
        </Card>
      </div>
    );
  }
}

export default withRouter(Home);
