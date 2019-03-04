import React, { Component } from 'react';

class Splash extends Component {
  constructor() {
    super();
    this.state = {id: "splash"};
  }
  render() {
    // console.log(this.props); // many props!
    return (
      <div className="Splash">
        <p>This state id  == {this.state.id} </p>
      </div>
    );
  }
}

export default Splash;