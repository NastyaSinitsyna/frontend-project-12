import axios from 'axios'
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'

import routes from '../routes.js'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages', 
  async (authHeader) => {
   const response = await axios.get(routes.messagesPath(), { headers: authHeader })
   console.log({ messages: response.data })
    return response.data
  }
)

export const addMessage = createAsyncThunk(
  'messages/addMessage', 
  async ({ authHeader, newMessage }) => {
   const response = await axios.post(routes.messagesPath(), newMessage, { headers: authHeader })
    return response.data
  }
)

export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async ({ authHeader, messageId })   => {
    await axios.delete(`${routes.messagesPath()}/${messageId}`, { headers: authHeader })
    return messageId
  }
)

const messagesAdapter = createEntityAdapter()

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, messagesAdapter.addMany)
      .addCase(addMessage.fulfilled, messagesAdapter.addOne)
      .addCase(removeMessage.fulfilled, messagesAdapter.removeOne)
  }
})

// export const { fetchMessages } = messagesSlice.actions
export const messagesSelectors = messagesAdapter.getSelectors(state => state.messages)

export default messagesSlice.reducer
