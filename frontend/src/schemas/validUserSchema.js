import * as yup from 'yup'
import i18nextInstance from '../i18n/i18n.js'

export const validUserSchema = () => yup.object().shape({
    username: yup
      .string()
      .min(3, i18nextInstance.t('errors.nameLength'))
      .max(20, i18nextInstance.t('errors.nameLength'))
      .required(),
    password: yup
      .string()
      .min(6, i18nextInstance.t('errors.passwordLength'))
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')])
      .required(),
  })
