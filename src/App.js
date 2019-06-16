import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import MediaControlCard from './components/CardDemo'


class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <MediaControlCard />
      </div>
    )
  }
}

export default App;
