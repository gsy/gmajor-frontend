import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import MediaControlCard from './components/CardDemo'
import LoginPage from './components/Login'

class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <LoginPage />
      </div>
    )
  }
}

export default App;
