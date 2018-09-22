import config from "../sheetsconfig.js";
export const RECIEVE_CHORES_SUCCESS = "RECIEVE_CHORES_SUCCESS"
let valueInputOption = 'RAW'
let range = "Sheet1!A1:F2000"

var CLIENT_ID = '29404548241-19c5qq11u2g2j8hb94sf9dt7nrsrbgp2.apps.googleusercontent.com'//'309096450983-309k97ev5k7sm9v4o5kpdscl44544evn.apps.googleusercontent.com';
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

let gapi = window.gapi;

export const SET_SHOW_CUSTOM = "SET_SHOW_CUSTOM"
export function setShowCustom(showBool) {
  
  return {
    type: SET_SHOW_CUSTOM,
    show: showBool
  }
}





export function loadChores(callback) {
  
  return function(dispatch) {  
    
    gapi.client.load("sheets", "v4", () => {
    
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A2:C"
      })
      .then(
        response => {
          console.log('supposedly got a response from the sheets api')
          const data = response.result.values;
          console.log(data)
          dispatch(recieveChoresSuccess(data))
        },
        response => {
          dispatch(recieveChoresFail())
        }
      );
  });
  
  
  }
}

export function addNewChore(choreData) {
  return function(dispatch) {
  
  var body = {
  values: [choreData]
};
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: range,
    valueInputOption: valueInputOption,
    resource: body
    
  })
  .then((response) => {
    var result = response.result;
    console.log('result from adding a new chore is: ', result)
    return dispatch(addedChore(choreData))

  })
  .then((response) => {
      console.log('in second part of add thing,', response)
    //  return dispatch(addedChore())

  })

  }

}

export const CHORE_ADDED = "CHORE_ADDED";
function addedChore(choreData) {
  return {
    type:"CHORE_ADDED",
    choreData:choreData
  }
}
function recieveChoresSuccess(chores) {
  
  return {
    type:"RECIEVE_CHORES_SUCCESS",
    chores:chores
  }
}

function recieveChoresFail() {
  return {
    type: "RECIEVE_CHORES_FAIL"
  }
}


export const UPDATE_AUTH_STATUS = "UPDATE_AUTH_STATUS"
export function updateAuthStatus() {
  let signInBool = isSignedIn();
  return {
    type: "UPDATE_AUTH_STATUS",
    isSignedIn:signInBool
  }
}

function isSignedIn() {
    let GoogleAuth = gapi.auth2.getAuthInstance().currentUser.get().hasGrantedScopes(SCOPES);

    console.log('is signed in? ', GoogleAuth)
      return GoogleAuth


}


export function initGoogAPI() {
  return function(dispatch) {
  
  gapi.load("client:auth2", () => {
    
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
        gapi.auth2.getAuthInstance().isSignedIn.listen(inUpdate);
        dispatch(updateAuthStatus())
        
        function inUpdate() {
          console.log('should fire the update')
          return dispatch(updateAuthStatus())
        }
        
        dispatch(loadChores(onLoad));    
    });
    
  });
  

}

}

export function sheetAuth() {
  
  return function(dispatch) {
    
  console.log('trying to authorize');
  
  gapi.auth2.getAuthInstance().signIn();
  //return {type:'trying'} //dispatch(updateAuthStatus())
}
}


function initClient() {
  console.log('library should be loaded')
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
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateAuthStatus);
  //    dispatch(updateAuthStatus())
    //  return dispatch(loadChores(this.onLoad));    
  });
  return 'logged on' 
}


function onLoad(data, err) {  
//  console.log(this.props.chores)

  console.log('loaded the api now to do stuff', )
  if(err) {
    console.log('error loading the data from sheets', err)
  }
  if(data) {
    console.log('got some data back', data)
  }
}

export function signoutGoogle() {
  return function(dispatch) {
    
  gapi.auth2.getAuthInstance().signOut();
  
  dispatch(updateAuthStatus())
}
}