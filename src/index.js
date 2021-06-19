import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store from './state/store/configureStore'
import ReactDOM from 'react-dom'
import axios from 'axios'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'

axios.defaults.baseURL =
  process.env.REACT_APP_STAGE === 'production'
    ? process.env.REACT_APP_API_URL
    : 'https://flex-coast-api-development.herokuapp.com/api'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,

  document.getElementById('root')
)

reportWebVitals()

if (window.Cypress) {
  window.store = store
}
