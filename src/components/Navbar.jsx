import React from "react";
import PropTypes from "prop-types";
import PureComponent from "./PureComponent";
import NavPill from "./NavPill.jsx";

class Navbar extends PureComponent {
  render() {
    var pillProps = {
      onClick: this.props.handleNavigate,
      activePage: this.props.page
    };

    return (
      <div className="header">
        <ul className="nav nav-pills pull-right">
          <NavPill name="Status" page="status" {...pillProps} />
          <NavPill name="Calibrate" page="calibrate" {...pillProps} />
          <NavPill name="Sleep" page="sleep" {...pillProps} />
        </ul>
        <h3 className="text-muted">silvia</h3>
      </div>
    );
  }
}

Navbar.propTypes = {
  handleNavigate: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired
};

export default Navbar;
