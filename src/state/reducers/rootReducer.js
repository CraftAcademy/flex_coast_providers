const rootReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INQUIRIES':
      return {
        ...state,
        inquiries: action.payload,
      }
    case 'SET_ANALYTICS':
      return {
        ...state,
        analytics: action.payload,
      }
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        error: true,
        message: action.payload,
      }
    case 'SET_SUCCESS':
      return {
        ...state,
        success: true,
        message: action.payload,
      }
    case 'RESET_SUCCESS':
      return {
        ...state,
        success: false,
        message: '',
      }
    case 'RESET_ERROR':
      return {
        ...state,
        error: false,
        message: '',
      }
    case 'LOG_OUT':
      return {
        ...state,
        authenticated: false,
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
