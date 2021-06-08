import React, { useEffect } from 'react'
import store from '../state/store/configureStore'

const ErrorMessage = ({ text }) => {
  useEffect(() => {
    setTimeout(() => {
      store.dispatch({
        type: 'RESET_ERROR',
      })
    }, 5000)
  }, [])

  return <p className='error-paragraph' data-cy='error-message'>{text}</p>
}

export default ErrorMessage
