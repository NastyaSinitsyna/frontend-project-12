import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import LogOutButton from './components/LogOutButton.jsx'
import MainPage from './pages/MainPage.jsx'
import AuthorizationPage from './pages/AuthorizationPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import PrivateRoute from './components/PrivateRoute.jsx'
import { initSocket } from './socket.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {initSocket(dispatch)}, [])

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
