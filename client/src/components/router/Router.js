import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../home/Home.js";
import Calendar from "../calendar/Calendar.js";
import Reservations from "../reservations/Reservations.js";
import Robot from "../robot/Robot";

class Content extends Component {
    render() {
        return (
            <div className="content">
                <div className="inner-content">
                    <Switch>
                        <Route exact path="/" component={Home} />
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
