import React, { Component } from "react";
import Content from "./components/router/Router.js";
import Header from "./components/static/Header.js";
import Footer from "./components/static/Footer.js";
// import SideMenu from "./components/static/SideMenu.js";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
class App extends Component {
    render() {
        return (
            <Router>
                <div className="App bp3-dark bp3-focus-disabled">
                    <Header />
                    {/* <SideMenu /> */}
                    <Content />
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
