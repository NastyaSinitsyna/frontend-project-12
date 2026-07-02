import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import LogOutButton from './components/LogOutButton.jsx'
import MainPage from './pages/MainPage.jsx'
import AuthorizationPage from './pages/AuthorizationPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import PrivateRoute from './components/PrivateRoute.jsx'
import { socket } from './socket.js'
import { messageAdded } from './store/slices/messagesSlice.js'
import { channelAdded, channelRemoved, channelRenamed } from './store/slices/channelsSlice.js'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {

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
  }, [])

  return (
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
         <Container>
           <Navbar.Brand href="/">Welcome to Chat!</Navbar.Brand>
           <LogOutButton />
         </Container>
       </Navbar>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
           )}
         />
          <Route path="/login" element={<AuthorizationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
