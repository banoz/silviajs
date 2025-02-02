import React from "react";
import PropTypes from "prop-types";
import PureComponent from "./PureComponent";
import classNames from "classnames";

class NavPill extends PureComponent {
  handleClick(event) {
    event.preventDefault();
    event.target.page = this.props.page;
    if(this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render() {
    var isActive = this.props.page === this.props.activePage;

    return (
      <li className={classNames({ active: isActive })}>
        <a href="#" onClick={this.handleClick.bind(this)}>{this.props.name}</a>
      </li>
    );
  }
}

NavPill.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  activePage: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default NavPill;
