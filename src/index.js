import React from 'react'
import { Provider } from 'react-redux'
import store from './state/store/configureStore'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './App'
import reportWebVitals from './reportWebVitals'

axios.defaults.baseURL =
  process.env.REACT_APP_STAGE === 'production'
    ? 'https://flex-coast-production.herokuapp.com/api'
    : 'https://flex-coast-development.herokuapp.com/api'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
)

reportWebVitals()
