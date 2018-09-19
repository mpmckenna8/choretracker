import React from 'react';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom'

import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux'
import rootReducer from "./reducers/reducer.js"
const store = createStore(rootReducer)



render(
  <App store={store} />,
  document.getElementById('root')
)

/*

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

*/