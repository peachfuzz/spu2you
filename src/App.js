import React, { Component } from 'react';
import './App.css';
import Content from './components/router/Router.js';
import Header from './components/static/Header.js';
import Footer from './components/static/Footer.js';
import SideMenu from './components/static/SideMenu.js';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
//import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
//import "@blueprintjs/select/lib/css/blueprint-select.css";
import { BrowserRouter as Router} from "react-router-dom";

class App extends Component {
  render() {    
    return (
      <Router>
        <div className="App bp3-dark">
          <Header/>
          <SideMenu/>
          <Content/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
