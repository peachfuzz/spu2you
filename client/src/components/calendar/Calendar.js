import React, { Component } from "react";
import { DatePicker } from "@blueprintjs/datetime";
import { Tag, Button, Card, Colors, Divider } from "@blueprintjs/core";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"; //css for the calendar
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import { withRouter } from "react-router-dom";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      selectedTime: ""
    };
  }

  handleChange(date) {
    this.setState({ selectedDate: date }, () => {
      var momentDate = moment(this.state.selectedDate);
      var url =
        "/azure/get_reservations?date=" + momentDate.format("YYYY-MM-DD");
      console.log(momentDate.format("YYYY-MM-DD"));
      console.log(url);
      fetch(url);
    });
  }

  render() {
    return (
      <Card>
        <div className="calendar">
          <DatePicker
            shortcuts={false}
            minDate={new Date()} //cannot reserve before today
            maxDate={
              new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            } //only allowed one year ahead of today
            onChange={newDate => this.handleChange(newDate)}
            style={{ color: Colors.BLUE1 }}
          />
          <Divider />
          <Card className="side-cal">
            <h5>Available Times</h5>
            {/* map stuff here */}
            <Tag key={this.state.selectedDate} icon="calendar">
              <Moment date={this.state.selectedDate} format="LLLL" />
            </Tag>
          </Card>
        </div>
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
