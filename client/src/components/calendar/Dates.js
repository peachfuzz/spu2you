import React, { Component } from "react";

import { Tag, Button } from "@blueprintjs/core";
import Moment from "react-moment";
import moment from "moment";

class Dates extends Component {
  render() {
    var i = 0;
    return this.props.availableDates.map(time => {
      i++;
      return (
        <>
          <Button icon="calendar" key={i}>
            {time}
          </Button>
          <br />
        </>
      );
    });
  }
}

export default Dates;
