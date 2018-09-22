import React, { Component } from 'react';
import config from "./sheetsconfig.js"

import logo from './chores.jpeg';
import './App.css';
import { connect } from 'react-redux'

import {setShowCustom, loadChores, addNewChore, updateAuthStatus, initGoogAPI, sheetAuth, signoutGoogle } from "./actions/actions.js";
import DoneChores from "./components/donechores.js"


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
  
  componentDidMount() {
  // 1. Load the JavaScript client library.
    this.props.dispatch(initGoogAPI());
}

submitChore() {
  
  console.log('need to submit a chore.');
  let datedat = new Date()
  let dateread = datedat.toDateString();

  let choreData = ['matt', 'did', Date.now()]
  let chorename = document.querySelector('#namein').value;
  let chore_actual = document.querySelector('#chore-select').value
  let timenow = Date.now()
  if(chorename === 'custom') {
    chore_actual = document.querySelector('#customtext').value
  }
  choreData = [chorename, chore_actual, dateread];
  this.props.dispatch(addNewChore(choreData))
}
handleSignoutClick(event) {
  this.props.dispatch(signoutGoogle())
}

  render() {
    
    console.log(this.props)
    return (
      <div className="App">
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Do some chores!</h1>
        </header>
        <div>
        
        {
          this.props.chores.signedIn ? <button id="signout-button" onClick={(e) => { this.handleSignoutClick()}} >Sign Out</button> : <span><p>Authenticate with Google to add chores to the spreadsheet</p>
            <button id="authorize-button" onClick={(e) => {    this.props.dispatch(sheetAuth())  }
          }>Authorize</button></span>
        }

  
</div>
        <p className="App-intro">
          Do a chore!!
        </p>
        
        <div>
          Name: <input type="text" id="namein" />
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
          <button id="submit_button" onClick={() => this.submitChore()} >Submit</button>
          
        </div>
        <DoneChores></DoneChores>

        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
