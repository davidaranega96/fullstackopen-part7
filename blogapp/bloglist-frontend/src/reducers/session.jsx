import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    }
  }
})

export const { login, logout } = sessionSlice.actions
export default sessionSlice.reducer