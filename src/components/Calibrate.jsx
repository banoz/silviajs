import React, { Component, PropTypes } from "react";
import CalValue from "./CalValue.jsx";
import { roundPrec } from "../lib/round";

class Calibrate extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(field) {
    return function(event) {
      // TODO: fire action
      console.log(`${field} updated to ${event.target.value}`);
    };
  }

  render() {
    let loaded = this.props.loaded;
    let iPartOld = loaded ? this.props.iPart - this.props.integral * this.props.error : "–";

    return (
      <article>
        <section className="calibratable">
          <h1>Calibrate</h1>

          <table className="calibration-table table table-striped">
            <thead>
              <tr>
                <th>Error</th>
                <th>=</th>
                <th>Desired Temperature</th>
                <th>-</th>
                <th>Measured Temperature</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{roundPrec(this.props.error, 1)}</td>
                <td>=</td>
                <td><CalValue value={roundPrec(this.props.targetTemperature, 1)}
                  onChange={this.onChange("targetTemperature")} /></td>
                <td>-</td>
                <td>{roundPrec(this.props.temperature, 1)}</td>
              </tr>
            </tbody>
          </table>

          <table className="calibration-table table table-striped">
            <thead>
              <tr>
                <th>Output</th>
                <th>=</th>
                <th>Offset</th>
                <th>+</th>
                <th>Proportional</th>
                <th>&times;</th>
                <th>Error</th>
                <th>+</th>
                <th>&Sigma; Error</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{roundPrec(this.props.power, 1)}</td>
                <td>=</td>
                <td><CalValue value={roundPrec(this.props.offset, 1)}
                  onChange={this.onChange("offset")} /></td>
                <td>+</td>
                <td><CalValue value={roundPrec(this.props.proportional, 1)}
                  onChange={this.onChange("proportional")} /></td>
                <td>&times;</td>
                <td>{roundPrec(this.props.error, 1)}</td>
                <td>+</td>
                <td>{roundPrec(this.props.iPart, 1)}</td>
              </tr>
            </tbody>
          </table>

          <table className="calibration-table table table-striped">
            <thead>
              <tr>
                <th>&Sigma; Error</th>
                <th>=</th>
                <th>&Sigma; Error<sub>old</sub></th>
                <th>+</th>
                <th>Integral</th>
                <th>&times;</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{roundPrec(this.props.iPart, 1)}</td>
                <td>=</td>
                <td>{roundPrec(iPartOld, 1)}</td>
                <td>+</td>
                <td><CalValue value={roundPrec(this.props.integral, 3)}
                  onChange={this.onChange("integral")} /></td>
                <td>&times;</td>
                <td>{roundPrec(this.props.error, 1)}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </article>
    );
  }

  componentDidMount() {
    this.props.onMount();
  }
}

Calibrate.propTypes = {
  onMount: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.number,
  power: PropTypes.number,
  temperature: PropTypes.number,
  targetTemperature: PropTypes.number,
  offset: PropTypes.number,
  proportional: PropTypes.number,
  integral: PropTypes.number,
  iPart: PropTypes.number
};

export default Calibrate;
