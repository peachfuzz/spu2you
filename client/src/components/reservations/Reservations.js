import React, { Component } from "react";
//import Drawer from 'react-drag-drawer';
//import { Code, getKeyComboString, KeyCombo, Card } from "@blueprintjs/core";
import { Tag, Card, H5, Button } from "@blueprintjs/core";
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";


// create a drawer to show information when clicking a button
class Reservations extends Component {
  constructor(props) {
    super(props);
    var choice;
  //  var msg;
  //  var r = confirm("Are you sure you would like to cancel your reservation?");
    //place holder for azure
    this.state = {
      list: [
        { id: '1', name: "Hector", date: 2019, month: 3, day: 1},
        { id: '2', name: "Alex", date: 2019, month: 2, day: 4 },
        { id: '3', name: "Vanessa", date: 2019, month: 6, day: 8 },
        { id: '4', name: "Marissa", date: 2019, month: 5, day: 10 },
      ],
    };

    //if the reservation is cancelled then it will show it is 
  }

  onRemoveItem = id => {
    this.setState(state => {
      const list = state.list.filter(item => item.id !== id);

      return {
        list,
      };
    });
  };
  
  

/*
  // this is a pop up box 
  alertBox = id =>{
    if(r == true){
      this.onRemoveItem(item.id);
    //  msg  = "Reservation cancelled";
    }
    else{
   //   msg = "Not cancelled";
    }
  }  // this.onRemoveItem(item.id)}
  */

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map(item => (
            <li key={item.id}>
            
              The reservation for {item.name} is {item.date} - {item.month} - {item.day} .
              <button onClick={() => this.alertBox(item.id)}> 
                Cancel Reservation
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

  export default Reservations;