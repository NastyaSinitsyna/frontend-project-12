import axios from 'axios'
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthHeader } from '../utilities.js'
import routes from '../routes.js'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels', 
  async () => {
   const response = await axios.get(routes.channelsPath(), { headers: getAuthHeader() })
    return response.data
  }
)

export const addChannel = createAsyncThunk(
  'channels/addChannel', 
  async (channel) => {
   const response = await axios.post(routes.channelsPath(), channel, { headers: getAuthHeader() })
    return response.data
  }
)

export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async ({ editedChannel, channelId  }) => {
    const response = await axios.patch(`${routes.channelsPath()}/${channelId}`, editedChannel, { headers: getAuthHeader() })
    return response.data
  }
)

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (channelId) => {
    const response = await axios.delete(`${routes.channelsPath()}/${channelId}`, { headers: getAuthHeader() })
    return response.data
  }
)

const channelsAdapter = createEntityAdapter()

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ currentChannelId: null }),
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },
    channelAdded: channelsAdapter.addOne,
    channelRemoved: channelsAdapter.removeOne,
    channelRenamed: (state, action) => {
      channelsAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
    },
  },
  extraReducers: (builder) => {
      builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload)
        if (!state.currentChannelId) {
          state.currentChannelId = state.ids[0] ?? null
        }
      })
      .addCase(addChannel.fulfilled, channelsAdapter.addOne)
      .addCase(editChannel.fulfilled, (state, action) => {
        channelsAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
      })
      .addCase(removeChannel.fulfilled, channelsAdapter.removeOne)
      
    }
})

export const channelsSelectors = channelsAdapter.getSelectors(state => state.channels)
export const { setCurrentChannel, channelAdded, channelRemoved, channelRenamed } = channelsSlice.actions

export default channelsSlice.reducer
