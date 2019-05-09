import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../home/Home.js";
import Calendar from "../calendar/Calendar.js";
import Login from "../login/Login.js";
import Reservations from "../reservations/Reservations.js";
import Robot from "../robot/Robot";
// import Splash from '../splash/Splash.js';
// <Route path="/splash" component={Splash} />

class Content extends Component {
    render() {
        return (
            <div className="content">
                <div className="inner-content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/calendar" component={Calendar} />
                        <Route path="/robot" component={Robot} />
                        <Route path="/reservations" component={Reservations} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Content;
