import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import store from '../state/store/configureStore'
import Snackbar from '@material-ui/core/Snackbar'

const ErrorSnackbar = () => {
  const { error, message } = useSelector((state) => state)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        store.dispatch({
          type: 'RESET_ERROR',
        })
      }, 5000)
    }
  }, [error])

  const errorContent = (
    <div className='error-snack-container'>
      <p data-cy='error-snack'>{message}</p>
    </div>
  )

  const errorAction = (
    <IconButton
      className='close-icon'
      size='small'
      aria-label='close'
      color='inherit'
      onClick={() =>
        store.dispatch({
          type: 'RESET_ERROR',
        })
      }>
      <CloseIcon fontSize='small' />
    </IconButton>
  )

  return (
    <div>
      <Snackbar className='error-snackbar'
        open={error}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        message={errorContent}
        action={errorAction}
      />
    </div>
  )
}

export default ErrorSnackbar
