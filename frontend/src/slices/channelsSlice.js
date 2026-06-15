import axios from 'axios'
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'

import routes from '../routes.js'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels', 
  async (authHeader) => {
   const response = await axios.get(routes.channelsPath(), { headers: authHeader })
   console.log({channels: response.data})
    return response.data
  }
)

export const addChannel = createAsyncThunk(
  'channels/addChannel', 
  async ({ authHeader, channel }) => {
   const response = await axios.post(routes.channelsPath(), channel, { headers: authHeader })
    return response.data
  }
)

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ authHeader, channelId }) => {
    await axios.delete(`${routes.channelsPath()}/${channelId}`, { headers: authHeader })
    return channelId
  }
)

const channelsAdapter = createEntityAdapter()

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ currentChannelId: null }),
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    }
  },
  extraReducers: (builder) => {
      builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload)
        if (!state.currentChannelId) {
          state.currentChannelId = state.ids[0] ?? null
        }
      })
      .addCase(addChannel.fulfilled, channelsAdapter.addOne)
      .addCase(removeChannel.fulfilled, channelsAdapter.removeOne)
      
    }
})

export const channelsSelectors = channelsAdapter.getSelectors(state => state.channels)
export const { setCurrentChannel } = channelsSlice.actions

export default channelsSlice.reducer
