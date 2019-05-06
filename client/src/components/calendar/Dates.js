import React, { Component } from "react";

import { Button } from "@blueprintjs/core";
// import Moment from "react-moment";
// import moment from "moment";

class Dates extends Component {
  constructor(props) {
    super(props);

    this.selectDate = this.selectDate.bind(this);
  }

  selectDate(date) {
    if (date) {
      var url = "/azure/post_reservation";
      this.setState({ loading: true });
      fetch(url)
        .then(res => res.json())
        .then(results => {})
        .catch(error => {
          // need to send error to backend and save...
        });
    } else {
      this.setState({});
    }
  }

  render() {
    var i = 0;
    return this.props.availableDates.map(time => {
      i++;
      return (
        <>
          <Button icon="calendar" key={i}>
            Reserve {time}
          </Button>
          <br />
        </>
      );
    });
  }
}

export default Dates;
