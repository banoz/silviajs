import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import nextTimestamp from "../lib/nextTimestamp";
import Header from "../containers/Header.jsx";
import Footer from "../components/Footer.jsx";
import Status from "../components/Status.jsx";
import Calibrate from "../components/Calibrate.jsx";
import Sleep from "../components/Sleep.jsx";

import { subscribeToDeviceData, fetchCalibrations,
  setCalibration, fetchWakeupTime } from "../actions";

class Main extends Component {
  constructor(props) {
    super(props);
    this.loadMainCals = this.loadMainCals.bind(this);
    this.handleCalChange = this.handleCalChange.bind(this);
    this.loadSleepCals = this.loadSleepCals.bind(this);
  }

  data() {
    return this.props.variables.data;
  }

  render() {
    var page = (Main.renderPage[this.props.page] || function() {}).bind(this);

    return (
      <div className="container">
        <div className="wrap">
          <Header />
          <Status {...this.data()} />
          {page()}
          <Footer />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch(subscribeToDeviceData());
  }

  loadMainCals() {
    if(this.props.calibrations.state.mainCals === "not loaded") {
      this.props.dispatch(fetchCalibrations());
    }
  }

  loadSleepCals() {
    if(this.props.calibrations.state.sleepCals === "not loaded") {
      this.props.dispatch(fetchWakeupTime());
    }
  }

  handleCalChange(field, value) {
    switch(field) {
      case "sleeping":
        let wakeupTime = this.props.calibrations.data.wakeupTime;

        if(wakeupTime) {
          wakeupTime = nextTimestamp(wakeupTime);

          this.props.dispatch(setCalibration("wakeupTime", wakeupTime));
        }
        this.props.dispatch(setCalibration(field, value));
        break;
      case "wakeupTime":
        // no additional parsing
        break;
      default:
        value = parseFloat(value);
        break;
    }
    this.props.dispatch(setCalibration(field, value));
  }
}

Main.renderPage = {};
Main.renderPage.calibrate = function() {
  let data = this.props.calibrations.data;
  let calProps = {
    loaded: this.props.calibrations.state.mainCals === "loaded",
    targetTemperature: data.targetTemperature,
    offset: data.offset,
    proportional: data.proportional,
    integral: data.integral
  };

  return (
    <Calibrate {...this.data()} {...calProps}
      onMount={this.loadMainCals}
      handleChange={this.handleCalChange} />
  );
};

Main.renderPage.sleep = function() {
  let data = this.props.calibrations.data;
  let sleepProps = {
    loaded: this.props.calibrations.state.sleepCals === "loaded",
    wakeupTime: data.wakeupTime
  };

  return (
    <Sleep {...sleepProps}
      onMount={this.loadSleepCals}
      handleChange={this.handleCalChange} />
  );
};

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  variables: PropTypes.object.isRequired,
  calibrations: PropTypes.object.isRequired
};

function select(state) {
  return {
    page: state.page,
    variables: state.variables,
    calibrations: state.calibrations
  };
}

export default connect(select)(Main);
