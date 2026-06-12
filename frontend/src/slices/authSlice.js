import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import routes from '../routes.js'

export const getToken = createAsyncThunk(
  'authData/getToken', 
  async (authValues, { rejectWithValue } ) => {
    try {
      const response = await axios.post(routes.loginPath(), authValues)
      return response.data.token
    } 
    catch(error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.message
      })
    }
  }
)

const token = localStorage.getItem('token')

const initialState = {
  token: token || null,
  loggedIn: !!token,
  authFailed: false,
  error: null,
}

const authSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null
      state.loggedIn = false
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.pending, (state) => {
      state.authFailed = false
      state.error = null
    })
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.token = action.payload
      state.authFailed = false
      state.loggedIn = true
      state.error = null
      localStorage.setItem('token', action.payload)
    })
    builder.addCase(getToken.rejected, (state, action) => {
      state.error = action.payload
      state.authFailed = action.payload?.status === 401
    })
  }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer
