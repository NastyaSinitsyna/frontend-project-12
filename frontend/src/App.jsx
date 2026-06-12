import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import MainPage from './components/MainPage.jsx'
import AuthorizationPage from './components/AuthorizationPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'

import { logOut } from './slices/authSlice.js'


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
