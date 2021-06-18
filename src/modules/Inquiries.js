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
  async update(id, newStatus, oldStatus, setInquiryStatus) {
    const fromDoneToStarted =
      newStatus === 'start' && (oldStatus === 'done' || oldStatus === 'finish')
    let params = {
      inquiry: {
        status_action: fromDoneToStarted ? 'set_to_started' : newStatus,
      },
    }
    try {
      await axios.put(`/inquiries/${id}`, params, { headers: getHeaders() })
      setInquiryStatus(newStatus)
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
      if (error.response?.status === 409) {
        store.dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: error.response.data.error_message,
        })
      }
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
