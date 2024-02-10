import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    hideNotification: () => {
      return ''
    }
  }
})

export const { setNotification, hideNotification } = notificationSlice.actions

export const showNotification = (message, delay) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, delay * 1000)
  }
}

export default notificationSlice.reducer

