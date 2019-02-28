import React, { Component } from 'react';
import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { BrowserRouter as Router } from "react-router-dom";
//docs: https://blueprintjs.com/docs/#blueprint

class SideMenu extends Component {
  render() {
    return (
      <div className="App-menu">
        <Menu>
            <MenuItem icon="home" onClick={this.handleClick} text="Home" />
            <MenuItem icon="new-object" onClick={this.handleClick} text="New object" />
            <MenuItem icon="new-link" onClick={this.handleClick} text="New link" />
            <MenuDivider />
            <MenuItem text="Settings..." icon="cog">
                <MenuItem icon="tick" text="Save on edit" />
                <MenuItem icon="blank" text="Compile on edit" />
            </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SideMenu;
