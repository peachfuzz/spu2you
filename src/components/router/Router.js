import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../home/Home.js';
import Calendar from '../calendar/Calendar.js';
import LogOut from '../logout/LogOut.js';
import Reservations from '../reservations/Reservations.js'
import Robot from '../robot/Robot';

class Content extends Component {
  render() {
    return (
      <div className="content">
          <div className="inner-content">
              <Route exact path="/" component={Home} />
              <Route path="/logout" component={LogOut} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/robot" component={Robot} />
              <Route path="/reservations" component={Reservations} />
          </div>
      </div>
    );
  }
}

export default Content;
