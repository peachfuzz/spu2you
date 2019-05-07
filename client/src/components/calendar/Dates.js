import React, { Component } from "react";
import { Button, Popover, H5 } from "@blueprintjs/core";
import moment from "moment";

class Dates extends Component {
    constructor(props) {
        super(props);
        this.selectDate = this.selectDate.bind(this);
    }

    selectDate(date) {
        if (date) {
            var url = "/azure/post_reservation?date=" + date;
            fetch(url, { method: "POST" })
                .then(res => res.json())
                .then(results => {})
                .catch(error => {
                    // need to send error to backend and save...
                });
        }
    }

    render() {
        var i = 0;
        return this.props.availableDates.map(time => {
            var wholeDate = time;
            wholeDate = moment(
                moment(this.props.selectedDate).format("YYYY-MM-DD") +
                    "T" +
                    wholeDate.split("-", 1),
                "YYYY-MM-DDTHH:mma"
            );
            i++;
            return (
                <>
                    <Popover
                        key={i}
                        popoverClassName="bp3-popover-content-sizing"
                    >
                        <Button
                            icon="calendar"
                            text={"Reserve " + time}
                            className="reserve-button"
                        />
                        <div>
                            <H5>Confirm reservation?</H5>
                            <p>
                                You are about to reserve{" "}
                                {moment(wholeDate).format("LLLL")}
                            </p>
                            <div>
                                <Button
                                    intent="danger"
                                    text="Cancel"
                                    className="bp3-popover-dismiss"
                                />
                                <Button
                                    intent="success"
                                    text="Reserve"
                                    onClick={() => this.selectDate(wholeDate)}
                                />
                            </div>
                        </div>
                    </Popover>
                    <br />
                </>
            );
        });
    }
}

export default Dates;
