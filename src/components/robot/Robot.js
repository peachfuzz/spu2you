import React, { Component } from 'react';
import { Code, getKeyComboString, KeyCombo, Card } from "@blueprintjs/core";

/* TODO:
  arrows move
  s mutes sound
  m mutes mic
  v mutes video
*/


class Robot extends Component {
  constructor(){
    super();
    this.state = {
        combo: null
    }
}

render() {
  return (
      <Card
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          tabIndex={0}
      >
        {this.renderKeyCombo()}
      </Card>
  );
}

renderKeyCombo(){
  const { combo } = this.state;
  if (combo == null) {
    return "Click here then press a key combo";
  } else {
    return (
      <>
        <KeyCombo combo={combo} />
        <Code>{combo}</Code>
      </>
    );
  }
}

handleKeyDown = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const combo = getKeyComboString(e.nativeEvent);
  this.setState({ combo });
};

handleBlur = () => this.setState({ combo: null });
}

export default Robot;