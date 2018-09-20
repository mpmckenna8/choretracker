import React, { Component } from 'react';
import config from "./sheetsconfig.js"

import logo from './chores.jpeg';
import './App.css';
import { connect } from 'react-redux'

import {setShowCustom, loadChores, addNewChore, updateAuthStatus } from "./actions/actions.js";
import DoneChores from "./components/donechores.js"


var CLIENT_ID = '29404548241-19c5qq11u2g2j8hb94sf9dt7nrsrbgp2.apps.googleusercontent.com'//'309096450983-309k97ev5k7sm9v4o5kpdscl44544evn.apps.googleusercontent.com';
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

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
    window.gapi.load("client:auth2", this.initClient);    
    
    console.log('is logged in on mount ? , ', this.isSignedIn())
    this.props.dispatch(updateAuthStatus(this.isSignedIn()));

  //  console.log('trying to init the google sheets api')
}
initClient = () => {
  // 2. Initialize the JavaScript client library.
  let gapi = window.gapi;
  
  let updateSignin = this.updateSigninStatus;
  
  gapi.client
    .init({
      apiKey: config.apiKey,
      clientId: CLIENT_ID,
      scope: SCOPES,

      // Your API key will be automatically added to the Discovery Document URLs.
      discoveryDocs: config.discoveryDocs
    })
    .then(() => {
    // 3. Initialize and make the API request.
    //  console.log('ned in ? = ', gapi.auth2.getAuthInstance().isSignedIn )
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin);
      
      this.updateSigninStatus()

      this.props.dispatch(loadChores(this.onLoad));
      
  });
  
};
onLoad(data, err) {  
//  console.log(this.props.chores)

  console.log('loaded the api now to do stuff', )
  if(err) {
    console.log('error loading the data from sheets', err)
  }
  if(data) {
    console.log('got some data back', data)
  }
}
updateSigninStatus() {
  console.log('need to handle signinstatus', this )

  if(this) {
    console.log('need to handle signinstatus', this.isSignedIn() )
    this.props.dispatch(updateAuthStatus(this.isSignedIn()));
  }
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
sheetAuth() {
  console.log('trying to authorize')
  window.gapi.auth2.getAuthInstance().signIn();
  
}
handleSignoutClick(event) {
  window.gapi.auth2.getAuthInstance().signOut();
  this.props.dispatch(updateAuthStatus(false));

}

isSignedIn() {
  
  if( window.gapi.auth2) {
    let GoogleAuth = window.gapi.auth2.getAuthInstance().currentUser.get().hasGrantedScopes(SCOPES);
    let SignedIn =  window.gapi.auth2;
    let isLoggedOn = false;
    if( SignedIn) {
      isLoggedOn = SignedIn.getAuthInstance() //.currentUser.get.hasGrantedScopes(SCOPES)
    }

      console.log('is signed in? ', GoogleAuth)
      return GoogleAuth
  }

  return false // SignedIn

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
            <button id="authorize-button" onClick={(e) => {    this.sheetAuth() }
          }>Authorize</button></span>
        }

  
</div>
        <p className="App-intro">
          Do a chore
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
