import axios from 'axios'
import store from '../state/store/configureStore'
import errorHandler from './ErrorHandler'

const Inquiries = {
  async index() {
    try {
      setInquiries()
    } catch (error) {
      errorHandler(error)
    }
  },
  async update(id, status, setInquiryStatus) {
    let params = { inquiry: { status_action: status } }
    try {
      await axios.put(`/inquiries/${id}`, params, { headers: getHeaders() })
      setInquiryStatus(status)
      try {
        setInquiries()
      } catch (error) {
        errorHandler(error)
      }
    } catch (error) {
      store.dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: 'Something went wrong, Please try again later',
      })
    }
  },

  async createNote(id, noteInput, setNoteInput) {
    let params = { note: { body: noteInput } }
    try {
      await axios.post(`/inquiries/${id}/notes`, params, {
        headers: getHeaders(),
      })
      setNoteInput('')
      try {
        setInquiries()
      } catch (error) {
        errorHandler(error)
      }
    } catch (error) {
      if (error.response?.status === 422) {
        store.dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: "Let's not save an empty note!",
        })
      } else {
        errorHandler(error)
      }
    }
  },

  async export(id) {
    try {
      let response = await axios.post(`/inquiries/${id}/hubspot`, {
        headers: getHeaders(),
      })
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: response.data.message,
      })
    } catch (error) {
      errorHandler(error)
    }
  },
}

export default Inquiries

const setInquiries = async () => {
  let response = await axios.get('/inquiries')
  store.dispatch({
    type: 'SET_INQUIRIES',
    payload: response.data.inquiries,
  })
}

const getHeaders = () => {
  return JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
}
