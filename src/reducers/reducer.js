// main reducer file

import { combineReducers } from 'redux'
import {SET_SHOW_CUSTOM, RECIEVE_CHORES_SUCCESS, CHORE_ADDED, UPDATE_AUTH_STATUS} from "../actions/actions.js"

function chores( state={
  chore:"none",
  name:"roomate",
  showcustom:false,
  chorelist: [],
  signedIn: false
}, action ) {
  
  switch (action.type) {
    
    case SET_SHOW_CUSTOM: {
      state.showcustom = action.show
      return Object.assign({}, state)
    }
    case RECIEVE_CHORES_SUCCESS: {
      state.chorelist = action.chores;
      return Object.assign({}, state)
    }
    case CHORE_ADDED:{
      
      state.chorelist.push(action.choreData)
      return Object.assign({}, state)

    }
    case UPDATE_AUTH_STATUS: {
      state.signedIn = action.isSignedIn
      return Object.assign({}, state)
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({chores});

export default rootReducer;