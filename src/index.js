import React from 'react'
import { Provider } from 'react-redux'
import store from './state/store/configureStore'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './App'
import reportWebVitals from './reportWebVitals'

axios.defaults.baseURL = 'https://flex-coast-development.herokuapp.com/api'

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,

  document.getElementById('root')
)

reportWebVitals()
