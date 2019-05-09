import React, { Component } from "react";
import { Alert, Button, H5, Popover, ProgressBar } from "@blueprintjs/core";
import moment from "moment";

class Dates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
            isOpen: null,
            loading: false,
            index: -1
        };

        this.selectDate = this.selectDate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose() {
        this.setState({ isOpen: null, index: -1 });
        window.location.reload();
    }

    handleOpen(i) {
        this.setState({ isOpen: true });
    }

    selectDate(time, i) {
        if (time) {
            this.setState({ index: i, loading: true, error: "" }, () => {
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
                        this.setState({ loading: false });
                        this.handleOpen(); // nice, on click ok refresh page
                    })
                    .catch(error => {
                        // need to send error to backend and save...
                        console.log("booooo");
                        console.log(error);
                        this.setState({ loading: false, error: error });
                        this.handleOpen(); // error
                    });
            });
        }
    }

    render() {
        return this.props.availableDates.map((time, i) => {
            var wholeDate = moment(
                moment(this.props.selectedDate) + "T" + time.split("-", 1),
                "YYYYMMDDTHH:mma"
            );
            return (
                <Popover
                    key={i}
                    popoverClassName="bp3-popover-content-sizing"
                    isOpen={
                        this.state.loading && this.state.index === i
                            ? this.state.loading
                            : null
                    }
                >
                    <Button
                        icon="calendar"
                        text={"Reserve " + time}
                        className="reserve-button"
                        disabled={
                            this.state.loading && this.state.index !== i
                                ? this.state.index
                                : null
                        } // disable button when loading
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
                                disabled={this.state.loading} // disable button when loading
                            />
                            <Button
                                intent="success"
                                text="Reserve"
                                onClick={() => this.selectDate(time, i)}
                                disabled={this.state.loading} // disable button when loading
                            />
                            {this.state.loading ? (
                                <ProgressBar
                                    className="margin-top-10"
                                    size="50"
                                />
                            ) : null}
                            <Alert
                                className="bp3-dark"
                                confirmButtonText="Okay"
                                isOpen={this.state.isOpen}
                                onClose={this.handleClose}
                                icon={
                                    this.state.error.length === 0
                                        ? "endorsed"
                                        : "error"
                                }
                                intent={
                                    this.state.error.length === 0
                                        ? "success"
                                        : "danger"
                                }
                                canOutsideClickCancel={true}
                                canEscapeKeyCancel={true}
                                onCancel={() => this.handleClose}
                            >
                                <p>
                                    {this.state.error.length === 0
                                        ? "Your reservation was successful!"
                                        : "Something went wrong!"}
                                </p>
                            </Alert>
                        </div>
                    </div>
                </Popover>
            );
        });
    }
}

export default Dates;
