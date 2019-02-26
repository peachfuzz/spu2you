import React, { Component } from 'react';
import {
    Alignment,
    AnchorButton,
    Navbar,
    NavbarGroup,
    NavbarDivider
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
                  <img src = {logoImage} width="50" height="50" />
                </div>
                <NavbarHeading>Virtual Student</NavbarHeading>
                <NavbarDivider />
                <Link to="/calendar">
                  <AnchorButton
                      text="Calendar"
                      minimal
                      rightIcon="calendar"
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
