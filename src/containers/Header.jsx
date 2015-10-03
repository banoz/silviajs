import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar.jsx";
import { navigateTo } from "../actions";

class Header extends Component {
  handleNavigate(event) {
    this.props.dispatch(navigateTo(event.target.page));
  }

  render() {
    return (
      <Navbar page={this.props.page} handleNavigate={this.handleNavigate.bind(this)} />
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired
};

function select(state) {
  return {
    page: state.page
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Header);
