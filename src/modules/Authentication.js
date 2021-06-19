import store from '../state/store/configureStore'
import JtockAuth from 'j-tockauth'
import errorHandler from './ErrorHandler'

const auth = new JtockAuth({
  host: process.env.REACT_APP_API_URL,
  debug: false,
})

const Authentication = {
  async signIn(data) {
    try {
      let response = await auth.signIn(data.email.value, data.password.value)
      store.dispatch({
        type: 'AUTHENTICATE',
        payload: response.data.name,
      })
    } catch (error) {
      errorHandler(error)
    }
  },

  async signOut() {
    try {
      await auth.signOut()
      store.dispatch({
        type: 'LOG_OUT',
      })
    } catch (error) {
      errorHandler(error)
    }
  },

  async validateToken() {
    try {
      let response = await auth.validateToken(getHeaders())

      store.dispatch({
        type: 'AUTHENTICATE',
        payload: response.data.name,
      })
    } catch (error) {}
  },
}

export default Authentication

const getHeaders = () => {
  return JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
}
