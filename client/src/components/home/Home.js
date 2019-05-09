import React, { Component } from "react";
import { Card, H5, Button } from "@blueprintjs/core";
import { withRouter } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };

        this.getUser = this.getUser.bind(this);
    }

    getUser() {
        fetch("/api/user")
            .then(res => res.json())
            .then(data => this.setState({ email: data }))
            .catch(error => {
                // error
                // should send error to backend and log
            });
    }
    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div className="Home">
                <Card>
                    <H5>Welcome to spu2you, {this.state.email}</H5>
                    <p>
                        You can start reserving telecommuting robots by clicking
                        reserve.
                    </p>
                    <Button
                        text="Reserve"
                        onClick={() => this.props.history.push("/calendar")}
                    />
                </Card>
            </div>
        );
    }
}

export default withRouter(Home);
