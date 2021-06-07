import axios from 'axios'
import store from '../state/store/configureStore'

const Inquiries = {
  async index() {
    try {
      let response = await axios.get('/inquiries')
      store.dispatch({
        type: 'SET_INQUIRIES',
        payload: response.data.inquiries,
      })
    } catch (error) {}
  },
}

export default Inquiries
