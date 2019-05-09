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
import moment from "moment";
import "moment-timezone";
import { withRouter } from "react-router-dom";
import Dates from "./Dates";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: undefined,
            availableDates: [],
            selectedTime: "",
            loading: false
        };
    }

    handleChange(date) {
        if (date) {
            var momentDate =
                moment().format("YYYYMMDD") !== moment(date).format("YYYYMMDD")
                    ? moment(date).format("YYYYMMDD")
                    : moment()
                          .add(1, "d")
                          .format("YYYYMMDD");
            this.setState(
                {
                    selectedDate: momentDate
                },
                () => {
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
                }
            );
        } else {
            this.setState({
                selectedDate: undefined,
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
                        // minDate={new Date()}
                        minDate={
                            new Date(
                                new Date().setDate(new Date().getDate() + 1)
                            )
                        } //cannot reserve before today
                        maxDate={
                            new Date(
                                new Date().setFullYear(
                                    new Date().getFullYear() + 1
                                )
                            )
                        } //only allowed one year ahead of today
                        initialMonth={new Date()}
                        showActionsBar="true"
                        onChange={newDate => this.handleChange(newDate)}
                        todayButtonText={
                            "Tomorrow, " +
                            moment()
                                .add(1, "d")
                                .format("MM/DD/YYYY")
                        }
                        style={{ color: Colors.BLUE1 }}
                        value={
                            this.state.selectedDate !== undefined
                                ? new Date(
                                      moment(this.state.selectedDate).format(
                                          "LLL"
                                      )
                                  )
                                : undefined
                        }
                    />
                    <Divider />
                    <Card className="side-cal">
                        {this.state.loading ? (
                            <Spinner size="50" />
                        ) : this.state.availableDates.length === 1 &&
                          this.state.availableDates[0] === "no dates" ? (
                            <Tag>
                                No available dates for{" "}
                                {moment(this.state.selectedDate).format("LL")}
                            </Tag>
                        ) : this.state.availableDates.length > 0 ? (
                            <>
                                <Tag
                                    key={this.state.selectedDate}
                                    icon="calendar"
                                >
                                    Available Times for{" "}
                                    {moment(this.state.selectedDate).format(
                                        "LL"
                                    )}
                                </Tag>
                                <br />
                                <Dates
                                    availableDates={this.state.availableDates}
                                    selectedDate={this.state.selectedDate}
                                />
                            </>
                        ) : (
                            <NonIdealState
                                icon="calendar"
                                title="No date selected"
                            />
                        )}
                    </Card>
                </div>
            </Card>
        );
    }
}

export default withRouter(Calendar);
