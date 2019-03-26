import React, { Component } from "react";
import { DatePicker } from "@blueprintjs/datetime";
import { Tag, Button, Card, Colors, Divider } from "@blueprintjs/core";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"; //css for the calendar
import Moment from "react-moment";
import "moment-timezone";
import { withRouter } from "react-router-dom";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
  }
  handleChange(date) {
    this.setState({ selectedDate: date });
  }
  render() {
    return (
      <Card className="Calendar">
        <DatePicker
          shortcuts={false}
          minDate={new Date()} //cannot reserve before today
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          } //only allowed one year ahead of today
          timePrecision
          onChange={newDate => this.handleChange(newDate)}
          value={this.state.selectedDate}
          showActionsBar
          style={{ color: Colors.BLUE1 }}
        />
        <Divider />

        <Card style={{ background: Colors.BLUE2 }}>
          <h5>Date Selected</h5>
          <p>To confirm this date, click confirm</p>
          <Tag key={this.state.selectedDate} icon="calendar">
            <Moment date={this.state.selectedDate} format="LLLL" />
          </Tag>
          <Divider />
          <Button
            rightIcon="arrow-right"
            intent="success"
            text="Confirm"
            onClick={() => {
              this.props.history.push({
                pathname: "/reservations",
                state: { selectedDate: this.state.selectedDate }
              });
            }}
          />
        </Card>
      </Card>
    );
  }
}

export default withRouter(Calendar);
