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

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <Navbar> 
          {/* className={Classes.DARK} */}
            <NavbarGroup align={Alignment.LEFT}>
                <Link to="/">
                  <AnchorButton
                    text="Virtual Student"
                  />
                </Link>
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
