import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import routes from '../../routes'
import { storage } from '../../StorageService.js'

export const login = createAsyncThunk(
  'authData/login', 
  async (authValues, { rejectWithValue } ) => {
    try {
      const response = await axios.post(routes.loginPath(), authValues)
      return response.data
    } 
    catch(error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.message
      })
    }
  }
)

export const signup = createAsyncThunk(
  'authData/signup', 
  async (authValues, { rejectWithValue } ) => {
    try {
      const response = await axios.post(routes.signupPath(), authValues)
      return response.data
    } 
    catch(error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.message
      })
    }
  }
)

const token = storage.getItem('token')
const username = storage.getItem('username')

const initialState = {
  token: token || null,
  username: username || null,
  loggedIn: !!token,
}

const authSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    logInSuccess: (state, action) => {
      state.token = action.payload.token
      state.username = action.payload.username
      state.loggedIn = true
      storage.setItem('token', action.payload.token)
      storage.setItem('username', action.payload.username)
    },
    logOut: (state) => {
      state.token = null
      state.username = null
      state.loggedIn = false
      storage.removeItem('token')
      storage.removeItem('username')
    },
  },
})

export const { logInSuccess, logOut } = authSlice.actions

export default authSlice.reducer
