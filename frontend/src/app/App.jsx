import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initSocket } from '../socket.js'
import { useTranslation } from 'react-i18next'
import MainPage from '../pages/MainPage.jsx'
import AuthorizationPage from '../pages/AuthorizationPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import PrivateRoute from '../components/PrivateRoute.jsx'
import SignupPage from '../pages/SignupPage.jsx'
import { ToastContainer } from 'react-toastify'
import LogOutButton from '../components/LogOutButton.jsx'


const App = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  useEffect(() => {initSocket(dispatch)}, [])
  
  return (
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
         <Container>
           <Navbar.Brand as={Link} to="/">{t('view.brand')}</Navbar.Brand>
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
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App;
