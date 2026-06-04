import { Formik, Form, Field } from 'formik'

function AuthorizationPage() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-content-center h-100">
      <div className="card shadow-sm">
        <div className="card-body row p-5">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={() => {}}>
              {() => (
                <Form className="mt-3 mt-md-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <Field
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Ваш ник"
                      className="form-control"
                      required
                    />
                    <label htmlFor="username">Ваш ник</label>
                  </div>
                  <div className="form-floating mb-3">
                    <Field
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Пароль"
                      className="form-control"
                      required
                    />
                    <label htmlFor="password">Пароль</label>
                  </div>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                </Form>
              )}
          </Formik>
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
