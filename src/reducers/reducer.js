// main reducer file

import { combineReducers } from 'redux'
import {SET_SHOW_CUSTOM} from "../actions/actions.js"

function chores( state={
  chore:"none",
  name:"roomate",
  showcustom:false
}, action ) {
  
  switch (action.type) {
    
    case SET_SHOW_CUSTOM: {
      state.showcustom = action.show
      return Object.assign({}, state)
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({chores});

export default rootReducer;