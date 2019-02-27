import React, { Component } from 'react';
import {
    Alignment,
    AnchorButton,
    Navbar,
    NavbarGroup,
    NavbarDivider,
    NavbarHeading,
  } from "@blueprintjs/core";
  import { BrowserRouter as Router, Link } from "react-router-dom";
  //docs: https://blueprintjs.com/docs/#blueprint

const logoImage = require('../../images/virtual_student_logo_placeholder.png');

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <Navbar> 
          {/* className={Classes.DARK} */}
            <NavbarGroup align={Alignment.LEFT}>
                <div className="header_logo">
                  <img src={logoImage} className="w50-h50" alt="logo" />
                </div>
                <NavbarHeading>Virtual Student</NavbarHeading>
                <NavbarDivider />
                <Link to="/">
                  <AnchorButton
                    text="Home"
                    minimal
                    icon="home"
                  />
                </Link>
                <Link to="/calendar">
                  <AnchorButton
                      text="Create Reservation"
                      minimal
                      icon="calendar"
                      onKeyPress="c"
                  />
                </Link>
                <Link to="/reservations">
                  <AnchorButton
                      text="My Reservations"
                      minimal
                      icon="calendar"
                  />
                </Link>
                <Link to="/robot">
                  <AnchorButton
                      text="Robot"
                      minimal
                      icon="known-vehicle"
                  />
                </Link>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <Link to="/login">
                  <AnchorButton //apparently this isn't allowed...
                      text="Login"
                      minimal
                      rightIcon="log-in"
                  />
                </Link>
            </NavbarGroup>
        </Navbar>
      </div>
    );
  }
}

export default Header;
