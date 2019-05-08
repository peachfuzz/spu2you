import React, { Component } from "react";
import {
    AnchorButton,
    Button,
    Dialog,
    H5,
    Popover,
    Tooltip
} from "@blueprintjs/core";
import moment from "moment";

class Dates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.selectDate = this.selectDate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose() {
        this.setState({ isOpen: false });
    }

    handleOpen() {
        this.setState({ isOpen: true });
    }

    selectDate(time) {
        if (time) {
            var url =
                "/azure/post_reservation?date=" +
                this.props.selectedDate +
                "&time=" +
                time;
            fetch(url, { method: "POST" })
                .then(res => res.json())
                .then(results => {
                    console.log("succcc");
                    console.log(results);
                })
                .catch(error => {
                    // need to send error to backend and save...
                    console.log("booooo");
                    console.log(error);
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
                <Popover key={i} popoverClassName="bp3-popover-content-sizing">
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
                                onClick={() => this.selectDate(time)}
                            />
                        </div>
                    </div>
                </Popover>
            );
        });
    }
}

export default Dates;
