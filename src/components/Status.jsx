import React from "react";
import PropTypes from "prop-types";
import PureComponent from "./PureComponent";
import { roundPrec } from "../lib/round";

class Status extends PureComponent {
  renderTemperature() {
    if (this.props.sleeping) {
      return (<i className="silvia silvia-sleep" />);
    }

    return roundPrec(this.props.temperature, 0);
  }

  render() {
    var power = this.props.power || 0;
    var powerRound = Math.round(power);
    var powerLog = power > 1.0 ? 50 * Math.log10(power) : 0;

    return (
      <article>
        <section>
          <h2 className="text-center">Temperature</h2>
          <div className="circle circle-medium circle-border">
            <div className="circle-inner">
              <div className="score-text">
                {this.renderTemperature()}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="row">
            <div className="col-sm-3 col-md-3 col-md-offset-2">
              <h2>Heater <b>{powerRound}%</b></h2>
            </div>
            <div className="col-sm-9 col-md-5">
              <div className="progress progress-side">
                <div className="progress-bar progress-bar-warning" style={{ width: powerLog + "%" }} />
              </div>
            </div>
          </div>
        </section>
      </article>
    );
  }
}

Status.propTypes = {
  sleeping: PropTypes.bool,
  temperature: PropTypes.number,
  power: PropTypes.number
};

export default Status;
