import React, { Component } from 'react';

class Footer extends Component {
  render() {
    var year = new Date().getFullYear();

    return (
      <div className='footer'>
        <p>&copy; Julien Vanier {year}</p>
        <p>sleep icon by Matt Brooks from the Noun Project</p>
      </div>
    );
  }
}

export default Footer;
