import React, { Component, PropTypes } from "react";
import CalValue from "./CalValue.jsx";

class Sleep extends Component {
  constructor(props) {
    super(props);
    this.sleep = this.sleep.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  sleep(start) {
    if (start) {
      console.log(`Sleeping until ${this.timeFromTimestamp(this.props.wakeTime)}`);
    } else {
      console.log("Waking up");
    }
  }

  onChange(field) {
    return function(event) {
      // TODO: fire action
      console.log(`${field} updated to ${event.target.value}`);
    };
  }

  timeFromTimestamp(timestamp) {
    var options = { hour: "numeric", minute: "numeric" };

    return new Date(timestamp).toLocaleTimeString("en-US", options);
  }

  render() {
    return (
      <article>
        <section className="calibratable">
          <h1>Sleep Timer</h1>

          <h2><button className="btn btn-warning btn-lg" onClick={this.sleep(true)}>Sleep</button>
            {" until "}
            <td><CalValue value={this.timeFromTimestamp(this.props.wakeTime)}
              onChange={this.onChange("wakeTime")} /></td>
          </h2>

          <h2><button className="btn btn-success btn-lg" onClick={this.sleep(false)}>Wake up!</button></h2>
        </section>
      </article>
    );
  }
}

Sleep.propTypes = {
  wakeTime: PropTypes.number.isRequired
};

export default Sleep;
