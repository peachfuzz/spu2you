import React, {Component} from 'react';
import { DatePicker } from "@blueprintjs/datetime";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"; //css for the calendar
import { getDateOnlyWithTime } from '@blueprintjs/datetime/lib/esm/common/dateUtils';

class Calendar extends Component {
  render() {
    return (
      <div className="Calendar">
        <DatePicker
          shortcuts={false}
          minDate={new Date()} //cannot reserve before today
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} //only allowed one year ahead of today
          timePrecision
        />
      </div>
    );
  }
}

export default Calendar;
