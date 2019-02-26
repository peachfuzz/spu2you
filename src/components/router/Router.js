import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../home/Home.js';
import Calendar from '../calendar/Calendar.js';
import Login from '../login/Login.js';

class Content extends Component {
  render() {
    return (
      <div className="Home">
            <div className="content">
                <div className="inner-content">
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/calendar" component={Calendar} />
                </div>
            </div>
      </div>
    );
  }
}

export default Content;
