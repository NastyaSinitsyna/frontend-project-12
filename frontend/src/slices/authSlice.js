import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token')

const initialState = {
  token: token,
  loggedIn: !!token,
}

const authSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.token = action.payload
      state.loggedIn = true
    },
    logOut: (state) => {
      state.token = null
      state.loggedIn = false
    }
  },
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer
