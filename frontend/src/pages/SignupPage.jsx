import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { logInSuccess, signup } from '../store/slices/authSlice.js'
import { validUserSchema } from '../schemas/validUserSchema.js'

function SignupPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const inputRef = useRef()


  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: { username: "", password: "", confirmPassword: "" },
    validationSchema: validUserSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log('submit start')
      const { username, password } = values
      try {
        const signupResult = await dispatch(signup({ username, password })).unwrap()
        dispatch(logInSuccess(signupResult))
        console.log('submit success')
        navigate('/', { replace: true })
      }
      catch (error) {
        console.log('submit error')
        if (error.status === 409) {
          formik.setStatus({
            signupFailed: true,
            message: t('errors.userExists')
          })
        }
        else {
          throw error
        }         
      }
      
    }
  })

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    if (formik.status?.authFailed) {
      formik.setStatus(undefined)
    }
    formik.handleChange(e)
  }

  console.log(formik.errors)
  console.log(formik.values)
  console.log(formik.isValid)

  return (
      <div className="container-fluid d-flex flex-column justify-content-center align-content-center h-100">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <Form onSubmit={(e) => {
              console.log('submit form')
              formik.handleSubmit(e)
              }} className="mt-3 mt-md-0">
              <h1 className="text-center mb-4">{t('view.signup')}</h1>
              <div className="form-floating mb-3">
                <Form.Control
                  id="username"
                  type="text"
                  name="username"
                  placeholder={t('errors.nameLength')}
                  required
                  value={formik.values.username}
                  ref={inputRef}
                  isInvalid={formik.status?.signupFailed ||
                    (formik.touched.username && !!formik.errors.username)
                  }
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-tooltip">{formik.errors.username}</div>
                <Form.Label htmlFor="username">{t('view.username')}</Form.Label>
              </div>
              <div className="form-floating mb-3">
                <Form.Control
                  id="password"
                  type="password"
                  name="password"
                  placeholder={t('errors.passwordLength')}
                  required
                  value={formik.values.password}
                  isInvalid={formik.status?.signupFailed ||
                    (formik.touched.password && !!formik.errors.password)
                  }
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-tooltip">{formik.errors.password}</div>
                <Form.Label htmlFor="password">{t('view.password')}</Form.Label>
              </div>
              <div className="form-floating mb-3">
                <Form.Control
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder={t('errors.passwordMatch')}
                  required
                  value={formik.values.confirmPassword}
                  isInvalid={formik.status?.signupFailed ||
                    (formik.touched.confirmPassword && !!formik.errors.confirmPassword)
                  }
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-tooltip">{formik.errors.confirmPassword || formik.status?.message}</div>
                <Form.Label htmlFor="confirmPassword">{t('actions.confirmPassword')}</Form.Label>
                {/* <Form.Control.Feedback type="invalid">{formik.status?.message}</Form.Control.Feedback> */}
              </div>
              <Button type="submit" disabled={formik.isSubmitting} className="w-100 mb-3 btn btn-primary">{t('actions.signup')}</Button>
            </Form>
          </div>
        </div>
      </div>
  )
}

export default SignupPage
