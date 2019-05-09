import React, { Component } from "react";
//import { Code, getKeyComboString, KeyCombo, Card } from "@blueprintjs/core";
import { Tag, Card, H5, Button, Spinner } from "@blueprintjs/core";
import PostList from './posts/PostList';

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
                this.setState({ availableDates: [new Date(), new Date()] });
                this.setState({ loading: false });
            })
            .catch(error => {
                this.setState({ loading: false }); // need to send error to backend and save...
            });
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.getDates()
    }

    render() {
        return (
            <Card>
                {this.state.loading ? <Spinner /> :
                    <PostList PostData={this.state.availableDates} />}
            </Card>
        );
    }
}
