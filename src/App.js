import React, { Component } from 'react';
import logo from './chores.jpeg';
import './App.css';
import { connect } from 'react-redux'

import {setShowCustom} from "./actions/actions.js"

class App extends Component {
  checkCustom(e, that) {
    console.log(that)

    console.log('check for custom event', e)
    
    if(e === 'custom') {
      console.log('should fire show custom to be ture')
      that.props.dispatch(setShowCustom(true))
    }
    else {
      that.props.dispatch(setShowCustom(false))

    }
    
  }
  render() {
    
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Do some chores!</h1>
        </header>
        <p className="App-intro">
          Do a chore
        </p>
        
        <div>
          Name: <input type="text" />
          <br/>
          chore: 
          <select id="chore-select" onChange={(e) => this.checkCustom(e.target.value, this)}>
            <option value="vacum">vacuuming the common areas</option>
            <option value="kitchen">clean kitchen area</option>
            <option value="supplies">pick up tp/cleaing stuff</option>
            <option value="trash">take out the trash</option>
            <option value="custom">Other chore (enter description) </option>
          </select>
          {
            this.props.chores.showcustom ? <input type="text" id="customtext" /> : "" 
          }
          <br/>
          <button id="submit_button">Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
