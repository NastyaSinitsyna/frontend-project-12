import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './locales/index.js'
import * as yup from 'yup'


const i18nextInstance = i18next.createInstance()

i18nextInstance	
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    //debug: true,
  })

  yup.setLocale({
  mixed: {
    required: () => i18nextInstance.t('errors.required'),
    notOneOf: () => i18nextInstance.t('errors.unique'),
    oneOf: () => i18nextInstance.t('errors.passwordMatch'),
  }
})

export default i18nextInstance
