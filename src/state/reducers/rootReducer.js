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
    default:
      return state
  }
}
export default rootReducer
