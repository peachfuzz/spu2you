import React, { Component } from 'react';
import { BrowserRouter as Router, Route, IndexRedirect } from "react-router-dom";
import Splash from '../splash/Splash.js';
import Home from '../home/Home.js';
import Calendar from '../calendar/Calendar.js';
import LogOut from '../logout/LogOut.js';
import Reservations from '../reservations/Reservations.js'
import Robot from '../robot/Robot';

/* 
<IndexRedirect to="/default-path" />
<Route path="/default-path" component={DefaultComponent} />
*/

/* 
Dynamic rerouting: (useful for profiles, or pages that appear differently to diff people, etc.)
https://stackoverflow.com/questions/42322399/react-router-how-to-indexredirect-to-dynamic-route

Using the following, we can 'lock' certain pages for users not logged in
<Route onEnter={requireLogin}></Route>

*/

class Content extends Component {
  render() {

    return (
      <div className="content">
        <div className="inner-content">
          <Route path="/splash" component={Splash} />
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
