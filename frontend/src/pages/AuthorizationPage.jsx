import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../store/slices/authSlice.js'

function AuthorizationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation()
  const inputRef = useRef()
  const redirectedPath = location.state?.from?.pathname ?? '/'
  const authFailed = useSelector(state => state.authData.authFailed)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      try {
        await dispatch(login(values)).unwrap()
        navigate(redirectedPath, { replace: true })
      }
      catch (error) {
        if (error.status !== 401) {
          throw error
        }       
      }
      
    }
  })

  return (
      <div className="container-fluid d-flex flex-column justify-content-center align-content-center h-100">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <Form onSubmit={formik.handleSubmit} className="mt-3 mt-md-0">
              <h1 className="text-center mb-4">Войти</h1>
              <div className="form-floating mb-3">
                <Form.Control
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Ваш ник"
                  required
                  value={formik.values.username}
                  ref={inputRef}
                  isInvalid={authFailed}
                  onChange={formik.handleChange}
                />
                <Form.Label htmlFor="username">Ваш ник</Form.Label>
              </div>
              <div className="form-floating mb-3">
                <Form.Control
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  required
                  value={formik.values.password}
                  isInvalid={authFailed}
                  onChange={formik.handleChange}
                />
                <Form.Label htmlFor="password">Пароль</Form.Label>
                <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль </Form.Control.Feedback>
              </div>
              <Button type="submit" disabled={formik.isSubmitting} className="w-100 mb-3 btn btn-primary">Войти</Button>
            </Form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              <a href="#">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AuthorizationPage
