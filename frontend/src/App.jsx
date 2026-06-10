import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

import AuthContext from './contexts/index.jsx'
import useAuth from './hooks/index.jsx'

import MainPage from './components/MainPage.jsx'
import AuthorizationPage from './components/AuthorizationPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))
  const logIn = () => setLoggedIn(true)
  const logOut = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({ children}) => {
  const auth = useAuth()
  const location = useLocation()
  return(
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location}} replace={true} />
  )
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
