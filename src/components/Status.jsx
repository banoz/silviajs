import React, { Component, PropTypes } from 'react';

class Status extends Component {
  renderTemperature() {
    if (this.props.sleeping) {
      return (<i className='silvia silvia-sleep'></i>);
    }
    return this.props.temperature;
  }

  render() {
    var power = this.props.power;
    var powerRound = Math.round(power);
    var powerLog = power > 1.0 ? 50 * Math.log10(power) : 0;

    return (
      <article>
        <section>
          <h2 className='text-center'>Temperature</h2>
          <div className='circle circle-medium circle-border'>
            <div className='circle-inner'>
              <div className='score-text'>
               {this.renderTemperature()}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className='row'>
            <div className='col-sm-3 col-md-3 col-md-offset-2'>
              <h2>Heater <b>{powerRound}%</b></h2>
            </div>
            <div className='col-sm-9 col-md-5'>
              <div className='progress progress-side'>
                <div className='progress-bar progress-bar-warning' style={{width: powerLog + '%'}}></div>
              </div>
            </div>
          </div>
        </section>
      </article>
    );
  }
}

Status.propTypes = {
  sleeping: PropTypes.boolean,
  temperature: PropTypes.number,
  power: PropTypes.number
};

export default Status;
