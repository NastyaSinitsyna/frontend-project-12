import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import MainPage from './pages/MainPage.jsx'
import AuthorizationPage from './pages/AuthorizationPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import { logOut } from './slices/authSlice.js'
import { socket } from './socket.js'
import { messageAdded } from './slices/messagesSlice.js'
import { channelAdded, channelRemoved, channelRenamed } from './slices/channelsSlice.js'


const PrivateRoute = ({ children}) => {
  const loggedIn = useSelector(state => state.authData.loggedIn)
  const location = useLocation()
  return(
    loggedIn ? children : <Navigate to="/login" state={{ from: location}} replace={true} />
  )
}

const LogOutButton = () => {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.authData.loggedIn)
  return (
    loggedIn
    &&
    <Button
      className="btn btn-primary"
      onClick={() => {
        dispatch(logOut())
      }}>
      Выйти
    </Button>
  )
}

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
      dispatch(channelRemoved(channel.id))
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
