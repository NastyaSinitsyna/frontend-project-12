import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import MainPage from './components/MainPage.jsx'
import AuthorizationPage from './components/AuthorizationPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'


const PrivateRoute = ({ children}) => {
  const loggedIn = useSelector(state => state.authData.loggedIn)
  const location = useLocation()
  return(
    loggedIn ? children : <Navigate to="/login" state={{ from: location}} replace={true} />
  )
}

const App = () => {
  return (
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
  )
}

export default App;
