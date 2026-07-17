import axios from 'axios'
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthHeader } from '../../utilities.js'
import routes from '../../api/paths.js'
import { removeChannel } from './channelsSlice.js'

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
  initialState: messagesAdapter.getInitialState({ isLoading: false }),
  reducers: {
    messageAdded: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, messagesAdapter.addMany)

      .addCase(addMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.isLoading = false
        messagesAdapter.addOne(state, action.payload)
      })
      .addCase(addMessage.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(removeMessage.fulfilled, messagesAdapter.removeOne)

      .addCase(removeChannel.fulfilled, (state, action) => {
        const channelId = action.payload.id
        const messagesToRemove = Object.values(state.entities)
          .filter((message) => message.channelId === channelId)
          .map(message => message.id)
        messagesAdapter.removeMany(state, messagesToRemove)
      })
  }
})

export const messagesSelectors = messagesAdapter.getSelectors(state => state.messages)
export const { messageAdded } = messagesSlice.actions

export default messagesSlice.reducer
