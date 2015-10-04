import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header.jsx";
import Footer from "../components/Footer.jsx";
import Status from "../components/Status.jsx";
import Calibrate from "../components/Calibrate.jsx";
import Sleep from "../components/Sleep.jsx";

import { subscribeToDeviceData } from "../actions";

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
}

Main.renderPage = {};
Main.renderPage.calibrate = function() {
  return (
    <Calibrate {...this.data()} targetTemperature={96}
    offset={4} proportional={10} integral={0.1} />
  );
};

Main.renderPage.sleep = function() {
  return (
    <Sleep wakeTime={new Date(2015, 10, 2, 6, 50).getTime()} />
  );
};

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  variables: PropTypes.object.isRequired
};

function select(state) {
  return {
    page: state.page,
    variables: state.variables
  };
}

export default connect(select)(Main);
