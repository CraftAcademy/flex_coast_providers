import store from '../state/store/configureStore'
import JtockAuth from 'j-tockauth'
import errorHandler from './ErrorHandler'

const auth = new JtockAuth({
  host: 'https://flex-coast-development.herokuapp.com',
  prefixUrl: '/api',
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

  async validateToken() {
    try {
      await auth.validateToken(getHeaders())
    } catch (error) {}
  },
}

export default Authentication

const getHeaders = () => {
  return JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
}
