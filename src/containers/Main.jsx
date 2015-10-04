import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header.jsx";
import Footer from "../components/Footer.jsx";
import Status from "../components/Status.jsx";
import Calibrate from "../components/Calibrate.jsx";
import Sleep from "../components/Sleep.jsx";

import { subscribeToDeviceData, fetchCalibrations,
  fetchWakeupTime } from "../actions";

class Main extends Component {
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
      onMount={this.loadMainCals.bind(this)} />
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
      onMount={this.loadSleepCals.bind(this)} />
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
