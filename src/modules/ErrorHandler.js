import store from '../state/store/configureStore'

const errorHandler = (error) => {
  if (error.response) {
    if (error.response.data.data) {
      if (error.response.data.data.errors) {
        store.dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: error.response.data.data.errors,
        })
      }
    } else if (error.response.data.error_message) {
      store.dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: error.response.data.error_message,
      })
    }
  } else {
    store.dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: error.message,
    })
  }
}

export default errorHandler
