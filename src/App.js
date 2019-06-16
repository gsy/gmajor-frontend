import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import MediaControlCard from './components/CardDemo'
import LoginPage from './components/Login'
import SignupPage from './components/Signup'

class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <SignupPage />
      </div>
    )
  }
}

export default App;
