import React, { Component } from "react";
//import { Code, getKeyComboString, KeyCombo, Card } from "@blueprintjs/core";
import { Tag, Card, H5, Button } from "@blueprintjs/core";
import Moment from "react-moment";
import "moment-timezone";

export default class Reservation extends Component {
    constructor() {
        super();
        this.state = { selectedDate: new Date() };
    }
    render() {
        return (
            <Card>
                <H5>This is the date you chose:</H5>
                <Tag key={this.state.selectedDate} icon="calendar">
                    <Moment date={this.state.selectedDate} format="LLLL" />
                </Tag>
                <p>To checkin to your reservation, click check-in</p>
                <Button
                    rightIcon="arrow-right"
                    intent="success"
                    text="Check-in"
                    onClick={() => {
                        this.props.history.push({
                            pathname: "/robot",
                            state: { selectedDate: this.state.selectedDate }
                        });
                    }}
                />
                <Button
                    rightIcon="arrow-right"
                    intent="success"
                    text="Delete"
                    onClick={() => {}}
                />
            </Card>
        );
    }
}
