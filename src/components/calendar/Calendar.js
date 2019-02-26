import React, {Component} from 'react';
import { DatePicker } from "@blueprintjs/datetime";
import { Tag } from "@blueprintjs/core";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"; //css for the calendar
//import { getDateOnlyWithTime } from '@blueprintjs/datetime/lib/esm/common/dateUtils';
import Moment from 'react-moment';
import 'moment-timezone';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedDate: new Date()
    };

  }
  handleChange(date) {
        this.setState({ selectedDate: date });
  }
  render() {
    return (
      <div className="Calendar">
        <DatePicker
          shortcuts={false}
          minDate={new Date()} //cannot reserve before today
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} //only allowed one year ahead of today
          timePrecision
          onChange={(newDate) => this.handleChange(newDate)}
          value={this.state.selectedDate}
          showActionsBar
        />
        <Tag
          key={this.state.selectedDate}
          icon="calendar"
        >
          <Moment 
            date={this.state.selectedDate} 
            withTime={this.props.timePrecision !== undefined}
            format="LLLL"
          />
        </Tag>
      </div>
    );
  }
}

export default Calendar;
