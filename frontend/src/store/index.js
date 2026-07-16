import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice.js'
import channelsReducer from './slices/channelsSlice.js'
import messagesReducer from './slices/messagesSlice.js'
import modalReducer from './slices/modalSlice.js'


export default configureStore({
  reducer: {
    authData: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
})
