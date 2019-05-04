import React, { Component } from "react";
import { DatePicker } from "@blueprintjs/datetime";
import {
  Tag,
  NonIdealState,
  Card,
  Colors,
  Divider,
  Spinner
} from "@blueprintjs/core";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"; //css for the calendar
// import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import { withRouter } from "react-router-dom";
import Dates from "./Dates";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: "none",
      availableDates: [],
      selectedTime: "",
      loading: false
    };
  }

  handleChange(date) {
    if (date) {
      this.setState({ selectedDate: date }, () => {
        var momentDate = moment(this.state.selectedDate).format("YYYYMMDD");

        var url = "/azure/get_reservations?date=" + momentDate;
        this.setState({ loading: true });
        fetch(url)
          .then(res => res.json())
          .then(results => {
            this.setState({ availableDates: results.dates });
            this.setState({ loading: false });
          })
          .catch(error => {
            // need to send error to backend and save...
            this.setState({ loading: false });
          });
      });
    } else {
      this.setState({
        selectedDate: "none",
        availableDates: [],
        loading: false
      });
    }
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
            {this.state.availableDates.length !== 0 ? (
              <>
                <Tag key={this.state.selectedDate} icon="calendar">
                  Available Times for{" "}
                  {moment(this.state.selectedDate).format("LL")}
                </Tag>
                <br />
                <Dates
                  availableDates={this.state.availableDates}
                  selectedDate={this.state.selectedDate}
                />
              </>
            ) : this.state.loading ? (
              <Spinner size="50" />
            ) : (
              <NonIdealState icon="calendar" title="No date selected" />
            )}
          </Card>
        </div>
      </Card>
    );
  }
}

export default withRouter(Calendar);
