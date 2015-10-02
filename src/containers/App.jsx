import React, { Component /* , PropTypes */ } from 'react';
// import { connect } from 'react-redux';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Status from '../components/Status.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className='container'>
        <div className='wrap'>
          <Header />
          <Status temperature={80} power={10}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
