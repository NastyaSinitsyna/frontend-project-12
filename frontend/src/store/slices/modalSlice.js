import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  show: null,
  channel: null,
}
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { type, show, channel } = action.payload
      state.type = type
      state.show = show
      state.channel = channel
    },
    hideModal: (state) => {  
      state.show = false
    }
  }
})

export const { showModal, hideModal } = modalSlice.actions
export default modalSlice.reducer
