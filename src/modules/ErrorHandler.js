import store from '../state/store/configureStore'

const errorHandler = (error) => {
  if (error.response?.data?.data?.errors) {
    store.dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: error.response.data.data.errors,
    })
  } else if (error.response?.data?.error_message) {
    store.dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: error.response.data.error_message,
    })
  } else if (error.response?.data?.errors) {
    store.dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: error.response?.data?.errors,
    })
  } else if (error.response?.data?.message) {
    store.dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: error.response.data.error_message,
    })
  } else if (error.message) {
    store.dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: error.message,
    })
  } else {
    store.dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: error,
    })
  }
}

export default errorHandler
