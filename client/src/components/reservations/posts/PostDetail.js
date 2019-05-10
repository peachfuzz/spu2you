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
            loading: false
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

    checkInWasClicked() {
        const { dateCallback } = this.props;

        if (dateCallback !== undefined) {
            dateCallback(
                "Are you sure you want to check into your reservation"
            );
        }
    }

    deleteWasClicked(reservationID) {
        this.setState({ loading: true, error: "" }, () => {
            var url = "/azure/delete_reservations?ResID=" + reservationID;
            fetch(url, { method: "POST" })
                .then(res => res.json())
                .then(results => {
                    console.log(results);
                    this.setState({ loading: false });
                    this.handleOpen(); // nice, on click ok refresh page
                })
                .catch(error => {
                    // need to send error to backend and save...
                    console.log(error);
                    this.setState({ loading: false, error: "error" });
                    this.handleOpen(); // error
                });
        });
    }

    render() {
        const { post } = this.props;
        // const { isOpen, isOpenError, ...alertProps } = this.state;
        return (
            <Callout className="margin-bottom-20">
                <H3>{moment(post.date).format("MMMM D, Y")}</H3>
                <p>{post.time}</p>
                <ButtonGroup>
                    <Popover
                        popoverClassName="bp3-popover-content-sizing"
                        isOpen={this.state.loading ? this.state.loading : null}
                    >
                        <Button
                            rightIcon="trash"
                            intent="danger"
                            text="Delete"
                            disabled={
                                this.state.loading ? this.state.loading : null
                            }
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
                                        disabled={this.state.loading} // disable button when loading
                                    />
                                    <Button
                                        intent="danger"
                                        text="Delete"
                                        onClick={() =>
                                            this.deleteWasClicked(
                                                post.reservationID
                                            )
                                        }
                                        disabled={this.state.loading} // disable button when loading
                                    />
                                </ButtonGroup>
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
                        disabled="true"
                    />
                </ButtonGroup>
            </Callout>
        );
    }
}

export default PostDetail;
