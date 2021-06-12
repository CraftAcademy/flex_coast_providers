const rootReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INQUIRIES':
      return {
        ...state,
        inquiries: action.payload,
      }
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        error: true,
        message: action.payload,
      }
    case 'RESET_ERROR':
      return {
        ...state,
        error: false,
        message: '',
      }
    case 'AUTHENTICATE':
      return {
        ...state,
        error: false,
        authenticated: true,
        name: action.payload,
      }
    default:
      return state
  }
}
export default rootReducer
