import axios from 'axios'
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthHeader } from '../utilities.js'
import routes from '../routes.js'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages', 
  async () => {
   const response = await axios.get(routes.messagesPath(), { headers: getAuthHeader() })
    return response.data
  }
)

export const addMessage = createAsyncThunk(
  'messages/addMessage', 
  async (newMessage) => {
   const response = await axios.post(routes.messagesPath(), newMessage, { headers: getAuthHeader() })
    return response.data
  }
)

export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async (messageId) => {
    const response = await axios.delete(`${routes.messagesPath()}/${messageId}`, { headers: getAuthHeader() })
    return response.data
  }
)

const messagesAdapter = createEntityAdapter()

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    messageAdded: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, messagesAdapter.addMany)
      .addCase(addMessage.fulfilled, messagesAdapter.addOne)
      .addCase(removeMessage.fulfilled, messagesAdapter.removeOne)
  }
})

export const messagesSelectors = messagesAdapter.getSelectors(state => state.messages)
export const { messageAdded } = messagesSlice.actions

export default messagesSlice.reducer
