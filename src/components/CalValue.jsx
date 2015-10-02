import React, { Component, PropTypes } from 'react';

class CalValue extends Component {
  constructor(props) {
    super(props);
    this.keydown = this.keydown.bind(this);
    this.blur = this.blur.bind(this);
  }

  keydown(event) {
    var ENTER = 13;

    if (event.keyCode === ENTER) {
      event.preventDefault();
    // TODO: get value
      this.props.updated(0);
    }
  }

  blur(event) {
    // TODO: get value
    this.props.updated(0);
  }

  render() {
    return (
      <span contentEditable='true' onKeyDown={this.keydown} onBlur={this.blur}>{this.props.value}</span>
    );
  }
}

CalValue.propTypes = {
  value: PropTypes.number.isRequired,
  updated: PropTypes.func.isRequired
};

export default CalValue;
