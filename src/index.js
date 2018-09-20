import React from 'react';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import { createLogger } from 'redux-logger'
import PropTypes from 'prop-types'


import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux'

import rootReducer from "./reducers/reducer.js"


const loggerMiddleware = createLogger()

console.log('envirnment stuff, ', process.env)
const store = createStore(rootReducer, applyMiddleware(
  thunkMiddleware, loggerMiddleware))

const Root = ({ store }) => (
    <Provider store={store}>
      <App />
    </Provider>
  )


    Root.propTypes = {
    store: PropTypes.object.isRequired
  }


render(
  <Root store={store} />,
  document.getElementById('root')
)

/*

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

*/