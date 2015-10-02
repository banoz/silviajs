import React, { Component, PropTypes } from 'react';

class NavPill extends Component {
  render() {
    var activeClass = this.props.active ? 'active' : '';

    return (
      <li className={activeClass}>
        <a href={this.props.href}>{this.props.name}</a>
      </li>
    );
  }
}

NavPill.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default NavPill;
