import React, { Component } from "react";

import {
  Alignment,
  AnchorButton,
  Navbar,
  NavbarGroup,
  NavbarDivider
} from "@blueprintjs/core";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      /* will want to eventually align these elements to the center of the footer div */

      <div className="App-footer">
        <Navbar>
          <NavbarGroup align={Alignment.CENTER}>
            <AnchorButton
              text="About"
              minimal
              icon="clean"
              onClick={
                () => {
                  this.props.history.push("/home");
                  console.log("pressed button");
                }
                /* this.props.history.push("/home") */
              }
            />
            <NavbarDivider />
            <AnchorButton
              text="GitHub"
              minimal
              icon="git-branch"
              onClick={
                () =>
                  console.log(
                    "pressed button"
                  ) /* this.props.history.push("/") */
              }
            />
            <NavbarDivider />
            <AnchorButton
              text="Contact"
              minimal
              icon="envelope"
              onClick={
                () =>
                  console.log(
                    "pressed button"
                  ) /* this.props.history.push("/") */
              }
            />
          </NavbarGroup>
          "pressed button" ) /* this.props.history.push("/") */ } />
          <NavbarDivider />
          <AnchorButton
            text="Contact"
            minimal
            icon="envelope"
            onClick={
              () =>
                console.log("pressed button") /* this.props.history.push("/") */
            }
          />
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Footer);
