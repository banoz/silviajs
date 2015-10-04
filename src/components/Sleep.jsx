import React, { PropTypes } from "react";
import PureComponent from "./PureComponent";
import CalValue from "./CalValue.jsx";
import moment from "moment";

class Sleep extends PureComponent {
  constructor(props) {
    super(props);
    this.onSleep = this.onSleep.bind(this);
    this.parseAndHandle = this.parseAndHandle.bind(this);
  }

  onSleep(start) {
    this.props.handleChange("sleeping", start);
  }

  parseAndHandle(event) {
    // May replace by Date.parse("2015-10-4 " + value);
    let now = moment();
    let time = moment(event.target.value, "h:m a");

    time.set({
      day: now.day(),
      month: now.month(),
      year: now.year()
    });

    if(time.isBefore(now)) {
      time.add(1, "day");
    }

    this.props.handleChange("wakeupTime", time.unix());
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

          <h2><button className="btn btn-warning btn-lg" onClick={this.onSleep(true)}>Sleep</button>
            {" until "}
            <td><CalValue value={wakeupTime}
              onChange={this.parseAndHandle} /></td>
          </h2>

          <h2><button className="btn btn-success btn-lg" onClick={this.onSleep(false)}>Wake up!</button></h2>
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
