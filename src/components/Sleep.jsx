import React from "react";
import PropTypes from "prop-types";
import PureComponent from "./PureComponent";
import CalValue from "./CalValue.jsx";
import nextTimestamp from "../lib/nextTimestamp";

class Sleep extends PureComponent {
  constructor(props) {
    super(props);
    this.onSleep = this.onSleep.bind(this);
    this.onWake = this.onWake.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }

  onSleep() {
    this.props.handleChange("sleeping", true);
  }

  onWake() {
    this.props.handleChange("sleeping", false);
  }

  handleTime(event) {
    const MS_PER_S = 1000;

    let now = new Date();

    let timestamp = Date.parse(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${event.target.value}`
    ) / MS_PER_S;

    timestamp = nextTimestamp(timestamp, now);

    this.props.handleChange("wakeupTime", timestamp);
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

          <h2><button className="btn btn-warning btn-lg" disabled={!loaded}
            onClick={this.onSleep}>Sleep</button>
          {" until "}
          <td><CalValue value={wakeupTime} disabled={!loaded}
            onChange={this.handleTime} /></td>
          </h2>

          <h2><button className="btn btn-success btn-lg" disabled={!loaded}
            onClick={this.onWake}>Wake up!</button></h2>
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
  handleChange: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  wakeupTime: PropTypes.number
};

export default Sleep;
