import React, { Component } from "react";
import { Card, Spinner, Button, NonIdealState } from "@blueprintjs/core";
import PostList from "./posts/PostList";

export default class Reservation extends Component {
    constructor() {
        super();
        this.state = { availableDates: [], loading: false };
    }

    getDates() {
        var url = "/azure/get_my_reservations";
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(results => {
                console.log(results);
                this.setState({ availableDates: results.dates });
                this.setState({ loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.getDates();
    }

    render() {
        return (
            <Card>
                {this.state.loading ? (
                    <Spinner />
                ) : this.state.availableDates.length > 0 ? (
                    <PostList PostData={this.state.availableDates} />
                ) : (
                    <NonIdealState
                        icon="clean"
                        title="No reservations"
                        description="You do not have any reservations."
                        action={
                            <Button
                                onClick={() =>
                                    this.props.history.push("/calendar")
                                }
                                text="Make new reservations"
                                icon="calendar"
                            />
                        }
                    />
                )}
            </Card>
        );
    }
}
