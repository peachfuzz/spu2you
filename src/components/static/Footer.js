import React, { Component } from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import {
  Alignment,
  AnchorButton,
  Navbar,
  NavbarGroup,
  NavbarDivider
} from "@blueprintjs/core";


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
                }
              }
            />
            <NavbarDivider />
            <AnchorButton
              text="GitHub"
              minimal
              icon="git-branch"
              onClick={
                () => {
                  this.props.history.push("/home");
                }
              }
            />
            <NavbarDivider />
            <AnchorButton
              text="Contact"
              minimal
              icon="envelope"
              onClick={
                () => {
                  this.props.history.push("/home");
                }
              }
            />
          </NavbarGroup>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Footer);
