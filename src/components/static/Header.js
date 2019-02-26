import React, { Component } from 'react';
import {
    Alignment,
    AnchorButton,
    Classes,
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider
  } from "@blueprintjs/core";
  import { BrowserRouter as Router, Route, Link } from "react-router-dom";
  //docs: https://blueprintjs.com/docs/#blueprint

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <Navbar className={Classes.DARK}>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>Virtual Student</NavbarHeading>
                <NavbarDivider />
                <Link to="/login">
                  <AnchorButton //apparently this isn't allowed...
                      text="Login"
                      minimal
                      rightIcon="log-in"
                  />
                </Link>
                <Link to="/calendar">
                  <AnchorButton
                      text="Calendar"
                      minimal
                      rightIcon="calendar"
                  />
                </Link>
            </NavbarGroup>
        </Navbar>
      </div>
    );
  }
}

export default Header;
