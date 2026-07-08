import { useTranslation } from "react-i18next"

function ErrorMessage() {
  const { t } = useTranslation()
  return (
    <div className="container py-5 text-center">
      <h2 className="text-danger">{t('errors.messageHeader')}</h2>
      <p>{t('errors.messageBody')}</p>
    </div>
  )
}

export default ErrorMessage
