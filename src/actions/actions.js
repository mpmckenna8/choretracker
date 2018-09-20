import config from "../sheetsconfig.js";
export const RECIEVE_CHORES_SUCCESS = "RECIEVE_CHORES_SUCCESS"
let valueInputOption = 'RAW'
let range = "Sheet1!A1:F2000"

let gapi = {}

export const SET_SHOW_CUSTOM = "SET_SHOW_CUSTOM"
export function setShowCustom(showBool) {
  
  return {
    type: SET_SHOW_CUSTOM,
    show: showBool
  }
}



export function loadChores(callback) {
  
  return function(dispatch) {  
    window.gapi.client.load("sheets", "v4", () => {
    
    gapi = window.gapi;
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A2:C"
      })
      .then(
        response => {
          console.log('supposedly got a response from the sheets api')
          const data = response.result.values;
          console.log(data)

          const cars =  [];
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
export function updateAuthStatus(isSignedIn) {
  
  return {
    type: "UPDATE_AUTH_STATUS",
    isSignedIn:isSignedIn
  }
}