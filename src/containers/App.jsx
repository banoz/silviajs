import React, { Component /* , PropTypes */ } from "react";
// import { connect } from "react-redux";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Status from "../components/Status.jsx";
// import Calibrate from "../components/Calibrate.jsx";
import Sleep from "../components/Sleep.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div className="wrap">
          <Header />
          <Status temperature={80} power={10} />
          <Sleep wakeTime={new Date(2015, 10, 2, 6, 50).getTime()} />
          <Footer />
        </div>
      </div>
    );
  }
}
//         <Calibrate temperature={80} power={10} error={10} targetTemperature={96}
//           offset={4} proportional={10} integral={0.1} iPart={8.5} />

export default App;
