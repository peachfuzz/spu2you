import React, { Component } from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import {
  Alignment,
  AnchorButton,
  Navbar,
  NavbarGroup,
  NavbarDivider
} from "@blueprintjs/core";


// https://github.com/peachfuzz/virtual-student

class Footer extends Component {
  render() {
    return (
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
