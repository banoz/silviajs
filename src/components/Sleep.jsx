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
      console.log(`Sleeping until ${this.timeFromTimestamp(this.props.wakeupTime)}`);
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

    return new Date(timestamp * 1000).toLocaleTimeString("en-US", options);
  }

  render() {
    let loaded = this.props.loaded;
    let wakeupTime = loaded ? this.timeFromTimestamp(this.props.wakeupTime) : "–";

    return (
      <article>
        <section className="calibratable">
          <h1>Sleep Timer</h1>

          <h2><button className="btn btn-warning btn-lg" onClick={this.sleep(true)}>Sleep</button>
            {" until "}
            <td><CalValue value={wakeupTime}
              onChange={this.onChange("wakeupTime")} /></td>
          </h2>

          <h2><button className="btn btn-success btn-lg" onClick={this.sleep(false)}>Wake up!</button></h2>
        </section>
      </article>
    );
  }

  componentDidMount() {
    this.props.onMount();
  }
}

Sleep.propTypes = {
  onMount: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  wakeupTime: PropTypes.number
};

export default Sleep;
