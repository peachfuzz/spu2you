import React, { Component } from "react";
import {
    Alert,
    Button,
    ButtonGroup,
    Callout,
    H3,
    H5,
    Popover,
    ProgressBar
} from "@blueprintjs/core";
import moment from "moment";

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            isOpen: null,
            delete_loading: null, // must set to either true or null, otherwise causes UI bugs
            check_in_loading: null
        };

        this.checkInWasClicked = this.checkInWasClicked.bind(this);
        this.deleteWasClicked = this.deleteWasClicked.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose() {
        this.setState({ isOpen: null });
        window.location.reload();
    }

    handleOpen() {
        this.setState({ isOpen: true });
    }

    checkInWasClicked(date, time) {
        // const { dateCallback } = this.props; // not entirely sure what this is doing
        // if (dateCallback !== undefined) {
        //     dateCallback(
        //         "Are you sure you want to check into your reservation"
        //     );
        // }
        console.log("date:", date, "time:", time);
        this.setState({ check_in_loading: true, error: "" }, () => {
            var url =
                "check_into_reservation?date=" +
                date +
                "&time=" +
                time.split("-", 1);

            fetch(url)
                .then(res => res.json())
                .then(results => {
                    this.setState({ check_in_loading: null });
                    if (results.body === "y") {
                        window.location = "/robot";
                    } else {
                        // show error, "not your time yet"
                    }
                })
                .catch(error => {
                    this.setState({ check_in_loading: null, error: error });
                });
        });
    }

    deleteWasClicked(reservationID) {
        this.setState({ delete_loading: true, error: "" }, () => {
            var url = "/azure/delete_reservations?ResID=" + reservationID;
            fetch(url, { method: "POST" })
                .then(res => res.json())
                .then(results => {
                    this.setState({ delete_loading: null });
                    this.handleOpen(); // nice, on click ok refresh page
                })
                .catch(error => {
                    // need to send error to backend and save...
                    this.setState({ delete_loading: null, error: "error" });
                    this.handleOpen(); // error
                });
        });
    }

    render() {
        const { post } = this.props;
        // const { isOpen, isOpenError, ...alertProps } = this.state;
        return (
            <Callout className="margin-bottom-20">
                <H3>
                    {moment(post.date, "YYYY-MM-DD").format("dddd, MMMM D, Y")}{" "}
                    (
                    {moment().to(
                        moment(
                            post.date + post.time.substr(0, 7),
                            "YYYY-MM-DDHH:mma"
                        )
                    )}
                    )
                </H3>
                <p>{post.time}</p>
                <ButtonGroup>
                    <Popover
                        popoverClassName="bp3-popover-content-sizing"
                        isOpen={this.state.delete_loading}
                    >
                        <Button
                            rightIcon="trash"
                            intent="danger"
                            text="Delete"
                            disabled={this.state.delete_loading}
                        />
                        <div>
                            <H5>
                                Are you sure you want delete this reservation?
                            </H5>
                            <p>
                                You are about to delete{" "}
                                {moment(post.date).format("MMMM D, Y")} from{" "}
                                {post.time}
                            </p>
                            <div>
                                <ButtonGroup>
                                    <Button
                                        intent="warning"
                                        text="Cancel"
                                        className="bp3-popover-dismiss"
                                        disabled={this.state.delete_loading} // disable button when delete_loading
                                    />
                                    <Button
                                        intent="danger"
                                        text="Delete"
                                        onClick={() =>
                                            this.deleteWasClicked(
                                                post.reservationID
                                            )
                                        }
                                        disabled={this.state.delete_loading} // disable button when delete_loading
                                    />
                                </ButtonGroup>
                                {this.state.delete_loading ? (
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
                                            ? "tick-circle"
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
                                            ? "You successfully deleted your reservation."
                                            : "Something went wrong!"}
                                    </p>
                                </Alert>
                            </div>
                        </div>
                    </Popover>
                    <Button
                        rightIcon="log-in"
                        intent="primary"
                        text="Check-in"
                        onClick={() =>
                            this.checkInWasClicked(post.date, post.time)
                        }
                    />
                </ButtonGroup>
            </Callout>
        );
    }
}

export default PostDetail;
