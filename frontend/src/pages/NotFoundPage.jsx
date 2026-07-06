import { useTranslation } from "react-i18next"

function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-content-center h-100">
        <div className="card shadow-sm text-center p-5">
            <h1>404</h1>
            <p>{t('view.notFoundPage')}</p>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage