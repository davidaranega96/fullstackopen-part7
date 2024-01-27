export const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'CLEAR':
    return null
  default:
    return state
  }
}

export const setNotification = (content) => {
  return {
    type: 'SET',
    payload: content
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}