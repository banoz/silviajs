import React, { Component } from 'react';
import NavPill from './NavPill.jsx';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <ul className='nav nav-pills pull-right'>
          <NavPill name='Status' href='/' />
          <NavPill name='Calibrate' href='/calibrate' />
          <NavPill name='Sleep' href='/sleep' />
        </ul>
        <h3 className='text-muted'>silvia</h3>
      </div>
    );
  }
}

export default Header;
