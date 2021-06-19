import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import store from '../state/store/configureStore'
import Snackbar from '@material-ui/core/Snackbar'

const SuccessSnackbar = () => {
  const { success, message } = useSelector((state) => state)

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        store.dispatch({
          type: 'RESET_SUCCESS',
        })
      }, 5000)
    }
  }, [success])

  const successContent = (
    <div className='snack-container'>
      <p data-cy='snack-content'>{message}</p>
    </div>
  )

  const successAction = (
    <IconButton
      className='close-icon'
      size='small'
      aria-label='close'
      color='inherit'
      onClick={() =>
        store.dispatch({
          type: 'RESET_SUCCESS',
        })
      }>
      <CloseIcon fontSize='small' />
    </IconButton>
  )

  return (
    <div>
      <Snackbar className='success-snackbar'
        open={success}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        message={successContent}
        action={successAction}
      />
    </div>
  )
}

export default SuccessSnackbar
