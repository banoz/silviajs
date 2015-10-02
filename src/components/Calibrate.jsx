import React, { Component, PropTypes } from 'react';
import CalValue from './CalValue.jsx';
import { roundPrec } from '../lib/round';

class Calibrate extends Component {
  constructor(props) {
    super(props);
    this.updated = this.updated.bind(this);
  }

  updated(field) {
    return function (value) {
      // TODO: fire action
      console.log(`${field} updated to ${value}`);
    };
  }

  render() {
    var iPartOld = this.props.iPart - this.props.integral * this.props.error;

    return (
      <article>
        <section className='calibratable'>
          <h1>Calibrate</h1>

          <table className='calibration-table table table-striped'>
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
                  updated={this.updated('targetTemperature')} /></td>
                <td>-</td>
                <td>{roundPrec(this.props.temperature, 1)}</td>
              </tr>
            </tbody>
          </table>

          <table className='calibration-table table table-striped'>
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
                  updated={this.updated('offset')} /></td>
                <td>+</td>
                <td><CalValue value={roundPrec(this.props.proportional, 1)}
                  updated={this.updated('proportional')} /></td>
                <td>&times;</td>
                <td>{roundPrec(this.props.error, 1)}</td>
                <td>+</td>
                <td>{roundPrec(this.props.iPart, 1)}</td>
              </tr>
            </tbody>
          </table>

          <table className='calibration-table table table-striped'>
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
                <td><CalValue value={roundPrec(this.props.integral, 1)}
                  updated={this.updated('integral')} /></td>
                <td>&times;</td>
                <td>{roundPrec(this.props.error, 1)}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </article>
    );
  }
}

Calibrate.propTypes = {
  error: PropTypes.number.isRequired,
  power: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  targetTemperature: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  proportional: PropTypes.number.isRequired,
  integral: PropTypes.number.isRequired,
  iPart: PropTypes.number.isRequired
};

export default Calibrate;
