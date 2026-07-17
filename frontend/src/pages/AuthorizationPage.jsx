import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { login } from '../store/slices/authSlice.js'
import { logInSuccess } from '../store/slices/authSlice.js'
import { storage } from '../services/storageService.js'
import { toast } from 'react-toastify'


function AuthorizationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()
  const inputRef = useRef()
  const redirectedPath = location.state?.from?.pathname ?? '/'

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      try {
        const loginResult = await dispatch(login(values)).unwrap()
        dispatch(logInSuccess(loginResult))
        storage.setItem('token', loginResult.token)
        storage.setItem('username', loginResult.username)
        navigate(redirectedPath, { replace: true })
      }
      catch (error) {
        if (error.status === 401) {
          formik.setStatus({
            authFailed: true,
            message: t('errors.wrongUserData')
          })
        }
        else {
          toast.error(t('errors.connection'))
        }   
      }
    }
  })

  const handleChange = (e) => {
    if (formik.status?.authFailed) {
      formik.setStatus(undefined)
    }
    formik.handleChange(e)
  }

  return (
      <div className="container-fluid d-flex flex-column justify-content-center align-content-center h-100">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <Form onSubmit={formik.handleSubmit} className="mt-3 mt-md-0">
              <h1 className="text-center mb-4">{t('actions.login')}</h1>
              <div className="form-floating mb-3">
                <Form.Control
                  id="username"
                  type="text"
                  name="username"
                  placeholder={t('view.yourNickname')}
                  required
                  value={formik.values.username}
                  ref={inputRef}
                  isInvalid={formik.status?.authFailed}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="username">{t('view.yourNickname')}</Form.Label>
              </div>
              <div className="form-floating mb-3">
                <Form.Control
                  id="password"
                  type="password"
                  name="password"
                  placeholder={t('view.password')}
                  required
                  value={formik.values.password}
                  isInvalid={formik.status?.authFailed}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="password">{t('view.password')}</Form.Label>
                <Form.Control.Feedback type="invalid">{formik.status?.message}</Form.Control.Feedback>
              </div>
              <Button type="submit" disabled={formik.isSubmitting} className="w-100 mb-3 btn btn-primary">{t('actions.login')}</Button>
            </Form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>{t('view.noAccount')}</span>
              <Link to="/signup">{t('view.signup')}</Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AuthorizationPage
