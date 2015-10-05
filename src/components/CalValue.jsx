import React, { PropTypes, Component } from "react";
import shallowEqual from "shallowequal";

class CalValue extends Component {
  constructor(props) {
    super(props);
    this.emitChange = this.emitChange.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  render() {
    return (
      <span
        className="editable"
        {...this.props}
        onKeyDown={this.keyDown}
        onBlur={this.emitChange}
        contentEditable={!this.props.disabled}
        dangerouslySetInnerHTML={{__html: this.props.value}}></span>
    );
  }

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    if(this.props.value !== React.findDOMNode(this).innerHTML) {
      React.findDOMNode(this).innerHTML = this.props.value;
    }
  }

  keyDown(event) {
    const ENTER = 13;

    if(event.keyCode === ENTER) {
      event.preventDefault();
      this.emitChange(event);
    }
  }

  emitChange(event) {
    var value = React.findDOMNode(this).innerHTML;

    if(this.props.onChange && value !== this.props.value.toString()) {
      event.target = { value: value };
      this.props.onChange(event);
    }
  }
}

CalValue.propTypes = {
  value: PropTypes.node.isRequired,
  disabled: PropTypes.boolean,
  onChange: PropTypes.func.isRequired
};

export default CalValue;
