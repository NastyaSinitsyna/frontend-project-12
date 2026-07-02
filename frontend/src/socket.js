import { io } from 'socket.io-client'
import { messageAdded } from './store/slices/messagesSlice.js'
import { channelAdded, channelRemoved, channelRenamed } from './store/slices/channelsSlice.js'

const socket = io()

export const initSocket = (dispatch) => {
  function onNewMessage(message) {
    dispatch(messageAdded(message))
  }
  function onNewChannel(channel) {
    dispatch(channelAdded(channel))
  }
  function onRemoveChannel(channel) {
    dispatch(channelRemoved(channel))
  }
  function onRenameChannel(channel) {
    dispatch(channelRenamed(channel))
  }

  socket.on('newMessage', onNewMessage)
  socket.on('newChannel', onNewChannel)
  socket.on('removeChannel', onRemoveChannel)
  socket.on('renameChannel', onRenameChannel)

  return () => {
    socket.off('newMessage', onNewMessage)
    socket.off('newChannel', onNewChannel)
    socket.off('removeChannel', onRemoveChannel)
    socket.off('renameChannel', onRenameChannel)
  }
}
