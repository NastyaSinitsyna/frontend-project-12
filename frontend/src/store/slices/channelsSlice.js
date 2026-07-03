import axios from 'axios'
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthHeader } from '../../utilities.js'
import routes from '../../routes.js'

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
  initialState: channelsAdapter.getInitialState({ currentChannelId: null, isLoading: false }),
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },
    channelAdded: channelsAdapter.addOne,
    channelRemoved: (state, action) => {
      channelsAdapter.removeOne(state, action.payload.id)
      if (state.currentChannelId === action.payload.id) {
        state.currentChannelId = state.ids[0] ?? null
      }
    },
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

      .addCase(addChannel.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addChannel.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addChannel.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(editChannel.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editChannel.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(editChannel.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(removeChannel.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeChannel.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(removeChannel.rejected, (state) => {
        state.isLoading = false
      })
    }
})

export const channelsSelectors = channelsAdapter.getSelectors(state => state.channels)
export const { setCurrentChannel, channelAdded, channelRemoved, channelRenamed } = channelsSlice.actions

export default channelsSlice.reducer
